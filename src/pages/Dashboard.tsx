import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { motion } from 'motion/react';
import { BarChart3, BookOpen, Trophy, Target, Clock, ArrowUpRight, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar, Legend 
} from 'recharts';

interface DashboardProps {
  user: any;
}

export default function Dashboard({ user }: DashboardProps) {
  const [userData, setUserData] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (user) {
        try {
          // Fetch User Profile
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          }

          // Fetch Recent Attempts
          const attemptsRef = collection(db, 'attempts');
          const q = query(
            attemptsRef, 
            where('userId', '==', user.uid),
            orderBy('timestamp', 'desc'),
            limit(10)
          );
          const querySnapshot = await getDocs(q);
          const attemptsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setAttempts(attemptsData);

        } catch (error) {
          handleFirestoreError(error, OperationType.LIST, 'attempts/users');
        }
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Process data for charts
  const performanceData = attempts.slice().reverse().map(attempt => ({
    name: new Date(attempt.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: attempt.score,
    rank: attempt.rank || 0,
  }));

  // Mock data if no attempts yet to show how it looks
  const displayPerformanceData = performanceData.length > 0 ? performanceData : [
    { name: 'Mar 20', score: 65, rank: 120 },
    { name: 'Mar 22', score: 72, rank: 95 },
    { name: 'Mar 23', score: 68, rank: 110 },
    { name: 'Mar 25', score: 85, rank: 45 },
    { name: 'Mar 26', score: 78, rank: 60 },
    { name: 'Mar 27', score: 92, rank: 12 },
    { name: 'Mar 28', score: 88, rank: 25 },
  ];

  const accuracyData = attempts.slice().reverse().map(attempt => ({
    name: new Date(attempt.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    accuracy: attempt.accuracy || Math.floor(Math.random() * 20) + 75, // Fallback for mock
  }));

  const displayAccuracyData = accuracyData.length > 0 ? accuracyData : [
    { name: 'Mar 20', accuracy: 78 },
    { name: 'Mar 22', accuracy: 82 },
    { name: 'Mar 23', accuracy: 80 },
    { name: 'Mar 25', accuracy: 88 },
    { name: 'Mar 26', accuracy: 85 },
    { name: 'Mar 27', accuracy: 92 },
    { name: 'Mar 28', accuracy: 90 },
  ];

  const stats = [
    { label: 'Tests Attempted', value: userData?.stats?.testsAttempted || attempts.length, icon: <BookOpen className="w-5 h-5" />, color: 'bg-blue-500' },
    { label: 'Total Score', value: userData?.stats?.totalScore || attempts.reduce((acc, curr) => acc + curr.score, 0), icon: <Target className="w-5 h-5" />, color: 'bg-purple-500' },
    { label: 'Average Rank', value: userData?.stats?.averageRank || (attempts.length > 0 ? Math.round(attempts.reduce((acc, curr) => acc + (curr.rank || 0), 0) / attempts.length) : 'N/A'), icon: <Trophy className="w-5 h-5" />, color: 'bg-yellow-500' },
    { label: 'Accuracy', value: '88%', icon: <TrendingUp className="w-5 h-5" />, color: 'bg-green-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, {user.displayName}!</h1>
          <p className="text-slate-500 dark:text-slate-400">Your preparation is looking strong. Keep it up!</p>
        </div>
        <Link to="/test-series/ssc-cgl" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
          Take a New Mock Test
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-2xl text-white shadow-lg`}>
                {stat.icon}
              </div>
              <span className="text-green-500 text-xs font-bold flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +12%
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Performance Over Time */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Performance Over Time</h3>
              <p className="text-sm text-slate-500">Score trends for your last 7 tests</p>
            </div>
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayPerformanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#60a5fa' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accuracy Trends */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Accuracy Trends</h3>
              <p className="text-sm text-slate-500">Percentage of correct answers</p>
            </div>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#4ade80' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Attempts List */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Test Attempts</h3>
            <Link to="/history" className="text-sm font-bold text-blue-600 hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-4">Test Name</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Score</th>
                  <th className="pb-4">Rank</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {attempts.length > 0 ? attempts.map((attempt) => (
                  <tr key={attempt.id} className="group">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{attempt.testId.replace(/-/g, ' ').toUpperCase()}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-500">
                      {new Date(attempt.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <span className="font-bold text-slate-900 dark:text-white">{attempt.score}</span>
                    </td>
                    <td className="py-4">
                      <span className="px-2 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 rounded-lg text-xs font-bold">
                        #{attempt.rank || 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                )) : (
                  [1, 2, 3].map((i) => (
                    <tr key={i} className="group opacity-50">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-slate-400" />
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white">Sample Mock Test #{i}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-slate-500">Mar {28-i}, 2026</td>
                      <td className="py-4 font-bold text-slate-900 dark:text-white">{100 - i * 10}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg text-xs font-bold">#{i * 15}</span>
                      </td>
                      <td className="py-4 text-right">
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Study Planner / Goals */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Study Goals</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-600 dark:text-slate-400">Weekly Mock Tests</span>
                <span className="font-bold text-blue-600">3/5</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-600 dark:text-slate-400">Daily Quiz Streak</span>
                <span className="font-bold text-orange-600">12 Days</span>
              </div>
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
            <Calendar className="w-8 h-8 text-blue-600 mb-4" />
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Next Scheduled Test</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">SSC CGL Full Mock #12 is scheduled for tomorrow at 10:00 AM.</p>
            <button className="text-sm font-bold text-blue-600 hover:underline">Set Reminder</button>
          </div>
        </div>
      </div>
    </div>
  );
}
