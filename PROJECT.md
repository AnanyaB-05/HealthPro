# HealthAI - Comprehensive Health Prediction & Mental Wellness Platform

## 📋 Project Overview

**HealthAI** is a full-stack web application that combines AI-powered disease prediction, mental health support, and comprehensive health information to provide users with a holistic healthcare experience. The platform aims to democratize health awareness and provide accessible mental health support through conversational AI.

## 🎯 Project Idea & Vision

The core idea behind HealthAI is to create an accessible, user-friendly platform that:

1. **Empowers users** with predictive health insights using machine learning algorithms
2. **Provides immediate mental health support** through an empathetic AI chatbot available 24/7
3. **Educates users** about various diseases, symptoms, treatments, and prevention methods
4. **Personalizes** the experience based on user profiles (age, gender, region)
5. **Bridges the gap** between technology and healthcare accessibility

### Problem Statement
Many people lack easy access to preliminary health assessments and mental health support. Traditional healthcare can be expensive, time-consuming, and intimidating. HealthAI addresses this by providing:
- Instant health risk assessments
- Free mental health counseling through AI
- Comprehensive disease information
- Privacy-focused user experience

## 🚀 Key Features

### 1. **User Authentication & Profiles**
- Secure email/password authentication via Supabase Auth
- User profile management with demographic data (name, age, gender, region)
- Auto-confirm email signups for seamless onboarding
- Protected routes and session management

### 2. **Disease Prediction System**
Two specialized ML-based prediction models:

#### Diabetes Prediction
Input parameters:
- Age
- Gender
- Blood Glucose Level
- BMI (Body Mass Index)
- HbA1c Level
- Blood Pressure

#### Heart Disease Prediction
Input parameters:
- Age
- Gender
- Cholesterol Level
- Blood Pressure
- Maximum Heart Rate
- Exercise-Induced Angina

**Output:**
- Risk level (High/Medium/Low)
- Confidence percentage
- Personalized recommendations
- Visual risk indicators with color coding

### 3. **Mental Health AI Chat**
- Real-time conversational AI powered by Lovable AI (Gemini Flash model)
- Empathetic, supportive responses tailored for mental health
- Persistent chat history stored in database
- Personalized greetings using user's name
- Active listening and non-judgmental support
- Crisis detection and professional referral suggestions

**AI Guidelines:**
- Active listening and validation
- Empathy without medical diagnosis
- Encouragement and coping strategies
- Professional help recommendations when needed
- Privacy and confidentiality emphasis

### 4. **Disease Library**
A comprehensive knowledge base covering multiple disease categories:

**Categories:**
- Chronic Diseases (Diabetes, Hypertension, Heart Disease, Asthma)
- Infectious Diseases (Flu, COVID-19, Tuberculosis)
- Mental Health (Depression, Anxiety, PTSD)
- Respiratory (COPD, Pneumonia)
- Neurological (Alzheimer's, Parkinson's)

**For each disease:**
- Detailed description
- Common symptoms
- Treatment options
- Prevention methods
- Severity classification
- Searchable and filterable interface

### 5. **Responsive Navigation**
- Modern, accessible navigation system
- Mobile-responsive design
- Quick access to all features
- User-friendly interface

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible component library
- **React Router DOM** - Client-side routing
- **TanStack Query** - Data fetching and state management
- **Lucide React** - Icon library

### Backend (Lovable Cloud)
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication system
  - Row Level Security (RLS)
  - Edge Functions for serverless computing

### AI Integration
- **Lovable AI** - AI gateway for chat completions
- **Google Gemini Flash** - LLM for mental health conversations

### Additional Libraries
- **Recharts** - Data visualization
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Sonner** - Toast notifications
- **Framer Motion** (via class-variance-authority) - Animations

## 📁 Project Structure

```
healthai/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components (Shadcn)
│   │   ├── Hero.tsx         # Landing page hero section
│   │   ├── Navigation.tsx   # Main navigation component
│   │   ├── MentalHealthChat.tsx  # AI chat interface
│   │   ├── DiseasePrediction.tsx # ML prediction forms
│   │   └── DiseaseLibrary.tsx    # Disease info database
│   ├── pages/
│   │   ├── Index.tsx        # Home page
│   │   ├── Auth.tsx         # Login/Signup page
│   │   ├── Predict.tsx      # Disease prediction page
│   │   ├── MentalHealth.tsx # Mental health chat page
│   │   ├── DiseaseLibraryPage.tsx # Disease library page
│   │   └── NotFound.tsx     # 404 page
│   ├── hooks/
│   │   ├── useAuth.tsx      # Authentication hook
│   │   └── use-toast.ts     # Toast notifications hook
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts    # Supabase client config
│   │       └── types.ts     # Database type definitions
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles & design tokens
├── supabase/
│   ├── functions/
│   │   └── mental-health-chat/
│   │       └── index.ts     # Edge function for AI chat
│   ├── migrations/          # Database migrations
│   └── config.toml          # Supabase configuration
├── public/
│   └── robots.txt           # SEO configuration
└── Configuration files (vite, tailwind, typescript, etc.)
```

## 💾 Database Schema

### Tables

#### 1. **profiles**
Stores additional user information beyond authentication.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  region TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Purpose:** Store user demographic data for personalized health assessments

**RLS Policies:**
- Users can view their own profile
- Users can insert their own profile
- Users can update their own profile

#### 2. **chat_messages**
Stores mental health chat conversation history.

```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role TEXT NOT NULL,  -- 'user' or 'assistant'
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Purpose:** Maintain conversation continuity and allow users to review past interactions

**RLS Policies:**
- Users can view their own messages
- Users can create their own messages
- Users can delete their own messages

## 🔌 API Endpoints

### Edge Functions

#### `/mental-health-chat`
**Method:** POST

**Request Body:**
```json
{
  "messages": [
    {"role": "user", "content": "I'm feeling anxious"},
    {"role": "assistant", "content": "..."}
  ],
  "userName": "John"
}
```

**Response:**
```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "AI response here..."
      }
    }
  ]
}
```

**Features:**
- CORS-enabled for frontend communication
- Integrates with Lovable AI gateway
- Custom system prompt for mental health context
- Error handling for rate limits and API issues

## 🎨 Design System

### Color Palette
The app uses a semantic color system defined in `index.css`:

- **Primary Colors:** HSL-based theme colors
- **Background/Foreground:** Adaptive for light/dark modes
- **Accent Colors:** For CTAs and highlights
- **Muted Colors:** For secondary UI elements
- **Destructive:** For errors and warnings

### Typography
- Clean, modern sans-serif fonts
- Responsive font sizing
- Proper heading hierarchy

### Components
All UI components follow Shadcn design patterns:
- Accessible by default
- Fully customizable
- Consistent styling
- Dark mode support

## 🔐 Security & Privacy

### Authentication
- Secure password hashing via Supabase Auth
- JWT-based session management
- Protected routes requiring authentication
- Auto-confirm emails for development (configurable for production)

### Database Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Policies enforce user_id matching
- No direct access to auth.users table

### Data Privacy
- Mental health chats stored securely
- User profiles protected by RLS
- No sharing of personal health data
- HIPAA-aware design (not certified)

## 📱 User Journey

### New User Flow
1. **Land on Auth Page** → See HealthAI branding
2. **Sign Up** → Enter email, password, name, age, gender, region
3. **Auto-confirmed** → Immediately logged in
4. **Redirected to Home** → See hero section with feature overview
5. **Choose Feature:**
   - Disease Prediction → Fill form → Get results
   - Mental Health Chat → Start conversation
   - Disease Library → Browse and search

### Returning User Flow
1. **Login** → Email and password
2. **Home Page** → Quick access to all features
3. **Continue Chat** → Previous conversations loaded
4. **New Prediction** → Fresh assessment anytime

## 🚦 Application Routes

```
/ (root)           → Auth Page (Login/Signup)
/home              → Home Page (Hero + Navigation)
/predict           → Disease Prediction Page
/mental-health     → Mental Health Chat Page
/disease-library   → Disease Library Page
* (catch-all)      → 404 Not Found Page
```

## 🎯 Use Cases

### 1. **Preventive Health Assessment**
**User:** Individual concerned about diabetes
**Flow:** 
- Navigate to /predict
- Select Diabetes tab
- Input health metrics
- Receive risk assessment
- Review recommendations
- Take preventive action

### 2. **Mental Health Support**
**User:** Person experiencing anxiety
**Flow:**
- Navigate to /mental-health
- Start conversation with AI
- Receive empathetic responses
- Get coping strategies
- Chat history saved for continuity

### 3. **Health Education**
**User:** Student researching diseases
**Flow:**
- Navigate to /disease-library
- Search for condition
- Filter by category
- Read comprehensive info
- Understand prevention methods

## 🔄 Data Flow

### Disease Prediction
```
User Input (Form) 
  → Client-side validation
  → Simulated ML Model (Frontend)
  → Risk Calculation
  → Result Display with Recommendations
```

### Mental Health Chat
```
User Message
  → Save to Supabase (chat_messages)
  → Send to Edge Function
  → Edge Function → Lovable AI API
  → AI Response
  → Save to Supabase
  → Display in Chat UI
```

### User Authentication
```
Signup/Login Form
  → Supabase Auth
  → Create/Verify User
  → Store Profile Data
  → Establish Session
  → Redirect to Home
```

## 🌟 Unique Selling Points

1. **All-in-One Platform:** Disease prediction + mental health + education in one place
2. **AI-Powered:** Leverages latest LLM technology for empathetic conversations
3. **Free & Accessible:** No cost barrier to entry
4. **Privacy-First:** User data protected with industry-standard security
5. **Evidence-Based:** Disease library backed by medical knowledge
6. **Instant Results:** Real-time predictions and chat responses
7. **Personalized:** Tailored to user demographics and health metrics
8. **Educational:** Comprehensive disease information beyond just prediction

## 🔮 Future Enhancements

### Potential Features
- [ ] Actual ML model integration (replace simulations)
- [ ] Health tracking dashboard with historical data
- [ ] Medication reminders and tracking
- [ ] Integration with wearable devices
- [ ] Telemedicine video consultations
- [ ] Nutrition and exercise recommendations
- [ ] Family health tree and genetic risk factors
- [ ] Multi-language support
- [ ] Voice-based interaction for chat
- [ ] PDF report generation for doctor visits
- [ ] Community forums for peer support
- [ ] Mental health resources directory
- [ ] Crisis hotline integration
- [ ] Progress tracking for mental health

## 📊 Performance Considerations

- **Code Splitting:** Routes are lazy-loaded for faster initial load
- **Optimized Queries:** TanStack Query caches API responses
- **Edge Functions:** Low-latency serverless computing
- **Database Indexing:** Optimized queries on user_id
- **Responsive Images:** Proper sizing and lazy loading
- **Minimal Bundle:** Tree-shaking and optimized builds

## 🧪 Testing Strategy

### Recommended Tests
1. **Unit Tests:** Component logic and utility functions
2. **Integration Tests:** API calls and database operations
3. **E2E Tests:** Complete user flows
4. **Accessibility Tests:** WCAG compliance
5. **Security Tests:** RLS policy validation

## 📚 Documentation

### For Developers
- Code is well-commented
- TypeScript provides type safety
- Component structure is modular
- Follows React best practices

### For Users
- Intuitive UI with clear labels
- Helpful tooltips and descriptions
- Disclaimer about professional medical advice
- Privacy policy and terms (to be added)

## 🤝 Contributing Guidelines

If this project were open-source, contributions would be welcome in:
- UI/UX improvements
- New disease types for prediction
- Enhanced ML models
- Accessibility improvements
- Internationalization
- Bug fixes and performance optimizations

## 📄 License

This project is built with Lovable and uses various open-source libraries. Individual component licenses should be reviewed for commercial use.

## 🙏 Acknowledgments

- **Lovable Platform:** For the development environment and AI integration
- **Supabase:** For the backend infrastructure
- **Shadcn/ui:** For the beautiful component library
- **Tailwind CSS:** For the utility-first styling
- **Google Gemini:** For powering the mental health AI

## 📞 Support & Contact

For questions, issues, or feedback about HealthAI, users would typically have access to:
- In-app support chat
- Email support
- FAQ section
- Community forums

---

**Built with ❤️ for accessible healthcare**

*This project demonstrates the power of combining modern web technologies with AI to create meaningful, user-centric health solutions.*
