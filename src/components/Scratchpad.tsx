import React, { useRef, useEffect, useState } from 'react';
import { Eraser, Pencil, Trash2, X, Move } from 'lucide-react';
import { motion, useDragControls } from 'motion/react';

interface ScratchpadProps {
  onClose: () => void;
}

export default function Scratchpad({ onClose }: ScratchpadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [color, setColor] = useState('#3b82f6'); // blue-500
  const dragControls = useDragControls();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match its display size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = tool === 'eraser' ? 20 : 3;
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    
    // In dark mode, we might want a different eraser color if the background is dark
    // but for now, let's assume a white canvas background for the scratchpad
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-24 right-8 w-80 h-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col z-50 overflow-hidden"
    >
      {/* Header */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="p-3 bg-slate-50 dark:bg-slate-800 border-bottom border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-move"
      >
        <div className="flex items-center space-x-2">
          <Move className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Scratchpad</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      {/* Toolbar */}
      <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setTool('pen')}
            className={`p-2 rounded-lg transition-all ${tool === 'pen' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            title="Pen"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded-lg transition-all ${tool === 'eraser' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />
          <button
            onClick={clearCanvas}
            className="p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 rounded-lg transition-all"
            title="Clear All"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center space-x-1">
          {['#3b82f6', '#ef4444', '#10b981', '#000000'].map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setTool('pen');
              }}
              className={`w-4 h-4 rounded-full border-2 transition-transform hover:scale-125 ${color === c && tool === 'pen' ? 'border-slate-400 scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative bg-white">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
        />
      </div>
      
      <div className="p-2 bg-slate-50 dark:bg-slate-800 text-[10px] text-center text-slate-400 font-medium">
        Draw freely for rough work
      </div>
    </motion.div>
  );
}
