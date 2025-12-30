/**
 * Mock Claude Service
 * 
 * Simulates Claude API responses using our policy service.
 * This will be replaced with real Claude API calls when "Use Real Claude" is enabled.
 */

import { answerPolicyQuestion, getPolicyById } from '@/lib/data-access/policyService';

interface MockClaudeResponse {
  answer: string;
  citations?: string[];
  tokensUsed: number;
  dataSourcesQueried: string[];
}

/**
 * Get a mock policy answer based on the question and role
 * This simulates what Claude would return using our Skills architecture
 */
export function getMockPolicyAnswer(question: string, roleId: string): MockClaudeResponse {
  const lowerQuestion = question.toLowerCase();
  
  // Use our policy service to find the most relevant policy
  const result = answerPolicyQuestion(question, roleId);
  
  if (!result.policy || result.sections.length === 0) {
    return {
      answer: "I couldn't find specific information about that in our policies. Could you rephrase your question or ask about something else? I can help with topics like remote work, expenses, PTO, benefits, and security policies.",
      tokensUsed: 150,
      dataSourcesQueried: ['policies.json'],
    };
  }

  // Generate a natural response based on the policy content
  const policy = result.policy;
  const section = result.sections[0]; // Use the most relevant section

  let answer = '';

  // Remote work questions
  if (lowerQuestion.includes('remote') || lowerQuestion.includes('work from home') || lowerQuestion.includes('wfh')) {
    if (roleId === 'software-engineer') {
      answer = "Great question! As a Software Engineer at Airbnb, you have full remote flexibility. Here's what you need to know:\n\n";
      answer += "✅ **Eligibility**: All engineers can work remotely or hybrid - it's completely up to you and your team's preferences.\n\n";
      answer += "💰 **Home Office Setup**: You'll receive a $2,500 stipend for home office equipment (desk, chair, monitor, etc.). Submit receipts via Expensify within 30 days.\n\n";
      answer += "🌎 **Location**: You can work from any state where Airbnb has a registered entity. Currently, Alaska, Mississippi, and North Dakota are not available.\n\n";
      answer += "🤝 **Expectations**: Maintain overlap with your team's timezone, be available for core collaboration hours (10am-3pm your time), and plan to attend team offsites 2-4 times per year.";
    } else if (roleId === 'product-manager') {
      answer = "As a Product Manager, you also have full remote flexibility! Here are the details:\n\n";
      answer += "✅ **Eligibility**: PMs can work remotely or come to the office - coordinate with your eng/design partners for optimal collaboration.\n\n";
      answer += "💰 **Home Office Setup**: $2,500 stipend for equipment. Submit receipts via Expensify within 30 days.\n\n";
      answer += "🌎 **Location**: Any state where Airbnb operates (excludes Alaska, Mississippi, North Dakota).\n\n";
      answer += "✈️ **Travel**: Expect to visit offices for offsites, planning sessions, and key product reviews 2-4 times per year.";
    } else {
      answer = `Based on Airbnb's remote work policy:\n\n${section.content}`;
    }
  }
  
  // Expense questions
  else if (lowerQuestion.includes('expense') || lowerQuestion.includes('reimburs') || lowerQuestion.includes('conference')) {
    if (roleId === 'software-engineer' && lowerQuestion.includes('conference')) {
      answer = "Good news! Engineers have an annual conference budget:\n\n";
      answer += "💰 **Budget**: $3,000 per year for one conference (registration, travel, lodging).\n\n";
      answer += "📅 **Popular Conferences**: Re:Invent, QCon, Strange Loop, PyData are common choices among Airbnb engineers.\n\n";
      answer += "✅ **Approval Process**: Get manager approval at least 30 days in advance. After the conference, submit a learning summary within 2 weeks.\n\n";
      answer += "📝 **Expensing**: Submit all receipts through Expensify with the conference name and business justification.";
    } else {
      answer = "Here's Airbnb's expense reimbursement policy:\n\n";
      answer += "🍽️ **Meals**: $75/day when traveling for business. No receipt needed under $25.\n\n";
      answer += "👥 **Team Events**: Reasonable expenses for team dinners. Manager approval needed over $500.\n\n";
      answer += "✈️ **Travel**: Book through our travel system or get pre-approval for direct bookings.\n\n";
      answer += "📱 **How to Submit**: Use Expensify for all reimbursements. Include receipts and business purpose.";
    }
  }
  
  // PTO questions
  else if (lowerQuestion.includes('pto') || lowerQuestion.includes('vacation') || lowerQuestion.includes('time off')) {
    answer = "Airbnb has a flexible PTO policy:\n\n";
    answer += "⏰ **Flexible Time Off**: There's no set number of days - take what you need with manager approval. Most employees take 15-25 days per year plus holidays.\n\n";
    answer += "📅 **How to Request**: Submit PTO in Workday at least 2 weeks in advance. For extended leave (2+ weeks), give 30 days notice when possible.\n\n";
    answer += "✅ **Before You Go**: Ensure coverage for your responsibilities and coordinate with your team.\n\n";
    answer += "🎉 **Company Holidays**: US employees get New Year's, MLK Day, Presidents Day, Memorial Day, Juneteenth, July 4th, Labor Day, Thanksgiving (2 days), and Christmas.";
  }
  
  // Security questions
  else if (lowerQuestion.includes('security') || lowerQuestion.includes('training') || lowerQuestion.includes('data')) {
    if (roleId === 'software-engineer') {
      answer = "Security is critical at Airbnb! Here's what you need to know:\n\n";
      answer += "🔐 **Required Training**: Complete 'Security Fundamentals' training by Day 7. This is required before accessing production systems.\n\n";
      answer += "👤 **PII Access**: Accessing Personally Identifiable Information requires manager approval + security training completion. All PII must be encrypted at rest and in transit.\n\n";
      answer += "🔑 **Best Practices**:\n- Never store secrets in code (use environment variables)\n- Enable 2FA on GitHub\n- Use VPN when accessing production data\n- Lock your laptop when away\n\n";
      answer += "⚠️ **Report Issues**: Any suspected security issues should be reported immediately to security@airbnb.com.";
    } else {
      answer = `Here's what you need to know about security and data handling:\n\n${section.content}`;
    }
  }
  
  // Benefits questions
  else if (lowerQuestion.includes('benefit') || lowerQuestion.includes('insurance') || lowerQuestion.includes('401k') || lowerQuestion.includes('health')) {
    answer = "Airbnb offers comprehensive benefits! Here are the highlights:\n\n";
    answer += "🏥 **Health Insurance**: Medical (PPO/HMO), dental (Delta Dental), vision (VSP). Company covers 100% of employee premium, 75% for dependents. Coverage starts Day 1.\n\n";
    answer += "💰 **401(k)**: Company matches 100% on first 3% of salary, 50% on next 2% (4% max total). Immediate eligibility.\n\n";
    answer += "📈 **Equity**: Eligible roles receive RSUs vesting over 4 years (25% after 1 year, then quarterly).\n\n";
    answer += "✈️ **Travel Credit**: $2,000 annual credit for Airbnb bookings + $500 for Experiences.\n\n";
    answer += "🧘 **Wellness**: Free Calm app, ClassPass discount, Headspace, Carrot Fertility, backup childcare.";
  }
  
  // Default response using the section content
  else {
    answer = `Based on Airbnb's ${policy.name}:\n\n${section.content}`;
  }

  return {
    answer,
    citations: [policy.id],
    tokensUsed: Math.floor(answer.length / 4), // Rough estimate: 1 token ≈ 4 characters
    dataSourcesQueried: ['policies.json', 'roles.json'],
  };
}

/**
 * This will be the real Claude API call when "Use Real Claude" is enabled
 * For now, it's just a placeholder
 */
export async function getRealClaudeAnswer(
  question: string,
  roleId: string
): Promise<MockClaudeResponse> {
  // TODO: Implement real Claude API call
  // This will use the Anthropic SDK with Skills architecture
  throw new Error('Real Claude API not yet implemented. Use mock mode for now.');
}
