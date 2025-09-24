import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export interface StripePrice {
  id: string
  amount: number
  currency: string
  interval?: 'month' | 'year'
  product: {
    name: string
    description: string
  }
}

export interface StripeCustomer {
  id: string
  email: string
  name?: string
}

export class StripeAPI {
  private static readonly STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

  static async createCheckoutSession(priceId: string, customerEmail: string, userId: string) {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          customerEmail,
          userId,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()
      return sessionId
    } catch (error) {
      console.error('Stripe checkout error:', error)
      throw new Error('Failed to create checkout session')
    }
  }

  static async redirectToCheckout(sessionId: string) {
    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({ sessionId })
      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error('Stripe redirect error:', error)
      throw new Error('Failed to redirect to checkout')
    }
  }

  static async createCustomerPortalSession(customerId: string) {
    try {
      const response = await fetch('/api/create-customer-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          returnUrl: `${window.location.origin}/dashboard`
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create customer portal session')
      }

      const { url } = await response.json()
      return url
    } catch (error) {
      console.error('Stripe portal error:', error)
      throw new Error('Failed to create customer portal')
    }
  }

  static async getSubscriptionStatus(customerId: string) {
    try {
      const response = await fetch(`/api/subscription-status?customerId=${customerId}`)
      
      if (!response.ok) {
        throw new Error('Failed to get subscription status')
      }

      const subscription = await response.json()
      return subscription
    } catch (error) {
      console.error('Stripe subscription error:', error)
      throw new Error('Failed to get subscription status')
    }
  }
}
