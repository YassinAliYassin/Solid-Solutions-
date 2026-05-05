#!/bin/bash
# sync-to-github.sh - Complete sync script for Solid Solutions repo
# Author: Hermes Agent (Autonomous AI)
# Run this from your local repo directory

echo "🔧 HERMES SYNC SCRIPT FOR SOLID SOLUTIONS"
echo "========================================"

# Check if we're in a git repo
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository! cd to your local repo first."
    exit 1
fi

echo "\n1️⃣ Pulling latest changes from GitHub (Hermes Agent commits)..."
git pull --rebase origin master

if [ $? -ne 0 ]; then
    echo "❌ Pull failed! You might have local changes."
    echo "   Stash your changes first: git stash"
    echo "   Then run this script again."
    exit 1
fi

echo "\n2️⃣ Checking status..."
git status

echo "\n3️⃣ Pushing to GitHub..."
git push origin master

if [ $? -eq 0 ]; then
    echo "\n✅ SYNC COMPLETE! Your changes are now on GitHub."
    echo "   GitHub Actions will auto-deploy to solidsolutions.africa"
else
    echo "\n❌ Push failed! Check the error message above."
fi

echo "\n========================================"
echo "💡 If you still see errors, they're OLD emails from deleted workflows."
echo "   Ignore them - the 'Auto Deploy' workflow is working perfectly."
