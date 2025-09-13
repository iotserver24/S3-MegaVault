'use client';

import React, { useRef, Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { 
  CloudArrowUpIcon, 
  LockClosedIcon, 
  ArrowPathIcon, 
  ShareIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { useMediaQuery } from 'react-responsive';

// Dynamically import the 3D scene component with no SSR
const Scene3D = dynamic(() => import('../components/Scene3D'), {
  ssr: false,
});

// Import mobile scroll effect component
const MobileScrollEffect = dynamic(() => import('../components/MobileScrollEffect'), {
  ssr: false,
});

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <motion.section
      ref={ref}
      className={`min-h-screen flex items-center justify-center relative ${className}`}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.section>
  );
};

interface Feature {
  name: string;
  description: string;
  icon: React.ElementType;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  shouldReduceMotion: boolean;
}

const features: Feature[] = [
  {
    name: 'Secure File Storage',
    description: 'Enterprise-grade encryption and advanced access controls.',
    icon: LockClosedIcon,
  },
  {
    name: 'Easy Sharing',
    description: 'Customizable permissions and secure links.',
    icon: ShareIcon,
  },
  {
    name: 'Real-time Sync',
    description: 'Instant synchronization across all devices.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Storage Analytics',
    description: 'Detailed storage usage insights.',
    icon: ChartBarIcon,
  },
  {
    name: 'Cloud Backup',
    description: 'Automatic cloud backup and recovery.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Advanced Security',
    description: 'Industry-leading security standards.',
    icon: ShieldCheckIcon,
  },
];

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index, shouldReduceMotion }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch by handling mobile classes after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ 
        duration: shouldReduceMotion ? 0.5 : 0.8, 
        delay: isMobile ? index * 0.1 : index * 0.2  // Faster sequential reveal on mobile
      }}
      className={`group relative p-8 bg-transparent rounded-2xl overflow-hidden ${mounted && isMobile ? 'touch-interactive' : ''}`}
      whileHover={!shouldReduceMotion && !isMobile ? { scale: 1.05 } : {}}
      whileTap={!shouldReduceMotion && isMobile ? { scale: 0.98 } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-2xl backdrop-blur-sm" />
      <div className={`relative z-10 ${mounted && isMobile ? 'scroll-reveal' : ''}`}>
        <feature.icon className={`h-12 w-12 text-blue-400 mb-4 ${mounted && isMobile ? 'animate-pulse-mobile' : ''}`} />
        <h3 className="text-2xl font-semibold text-white mb-3">{feature.name}</h3>
        <p className="text-lg text-gray-200">{feature.description}</p>
      </div>
    </motion.div>
  );
};

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
}

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  shouldReduceMotion: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '$9.99',
    period: '/month',
    features: [
      '100GB Storage',
      'Up to 5 team members',
      'Basic security features',
      'Email support'
    ]
  },
  {
    name: 'Pro',
    price: '$24.99',
    period: '/month',
    features: [
      '1TB Storage',
      'Up to 15 team members',
      'Advanced security',
      '24/7 priority support',
      'API access',
      'Custom branding'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '/month',
    features: [
      'Unlimited storage',
      'Unlimited team members',
      'Enterprise security',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee'
    ]
  }
];

const PricingCard = ({ plan, index, shouldReduceMotion }: PricingCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch by handling mobile classes after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: shouldReduceMotion ? 0.5 : 0.8, 
        delay: isMobile ? index * 0.1 : index * 0.2  // Faster reveal on mobile
      }}
      className={`relative p-8 backdrop-blur-md bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl overflow-hidden transition-transform duration-300 border border-white/5 ${mounted && isMobile ? 'touch-interactive' : mounted && !isMobile ? 'hover:scale-105' : ''}`}
      whileTap={isMobile ? { scale: 0.97 } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
        <div className="flex items-baseline mb-6">
          <span className="text-4xl font-bold text-white">{plan.price}</span>
          <span className="text-gray-300 ml-2">{plan.period}</span>
        </div>
        <ul className="space-y-4">
          {plan.features.map((feature, i) => (
            <li key={i} className={`flex items-center text-gray-300 ${mounted && isMobile ? `reveal-up` : ''}`} style={mounted && isMobile ? { animationDelay: `${i * 0.1}s` } : {}}>
              <CheckIcon className={`h-5 w-5 text-blue-400 mr-3 ${mounted && isMobile ? 'animate-pulse-mobile' : ''}`} />
              {feature}
            </li>
          ))}
        </ul>
        <motion.button 
          className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          whileHover={!shouldReduceMotion && !isMobile ? { scale: 1.05 } : {}}
          whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
        >
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
};

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

const PricingSection: React.FC<{ router: any }> = ({ router }) => (
  <section className="relative py-20 overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Plan</h2>
        <p className="text-xl text-white/70">Secure, scalable storage for every need</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Base Plan */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all">
          <h3 className="text-2xl font-bold text-white">Base Plan</h3>
          <div className="mt-4">
            <span className="text-4xl font-bold text-white">₹35</span>
            <span className="text-white/70">/month</span>
          </div>
          <div className="mt-2 text-white/70">
            10 GB Storage
            <div className="text-xs text-white/50">~$0.44/month</div>
          </div>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center text-white/70">
              10 GB included storage
            </li>
            <li className="flex items-center text-white/70">
              ₹3.5/GB for additional storage
            </li>
            <li className="flex items-center text-white/70">
              Unlimited operations
            </li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/50 hover:border-blue-500/70 transition-all transform scale-105">
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-sm px-3 py-1 rounded-bl-lg rounded-tr-lg">
            Popular
          </div>
          <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
          <div className="mt-4">
            <span className="text-4xl font-bold text-white">₹325</span>
            <span className="text-white/70">/month</span>
          </div>
          <div className="mt-2 text-white/70">
            100 GB Storage
            <div className="text-xs text-white/50">~$4.09/month</div>
          </div>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center text-white/70">
              100 GB storage included
            </li>
            <li className="flex items-center text-white/70">
              ₹3.5/GB for additional storage
            </li>
            <li className="flex items-center text-white/70">
              Priority support
            </li>
          </ul>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all">
          <div className="absolute top-0 right-0 bg-green-500 text-white text-sm px-3 py-1 rounded-bl-lg rounded-tr-lg">
            32% Off
          </div>
          <h3 className="text-2xl font-bold text-white">Enterprise Plan</h3>
          <div className="mt-4">
            <span className="text-4xl font-bold text-white">₹1050</span>
            <span className="text-white/70">/month</span>
            <div className="mt-1 text-sm text-white/50 line-through">₹3328</div>
          </div>
          <div className="mt-2 text-white/70">
            1 TB Storage
            <div className="text-xs text-white/50">~$13.23/month</div>
          </div>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center text-white/70">
              1 TB (1024 GB) storage
            </li>
            <li className="flex items-center text-white/70">
              Dedicated support
            </li>
            <li className="flex items-center text-white/70">
              Custom domain support
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-12 text-white/60">
        <p>All plans include unlimited operations and zero egress fees</p>
        <p className="mt-8 text-gray-400">Contact admin for account setup</p>
      </div>
    </div>
  </section>
);

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Mobile detection
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isLowPerfDevice = useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });
  
  // Disable animations for low-performance devices
  const shouldReduceMotion = isLowPerfDevice;

  return (
    <div ref={containerRef} className="relative bg-black text-white">
      {/* Always show Scene3D but let the component handle mobile optimizations */}
      <Scene3D />
      <ScrollProgress />
      
      {/* Add the mobile scroll effect component */}
      <MobileScrollEffect />

      {/* Hero Section */}
      <Section className="pt-20">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {shouldReduceMotion ? (
            // Static background for low-perf devices
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20" />
          ) : null}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 1, delay: 0.5 }}
            className="text-6xl sm:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            MegaVault
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 1 : 1, delay: 0.7 }}
            className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto"
          >
            Secure cloud storage for the future. Keep your data safe, accessible, and organized.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 1 : 1, delay: 0.9 }}
            className="mt-10 flex justify-center space-x-4"
          >
            {session ? (
              <button
                onClick={() => router.push('/dashboard')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                onClick={() => router.push('/auth/login')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Log In
              </button>
            )}
          </motion.div>
        </div>
      </Section>

      {/* Features Section with mobile-optimized animations */}
      <Section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <FeatureCard 
                key={feature.name} 
                feature={feature} 
                index={index}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Mobile-optimized scroll animations for pricing section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-10%" }}
      >
        <PricingSection router={router} />
      </motion.div>

      {/* Request Demo Section with simplified animations for mobile */}
      <Section className="relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.5 : 1 }}
            className="p-12 glass rounded-3xl"
          >
            <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Contact your administrator to get access to MegaVault's powerful cloud storage solution.
            </p>
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              onClick={() => router.push('/')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              Login
            </motion.button>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default LandingPage;

// Add these styles to your globals.css
// @keyframes gradient {
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// }
// .animate-gradient {
//   background-size: 400% 400%;
//   animation: gradient 8s ease infinite;
// } 