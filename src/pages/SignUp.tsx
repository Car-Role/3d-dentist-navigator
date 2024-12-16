import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'Perfect for dental practices just getting started with 3D printing',
    features: [
      'Basic 3D printing guides',
      'Standard support',
      'Community access',
      '5 design templates',
      'Email support'
    ],
    buttonText: 'Start Free Trial',
    highlighted: false
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/month',
    description: 'Ideal for established practices with regular 3D printing needs',
    features: [
      'Advanced printing guides',
      'Priority support',
      'Private community access',
      '20 design templates',
      'Phone & email support',
      'Custom workflow setup',
      'Monthly consultation'
    ],
    buttonText: 'Get Started',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: '/month',
    description: 'For dental labs and multi-location practices',
    features: [
      'Full access to all guides',
      'Dedicated support team',
      'Private training sessions',
      'Unlimited templates',
      '24/7 priority support',
      'Custom workflow setup',
      'Weekly consultations',
      'Multi-user access'
    ],
    buttonText: 'Contact Sales',
    highlighted: false
  }
];

const SignUp = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your dental practice's 3D printing needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.name}
              className={`relative p-8 flex flex-col ${
                tier.highlighted 
                  ? 'border-2 border-primary shadow-lg' 
                  : 'border border-gray-200'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-primary">{tier.price}</span>
                  <span className="text-gray-500 ml-1">{tier.period}</span>
                </div>
                <p className="mt-4 text-gray-600">{tier.description}</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full mt-auto ${
                  tier.highlighted 
                    ? 'bg-primary hover:bg-primary-dark text-white' 
                    : 'bg-white text-primary border-2 border-primary hover:bg-gray-50'
                }`}
              >
                {tier.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default SignUp; 