import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, AlertCircle, Heart, Brain, Wind, Eye } from "lucide-react";

const diseases = [
  {
    id: 1,
    name: "Type 2 Diabetes",
    category: "Metabolic",
    icon: Heart,
    symptoms: ["Increased thirst", "Frequent urination", "Blurred vision", "Fatigue", "Slow healing wounds"],
    description: "A chronic condition that affects the way your body processes blood sugar (glucose).",
    treatments: ["Lifestyle modifications", "Metformin", "Insulin therapy", "Regular monitoring"],
    prevention: ["Healthy diet", "Regular exercise", "Weight management", "Regular checkups"],
    severity: "Moderate to High"
  },
  {
    id: 2,
    name: "Coronary Heart Disease",
    category: "Cardiovascular",
    icon: Heart,
    symptoms: ["Chest pain", "Shortness of breath", "Fatigue", "Heart palpitations", "Dizziness"],
    description: "A disease in which plaque builds up inside the coronary arteries.",
    treatments: ["Lifestyle changes", "Medications", "Angioplasty", "Bypass surgery"],
    prevention: ["Heart-healthy diet", "Regular exercise", "No smoking", "Stress management"],
    severity: "High"
  },
  {
    id: 3,
    name: "Hypertension",
    category: "Cardiovascular",
    icon: Heart,
    symptoms: ["Often no symptoms", "Headaches", "Nosebleeds", "Shortness of breath", "Chest pain"],
    description: "High blood pressure that can lead to serious health complications if untreated.",
    treatments: ["ACE inhibitors", "Diuretics", "Beta blockers", "Lifestyle modifications"],
    prevention: ["Low sodium diet", "Regular exercise", "Limit alcohol", "Maintain healthy weight"],
    severity: "Moderate to High"
  },
  {
    id: 4,
    name: "Depression",
    category: "Mental Health",
    icon: Brain,
    symptoms: ["Persistent sadness", "Loss of interest", "Fatigue", "Sleep disturbances", "Concentration issues"],
    description: "A mood disorder causing persistent feelings of sadness and loss of interest.",
    treatments: ["Psychotherapy", "Antidepressants", "Lifestyle changes", "Support groups"],
    prevention: ["Regular exercise", "Social connections", "Stress management", "Adequate sleep"],
    severity: "Moderate to High"
  },
  {
    id: 5,
    name: "Asthma",
    category: "Respiratory",
    icon: Wind,
    symptoms: ["Wheezing", "Shortness of breath", "Chest tightness", "Coughing", "Difficulty breathing"],
    description: "A condition in which airways narrow and swell, making breathing difficult.",
    treatments: ["Inhalers", "Bronchodilators", "Corticosteroids", "Allergy management"],
    prevention: ["Avoid triggers", "Regular medication", "Air quality awareness", "Vaccination"],
    severity: "Moderate"
  },
  {
    id: 6,
    name: "Glaucoma",
    category: "Eye Health",
    icon: Eye,
    symptoms: ["Gradual vision loss", "Eye pain", "Headaches", "Nausea", "Rainbow halos around lights"],
    description: "A group of eye conditions that damage the optic nerve, often due to high eye pressure.",
    treatments: ["Eye drops", "Oral medications", "Laser therapy", "Surgery"],
    prevention: ["Regular eye exams", "Protect eyes from injury", "Exercise regularly", "Healthy diet"],
    severity: "Moderate to High"
  }
];

const DiseaseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDisease, setSelectedDisease] = useState<any>(null);

  const categories = ["All", "Cardiovascular", "Metabolic", "Mental Health", "Respiratory", "Eye Health"];

  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || disease.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    if (severity.includes("High")) return "bg-destructive";
    if (severity.includes("Moderate")) return "bg-accent";
    return "bg-tertiary";
  };

  return (
    <section id="library" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Disease Information Library
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive information about various diseases, their symptoms, treatments, and prevention strategies.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search & Filter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    placeholder="Search diseases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Found {filteredDiseases.length} diseases
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Disease List */}
          <div className="lg:col-span-2">
            {selectedDisease ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <selectedDisease.icon className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle className="text-2xl">{selectedDisease.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge variant="outline">{selectedDisease.category}</Badge>
                          <Badge className={`${getSeverityColor(selectedDisease.severity)} text-white`}>
                            {selectedDisease.severity}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" onClick={() => setSelectedDisease(null)}>
                      Back to List
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground">{selectedDisease.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      Symptoms
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedDisease.symptoms.map((symptom: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-destructive rounded-full"></div>
                          {symptom}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Treatment Options</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedDisease.treatments.map((treatment: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          {treatment}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Prevention</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedDisease.prevention.map((prevention: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-tertiary rounded-full"></div>
                          {prevention}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      <span>This information is for educational purposes only. Always consult healthcare professionals for medical advice.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredDiseases.map(disease => {
                  const Icon = disease.icon;
                  return (
                    <Card 
                      key={disease.id} 
                      className="cursor-pointer hover:shadow-medium transition-smooth"
                      onClick={() => setSelectedDisease(disease)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="bg-gradient-primary p-3 rounded-lg">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{disease.name}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{disease.category}</Badge>
                              <Badge className={`${getSeverityColor(disease.severity)} text-white`}>
                                {disease.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {disease.description}
                            </p>
                          </div>
                          <BookOpen className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiseaseLibrary;