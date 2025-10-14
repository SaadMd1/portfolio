import { test, expect } from '@playwright/test'

test.describe('Critical User Flows', () => {
  test('Homepage loads successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/YourName Design Studio/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('Navigation works correctly', async ({ page }) => {
    await page.goto('/')
    
    // Test main navigation links
    await page.getByRole('link', { name: 'Work' }).click()
    await expect(page).toHaveURL('/work')
    
    await page.getByRole('link', { name: 'Services' }).click()
    await expect(page).toHaveURL('/services')
    
    await page.getByRole('link', { name: 'About' }).click()
    await expect(page).toHaveURL('/about')
    
    await page.getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL('/contact')
  })

  test('Work page displays projects', async ({ page }) => {
    await page.goto('/work')
    await expect(page.locator('h1')).toContainText('Portfolio')
    
    // Check if at least one project card is visible
    const projectCards = page.locator('article').first()
    await expect(projectCards).toBeVisible()
  })

  test('Contact form is accessible', async ({ page }) => {
    await page.goto('/contact')
    
    // Check form fields are present
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/message/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /send/i })).toBeVisible()
  })

  test('404 page works', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await expect(page.locator('h1')).toContainText('404')
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
  })
})

test.describe('Accessibility', () => {
  test('Skip to main content link is present', async ({ page }) => {
    await page.goto('/')
    
    // Tab to focus skip link
    await page.keyboard.press('Tab')
    const skipLink = page.getByText(/skip to main content/i)
    await expect(skipLink).toBeFocused()
  })

  test('All images have alt text', async ({ page }) => {
    await page.goto('/')
    
    const images = await page.locator('img').all()
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeDefined()
      expect(alt?.length).toBeGreaterThan(0)
    }
  })

  test('Form labels are associated with inputs', async ({ page }) => {
    await page.goto('/contact')
    
    const nameInput = page.getByLabel(/name/i)
    const emailInput = page.getByLabel(/email/i)
    const messageInput = page.getByLabel(/message/i)
    
    await expect(nameInput).toBeVisible()
    await expect(emailInput).toBeVisible()
    await expect(messageInput).toBeVisible()
  })
})

test.describe('SEO', () => {
  test('Homepage has proper meta tags', async ({ page }) => {
    await page.goto('/')
    
    // Check title
    await expect(page).toHaveTitle(/packaging designer/i)
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
    
    // Check canonical link
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', /.+/)
  })

  test('Pages have unique titles', async ({ page }) => {
    const pages = ['/', '/work', '/services', '/about', '/contact']
    const titles = new Set()
    
    for (const path of pages) {
      await page.goto(path)
      const title = await page.title()
      titles.add(title)
    }
    
    expect(titles.size).toBe(pages.length)
  })
})


