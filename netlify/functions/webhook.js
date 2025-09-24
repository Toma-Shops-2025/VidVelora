const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async (event, context) => {
  const sig = event.headers['stripe-signature']
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  let stripeEvent

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid signature' })
    }
  }

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(stripeEvent.data.object)
        break
      
      case 'customer.subscription.created':
        await handleSubscriptionCreated(stripeEvent.data.object)
        break
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(stripeEvent.data.object)
        break
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(stripeEvent.data.object)
        break
      
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(stripeEvent.data.object)
        break
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(stripeEvent.data.object)
        break
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    }
  } catch (error) {
    console.error('Webhook handler error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook handler failed' })
    }
  }
}

async function handleCheckoutCompleted(session) {
  const userId = session.metadata.userId
  const customerId = session.customer

  // Update user with customer ID
  await supabase
    .from('users')
    .update({ stripe_customer_id: customerId })
    .eq('id', userId)
}

async function handleSubscriptionCreated(subscription) {
  const customerId = subscription.customer
  
  // Get user by customer ID
  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (user) {
    // Create subscription record
    await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        plan: getPlanFromPriceId(subscription.items.data[0].price.id),
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
      })
  }
}

async function handleSubscriptionUpdated(subscription) {
  await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
    })
    .eq('stripe_subscription_id', subscription.id)
}

async function handleSubscriptionDeleted(subscription) {
  await supabase
    .from('subscriptions')
    .update({ status: 'cancelled' })
    .eq('stripe_subscription_id', subscription.id)
}

async function handlePaymentSucceeded(invoice) {
  // Handle successful payment
  console.log('Payment succeeded:', invoice.id)
}

async function handlePaymentFailed(invoice) {
  // Handle failed payment
  console.log('Payment failed:', invoice.id)
}

function getPlanFromPriceId(priceId) {
  // Map your Stripe price IDs to plan names
  const priceMap = {
    'price_starter': 'starter',
    'price_pro': 'pro',
    'price_enterprise': 'enterprise'
  }
  return priceMap[priceId] || 'starter'
}
