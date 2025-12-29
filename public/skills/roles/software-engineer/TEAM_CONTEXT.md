# Trust & Safety - Content Moderation Team

Team-specific context for Trust & Safety engineering.

## Team Mission

Build scalable, accurate content moderation systems that keep Airbnb safe for hosts and guests while respecting privacy and user experience.

## Current Priorities (Q1 2024)

1. **ML Model Improvements** - Increase precision/recall for harmful content detection
2. **Reviewer Tools** - Build better UI for human moderators
3. **API Performance** - Reduce latency for real-time moderation
4. **Policy Enforcement** - Implement new community guidelines

## Tech Stack

### Primary Languages
- **Python** - ML models, data pipelines
- **Scala** - Real-time processing services
- **TypeScript/React** - Reviewer tooling UI

### Infrastructure
- **Kubernetes** - Service orchestration
- **Kafka** - Event streaming
- **TensorFlow** - ML model training
- **PostgreSQL** - Content metadata
- **Redis** - Caching layer

### Tools
- **GitHub** - Code repository
- **Jira** - Sprint planning
- **Datadog** - Monitoring
- **PagerDuty** - On-call rotation

## Team Structure

**Engineering Manager**: Jordan Smith
- Weekly team sync
- Sprint planning lead
- Career development discussions

**Staff Engineer**: Morgan Lee
- Architecture decisions
- Technical mentorship
- Code review oversight

**Senior Engineers** (4):
- Feature leadership
- Mentoring mid-level engineers
- On-call rotation

**Engineers** (6):
- Feature development
- Bug fixes
- Testing & monitoring

## Meeting Schedule

### Weekly Recurring
- **Monday 10am** - Team Standup (15 min)
- **Monday 10:15am** - Sprint Planning when needed (1 hour)
- **Wednesday 2pm** - Team Sync / Tech Talks (30 min)
- **Friday 10am** - Standup + Retro (30 min)

### Monthly
- **First Tuesday** - All-Hands Engineering
- **Last Thursday** - Team Social/Lunch

## Communication Norms

### Slack Channels
- **#eng-trust-safety** - Team channel (general chat, questions)
- **#ts-deploys** - Deployment notifications
- **#ts-incidents** - Incident coordination
- **#ts-oncall** - On-call discussions

### Response Expectations
- Urgent (production down): Immediate
- Important (review needed): Same day
- Normal (questions): Within 24 hours
- FYI: No response needed

### Code Review
- Aim to review PRs within 24 hours
- Use GitHub review tools (comment, approve, request changes)
- Be constructive and kind in feedback
- @mention for urgency

## Development Workflow

### Branching Strategy
- `main` - Production branch
- `feature/your-name/description` - Feature branches
- `hotfix/description` - Emergency fixes

### PR Process
1. Create feature branch
2. Make changes, write tests
3. Run `npm test` locally
4. Push and create PR
5. Request review from 1-2 team members
6. Address feedback
7. Merge after approval

### Deployment
- Automatic CI/CD via GitHub Actions
- Staging deploys: On every PR merge
- Production deploys: Tuesday/Thursday (no Friday deploys!)
- Rollback process: Use GitHub deploy interface

## On-Call Rotation

- Starts Month 2+ (after ramp-up)
- One week rotations
- Primary + Secondary coverage
- PagerDuty for alerts
- Runbooks in Confluence

## Getting Started Tasks

### Week 1
- [ ] Join all team Slack channels
- [ ] Get added to team calendar
- [ ] Read architecture docs in Confluence
- [ ] Attend all team meetings

### Week 2
- [ ] Shadow code review
- [ ] Pick up "good first issue" from backlog
- [ ] Pair with senior engineer
- [ ] Deploy to staging

### Month 1
- [ ] Ship first feature
- [ ] Lead a small project
- [ ] Give demo at team sync
- [ ] Shadow on-call engineer

## Resources

### Documentation
- **Confluence**: airbnb.atlassian.net/trust-safety-eng
- **Runbooks**: /docs/runbooks/
- **Architecture Diagrams**: /docs/architecture/

### Learning
- ML for Content Moderation (internal course)
- Scala Best Practices (team wiki)
- Trust & Safety 101 (required training)

## Team Culture

### Values
- **Safety First** - User safety is our top priority
- **Data-Driven** - Decisions backed by metrics
- **Collaborate** - Cross-functional partnerships
- **Ship Often** - Iterate and improve
- **Respect Privacy** - Handle sensitive data carefully

### Social
- Coffee chats encouraged
- Monthly team outings
- Virtual game nights
- Slack #random for fun

## Questions?

- **Technical**: Ask in #eng-trust-safety or your buddy
- **Process**: Ask your manager
- **HR/Benefits**: Ask in #ask-hr
- **Urgent**: DM your manager or on-call engineer
