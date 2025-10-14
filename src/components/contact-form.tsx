'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [startTime] = useState(Date.now())
  const { toast } = useToast()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    // Honeypot check
    if (honeypot) {
      console.log('Bot detected')
      setIsSubmitting(false)
      return
    }

    // Time check (bots submit too fast)
    const timeElapsed = Date.now() - startTime
    if (timeElapsed < 3000) {
      console.log('Submitted too fast')
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(event.currentTarget)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          budget: formData.get('budget'),
          timeline: formData.get('timeline'),
          message: formData.get('message'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        toast({
          title: 'Message sent!',
          description: "I'll get back to you within 24 hours.",
        })
        ;(event.target as HTMLFormElement).reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again or email me directly.',
        variant: 'destructive',
      })
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input id="name" name="name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget Range</Label>
        <Select name="budget">
          <SelectTrigger id="budget">
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-1000">Under €1,000</SelectItem>
            <SelectItem value="1000-2500">€1,000 - €2,500</SelectItem>
            <SelectItem value="2500-5000">€2,500 - €5,000</SelectItem>
            <SelectItem value="5000-10000">€5,000 - €10,000</SelectItem>
            <SelectItem value="over-10000">Over €10,000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline">Timeline</Label>
        <Select name="timeline">
          <SelectTrigger id="timeline">
            <SelectValue placeholder="Select timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urgent">ASAP / Urgent</SelectItem>
            <SelectItem value="1-2-months">1-2 months</SelectItem>
            <SelectItem value="2-3-months">2-3 months</SelectItem>
            <SelectItem value="3-plus-months">3+ months</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Project Details <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell me about your project, goals, and any specific requirements..."
          required
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  )
}

