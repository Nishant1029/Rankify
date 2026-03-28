import { BarChart3, BookOpen, Users, Zap, Shield, Globe } from 'lucide-react';
import { motion } from 'motion/react';

const FEATURES = [
  {
    icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
    title: "Real-time Analytics",
    description: "Get detailed performance reports and identify your weak areas instantly with our AI-driven analytics."
  },
  {
    icon: <BookOpen className="w-6 h-6 text-purple-600" />,
    title: "Expert Content",
    description: "Study material curated by top educators and previous year toppers to ensure you stay ahead."
  },
  {
    icon: <Users className="w-6 h-6 text-pink-600" />,
    title: "Community Support",
    description: "Join a vibrant community of millions of aspirants to discuss doubts and share strategies."
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-600" />,
    title: "Fast Loading",
    description: "Experience lightning-fast test loading and smooth interface even on slow internet connections."
  },
  {
    icon: <Shield className="w-6 h-6 text-green-600" />,
    title: "Secure Platform",
    description: "Your data and progress are always safe with our enterprise-grade security protocols."
  },
  {
    icon: <Globe className="w-6 h-6 text-indigo-600" />,
    title: "Multi-Exam Support",
    description: "From SSC to UPSC, we cover over 100+ different competitive exams across India."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4">Why Choose Us</h2>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Everything you need to <span className="text-blue-600">Ace</span> your exams
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            We provide a comprehensive ecosystem for aspirants to learn, practice, and succeed in their journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-600/10 transition-all group"
            >
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
