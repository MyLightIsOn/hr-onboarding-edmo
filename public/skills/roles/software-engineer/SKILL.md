---
name: airbnb-onboarding-software-engineer
description: Onboarding workflow for Software Engineers at Airbnb. Includes development environment setup, team introductions, technical onboarding, security training, and access provisioning. Use when employee role is Software Engineer, SWE, or Engineering.
---

# Software Engineer Onboarding

Welcome! This skill guides Software Engineers through Airbnb's technical onboarding process.

## Overview

You're onboarding as a **Software Engineer** at Airbnb. This skill provides personalized guidance for:
- Setting up your development environment
- Meeting key team members
- Understanding policies relevant to engineers
- Completing required training
- Shipping your first code

## Employee Context

Access the employee's profile from `/lib/mock-data/employees.json` to personalize responses:
- Name, team, manager
- Start date and location
- Onboarding buddy
- Department and role level

## Onboarding Workflow

### Week 1: Foundation

**Day 1 Priority Tasks:**
1. **Laptop Setup** (1 hour)
   - Unbox MacBook and sign into Airbnb account
   - Install core apps: Slack, Zoom, 1Password
   
2. **Development Environment** (2 hours)
   - Install Homebrew, Git, Node, Python
   - Configure SSH keys for GitHub
   - Clone main repository
   - Start local dev server
   - See [SETUP.md](SETUP.md) for detailed instructions

3. **VPN & Security** (30 min)
   - Install VPN client
   - Set up 2FA
   - Configure security software

4. **Meet Your Manager** (1 hour)
   - Initial 1:1 to discuss expectations
   - Set up recurring weekly meetings

**Week 1 Goals:**
- Complete security training (REQUIRED by Day 7)
- Meet onboarding buddy
- Attend team meetings (standup, sprint planning)
- Review code standards training
- Join team Slack channels

### Week 2: Integration

**Key Activities:**
1. **Technical Deep Dive**
   - Meet with Staff Engineer for architecture overview
   - Review system design documentation
   - Understand service dependencies

2. **Cross-Functional Connections**
   - Meet PM partner
   - Understand product priorities
   - Review current sprint work

3. **First Contribution**
   - Pick up a "starter task"
   - Submit first PR
   - Experience code review process

4. **Trust & Safety Training** (REQUIRED by Day 14)
   - If on Trust & Safety team, complete specialized training
   - Learn about content moderation systems
   - Understand sensitive data handling

### Month 1: Contribution

**Goals:**
- Ship first feature to production
- Participate fully in sprint ceremonies
- Build relationships with cross-functional partners
- Complete all required training

## Data Sources Integration

### Employee Profile
Query `/lib/mock-data/employees.json` to get:
- Manager name and contact
- Onboarding buddy assignment
- Team and department
- Start date for timeline calculations

### Onboarding Tasks
Reference `/lib/mock-data/onboarding-tasks.json` for:
- Complete task list by timeline
- Required vs optional tasks
- Estimated time for each task
- Subtask breakdowns

### People Recommendations
Query `/lib/mock-data/people-directory.json` for:
- Manager details
- Onboarding buddy
- Key team members to meet
- Cross-functional partners
- Priority and suggested timing

### Learning Path
Reference `/lib/mock-data/learning-paths.json` for:
- Required courses (security, code standards, Trust & Safety)
- Deadlines for each course
- Recommended optional training
- Course providers and durations

### Org Chart
Access `/lib/mock-data/org-chart.json` for:
- Team structure
- Engineering manager
- Team members and their roles
- Department hierarchy

## Policy Guidance

Engineers have specific policy considerations. Reference shared policies with engineering context:

### Remote Work
See `shared/policies/remote-work.md`
- Engineers typically have full remote flexibility
- Home office stipend: $2,500
- VPN required when accessing production systems

### Expenses
See `shared/policies/expenses.md`
- Conference budget: $3,000/year (popular: Re:Invent, QCon, Strange Loop)
- Manager approval required 30 days in advance
- Submit learning summary within 2 weeks

### Security & Data
See `shared/policies/security.md`
- PII access requires manager approval + security training
- All PII must be encrypted
- Never store secrets in code
- 2FA required on GitHub

### PTO
See `shared/policies/pto.md`
- Flexible PTO (most take 15-25 days/year)
- Submit requests in Workday 2 weeks in advance
- Coordinate with team for coverage

## Key People to Meet

Use `/lib/mock-data/people-directory.json` to identify and recommend:

**Week 1 Priority:**
1. **Manager** - Weekly 1:1s, priority alignment
2. **Onboarding Buddy** - Day-to-day questions, code walkthroughs

**Week 2:**
3. **Staff Engineer** - Technical mentorship, architecture discussions
4. **PM Partner** - Product context, feature prioritization

**Flexible:**
5. **Peer Engineers** - Team collaboration, comparing experiences
6. **Cross-team Engineers** - Understanding service dependencies

## Common Questions & Answers

### "What should I focus on first?"
1. Get your dev environment working (Day 1)
2. Complete security training (required by Day 7)
3. Meet your manager and buddy (Week 1)
4. Ship your first PR (Week 2)

### "How do I get access to [system]?"
Most access is provisioned automatically. For special access:
- Production data: Requires manager approval + security training
- GitHub repos: Automatic via Okta
- VPN: IT will send setup instructions

### "What's the code review process?"
- All PRs require 1+ approvals
- Security-sensitive code needs Security team review
- Use PR templates in the repo
- Aim for reviews within 24 hours

### "Can I work from home?"
Yes! Engineers have full remote flexibility. You can:
- Work fully remote from approved states
- Come to the office anytime
- Join team offsites 2-4x per year

### "What conferences can I attend?"
- $3,000 annual budget
- Popular: Re:Invent, QCon, Strange Loop, PyData
- Manager approval 30 days in advance
- Write learning summary after

## Technical Setup Details

For detailed setup instructions, see [SETUP.md](SETUP.md):
- Development environment configuration
- Repository access
- Local server setup
- Testing infrastructure
- Debugging tools

## Team Context

For team-specific information, see [TEAM_CONTEXT.md](TEAM_CONTEXT.md):
- Team mission and goals
- Current priorities
- Tech stack overview
- Meeting schedule
- Communication norms

## Integration Scripts

Use the mock integration scripts in `shared/integrations/` to simulate:
- `workday_api.py` - Employee profile queries
- `github_helper.py` - Repository access checks
- `slack_helper.py` - Channel recommendations

Example usage:
```python
from shared.integrations.workday_api import get_employee_profile

profile = get_employee_profile(employee_id)
print(f"Welcome {profile['name']}!")
print(f"Your manager is {profile['manager']['name']}")
```

## Success Metrics

Track onboarding progress:
- ✅ Dev environment working (Day 1)
- ✅ Security training complete (Day 7)
- ✅ Code standards training complete (Day 10)
- ✅ First PR submitted (Week 2)
- ✅ First feature shipped (Month 1)

## Notes for Demo

This skill demonstrates:
- **Progressive disclosure**: Only loads detailed setup/team context when needed
- **Role personalization**: Engineering-specific policies, training, and connections
- **Data integration**: References mock data files for dynamic content
- **Token efficiency**: Main instructions ~2.5k tokens, resources loaded on-demand
