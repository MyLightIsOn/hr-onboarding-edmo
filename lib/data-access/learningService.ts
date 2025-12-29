/**
 * Learning Service
 *
 * Manages learning paths, courses, and training recommendations.
 * In production, this would query the LMS API (e.g., Degreed).
 */

import { mockData } from '@/lib/mock-data';
import type { Course, LearningPath, LearningItemWithCourse } from '@/lib/types';

/**
 * Get all courses
 */
export function getAllCourses(): Course[] {
    return mockData.learningPaths.courses as Course[];
}

/**
 * Get course by ID
 * @param id - Course ID (e.g., "security-fundamentals")
 */
export function getCourseById(id: string): Course | undefined {
    return (mockData.learningPaths.courses as Course[]).find(course => course.id === id);
}

/**
 * Get learning path for a role
 * Returns both required and recommended courses with full course details
 * @param roleId - Role ID (e.g., "software-engineer")
 */
export function getLearningPathByRole(roleId: string): LearningPath | undefined {
    const pathData = mockData.learningPaths.pathsByRole[roleId as keyof typeof mockData.learningPaths.pathsByRole];
    if (!pathData) return undefined;

    // Hydrate learning items with full course data
    const required: LearningItemWithCourse[] = pathData.required.map(item => {
        const course = getCourseById(item.courseId);
        if (!course) throw new Error(`Course not found: ${item.courseId}`);
        return {
            ...item,
            course,
        };
    });

    const recommended: LearningItemWithCourse[] = pathData.recommended.map(item => {
        const course = getCourseById(item.courseId);
        if (!course) throw new Error(`Course not found: ${item.courseId}`);
        return {
            ...item,
            course,
        };
    });

    return {
        roleId: pathData.roleId,
        required,
        recommended,
    };
}

/**
 * Get required courses for a role
 * @param roleId - Role ID
 */
export function getRequiredCourses(roleId: string): LearningItemWithCourse[] {
    const learningPath = getLearningPathByRole(roleId);
    return learningPath?.required || [];
}

/**
 * Get recommended courses for a role
 * @param roleId - Role ID
 */
export function getRecommendedCourses(roleId: string): LearningItemWithCourse[] {
    const learningPath = getLearningPathByRole(roleId);
    return learningPath?.recommended || [];
}

/**
 * Get all courses for a role (required + recommended)
 * @param roleId - Role ID
 */
export function getAllCoursesForRole(roleId: string): LearningItemWithCourse[] {
    const learningPath = getLearningPathByRole(roleId);
    if (!learningPath) return [];
    return [...learningPath.required, ...learningPath.recommended];
}

/**
 * Get courses by provider
 * @param provider - Course provider (e.g., "Internal", "LinkedIn Learning")
 */
export function getCoursesByProvider(provider: string): Course[] {
    return (mockData.learningPaths.courses as Course[]).filter(
        course => course.provider === provider
    );
}

/**
 * Get courses by format
 * @param format - Course format (e.g., "video", "interactive")
 */
export function getCoursesByFormat(format: string): Course[] {
    return (mockData.learningPaths.courses as Course[]).filter(
        course => course.format === format
    );
}

/**
 * Search courses by tag
 * @param tag - Tag to search for (e.g., "security", "engineering")
 */
export function getCoursesByTag(tag: string): Course[] {
    return (mockData.learningPaths.courses as Course[]).filter(
        course => course.tags.includes(tag)
    );
}

/**
 * Search courses by title or description
 * @param query - Search query
 */
export function searchCourses(query: string): Course[] {
    const lowerQuery = query.toLowerCase();
    return (mockData.learningPaths.courses as Course[]).filter(
        course =>
            course.title.toLowerCase().includes(lowerQuery) ||
            course.description.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Get total required training time for a role
 * @param roleId - Role ID
 */
export function getTotalRequiredTime(roleId: string): number {
    const required = getRequiredCourses(roleId);
    return required.reduce((total, item) => total + item.course.duration, 0);
}

/**
 * Get total recommended training time for a role
 * @param roleId - Role ID
 */
export function getTotalRecommendedTime(roleId: string): number {
    const recommended = getRecommendedCourses(roleId);
    return recommended.reduce((total, item) => total + item.course.duration, 0);
}

/**
 * Get courses with deadlines approaching
 * @param roleId - Role ID
 * @param daysThreshold - Number of days to consider "approaching" (default: 7)
 */
export function getCoursesWithUpcomingDeadlines(
    roleId: string,
    daysThreshold: number = 7
): LearningItemWithCourse[] {
    const required = getRequiredCourses(roleId);

    // For demo purposes, we'll consider courses with "Day X" or "Week X" deadlines as upcoming
    return required.filter(item => {
        if (!item.deadline) return false;
        // Simple check for Day or Week deadlines
        return item.deadline.toLowerCase().includes('day') ||
            item.deadline.toLowerCase().includes('week');
    });
}

/**
 * Calculate learning progress
 * @param roleId - Role ID
 * @param completedCourseIds - Array of completed course IDs
 */
export function calculateLearningProgress(
    roleId: string,
    completedCourseIds: string[] = []
): {
    totalCourses: number;
    completedCourses: number;
    percentage: number;
    requiredCompleted: number;
    requiredTotal: number;
} {
    const allCourses = getAllCoursesForRole(roleId);
    const required = getRequiredCourses(roleId);

    const totalCourses = allCourses.length;
    const completedCourses = completedCourseIds.length;
    const percentage = totalCourses > 0
        ? Math.round((completedCourses / totalCourses) * 100)
        : 0;

    const requiredTotal = required.length;
    const requiredCompleted = required.filter(item =>
        completedCourseIds.includes(item.course.id)
    ).length;

    return {
        totalCourses,
        completedCourses,
        percentage,
        requiredCompleted,
        requiredTotal,
    };
}

/**
 * Check if all required training is complete
 * @param roleId - Role ID
 * @param completedCourseIds - Array of completed course IDs
 */
export function isRequiredTrainingComplete(
    roleId: string,
    completedCourseIds: string[] = []
): boolean {
    const required = getRequiredCourses(roleId);
    return required.every(item => completedCourseIds.includes(item.course.id));
}

/**
 * Get next recommended course to take
 * Returns first incomplete required course, or first incomplete recommended course
 * @param roleId - Role ID
 * @param completedCourseIds - Array of completed course IDs
 */
export function getNextCourse(
    roleId: string,
    completedCourseIds: string[] = []
): LearningItemWithCourse | undefined {
    const required = getRequiredCourses(roleId);
    const recommended = getRecommendedCourses(roleId);

    // Find first incomplete required course
    const nextRequired = required.find(
        item => !completedCourseIds.includes(item.course.id)
    );

    if (nextRequired) return nextRequired;

    // If all required complete, find first incomplete recommended
    return recommended.find(
        item => !completedCourseIds.includes(item.course.id)
    );
}
