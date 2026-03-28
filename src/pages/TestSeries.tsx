import { useParams, Link } from 'react-router-dom';
import { EXAM_CATEGORIES } from '../constants/exams';
import { Book, Star, Users, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function TestSeries() {
  const { examId } = useParams();
  const examName = examId?.replace(/-/g, ' ').toUpperCase();

  // Mock data for tests in this series
  const tests = [
    { id: 1, title: `${examName} Full Mock Test #1`, questions: 100, marks: 200, time: 120, rating: 4.8, attempts: '12k' },
    { id: 2, title: `${examName} Full Mock Test #2`, questions: 100, marks: 200, time: 120, rating: 4.7, attempts: '8k' },
    { id: 3, title: `${examName} Sectional: Quantitative Aptitude`, questions: 25, marks: 50, time: 30, rating: 4.9, attempts: '25k' },
    { id: 4, title: `${examName} Sectional: English Language`, questions: 25, marks: 50, time: 30, rating: 4.6, attempts: '18k' },
    { id: 5, title: `${examName} Previous Year Paper 2025`, questions: 100, marks: 200, time: 120, rating: 4.9, attempts: '50k' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-2 text-sm text-slate-500 mb-8">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/test-series" className="hover:text-blue-600">Test Series</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 dark:text-white font-bold">{examName}</span>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-12 rounded-[2.5rem] text-white mb-16 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{examName} Test Series 2026</h1>
          <div className="flex flex-wrap gap-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <Book className="w-5 h-5" />
              <span className="font-medium">450+ Total Tests</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span className="font-medium">1.2M+ Aspirants</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">4.8/5 Rating</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Available Mock Tests</h2>
          {tests.map((test, idx) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 transition-all flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{test.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span>{test.questions} Questions</span>
                    <span>•</span>
                    <span>{test.marks} Marks</span>
                    <span>•</span>
                    <span>{test.time} Mins</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6 w-full md:w-auto">
                <div className="text-center md:text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">Attempts</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{test.attempts}</p>
                </div>
                <Link 
                  to={`/mock-test/${test.id}`}
                  className="flex-1 md:flex-none px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-center"
                >
                  Start Test
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Exam Schedule</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-xs">OCT</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Tier 1 Exam</p>
                  <p className="text-xs text-slate-500">Oct 15 - Oct 25, 2026</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 opacity-50">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-400 font-bold text-xs">JAN</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Tier 2 Exam</p>
                  <p className="text-xs text-slate-500">Jan 10, 2027</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-[2rem] text-white">
            <h3 className="text-xl font-bold mb-4">Unlock All Tests</h3>
            <p className="text-purple-100 text-sm mb-6 leading-relaxed">Get unlimited access to 10,000+ mock tests for all exams with Rankify Pro.</p>
            <button className="w-full py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileText(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}
