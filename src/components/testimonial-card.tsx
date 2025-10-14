import { Card, CardContent } from '@/components/ui/card'
import { Testimonial } from '@/types'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  testimonial: Testimonial
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-5 w-5',
                i < testimonial.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              )}
            />
          ))}
        </div>
        <Quote className="h-8 w-8 text-primary/20 mb-4" />
        <blockquote className="text-base mb-6 italic">
          &quot;{testimonial.quote}&quot;
        </blockquote>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="font-semibold">{testimonial.clientName}</div>
            <div className="text-sm text-muted-foreground">
              {testimonial.role} at {testimonial.company}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


