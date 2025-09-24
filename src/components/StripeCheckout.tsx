import React, { useState } from 'react'
import { CreditCard, Loader2, Check } from 'lucide-react'
import { StripeAPI } from '@/lib/stripeAPI'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/components/ui/use-toast'

interface StripeCheckoutProps {
  priceId: string
  planName: string
  price: string
  features: string[]
  isPopular?: boolean
  onSuccess?: () => void
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  priceId,
  planName,
  price,
  features,
  isPopular = false,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a plan.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const sessionId = await StripeAPI.createCheckoutSession(
        priceId,
        user.email,
        user.id
      )

      await StripeAPI.redirectToCheckout(sessionId)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${isPopular ? 'ring-2 ring-purple-500 scale-105' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
            <Check className="h-4 w-4 mr-1" />
            Most Popular
          </div>
        </div>
      )}
      
      <div className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{planName}</h3>
          <div className="flex items-baseline justify-center mb-2">
            <span className="text-5xl font-bold text-gray-900">{price}</span>
            <span className="text-gray-600 ml-2">/month</span>
          </div>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center ${
            isPopular
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
              : 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="h-5 w-5 mr-2" />
              Subscribe Now
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default StripeCheckout
