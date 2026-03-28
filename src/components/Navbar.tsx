import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Moon, Sun, Search, User, LogOut } from 'lucide-react';
import { EXAM_CATEGORIES } from '../constants/exams';
import { cn } from '../lib/utils';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  user: any;
}

export default function Navbar({ isDarkMode, toggleDarkMode, user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(EXAM_CATEGORIES[0].id);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://storage.googleapis.com/firebasestorage.googleapis.com/v0/b/gen-lang-client-0275911971.firebasestorage.app/o/logo.png?alt=media" 
                alt="Rankify Logo" 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/rankify-logo/48/48";
                }}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Home</Link>
            
            {/* Test Series Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('test-series')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                <span>Test Series</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'test-series' && (
                <div className="absolute top-full left-0 w-[600px] bg-white dark:bg-slate-900 shadow-2xl rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Sidebar */}
                  <div className="w-1/3 bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-800">
                    {EXAM_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 text-sm font-medium transition-colors",
                          activeCategory === cat.id 
                            ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600" 
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                  {/* Content */}
                  <div className="w-2/3 p-6 grid grid-cols-2 gap-4">
                    {EXAM_CATEGORIES.find(c => c.id === activeCategory)?.exams.map((exam) => (
                      <Link
                        key={exam}
                        to={`/test-series/${exam.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {exam}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/mock-tests" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Mock Tests</Link>
            <Link to="/exam-updates" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Exam Updates</Link>
            <Link to="/leaderboard" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Leaderboard</Link>
            <Link to="/dashboard" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">Dashboard</Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLogout}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={toggleDarkMode} className="p-2 text-slate-600 dark:text-slate-300">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 space-y-4 animate-in slide-in-from-top duration-200">
          <Link to="/" className="block px-4 py-2 text-slate-600 dark:text-slate-300 font-medium">Home</Link>
          <div className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium">Test Series</div>
          <Link to="/mock-tests" className="block px-4 py-2 text-slate-600 dark:text-slate-300 font-medium">Mock Tests</Link>
          <Link to="/exam-updates" className="block px-4 py-2 text-slate-600 dark:text-slate-300 font-medium">Exam Updates</Link>
          <Link to="/leaderboard" className="block px-4 py-2 text-slate-600 dark:text-slate-300 font-medium">Leaderboard</Link>
          <Link to="/dashboard" className="block px-4 py-2 text-slate-600 dark:text-slate-300 font-medium">Dashboard</Link>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-3">
            <button 
              onClick={toggleDarkMode}
              className="flex items-center justify-between px-4 py-2 text-slate-600 dark:text-slate-300 font-medium"
            >
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
            </button>
            {user ? (
              <>
                <button onClick={handleLogout} className="px-4 py-2 text-red-600 font-medium text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-blue-600 font-medium text-center border border-blue-600 rounded-lg">Login</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
