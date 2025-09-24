import React, { useState, useEffect } from 'react'
import { X, Sparkles, TrendingUp, Users } from 'lucide-react'

const NotificationBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentNotification, setCurrentNotification] = useState(0)

  const notifications = [
    {
      icon: Sparkles,
      message: "🎉 New AI voices added! Try our latest premium voices for more natural speech.",
      color: "bg-gradient-to-r from-purple-600 to-blue-600"
    },
    {
      icon: TrendingUp,
      message: "📈 10,000+ videos created this month! Join our growing community.",
      color: "bg-gradient-to-r from-green-600 to-teal-600"
    },
    {
      icon: Users,
      message: "👥 5,000+ creators trust VidVelora for their video content needs.",
      color: "bg-gradient-to-r from-orange-600 to-red-600"
    }
  ]

  useEffect(() => {
    // Show banner after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCurrentNotification((prev) => (prev + 1) % notifications.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isVisible, notifications.length])

  if (!isVisible) return null

  const current = notifications[currentNotification]

  return (
    <div className={`fixed top-16 left-4 right-4 z-40 ${current.color} text-white rounded-lg shadow-lg transform transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <current.icon className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">{current.message}</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default NotificationBanner
