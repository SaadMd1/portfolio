# Admin Panel Guide

Your portfolio now has a **visual admin panel** powered by Decap CMS!

## 🚀 Quick Start

### Local Development (No Setup Required)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Start the CMS backend:**
   ```bash
   npx decap-server
   ```
   
3. **Access the admin panel:**
   Open: http://localhost:3000/admin

4. **Login:**
   - No authentication needed in local mode
   - Click "Login" and you're in!

## 📝 What You Can Do

### Manage Projects
- Add new project case studies
- Edit existing projects
- Upload project images
- Set featured projects
- Add results and metrics

### Manage Blog Posts
- Write and publish blog posts
- Upload cover images
- Add tags and keywords
- Set featured posts
- Rich text editing with Markdown

### Manage Testimonials
- Add client testimonials
- Upload company logos
- Set ratings (1-5 stars)
- Link to projects
- Mark as featured

### Edit Pages
- Update About page content
- Modify stats (years, clients, projects)

## 🌐 Production Setup (After Deploy)

### Option 1: GitHub Authentication (Recommended)

1. **Enable Netlify Identity:**
   - Deploy to Netlify or Vercel
   - Enable Netlify Identity in your Netlify dashboard
   - Enable Git Gateway

2. **Add Users:**
   - Invite yourself as admin
   - Manage user access

3. **Access Admin:**
   - Go to: https://yourdomain.com/admin
   - Login with email/password

### Option 2: GitHub OAuth (Alternative)

1. **Create GitHub OAuth App:**
   - Go to GitHub Settings → Developer Settings → OAuth Apps
   - New OAuth App
   - Homepage URL: `https://yourdomain.com`
   - Callback URL: `https://api.netlify.com/auth/done`

2. **Update config.yml:**
   ```yaml
   backend:
     name: github
     repo: your-username/your-repo
     branch: main
   ```

## 📁 File Structure

```
public/
  admin/
    config.yml        # CMS configuration
    index.html        # Admin panel page
    preview.css       # Preview styles

content/
  projects/          # Project MDX files (managed via CMS)
  posts/             # Blog post MDX files (managed via CMS)
  testimonials/      # Testimonial JSON files (managed via CMS)
  pages/             # Static page content (managed via CMS)
```

## 🎯 Features

### Rich Text Editor
- Markdown support
- Live preview
- Image uploads
- Link insertion
- Formatting toolbar

### Media Management
- Upload images directly
- Stored in `public/uploads/`
- Automatic optimization (by Next.js)
- Preview before publishing

### Draft/Publish Workflow
- Save drafts
- Preview before publishing
- Publish when ready
- Git-based versioning

### Collections Available
1. **Projects** - Portfolio case studies
2. **Blog Posts** - Articles and insights
3. **Testimonials** - Client reviews
4. **Pages** - Static page content

## 🔒 Security

### Local Development
- No authentication required
- Safe for testing
- Changes saved locally

### Production
- Authentication required
- Netlify Identity recommended
- Git-based - all changes tracked
- Rollback capability via Git

## 📝 Common Tasks

### Add a New Project

1. Go to Admin → Projects → New Project
2. Fill in:
   - Title
   - Summary
   - Hero Image (upload)
   - Gallery Images (upload multiple)
   - Client name
   - Industry (select)
   - Services provided
   - Timeline
   - Results/metrics
   - Keywords for SEO
3. Write the case study in the editor
4. Click "Publish"

### Add a Blog Post

1. Go to Admin → Blog Posts → New Post
2. Fill in:
   - Title
   - Excerpt
   - Cover Image
   - Tags
   - Keywords
3. Write the post in Markdown
4. Click "Publish"

### Add a Testimonial

1. Go to Admin → Testimonials → New Testimonial
2. Fill in:
   - Client Name
   - Role & Company
   - Quote
   - Rating (1-5)
   - Company Logo (optional)
3. Click "Publish"

## 🐛 Troubleshooting

### Can't Access Admin Panel

**Issue:** 404 on /admin

**Solution:**
```bash
# Make sure dev server is running
npm run dev

# CMS files should be in public/admin/
ls public/admin/
```

### Local Backend Not Working

**Issue:** Can't login in local mode

**Solution:**
```bash
# Start the local backend server
npx decap-server

# Keep it running in a separate terminal
# Then access http://localhost:3000/admin
```

### Images Not Uploading

**Issue:** Upload fails

**Solution:**
- Check `public/uploads/` folder exists
- Ensure dev server is running
- Check browser console for errors

### Changes Not Appearing

**Issue:** Published content doesn't show

**Solution:**
```bash
# Restart dev server
npm run dev

# Changes should appear immediately
```

## 🎨 Customization

### Modify Collections

Edit `public/admin/config.yml` to:
- Add new content types
- Change field types
- Add validation rules
- Customize widgets

### Change Upload Folder

In `config.yml`:
```yaml
media_folder: "public/your-folder"
public_folder: "/your-folder"
```

### Add Custom Widgets

```yaml
# In config.yml, add custom widgets
# Or create custom React components
```

## 📚 Learn More

- **Decap CMS Docs:** https://decapcms.org/docs/
- **Configuration:** https://decapcms.org/docs/configuration-options/
- **Widgets:** https://decapcms.org/docs/widgets/

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Choose authentication method (Netlify Identity or GitHub OAuth)
- [ ] Update `config.yml` with production settings
- [ ] Set up authentication provider
- [ ] Test login on staging/preview deploy
- [ ] Invite admin users
- [ ] Test content creation
- [ ] Verify Git commits work
- [ ] Document admin URL for team

## 💡 Pro Tips

1. **Use Drafts:** Save work-in-progress without publishing
2. **Preview Before Publishing:** Check how content looks
3. **Git History:** All changes are version-controlled
4. **Bulk Uploads:** Upload multiple images at once
5. **Markdown Shortcuts:** Use `Cmd/Ctrl + B` for bold, `Cmd/Ctrl + I` for italic
6. **Search:** Use browser search (Cmd/Ctrl + F) to find content
7. **Duplicate:** Copy existing content to create similar items

## 🎯 Next Steps

1. **Test locally** - Add a sample project via admin panel
2. **Customize** - Adjust collections to match your needs
3. **Deploy** - Push to GitHub and set up authentication
4. **Train** - Learn the interface (it's intuitive!)
5. **Create** - Start adding your real projects and content

---

**Need help?** Check the [Decap CMS Documentation](https://decapcms.org/docs/) or create an issue on GitHub.

**Enjoy your new admin panel!** 🎉


