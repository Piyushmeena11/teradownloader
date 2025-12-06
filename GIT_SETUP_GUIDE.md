# Git Setup & Push Guide

## ⚠️ Important: After Installing Git

After installing Git, you need to **restart your PowerShell/terminal** for it to recognize the `git` command.

## Step 1: Restart PowerShell

1. Close your current PowerShell window
2. Open a NEW PowerShell window
3. Or restart VS Code/your IDE

## Step 2: Verify Git Installation

Open PowerShell and run:
```powershell
git --version
```

If you see a version number (like `git version 2.xx.x`), Git is installed correctly!

## Step 3: Configure Git (First Time Only)

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and GitHub email.

## Step 4: Navigate to Project

```powershell
cd "C:\Users\The Affinity Zone\Downloads\teradownloader"
```

## Step 5: Initialize and Push

```powershell
# Initialize repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: TeraDownloader - Complete Terabox downloader web application"

# Set main branch
git branch -M main

# Add remote
git remote add origin https://github.com/hamzamuzamil/TeraDownloader.git

# Push to GitHub
git push -u origin main
```

## Alternative: Use Git Bash

If PowerShell still doesn't work:

1. Right-click in your project folder
2. Select "Git Bash Here"
3. Run the same commands above

## If Authentication Fails

When you run `git push`, GitHub will ask for credentials:

1. **Username**: Your GitHub username (`hamzamuzamil`)
2. **Password**: Use a **Personal Access Token** (NOT your GitHub password)

### Create Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "TeraDownloader"
4. Select scopes: Check `repo` (full control)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

## Quick Checklist

- [ ] Git installed
- [ ] PowerShell/terminal restarted
- [ ] Git version verified (`git --version`)
- [ ] Git configured (name & email)
- [ ] In project directory
- [ ] All commands run successfully
- [ ] Code pushed to GitHub

## Verify Push

After pushing, check:
https://github.com/hamzamuzamil/TeraDownloader

You should see all your files there!

---

**Need Help?** If you still get errors, share the error message and I'll help fix it!


