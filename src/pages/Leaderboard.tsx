import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Trophy, Medal, Star, TrendingUp, Search, Filter } from 'lucide-react';

export default function Leaderboard() {
  const [rankers, setRankers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('weekly');

  useEffect(() => {
    const fetchRankers = async () => {
      // In a real app, we'd query the attempts or a specific leaderboard collection
      // For now, we'll simulate some data
      const mockRankers = [
        { id: 1, name: 'Rahul Sharma', score: 192.5, rank: 1, percentile: 99.99, avatar: 'https://i.pravatar.cc/150?u=1' },
        { id: 2, name: 'Priya Singh', score: 188.0, rank: 2, percentile: 99.95, avatar: 'https://i.pravatar.cc/150?u=2' },
        { id: 3, name: 'Amit Patel', score: 185.5, rank: 3, percentile: 99.92, avatar: 'https://i.pravatar.cc/150?u=3' },
        { id: 4, name: 'Sneha Gupta', score: 182.0, rank: 4, percentile: 99.88, avatar: 'https://i.pravatar.cc/150?u=4' },
        { id: 5, name: 'Vikram Aditya', score: 179.5, rank: 5, percentile: 99.85, avatar: 'https://i.pravatar.cc/150?u=5' },
        { id: 6, name: 'Anjali Verma', score: 177.0, rank: 6, percentile: 99.82, avatar: 'https://i.pravatar.cc/150?u=6' },
        { id: 7, name: 'Deepak Kumar', score: 175.5, rank: 7, percentile: 99.78, avatar: 'https://i.pravatar.cc/150?u=7' },
        { id: 8, name: 'Kavita Reddy', score: 173.0, rank: 8, percentile: 99.75, avatar: 'https://i.pravatar.cc/150?u=8' },
      ];
      setRankers(mockRankers);
      setLoading(false);
    };
    fetchRankers();
  }, [timeframe]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-8 md:space-y-0">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Global Leaderboard</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Celebrating the top performers of Rankify. Compete with millions of students and see where you stand.
          </p>
        </div>
        
        <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          {['Daily', 'Weekly', 'Monthly', 'All Time'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t.toLowerCase())}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                timeframe === t.toLowerCase()
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-end">
        {/* Rank 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="order-2 md:order-1 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 text-center relative"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900">
            <Medal className="w-6 h-6 text-slate-500" />
          </div>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full p-1 bg-gradient-to-br from-slate-200 to-slate-400">
            <img src={rankers[1]?.avatar} alt="" className="w-full h-full rounded-full border-4 border-white dark:border-slate-900" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{rankers[1]?.name}</h3>
          <p className="text-blue-600 font-bold mb-4">{rankers[1]?.score} pts</p>
          <div className="bg-slate-50 dark:bg-slate-800 py-2 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest">Rank #2</div>
        </motion.div>

        {/* Rank 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="order-1 md:order-2 bg-gradient-to-br from-blue-600 to-purple-600 p-10 rounded-[3rem] shadow-2xl text-white text-center relative scale-110 z-10"
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 animate-bounce-slow">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div className="w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-white/20">
            <img src={rankers[0]?.avatar} alt="" className="w-full h-full rounded-full border-4 border-white" />
          </div>
          <h3 className="text-2xl font-bold mb-1">{rankers[0]?.name}</h3>
          <p className="text-blue-100 font-bold mb-6">{rankers[0]?.score} pts</p>
          <div className="bg-white/20 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest">Global Rank #1</div>
        </motion.div>

        {/* Rank 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="order-3 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 text-center relative"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900">
            <Medal className="w-6 h-6 text-orange-600" />
          </div>
          <div className="w-24 h-24 mx-auto mb-6 rounded-full p-1 bg-gradient-to-br from-orange-300 to-orange-500">
            <img src={rankers[2]?.avatar} alt="" className="w-full h-full rounded-full border-4 border-white dark:border-slate-900" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{rankers[2]?.name}</h3>
          <p className="text-blue-600 font-bold mb-4">{rankers[2]?.score} pts</p>
          <div className="bg-slate-50 dark:bg-slate-800 py-2 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest">Rank #3</div>
        </motion.div>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Top Performers</h3>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search student..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-8 py-4">Rank</th>
                <th className="px-8 py-4">Student</th>
                <th className="px-8 py-4">Score</th>
                <th className="px-8 py-4">Percentile</th>
                <th className="px-8 py-4">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rankers.slice(3).map((ranker, i) => (
                <tr key={ranker.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-bold text-slate-900 dark:text-white">#{ranker.rank}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <img src={ranker.avatar} alt="" className="w-10 h-10 rounded-full" />
                      <span className="font-bold text-slate-900 dark:text-white">{ranker.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-bold text-blue-600">{ranker.score}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{ranker.percentile}%ile</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center text-green-500 space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-bold">Up</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
