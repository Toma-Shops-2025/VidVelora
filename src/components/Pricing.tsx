import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$9',
      period: 'month',
      description: 'Perfect for individuals and small creators',
      features: [
        '10 videos per month',
        'HD quality (1080p)',
        'Basic templates',
        'Email support',
        '5 minutes max duration'
      ],
      popular: false,
      buttonText: 'Start Free Trial',
      buttonStyle: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'month',
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
      popular: true,
      buttonText: 'Start Pro Trial',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'month',
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
      popular: false,
      buttonText: 'Contact Sales',
      buttonStyle: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
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
            <div key={index} className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${plan.buttonStyle}`}>
                  {plan.buttonText}
                </button>
              </div>
            </div>
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