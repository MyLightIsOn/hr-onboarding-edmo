# Development Environment Setup

Detailed guide for setting up your engineering workstation.

## Prerequisites

- MacBook Pro (provided by IT)
- Airbnb email account active
- Okta account configured

## Step-by-Step Setup

### 1. Install Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Install Core Development Tools

```bash
# Git and core CLI tools
brew install git gh node python@3.11 postgresql redis

# Install IDE (choose one)
brew install --cask visual-studio-code  # or
brew install --cask webstorm           # or
brew install --cask intellij-idea

# Install useful utilities
brew install jq wget curl fzf
```

### 3. Configure Git & GitHub

```bash
# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@airbnb.com"

# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@airbnb.com"

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key (add to GitHub)
pbcopy < ~/.ssh/id_ed25519.pub
```

Add your SSH key to GitHub:
1. Go to github.com/settings/keys
2. Click "New SSH key"
3. Paste and save

### 4. Clone Main Repository

```bash
# Create workspace directory
mkdir -p ~/airbnb
cd ~/airbnb

# Clone main monorepo
git clone git@github.com:airbnb/main.git
cd main
```

### 5. Install Dependencies

```bash
# Install Node dependencies
npm install

# Install Python dependencies
pip install -r requirements.txt

# Set up local database
./scripts/setup-db.sh
```

### 6. Configure Environment Variables

```bash
# Copy template
cp .env.example .env.local

# Edit with your values
# (Your buddy will help with API keys)
```

### 7. Start Local Development Server

```bash
# Start all services
npm run dev

# Or start individual services
npm run dev:web      # Web app
npm run dev:api      # API server
npm run dev:worker   # Background workers
```

### 8. Verify Setup

Visit http://localhost:3000 - you should see the Airbnb homepage.

Run tests:
```bash
npm test
```

### 9. Install Security Tools

```bash
# VPN client
brew install --cask pritunl

# Security scanner
brew install truffleHog git-secrets
```

### 10. Join Development Slack Channels

- #engineering - All engineers
- #eng-trust-safety - Your team
- #eng-help - Questions
- #deployments - Deploy notifications

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues
```bash
# Restart PostgreSQL
brew services restart postgresql
```

### Permission Denied on SSH
```bash
# Check SSH key is added
ssh-add -l

# Re-add if needed
ssh-add ~/.ssh/id_ed25519
```

## Need Help?

- Ask in #eng-help Slack channel
- Reach out to your onboarding buddy
- Check internal docs: airbnb.atlassian.net/eng-setup

## Next Steps

Once your environment is working:
1. Review [TEAM_CONTEXT.md](TEAM_CONTEXT.md) for team-specific info
2. Complete security training
3. Pick up your first starter task
