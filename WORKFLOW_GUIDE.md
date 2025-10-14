# Your Portfolio Workflow Guide

## 📝 **How to Update Your Portfolio**

### **Simple 5-Step Process:**

---

## 🎨 **Step 1: Edit Content Locally**

**Start your local environment:**

```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Admin backend
npx decap-server
```

**Go to admin panel:**
```
http://localhost:3000/admin
```

**Edit whatever you want:**
- ✅ Profile & Settings → Update name, bio, photos
- ✅ Projects → Add/edit case studies
- ✅ Blog Posts → Write new articles
- ✅ Testimonials → Add client reviews

**Click "Save" or "Publish"**

---

## 💾 **Step 2: Commit Changes**

After editing in admin, run these commands:

```bash
# Check what changed
git status

# Add all changes
git add .

# Commit with message
git commit -m "Updated portfolio content"
```

---

## 🚀 **Step 3: Push to GitHub**

```bash
git push origin main
```

---

## ⏱️ **Step 4: Wait for Auto-Deploy**

**Vercel automatically:**
1. Detects your push
2. Builds your site (2-3 min)
3. Deploys to production

**Check progress:**
https://vercel.com/saadmd1/portfolio/deployments

---

## ✅ **Step 5: Your Site is Updated!**

Visit your live URL - changes are live! 🎉

---

## 🔄 **Quick Commands Cheat Sheet**

### **Daily Workflow:**

```bash
# Start local admin
npm run dev
npx decap-server  # (separate terminal)

# Edit at http://localhost:3000/admin

# Push changes
git add .
git commit -m "Description of changes"
git push origin main

# Done! Vercel auto-deploys
```

---

## 📊 **Common Tasks**

### **Add New Project:**

1. **Admin:** Projects → New Project
2. **Fill in:** Title, images, case study
3. **Save**
4. **Terminal:**
   ```bash
   git add .
   git commit -m "Added new project: [Project Name]"
   git push origin main
   ```
5. **Wait 3 min** - Live on your site! ✅

---

### **Write Blog Post:**

1. **Admin:** Blog Posts → New Post
2. **Write:** Title, content, tags
3. **Upload:** Cover image
4. **Publish**
5. **Terminal:**
   ```bash
   git add .
   git commit -m "New blog post: [Post Title]"
   git push origin main
   ```
6. **Live in 3 min!** ✅

---

### **Update Profile:**

1. **Admin:** Profile & Settings → My Profile
2. **Edit:** Name, bio, photos, stats
3. **Save**
4. **Terminal:**
   ```bash
   git add .
   git commit -m "Updated profile"
   git push origin main
   ```
5. **Live in 3 min!** ✅

---

## 🎯 **Pro Tips**

### **Commit Message Best Practices:**

```bash
# Good commit messages
git commit -m "Added new honey packaging project"
git commit -m "Updated bio and profile picture"
git commit -m "New blog post about sustainable design"

# Bad commit messages
git commit -m "update"
git commit -m "changes"
git commit -m "asdf"
```

### **Check Before Pushing:**

```bash
# See what will be committed
git status

# See actual changes
git diff
```

### **Preview Locally First:**

Always preview at `http://localhost:3000` before pushing to production!

---

## 🔍 **Troubleshooting**

### **Changes not showing locally?**

```bash
# Restart dev server
# Ctrl+C to stop, then:
npm run dev
```

### **Forgot to commit?**

```bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main
```

### **Want to undo last commit?**

```bash
# Undo last commit (keeps changes)
git reset --soft HEAD~1

# Make new changes, then commit again
```

---

## 📱 **Mobile Workflow (Optional)**

You can also edit content on your phone!

**Apps to use:**
- **GitHub Mobile** - Edit files directly
- **Working Copy** (iOS) - Full Git client
- **MGit** (Android) - Git client

---

## ⚡ **Speed Tips**

### **Multiple Changes at Once:**

```bash
# Make several edits in admin panel
# Then commit all at once:

git add .
git commit -m "Updated 3 projects, added 2 blog posts, updated bio"
git push origin main
```

### **Auto-Push Script (Advanced):**

Create `push.ps1`:
```powershell
git add .
git commit -m "Content update $(Get-Date -Format 'yyyy-MM-dd')"
git push origin main
Write-Host "✓ Pushed to GitHub! Vercel is deploying..."
```

Run: `.\push.ps1` (one command to push everything!)

---

## 📅 **Typical Workflow**

### **Weekly:**
- Write 1-2 blog posts
- Add client testimonials as they come
- Update stats/numbers

### **Monthly:**
- Add new completed projects
- Update skills if learned new tools
- Review and refresh old content

### **As Needed:**
- Update profile photo
- Add awards/recognition
- Modify service offerings

---

## ✅ **You're All Set!**

**Your workflow is:**
1. Edit locally at `http://localhost:3000/admin`
2. Push to GitHub
3. Vercel auto-deploys
4. Done!

**Simple, secure, and professional!** 🎨

---

**Check your Vercel deployment now - it should be building successfully!** 🚀

Visit: https://vercel.com/saadmd1/portfolio

