import { motion } from 'framer-motion'
import type { Event } from '@/types/event'

interface EventFlyerCardProps {
  event: Event
  onClick: () => void
}

export function EventFlyerCard({ event, onClick }: EventFlyerCardProps) {
  return (
    <motion.div
      className="relative flex-shrink-0 w-[300px] h-[400px] rounded-xl overflow-hidden cursor-pointer select-none"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
        <h3 className="text-white font-bold text-xl mb-1">{event.title}</h3>
        <p className="text-gray-300 text-sm">{event.date}</p>
        <p className="text-gray-400 text-xs">{event.location}</p>
      </div>
    </motion.div>
  )
}

export default EventFlyerCard
