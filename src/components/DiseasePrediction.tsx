import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DiseasePrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const { toast } = useToast();

  const handleDiabetesPredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate ML prediction
    setTimeout(() => {
      const risk = Math.random();
      setPrediction({
        type: 'diabetes',
        risk: risk > 0.6 ? 'High' : risk > 0.3 ? 'Medium' : 'Low',
        confidence: Math.round((0.7 + Math.random() * 0.3) * 100),
        recommendations: [
          'Regular blood sugar monitoring',
          'Maintain healthy diet',
          'Regular exercise routine',
          'Annual health checkups'
        ]
      });
      setIsLoading(false);
      toast({
        title: "Prediction Complete",
        description: "Your diabetes risk assessment is ready.",
      });
    }, 2000);
  };

  const handleHeartPredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate ML prediction
    setTimeout(() => {
      const risk = Math.random();
      setPrediction({
        type: 'heart',
        risk: risk > 0.5 ? 'High' : risk > 0.25 ? 'Medium' : 'Low',
        confidence: Math.round((0.75 + Math.random() * 0.25) * 100),
        recommendations: [
          'Regular cardiovascular exercise',
          'Monitor blood pressure',
          'Reduce sodium intake',
          'Manage stress levels'
        ]
      });
      setIsLoading(false);
      toast({
        title: "Prediction Complete",
        description: "Your heart disease risk assessment is ready.",
      });
    }, 2000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-destructive';
      case 'Medium': return 'bg-accent';
      case 'Low': return 'bg-tertiary';
      default: return 'bg-muted';
    }
  };

  return (
    <section id="predict" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            AI Disease Prediction
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced machine learning algorithms analyze your health data to predict disease risks and provide personalized recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Prediction Form */}
          <div>
            <Tabs defaultValue="diabetes" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="diabetes" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Diabetes
                </TabsTrigger>
                <TabsTrigger value="heart" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Heart Disease
                </TabsTrigger>
              </TabsList>

              <TabsContent value="diabetes">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Diabetes Risk Assessment
                    </CardTitle>
                    <CardDescription>
                      Enter your health metrics for diabetes risk prediction
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDiabetesPredict} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="age">Age</Label>
                          <Input id="age" type="number" placeholder="35" required />
                        </div>
                        <div>
                          <Label htmlFor="bmi">BMI</Label>
                          <Input id="bmi" type="number" step="0.1" placeholder="25.5" required />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="glucose">Glucose Level</Label>
                          <Input id="glucose" type="number" placeholder="120" required />
                        </div>
                        <div>
                          <Label htmlFor="blood-pressure">Blood Pressure</Label>
                          <Input id="blood-pressure" type="number" placeholder="80" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="family-history">Family History</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select family history" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No family history</SelectItem>
                            <SelectItem value="parent">Parent with diabetes</SelectItem>
                            <SelectItem value="sibling">Sibling with diabetes</SelectItem>
                            <SelectItem value="both">Multiple family members</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-primary" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Analyzing..." : "Predict Diabetes Risk"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="heart">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      Heart Disease Risk Assessment
                    </CardTitle>
                    <CardDescription>
                      Enter your cardiovascular health data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleHeartPredict} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="age-heart">Age</Label>
                          <Input id="age-heart" type="number" placeholder="45" required />
                        </div>
                        <div>
                          <Label htmlFor="cholesterol">Cholesterol</Label>
                          <Input id="cholesterol" type="number" placeholder="200" required />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="systolic">Systolic BP</Label>
                          <Input id="systolic" type="number" placeholder="120" required />
                        </div>
                        <div>
                          <Label htmlFor="max-hr">Max Heart Rate</Label>
                          <Input id="max-hr" type="number" placeholder="150" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="chest-pain">Chest Pain Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select chest pain type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No chest pain</SelectItem>
                            <SelectItem value="typical">Typical angina</SelectItem>
                            <SelectItem value="atypical">Atypical angina</SelectItem>
                            <SelectItem value="non-anginal">Non-anginal pain</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-secondary" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Analyzing..." : "Predict Heart Disease Risk"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Results */}
          <div>
            {prediction ? (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {prediction.type === 'diabetes' ? (
                      <Activity className="h-5 w-5 text-primary" />
                    ) : (
                      <Heart className="h-5 w-5 text-primary" />
                    )}
                    Risk Assessment Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <Badge className={`${getRiskColor(prediction.risk)} text-white text-lg px-4 py-2`}>
                      {prediction.risk} Risk
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      Confidence: {prediction.confidence}%
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-tertiary" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {prediction.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="h-4 w-4" />
                      <span>This is a prediction tool. Consult healthcare professionals for medical advice.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <Activity className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ready for Analysis</h3>
                  <p className="text-muted-foreground">
                    Fill out the form to get your personalized health risk assessment
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiseasePrediction;