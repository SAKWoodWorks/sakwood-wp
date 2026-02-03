#!/bin/bash
# Git Workflow Helper for Sakwood

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Sakwood Git Workflow Helper ===${NC}\n"

# Function to show current status
show_status() {
    echo -e "${GREEN}📊 Current Status:${NC}"
    git status
    echo -e "\n${GREEN}📌 Current Branch:${NC}"
    git branch --show-current
    echo -e "\n${GREEN}📝 Recent Commits:${NC}"
    git log --oneline -5
}

# Function to create new feature branch
new_feature() {
    echo -e "${BLUE}Creating new feature branch...${NC}"
    read -p "Enter feature name (e.g., add-shopping-cart): " feature_name

    # Ensure we're on master
    git checkout master

    # Pull latest changes
    git pull origin master

    # Create and checkout new branch
    branch_name="feature/$feature_name"
    git checkout -b $branch_name

    echo -e "${GREEN}✅ Created branch: $branch_name${NC}"
}

# Function to commit changes by function
commit_function() {
    echo -e "${BLUE}Committing changes by function...${NC}\n"

    # Show changed files
    echo -e "${YELLOW}📁 Changed files:${NC}"
    git status --short

    echo -e "\n${BLUE}Commit types:${NC}"
    echo "  1) feat    - New feature"
    echo "  2) fix     - Bug fix"
    echo "  3) docs    - Documentation only"
    echo "  4) style   - Code style (formatting, no logic change)"
    echo "  5) refactor - Refactoring (no feature/fix)"
    echo "  6) test    - Adding tests"
    echo "  7) chore   - Maintenance tasks"

    read -p "Select commit type (1-7): " type_choice

    case $type_choice in
        1) type="feat" ;;
        2) type="fix" ;;
        3) type="docs" ;;
        4) type="style" ;;
        5) type="refactor" ;;
        6) type="test" ;;
        7) type="chore" ;;
        *) type="feat" ;;
    esac

    read -p "Enter scope (component/service/page/api): " scope
    read -p "Enter short description (max 50 chars): " subject

    # Format commit message
    if [ -n "$scope" ]; then
        commit_msg="$type($scope): $subject"
    else
        commit_msg="$type: $subject"
    fi

    # Stage files interactively
    echo -e "\n${YELLOW}Stage files (enter file names, or 'all' for everything):${NC}"
    read -p "> " files

    if [ "$files" = "all" ]; then
        git add .
    else
        git add $files
    fi

    # Commit
    git commit -m "$commit_msg"

    echo -e "${GREEN}✅ Committed: $commit_msg${NC}"
}

# Function to push changes
push_changes() {
    current_branch=$(git branch --show-current)
    echo -e "${BLUE}Pushing changes to origin/${current_branch}...${NC}"
    git push origin $current_branch
    echo -e "${GREEN}✅ Pushed successfully!${NC}"
}

# Function to finish feature and merge
finish_feature() {
    current_branch=$(git branch --show-current)

    if [ "$current_branch" = "master" ]; then
        echo -e "${RED}❌ You're on master! Switch to a feature branch first.${NC}"
        return
    fi

    echo -e "${BLUE}Finishing feature: $current_branch${NC}"

    # Push changes
    git push origin $current_branch

    echo -e "\n${GREEN}✅ Feature pushed!${NC}"
    echo -e "${YELLOW}Next steps:${NC}"
    echo "  1. Create Pull Request on GitHub"
    echo "  2. Request review"
    echo "  3. Merge to master after approval"
    echo "  4. Delete feature branch"
}

# Main menu
case "${1:-}" in
    status)
        show_status
        ;;
    new)
        new_feature
        ;;
    commit)
        commit_function
        ;;
    push)
        push_changes
        ;;
    finish)
        finish_feature
        ;;
    *)
        echo -e "${BLUE}Usage: ./git-workflow.sh [command]${NC}\n"
        echo "Commands:"
        echo "  status  - Show current git status"
        echo "  new     - Create new feature branch"
        echo "  commit  - Commit changes by function"
        echo "  push    - Push current branch to remote"
        echo "  finish  - Push and prepare for merge"
        echo ""
        echo -e "${YELLOW}Examples:${NC}"
        echo "  ./git-workflow.sh new"
        echo "  ./git-workflow.sh commit"
        echo "  ./git-workflow.sh finish"
        ;;
esac
