# Mock Data Structure

> Comprehensive data schemas for the AirOnboard demo

---

## Overview

This document defines all mock data structures used in the demo. These simulate real integrations with Airbnb's HR systems (Workday, Greenhouse, Confluence, Slack, etc.).

**Design Principles**:
- Realistic data that reflects actual Airbnb structure
- Role-specific variations to demonstrate personalization
- Consistent IDs and relationships across files
- Ready to be replaced with real API calls in production

---

## Data Files Location

All mock data lives in `/lib/mock-data/`:

```
lib/mock-data/
├── employees.json          # Employee profiles and metadata
├── roles.json             # Role definitions with Skills metadata
├── policies.json          # HR policies database
├── org-chart.json         # Organizational hierarchy
├── people-directory.json  # Employee directory with recommendations
├── learning-paths.json    # Courses and training data
└── onboarding-tasks.json  # Role-specific checklists
```

---

## 1. employees.json

Employee profiles for our demo personas.

### Schema

```typescript
interface Employee {
  id: string;                    // Unique employee ID (e.g., "E12345")
  name: string;                  // Full name
  email: string;                 // Work email
  role: string;                  // Job title
  roleId: string;                // Links to roles.json
  department: string;            // Department name
  team: string;                  // Specific team
  level: string;                 // Career level (e.g., "IC4", "M3")
  startDate: string;             // ISO date format
  location: string;              // Office location
  workType: "remote" | "hybrid" | "onsite";
  timezone: string;              // IANA timezone
  manager: {
    id: string;
    name: string;
    email: string;
  };
  onboardingBuddy: {
    id: string;
    name: string;
    email: string;
  };
  avatar?: string;               // URL or path to photo
}
```

### Example Data

```json
{
  "employees": [
    {
      "id": "E12345",
      "name": "Alex Chen",
      "email": "alex.chen@airbnb.com",
      "role": "Software Engineer II",
      "roleId": "software-engineer",
      "department": "Engineering",
      "team": "Trust & Safety - Content Moderation",
      "level": "IC4",
      "startDate": "2024-01-15",
      "location": "San Francisco, CA",
      "workType": "hybrid",
      "timezone": "America/Los_Angeles",
      "manager": {
        "id": "E54321",
        "name": "Jordan Smith",
        "email": "jordan.smith@airbnb.com"
      },
      "onboardingBuddy": {
        "id": "E11111",
        "name": "Sam Rivera",
        "email": "sam.rivera@airbnb.com"
      },
      "avatar": "/avatars/alex-chen.jpg"
    }
  ]
}
```

### Demo Personas

1. **Alex Chen** - Software Engineer II (Trust & Safety)
2. **Taylor Morgan** - Product Manager (Experiences)
3. **Jordan Lee** - People Operations Coordinator

---

## 2. roles.json

Role definitions with metadata for Skills matching.

### Schema

```typescript
interface Role {
  id: string;                    // Role identifier (matches Employee.roleId)
  title: string;                 // Display name
  category: "engineering" | "product" | "operations" | "design" | "data";
  skillName: string;             // Name of the Agent Skill to load
  description: string;           // What this role does
  department: string;            // Primary department
  commonTeams: string[];         // Typical team assignments
  requiredTraining: string[];    // Training course IDs
  typicalLevel: string[];        // Career levels (e.g., ["IC3", "IC4", "IC5"])
}
```

### Example Data

```json
{
  "roles": [
    {
      "id": "software-engineer",
      "title": "Software Engineer",
      "category": "engineering",
      "skillName": "airbnb-onboarding-software-engineer",
      "description": "Build and maintain Airbnb's technical infrastructure",
      "department": "Engineering",
      "commonTeams": [
        "Trust & Safety",
        "Payments",
        "Search & Discovery",
        "Host Platform",
        "Guest Platform"
      ],
      "requiredTraining": ["security-fundamentals", "code-standards"],
      "typicalLevel": ["IC3", "IC4", "IC5", "IC6"]
    },
    {
      "id": "product-manager",
      "title": "Product Manager",
      "category": "product",
      "skillName": "airbnb-onboarding-product-manager",
      "description": "Define product strategy and drive execution",
      "department": "Product",
      "commonTeams": [
        "Experiences",
        "Host Tools",
        "Guest Services",
        "Pricing & Revenue"
      ],
      "requiredTraining": ["product-fundamentals", "airbnb-values"],
      "typicalLevel": ["PM2", "PM3", "PM4"]
    },
    {
      "id": "hr-coordinator",
      "title": "People Operations Coordinator",
      "category": "operations",
      "skillName": "airbnb-onboarding-hr-coordinator",
      "description": "Support employee experience and HR operations",
      "department": "People Operations",
      "commonTeams": ["Employee Experience", "Recruiting", "Compensation"],
      "requiredTraining": ["workday-admin", "gdpr-compliance"],
      "typicalLevel": ["L4", "L5"]
    }
  ]
}
```

---

## 3. policies.json

HR policies with role-based access and content.

### Schema

```typescript
interface Policy {
  id: string;                    // Unique policy ID
  name: string;                  // Policy name
  category: "pto" | "expense" | "remote-work" | "security" | "benefits" | "conduct";
  summary: string;               // Brief overview
  applicableRoles: string[];     // Empty array = all roles
  lastUpdated: string;           // ISO date
  sections: PolicySection[];
}

interface PolicySection {
  id: string;
  title: string;
  content: string;               // Markdown supported
  applicableRoles?: string[];    // If specific to certain roles
  applicableLocations?: string[]; // If location-specific
  tags: string[];                // For search/filtering
}
```

### Example Data

```json
{
  "policies": [
    {
      "id": "remote-work-policy",
      "name": "Remote Work Policy",
      "category": "remote-work",
      "summary": "Guidelines for remote work including eligibility, expectations, and geographic restrictions",
      "applicableRoles": [],
      "lastUpdated": "2024-11-01",
      "sections": [
        {
          "id": "rw-eligibility",
          "title": "Eligibility",
          "content": "All full-time employees are eligible for hybrid or remote work arrangements, subject to role requirements and manager approval. Engineers and Product Managers typically have full remote flexibility.",
          "applicableRoles": ["software-engineer", "product-manager"],
          "tags": ["eligibility", "remote", "hybrid"]
        },
        {
          "id": "rw-equipment",
          "title": "Home Office Setup",
          "content": "Airbnb provides a $2,500 USD stipend for home office equipment. This covers desk, chair, monitor, and other essentials. Submit receipts via Expensify within 30 days of purchase.",
          "applicableRoles": [],
          "tags": ["equipment", "stipend", "reimbursement"]
        }
      ]
    },
    {
      "id": "expense-policy",
      "name": "Expense Reimbursement Policy",
      "category": "expense",
      "summary": "Guidelines for business expenses including meals, travel, equipment, and team events",
      "applicableRoles": [],
      "lastUpdated": "2024-10-15",
      "sections": [
        {
          "id": "exp-meals",
          "title": "Meals & Entertainment",
          "content": "**Individual Meals**: $75 USD per day for meals while traveling. No receipt needed under $25.\n\n**Team Meals**: Reasonable expenses for team dinners and events. Manager approval required over $500.\n\n**Client Meals**: Pre-approval required. Include attendees and business purpose.",
          "applicableRoles": [],
          "applicableLocations": ["US"],
          "tags": ["meals", "entertainment", "per-diem"]
        },
        {
          "id": "exp-conferences",
          "title": "Conference & Training",
          "content": "Engineers can expense one conference per year up to $3,000 (registration, travel, lodging). Popular choices: Re:Invent, QCon, Strange Loop.\n\nRequires manager approval 30 days in advance.",
          "applicableRoles": ["software-engineer"],
          "tags": ["conference", "training", "professional-development"]
        }
      ]
    },
    {
      "id": "pto-policy",
      "name": "Paid Time Off Policy",
      "category": "pto",
      "summary": "Flexible PTO policy with guidelines for requesting and taking time off",
      "applicableRoles": [],
      "lastUpdated": "2024-09-20",
      "sections": [
        {
          "id": "pto-overview",
          "title": "Overview",
          "content": "Airbnb offers flexible PTO. There is no set number of days - take the time you need with manager approval. Most employees take 15-25 days per year plus holidays.",
          "tags": ["pto", "vacation", "time-off"]
        },
        {
          "id": "pto-request",
          "title": "Requesting Time Off",
          "content": "Submit PTO requests in Workday at least 2 weeks in advance. For extended leave (2+ weeks), provide 30 days notice when possible.\n\nEnsure coverage for critical responsibilities before taking time off.",
          "tags": ["request", "approval", "workday"]
        }
      ]
    },
    {
      "id": "security-data-handling",
      "name": "Security & Data Handling",
      "category": "security",
      "summary": "Guidelines for handling sensitive data including PII, payment info, and trust & safety content",
      "applicableRoles": ["software-engineer"],
      "lastUpdated": "2024-11-10",
      "sections": [
        {
          "id": "sec-pii",
          "title": "PII Handling",
          "content": "All access to Personally Identifiable Information (PII) must be logged and monitored.\n\n**Access Requirements**: Manager approval required for non-Trust & Safety roles. Complete 'Security Fundamentals' training before access is granted.\n\n**Data Protection**: All PII must be encrypted at rest and in transit. Never store PII in logs or non-production environments.",
          "applicableRoles": ["software-engineer"],
          "tags": ["pii", "security", "data-protection"]
        }
      ]
    }
  ]
}
```

---

## 4. org-chart.json

Organizational hierarchy for team context and people recommendations.

### Schema

```typescript
interface OrgChart {
  departments: Department[];
}

interface Department {
  id: string;
  name: string;
  teams: Team[];
}

interface Team {
  id: string;
  name: string;
  lead: {
    id: string;
    name: string;
    title: string;
  };
  members: TeamMember[];
}

interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: string;
  startDate: string;
}
```

### Example Data

```json
{
  "departments": [
    {
      "id": "engineering",
      "name": "Engineering",
      "teams": [
        {
          "id": "trust-safety-eng",
          "name": "Trust & Safety - Content Moderation",
          "lead": {
            "id": "E54321",
            "name": "Jordan Smith",
            "title": "Engineering Manager"
          },
          "members": [
            {
              "id": "E12345",
              "name": "Alex Chen",
              "title": "Software Engineer II",
              "role": "software-engineer",
              "startDate": "2024-01-15"
            },
            {
              "id": "E11111",
              "name": "Sam Rivera",
              "title": "Senior Software Engineer",
              "role": "software-engineer",
              "startDate": "2022-03-10"
            },
            {
              "id": "E22222",
              "name": "Morgan Lee",
              "title": "Staff Software Engineer",
              "role": "software-engineer",
              "startDate": "2020-06-15"
            }
          ]
        }
      ]
    },
    {
      "id": "product",
      "name": "Product",
      "teams": [
        {
          "id": "experiences-product",
          "name": "Experiences",
          "lead": {
            "id": "E77777",
            "name": "Casey Park",
            "title": "Senior Product Manager"
          },
          "members": [
            {
              "id": "E23456",
              "name": "Taylor Morgan",
              "title": "Product Manager",
              "role": "product-manager",
              "startDate": "2024-01-15"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## 5. people-directory.json

Employee directory with role-based recommendations for smart introductions.

### Schema

```typescript
interface PeopleDirectory {
  people: Person[];
  recommendations: RecommendationRule[];
}

interface Person {
  id: string;
  name: string;
  title: string;
  role: string;
  department: string;
  team: string;
  avatar?: string;
  bio: string;
  expertise: string[];
  startDate: string;
  location: string;
  timezone: string;
}

interface RecommendationRule {
  forRole: string;                // Which role gets this recommendation
  recommendedPeople: RecommendedPerson[];
}

interface RecommendedPerson {
  personId: string;
  relationship: "manager" | "buddy" | "peer" | "cross-functional" | "mentor";
  priority: number;               // 1 = highest priority
  reason: string;                 // Why they should meet
  suggestedTiming: "week-1" | "week-2" | "month-1" | "flexible";
}
```

### Example Data

```json
{
  "people": [
    {
      "id": "E54321",
      "name": "Jordan Smith",
      "title": "Engineering Manager",
      "role": "engineering-manager",
      "department": "Engineering",
      "team": "Trust & Safety - Content Moderation",
      "avatar": "/avatars/jordan-smith.jpg",
      "bio": "Leading the Trust & Safety engineering team. Former Staff Engineer at Meta, passionate about ML and content moderation systems.",
      "expertise": ["ML Systems", "Content Moderation", "Team Leadership"],
      "startDate": "2021-08-15",
      "location": "San Francisco, CA",
      "timezone": "America/Los_Angeles"
    },
    {
      "id": "E11111",
      "name": "Sam Rivera",
      "title": "Senior Software Engineer",
      "role": "software-engineer",
      "department": "Engineering",
      "team": "Trust & Safety - Content Moderation",
      "avatar": "/avatars/sam-rivera.jpg",
      "bio": "Your onboarding buddy! Been at Airbnb for 3 years working on content classification systems. Happy to help with anything.",
      "expertise": ["Python", "ML Pipelines", "Content Classification"],
      "startDate": "2022-03-10",
      "location": "Remote - Austin, TX",
      "timezone": "America/Chicago"
    }
  ],
  "recommendations": [
    {
      "forRole": "software-engineer",
      "recommendedPeople": [
        {
          "personId": "E54321",
          "relationship": "manager",
          "priority": 1,
          "reason": "Your direct manager - weekly 1:1s",
          "suggestedTiming": "week-1"
        },
        {
          "personId": "E11111",
          "relationship": "buddy",
          "priority": 2,
          "reason": "Your onboarding buddy - reach out for any questions",
          "suggestedTiming": "week-1"
        },
        {
          "personId": "E22222",
          "relationship": "peer",
          "priority": 3,
          "reason": "Staff Engineer on your team - technical mentor",
          "suggestedTiming": "week-2"
        },
        {
          "personId": "E33333",
          "relationship": "cross-functional",
          "priority": 4,
          "reason": "PM partner for Trust & Safety features",
          "suggestedTiming": "week-2"
        }
      ]
    }
  ]
}
```

---

## 6. learning-paths.json

Training courses and learning paths by role.

### Schema

```typescript
interface LearningPaths {
  courses: Course[];
  pathsByRole: { [roleId: string]: RoleLearningPath };
}

interface Course {
  id: string;
  title: string;
  provider: "Degreed" | "LinkedIn Learning" | "Internal" | "Coursera";
  duration: number;               // Minutes
  format: "video" | "interactive" | "reading" | "workshop";
  description: string;
  url?: string;
  tags: string[];
}

interface RoleLearningPath {
  roleId: string;
  required: LearningItem[];
  recommended: LearningItem[];
}

interface LearningItem {
  courseId: string;
  deadline?: string;              // ISO date or "Day X"
  reason: string;                 // Why it's important for this role
}
```

### Example Data

```json
{
  "courses": [
    {
      "id": "security-fundamentals",
      "title": "Security Fundamentals for Engineers",
      "provider": "Internal",
      "duration": 30,
      "format": "interactive",
      "description": "Learn Airbnb's security principles, data handling requirements, and common vulnerabilities to avoid.",
      "tags": ["security", "required", "engineering"]
    },
    {
      "id": "trust-safety-practices",
      "title": "Trust & Safety Engineering Practices",
      "provider": "Internal",
      "duration": 45,
      "format": "video",
      "description": "Deep dive into Trust & Safety systems: content moderation, ML models, and handling sensitive data.",
      "tags": ["trust-safety", "engineering", "ml"]
    },
    {
      "id": "python-ml-advanced",
      "title": "Advanced Python for ML Engineers",
      "provider": "LinkedIn Learning",
      "duration": 120,
      "format": "video",
      "description": "Master advanced Python patterns for building production ML systems.",
      "url": "https://linkedin.com/learning/...",
      "tags": ["python", "ml", "advanced"]
    }
  ],
  "pathsByRole": {
    "software-engineer": {
      "roleId": "software-engineer",
      "required": [
        {
          "courseId": "security-fundamentals",
          "deadline": "Day 7",
          "reason": "Required before accessing production systems"
        },
        {
          "courseId": "trust-safety-practices",
          "deadline": "Day 14",
          "reason": "Essential for working with sensitive content"
        }
      ],
      "recommended": [
        {
          "courseId": "python-ml-advanced",
          "reason": "Popular with your team for improving ML system skills"
        }
      ]
    }
  }
}
```

---

## 7. onboarding-tasks.json

Role-specific onboarding checklists.

### Schema

```typescript
interface OnboardingTasks {
  tasksByRole: { [roleId: string]: RoleTaskList };
}

interface RoleTaskList {
  roleId: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  category: "admin" | "technical" | "social" | "learning";
  timeline: "day-1" | "week-1" | "week-2" | "month-1" | "month-2";
  estimatedTime: number;          // Minutes
  required: boolean;
  links?: TaskLink[];
  subtasks?: Subtask[];
}

interface TaskLink {
  label: string;
  url: string;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}
```

### Example Data

```json
{
  "tasksByRole": {
    "software-engineer": {
      "roleId": "software-engineer",
      "tasks": [
        {
          "id": "eng-setup-laptop",
          "title": "Set up development environment",
          "description": "Install required tools, configure SSH keys, and clone main repositories.",
          "category": "technical",
          "timeline": "day-1",
          "estimatedTime": 120,
          "required": true,
          "links": [
            {
              "label": "Engineering Setup Guide",
              "url": "/docs/eng-setup"
            }
          ],
          "subtasks": [
            {
              "id": "eng-setup-1",
              "title": "Install Homebrew and core CLI tools",
              "completed": false
            },
            {
              "id": "eng-setup-2",
              "title": "Configure SSH keys for GitHub",
              "completed": false
            },
            {
              "id": "eng-setup-3",
              "title": "Clone airbnb/main repository",
              "completed": false
            },
            {
              "id": "eng-setup-4",
              "title": "Run local development environment",
              "completed": false
            }
          ]
        },
        {
          "id": "eng-security-training",
          "title": "Complete security training",
          "description": "Required security fundamentals course before accessing production systems.",
          "category": "learning",
          "timeline": "week-1",
          "estimatedTime": 30,
          "required": true,
          "links": [
            {
              "label": "Start Security Training",
              "url": "/learning/security-fundamentals"
            }
          ]
        },
        {
          "id": "eng-meet-team",
          "title": "Schedule intro meetings with team",
          "description": "Meet your manager, onboarding buddy, and key team members.",
          "category": "social",
          "timeline": "week-1",
          "estimatedTime": 180,
          "required": true,
          "links": [
            {
              "label": "View Recommended People",
              "url": "/people"
            }
          ]
        },
        {
          "id": "eng-first-commit",
          "title": "Ship your first commit",
          "description": "Make a small code contribution to get familiar with our development workflow.",
          "category": "technical",
          "timeline": "week-2",
          "estimatedTime": 240,
          "required": false
        }
      ]
    },
    "product-manager": {
      "roleId": "product-manager",
      "tasks": [
        {
          "id": "pm-product-overview",
          "title": "Review product area documentation",
          "description": "Read through your product area's strategy docs, roadmap, and recent launches.",
          "category": "learning",
          "timeline": "day-1",
          "estimatedTime": 180,
          "required": true
        },
        {
          "id": "pm-stakeholder-map",
          "title": "Create stakeholder map",
          "description": "Identify key stakeholders across Engineering, Design, Data, and leadership.",
          "category": "social",
          "timeline": "week-1",
          "estimatedTime": 90,
          "required": true
        }
      ]
    }
  }
}
```

---

## Usage in Code

### Accessing Mock Data

```typescript
// lib/mock-data/index.ts
import employees from './employees.json';
import roles from './roles.json';
import policies from './policies.json';
import orgChart from './org-chart.json';
import peopleDirectory from './people-directory.json';
import learningPaths from './learning-paths.json';
import onboardingTasks from './onboarding-tasks.json';

export const mockData = {
  employees,
  roles,
  policies,
  orgChart,
  peopleDirectory,
  learningPaths,
  onboardingTasks,
};
```

### Example Service Usage

```typescript
// lib/data-access/employeeService.ts
import { mockData } from '@/lib/mock-data';

export function getEmployeeById(id: string) {
  return mockData.employees.employees.find(emp => emp.id === id);
}

export function getEmployeeByRole(roleId: string) {
  return mockData.employees.employees.find(emp => emp.roleId === roleId);
}
```

---

## Data Relationships

```
Employee (E12345)
  ├─> Role (software-engineer)
  │     └─> Skill (airbnb-onboarding-software-engineer)
  ├─> Manager (E54321)
  ├─> Onboarding Buddy (E11111)
  ├─> Team (trust-safety-eng)
  │     └─> Department (engineering)
  ├─> Recommended People
  │     └─> Based on Role + Team
  ├─> Learning Path
  │     └─> Based on Role
  └─> Onboarding Tasks
        └─> Based on Role
```

---

## Next Steps

1. Create actual JSON files in `/lib/mock-data/`
2. Implement data access services in `/lib/data-access/`
3. Build Skills files that reference this data
4. Wire up components to consume mock data

---

**Last Updated**: December 29, 2024  
**Status**: Schema defined - ready to create JSON files
