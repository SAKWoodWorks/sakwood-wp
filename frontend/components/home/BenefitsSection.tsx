import { CheckCircle2, Truck, Shield, Award, Users, HeadphonesIcon } from 'lucide-react';
import type { Locale } from '@/i18n-config';

interface BenefitsSectionProps {
  lang: Locale;
  dictionary: {
    home?: {
      benefits_title?: string;
      benefits_subtitle?: string;
    };
    benefits?: {
      title: string;
      subtitle: string;
      trusted_by: string;
      across_thailand: string;
    };
  };
}

const benefits = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery available for Bangkok and surrounding areas',
    color: 'bg-blue-500'
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'All products meet international quality standards',
    color: 'bg-green-500'
  },
  {
    icon: Award,
    title: 'Best Prices',
    description: 'Direct from factory pricing for contractors and dealers',
    color: 'bg-yellow-500'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Experienced professionals to assist with your projects',
    color: 'bg-purple-500'
  },
  {
    icon: CheckCircle2,
    title: 'Certified Products',
    description: 'ISO certified sustainable wood sources',
    color: 'bg-emerald-500'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Dedicated customer support team ready to help',
    color: 'bg-red-500'
  }
];

export function BenefitsSection({ lang, dictionary }: BenefitsSectionProps) {
  const { home, benefits: benefitsDict } = dictionary;

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-wide">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {benefitsDict?.title || home?.benefits_title || 'The Sakwood Advantage'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {benefitsDict?.subtitle || home?.benefits_subtitle || 'Discover why contractors and furniture makers trust Sakwood for their premium wood supplies'}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200"
              >
                {/* Icon */}
                <div className={`${benefit.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover Effect Line */}
                <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${benefit.color} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 w-full`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-2 border-white">
                98%
              </div>
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold border-2 border-white">
                5★
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold border-2 border-white">
                2K+
              </div>
            </div>
            <div className="text-left">
              <p className="font-bold text-gray-900">{benefitsDict?.trusted_by || 'Trusted by 2000+ Contractors'}</p>
              <p className="text-sm text-gray-600">{benefitsDict?.across_thailand || 'Across Thailand'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
