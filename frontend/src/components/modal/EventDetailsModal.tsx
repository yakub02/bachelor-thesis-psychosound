import { motion, PanInfo } from 'framer-motion'
import { X, Calendar, MapPin, Clock, DollarSign, Users } from 'lucide-react'
import { useState } from 'react'
import type { Event } from '@/types/event'

interface EventDetailsModalProps {
  event: Event
  onClose: () => void
}

export function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
    })
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        initial={{ scale: 0.9, opacity: 0, x: 0, y: 0 }}
        animate={{ scale: 1, opacity: 1, x: position.x, y: position.y }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          {/* Event Image */}
          <div className="relative w-full h-64 overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{event.title}</h2>
              <div className="flex flex-wrap gap-2">
                {event.artists.map((artist, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm"
                  >
                    {artist}
                  </span>
                ))}
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-200">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>{event.date}</span>
              </div>

              {event.time && (
                <div className="flex items-center gap-3 text-gray-200">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>{event.time}</span>
                </div>
              )}

              <div className="flex items-center gap-3 text-gray-200">
                <MapPin className="w-5 h-5 text-red-400" />
                <span>{event.location}</span>
              </div>

              {event.ticketPrice && (
                <div className="flex items-center gap-3 text-gray-200">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span>{event.ticketPrice}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                About this event
              </h3>
              <p className="text-gray-300 leading-relaxed">{event.description}</p>
            </div>

            {/* CTA Button */}
            <button className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02]">
              Get Tickets
            </button>
          </div>
        </div>
      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </motion.div>
  )
}

export default EventDetailsModal
