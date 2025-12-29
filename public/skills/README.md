# AirOnboard Skills

Agent Skills architecture for role-based onboarding at Airbnb.

## Structure

```
skills/
├── SKILL.md                           # Orchestrator (routes to role skills)
├── roles/
│   ├── software-engineer/
│   │   ├── SKILL.md                  # Main engineering onboarding workflow
│   │   ├── SETUP.md                  # Dev environment setup details
│   │   └── TEAM_CONTEXT.md           # Trust & Safety team info
│   ├── product-manager/
│   │   ├── SKILL.md                  # Main PM onboarding workflow
│   │   ├── PRODUCT_AREA.md           # Experiences product context (TODO)
│   │   └── STAKEHOLDERS.md           # Stakeholder guide (TODO)
│   └── hr-coordinator/
│       └── SKILL.md                   # Main HR coordinator workflow
└── shared/
    ├── policies/                      # Shared policy documents (TODO)
    │   ├── remote-work.md
    │   ├── expenses.md
    │   ├── pto.md
    │   ├── security.md
    │   └── benefits.md
    └── integrations/                  # Mock API scripts (TODO)
        ├── workday_api.py
        ├── greenhouse_api.py
        ├── confluence_helper.py
        └── slack_helper.py
```

## Progressive Disclosure Architecture

### Level 1: Metadata (Always Loaded)
- Skill name and description in YAML frontmatter
- Loaded into system prompt at startup (~100 tokens each)
- Used for skill discovery and routing

**Example:**
```yaml
---
name: airbnb-onboarding-software-engineer
description: Onboarding workflow for Software Engineers...
---
```

### Level 2: Instructions (Loaded on Trigger)
- Main SKILL.md body content
- Loaded when role is selected (~2-5k tokens)
- Contains workflow, guidance, and references to Level 3

**What's included:**
- Onboarding workflow by timeline
- Data source integration points
- Policy guidance (high-level)
- People recommendations
- Common Q&A

### Level 3: Resources (Loaded on Demand)
- Supporting markdown files (SETUP.md, TEAM_CONTEXT.md, etc.)
- Policy detail documents
- Integration scripts
- Only loaded when explicitly referenced (0 tokens until used)

**What's included:**
- Detailed setup instructions
- Team-specific context
- Full policy text
- Mock API scripts

## How Skills Work

### 1. Skill Discovery
When an employee starts onboarding, the orchestrator skill loads all role skill metadata and determines which skill to use based on the employee's role.

### 2. Skill Loading
The appropriate role-specific SKILL.md is read from the filesystem, bringing its instructions into context.

### 3. Resource Access
As needed, the skill references additional files:
- `See SETUP.md for detailed instructions` → Claude reads the file
- `See shared/policies/remote-work.md` → Claude reads the policy
- Integration scripts run via bash without loading into context

### 4. Data Integration
Skills query mock data from `/lib/mock-data/`:
- Employee profiles
- Org charts
- Policies
- Learning paths
- People recommendations
- Onboarding tasks

## Token Efficiency

**Without Skills (traditional approach):**
- All 3 role variations loaded: ~15k tokens
- All policy details loaded: ~10k tokens
- Total: ~25k tokens always in context

**With Skills (progressive disclosure):**
- Level 1 (3 skills): ~300 tokens
- Level 2 (1 role): ~2.5k tokens
- Level 3 (as needed): 0 tokens until accessed
- Total: ~2.8k tokens typically, scales as needed

**Efficiency gain: ~90% token reduction**

## Data Flow Example

```
User selects "Software Engineer"
  ↓
Orchestrator detects role
  ↓
Loads roles/software-engineer/SKILL.md (~2.5k tokens)
  ↓
User asks "What should I do first?"
  ↓
Skill queries /lib/mock-data/onboarding-tasks.json
  ↓
Returns Day 1 tasks for engineers
  ↓
User asks "How do I set up my laptop?"
  ↓
Skill references SETUP.md
  ↓
Claude reads SETUP.md file (~1k tokens)
  ↓
Returns detailed setup instructions
  ↓
User asks "What's the remote work policy?"
  ↓
Skill references shared/policies/remote-work.md
  ↓
Claude reads policy file (~500 tokens)
  ↓
Returns policy with engineering context
```

## Creating New Skills

To add a new role:

1. Create directory: `roles/new-role/`
2. Create `SKILL.md` with frontmatter
3. Add role to mock data: `lib/mock-data/roles.json`
4. Add learning path: `lib/mock-data/learning-paths.json`
5. Add tasks: `lib/mock-data/onboarding-tasks.json`
6. Add people recommendations: `lib/mock-data/people-directory.json`
7. Test the workflow

## Demo Notes

These skills demonstrate:
- **Progressive disclosure** - Only load what's needed
- **Role personalization** - Different content per role
- **Token efficiency** - ~90% reduction vs traditional approach
- **Scalability** - Easy to add new roles
- **Real-world ready** - Clear path to production

In production, this would:
- Load skills from a skill management system
- Query real APIs (Workday, Greenhouse, etc.)
- Update dynamically without code changes
- Track usage and effectiveness
- A/B test skill variations

## Status

✅ Orchestrator skill (SKILL.md)
✅ Software Engineer skill (complete)
✅ Product Manager skill (complete)
✅ HR Coordinator skill (complete)
⏳ Shared policies (TODO)
⏳ Integration scripts (TODO)
⏳ Additional supporting docs (TODO)

## Next Steps

1. Create shared policy files
2. Create mock integration scripts
3. Wire up to frontend components
4. Test all role flows
5. Add Behind the Scenes visualization
