import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Brain, Heart, Lightbulb, MessageCircle } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const MentalHealthChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your mental health AI assistant. I'm here to provide emotional support and wellness guidance. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ["I'm feeling anxious", "I'm stressed about work", "I need motivation", "I'm feeling lonely"]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    anxiety: [
      "I understand you're feeling anxious. That's completely normal. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, exhale for 8. Would you like me to guide you through some more coping strategies?",
      "Anxiety can feel overwhelming, but you're taking a positive step by reaching out. Let's focus on what you can control right now. What's one small thing that usually makes you feel better?"
    ],
    stress: [
      "Work stress is very common. Remember, it's important to set boundaries and take breaks. Have you tried any stress-reduction techniques like meditation or short walks?",
      "I hear that work is causing you stress. Let's break this down - what specific aspect is bothering you most? Sometimes talking through it can help clarify solutions."
    ],
    motivation: [
      "Everyone needs motivation sometimes! Remember that small steps forward are still progress. What's one thing you've accomplished recently that you're proud of?",
      "Motivation can come and go, and that's okay. Let's focus on one small, achievable goal for today. What would make you feel accomplished?"
    ],
    lonely: [
      "Feeling lonely is difficult, but reaching out here shows your strength. Connection is so important for our wellbeing. Are there any activities or hobbies that usually help you feel more connected?",
      "Loneliness is a human experience we all face sometimes. You're not alone in feeling this way. Have you considered joining any groups or activities related to your interests?"
    ],
    default: [
      "Thank you for sharing that with me. Your feelings are valid. Can you tell me more about what's on your mind?",
      "I'm here to listen and support you. Would you like to explore this feeling further or would you prefer some practical coping strategies?",
      "It sounds like you're going through something important. Remember, seeking support is a sign of strength, not weakness."
    ]
  };

  const getResponseCategory = (message: string): keyof typeof botResponses => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) return 'anxiety';
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) return 'stress';
    if (lowerMessage.includes('motivation') || lowerMessage.includes('unmotivated') || lowerMessage.includes('give up')) return 'motivation';
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated')) return 'lonely';
    return 'default';
  };

  const generateSuggestions = (category: keyof typeof botResponses): string[] => {
    const suggestions = {
      anxiety: ["Tell me about breathing exercises", "How can I manage panic attacks?", "What are grounding techniques?"],
      stress: ["Tips for work-life balance", "How to prioritize tasks", "Stress-relief activities"],
      motivation: ["Help me set small goals", "How to build good habits", "Ways to celebrate progress"],
      lonely: ["How to meet new people", "Building meaningful connections", "Self-care when alone"],
      default: ["I need coping strategies", "Tell me about mindfulness", "How to improve my mood"]
    };
    return suggestions[category];
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

    // Simulate AI thinking time
    setTimeout(() => {
      const category = getResponseCategory(text);
      const responses = botResponses[category];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: generateSuggestions(category)
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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