import { useEffect, useState } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, limit, onSnapshot } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { Zap } from 'lucide-react';

export default function ExamUpdates() {
  const [updates, setUpdates] = useState<any[]>([]);

  useEffect(() => {
    const path = 'examUpdates';
    const q = query(collection(db, path), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUpdates(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white py-2.5 overflow-hidden whitespace-nowrap border-b border-blue-500/30 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 flex items-center relative z-10">
        <div className="flex items-center space-x-2 shrink-0 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 mr-4 shadow-sm">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Trending</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="inline-block animate-marquee">
            <span className="flex items-center space-x-8">
              {updates.length > 0 ? updates.map((update) => (
                <span key={update.id} className="text-sm font-medium hover:text-blue-200 transition-colors cursor-pointer flex items-center space-x-2">
                  <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                  <span>{update.text}</span>
                </span>
              )) : (
                <>
                  <span className="text-sm font-medium flex items-center space-x-2">
                    <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                    <span>SSC CGL 2026 Notification Out!</span>
                  </span>
                  <span className="text-sm font-medium flex items-center space-x-2">
                    <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                    <span>IBPS PO Admit Card Released</span>
                  </span>
                  <span className="text-sm font-medium flex items-center space-x-2">
                    <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                    <span>RRB NTPC Exam Dates Announced</span>
                  </span>
                  <span className="text-sm font-medium flex items-center space-x-2">
                    <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                    <span>UP Police SI Result Declared</span>
                  </span>
                  <span className="text-sm font-medium flex items-center space-x-2">
                    <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                    <span>Join Rankify for Daily Quizzes!</span>
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
