/**
 * Policy Service
 *
 * Manages HR policies and role-based policy access.
 * In production, this would query a policy management system.
 */

import { mockData } from '@/lib/mock-data';
import type { Policy, PolicySection, PolicyCategory } from '@/lib/types';

/**
 * Get all policies
 */
export function getAllPolicies(): Policy[] {
    return mockData.policies.policies as Policy[];
}

/**
 * Get policy by ID
 * @param id - Policy ID (e.g., "remote-work-policy")
 */
export function getPolicyById(id: string): Policy | undefined {
    return (mockData.policies.policies as Policy[]).find(policy => policy.id === id);
}

/**
 * Get policies by category
 * @param category - Policy category (e.g., "remote-work", "expense")
 */
export function getPoliciesByCategory(category: PolicyCategory): Policy[] {
    return (mockData.policies.policies as Policy[]).filter(
        policy => policy.category === category
    );
}

/**
 * Get policies applicable to a role
 * Returns all policies either with empty applicableRoles (universal)
 * or that specifically include the role
 * @param roleId - Role ID (e.g., "software-engineer")
 */
export function getPoliciesByRole(roleId: string): Policy[] {
    return (mockData.policies.policies as Policy[]).filter(
        policy =>
            policy.applicableRoles.length === 0 ||
            policy.applicableRoles.includes(roleId)
    );
}

/**
 * Get policy sections applicable to a role
 * Filters out sections that don't apply to the role
 * @param policyId - Policy ID
 * @param roleId - Role ID (optional)
 */
export function getPolicySectionsForRole(
    policyId: string,
    roleId?: string
): PolicySection[] {
    const policy = getPolicyById(policyId);
    if (!policy) return [];

    if (!roleId) return policy.sections;

    return policy.sections.filter(section => {
        // If section has no role restrictions, include it
        if (!section.applicableRoles || section.applicableRoles.length === 0) {
            return true;
        }
        // Otherwise, only include if role matches
        return section.applicableRoles.includes(roleId);
    });
}

/**
 * Search policies by query
 * Searches policy name, summary, and section content
 * @param query - Search query
 * @param roleId - Optional role ID to filter results
 */
export function searchPolicies(query: string, roleId?: string): Policy[] {
    const lowerQuery = query.toLowerCase();
    let policies = mockData.policies.policies as Policy[];

    // Filter by role if provided
    if (roleId) {
        policies = policies.filter(
            policy =>
                policy.applicableRoles.length === 0 ||
                policy.applicableRoles.includes(roleId)
        );
    }

    return policies.filter(policy => {
        // Search in policy name and summary
        if (
            policy.name.toLowerCase().includes(lowerQuery) ||
            policy.summary.toLowerCase().includes(lowerQuery)
        ) {
            return true;
        }

        // Search in section titles and content
        return policy.sections.some(
            section =>
                section.title.toLowerCase().includes(lowerQuery) ||
                section.content.toLowerCase().includes(lowerQuery)
        );
    });
}

/**
 * Search policy sections by tag
 * @param tag - Tag to search for
 * @param roleId - Optional role ID to filter results
 */
export function searchPolicySectionsByTag(tag: string, roleId?: string): {
    policy: Policy;
    sections: PolicySection[];
}[] {
    const lowerTag = tag.toLowerCase();
    let policies = mockData.policies.policies as Policy[];

    // Filter by role if provided
    if (roleId) {
        policies = policies.filter(
            policy =>
                policy.applicableRoles.length === 0 ||
                policy.applicableRoles.includes(roleId)
        );
    }

    const results: { policy: Policy; sections: PolicySection[] }[] = [];

    policies.forEach(policy => {
        const matchingSections = policy.sections.filter(section =>
            section.tags.some(t => t.toLowerCase().includes(lowerTag))
        );

        if (matchingSections.length > 0) {
            results.push({
                policy,
                sections: matchingSections,
            });
        }
    });

    return results;
}

/**
 * Get policies by location
 * @param location - Location string (e.g., "US")
 */
export function getPoliciesByLocation(location: string): {
    policy: Policy;
    sections: PolicySection[];
}[] {
    const policies = mockData.policies.policies as Policy[];
    const results: { policy: Policy; sections: PolicySection[] }[] = [];

    policies.forEach(policy => {
        const locationSections = policy.sections.filter(
            section =>
                !section.applicableLocations ||
                section.applicableLocations.length === 0 ||
                section.applicableLocations.includes(location)
        );

        if (locationSections.length > 0) {
            results.push({
                policy,
                sections: locationSections,
            });
        }
    });

    return results;
}

/**
 * Get recently updated policies
 * @param daysThreshold - Number of days to consider "recent" (default: 30)
 */
export function getRecentlyUpdatedPolicies(daysThreshold: number = 30): Policy[] {
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - daysThreshold);

    return (mockData.policies.policies as Policy[]).filter(policy => {
        const updateDate = new Date(policy.lastUpdated);
        return updateDate >= thresholdDate;
    });
}

/**
 * Get policy summary for role
 * Returns a brief overview of all policies applicable to a role
 * @param roleId - Role ID
 */
export function getPolicySummaryForRole(roleId: string): {
    policyId: string;
    name: string;
    category: PolicyCategory;
    summary: string;
}[] {
    const policies = getPoliciesByRole(roleId);

    return policies.map(policy => ({
        policyId: policy.id,
        name: policy.name,
        category: policy.category,
        summary: policy.summary,
    }));
}

/**
 * Answer a policy question using keyword matching
 * This is a simplified version - in production would use Claude API
 * @param question - User's policy question
 * @param roleId - User's role ID
 */
export function answerPolicyQuestion(
    question: string,
    roleId: string
): {
    policy: Policy | null;
    sections: PolicySection[];
    confidence: 'high' | 'medium' | 'low';
} {
    const lowerQuestion = question.toLowerCase();

    // Simple keyword matching for common questions
    const keywords: Record<string, string[]> = {
        'remote-work-policy': ['remote', 'work from home', 'wfh', 'home office', 'equipment', 'stipend'],
        'expense-policy': ['expense', 'reimbursement', 'conference', 'travel', 'meal', 'receipt'],
        'pto-policy': ['pto', 'vacation', 'time off', 'holiday', 'sick', 'leave'],
        'security-data-handling': ['security', 'data', 'pii', 'password', 'access', 'privacy'],
        'benefits-overview': ['benefit', 'insurance', 'health', '401k', 'retirement', 'equity'],
    };

    // Find matching policy
    let matchedPolicyId: string | null = null;
    let maxMatches = 0;

    Object.entries(keywords).forEach(([policyId, policyKeywords]) => {
        const matches = policyKeywords.filter(keyword =>
            lowerQuestion.includes(keyword)
        ).length;

        if (matches > maxMatches) {
            maxMatches = matches;
            matchedPolicyId = policyId;
        }
    });

    if (!matchedPolicyId) {
        return { policy: null, sections: [], confidence: 'low' };
    }

    const policy = getPolicyById(matchedPolicyId);
    if (!policy) {
        return { policy: null, sections: [], confidence: 'low' };
    }

    const sections = getPolicySectionsForRole(matchedPolicyId, roleId);
    const confidence = maxMatches >= 2 ? 'high' : maxMatches === 1 ? 'medium' : 'low';

    return { policy, sections, confidence };
}

/**
 * Get most relevant policy section for a question
 * @param question - User's policy question
 * @param roleId - User's role ID
 */
export function getMostRelevantSection(
    question: string,
    roleId: string
): PolicySection | null {
    const result = answerPolicyQuestion(question, roleId);

    if (!result.policy || result.sections.length === 0) {
        return null;
    }

    // Return first section as most relevant
    // In production, would use semantic search
    return result.sections[0];
}

/**
 * Get count of policies by category
 */
export function getPolicyCountByCategory(): Record<PolicyCategory, number> {
    const policies = mockData.policies.policies as Policy[];

    const counts: Partial<Record<PolicyCategory, number>> = {};

    policies.forEach(policy => {
        counts[policy.category] = (counts[policy.category] || 0) + 1;
    });

    return counts as Record<PolicyCategory, number>;
}
