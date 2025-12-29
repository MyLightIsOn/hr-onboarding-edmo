/**
 * Role Service
 * 
 * Provides access to role definitions and metadata.
 * Maps roles to their corresponding Skills.
 */

import { mockData } from '@/lib/mock-data';
import type { Role, SelectOption } from '@/lib/types';

/**
 * Get all roles
 */
export function getAllRoles(): Role[] {
  return mockData.roles.roles as Role[];
}

/**
 * Get role by ID
 * @param id - Role ID (e.g., "software-engineer")
 */
export function getRoleById(id: string): Role | undefined {
  return (mockData.roles.roles as Role[]).find(role => role.id === id);
}

/**
 * Get role by category
 * @param category - Role category (e.g., "engineering")
 */
export function getRolesByCategory(category: string): Role[] {
  return (mockData.roles.roles as Role[]).filter(role => role.category === category);
}

/**
 * Get role by department
 * @param department - Department name (e.g., "Engineering")
 */
export function getRolesByDepartment(department: string): Role[] {
  return (mockData.roles.roles as Role[]).filter(role => role.department === department);
}

/**
 * Get the Agent Skill name for a role
 * Used for Skills routing
 * @param roleId - Role ID
 */
export function getRoleSkillName(roleId: string): string | undefined {
  const role = getRoleById(roleId);
  return role?.skillName;
}

/**
 * Get required training course IDs for a role
 * @param roleId - Role ID
 */
export function getRequiredTraining(roleId: string): string[] {
  const role = getRoleById(roleId);
  return role?.requiredTraining || [];
}

/**
 * Get common teams for a role
 * @param roleId - Role ID
 */
export function getCommonTeams(roleId: string): string[] {
  const role = getRoleById(roleId);
  return role?.commonTeams || [];
}

/**
 * Get typical levels for a role
 * @param roleId - Role ID
 */
export function getTypicalLevels(roleId: string): string[] {
  const role = getRoleById(roleId);
  return role?.typicalLevel || [];
}

/**
 * Get roles as select options (for UI dropdowns)
 */
export function getRolesAsOptions(): SelectOption[] {
  return mockData.roles.roles.map(role => ({
    value: role.id,
    label: role.title,
    description: role.description,
  }));
}

/**
 * Search roles by query
 * @param query - Search query
 */
export function searchRoles(query: string): Role[] {
  const lowerQuery = query.toLowerCase();
  return (mockData.roles.roles as Role[]).filter(
    role =>
      role.title.toLowerCase().includes(lowerQuery) ||
      role.description.toLowerCase().includes(lowerQuery) ||
      role.department.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Check if a role exists
 * @param roleId - Role ID
 */
export function roleExists(roleId: string): boolean {
  return getRoleById(roleId) !== undefined;
}

/**
 * Get role display information (for cards/headers)
 * @param roleId - Role ID
 */
export function getRoleDisplay(roleId: string): {
  title: string;
  department: string;
  description: string;
  category: string;
} | undefined {
  const role = getRoleById(roleId);
  if (!role) return undefined;
  
  return {
    title: role.title,
    department: role.department,
    description: role.description,
    category: role.category,
  };
}
