// Core data types for the AirOnboard application
// These types match the structure of our mock data

// ============================================================================
// Employee & User Types
// ============================================================================

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  roleId: string;
  department: string;
  team: string;
  level: string;
  startDate: string;
  location: string;
  workType: "remote" | "hybrid" | "onsite";
  timezone: string;
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
  avatar?: string;
}

// ============================================================================
// Role Types
// ============================================================================

export interface Role {
  id: string;
  title: string;
  category: "engineering" | "product" | "operations" | "design" | "data";
  skillName: string;
  description: string;
  department: string;
  commonTeams: string[];
  requiredTraining: string[];
  typicalLevel: string[];
}

// ============================================================================
// Task Types
// ============================================================================

export type TaskCategory = "admin" | "technical" | "social" | "learning";
export type TaskTimeline = "day-1" | "week-1" | "week-2" | "month-1" | "month-2";

export interface TaskLink {
  label: string;
  url: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  timeline: TaskTimeline;
  estimatedTime: number;
  required: boolean;
  links?: TaskLink[];
  subtasks?: Subtask[];
}

export interface TaskProgress {
  total: number;
  completed: number;
  percentage: number;
  requiredCompleted: number;
  requiredTotal: number;
}

// ============================================================================
// People & Directory Types
// ============================================================================

export type Relationship = "manager" | "buddy" | "peer" | "cross-functional" | "mentor";
export type SuggestedTiming = "week-1" | "week-2" | "month-1" | "flexible";

export interface Person {
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

export interface RecommendationRule {
  personId: string;
  relationship: Relationship;
  priority: number;
  reason: string;
  suggestedTiming: SuggestedTiming;
}

export interface RecommendedPerson {
  person: Person;
  relationship: Relationship;
  priority: number;
  reason: string;
  suggestedTiming: SuggestedTiming;
}

// ============================================================================
// Learning & Training Types
// ============================================================================

export type CourseProvider = "Internal" | "LinkedIn Learning" | "Coursera" | "SHRM" | "Reforge";
export type CourseFormat = "video" | "interactive" | "reading" | "workshop";

export interface Course {
  id: string;
  title: string;
  provider: CourseProvider;
  duration: number; // in minutes
  format: CourseFormat;
  description: string;
  url?: string;
  tags: string[];
}

export interface LearningItem {
  courseId: string;
  deadline?: string;
  reason: string;
}

export interface LearningItemWithCourse extends LearningItem {
  course: Course;
}

export interface LearningPath {
  roleId: string;
  required: LearningItemWithCourse[];
  recommended: LearningItemWithCourse[];
}

// ============================================================================
// Policy Types
// ============================================================================

export type PolicyCategory = "pto" | "expense" | "remote-work" | "security" | "benefits" | "conduct";

export interface PolicySection {
  id: string;
  title: string;
  content: string;
  applicableRoles?: string[];
  applicableLocations?: string[];
  tags: string[];
}

export interface Policy {
  id: string;
  name: string;
  category: PolicyCategory;
  summary: string;
  applicableRoles: string[];
  lastUpdated: string;
  sections: PolicySection[];
}

// ============================================================================
// Org Chart Types
// ============================================================================

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  role: string;
  startDate: string;
}

export interface Team {
  id: string;
  name: string;
  lead: {
    id: string;
    name: string;
    title: string;
  };
  members: TeamMember[];
}

export interface Department {
  id: string;
  name: string;
  teams: Team[];
}

// ============================================================================
// Skills Types (for demo visualization)
// ============================================================================

export interface SkillMetadata {
  name: string;
  description: string;
  tokensUsed: number;
  level: 1 | 2 | 3;
}

export interface SkillsLoadState {
  orchestratorLoaded: boolean;
  roleSkillLoaded: boolean;
  roleSkillName?: string;
  additionalResourcesLoaded: string[];
  totalTokens: number;
  dataSourcesAccessed: string[];
}

// ============================================================================
// Mock API Types (for simulating Claude responses)
// ============================================================================

export interface MockAPIRequest {
  role: string;
  question?: string;
  context?: Record<string, any>;
}

export interface MockAPIResponse {
  answer: string;
  citations?: string[];
  skillsUsed: string[];
  tokensUsed: number;
  dataSourcesQueried: string[];
}

// ============================================================================
// UI State Types
// ============================================================================

export interface DashboardState {
  selectedRole: string;
  employee: Employee;
  completedTaskIds: string[];
  showBehindTheScenes: boolean;
  activePanels: {
    chat: boolean;
    people: boolean;
    learning: boolean;
  };
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  citations?: string[];
}

// ============================================================================
// Utility Types
// ============================================================================

export type RoleId = "software-engineer" | "product-manager" | "hr-coordinator";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}
