import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useAnimationFrame, PanInfo } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import EventFlyerCard from './EventFlyerCard'
import EventDetailsModal from '../modal/EventDetailsModal'
import type { Event } from '@/types/event'

interface InfiniteEventSliderProps {
  events: Event[]
  speed?: number
}

export function InfiniteEventSlider({ events, speed = 1 }: InfiniteEventSliderProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [pauseAnimation, setPauseAnimation] = useState(false)
  const xTranslation = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const CARD_WIDTH = 300
  const GAP = 20
  const ITEM_WIDTH = CARD_WIDTH + GAP

  // Triple the events for seamless infinite loop
  const repeatedEvents = [...events, ...events, ...events]

  useAnimationFrame((t, delta) => {
    if (pauseAnimation || isDragging) return

    let moveBy = -speed * (delta / 16)
    const currentX = xTranslation.get()
    const newX = currentX + moveBy

    // Reset position when scrolled through one full set
    if (newX <= -(ITEM_WIDTH * events.length)) {
      xTranslation.set(newX + ITEM_WIDTH * events.length)
    } else {
      xTranslation.set(newX)
    }
  })

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)

    // Add momentum to the drag
    const currentX = xTranslation.get()
    const velocity = info.velocity.x
    const newX = currentX + velocity * 0.1

    // Check for reset after drag
    if (newX <= -(ITEM_WIDTH * events.length)) {
      xTranslation.set(newX + ITEM_WIDTH * events.length)
    } else if (newX >= 0) {
      xTranslation.set(newX - ITEM_WIDTH * events.length)
    } else {
      xTranslation.set(newX)
    }
  }

  const handleCardClick = (event: Event) => {
    if (!isDragging) {
      setSelectedEvent(event)
    }
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden py-8"
        onMouseEnter={() => setPauseAnimation(true)}
        onMouseLeave={() => setPauseAnimation(false)}
      >
        <motion.div
          className="flex gap-5"
          style={{
            x: xTranslation,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          drag="x"
          dragConstraints={{ left: -ITEM_WIDTH * events.length, right: 0 }}
          dragElastic={0.1}
          dragTransition={{ power: 0.1, timeConstant: 200 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {repeatedEvents.map((event, index) => (
            <EventFlyerCard
              key={`${event.id}-${index}`}
              event={event}
              onClick={() => handleCardClick(event)}
            />
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailsModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default InfiniteEventSlider
