# 🌿 Git Workflow Guide - Sakwood

## 📌 Commit Message Format

```
<type>(<scope>): <subject>
```

### Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style (formatting, no logic change)
- `refactor` - Refactoring (no feature/fix)
- `test` - Adding tests
- `chore` - Maintenance tasks

### Scopes:
- `component` - UI components
- `service` - API/data services
- `page` - Page components
- `api` - Next.js API routes

## 🎯 Feature Branch Workflow

### Step 1: Start New Feature
```bash
# Switch to master
git checkout master

# Pull latest changes
git pull origin master

# Create feature branch
git checkout -b feature/your-feature-name
```

### Step 2: Work & Commit by Function
```bash
# Work on a specific function/feature
# Example: Add product search

# Commit the search service
git add lib/services/searchService.ts
git commit -m "feat(service): add product search API"

# Commit the search component
git add components/search/SearchBar.tsx
git commit -m "feat(component): add search input component"

# Commit the search page
git add app/[lang]/search/page.tsx
git commit -m "feat(page): add search results page"

# Commit translations
git add dictionaries/en.json dictionaries/th.json
git commit -m "feat(i18n): add search translations"
```

### Step 3: Push & Create PR
```bash
# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Step 4: Merge & Cleanup
```bash
# After PR is approved and merged:
git checkout master
git pull origin master

# Delete local branch
git branch -d feature/your-feature-name

# Delete remote branch
git push origin --delete feature/your-feature-name
```

## 📝 Example: Organizing Commits by Function

### ❌ Bad: One big commit
```bash
git add .
git commit -m "add user authentication"
# This mixes authentication, UI, database, and translations together!
```

### ✅ Good: Separate commits by function
```bash
# 1. Auth service logic
git add lib/services/authService.ts
git commit -m "feat(service): add authentication service"

# 2. Auth context
git add contexts/AuthContext.tsx
git commit -m "feat(context): add AuthContext for state management"

# 3. Login page
git add app/[lang]/login/page.tsx
git commit -m "feat(page): add login page"

# 4. Login components
git add components/auth/LoginForm.tsx
git commit -m "feat(component): add login form component"

# 5. Translations
git add dictionaries/en.json dictionaries/th.json
git commit -m "feat(i18n): add authentication translations"

# 6. WordPress API endpoint
git add wordpress-plugin/sakwood-integration/auth-api.php
git commit -m "feat(api): add WordPress authentication endpoint"
```

## 🔄 Real-World Example: Quick Shop Feature

Your actual commit history:
```
51f5cfc2 feat: add Quick Shop link to header navigation
d11d57bf feat: add quick-shop translations (TH/EN)
78fabdee feat: add quick-shop final CTA section
df388967 feat: add quick-shop benefits section
1e6c56ef feat: add quick-shop products section
```

This is excellent! Each commit has a single purpose:
1. ✅ Navigation link
2. ✅ Translations
3. ✅ CTA section
4. ✅ Benefits section
5. ✅ Products section

## 🛠️ Useful Commands

### Check what changed
```bash
git status                    # See modified files
git diff                      # See actual changes
git diff --staged            # See staged changes
```

### Commit specific files
```bash
git add path/to/file.ts      # Stage one file
git add *.tsx                # Stage all .tsx files
git add .                    # Stage everything
```

### View history
```bash
git log --oneline -10        # Last 10 commits
git log --graph              # Visual branch history
git show HEAD                # Show last commit details
```

### Undo mistakes
```bash
git reset HEAD file.ts       # Unstage a file
git commit --amend           # Fix last commit message
git revert HEAD              # Undo last commit
```

## 📊 Branch Management

### List branches
```bash
git branch                   # Local branches
git branch -a                # All branches (including remote)
git branch -r                # Remote branches only
```

### Switch branches
```bash
git checkout master          # Switch to master
git checkout -b new-feature  # Create & switch to new branch
```

### Compare branches
```bash
git diff master              # Compare current branch to master
git log master..HEAD         # See commits in current branch only
```

## 🎓 Best Practices

1. **One function per commit** - Keep commits focused
2. **Write clear messages** - Describe WHY, not WHAT
3. **Commit often** - Small, frequent commits are better
4. **Test before commit** - Ensure code works
5. **Use feature branches** - Don't work directly on master
6. **Push frequently** - Backup your work remotely

## 🚀 Quick Reference

```bash
# Start new feature
git checkout master && git pull && git checkout -b feature/name

# Work and commit
git add <files>
git commit -m "type(scope): description"

# Push
git push origin feature/feature-name

# Merge (after PR approval)
git checkout master && git pull && git branch -d feature/feature-name
```
