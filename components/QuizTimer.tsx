'use client';
// components/QuizTimer.tsx
// Circular Countdown Timer — MedEdu Morocco

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle, Flame } from 'lucide-react';

interface QuizTimerProps {
  totalSeconds: number;
  remainingSeconds: number;
  onExpire?: () => void;
  onTick?: (remaining: number) => void;
  isRunning?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function QuizTimer({
  totalSeconds,
  remainingSeconds,
  onExpire,
  onTick,
  isRunning = true,
  size = 'md',
}: QuizTimerProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const remainingRef = useRef(remainingSeconds);

  useEffect(() => {
    remainingRef.current = remainingSeconds;
  }, [remainingSeconds]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      const next = remainingRef.current - 1;
      remainingRef.current = next;
      onTick?.(next);
      if (next <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        onExpire?.();
      }
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, onExpire, onTick]);

  const progress = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
  const percentage = Math.max(0, Math.min(1, progress));

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isWarning = remainingSeconds <= 600 && remainingSeconds > 180; // < 10 min
  const isDanger = remainingSeconds <= 180; // < 3 min

  const getColor = () => {
    if (isDanger) return '#f43f5e';
    if (isWarning) return '#f59e0b';
    return '#0d9488';
  };

  const getSizes = () => {
    switch (size) {
      case 'sm': return { r: 24, cx: 32, cy: 32, vb: '0 0 64 64', fontSize: '10', strokeWidth: 4, containerClass: 'w-16 h-16' };
      case 'lg': return { r: 48, cx: 56, cy: 56, vb: '0 0 112 112', fontSize: '14', strokeWidth: 6, containerClass: 'w-28 h-28' };
      default: return { r: 36, cx: 44, cy: 44, vb: '0 0 88 88', fontSize: '12', strokeWidth: 5, containerClass: 'w-22 h-22' };
    }
  };

  const { r, cx, cy, vb, fontSize, strokeWidth, containerClass } = getSizes();
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference * (1 - percentage);

  const color = getColor();

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Circular Progress Ring */}
      <div className={`relative ${containerClass} flex items-center justify-center`}>
        <svg viewBox={vb} className="w-full h-full -rotate-90">
          {/* Track ring */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
          />
          {/* Progress ring */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            animate={{ strokeDashoffset, stroke: color }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
          />
        </svg>

        {/* Time Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {isDanger ? (
              <motion.div
                key="danger-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-rose-400"
              >
                <Flame className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
              </motion.div>
            ) : isWarning ? (
              <AlertTriangle className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} text-amber-400`} />
            ) : (
              <Clock className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} text-teal-400`} />
            )}
          </AnimatePresence>
          <motion.span
            className="font-mono font-bold leading-none mt-0.5"
            style={{
              fontSize: size === 'sm' ? '9px' : size === 'lg' ? '13px' : '11px',
              color,
            }}
            animate={{ scale: isDanger && remainingSeconds % 2 === 0 ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {timeStr}
          </motion.span>
        </div>
      </div>

      {/* Status Label */}
      <AnimatePresence>
        {isDanger && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-[10px] font-bold text-rose-400"
          >
            <Flame className="w-3 h-3" />
            Temps critique !
          </motion.div>
        )}
        {isWarning && !isDanger && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-bold text-amber-400"
          >
            <AlertTriangle className="w-3 h-3" />
            Moins de 10 min
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
