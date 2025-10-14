# GitHub Token Setup for Production Admin

## 🔑 **Why You Need This:**

To edit content on Vercel (production), the admin panel needs permission to commit changes to your GitHub repository.

---

## 📝 **Create GitHub Personal Access Token:**

### **Step 1: Go to GitHub Settings**

Click this link: **https://github.com/settings/tokens/new**

### **Step 2: Fill in the Form**

**Token name (note):** `Portfolio Admin Vercel`

**Expiration:** `No expiration` (or 1 year)

**Select scopes:** ✅ Check these boxes:
- ✅ **repo** (Full control of private repositories)
  - This gives access to commit to your repository

**Click "Generate token"**

### **Step 3: Copy Your Token**

You'll see a token like:
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **COPY IT NOW!** You won't see it again!

---

## ⚙️ **Add to Vercel:**

### **Step 1: Go to Vercel Environment Variables**

**Link:** https://vercel.com/saadmd1/portfolio/settings/environment-variables

### **Step 2: Add Two Variables**

**Variable 1:**
- **Key:** `GITHUB_TOKEN`
- **Value:** `ghp_xxxxxxxxxxxx` (paste your token)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

**Variable 2 (if not added yet):**
- **Key:** `ADMIN_PASSWORD`
- **Value:** `YourSecurePassword123!` (choose a strong password)
- **Environment:** ✅ Production, ✅ Preview, ✅ Development

**Click "Save" for each**

---

## 🔄 **Redeploy:**

After adding both variables:

1. Go to: https://vercel.com/saadmd1/portfolio
2. Click "Deployments"
3. Click "..." on latest deployment
4. Click "Redeploy"

**Or just wait for next automatic deploy**

---

## ✅ **After Setup:**

Your admin will work on production!

**Workflow:**
1. Go to: `https://your-site.vercel.app/admin`
2. Login with your password
3. Edit content directly in browser
4. Click "Save"
5. Changes commit to GitHub automatically
6. Vercel rebuilds and deploys
7. Live in 3 minutes! ✨

---

## 🔐 **Security Notes:**

- ✅ Token is stored securely in Vercel environment
- ✅ Never exposed to public
- ✅ Password-protected admin access
- ✅ All changes tracked in Git
- ✅ Can rollback if needed

---

## 🎯 **Summary:**

**Two Required Environment Variables:**

| Key | Value | Purpose |
|-----|-------|---------|
| `ADMIN_PASSWORD` | Your chosen password | Login to admin |
| `GITHUB_TOKEN` | `ghp_xxx...` | Commit changes from admin |

**Both must be added in Vercel!**

---

## ⚡ **Quick Links:**

- **Create Token:** https://github.com/settings/tokens/new
- **Add to Vercel:** https://vercel.com/saadmd1/portfolio/settings/environment-variables

---

**Follow steps above to enable production admin editing!** 🚀

