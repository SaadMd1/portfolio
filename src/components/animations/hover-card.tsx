'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverCardProps {
  children: ReactNode
  className?: string
}

export function HoverCard({ children, className }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { 
          duration: 0.3,
          ease: [0.21, 0.47, 0.32, 0.98]
        }
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function HoverScale({ children, className }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function HoverGlow({ children, className }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.3 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

