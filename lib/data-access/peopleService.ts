/**
 * People Service
 * 
 * Manages employee directory and smart recommendations.
 * In production, this would query the employee directory API.
 */

import { mockData } from '@/lib/mock-data';
import type { Person, RecommendedPerson, Relationship, SuggestedTiming } from '@/lib/types';

/**
 * Get all people from directory
 */
export function getAllPeople(): Person[] {
  return mockData.peopleDirectory.people;
}

/**
 * Get person by ID
 * @param id - Person ID (e.g., "E12345")
 */
export function getPersonById(id: string): Person | undefined {
  return mockData.peopleDirectory.people.find(person => person.id === id);
}

/**
 * Get people by department
 * @param department - Department name
 */
export function getPeopleByDepartment(department: string): Person[] {
  return mockData.peopleDirectory.people.filter(
    person => person.department === department
  );
}

/**
 * Get people by team
 * @param team - Team name
 */
export function getPeopleByTeam(team: string): Person[] {
  return mockData.peopleDirectory.people.filter(
    person => person.team === team
  );
}

/**
 * Get people by role
 * @param role - Role name
 */
export function getPeopleByRole(role: string): Person[] {
  return mockData.peopleDirectory.people.filter(
    person => person.role === role
  );
}

/**
 * Get recommended people for a role
 * Returns people with full details sorted by priority
 * @param roleId - Role ID (e.g., "software-engineer")
 */
export function getRecommendedPeople(roleId: string): RecommendedPerson[] {
  const recommendation = mockData.peopleDirectory.recommendations.find(
    rec => rec.forRole === roleId
  );
  
  if (!recommendation) return [];
  
  return recommendation.recommendedPeople
    .map(rec => {
      const person = getPersonById(rec.personId);
      if (!person) return null;
      
      return {
        person,
        relationship: rec.relationship,
        priority: rec.priority,
        reason: rec.reason,
        suggestedTiming: rec.suggestedTiming,
      };
    })
    .filter((rec): rec is RecommendedPerson => rec !== null)
    .sort((a, b) => a.priority - b.priority);
}

/**
 * Get recommended people by timing
 * @param roleId - Role ID
 * @param timing - Suggested timing filter
 */
export function getRecommendedPeopleByTiming(
  roleId: string,
  timing: SuggestedTiming
): RecommendedPerson[] {
  const allRecommended = getRecommendedPeople(roleId);
  return allRecommended.filter(rec => rec.suggestedTiming === timing);
}

/**
 * Get recommended people by relationship
 * @param roleId - Role ID
 * @param relationship - Relationship filter
 */
export function getRecommendedPeopleByRelationship(
  roleId: string,
  relationship: Relationship
): RecommendedPerson[] {
  const allRecommended = getRecommendedPeople(roleId);
  return allRecommended.filter(rec => rec.relationship === relationship);
}

/**
 * Get recommended people by priority level
 * @param roleId - Role ID
 * @param maxPriority - Maximum priority (lower number = higher priority)
 */
export function getHighPriorityPeople(
  roleId: string,
  maxPriority: number = 3
): RecommendedPerson[] {
  const allRecommended = getRecommendedPeople(roleId);
  return allRecommended.filter(rec => rec.priority <= maxPriority);
}

/**
 * Get manager recommendation
 * @param roleId - Role ID
 */
export function getManagerRecommendation(roleId: string): RecommendedPerson | undefined {
  const allRecommended = getRecommendedPeople(roleId);
  return allRecommended.find(rec => rec.relationship === "manager");
}

/**
 * Get buddy recommendation
 * @param roleId - Role ID
 */
export function getBuddyRecommendation(roleId: string): RecommendedPerson | undefined {
  const allRecommended = getRecommendedPeople(roleId);
  return allRecommended.find(rec => rec.relationship === "buddy");
}

/**
 * Get peer recommendations
 * @param roleId - Role ID
 */
export function getPeerRecommendations(roleId: string): RecommendedPerson[] {
  const allRecommended = getRecommendedPeople(roleId);
  return allRecommended.filter(rec => rec.relationship === "peer");
}

/**
 * Get cross-functional recommendations
 * @param roleId - Role ID
 */
export function getCrossFunctionalRecommendations(roleId: string): RecommendedPerson[] {
  const allRecommended = getRecommendedPeople(roleId);
  return allRecommended.filter(rec => rec.relationship === "cross-functional");
}

/**
 * Search people by name
 * @param query - Search query
 */
export function searchPeopleByName(query: string): Person[] {
  const lowerQuery = query.toLowerCase();
  return mockData.peopleDirectory.people.filter(person =>
    person.name.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Search people by expertise
 * @param expertise - Expertise keyword
 */
export function searchPeopleByExpertise(expertise: string): Person[] {
  const lowerExpertise = expertise.toLowerCase();
  return mockData.peopleDirectory.people.filter(person =>
    person.expertise.some(exp => exp.toLowerCase().includes(lowerExpertise))
  );
}

/**
 * Get people in same location
 * @param location - Location string
 */
export function getPeopleInLocation(location: string): Person[] {
  return mockData.peopleDirectory.people.filter(
    person => person.location === location
  );
}

/**
 * Get people in same timezone
 * @param timezone - IANA timezone
 */
export function getPeopleInTimezone(timezone: string): Person[] {
  return mockData.peopleDirectory.people.filter(
    person => person.timezone === timezone
  );
}

/**
 * Get count of recommended people by timing
 * Useful for dashboard widgets
 * @param roleId - Role ID
 */
export function getRecommendationCountsByTiming(roleId: string): Record<SuggestedTiming, number> {
  const allRecommended = getRecommendedPeople(roleId);
  
  return {
    "week-1": allRecommended.filter(r => r.suggestedTiming === "week-1").length,
    "week-2": allRecommended.filter(r => r.suggestedTiming === "week-2").length,
    "month-1": allRecommended.filter(r => r.suggestedTiming === "month-1").length,
    "flexible": allRecommended.filter(r => r.suggestedTiming === "flexible").length,
  };
}
