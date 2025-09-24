import React, { useState, useEffect } from 'react'
import { Users, Video, Clock, TrendingUp } from 'lucide-react'

interface Stat {
  icon: React.ComponentType<any>
  label: string
  value: number
  suffix: string
  color: string
}

const LiveStats: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    {
      icon: Users,
      label: "Active Users",
      value: 0,
      suffix: "+",
      color: "text-blue-600"
    },
    {
      icon: Video,
      label: "Videos Created",
      value: 0,
      suffix: "+",
      color: "text-purple-600"
    },
    {
      icon: Clock,
      label: "Hours Saved",
      value: 0,
      suffix: "+",
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      label: "Satisfaction Rate",
      value: 0,
      suffix: "%",
      color: "text-orange-600"
    }
  ])

  const targetStats = [
    { value: 12500, suffix: "+" },
    { value: 45000, suffix: "+" },
    { value: 2500, suffix: "+" },
    { value: 98, suffix: "%" }
  ]

  useEffect(() => {
    const animateStats = () => {
      setStats(prevStats => 
        prevStats.map((stat, index) => {
          const target = targetStats[index]
          const increment = target.value / 100
          const newValue = Math.min(stat.value + increment, target.value)
          
          return {
            ...stat,
            value: Math.floor(newValue)
          }
        })
      )
    }

    const interval = setInterval(animateStats, 50)
    
    // Stop animation after 3 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            VidVelora by the Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time statistics showing our platform's impact and growth
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value.toLocaleString()}
                  <span className="text-2xl text-gray-600">{stat.suffix}</span>
                </div>
                
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Live indicator */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live Statistics</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LiveStats
