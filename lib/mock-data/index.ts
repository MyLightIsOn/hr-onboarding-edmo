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

export type Employee = typeof employees.employees[0];
export type Role = typeof roles.roles[0];
export type Policy = typeof policies.policies[0];
export type Person = typeof peopleDirectory.people[0];
export type Course = typeof learningPaths.courses[0];
export type Task = typeof onboardingTasks.tasksByRole['software-engineer']['tasks'][0];
