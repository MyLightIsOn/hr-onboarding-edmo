# Skills Architecture Documentation

Complete guide to the Agent Skills implementation in AirOnboard.

## Overview

AirOnboard uses Anthropic's Agent Skills pattern to provide role-based onboarding with progressive disclosure. This architecture enables:
- Token-efficient personalization
- Scalable role management
- Dynamic content loading
- Clear separation of concerns

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User Interface (NextJS)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐    │
│  │   Landing   │→ │  Dashboard  │→ │  Chat/Panels     │    │
│  │Role Select  │  │  Widgets    │  │  Interactions    │    │
│  └─────────────┘  └─────────────┘  └──────────────────┘    │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────┐
│              Mock Claude API (Simulated)                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Skills Loading Logic                         │   │
│  │  1. Load orchestrator metadata                      │   │
│  │  2. Detect role → Load role skill                  │   │
│  │  3. Process request with role context              │   │
│  │  4. Load additional resources as needed            │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                ↓                         ↓
┌───────────────────────────┐  ┌──────────────────────────┐
│   Skills File System      │  │    Mock Data Sources     │
│   (public/skills/)        │  │   (lib/mock-data/)       │
│                           │  │                          │
│  ┌─────────────────────┐ │  │  ┌──────────────────┐   │
│  │  SKILL.md           │ │  │  │ employees.json   │   │
│  │  (Orchestrator)     │ │  │  │ roles.json       │   │
│  └─────────────────────┘ │  │  │ policies.json    │   │
│                           │  │  │ org-chart.json   │   │
│  ┌─────────────────────┐ │  │  │ people-dir.json  │   │
│  │ roles/              │ │  │  │ learning.json    │   │
│  │  ├─software-eng/    │ │  │  │ tasks.json       │   │
│  │  ├─product-mgr/     │ │  │  └──────────────────┘   │
│  │  └─hr-coordinator/  │ │  │                          │
│  └─────────────────────┘ │  └──────────────────────────┘
│                           │
│  ┌─────────────────────┐ │
│  │ shared/             │ │
│  │  ├─policies/        │ │
│  │  └─integrations/    │ │
│  └─────────────────────┘ │
└───────────────────────────┘
```

## Progressive Disclosure in Detail

### Level 1: Metadata (System Prompt)

**Always Loaded**: All skill metadata is loaded into the system prompt at startup.

```yaml
# From software-engineer/SKILL.md
---
name: airbnb-onboarding-software-engineer
description: Onboarding workflow for Software Engineers at Airbnb. 
  Includes development environment setup, team introductions, 
  technical onboarding, security training, and access provisioning.
---
```

**Token Cost**: ~100 tokens per skill × 3 skills = **~300 tokens**

**Purpose**: Enables Claude to know which skills exist and when to use them without loading full content.

### Level 2: Instructions (On Trigger)

**Loaded When**: Role is selected or skill is explicitly needed.

**Content Includes**:
- Onboarding workflow (by timeline)
- Data source integration points
- Policy guidance (summaries)
- People recommendation logic
- Common Q&A
- References to Level 3 resources

**Token Cost**: ~2,500 tokens per role skill

**Example Load Trigger**:
```
User: "I'm a Software Engineer, what should I do first?"
→ Claude reads roles/software-engineer/SKILL.md
→ 2,500 tokens loaded into context
→ Responds with Week 1 priorities
```

### Level 3: Resources (On Demand)

**Loaded When**: Explicitly referenced in Level 2 instructions.

**Content Types**:
1. **Supporting docs**: SETUP.md, TEAM_CONTEXT.md, PRODUCT_AREA.md
2. **Shared policies**: remote-work.md, expenses.md, security.md
3. **Integration scripts**: workday_api.py, slack_helper.py
4. **Reference data**: Additional context files

**Token Cost**: 0 tokens until accessed, then variable per file

**Example Load Trigger**:
```
User: "How do I set up my development environment?"
→ Skill references SETUP.md
→ Claude reads SETUP.md via bash
→ ~1,000 tokens loaded
→ Returns detailed setup instructions

User: "What's the remote work policy?"
→ Skill references shared/policies/remote-work.md
→ Claude reads policy file
→ ~500 tokens loaded
→ Returns policy with role-specific context
```

## Token Efficiency Comparison

### Traditional Approach (No Skills)

```
System Prompt: Base instructions (5k tokens)
+ Software Engineer content (5k tokens)
+ Product Manager content (5k tokens)  
+ HR Coordinator content (5k tokens)
+ All policies fully loaded (10k tokens)
+ All team context (5k tokens)
────────────────────────────────────
Total: ~35k tokens ALWAYS in context
```

**Problems**:
- Most content irrelevant to current user
- Wastes tokens on unused roles
- Slow to process
- Hard to maintain
- Doesn't scale to 50+ roles

### Skills Approach (Progressive Disclosure)

```
System Prompt: Base instructions (2k tokens)
+ All skill metadata (300 tokens)
────────────────────────────────────
Initial Load: ~2.3k tokens

[User selects Software Engineer]
+ Software Engineer SKILL.md (2.5k tokens)
────────────────────────────────────
After Role Selection: ~4.8k tokens

[User asks about setup]
+ SETUP.md loaded (1k tokens)
────────────────────────────────────
After Specific Question: ~5.8k tokens

[User asks about policy]
+ remote-work.md loaded (500 tokens)
────────────────────────────────────
After Policy Question: ~6.3k tokens
```

**Benefits**:
- Only relevant content loaded
- Scales to unlimited roles
- Fast initial response
- Easy to maintain per-role
- Clear token usage tracking

**Efficiency Gain**: ~82% token reduction (6.3k vs 35k)

## Data Flow Examples

### Example 1: Software Engineer Onboarding

```
1. USER: Selects "Software Engineer" role
   ↓
2. FRONTEND: Calls mock Claude API with role context
   ↓
3. MOCK API: 
   - Detects role from request
   - Loads software-engineer/SKILL.md
   - Queries employees.json for employee data
   ↓
4. SKILL: Returns personalized dashboard data
   - Onboarding tasks from tasks.json
   - People recommendations from people-directory.json
   - Learning path from learning-paths.json
   ↓
5. FRONTEND: Renders personalized dashboard

6. USER: Asks "What should I do first?"
   ↓
7. MOCK API: 
   - Skill already loaded (Level 2)
   - References onboarding timeline
   - Queries tasks.json for Day 1 tasks
   ↓
8. SKILL: Returns prioritized Day 1 checklist
   ↓
9. FRONTEND: Displays in chat interface

10. USER: Asks "How do I set up my laptop?"
    ↓
11. MOCK API:
    - Skill references SETUP.md
    - Loads SETUP.md (Level 3)
    ↓
12. SKILL: Returns detailed setup instructions
    ↓
13. FRONTEND: Displays formatted instructions

14. USER: Asks "What's the expense policy for conferences?"
    ↓
15. MOCK API:
    - Skill references shared/policies/expenses.md
    - Loads policy file (Level 3)
    - Filters to engineering-specific section
    ↓
16. SKILL: Returns "$3,000/year, manager approval needed, popular: Re:Invent..."
    ↓
17. FRONTEND: Displays with policy citation
```

### Example 2: Role Comparison

```
SCENARIO: User wants to see how PM onboarding differs

1. USER: Currently viewing Software Engineer dashboard
   LOADED: software-engineer/SKILL.md (2.5k tokens)

2. USER: Clicks "Compare with PM role"
   ↓
3. FRONTEND: Requests PM perspective
   ↓
4. MOCK API: 
   - Loads product-manager/SKILL.md (2.5k tokens)
   - Keeps software-engineer skill for comparison
   ↓
5. SKILL: Returns differences:
   - PM: Stakeholder mapping vs Eng: Dev setup
   - PM: User research vs Eng: Security training
   - PM: PRD writing vs Eng: Code review
   ↓
6. FRONTEND: Shows side-by-side comparison

TOTAL TOKENS: 5k (2 role skills)
vs Traditional: Would need all roles loaded always (15k+)
```

## Integration with Mock Data

Skills don't just contain instructions—they orchestrate data access:

### Pattern 1: Direct Query

```markdown
# In SKILL.md
Query `/lib/mock-data/employees.json` to get:
- Manager name and contact
- Onboarding buddy
- Start date
```

**Implementation**:
```typescript
// Frontend or mock API
import { mockData } from '@/lib/mock-data';

const employee = mockData.employees.employees.find(
  e => e.roleId === selectedRole
);

// Pass to skill context
const context = {
  employeeName: employee.name,
  manager: employee.manager,
  buddy: employee.onboardingBuddy
};
```

### Pattern 2: Filtered Results

```markdown
# In SKILL.md
Reference `/lib/mock-data/learning-paths.json` for:
- Required courses for Software Engineers
- Deadlines for each course
```

**Implementation**:
```typescript
const roleSkills = mockData.learningPaths.pathsByRole[roleId];
const required = roleSkills.required.map(item => ({
  ...mockData.learningPaths.courses.find(c => c.id === item.courseId),
  deadline: item.deadline,
  reason: item.reason
}));
```

### Pattern 3: Recommendation Engine

```markdown
# In SKILL.md
Use `/lib/mock-data/people-directory.json` to recommend:
- Manager (priority 1, week-1)
- Buddy (priority 2, week-1)
- Staff Engineer (priority 3, week-2)
```

**Implementation**:
```typescript
const recommendations = mockData.peopleDirectory.recommendations.find(
  r => r.forRole === roleId
);

const sortedPeople = recommendations.recommendedPeople
  .sort((a, b) => a.priority - b.priority)
  .map(rec => ({
    ...mockData.peopleDirectory.people.find(p => p.id === rec.personId),
    relationship: rec.relationship,
    reason: rec.reason,
    suggestedTiming: rec.suggestedTiming
  }));
```

## File Structure Deep Dive

### Orchestrator (SKILL.md)

**Purpose**: Route to role-specific skills

**Contains**:
- Skill selection logic
- Data source overview
- Progressive disclosure explanation
- Shared resource references

**When Loaded**: Always (Level 1 metadata only)

### Role Skills (roles/*/SKILL.md)

**Purpose**: Provide role-specific onboarding workflow

**Contains**:
- Week-by-week timeline
- Data integration points
- Policy summaries with references
- People recommendation logic
- Common Q&A
- Links to Level 3 resources

**When Loaded**: When role is selected (Level 2)

**Size**: ~2-5k tokens per role

### Supporting Docs (SETUP.md, TEAM_CONTEXT.md, etc.)

**Purpose**: Detailed instructions for specific topics

**Contains**:
- Step-by-step procedures
- Technical details
- Team-specific context
- Links and resources

**When Loaded**: When explicitly referenced (Level 3)

**Size**: ~500-1.5k tokens per file

### Shared Policies (shared/policies/*.md)

**Purpose**: Centralized policy content

**Contains**:
- Full policy text
- Role-specific sections
- Examples and exceptions
- Contact information

**When Loaded**: When policy question asked (Level 3)

**Size**: ~500-2k tokens per policy

### Integration Scripts (shared/integrations/*.py)

**Purpose**: Mock API interactions

**Contains**:
- Python functions to query mock data
- Realistic API simulation
- Error handling

**When Loaded**: Executed via bash (not loaded into context)

**Size**: 0 tokens (code runs without loading)

## Scaling Considerations

### Adding New Roles

**Steps**:
1. Create `roles/new-role/SKILL.md`
2. Add metadata to frontmatter
3. Write role-specific workflow
4. Create supporting docs as needed
5. Update mock data:
   - Add to roles.json
   - Add learning path
   - Add onboarding tasks
   - Add people recommendations
6. Test thoroughly

**Token Impact**: +100 tokens (Level 1) + 0 until role is used

### Adding New Policies

**Steps**:
1. Create `shared/policies/new-policy.md`
2. Write policy content
3. Reference from role skills
4. Add role-specific sections

**Token Impact**: 0 until policy is queried

### Adding New Features

**Options**:
1. Add to existing role skill (if small)
2. Create new supporting doc (if detailed)
3. Add to shared resources (if cross-role)

**Decision Framework**:
- Needed by all roles? → Shared resource
- Role-specific? → Role skill or supporting doc
- Frequently accessed? → Include in main skill
- Rarely needed? → Separate file (Level 3)

## Production Deployment Path

### Phase 1: Static Skills (Current Demo)
- Skills as markdown files
- Mock data as JSON
- Simulated API responses

### Phase 2: Dynamic Skills
- Skills stored in CMS or database
- Real API integrations (Workday, etc.)
- Skills updated without code deployment

### Phase 3: Personalized Skills
- Skills generated per employee
- A/B testing skill variations
- Analytics on skill effectiveness

### Phase 4: AI-Enhanced Skills
- Skills that learn from usage
- Automatic skill improvements
- Predictive content loading

## Monitoring & Analytics

### What to Track

**Skill Usage**:
- Which skills are triggered most
- Average tokens per session
- Time to load each level
- Error rates

**Content Effectiveness**:
- Questions requiring Level 3 loading
- Common question patterns
- Missing content indicators
- Employee satisfaction

**Performance**:
- Token consumption per role
- API response times
- Cache hit rates
- Data query performance

### Optimization Opportunities

**Content**:
- Frequently co-accessed resources → Merge
- Rarely accessed sections → Split out
- Common questions → Add to main skill

**Architecture**:
- Predictive loading of likely resources
- Caching of common queries
- Pre-computed recommendations

## Demo-Specific Notes

This implementation is a **proof of concept** showing:

✅ Progressive disclosure architecture
✅ Role-based personalization
✅ Token efficiency gains
✅ Scalable design pattern
✅ Clear separation of concerns

**Not Implemented** (production would need):
- Real Claude API integration
- Actual Workday/Greenhouse APIs
- Database-backed skills
- Authentication & authorization
- Analytics and monitoring
- A/B testing framework
- Skill versioning system

## Next Steps

1. Wire skills to frontend components
2. Implement mock Claude API
3. Build Behind the Scenes visualization
4. Test all role workflows
5. Create presentation materials
6. Deploy demo

---

**Last Updated**: December 29, 2024
**Status**: Skills structure complete, ready for frontend integration
