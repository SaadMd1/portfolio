# Deployment Guide

This guide covers deploying your packaging designer portfolio to Vercel (recommended) and other platforms.

## Vercel Deployment (Recommended)

Vercel is the easiest and best-performing option for Next.js sites.

### Initial Setup

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**

   Add these in Vercel dashboard under Settings → Environment Variables:

   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_SITE_NAME=YourName Design Studio
   NEXT_PUBLIC_DEFAULT_LOCALE=en
   
   # Analytics (optional)
   ANALYTICS_ENABLED=true
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
   
   # Contact Form
   CONTACT_TO_EMAIL=hello@yourdomain.com
   RESEND_API_KEY=re_xxxxxxxxxxxx
   
   # Optional
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/yourname
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxx
   NEXT_PUBLIC_BING_SITE_VERIFICATION=xxxxxxxxxxxxxx
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your site is live!

### Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **DNS Configuration**

   Add these records to your domain registrar:

   **Option A: Apex Domain (yourdomain.com)**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **Option B: Subdomain (www.yourdomain.com)**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**
   - Vercel automatically provisions SSL
   - Wait 24-48 hours for DNS propagation
   - Certificate auto-renews

### Environment-Specific Settings

**Production:**
- Automatic deployments from `main` branch
- All environment variables set
- Analytics enabled

**Preview:**
- Automatic for all PRs
- Uses production environment variables
- Perfect for client reviews

**Development:**
- Use `.env.local` for local development
- Never commit `.env.local` to git

## Alternative Platforms

### Netlify

1. Connect GitHub repository
2. Build settings:
   - Build command: `pnpm build`
   - Publish directory: `.next`
3. Add environment variables
4. Deploy

### Cloudflare Pages

1. Connect GitHub repository
2. Framework preset: Next.js
3. Build command: `pnpm build`
4. Build output directory: `.next`
5. Add environment variables
6. Deploy

### Self-Hosted (VPS/Docker)

**Requirements:**
- Node.js 18.17+
- PM2 or similar process manager
- Nginx for reverse proxy

**Build & Deploy:**
```bash
# On your server
git clone <your-repo>
cd packaging-designer-portfolio
pnpm install
pnpm build

# Start with PM2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Checklist

### Immediate (After First Deploy)

- [ ] Verify site loads correctly
- [ ] Test all navigation links
- [ ] Test contact form (submit a test)
- [ ] Check mobile responsiveness
- [ ] Verify all images load
- [ ] Test 404 and error pages
- [ ] Check analytics tracking works

### Within 24 Hours

- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify domain in Google Search Console
- [ ] Verify domain in Bing Webmaster Tools
- [ ] Set up Google Analytics property (if not done)
- [ ] Test email notifications from contact form
- [ ] Check all external links work

### Within 1 Week

- [ ] Run Lighthouse audit on all major pages
- [ ] Fix any performance issues (target 95+)
- [ ] Set up monitoring (Vercel Analytics or similar)
- [ ] Create Google My Business profile (if applicable)
- [ ] Share on social media
- [ ] Update portfolio links on LinkedIn, etc.
- [ ] Send announcement to existing clients/network

## Monitoring & Maintenance

### Regular Monitoring

**Daily (First Week):**
- Check Google Search Console for crawl errors
- Monitor contact form submissions
- Review any error logs

**Weekly:**
- Review analytics traffic
- Check Core Web Vitals in Search Console
- Respond to any contact form inquiries

**Monthly:**
- Audit site performance (Lighthouse)
- Review top-performing pages
- Update any outdated content
- Check for broken links
- Review and respond to any issues

### Updates

**Content Updates:**
- New projects: Add MDX file + images, deploy
- New blog posts: Add MDX file + images, deploy
- Portfolio updates: Edit existing MDX files, deploy

**Code Updates:**
- Test locally first
- Push to GitHub
- Vercel auto-deploys from main branch
- Check preview deployment before merging PRs

## Troubleshooting

### Build Fails

**Common Issues:**

1. **Missing Environment Variables**
   - Check all required vars are set in Vercel
   - Values must not have quotes

2. **Image Import Errors**
   - Ensure all image paths in MDX are correct
   - Images must exist in `public/` directory

3. **TypeScript Errors**
   - Run `pnpm typecheck` locally to catch before deploying
   - Fix any type errors

4. **Dependency Issues**
   - Delete `node_modules` and `pnpm-lock.yaml`
   - Run `pnpm install` fresh
   - Commit updated lock file

### Deployment is Slow

- Check build logs for warnings
- Optimize large dependencies
- Use dynamic imports for heavy components
- Ensure images are optimized before upload

### Forms Not Working

- Verify `RESEND_API_KEY` is set correctly
- Check `CONTACT_TO_EMAIL` is valid
- Review function logs in Vercel dashboard
- Test with verified email domain in Resend

### Analytics Not Tracking

- Verify `ANALYTICS_ENABLED=true`
- Check GA4 measurement ID is correct
- Use browser dev tools to verify scripts load
- Wait 24-48 hours for data to appear

### Images Not Loading

- Check image paths start with `/`
- Verify images exist in `public/` directory
- Check file extensions match (case-sensitive)
- Clear browser cache and hard reload

## Performance Optimization

### Before Launch

1. **Optimize All Images**
   - Use TinyPNG or Squoosh
   - Target <200KB per image
   - Provide correct dimensions

2. **Enable Compression**
   - Vercel handles this automatically
   - Serves Brotli compression

3. **Configure Caching**
   - Static assets cached automatically
   - ISR for dynamic pages

4. **Minimize JavaScript**
   - Audit bundle size: `pnpm analyze`
   - Remove unused dependencies
   - Code split large components

### After Launch

1. **Monitor Core Web Vitals**
   - Target: LCP <2.5s, FID <100ms, CLS <0.1
   - Use Vercel Analytics or Search Console
   - Fix any issues immediately

2. **Set Up CDN**
   - Vercel Edge Network (automatic)
   - Cloudflare (if self-hosted)

3. **Monitor Real User Metrics**
   - Vercel Analytics (recommended)
   - Google Analytics 4
   - Track page load times

## Rollback Procedure

If something goes wrong:

1. **Vercel Dashboard**
   - Go to Deployments
   - Find last working deployment
   - Click "..." → "Promote to Production"

2. **Git Revert**
   ```bash
   git revert HEAD
   git push origin main
   ```

## Backup Strategy

**Automated (Recommended):**
- GitHub stores all code
- Vercel keeps deployment history (50+ deployments)
- Content (MDX) in git repository

**Manual Backups:**
- Export environment variables monthly
- Backup Resend email logs if needed
- Export analytics data quarterly

## Security Considerations

### Best Practices

- ✅ Never commit secrets to git
- ✅ Use environment variables for all keys
- ✅ Enable HTTPS (automatic with Vercel)
- ✅ Set security headers (configured in next.config.js)
- ✅ Keep dependencies updated
- ✅ Use Vercel's DDoS protection
- ✅ Implement rate limiting on forms

### Regular Security Audits

```bash
# Check for dependency vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit fix
```

## Cost Estimates

### Vercel (Hobby Plan - FREE)
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Edge Network (CDN)
- ✅ Analytics (limited)
- ⚠️ 100GB bandwidth/month
- ⚠️ Fair use on build time

**Upgrade to Pro ($20/mo) when:**
- Need more than 100GB bandwidth
- Want advanced analytics
- Require priority support

### Additional Services

- **Domain**: $10-15/year (Namecheap, Google Domains)
- **Resend Email**: Free tier (100 emails/day)
- **Plausible Analytics**: $9/month (optional)
- **Stock Images**: $0-30/month (if using Unsplash Stock)

**Total Monthly Cost: $0-30** (excluding domain)

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Community**: Vercel Discord, Next.js GitHub Discussions
- **Status**: https://www.vercel-status.com

---

**Ready to deploy?** Follow the Vercel deployment steps above and your portfolio will be live in minutes!

