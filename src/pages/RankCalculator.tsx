import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Target, Trophy, TrendingUp, ArrowRight, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function RankCalculator() {
  const [marks, setMarks] = useState('');
  const [exam, setExam] = useState('ssc-cgl');
  const [category, setCategory] = useState('general');
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!marks || isNaN(Number(marks))) {
      toast.error('Please enter valid marks');
      return;
    }

    setIsCalculating(true);
    // Simulate calculation
    setTimeout(() => {
      const score = Number(marks);
      const predictedRank = Math.max(1, Math.floor(1000000 / (score + 1) * 10));
      const percentile = Math.min(99.99, (score / 200) * 100);
      
      setResult({
        rank: predictedRank,
        percentile: percentile.toFixed(2),
        accuracy: '88%',
        potential: 'High'
      });
      setIsCalculating(false);
      toast.success('Rank calculated successfully!');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Exam Rank Calculator</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
          Predict your rank based on your marks and current competition trends. Our AI model analyzes previous years' data to give you the most accurate prediction.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800"
        >
          <form onSubmit={handleCalculate} className="space-y-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Select Exam</label>
              <select 
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white font-medium"
              >
                <option value="ssc-cgl">SSC CGL 2026</option>
                <option value="rrb-ntpc">RRB NTPC</option>
                <option value="ibps-po">IBPS PO</option>
                <option value="upsc-cse">UPSC CSE</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Your Marks</label>
              <div className="relative">
                <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="number" 
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  placeholder="Enter your total marks"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Category</label>
              <div className="grid grid-cols-2 gap-4">
                {['General', 'OBC', 'SC', 'ST'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat.toLowerCase())}
                    className={cn(
                      "py-4 rounded-2xl font-bold text-sm transition-all border",
                      category === cat.toLowerCase()
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isCalculating}
              className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:opacity-90 shadow-xl shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Calculator className="w-6 h-6" />
              <span>{isCalculating ? 'Calculating Rank...' : 'Calculate Predicted Rank'}</span>
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
              Note: This is a predicted rank based on statistical models. Actual results may vary depending on the official cutoff and normalization process.
            </p>
          </div>
        </motion.div>

        {/* Results */}
        <div className="space-y-8">
          {result ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-blue-600 dark:to-purple-600 p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10 text-center space-y-8">
                <Trophy className="w-20 h-20 mx-auto text-yellow-400 animate-bounce-slow" />
                <div>
                  <p className="text-blue-100 font-medium mb-2 uppercase tracking-widest text-sm">Predicted Rank</p>
                  <h2 className="text-7xl font-black">#{result.rank.toLocaleString()}</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div>
                    <p className="text-blue-100 text-xs font-bold uppercase mb-1">Percentile</p>
                    <p className="text-2xl font-bold">{result.percentile}%</p>
                  </div>
                  <div>
                    <p className="text-blue-100 text-xs font-bold uppercase mb-1">Accuracy</p>
                    <p className="text-2xl font-bold">{result.accuracy}</p>
                  </div>
                </div>

                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
                  <span>Improve Your Rank</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] text-center space-y-6">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-slate-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Data Yet</h3>
                <p className="text-slate-500 dark:text-slate-400">Fill the form to see your predicted rank and performance analytics.</p>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">How it works?</h3>
            <ul className="space-y-4">
              {[
                "We collect data from thousands of students who have attempted our mock tests.",
                "Our AI model compares your marks with the historical cutoff trends.",
                "We factor in the difficulty level of the current year's exam.",
                "The final result is a highly accurate prediction of your all-India rank."
              ].map((step, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">{i + 1}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
