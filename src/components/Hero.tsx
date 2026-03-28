import { motion } from 'motion/react';
import { ArrowRight, Play, CheckCircle, Bell, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        
        {/* Subtle India Map Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <svg viewBox="0 0 800 900" className="w-full h-full max-w-4xl fill-slate-900 dark:fill-white">
            <path d="M410,50 L420,60 L440,55 L460,80 L480,100 L470,140 L490,180 L460,220 L480,260 L440,300 L400,360 L360,300 L320,260 L340,220 L310,180 L330,140 L320,100 L340,80 L360,55 L380,60 Z" transform="scale(1.8) translate(50, 50)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">New: SSC CGL 2026 Mock Tests Live</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Master Your Exams with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Confidence</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              Access thousands of high-quality mock tests, real-time analytics, and expert content designed to boost your rank.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all active:scale-95 group">
                <span>Start Learning Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/exam-updates" className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-blue-600 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all active:scale-95 shadow-lg shadow-blue-600/10">
                <Bell className="w-5 h-5 text-blue-600 animate-ring" />
                <span>Exam Updates</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4 pt-2">
              <Link to="/pricing" className="text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center space-x-1 transition-colors">
                <Play className="w-4 h-4" />
                <span>View Pricing Plans</span>
              </Link>
              <span className="text-slate-300">|</span>
              <Link to="/test-series/ssc-cgl" className="text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center space-x-1 transition-colors">
                <CheckCircle className="w-4 h-4" />
                <span>Free Mock Tests</span>
              </Link>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">10k+ Mock Tests</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Real-time Analytics</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-2xl border border-slate-300 dark:border-slate-800">
              <img 
                src="https://picsum.photos/seed/edtech/800/600" 
                alt="Dashboard Preview" 
                className="rounded-2xl w-full h-auto shadow-inner"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-bounce-slow">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">98%</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Success Rate</p>
                    <p className="text-[10px] text-slate-500">Top Rankers Choice</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-bounce-slow delay-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">24/7</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Expert Support</p>
                    <p className="text-[10px] text-slate-500">Always here to help</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
