# Admin Panel to Portfolio Binding Guide

## ✅ How It Works Now

Your admin panel is **fully connected** to your portfolio! Here's the data flow:

```
Admin Panel → JSON/MDX Files → Portfolio Pages
```

---

## 🔗 Data Binding Map

### Profile & Settings → Site-wide

**File:** `content/settings/profile.json`

| Admin Field | Used On | What It Controls |
|-------------|---------|------------------|
| Name | Homepage, About, Footer | Your name everywhere |
| Title | About page | Professional title |
| Avatar | About page | Your profile photo |
| Hero Image | Homepage | Large background image |
| Bio (Short) | Homepage | Hero section description |
| Bio (Long) | About page | Full biography |
| Email | Contact info | Contact email |
| Location | About page | Where you're based |
| Social Links | Footer | Twitter, LinkedIn, Instagram links |
| Stats | Homepage, About | Years, clients, products, countries |
| Skills | About page | Tools & technology list |
| Awards | About page | Awards & recognition section |

**File:** `content/settings/site.json`

| Admin Field | Used On | What It Controls |
|-------------|---------|------------------|
| Site Name | Header, Footer, Meta | Brand name everywhere |
| Tagline | Meta tags | SEO tagline |
| Description | Footer, Meta | Site description |
| Logo | (Future use) | Site logo |
| Favicon | (Future use) | Browser icon |
| OG Image | Meta tags | Social sharing image |

---

### Projects → Portfolio Pages

**Files:** `content/projects/*.mdx`

| Admin Field | Used On | What It Controls |
|-------------|---------|------------------|
| Title | /work, /work/[slug] | Project name |
| Summary | /work cards | Short description |
| Hero Image | /work/[slug] | Main project image |
| Gallery | /work/[slug] | Additional images |
| Client | /work/[slug] | Client name |
| Industry | /work cards, /work/[slug] | Industry tag |
| Services | /work/[slug] | Services provided |
| Deliverables | /work/[slug] | What was delivered |
| Materials | /work/[slug] | Materials used |
| Sustainability | /work cards | Eco badges |
| Timeline | /work/[slug] | Project duration |
| Results | /work/[slug] | Metrics & outcomes |
| Keywords | Meta tags | SEO keywords |
| Featured | Homepage | Show on homepage |

---

### Blog Posts → Blog Pages

**Files:** `content/posts/*.mdx`

| Admin Field | Used On | What It Controls |
|-------------|---------|------------------|
| Title | /blog, /blog/[slug] | Post title |
| Excerpt | /blog cards | Short description |
| Cover Image | /blog cards, /blog/[slug] | Featured image |
| Tags | /blog cards | Category tags |
| Keywords | Meta tags | SEO keywords |
| Author | /blog/[slug] | Author info |
| Featured | Homepage | Show on homepage |
| Body | /blog/[slug] | Article content |

---

### Testimonials → Testimonial Pages

**Files:** `content/testimonials/*.json`

| Admin Field | Used On | What It Controls |
|-------------|---------|------------------|
| Client Name | Homepage, /testimonials | Client name |
| Role | Cards | Job title |
| Company | Cards | Company name |
| Quote | Cards | Testimonial text |
| Rating | Cards | Star rating (1-5) |
| Featured | Homepage | Show on homepage |

---

## 🎯 How to Test the Binding

### 1. Edit in Admin Panel

Go to: **http://localhost:3000/admin**

- Click "Profile & Settings" → "My Profile"
- Change your name to "John Doe"
- Click "Save"

### 2. Restart Dev Server

```bash
# Stop server (Ctrl+C), then:
npm run dev
```

### 3. See Changes Live

Visit: **http://localhost:3000**

- Header shows "John Doe"
- Homepage shows updated bio
- About page shows new name
- Footer updated

---

## 📊 Real-Time Updates

### What Updates Automatically:
- ✅ All text content
- ✅ Images (once URLs added)
- ✅ Stats and numbers
- ✅ Social media links
- ✅ Awards and skills

### What Requires Server Restart:
- ⚠️ After editing in admin panel
- ⚠️ Adding new projects/posts
- ⚠️ Changing profile settings

**Why?** Next.js reads files at build/page load time.

---

## 🔄 Complete Workflow Example

### Adding a New Project:

1. **Admin Panel:**
   - Go to http://localhost:3000/admin
   - Click "Projects" → "New Project"
   - Fill in all fields
   - Upload images
   - Write case study
   - Click "Publish"

2. **File System:**
   - Creates: `content/projects/your-project-slug.mdx`
   - Saves images to: `public/uploads/`

3. **Restart Server:**
   ```bash
   npm run dev
   ```

4. **See It Live:**
   - Visit: http://localhost:3000/work
   - Your new project appears!
   - Click it: http://localhost:3000/work/your-project-slug

---

## 💾 "Database" Structure

Your "database" is file-based:

```
content/
├── settings/
│   ├── profile.json      ← Your profile data
│   └── site.json         ← Site settings
├── projects/
│   ├── project-1.mdx     ← Project case studies
│   ├── project-2.mdx
│   └── ...
├── posts/
│   ├── post-1.mdx        ← Blog posts
│   ├── post-2.mdx
│   └── ...
└── testimonials/
    ├── client-1.json     ← Testimonials
    ├── client-2.json
    └── ...
```

**Benefits:**
- ✅ Version controlled (Git)
- ✅ Easy to backup
- ✅ No database needed
- ✅ Fast & secure
- ✅ Easy to migrate

---

## 🎨 Customization Flow

### Scenario: Update Your Name

**Option A: Admin Panel (Visual)**
1. Go to Admin → Profile & Settings → My Profile
2. Change "Name" field
3. Save
4. Restart dev server
5. ✅ Name updated everywhere

**Option B: Direct File Edit (Fast)**
1. Open `content/settings/profile.json`
2. Change `"name": "New Name"`
3. Save
4. Restart dev server
5. ✅ Name updated everywhere

Both methods work! Choose your preference.

---

## 🚀 Production Behavior

### On Vercel/Netlify:

**Static Generation (SSG):**
- Site builds once on deploy
- All content baked into static pages
- Super fast loading

**To Update Content:**
1. Edit in admin panel
2. Save (creates Git commit)
3. Push to GitHub
4. Vercel auto-deploys
5. Site rebuilds with new content

**Build time:** ~2-3 minutes per deploy

---

## 🔍 Troubleshooting

### Changes Not Showing?

**Solution:**
```bash
# Always restart after editing content
npm run dev
```

### Images Not Loading?

**Check:**
1. URL is valid (test in browser)
2. next.config.js has domain in `remotePatterns`
3. Image URL includes proper sizing params

### Admin Panel Not Saving?

**Check:**
1. `npx decap-server` is running
2. File permissions are correct
3. Check browser console for errors

---

## 📝 Quick Reference

### Files That Control Each Page:

| Page | Data Sources |
|------|--------------|
| Homepage | `profile.json` + `projects/*.mdx` + `testimonials/*.json` |
| About | `profile.json` |
| Work | `projects/*.mdx` |
| Services | `src/lib/constants.ts` (static) |
| Blog | `posts/*.mdx` |
| Testimonials | `testimonials/*.json` |
| Header | `site.json` |
| Footer | `site.json` + `profile.json` (social) |

---

## ✨ You're All Set!

**The binding is complete!** 

Any changes you make in the admin panel will now reflect on your portfolio site after restarting the dev server.

### Test it now:
1. Edit your profile in admin
2. Restart: `npm run dev`
3. See changes live!

🎉 **Your portfolio is fully dynamic and manageable!**


