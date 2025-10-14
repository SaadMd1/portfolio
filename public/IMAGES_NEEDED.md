# Images Needed for Portfolio

This file lists all the images you need to create or source for your portfolio website.

## Priority Images (Required for Build)

### Essential Brand Assets
- [ ] `logo.png` (500x500px) - Your logo on transparent background
- [ ] `favicon.ico` (32x32px) - Browser favicon
- [ ] `og-image.jpg` (1200x630px) - Default Open Graph image
- [ ] `avatar.jpg` (400x400px) - Your profile photo
- [ ] `hero-image.jpg` (1920x1080px) - Homepage hero image
- [ ] `about-profile.jpg` (800x800px) - About page photo

## Project Images

For each project in `content/projects/`, you need:

### Organic Honey Project (`/projects/honey/`)
- [ ] `hero.jpg` (1920x1080px)
- [ ] `1.jpg` (1200x900px)
- [ ] `2.jpg` (1200x900px)
- [ ] `3.jpg` (1200x900px)

### Luxury Cosmetics Project (`/projects/cosmetics/`)
- [ ] `hero.jpg` (1920x1080px)
- [ ] `1.jpg` (1200x900px)
- [ ] `2.jpg` (1200x900px)
- [ ] `3.jpg` (1200x900px)

### Craft Coffee Project (`/projects/coffee/`)
- [ ] `hero.jpg` (1920x1080px)
- [ ] `1.jpg` (1200x900px)
- [ ] `2.jpg` (1200x900px)
- [ ] `3.jpg` (1200x900px)

### Sustainable Snacks Project (`/projects/snacks/`)
- [ ] `hero.jpg` (1920x1080px)
- [ ] `1.jpg` (1200x900px)
- [ ] `2.jpg` (1200x900px)
- [ ] `3.jpg` (1200x900px)

### Premium Tea Project (`/projects/tea/`)
- [ ] `hero.jpg` (1920x1080px)
- [ ] `1.jpg` (1200x900px)
- [ ] `2.jpg` (1200x900px)
- [ ] `3.jpg` (1200x900px)

### Artisan Chocolate Project (`/projects/chocolate/`)
- [ ] `hero.jpg` (1920x1080px)
- [ ] `1.jpg` (1200x900px)
- [ ] `2.jpg` (1200x900px)
- [ ] `3.jpg` (1200x900px)

## Blog Post Images

For each blog post in `content/posts/`, you need:

### Blog Cover Images (`/blog/`)
- [ ] `sustainable-trends.jpg` (1600x900px)
- [ ] `design-process.jpg` (1600x900px)
- [ ] `color-psychology.jpg` (1600x900px)
- [ ] `mistakes.jpg` (1600x900px)
- [ ] `fmcg-strategies.jpg` (1600x900px)
- [ ] `3d-mockups.jpg` (1600x900px)

## Image Specifications

### Technical Requirements
- **Format**: JPG for photos, PNG for graphics with transparency
- **Color space**: sRGB
- **Compression**: Optimize for web (aim for <200KB per image)
- **Resolution**: 72 DPI for web

### Recommended Dimensions
- **Hero images**: 1920x1080px (16:9)
- **Project thumbnails**: 1200x900px (4:3)
- **Blog covers**: 1600x900px (16:9)
- **OG images**: 1200x630px (exact)
- **Profile photos**: 400-800px square

## Sourcing Images

### Option 1: Use Your Own Work
Upload photos of your actual packaging design projects.

### Option 2: Stock Photography (Temporary)
Use high-quality stock photos from:
- Unsplash (free, no attribution required)
- Pexels (free, no attribution required)
- Pixabay (free)

Search terms:
- "packaging design"
- "product packaging"
- "cosmetic packaging"
- "food packaging"
- "sustainable packaging"
- "designer workspace"

### Option 3: Create Mockups
Use mockup generators:
- Adobe Dimension
- Smartmockups
- Placeit
- Your own 3D rendering software

## Image Optimization

Before uploading, optimize all images:

### Tools
- **TinyPNG** (https://tinypng.com/) - Online compression
- **ImageOptim** (Mac) - Desktop app
- **Squoosh** (https://squoosh.app/) - Advanced web tool

### Next.js will also:
- Automatically serve WebP/AVIF formats
- Generate responsive sizes
- Lazy load below-the-fold images

## Quick Start (Placeholder Images)

To get started quickly with placeholder images:

1. Use this Unsplash collection: https://unsplash.com/collections/packaging-design
2. Download images matching the dimensions above
3. Rename to match the required filenames
4. Place in appropriate directories

## File Naming Convention

Always use:
- Lowercase letters
- Hyphens instead of spaces
- Descriptive names with keywords
- Example: `organic-honey-jar-packaging-design.jpg`

## Alt Text Checklist

For every image, provide descriptive alt text in the MDX frontmatter or content:
- ✅ "Organic honey jar with minimalist label design"
- ❌ "image1.jpg"
- ❌ "packaging"

See SEO_PLAYBOOK.md for detailed alt text guidelines.


