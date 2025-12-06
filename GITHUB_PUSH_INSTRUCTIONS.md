# GitHub Push Instructions

## Option 1: Install Git and Push via Command Line

### Step 1: Install Git
1. Download Git from: https://git-scm.com/download/win
2. Install it with default settings
3. Restart your terminal/PowerShell

### Step 2: Navigate to Project Directory
```powershell
cd "C:\Users\The Affinity Zone\Downloads\teradownloader"
```

### Step 3: Initialize Git Repository
```powershell
git init
```

### Step 4: Add All Files
```powershell
git add .
```

### Step 5: Create Initial Commit
```powershell
git commit -m "Initial commit: TeraDownloader - Complete Terabox downloader web application"
```

### Step 6: Set Main Branch
```powershell
git branch -M main
```

### Step 7: Add Remote Repository
```powershell
git remote add origin https://github.com/hamzamuzamil/TeraDownloader.git
```

### Step 8: Push to GitHub
```powershell
git push -u origin main
```

**Note:** If you get authentication error, you'll need to:
- Use Personal Access Token instead of password
- Or use GitHub Desktop (Option 2)

---

## Option 2: Use GitHub Desktop (Easier)

### Step 1: Download GitHub Desktop
1. Download from: https://desktop.github.com/
2. Install and sign in with your GitHub account

### Step 2: Add Repository
1. Open GitHub Desktop
2. Click "File" → "Add Local Repository"
3. Browse to: `C:\Users\The Affinity Zone\Downloads\teradownloader`
4. Click "Add Repository"

### Step 3: Commit and Push
1. You'll see all your files in the left panel
2. Write commit message: "Initial commit: TeraDownloader - Complete Terabox downloader web application"
3. Click "Commit to main"
4. Click "Publish repository" or "Push origin"
5. Your code will be pushed to GitHub!

---

## Option 3: Manual Upload via GitHub Web Interface

### Step 1: Create README.md
I'll create a README for you.

### Step 2: Upload Files
1. Go to: https://github.com/hamzamuzamil/TeraDownloader
2. Click "uploading an existing file"
3. Drag and drop all your project files
4. Write commit message
5. Click "Commit changes"

**Note:** This method is slower for large projects.

---

## Important Files to Include

Make sure these are NOT in .gitignore (they should be pushed):
- ✅ All source code files
- ✅ package.json files
- ✅ README.md
- ✅ Configuration files

These will be EXCLUDED (already in .gitignore):
- ❌ node_modules/
- ❌ .env files
- ❌ dist/build folders
- ❌ Log files

---

## After Pushing

Once your code is on GitHub, you can:
1. View it at: https://github.com/hamzamuzamil/TeraDownloader
2. Share the repository link
3. Clone it on other machines
4. Set up CI/CD
5. Deploy to hosting platforms

---

## Troubleshooting

### Authentication Error
- Use Personal Access Token instead of password
- Generate token: GitHub → Settings → Developer settings → Personal access tokens

### Large File Error
- Make sure node_modules is in .gitignore
- Don't commit .env files

### Branch Name Error
- Use: `git branch -M main` (not master)

---

**Recommended: Use GitHub Desktop (Option 2) - It's the easiest!**


