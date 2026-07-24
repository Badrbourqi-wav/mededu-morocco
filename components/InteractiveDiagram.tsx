// components/InteractiveDiagram.tsx
'use client';

import React, { useState } from 'react';
import { DiagramData, DiagramHotspot } from '../types';
import { 
  Info, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Heart, 
  ZoomIn, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface InteractiveDiagramProps {
  diagram: DiagramData;
}

export default function InteractiveDiagram({ diagram }: InteractiveDiagramProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<DiagramHotspot | null>(diagram.hotspots[0] || null);
  const [showLabels, setShowLabels] = useState(true);
  const [activePinId, setActivePinId] = useState<string | null>(diagram.hotspots[0]?.id || null);

  const handleSelectHotspot = (hotspot: DiagramHotspot) => {
    setSelectedHotspot(hotspot);
    setActivePinId(hotspot.id);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-teal-500/20 shadow-2xl relative overflow-hidden bg-slate-900/90">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-teal-500/10 text-teal-400 border border-teal-500/30">
              {diagram.category}
            </span>
            <span className="text-xs text-slate-400">Schéma Interactif Vectoriel</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
            <Heart className="w-5 h-5 text-teal-400 fill-teal-400/20" />
            {diagram.title}
          </h3>
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center space-x-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          <button 
            onClick={() => setShowLabels(!showLabels)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              showLabels ? 'bg-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showLabels ? 'Labels Masqués' : 'Afficher Labels'}</span>
          </button>

          <button 
            onClick={() => {
              setSelectedHotspot(diagram.hotspots[0]);
              setActivePinId(diagram.hotspots[0]?.id);
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Réinitialiser"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Anatomical Diagram Canvas */}
        <div className="lg:col-span-7 relative bg-slate-950/90 rounded-2xl p-6 border border-slate-800/80 flex items-center justify-center min-h-[380px] shadow-inner overflow-hidden">
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* SVG Organ Illustration (Cardiac Chamber Representation) */}
          <svg viewBox="0 0 400 340" className="w-full max-w-[360px] h-auto filter drop-shadow-[0_0_25px_rgba(13,148,136,0.15)]">
            <defs>
              <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="aortaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#9f1239" />
              </linearGradient>
              <linearGradient id="atriumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>

            {/* Aortic Arch */}
            <path 
              d="M 180 120 C 180 50, 240 40, 250 90 L 230 130 Z" 
              fill="url(#aortaGrad)" 
              stroke="#fb7185" 
              strokeWidth="2"
              className="transition-all duration-300 hover:opacity-90"
            />
            {/* Heart Muscle Body */}
            <path 
              d="M 200 100 Q 280 90 290 170 Q 300 250 200 300 Q 100 250 110 170 Q 120 90 200 100 Z" 
              fill="url(#heartGrad)" 
              stroke="#0d9488" 
              strokeWidth="3"
            />
            {/* Interventricular Septum line */}
            <path d="M 200 130 L 195 285" stroke="#334155" strokeWidth="4" strokeDasharray="4 4" />
            {/* Left Ventricle chamber fill highlight */}
            <path d="M 200 135 Q 260 145 270 210 Q 260 260 198 280 Z" fill="#0d9488" fillOpacity="0.15" />
            {/* Right Atrium chamber fill highlight */}
            <path d="M 125 150 Q 180 145 185 190 Q 170 220 130 210 Z" fill="url(#atriumGrad)" fillOpacity="0.3" />
          </svg>

          {/* Render Interactive Hotspots & Pins */}
          {diagram.hotspots.map((hotspot) => {
            const isSelected = activePinId === hotspot.id;
            return (
              <div
                key={hotspot.id}
                style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                onClick={() => handleSelectHotspot(hotspot)}
              >
                {/* Outer Pulsing Aura */}
                <div className={`
                  w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300
                  ${isSelected ? 'bg-teal-500/40 ring-4 ring-teal-400/50 scale-125' : 'bg-teal-500/20 hover:scale-110'}
                  ${hotspot.pulseAnimation ? 'animate-pulse-ring' : ''}
                `}>
                  {/* Inner Pin Dot */}
                  <div className={`
                    w-3.5 h-3.5 rounded-full transition-colors shadow-lg
                    ${isSelected ? 'bg-teal-300 ring-2 ring-white' : 'bg-teal-400 group-hover:bg-cyan-300'}
                  `} />
                </div>

                {/* Hotspot Label Overlay */}
                {showLabels && (
                  <div className={`
                    absolute left-1/2 -translate-x-1/2 top-8 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all shadow-xl pointer-events-none
                    ${isSelected 
                      ? 'bg-teal-600 text-white border border-teal-300/40 scale-105 z-30' 
                      : 'bg-slate-900/90 text-slate-300 border border-slate-700/80 group-hover:bg-slate-800'
                    }
                  `}>
                    {hotspot.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Region Detailed Panel */}
        <div className="lg:col-span-5 bg-slate-950/70 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between min-h-[380px]">
          {selectedHotspot ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-mono text-teal-400 uppercase tracking-wider block">
                    {selectedHotspot.clinicalTerm}
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">
                    {selectedHotspot.label}
                  </h4>
                </div>
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Info className="w-4 h-4" />
                </div>
              </div>

              {/* Anatomical Definition */}
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Rappel Physiologique & Anatomique
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  {selectedHotspot.definition}
                </p>
              </div>

              {/* Clinical Pathology Note (PFE High-Yield) */}
              {selectedHotspot.pathologyNote && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-200/90">
                  <div className="flex items-center space-x-2 mb-1 text-amber-400 font-bold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Point Clé PFE & Clinique</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    {selectedHotspot.pathologyNote}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 text-slate-500">
              <Sparkles className="w-8 h-8 text-teal-500/40 mb-2" />
              <p className="text-xs">Cliquez sur un repère anatomique du schéma pour afficher l analyse détaillée.</p>
            </div>
          )}

          {/* Bottom Hint */}
          <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-teal-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Conforme au Référentiel National PFE
            </span>
            <span>4 Repères Anatomiques</span>
          </div>
        </div>
      </div>
    </div>
  );
}
