---
name: airbnb-onboarding-product-manager
description: Onboarding workflow for Product Managers at Airbnb. Includes stakeholder mapping, product area deep-dive, user research training, and cross-functional relationship building. Use when employee role is Product Manager, PM, or Product.
---

# Product Manager Onboarding

Welcome! This skill guides Product Managers through Airbnb's product onboarding process.

## Overview

You're onboarding as a **Product Manager** at Airbnb. This skill provides personalized guidance for:
- Understanding your product area
- Building stakeholder relationships
- Learning PM processes and frameworks
- Completing required training
- Shipping your first feature

## Employee Context

Access the employee's profile from `/lib/mock-data/employees.json` to personalize responses:
- Name, team, manager
- Product area assignment
- Start date and location
- Onboarding buddy

## Onboarding Workflow

### Week 1: Foundation & Context

**Day 1 Priority Tasks:**
1. **Laptop Setup** (1 hour)
   - Install Figma, Miro, Notion
   - Core apps: Slack, Zoom, 1Password

2. **Meet Your Manager** (1 hour)
   - Discuss product area and priorities
   - Understand stakeholder landscape
   - Set up weekly 1:1s

3. **Product Area Deep Dive** (3 hours)
   - Read strategy documentation
   - Review current roadmap
   - Understand recent launches
   - Study competitive landscape

4. **Meet Onboarding Buddy** (30 min)
   - Get insider tips on PM practices
   - Ask about team dynamics
   - Learn unwritten norms

**Week 1 Goals:**
- Complete PM fundamentals training
- Complete Airbnb values training
- Create stakeholder map
- Attend product review meetings
- Join product team Slack channels

### Week 2: Relationships & Research

**Key Activities:**
1. **Stakeholder Mapping**
   - Map engineering partners (tech leads, EM)
   - Identify design collaborators
   - Connect with data science partner
   - Find marketing/ops stakeholders
   - Schedule recurring syncs

2. **User Research Foundation**
   - Complete user research training
   - Review recent research reports
   - Meet research partner
   - Learn Airbnb's research methods

3. **Cross-Functional Intros**
   - Meet design partner
   - Meet engineering lead
   - Connect with data analyst
   - Introduce yourself to leadership

4. **Product Rituals**
   - Join sprint planning
   - Attend product reviews
   - Shadow customer feedback sessions
   - Observe user research

### Month 1: Contribution

**Goals:**
- Write first PRD (Product Requirements Document)
- Lead feature discussion
- Present in product review
- Build trusted cross-functional relationships
- Complete all required training

## Data Sources Integration

### Employee Profile
Query `/lib/mock-data/employees.json` to get:
- Manager and team details
- Product area assignment
- Onboarding buddy
- Start date for timeline calculations

### Onboarding Tasks
Reference `/lib/mock-data/onboarding-tasks.json` for:
- PM-specific task checklist
- Stakeholder mapping template
- Timeline and priorities
- Documentation to review

### People Recommendations
Query `/lib/mock-data/people-directory.json` for:
- Manager details
- Onboarding buddy
- Design partner
- Engineering lead
- Cross-functional stakeholders
- Meeting priority and timing

### Learning Path
Reference `/lib/mock-data/learning-paths.json` for:
- Required: PM fundamentals, Values, User research
- Recommended: Data-driven PM, Stakeholder management
- Deadlines and durations

### Org Chart
Access `/lib/mock-data/org-chart.json` for:
- Product team structure
- Cross-functional partners
- Reporting relationships
- Team composition

## Policy Guidance

PMs have specific policy considerations. Reference shared policies with PM context:

### Remote Work
See `shared/policies/remote-work.md`
- PMs typically have full remote flexibility
- Coordinate with eng/design for co-working
- Join team offsites 2-4x per year
- Home office stipend: $2,500

### Expenses
See `shared/policies/expenses.md`
- User research: Participant incentives approved
- Conference budget: Ask manager (varies by level)
- Team dinners: Reasonable expenses with approval
- Travel to other offices: Fully covered

### PTO
See `shared/policies/pto.md`
- Flexible PTO (most take 15-25 days/year)
- Coordinate around major launches
- Communicate early to cross-functional partners
- Submit in Workday 2 weeks ahead

## Key People to Meet

Use `/lib/mock-data/people-directory.json` to identify and recommend:

**Week 1 Priority:**
1. **Manager** - Weekly 1:1s, strategy alignment, stakeholder intro
2. **Onboarding Buddy** - PM tips, team culture, process guidance
3. **Design Partner** - Establish collaboration workflow

**Week 2:**
4. **Engineering Lead** - Technical constraints, velocity, priorities
5. **Other PMs** - Peer learning, cross-product awareness

**Flexible:**
6. **Data Partner** - Metrics, analytics, experiment design
7. **Marketing/Ops Partners** - Go-to-market strategy

## Common Questions & Answers

### "What should I focus on first?"
1. Understand your product area deeply (Week 1)
2. Build relationships with eng, design, data (Weeks 1-2)
3. Create stakeholder map (Week 1)
4. Write your first PRD (Month 1)

### "How do I prioritize features?"
Airbnb uses a framework balancing:
- User impact (research-driven)
- Business value (OKRs)
- Engineering effort (t-shirt sizing)
- Strategic alignment (company goals)

Work with your manager to learn specifics for your product area.

### "What's the PRD process?"
1. **Research**: User insights, data analysis, competitive review
2. **Draft**: Write PRD using internal template
3. **Review**: Iterate with eng, design, stakeholders
4. **Alignment**: Get sign-off from leadership
5. **Execution**: Work with eng on sprint planning
6. **Launch**: Coordinate go-to-market

### "How do product reviews work?"
- Weekly meetings with product leadership
- PMs present features, metrics, decisions
- Get feedback and unblock issues
- Practice storytelling and concise updates

### "Can I work remotely?"
Yes! PMs have flexibility to:
- Work fully remote
- Come to office for collaboration
- Coordinate co-working with eng/design
- Visit offices for offsites and planning

### "What tools do PMs use?"
- **Figma** - Design collaboration
- **Jira** - Sprint planning, backlog
- **Confluence** - Documentation, PRDs
- **Amplitude** - Product analytics
- **Qualtrics** - User surveys
- **Miro** - Brainstorming, workshops

## Product Area Context

For Experiences product area, see [PRODUCT_AREA.md](PRODUCT_AREA.md):
- Market overview and opportunity
- Key metrics and dashboards
- Recent launches
- Current roadmap
- Customer segments

## Stakeholder Guide

For guidance on building relationships, see [STAKEHOLDERS.md](STAKEHOLDERS.md):
- How to work with engineering
- Design collaboration best practices
- Data partnership tips
- Leadership communication
- Cross-functional alignment

## PM Frameworks

Airbnb PMs use specific frameworks:

### Prioritization
- **RICE Score**: Reach × Impact × Confidence / Effort
- **OKR Alignment**: Tie features to quarterly objectives
- **User Value**: Jobs to be Done framework

### Decision-Making
- **One-way vs Two-way Doors**: Reversible decisions move fast
- **Disagree and Commit**: Healthy debate, then alignment
- **Data-Informed**: Use data + judgment, not just data-driven

### Communication
- **Narrative Docs**: Write clear, persuasive documents
- **Working Backwards**: Start with customer press release
- **Show, Don't Tell**: Prototypes over words

## Success Metrics

Track onboarding progress:
- ✅ Product area knowledge (Week 1)
- ✅ Stakeholder map complete (Week 1)
- ✅ All training complete (Week 2)
- ✅ First PRD written (Month 1)
- ✅ Feature shipped (Month 2)

## Integration Scripts

Use mock integration scripts in `shared/integrations/`:
- `workday_api.py` - Employee profile
- `confluence_helper.py` - Product docs
- `jira_helper.py` - Sprint data

Example:
```python
from shared.integrations.workday_api import get_employee_profile

profile = get_employee_profile(employee_id)
print(f"Welcome {profile['name']} to {profile['team']}!")
```

## Notes for Demo

This skill demonstrates:
- **PM-specific workflow**: Different from engineering onboarding
- **Relationship focus**: Emphasis on stakeholder mapping
- **Strategic thinking**: Product area deep-dive vs technical setup
- **Cross-functional**: More breadth across teams than engineering
