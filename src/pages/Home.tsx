import Hero from '../components/Hero';
import Features from '../components/Features';
import { motion } from 'motion/react';
import { Book, FileText, Layout, Trophy, Calculator, Star, ArrowRight, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const MAIN_SECTIONS = [
  { icon: <Book className="w-6 h-6" />, title: "Daily Current Affairs", color: "bg-blue-500" },
  { icon: <FileText className="w-6 h-6" />, title: "Monthly Current Affairs", color: "bg-purple-500" },
  { icon: <Layout className="w-6 h-6" />, title: "E-books & PDF", color: "bg-pink-500" },
  { icon: <FileText className="w-6 h-6" />, title: "Previous Year Papers", color: "bg-orange-500" },
  { icon: <Star className="w-6 h-6" />, title: "Daily Quiz", color: "bg-yellow-500" },
  { icon: <Zap className="w-6 h-6" />, title: "Live Test Section", color: "bg-red-500" },
];

const POPULAR_TESTS = [
  { title: "SSC CGL 2026", totalTests: 450, users: "1.2M", rating: 4.8 },
  { title: "RRB NTPC", totalTests: 320, users: "850K", rating: 4.7 },
  { title: "IBPS PO", totalTests: 280, users: "600K", rating: 4.9 },
  { title: "UP Police SI", totalTests: 150, users: "450K", rating: 4.6 },
];

const TESTIMONIALS = [
  {
    name: "Ankit",
    rating: 5,
    text: "Nice Application Sir all functionality is good"
  },
  {
    name: "Pradeep Kannaujiya",
    rating: 5,
    text: "very nice application sir"
  },
  {
    name: "Deepak yadav",
    rating: 5,
    text: "The mock tests are exactly like the real exam. Helped me improve my speed significantly!"
  }
];

export default function Home() {
  return (
    <div className="space-y-0">
      <Hero />
      
      {/* Main Content Sections Grid */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {MAIN_SECTIONS.map((section, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center space-y-4 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className={`${section.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                  {section.icon}
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{section.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Test Series */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Popular Test Series</h2>
              <p className="text-slate-600 dark:text-slate-400">Join millions of students practicing these trending exams</p>
            </div>
            <Link to="/test-series" className="text-blue-600 font-semibold flex items-center hover:underline">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_TESTS.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{test.title}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <FileText className="w-4 h-4 mr-2 text-blue-500" />
                    {test.totalTests}+ Total Tests
                  </div>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
                    {test.rating} Rating
                  </div>
                </div>
                <Link 
                  to={`/test-series/${test.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block w-full py-3 text-center bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Explore Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us (Features) */}
      <Features />

      {/* Leaderboard Preview */}
      <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                Compete with the <span className="text-blue-600">Best Minds</span> Across India
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Track your progress, compare your scores with top rankers, and climb the global leaderboard. Real-time ranking system to keep you motivated.
              </p>
              <div className="flex items-center space-x-4">
                <Link to="/leaderboard" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                  View Leaderboard
                </Link>
                <Link to="/rank-calculator" className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  Predict My Rank
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                      <div className="flex items-center space-x-4">
                        <span className={`text-xl font-bold ${i === 1 ? 'text-yellow-500' : i === 2 ? 'text-slate-400' : 'text-orange-400'}`}>#{i}</span>
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        <span className="font-semibold text-slate-900 dark:text-white">Student {i}</span>
                      </div>
                      <span className="text-blue-600 font-bold">98.{10-i}%</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">What Our Students Say</h2>
            <p className="text-slate-600 dark:text-slate-400">Join thousands of successful aspirants who achieved their dreams with Rankify</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                    {testimonial.name[0]}
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">{testimonial.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/20">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Ready to Start Your Success Journey?</h2>
              <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                Join 5M+ students who are already learning and growing with Rankify. Your dream rank is just a click away.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup" className="px-10 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all">
                  Get Started for Free
                </Link>
                <Link to="/login" className="px-10 py-4 bg-blue-700 text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-all border border-blue-500">
                  Sign In
                </Link>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
