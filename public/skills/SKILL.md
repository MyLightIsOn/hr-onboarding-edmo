---
name: airbnb-onboarding-orchestrator
description: Main orchestrator skill that routes to role-specific onboarding skills. Detects employee role and loads appropriate onboarding workflow for Software Engineers, Product Managers, or HR Coordinators.
---

# AirOnboard - Onboarding Orchestrator

This is the main orchestrator skill that routes onboarding requests to role-specific skills based on the employee's role.

## Role Detection

When an employee starts onboarding, determine their role from the employee profile data and load the appropriate role-specific skill:

- **Software Engineer** → Load `roles/software-engineer/SKILL.md`
- **Product Manager** → Load `roles/product-manager/SKILL.md`
- **HR Coordinator** → Load `roles/hr-coordinator/SKILL.md`

## Data Sources

All skills have access to the following mock data sources located in `/lib/mock-data/`:

- `employees.json` - Employee profiles and metadata
- `roles.json` - Role definitions
- `policies.json` - HR policies database
- `org-chart.json` - Organizational hierarchy
- `people-directory.json` - Employee directory with recommendations
- `learning-paths.json` - Courses and training data
- `onboarding-tasks.json` - Role-specific checklists

## Progressive Disclosure Architecture

Skills are organized in 3 levels:

**Level 1 (Metadata)**: Always loaded into system prompt (~100 tokens)
- Skill name and description only
- Used for skill discovery and routing

**Level 2 (Instructions)**: Loaded when skill is triggered (~2-5k tokens)
- Main SKILL.md file with workflow instructions
- Role-specific onboarding guidance
- References to Level 3 resources

**Level 3 (Resources)**: Loaded on-demand (0 tokens until accessed)
- Policy documents in `shared/policies/`
- Integration scripts in `shared/integrations/`
- Additional reference materials

## Usage

1. Identify the employee's role from context
2. Load the appropriate role-specific skill
3. Follow that skill's workflow to personalize the onboarding experience
4. Access shared resources as needed for policies, people recommendations, etc.

## Shared Resources

All role-specific skills can access shared resources:

### Policies
Located in `shared/policies/`:
- `remote-work.md` - Remote work guidelines
- `expenses.md` - Expense reimbursement rules
- `pto.md` - PTO policy details
- `security.md` - Security and data handling
- `benefits.md` - Benefits overview

### Integration Scripts
Located in `shared/integrations/`:
- `workday_api.py` - Mock Workday integration
- `greenhouse_api.py` - Mock Greenhouse integration
- `confluence_helper.py` - Mock Confluence access
- `slack_helper.py` - Mock Slack integration

## Example Flow

1. Employee selects "Software Engineer" role
2. Orchestrator loads `roles/software-engineer/SKILL.md`
3. Software Engineer skill provides role-specific onboarding checklist
4. Employee asks about remote work policy
5. Skill references `shared/policies/remote-work.md` with role-specific context
6. Employee asks who to meet
7. Skill queries people recommendations for software engineers

## Notes

This is a demo implementation. In production, this would integrate with real Airbnb systems via APIs.
