import { motion } from 'motion/react';
import { Bell, FileText, Download, CheckCircle, ExternalLink, Calendar, Search, BookOpen, Users, Zap, Layout } from 'lucide-react';
import { useState } from 'react';

const UPDATES = {
  latestJobs: [
    { id: 1, title: "SSC CGL 2026 Online Form", date: "28 Mar 2026", link: "#" },
    { id: 2, title: "UPSC Civil Services Prelims 2026", date: "25 Mar 2026", link: "#" },
    { id: 3, title: "IBPS Clerk Recruitment 2026", date: "22 Mar 2026", link: "#" },
    { id: 4, title: "RRB NTPC Phase II Application", date: "20 Mar 2026", link: "#" },
    { id: 5, title: "SBI PO 2000+ Vacancies", date: "18 Mar 2026", link: "#" },
    { id: 6, title: "UP Police Constable Recruitment", date: "15 Mar 2026", link: "#" },
  ],
  admitCards: [
    { id: 1, title: "SSC CHSL Tier I Admit Card", date: "27 Mar 2026", link: "#" },
    { id: 2, title: "JEE Main Session 2 Admit Card", date: "24 Mar 2026", link: "#" },
    { id: 3, title: "NDA I 2026 Admit Card Out", date: "21 Mar 2026", link: "#" },
    { id: 4, title: "CTET July 2026 Hall Ticket", date: "19 Mar 2026", link: "#" },
    { id: 5, title: "LIC AAO Interview Call Letter", date: "16 Mar 2026", link: "#" },
  ],
  results: [
    { id: 1, title: "SSC GD Constable Final Result", date: "26 Mar 2026", link: "#" },
    { id: 2, title: "IBPS RRB PO Mains Result", date: "23 Mar 2026", link: "#" },
    { id: 3, title: "UGC NET Dec 2025 Result", date: "20 Mar 2026", link: "#" },
    { id: 4, title: "GATE 2026 Score Card", date: "17 Mar 2026", link: "#" },
    { id: 5, title: "CSIR NET Result 2026", date: "14 Mar 2026", link: "#" },
  ]
};

export default function ExamUpdatesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filterUpdates = (list: any[]) => {
    return list.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-6"
          >
            <Bell className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Real-time Exam Notifications</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            Latest Exam <span className="text-blue-600">Updates</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Stay ahead with the most accurate and timely information about government jobs, admit cards, and results.
          </p>
        </div>

        {/* Quick Access Grid (Sarkari Result Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
          {[
            { title: "Latest Jobs", icon: <FileText className="w-5 h-5" />, color: "bg-blue-600", link: "#latest-jobs" },
            { title: "Admit Card", icon: <Download className="w-5 h-5" />, color: "bg-purple-600", link: "#admit-card" },
            { title: "Results", icon: <CheckCircle className="w-5 h-5" />, color: "bg-green-600", link: "#results" },
            { title: "Answer Key", icon: <FileText className="w-5 h-5" />, color: "bg-orange-600", link: "#" },
            { title: "Syllabus", icon: <BookOpen className="w-5 h-5" />, color: "bg-indigo-600", link: "#" },
            { title: "Exam Pattern", icon: <Layout className="w-5 h-5" />, color: "bg-cyan-600", link: "#" },
            { title: "Admission", icon: <Users className="w-5 h-5" />, color: "bg-pink-600", link: "#" },
          ].map((item, idx) => (
            <motion.a
              key={idx}
              href={item.link}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all group"
            >
              <div className={`${item.color} p-3 rounded-xl text-white mb-3 group-hover:scale-110 transition-transform`}>
                {item.color === "bg-indigo-600" ? <BookOpen className="w-5 h-5" /> : item.icon}
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-white text-center">{item.title}</span>
            </motion.a>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for exams, jobs, or results..."
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Latest Jobs */}
          <motion.div
            id="latest-jobs"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="bg-blue-600 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Latest Jobs</h2>
              </div>
              <span className="px-2 py-1 bg-white/20 text-white text-[10px] font-bold rounded uppercase tracking-wider animate-pulse">Live</span>
            </div>
            <div className="p-2">
              {filterUpdates(UPDATES.latestJobs).map((job) => (
                <a
                  key={job.id}
                  href={job.link}
                  className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{job.title}</span>
                    <span className="text-xs text-slate-500 flex items-center mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {job.date}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </a>
              ))}
              {filterUpdates(UPDATES.latestJobs).length === 0 && (
                <p className="p-8 text-center text-slate-500">No jobs found.</p>
              )}
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <button className="text-sm font-bold text-blue-600 hover:underline">View All Jobs</button>
            </div>
          </motion.div>

          {/* Admit Cards */}
          <motion.div
            id="admit-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="bg-purple-600 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Download className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Admit Card</h2>
              </div>
              <span className="px-2 py-1 bg-white/20 text-white text-[10px] font-bold rounded uppercase tracking-wider animate-pulse">New</span>
            </div>
            <div className="p-2">
              {filterUpdates(UPDATES.admitCards).map((card) => (
                <a
                  key={card.id}
                  href={card.link}
                  className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">{card.title}</span>
                    <span className="text-xs text-slate-500 flex items-center mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {card.date}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-purple-600 transition-colors" />
                </a>
              ))}
              {filterUpdates(UPDATES.admitCards).length === 0 && (
                <p className="p-8 text-center text-slate-500">No admit cards found.</p>
              )}
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <button className="text-sm font-bold text-purple-600 hover:underline">View All Admit Cards</button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            id="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="bg-green-600 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">Results</h2>
              </div>
              <Zap className="w-4 h-4 text-white animate-bounce" />
            </div>
            <div className="p-2">
              {filterUpdates(UPDATES.results).map((result) => (
                <a
                  key={result.id}
                  href={result.link}
                  className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white group-hover:text-green-600 transition-colors">{result.title}</span>
                    <span className="text-xs text-slate-500 flex items-center mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {result.date}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-green-600 transition-colors" />
                </a>
              ))}
              {filterUpdates(UPDATES.results).length === 0 && (
                <p className="p-8 text-center text-slate-500">No results found.</p>
              )}
            </div>
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <button className="text-sm font-bold text-green-600 hover:underline">View All Results</button>
            </div>
          </motion.div>
        </div>

        {/* Newsletter / Subscription */}
        <div className="mt-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <h2 className="text-3xl font-bold mb-4 relative z-10">Never Miss an Update</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10">
            Subscribe to our newsletter and get instant notifications about latest jobs and results directly in your inbox.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-blue-200 outline-none focus:bg-white/30 transition-all"
            />
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
