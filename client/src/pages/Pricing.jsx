import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Crown, Rocket } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    icon: <Zap className="w-8 h-8" />,
    price: '$0',
    period: 'forever',
    description: 'Perfect for occasional users',
    features: [
      'Unlimited downloads',
      'Batch download support',
      'Download history',
      'File preview',
      'Progress tracking',
      'Basic support'
    ],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Pro',
    icon: <Crown className="w-8 h-8" />,
    price: '$9',
    period: 'month',
    description: 'For power users and professionals',
    features: [
      'Everything in Free',
      'Priority download queue',
      'Faster download speeds',
      'Advanced statistics',
      'Email support',
      'API access',
      'Custom download settings'
    ],
    cta: 'Upgrade to Pro',
    popular: true
  },
  {
    name: 'Enterprise',
    icon: <Rocket className="w-8 h-8" />,
    price: 'Custom',
    period: 'contact us',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'Team management',
      'Usage analytics',
      'Custom branding'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
            Choose the plan that works best for you. Start free, upgrade anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`glass-effect rounded-2xl p-8 relative ${
                  plan.popular
                    ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-105'
                    : ''
                } dark:bg-gray-800/80`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period !== 'forever' && plan.period !== 'contact us' && (
                      <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/"
                  className={`w-full block text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <FAQItem
              question="Is the free plan really free forever?"
              answer="Yes! Our free plan includes all core features and will always be free. No credit card required."
            />
            <FAQItem
              question="What's the difference between Free and Pro?"
              answer="Pro users get priority in the download queue, faster speeds, advanced statistics, API access, and email support."
            />
            <FAQItem
              question="Can I cancel my subscription anytime?"
              answer="Absolutely! You can cancel your subscription at any time. No questions asked, no hidden fees."
            />
            <FAQItem
              question="Do you offer refunds?"
              answer="Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund you."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards, PayPal, and bank transfers for Enterprise plans."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center glass-effect rounded-2xl p-12 dark:bg-gray-800/80">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Our team is here to help. Get in touch and we'll answer any questions you have.
          </p>
          <Link
            to="/about"
            className="btn-primary inline-flex items-center gap-2"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ question, answer }) {
  return (
    <div className="glass-effect rounded-xl p-6 dark:bg-gray-800/80">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {question}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {answer}
      </p>
    </div>
  );
}

