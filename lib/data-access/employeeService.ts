/**
 * Employee Service
 * 
 * Provides access to employee data from mock data sources.
 * In production, this would query the Workday API.
 */

import { mockData } from '@/lib/mock-data';
import type { Employee } from '@/lib/types';

/**
 * Get all employees
 */
export function getAllEmployees(): Employee[] {
  return mockData.employees.employees as Employee[];
}

/**
 * Get employee by ID
 * @param id - Employee ID (e.g., "E12345")
 */
export function getEmployeeById(id: string): Employee | undefined {
  return (mockData.employees.employees as Employee[]).find(emp => emp.id === id);
}

/**
 * Get employee by role ID
 * Useful for demo - gets the first employee with this role
 * @param roleId - Role ID (e.g., "software-engineer")
 */
export function getEmployeeByRole(roleId: string): Employee | undefined {
  return (mockData.employees.employees as Employee[]).find(emp => emp.roleId === roleId);
}

/**
 * Get all employees by role ID
 * @param roleId - Role ID (e.g., "software-engineer")
 */
export function getEmployeesByRole(roleId: string): Employee[] {
  return (mockData.employees.employees as Employee[]).filter(emp => emp.roleId === roleId);
}

/**
 * Get employees by department
 * @param department - Department name (e.g., "Engineering")
 */
export function getEmployeesByDepartment(department: string): Employee[] {
  return (mockData.employees.employees as Employee[]).filter(
    emp => emp.department === department
  );
}

/**
 * Get employees by team
 * @param team - Team name (e.g., "Trust & Safety - Content Moderation")
 */
export function getEmployeesByTeam(team: string): Employee[] {
  return (mockData.employees.employees as Employee[]).filter(emp => emp.team === team);
}

/**
 * Get employee's manager
 * @param employeeId - Employee ID
 */
export function getManager(employeeId: string): Employee | undefined {
  const employee = getEmployeeById(employeeId);
  if (!employee) return undefined;
  return getEmployeeById(employee.manager.id);
}

/**
 * Get employee's onboarding buddy
 * @param employeeId - Employee ID
 */
export function getOnboardingBuddy(employeeId: string): Employee | undefined {
  const employee = getEmployeeById(employeeId);
  if (!employee) return undefined;
  return getEmployeeById(employee.onboardingBuddy.id);
}

/**
 * Get employee's direct reports (if manager)
 * @param managerId - Manager's employee ID
 */
export function getDirectReports(managerId: string): Employee[] {
  return (mockData.employees.employees as Employee[]).filter(
    emp => emp.manager.id === managerId
  );
}

/**
 * Calculate days since employee started
 * @param employeeId - Employee ID
 */
export function getDaysSinceStart(employeeId: string): number | undefined {
  const employee = getEmployeeById(employeeId);
  if (!employee) return undefined;
  
  const startDate = new Date(employee.startDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Get onboarding status based on start date
 * @param employeeId - Employee ID
 */
export function getOnboardingPhase(employeeId: string): 
  "day-1" | "week-1" | "week-2" | "month-1" | "month-2" | "complete" | undefined {
  const days = getDaysSinceStart(employeeId);
  if (days === undefined) return undefined;
  
  if (days === 1) return "day-1";
  if (days <= 7) return "week-1";
  if (days <= 14) return "week-2";
  if (days <= 30) return "month-1";
  if (days <= 60) return "month-2";
  return "complete";
}

/**
 * Search employees by name
 * @param query - Search query
 */
export function searchEmployeesByName(query: string): Employee[] {
  const lowerQuery = query.toLowerCase();
  return (mockData.employees.employees as Employee[]).filter(emp =>
    emp.name.toLowerCase().includes(lowerQuery)
  );
}
