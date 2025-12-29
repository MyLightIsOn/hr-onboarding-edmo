/**
 * Task Service
 * 
 * Manages onboarding tasks and progress tracking.
 * In production, this would sync with a task management system.
 */

import { mockData } from '@/lib/mock-data';
import type { Task, TaskTimeline, TaskCategory, TaskProgress } from '@/lib/types';

/**
 * Get all tasks for a role
 * @param roleId - Role ID (e.g., "software-engineer")
 */
export function getTasksByRole(roleId: string): Task[] {
  const roleTasks = mockData.onboardingTasks.tasksByRole[roleId as keyof typeof mockData.onboardingTasks.tasksByRole];
  return (roleTasks?.tasks as Task[]) || [];
}

/**
 * Get tasks by timeline
 * @param roleId - Role ID
 * @param timeline - Timeline filter (e.g., "week-1")
 */
export function getTasksByTimeline(
  roleId: string,
  timeline: TaskTimeline
): Task[] {
  const tasks = getTasksByRole(roleId);
  return tasks.filter(task => task.timeline === timeline);
}

/**
 * Get tasks by category
 * @param roleId - Role ID
 * @param category - Category filter (e.g., "technical")
 */
export function getTasksByCategory(
  roleId: string,
  category: TaskCategory
): Task[] {
  const tasks = getTasksByRole(roleId);
  return tasks.filter(task => task.category === category);
}

/**
 * Get required tasks only
 * @param roleId - Role ID
 */
export function getRequiredTasks(roleId: string): Task[] {
  const tasks = getTasksByRole(roleId);
  return tasks.filter(task => task.required);
}

/**
 * Get optional tasks
 * @param roleId - Role ID
 */
export function getOptionalTasks(roleId: string): Task[] {
  const tasks = getTasksByRole(roleId);
  return tasks.filter(task => !task.required);
}

/**
 * Get task by ID
 * @param roleId - Role ID
 * @param taskId - Task ID
 */
export function getTaskById(roleId: string, taskId: string): Task | undefined {
  const tasks = getTasksByRole(roleId);
  return tasks.find(task => task.id === taskId);
}

/**
 * Calculate progress for a role
 * @param roleId - Role ID
 * @param completedIds - Array of completed task IDs
 */
export function calculateProgress(
  roleId: string,
  completedIds: string[] = []
): TaskProgress {
  const allTasks = getTasksByRole(roleId);
  const requiredTasks = getRequiredTasks(roleId);
  
  const total = allTasks.length;
  const completed = completedIds.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const requiredTotal = requiredTasks.length;
  const requiredCompleted = requiredTasks.filter(t =>
    completedIds.includes(t.id)
  ).length;
  
  return {
    total,
    completed,
    percentage,
    requiredCompleted,
    requiredTotal,
  };
}

/**
 * Get next recommended task
 * Returns the first incomplete required task, or first incomplete optional task
 * @param roleId - Role ID
 * @param completedIds - Array of completed task IDs
 * @param currentPhase - Current onboarding phase (optional, for filtering)
 */
export function getNextTask(
  roleId: string,
  completedIds: string[] = [],
  currentPhase?: TaskTimeline
): Task | undefined {
  const allTasks = getTasksByRole(roleId);
  
  // Filter by phase if provided
  const phaseTasks = currentPhase
    ? allTasks.filter(t => t.timeline === currentPhase)
    : allTasks;
  
  // Find first incomplete required task
  const nextRequired = phaseTasks.find(
    task => task.required && !completedIds.includes(task.id)
  );
  
  if (nextRequired) return nextRequired;
  
  // If no required tasks left, find first incomplete optional task
  return phaseTasks.find(
    task => !task.required && !completedIds.includes(task.id)
  );
}

/**
 * Get tasks with estimated completion time
 * @param roleId - Role ID
 * @param completedIds - Array of completed task IDs
 */
export function getEstimatedTimeRemaining(
  roleId: string,
  completedIds: string[] = []
): number {
  const allTasks = getTasksByRole(roleId);
  const incompleteTasks = allTasks.filter(t => !completedIds.includes(t.id));
  
  return incompleteTasks.reduce((total, task) => total + task.estimatedTime, 0);
}

/**
 * Get tasks grouped by timeline
 * @param roleId - Role ID
 */
export function getTasksGroupedByTimeline(roleId: string): Record<TaskTimeline, Task[]> {
  const tasks = getTasksByRole(roleId);
  
  const grouped: Record<string, Task[]> = {
    "day-1": [],
    "week-1": [],
    "week-2": [],
    "month-1": [],
    "month-2": [],
  };
  
  tasks.forEach(task => {
    if (grouped[task.timeline]) {
      grouped[task.timeline].push(task);
    }
  });
  
  return grouped as Record<TaskTimeline, Task[]>;
}

/**
 * Get tasks grouped by category
 * @param roleId - Role ID
 */
export function getTasksGroupedByCategory(roleId: string): Record<TaskCategory, Task[]> {
  const tasks = getTasksByRole(roleId);
  
  const grouped: Record<string, Task[]> = {
    admin: [],
    technical: [],
    social: [],
    learning: [],
  };
  
  tasks.forEach(task => {
    if (grouped[task.category]) {
      grouped[task.category].push(task);
    }
  });
  
  return grouped as Record<TaskCategory, Task[]>;
}

/**
 * Get task completion percentage by category
 * @param roleId - Role ID
 * @param completedIds - Array of completed task IDs
 */
export function getProgressByCategory(
  roleId: string,
  completedIds: string[] = []
): Record<TaskCategory, number> {
  const grouped = getTasksGroupedByCategory(roleId);
  
  const progress: Record<string, number> = {};
  
  Object.entries(grouped).forEach(([category, tasks]) => {
    const categoryCompleted = tasks.filter(t => 
      completedIds.includes(t.id)
    ).length;
    const categoryTotal = tasks.length;
    progress[category] = categoryTotal > 0 
      ? Math.round((categoryCompleted / categoryTotal) * 100) 
      : 0;
  });
  
  return progress as Record<TaskCategory, number>;
}

/**
 * Check if all required tasks are complete
 * @param roleId - Role ID
 * @param completedIds - Array of completed task IDs
 */
export function areRequiredTasksComplete(
  roleId: string,
  completedIds: string[] = []
): boolean {
  const required = getRequiredTasks(roleId);
  return required.every(task => completedIds.includes(task.id));
}
