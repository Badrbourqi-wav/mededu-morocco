import React from 'react';

interface ModuleAnimationProps {
  disciplineTag: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-24 h-24',
  lg: 'w-48 h-48',
};

const animations = `
  @keyframes heartbeatPulse {
    0% { transform: scale(1); opacity: 1; }
    15% { transform: scale(1.15); opacity: 0.8; }
    30% { transform: scale(1); opacity: 1; }
    45% { transform: scale(1.15); opacity: 0.8; }
    60% { transform: scale(1); opacity: 1; }
  }
  .animate-heartbeat {
    animation: heartbeatPulse 1.2s infinite;
  }
  @keyframes pulseRing {
    0% { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(1.5); opacity: 0; }
  }
  .animate-pulse-ring {
    animation: pulseRing 1.2s infinite ease-out;
  }

  @keyframes lungBreathing {
    0% { transform: scaleX(1) scaleY(1); }
    50% { transform: scaleX(1.1) scaleY(1.05); }
    100% { transform: scaleX(1) scaleY(1); }
  }
  .animate-breathing {
    animation: lungBreathing 4s infinite ease-in-out;
  }

  @keyframes synapseSpark {
    0% { opacity: 0; transform: scale(0.8); }
    10% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 10px #a855f7; }
    20% { opacity: 0; transform: scale(0.9); }
    100% { opacity: 0; }
  }
  .animate-spark {
    animation: synapseSpark 2s infinite;
  }

  @keyframes bloodFlow {
    0% { transform: translateX(-20px) rotate(0deg); }
    50% { transform: translateX(20px) rotate(10deg); }
    100% { transform: translateX(-20px) rotate(0deg); }
  }
  .animate-blood-flow {
    animation: bloodFlow 3s infinite ease-in-out;
  }

  @keyframes moleculeOrbit {
    0% { transform: rotate(0deg) translateX(15px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(15px) rotate(-360deg); }
  }
  .animate-orbit {
    animation: moleculeOrbit 4s infinite linear;
  }

  @keyframes rotate3D {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
  }
  .animate-rotate3d {
    animation: rotate3D 6s infinite linear;
    transform-style: preserve-3d;
  }

  @keyframes dissolveParticle {
    0% { opacity: 1; transform: translateY(0) scale(1); }
    50% { opacity: 0.5; transform: translateY(-10px) scale(1.2); }
    100% { opacity: 0; transform: translateY(-20px) scale(0); }
  }
  .animate-dissolve {
    animation: dissolveParticle 2s infinite ease-out;
  }

  @keyframes peristalsisWave {
    0% { transform: scaleY(1); }
    50% { transform: scaleY(1.2); }
    100% { transform: scaleY(1); }
  }
  .animate-peristalsis {
    animation: peristalsisWave 2s infinite ease-in-out;
  }

  @keyframes ambientGlow {
    0% { filter: drop-shadow(0 0 2px #cbd5e1); }
    50% { filter: drop-shadow(0 0 10px #94a3b8); }
    100% { filter: drop-shadow(0 0 2px #cbd5e1); }
  }
  .animate-glow {
    animation: ambientGlow 3s infinite ease-in-out;
  }
`;

export const ModuleAnimation: React.FC<ModuleAnimationProps> = ({ disciplineTag, size = 'md' }) => {
  const containerClass = `relative flex items-center justify-center ${sizeClasses[size]}`;

  const renderAnimation = () => {
    const tag = disciplineTag.toLowerCase();
    
    if (tag.includes('cardio')) {
      return (
        <div className={containerClass}>
          <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-pulse-ring"></div>
          <svg className="w-full h-full text-red-600 animate-heartbeat" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      );
    }
    
    if (tag.includes('pneumo') || tag.includes('pulmonaire')) {
      return (
        <div className={containerClass}>
          <svg className="w-full h-full text-blue-500 animate-breathing" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M8 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4M16 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4" />
          </svg>
        </div>
      );
    }
    
    if (tag.includes('neuro')) {
      return (
        <div className={containerClass}>
          <div className="absolute inset-0 rounded-full bg-purple-500 animate-spark" style={{ animationDelay: '0s' }}></div>
          <div className="absolute inset-0 rounded-full bg-purple-400 animate-spark" style={{ animationDelay: '0.5s', transform: 'scale(0.8)' }}></div>
          <svg className="w-full h-full text-purple-700 relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );
    }
    
    if (tag.includes('hématologie') || tag.includes('hemato')) {
      return (
        <div className={containerClass}>
          <svg className="w-full h-full text-red-800 animate-blood-flow" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="8" cy="12" r="4" />
            <circle cx="16" cy="10" r="5" className="opacity-80" />
            <circle cx="12" cy="16" r="3" className="opacity-90" />
          </svg>
        </div>
      );
    }
    
    if (tag.includes('endocrino')) {
      return (
        <div className={containerClass}>
          <svg className="w-full h-full text-teal-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="12" cy="12" r="8" strokeDasharray="4 4" />
            <circle cx="12" cy="4" r="2" fill="currentColor" className="animate-orbit" style={{ transformOrigin: '12px 12px' }} />
            <circle cx="12" cy="20" r="2" fill="currentColor" className="animate-orbit" style={{ transformOrigin: '12px 12px', animationDelay: '-2s' }} />
          </svg>
        </div>
      );
    }
    
    if (tag.includes('anatomie')) {
      return (
        <div className={containerClass} style={{ perspective: '1000px' }}>
          <svg className="w-full h-full text-cyan-600 animate-rotate3d" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2a3 3 0 0 1 3 3v2a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
            <path d="M9 7h6v5H9z" />
            <path d="M7 12h10v10H7z" />
          </svg>
        </div>
      );
    }
    
    if (tag.includes('pharmaco')) {
      return (
        <div className={containerClass}>
          <svg className="w-full h-full text-green-600 relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="8" width="12" height="8" rx="4" />
            <path d="M12 8v8" stroke="white" strokeWidth="2" />
          </svg>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-dissolve"></div>
          <div className="absolute top-1/3 left-3/4 w-1.5 h-1.5 bg-green-500 rounded-full animate-dissolve" style={{ animationDelay: '0.4s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-2.5 h-2.5 bg-green-300 rounded-full animate-dissolve" style={{ animationDelay: '0.8s' }}></div>
        </div>
      );
    }
    
    if (tag.includes('gastro')) {
      return (
        <div className={containerClass}>
          <svg className="w-full h-full text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12c0-4 4-6 8-6s8 2 8 6-4 6-8 6-8-2-8-6" className="animate-peristalsis" />
            <path d="M4 12c0 2 4 4 8 4s8-2 8-4" className="animate-peristalsis" style={{ animationDelay: '-1s' }} />
          </svg>
        </div>
      );
    }
    
    // Default
    return (
      <div className={containerClass}>
        <svg className="w-full h-full text-slate-500 animate-glow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 2v20" strokeDasharray="4 4" />
          <path d="M16 2v20" strokeDasharray="4 4" />
          <path d="M8 6h8M8 12h8M8 18h8" />
        </svg>
      </div>
    );
  };

  return (
    <>
      <style>{animations}</style>
      {renderAnimation()}
    </>
  );
};
