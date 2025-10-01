import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Brain, Heart, Lightbulb, MessageCircle, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const MentalHealthChat = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch user profile and initialize chat
  useEffect(() => {
    const initializeChat = async () => {
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        const name = profile?.full_name || "there";
        setUserName(name);
        
        setMessages([{
          id: 1,
          text: `Hello ${name}! I'm your personal mental health AI assistant. I'm here to provide emotional support and wellness guidance specifically for you. How are you feeling today?`,
          sender: 'bot',
          timestamp: new Date(),
          suggestions: generateSuggestions()
        }]);
      }
    };

    if (!authLoading) {
      initializeChat();
    }
  }, [user, authLoading]);

  const generateSuggestions = (): string[] => {
    const allSuggestions = [
      "I'm feeling anxious",
      "I'm stressed about work",
      "I need motivation",
      "I'm feeling lonely",
      "How can I improve my mood?",
      "Tell me about mindfulness",
      "I need coping strategies"
    ];
    // Return 3 random suggestions
    return allSuggestions.sort(() => Math.random() - 0.5).slice(0, 3);
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const conversationMessages = [...messages, userMessage].map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const { data, error } = await supabase.functions.invoke('mental-health-chat', {
        body: { 
          messages: conversationMessages,
          userName 
        }
      });

      if (error) {
        throw error;
      }

      const aiResponse = data.choices[0].message.content;
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: generateSuggestions()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Show login prompt if not authenticated
  if (!user && !authLoading) {
    return (
      <section id="chat" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto text-center p-8">
            <CardContent className="space-y-6">
              <div className="mx-auto bg-gradient-secondary w-16 h-16 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Sign In Required</h3>
                <p className="text-muted-foreground mb-6">
                  Please sign in to access your personalized mental health AI assistant and get tailored support.
                </p>
              </div>
              <Button 
                onClick={() => navigate("/")}
                className="bg-gradient-primary"
              >
                Sign In to Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="chat" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Mental Health AI Assistant
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get emotional support and wellness guidance from our AI-powered mental health chatbot. 
            Available 24/7 for stress, anxiety, and general wellbeing support.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b bg-gradient-secondary text-white">
              <CardTitle className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Brain className="h-6 w-6" />
                </div>
                <div>
                  <span>MindSupport AI</span>
                  <p className="text-sm font-normal opacity-90">Your personal mental health companion</p>
                </div>
                <Badge className="ml-auto bg-white/20 text-white">Online</Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-0">
              <div className="p-6 space-y-4 h-full">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.sender === 'bot' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-secondary text-white">
                          <Brain className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-first' : ''}`}>
                      <div className={`p-4 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-gradient-primary text-white ml-auto' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs text-muted-foreground">Quick suggestions:</p>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-8"
                                onClick={() => handleSendMessage(suggestion)}
                              >
                                <Lightbulb className="h-3 w-3 mr-1" />
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {message.sender === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-white">U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gradient-secondary text-white">
                        <Brain className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-4 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Share what's on your mind..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-primary"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                This AI provides support but is not a substitute for professional mental health care.
              </p>
            </div>
          </Card>

          {/* Quick Access Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Card className="cursor-pointer hover:shadow-medium transition-smooth" onClick={() => handleSendMessage("I'm feeling anxious and need help")}>
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 text-destructive mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Anxiety Support</h4>
                <p className="text-sm text-muted-foreground">Breathing exercises and coping strategies</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-medium transition-smooth" onClick={() => handleSendMessage("I'm stressed and overwhelmed")}>
              <CardContent className="p-4 text-center">
                <Brain className="h-8 w-8 text-accent mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Stress Management</h4>
                <p className="text-sm text-muted-foreground">Tools for managing daily stress</p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-medium transition-smooth" onClick={() => handleSendMessage("I need motivation and encouragement")}>
              <CardContent className="p-4 text-center">
                <Lightbulb className="h-8 w-8 text-tertiary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Motivation Boost</h4>
                <p className="text-sm text-muted-foreground">Goal setting and positive reinforcement</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentalHealthChat;