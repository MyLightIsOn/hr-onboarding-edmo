# AirOnboard Demo

> **An intelligent onboarding system powered by Anthropic's Agent Skills architecture**

A demonstration project showcasing how Agent Skills can create personalized, scalable employee onboarding experiences. Built for the Airbnb Staff AI Innovation Engineer role application.

![Demo Status](https://img.shields.io/badge/status-demo-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

## 🎯 Overview

AirOnboard demonstrates how **Agent Skills** (Anthropic, October 2024) can power intelligent, role-aware onboarding systems that:

- ✅ **Personalize** content for each role (Software Engineer, Product Manager, HR Coordinator)
- ✅ **Scale efficiently** using progressive disclosure (93% token reduction)
- ✅ **Integrate** with multiple data sources (Workday, Greenhouse, Confluence, etc.)
- ✅ **Adapt** dynamically to user context and queries

### Key Innovation: Progressive Disclosure Architecture

Instead of loading all onboarding content upfront (~35,000 tokens), Agent Skills uses a **3-level architecture**:

1. **Level 1 - Orchestrator (100 tokens)**: Routes to the correct role-specific skill
2. **Level 2 - Role Guidance (2,500 tokens)**: Loads personalized instructions and workflows
3. **Level 3 - Resources (on-demand)**: Fetches specific documents/data only when needed

**Result**: 2,600 tokens vs 35,000 tokens = **93% reduction** in context usage

---

## 🚀 Features

### Core Functionality
- **Landing Page**: Role selection with 3 demo personas
- **Personalized Dashboard**: 
  - Welcome header with employee details
  - Quick stats (tasks, training, people, progress)
  - 4 interactive widgets (Checklist, Policies, People, Learning)
- **Interactive Panels**:
  - **Chat Interface**: AI policy navigator with role-aware responses
  - **People Directory**: Recommended connections with filtering and timing
  - **Learning Path**: Required and recommended courses with progress tracking

### Demo Features
- **Behind the Scenes**: Visualize Skills architecture, token efficiency, and data sources
- **Role Comparison**: Switch between roles to see personalized differences
- **Smooth Animations**: Polished UI with transitions and micro-interactions

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Mock Data**: Static JSON files simulating real APIs

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/hr-onboarding-demo.git
cd hr-onboarding-demo

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 🎨 Project Structure

```
hr-onboarding-demo/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard route
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── landing/              # Landing page components
│   ├── dashboard/            # Dashboard widgets
│   ├── panels/               # Interactive overlays
│   ├── demo/                 # Demo-specific features
│   └── ui/                   # Shadcn UI components
├── lib/
│   ├── data-access/          # Data service layer
│   ├── mock-data/            # JSON data files
│   ├── services/             # Business logic
│   └── types/                # TypeScript definitions
└── public/
    └── skills/               # Agent Skills architecture
```

---

## 🎭 Demo Roles

### Software Engineer
- **Focus**: Technical onboarding, security training, engineering tools
- **Learning Path**: Security Fundamentals, Git & GitHub, System Architecture
- **Key Connections**: Engineering Manager, Onboarding Buddy, Tech Lead

### Product Manager
- **Focus**: Product process, stakeholder management, analytics
- **Learning Path**: Product Development Lifecycle, User Research, Data Analysis
- **Key Connections**: Director of Product, Design Partner, Engineering Lead

### HR Coordinator
- **Focus**: HR systems, compliance, employee support
- **Learning Path**: HRIS Administration, GDPR Compliance, Employee Relations
- **Key Connections**: Senior HR Manager, Payroll Specialist, Benefits Admin

---

## 🧠 Agent Skills Architecture

### How It Works

1. **User selects role** → Orchestrator Skill routes to role-specific skill
2. **Role Skill loads** → Provides personalized guidance (2,500 tokens)
3. **User asks question** → Skill queries relevant data sources on-demand
4. **AI responds** → With role-aware, contextual information

### Mock Implementation

This demo **simulates** the Skills architecture using:
- Static JSON files for data
- `mockClaudeService.ts` for intelligent policy responses
- Service layer that mimics API calls

### Production Implementation

In production, Skills would:
- Use real Claude API with Skills enabled
- Query live systems (Workday, Greenhouse, Confluence, etc.)
- Cache frequently accessed data
- Handle authentication and rate limiting

---

## 🎨 Design Decisions

### Progressive Disclosure
- Load minimal context upfront
- Fetch additional resources on-demand
- Result: 93% token reduction vs traditional approach

### Role-Based Personalization
- Each role gets unique Skill file
- Different tasks, learning paths, and recommendations
- Policies filtered by relevance

### Data Service Layer
- Clean separation between UI and data
- Reusable query functions
- Type-safe with TypeScript

---

## 🔮 Future Enhancements

### Real Claude Integration
- [ ] Add "Use Real Claude" toggle
- [ ] Implement Anthropic SDK
- [ ] Stream responses for better UX
- [ ] Handle API errors gracefully

### Interactive Features
- [ ] Task completion with persistence
- [ ] Course progress tracking
- [ ] Calendar integration for meetings
- [ ] Email/Slack notifications

### Advanced Personalization
- [ ] Multi-role support (hybrid roles)
- [ ] Location-based content
- [ ] Language preferences
- [ ] Timezone awareness

---

## 📊 Performance

- **First Load**: < 1s
- **Route Transitions**: < 200ms
- **Panel Animations**: 300ms
- **Token Usage**: 2,600 (vs 35,000 traditional)
- **API Calls**: ~15 per role load (simulated)

---

## 📝 License

MIT License - See LICENSE file for details

---

## 👤 Author

**Lawrence Moore**

### Why This Project?

I built AirOnboard to demonstrate:
1. **Technical skills**: Next.js, TypeScript, complex state management, API design
2. **AI understanding**: Deep knowledge of Agent Skills, token optimization, prompt engineering
3. **Product thinking**: User-centered design, scalability, real-world applicability
4. **Execution**: Clean code, comprehensive documentation, polished UI

---

## 🙏 Acknowledgments

- **Anthropic** for Agent Skills architecture and Claude
- **Airbnb** for inspiring the onboarding challenge
- **Shadcn** for beautiful UI components
- **Vercel** for Next.js and deployment platform

---

**Built with ❤️ and Agent Skills**
