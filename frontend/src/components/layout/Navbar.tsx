import { useState, useEffect } from 'react'
import PillNav from '@/components/ui/PillNav'
import psychosound_logo from '@/assets/psychosound_logo.svg'
/**
 * Navigation items
 */
const NAV_ITEMS = [
  { label: 'Artists', href: '#artists' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Tickets', href: '#tickets' },
  { label: 'Releases', href: '#releases' },
]

/**
 * PSYCHOSOUND Navbar using PillNav component
 * 
 * Features:
 * - GSAP-powered pill hover animations
 * - Active section tracking on scroll
 * - Responsive mobile hamburger menu
 * - Cyber/hacker aesthetic with neon green
 */
interface NavbarProps {
  className?: string
}

export function Navbar({ className = '' }: NavbarProps) {
  const [activeHref, setActiveHref] = useState<string>('')

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.href.replace('#', ''))
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveHref(`#${sectionId}`)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMobileMenuClick = () => {
    // Optional: analytics, close other overlays, etc.
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center ${className}`}>
      <PillNav
        logo={psychosound_logo}
        logoAlt="PSYCHOSOUND"
        items={NAV_ITEMS}
        activeHref={activeHref}
        
        // Cyber/Hacker color scheme
        baseColor="#d4d4d4"            // Neon green - logo bg & hover circles
        pillColor="#0a0a0a"            // Near-black - pill backgrounds
        hoveredPillTextColor="#0a0a0a" // Neon green - text on hover
        pillTextColor="#d4d4d4"        // Light gray - default text
        
        // Animation
        initialLoadAnimation={true}
        ease="power3.out"
        
        onMobileMenuClick={handleMobileMenuClick}
      />
    </div>
  )
}

export default Navbar