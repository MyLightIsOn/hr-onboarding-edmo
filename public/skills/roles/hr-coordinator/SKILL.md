---
name: airbnb-onboarding-hr-coordinator
description: Onboarding workflow for People Operations Coordinators at Airbnb. Includes Workday training, GDPR compliance, benefits administration, employee relations, and HRIS systems. Use when employee role is HR Coordinator, People Ops, or People Operations.
---

# People Operations Coordinator Onboarding

Welcome! This skill guides People Operations Coordinators through Airbnb's HR onboarding process.

## Overview

You're onboarding as a **People Operations Coordinator** at Airbnb. This skill provides personalized guidance for:
- Learning Workday HRIS system
- Understanding compliance requirements
- Supporting employee inquiries
- Mastering HR processes
- Building cross-functional relationships

## Employee Context

Access the employee's profile from `/lib/mock-data/employees.json` to personalize responses:
- Name, team, manager
- People Ops team assignment
- Start date and location
- Onboarding buddy

## Onboarding Workflow

### Week 1: Systems & Compliance

**Day 1 Priority Tasks:**
1. **Laptop Setup** (1 hour)
   - Install required HR systems
   - Core apps: Slack, Zoom, 1Password

2. **Meet Your Manager** (1 hour)
   - Discuss role responsibilities
   - Understand team priorities
   - Set up weekly 1:1s

3. **Team Documentation** (2 hours)
   - Read team charter
   - Review process documentation
   - Understand case categories
   - Learn escalation procedures

4. **Meet Onboarding Buddy** (30 min)
   - Get system access tips
   - Ask about common cases
   - Learn team workflows

**Week 1 Goals:**
- Complete Workday basics training (REQUIRED)
- Complete GDPR compliance training (REQUIRED by Day 10)
- Complete Airbnb values training
- Attend team case review meetings
- Join People Ops Slack channels

### Week 2: Advanced Training & Process

**Key Activities:**
1. **Workday Deep Dive**
   - Benefits administration
   - PTO management
   - Reporting and dashboards
   - Advanced workflows
   - Troubleshooting common issues

2. **Employee Relations Basics**
   - Conflict resolution frameworks
   - Performance management support
   - Handling sensitive situations
   - Documentation requirements
   - When to escalate

3. **Shadow Your Buddy**
   - Observe case handling
   - Learn communication style
   - Understand decision-making
   - Practice with supervision

4. **Cross-Team Connections**
   - Meet Recruiting Ops coordinator
   - Connect with Comp & Benefits team
   - Intro to HR Business Partners

### Month 1: Independent Work

**Goals:**
- Handle first employee cases independently
- Complete benefits training
- Build confidence with Workday
- Establish working relationships
- Complete all required training

## Data Sources Integration

### Employee Profile
Query `/lib/mock-data/employees.json` to get:
- Manager and team details
- Team assignment (Employee Experience, Recruiting Ops, etc.)
- Onboarding buddy
- Start date

### Onboarding Tasks
Reference `/lib/mock-data/onboarding-tasks.json` for:
- HR coordinator task checklist
- System training requirements
- Timeline and deadlines
- Required certifications

### People Recommendations
Query `/lib/mock-data/people-directory.json` for:
- Manager details
- Onboarding buddy
- Peer coordinators
- Cross-functional HR partners
- Meeting priorities

### Learning Path
Reference `/lib/mock-data/learning-paths.json` for:
- Required: Workday admin, GDPR, Values, Employee relations
- Recommended: Benefits admin
- Training deadlines
- Course durations

### Org Chart
Access `/lib/mock-data/org-chart.json` for:
- People Ops team structure
- Related HR teams
- Reporting relationships

## Policy Guidance

HR Coordinators need deep policy knowledge. Reference shared policies with HR admin context:

### Data Privacy & GDPR
See `shared/policies/security.md`
- **CRITICAL**: All employee data is sensitive
- Access limited to need-to-know basis
- Never share employee info without authorization
- Document all data access
- Immediate breach reporting required

### Remote Work
See `shared/policies/remote-work.md`
- Help employees understand eligibility
- Process remote work requests
- Know geographic restrictions
- Approve equipment stipends

### Benefits
See `shared/policies/benefits.md`
- Enrollment periods and deadlines
- Plan options and coverage
- Life event changes
- Common employee questions

### PTO Administration
See `shared/policies/pto.md`
- Approve/deny requests (based on policy)
- Track accruals (not applicable for flexible PTO)
- Handle disputes
- Coordinate with managers

### Expenses
See `shared/policies/expenses.md`
- Review expense reports
- Approve/reject based on policy
- Flag unusual patterns
- Educate employees on guidelines

## Key Systems to Master

### Workday (HRIS)
**Core Functions:**
- Employee data management
- Benefits administration
- PTO tracking and approval
- Compensation changes
- Organizational changes
- Reporting and analytics

**Common Tasks:**
- Process new hire paperwork
- Enroll employees in benefits
- Update employee records
- Generate reports for leadership
- Troubleshoot access issues

### Greenhouse (ATS)
- Candidate-to-employee transition
- Offer letter data transfer
- Background check status
- Recruiting metrics

### Slack
- #ask-hr - Employee questions
- #peopleops-team - Internal team
- #peopleops-cases - Case management
- #hr-systems - Technical issues

## Key People to Meet

Use `/lib/mock-data/people-directory.json` to identify and recommend:

**Week 1 Priority:**
1. **Manager** - Weekly 1:1s, priorities, case assignment
2. **Onboarding Buddy** - Workday tips, process guidance, shadowing

**Week 2:**
3. **Peer Coordinators** - Collaboration, compare experiences
4. **Recruiting Ops** - Candidate-to-employee handoffs

**Flexible:**
5. **HR Business Partners** - Complex case escalation
6. **Comp & Benefits** - Benefits questions

## Common Questions & Answers

### "What should I focus on first?"
1. Master Workday basics (Week 1)
2. Complete GDPR training immediately (REQUIRED)
3. Shadow your buddy extensively (Week 2)
4. Start with simple cases, build confidence

### "What are the most common employee questions?"
- PTO: How to request, how much do I have?
- Benefits: Enrollment deadlines, plan options, life events
- Payroll: Check amount, tax questions
- Systems: Workday access, password resets
- Policies: Remote work, expenses, equipment

### "When should I escalate a case?"
Escalate to your manager or HRBP when:
- Legal concerns (termination, discrimination)
- Complex employee relations issues
- Policy interpretation uncertainty
- Sensitive executive inquiries
- Data breach or privacy concerns

### "How do I handle sensitive information?"
- Only access data when necessary for your case
- Never discuss employee issues outside secure channels
- Use encrypted email for sensitive topics
- Follow clean desk policy
- Lock your computer when away
- Document everything

### "What's the response time expectation?"
- **Urgent** (payroll, benefits deadlines): Same day
- **Important** (PTO approval, access issues): 24 hours
- **Normal** (general questions): 48 hours
- **FYI** (policy updates): No response needed

### "Can I work remotely?"
Yes! HR Coordinators can work remotely. Best practices:
- Be available during core hours for urgent cases
- Use video for sensitive conversations
- Maintain confidentiality at home office
- Use VPN for all system access

## System Access & Permissions

### Week 1 Access:
- ✅ Workday (view only)
- ✅ Slack channels
- ✅ Email
- ✅ HR knowledge base

### Week 2+ Access (after training):
- ⏳ Workday (edit permissions)
- ⏳ Benefits administration
- ⏳ PTO approval rights
- ⏳ Employee records

## Common Workflows

### Processing PTO Request
1. Receive request in Workday
2. Check policy eligibility
3. Verify manager awareness
4. Approve or request clarification
5. Document decision
6. Notify employee

### Benefits Enrollment
1. Employee initiates in Workday
2. Verify eligibility and timing
3. Review plan selections
4. Confirm dependent documentation
5. Submit to carrier
6. Follow up on confirmation

### Handling Employee Inquiry
1. Receive question (email/Slack/#ask-hr)
2. Assess urgency and sensitivity
3. Research policy/system
4. Draft response (have buddy review initially)
5. Send response
6. Log case in tracking system
7. Follow up if needed

## Success Metrics

Track onboarding progress:
- ✅ Workday basics complete (Week 1)
- ✅ GDPR training complete (Day 10)
- ✅ Advanced Workday training (Week 2)
- ✅ First cases handled independently (Week 3)
- ✅ Full system access granted (Week 3)

## Confidentiality Reminder

**YOU HANDLE SENSITIVE DATA**
- Employee salaries and compensation
- Performance issues and terminations
- Medical information and FMLA
- Discrimination and harassment reports
- Personal contact information

Treat all employee data with extreme care. When in doubt about sharing information, ask your manager first.

## Integration Scripts

Use mock integration scripts in `shared/integrations/`:
- `workday_api.py` - Employee data queries
- `greenhouse_api.py` - New hire data
- `slack_helper.py` - Channel monitoring

Example:
```python
from shared.integrations.workday_api import get_employee_profile

# Get employee for case
profile = get_employee_profile("E12345")
print(f"Processing case for {profile['name']}")
print(f"Manager: {profile['manager']['name']}")
```

## Resources

### Internal Documentation
- Workday Help Center: /workday-help
- HR Policy Wiki: /hr-policies
- Process Runbooks: /peopleops-processes
- Case Templates: /case-templates

### Training Materials
- Workday University (online courses)
- GDPR Compliance Module (required)
- Employee Relations 101 (SHRM)
- Benefits Administration Guide

## Notes for Demo

This skill demonstrates:
- **Systems-focused**: Heavy emphasis on Workday and HRIS
- **Compliance-aware**: GDPR, confidentiality, data privacy
- **Process-oriented**: Workflows, escalation, documentation
- **Support role**: Helping employees vs building products
