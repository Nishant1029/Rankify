import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  CheckCircle2, 
  AlertCircle, 
  Layout, 
  PenTool, 
  X,
  Menu,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { toast } from 'sonner';
import Scratchpad from '../components/Scratchpad';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export default function MockTest() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock questions
  const questions: Question[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    text: `Sample Question ${i + 1}: What is the value of X in the equation 2x + 5 = 15?`,
    options: ['5', '10', '15', '20'],
    correctAnswer: 0,
    category: 'Quantitative Aptitude'
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestionIndex]: optionIndex });
  };

  const toggleMarkForReview = () => {
    const newMarked = new Set(markedForReview);
    if (newMarked.has(currentQuestionIndex)) {
      newMarked.delete(currentQuestionIndex);
    } else {
      newMarked.add(currentQuestionIndex);
    }
    setMarkedForReview(newMarked);
  };

  const handleSubmit = () => {
    toast.success('Test submitted successfully!');
    navigate('/dashboard');
  };

  const currentQuestion = questions[currentQuestionIndex];

  const getQuestionStatus = (index: number) => {
    if (markedForReview.has(index)) return 'marked';
    if (answers[index] !== undefined) return 'answered';
    if (index === currentQuestionIndex) return 'current';
    return 'not-visited';
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col ${isFullscreen ? 'fixed inset-0 z-[100]' : ''}`}>
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Layout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">Mock Test #{testId}</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{currentQuestion.category}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl">
            <Clock className={`w-5 h-5 ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`} />
            <span className={`font-mono font-bold text-lg ${timeLeft < 300 ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsScratchpadOpen(!isScratchpadOpen)}
              className={`p-2 rounded-xl transition-all ${isScratchpadOpen ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              title="Toggle Scratchpad"
            >
              <PenTool className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
            >
              Submit
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="px-4 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>+2.0 Marks</span>
                  <AlertCircle className="w-4 h-4 text-red-500 ml-2" />
                  <span>-0.5 Marks</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-12 leading-relaxed">
                {currentQuestion.text}
              </h2>

              <div className="space-y-4">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full p-6 rounded-2xl text-left transition-all border-2 flex items-center space-x-4 group ${
                      answers[currentQuestionIndex] === idx
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-600 dark:border-blue-500'
                        : 'bg-slate-50 dark:bg-slate-800 border-transparent hover:border-slate-200 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-all ${
                      answers[currentQuestionIndex] === idx
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className={`font-medium ${
                      answers[currentQuestionIndex] === idx
                        ? 'text-blue-900 dark:text-blue-100'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center space-x-2 px-6 py-3 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-xl font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={toggleMarkForReview}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all border ${
                    markedForReview.has(currentQuestionIndex)
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 border-purple-600'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Flag className={`w-5 h-5 ${markedForReview.has(currentQuestionIndex) ? 'fill-purple-600' : ''}`} />
                  <span>{markedForReview.has(currentQuestionIndex) ? 'Marked' : 'Mark for Review'}</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setAnswers({ ...answers, [currentQuestionIndex]: undefined })}
                  className="px-6 py-3 text-slate-500 font-bold hover:text-red-500 transition-colors"
                >
                  Clear Response
                </button>
                <button
                  onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                >
                  <span>Save & Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className={`bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-80' : 'w-0 overflow-hidden'}`}>
          <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Question Palette</h3>
            <div className="grid grid-cols-5 gap-3">
              {questions.map((_, idx) => {
                const status = getQuestionStatus(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-10 h-10 rounded-lg text-xs font-bold transition-all border-2 flex items-center justify-center ${
                      status === 'current' ? 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20' :
                      status === 'answered' ? 'bg-green-600 border-green-600 text-white' :
                      status === 'marked' ? 'bg-purple-600 border-purple-600 text-white' :
                      'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-500 dark:text-slate-400 hover:border-slate-200 dark:hover:border-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Legend</h3>
            <div className="space-y-3">
              <LegendItem color="bg-green-600" label="Answered" count={Object.values(answers).filter(v => v !== undefined).length} />
              <LegendItem color="bg-purple-600" label="Marked" count={markedForReview.size} />
              <LegendItem color="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" border label="Not Visited" count={questions.length - Object.keys(answers).length} />
              <LegendItem color="bg-blue-50 dark:bg-blue-900/20 border-blue-600" border label="Current" count={1} />
            </div>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800">
            <button 
              onClick={handleSubmit}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
            >
              Submit Test
            </button>
          </div>
        </aside>

        {/* Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-50 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-l-xl shadow-lg"
        >
          <Menu className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </button>
      </div>

      {/* Scratchpad Overlay */}
      <AnimatePresence>
        {isScratchpadOpen && (
          <Scratchpad onClose={() => setIsScratchpadOpen(false)} />
        )}
      </AnimatePresence>

      {/* Mobile Warning */}
      <div className="md:hidden fixed inset-0 z-[200] bg-white dark:bg-slate-950 p-8 flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-16 h-16 text-yellow-500 mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Desktop Recommended</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">For the best mock test experience and to use the scratchpad feature, please use a desktop or laptop.</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

function LegendItem({ color, label, count, border = false }: { color: string, label: string, count: number, border?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`w-5 h-5 rounded-md ${color} ${border ? 'border-2' : ''}`} />
        <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">{label}</span>
      </div>
      <span className="text-sm font-bold text-slate-900 dark:text-white">{count}</span>
    </div>
  );
}
