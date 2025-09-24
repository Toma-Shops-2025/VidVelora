import React from 'react';
import { Check, Star, Zap } from 'lucide-react';
import StripeCheckout from './StripeCheckout';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$9',
      priceId: 'price_starter', // Replace with your actual Stripe price ID
      description: 'Perfect for individuals and small creators',
      features: [
        '10 videos per month',
        'HD quality (1080p)',
        'Basic templates',
        'Email support',
        '5 minutes max duration'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      priceId: 'price_pro', // Replace with your actual Stripe price ID
      description: 'Best for content creators and small businesses',
      features: [
        '50 videos per month',
        '4K quality available',
        'All premium templates',
        'Priority support',
        '15 minutes max duration',
        'Custom branding',
        'Advanced AI voices'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      priceId: 'price_enterprise', // Replace with your actual Stripe price ID
      description: 'For teams and large organizations',
      features: [
        'Unlimited videos',
        '4K quality',
        'Custom templates',
        'White-label solution',
        '24/7 phone support',
        'Team collaboration',
        'API access',
        'Advanced analytics'
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your video creation needs. All plans include our core AI technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <StripeCheckout
              key={index}
              priceId={plan.priceId}
              planName={plan.name}
              price={plan.price}
              features={plan.features}
              isPopular={plan.popular}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-purple-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">All Plans Include</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-gray-700">AI Voices</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-gray-700">Templates</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-700">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;