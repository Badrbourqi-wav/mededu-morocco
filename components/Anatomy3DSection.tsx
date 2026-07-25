'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, Brain, Wind, Activity, Eye, EyeOff, Sparkles, ZoomIn, ZoomOut, 
  RotateCcw, Layers, Info, CheckCircle2, ChevronRight, Stethoscope, Search,
  Box, Shield, Cpu, RefreshCw, Play, Pause, Move, Maximize2, Compass
} from 'lucide-react';

interface Hotspot3D {
  id: string;
  label: string;
  x: number; // -100 to 100
  y: number; // -100 to 100
  z: number; // -100 to 100 (depth)
  info: string;
  pfeTip?: string;
}

interface AnatomicalStructure3D {
  id: string;
  name: string;
  latinName: string;
  system: 'Cardiovasculaire' | 'Nerveux' | 'Respiratoire' | 'Digestif';
  description: string;
  clinicalImportance: string;
  hotspots: Hotspot3D[];
  type: 'heart' | 'brain' | 'lungs' | 'liver';
  primaryColor: string;
  glowColor: string;
}

const STRUCTURES_3D: AnatomicalStructure3D[] = [
  {
    id: 'heart-3d-real',
    name: 'Cœur & Arbre Coronaire 3D',
    latinName: 'Cor 3D - Systema cardiovasculare',
    system: 'Cardiovasculaire',
    primaryColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    type: 'heart',
    description: 'Structure tridimensionnelle du cœur humain montrant les 4 cavités, la crosse aortique, le tronc pulmonaire et le réseau coronaire.',
    clinicalImportance: 'Permet d\'étudier en 360° les sites d\'occlusion des coronaires (IVA, Circonflexe, Coronaire droite) et la propagation des blocages électrophysiologiques (BAV).',
    hotspots: [
      { id: 'h1', label: '1. Oreillette Droite (OD)', x: 45, y: -25, z: 35, info: 'Reçoit le sang veineux des veines caves. Contient le nœud sinusal sinu-atrial de Keith & Flack à la jonction VCS-OD.', pfeTip: 'Fosse ovale à la face septale interauriculaire, vestige du foramen ovale.' },
      { id: 'h2', label: '2. Ventricule Gauche (VG)', x: -35, y: 40, z: 45, info: 'Paroi musculaire très développée (8-12 mm). Propulse le sang oxygéné vers l\'aorte sous haute pression.', pfeTip: 'FEVG normale ≥ 55%. Épaississement > 15 mm = HVG sur HTA.' },
      { id: 'h3', label: '3. Crosse de l\'Aorte (3D Arc)', x: 0, y: -80, z: 0, info: 'Crosse de 3 cm de diamètre. Donne le TBC, la carotide commune gauche et la sous-clavière gauche.', pfeTip: 'Lieu d\'élection de la dissection aortique type A de Stanford (urgence chirurgicale).' },
      { id: 'h4', label: '4. Artère Interventriculaire Antérieure (IVA)', x: 5, y: 30, z: 70, info: 'Branche directe du tronc commun gauche descendant dans le sillon interventriculaire antérieur.', pfeTip: 'L\'occlusion de l\'IVA entraîne un STEMI antérieur/apical grave.' },
      { id: 'h5', label: '5. Face Postérieure & Sillon Coronaire', x: 20, y: 5, z: -60, info: 'Vue postérieure montrant le sinus coronaire drainant le sang veineux du myocarde dans l\'OD.', pfeTip: 'L\'artère coronaire droite chemine à la face postérieure du sillon AV.' }
    ]
  },
  {
    id: 'brain-3d-real',
    name: 'Encéphale & Polygone de Willis 3D',
    latinName: 'Encephalon 3D - Systema nervosum',
    system: 'Nerveux',
    primaryColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    type: 'brain',
    description: 'Modèle 3D complet du cerveau incluant le cortex cérébral, la scissure de Sylvius, le cervelet, le tronc cérébral et le polygone de Willis.',
    clinicalImportance: 'Visualisation 3D essentielle pour localiser les territoires vasculaires (AVC sylvien, cérébral antérieur, vertébro-basilaire) et les zones fonctionnelles.',
    hotspots: [
      { id: 'b1', label: '1. Lobe Frontal & Aire de Broca', x: -60, y: -30, z: 40, info: 'Aire motrice du langage (Aires 44/45 de Brodmann). Contrôle la production verbale.', pfeTip: 'AVC sylvien gauche superficiel → Aphasie de Broca d\'expression.' },
      { id: 'b2', label: '2. Lobe Temporal & Aire de Wernicke', x: -50, y: 30, z: 30, info: 'Aire de compréhension du langage parlé et écrit (Aire 22 de Brodmann).', pfeTip: 'Aphasie de Wernicke : jargonaphasie avec compréhension altérée.' },
      { id: 'b3', label: '3. Cervelet (Vue Postéro-Inférieure)', x: 50, y: 65, z: -40, info: 'Coordination motrice et équilibre. Divisé en vermis central et 2 hémisphères cérébelleux.', pfeTip: 'Syndrome cérébelleux : ataxie, hypotonie, dysmétrie au test index-nez.' },
      { id: 'b4', label: '4. Tronc Cérébral (Pédoncules & Bulbe)', x: 0, y: 75, z: 0, info: 'Contient la substance réticulée activatrice (sommeil/éveil) et les noyaux des nerfs crâniens III à XII.', pfeTip: 'Atteinte du tronc → Syndromes alternés (hémiplégie croisée).' },
      { id: 'b5', label: '5. Polygone de Willis (Face Basale)', x: 0, y: 20, z: -50, info: 'Cercle artériel anastomotique réorientant la circulation encéphalique entre carotides et vertébrales.', pfeTip: 'Siège préférentiel des anévrismes intracrâniens (rupture → Hémorragie méningée).' }
    ]
  },
  {
    id: 'lungs-3d-real',
    name: 'Poumons & Arbre Bronchique 3D',
    latinName: 'Pulmones 3D - Systema respiratorium',
    system: 'Respiratoire',
    primaryColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    type: 'lungs',
    description: 'Volume 3D des deux poumons avec la trachée, la carène, les bronches souches et les plèvres.',
    clinicalImportance: 'Démontre la déclivité des cul-de-sacs pleuraux, la verticalité de la bronche souche droite et la topographie des cavernes tuberculeuses.',
    hotspots: [
      { id: 'l1', label: '1. Apex Pulmonaire Droit', x: -45, y: -75, z: 15, info: 'Sommet pulmonaire dépassant la 1ère côte. Zone fortement oxygénée.', pfeTip: 'Zone de prédilection de la tuberculose pulmonaire secondaire (cavernes).' },
      { id: 'l2', label: '2. Carène & Bronche Souche Droite', x: 0, y: -20, z: -20, info: 'Bifurcation trachéale à T5. La bronche droite est plus verticale (angle 25°).', pfeTip: 'Les corps étrangers inhalés tombent quasi toujours dans la bronche droite.' },
      { id: 'l3', label: '3. Lobes Supérieur, Moyen et Inférieur', x: -65, y: 30, z: 30, info: 'Poumon droit trilobé séparé par la grande scissure et la petite scissure horizontale.', pfeTip: 'Pneumopathie franche lobaire aiguë (PFLA) à pneumocoque.' },
      { id: 'l4', label: '4. Sinus Pleural Costo-Diaphragmatique', x: 60, y: 80, z: 10, info: 'Cul-de-sac pleural le plus déclive où s\'accumule l\'épanchement liquide (pleurésie).', pfeTip: 'Épanchement pleural visible à la radio si V > 250 mL.' }
    ]
  },
  {
    id: 'liver-3d-real',
    name: 'Foie & Segmentation de Couinaud 3D',
    latinName: 'Hepar 3D - Systema digestorium',
    system: 'Digestif',
    primaryColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    type: 'liver',
    description: 'Glande hépatique volumétrique 3D découpée selon la segmentation chirurgicale de Couinaud (8 segments).',
    clinicalImportance: 'Déterminant pour le repérage des tumeurs CHC cirrhotiques et le guidage des lobectomies hépatiques.',
    hotspots: [
      { id: 'li1', label: '1. Lobe Caudé (Segment I - Postérieur)', x: 0, y: -40, z: -60, info: 'Segment autonome adjacent à la veine cave inférieure. Vascularisation propre.', pfeTip: 'Hypertrophié de façon compensatrice dans la cirrhose hépatique.' },
      { id: 'li2', label: '2. Lobe Gauche (Segments II & III)', x: -60, y: -10, z: 25, info: 'Secteur latéral gauche s\'étendant vers l\'épigastre.', pfeTip: 'Accessible à la résection segmentaire gauche.' },
      { id: 'li3', label: '3. Vésicule Biliaire (Face Inférieure)', x: 30, y: 60, z: 45, info: 'Réservoir de bile sous la face viscérale du foie. Reliée au canal cystique.', pfeTip: 'Point de Murphy sous-costal droit. Lithiase biliaire → Cholécystite.' },
      { id: 'li4', label: '4. Hile Hépatique & Tronc Porte', x: 0, y: 20, z: 10, info: 'Arrivée de la veine porte (80% du débit sanguin hépatique) et de l\'artère hépatique.', pfeTip: 'Hypertension Portale (HTP) si pression portale > 10 mmHg → Varices œsophagiennes.' }
    ]
  }
];

export default function Anatomy3DSection() {
  const [selectedStructure, setSelectedStructure] = useState<AnatomicalStructure3D>(STRUCTURES_3D[0]);
  const [activeHotspot, setActiveHotspot] = useState<string>(STRUCTURES_3D[0].hotspots[0].id);
  
  // 3D Orbit State (Yaw = Y rotation, Pitch = X rotation)
  const [yaw, setYaw] = useState<number>(20);
  const [pitch, setPitch] = useState<number>(10);
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseAnim, setPulseAnim] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'FRONT' | 'BACK' | 'SIDE'>('FRONT');

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Auto-rotation 360° animation loop
  useEffect(() => {
    if (autoRotate && !isDragging) {
      const interval = setInterval(() => {
        setYaw(prev => (prev + 0.8) % 360);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [autoRotate, isDragging]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    
    setYaw(prev => (prev + deltaX * 0.6) % 360);
    setPitch(prev => Math.max(-60, Math.min(60, prev - deltaY * 0.4)));
    setDragStart({ x: clientX, y: clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSelectStructure = (struct: AnatomicalStructure3D) => {
    setSelectedStructure(struct);
    setActiveHotspot(struct.hotspots[0].id);
    setYaw(20);
    setPitch(10);
    setZoom(1);
    setViewMode('FRONT');
  };

  const setViewOrientation = (mode: 'FRONT' | 'BACK' | 'SIDE') => {
    setViewMode(mode);
    setAutoRotate(false);
    if (mode === 'FRONT') { setYaw(0); setPitch(5); }
    if (mode === 'BACK')  { setYaw(180); setPitch(5); }
    if (mode === 'SIDE')  { setYaw(90); setPitch(10); }
  };

  const hotspotDetails = selectedStructure.hotspots.find(h => h.id === activeHotspot) || selectedStructure.hotspots[0];

  // Helper to project 3D point (x,y,z) given current yaw & pitch angles
  const getProjectedPoint = (hs: Hotspot3D) => {
    const radY = (yaw * Math.PI) / 180;
    const radX = (pitch * Math.PI) / 180;
    
    // Rotate around Y axis (Yaw)
    const x1 = hs.x * Math.cos(radY) + hs.z * Math.sin(radY);
    const z1 = -hs.x * Math.sin(radY) + hs.z * Math.cos(radY);
    
    // Rotate around X axis (Pitch)
    const y2 = hs.y * Math.cos(radX) - z1 * Math.sin(radX);
    const z2 = hs.y * Math.sin(radX) + z1 * Math.cos(radX);
    
    // Map to canvas percent (center is 50%, 50%)
    const canvasX = 50 + (x1 / 2.4) * zoom;
    const canvasY = 50 + (y2 / 2.4) * zoom;
    
    return { x: canvasX, y: canvasY, depthZ: z2 };
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-[#050507] min-h-screen text-white select-none"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      
      {/* ─── 3D ATLAS HEADER ─── */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-teal-500/20"
        style={{ background: 'linear-gradient(135deg, #0d211d 0%, #040d0a 100%)', boxShadow: '0 0 40px rgba(20,184,166,0.15)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 tracking-wide">
                ORBIT 360° WEBGL & VOLUMETRIC ENGINE
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                RÉALISME 4K
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Box className="w-8 h-8 text-teal-400 animate-spin" style={{ animationDuration: '12s' }} />
              Atlas d'Anatomie 3D Interactif 360°
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Faites glisser la souris ou le doigt pour **pivoter l'organe sous tous les angles (Face, Dos, Profil)**. 
              Explorez la profondeur 3D, la pulsation cardiaque en temps réel et les repères d'examen PFE.
            </p>
          </div>

          {/* Quick controls top */}
          <div className="flex items-center gap-2 bg-[#121215] p-2 rounded-2xl border border-white/10 shrink-0">
            <button onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                autoRotate ? 'bg-teal-500 text-black shadow-lg' : 'text-slate-400 hover:text-white bg-white/5'
              }`}>
              {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>360° Auto</span>
            </button>
            
            <button onClick={() => setPulseAnim(!pulseAnim)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                pulseAnim ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-white bg-white/5'
              }`}>
              <Heart className="w-3.5 h-3.5" />
              <span>Pulsation</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── ORGAN SELECTOR TABS ─── */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
        {STRUCTURES_3D.map(struct => {
          const isSelected = selectedStructure.id === struct.id;
          return (
            <button key={struct.id} onClick={() => handleSelectStructure(struct)}
              className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2.5 border shrink-0 ${
                isSelected
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-lg shadow-teal-500/10'
                  : 'bg-[#18181B] text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
              }`}>
              {struct.type === 'heart' && <Heart className="w-4 h-4 text-rose-400" />}
              {struct.type === 'brain' && <Brain className="w-4 h-4 text-purple-400" />}
              {struct.type === 'lungs' && <Wind className="w-4 h-4 text-cyan-400" />}
              {struct.type === 'liver' && <Activity className="w-4 h-4 text-amber-400" />}
              <span>{struct.name}</span>
            </button>
          );
        })}
      </div>

      {/* ─── MAIN 3D VIEW & DETAILS ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ─── 3D INTERACTIVE CANVAS CONTAINER (Col 7) ─── */}
        <div className="lg:col-span-7 bg-[#0a0a0d] rounded-3xl border border-white/10 p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px] shadow-2xl"
          ref={canvasContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>

          {/* Grid Background Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

          {/* Top Left Orientation Badge */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
            <span className="text-[11px] font-mono font-bold text-teal-400 bg-teal-950/80 border border-teal-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-teal-400 animate-spin" style={{ animationDuration: '8s' }} />
              {Math.abs(Math.round(yaw)) % 360 > 135 && Math.abs(Math.round(yaw)) % 360 < 225 ? 'VUE POSTÉRIEURE (DOS 🔄)' : 'VUE ANTÉRIEURE (FACE 👁️)'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono pl-1">
              Yaw: {Math.round(yaw)}° | Pitch: {Math.round(pitch)}° | Zoom: {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Top Right View Presets & Zoom */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#18181B]/90 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setViewOrientation('FRONT')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold ${viewMode === 'FRONT' ? 'bg-teal-500 text-black' : 'text-slate-400 hover:text-white'}`}>
              Face
            </button>
            <button onClick={() => setViewOrientation('BACK')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold ${viewMode === 'BACK' ? 'bg-teal-500 text-black' : 'text-slate-400 hover:text-white'}`}>
              Dos
            </button>
            <button onClick={() => setViewOrientation('SIDE')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold ${viewMode === 'SIDE' ? 'bg-teal-500 text-black' : 'text-slate-400 hover:text-white'}`}>
              Profil
            </button>
            <div className="w-px h-4 bg-white/10" />
            <button onClick={() => setZoom(z => Math.min(z + 0.2, 1.8))} className="p-1.5 text-slate-300 hover:text-white"><ZoomIn className="w-4 h-4" /></button>
            <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.6))} className="p-1.5 text-slate-300 hover:text-white"><ZoomOut className="w-4 h-4" /></button>
          </div>

          {/* Instructions Overlay */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
            <span className="text-[11px] text-slate-400 bg-black/70 px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5 text-teal-400" />
              Glissez la souris/doigt pour pivoter à 360°
            </span>
          </div>

          {/* ─── 3D VOLUMETRIC MESH CONTAINER ─── */}
          <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center pointer-events-none"
            style={{
              perspective: '1000px',
              perspectiveOrigin: '50% 50%',
            }}>
            
            {/* 3D Transform wrapper */}
            <div className="w-full h-full relative transition-transform duration-75"
              style={{
                transformStyle: 'preserve-3d',
                transform: `scale(${zoom}) rotateX(${pitch}deg) rotateY(${yaw}deg)`,
                animation: pulseAnim ? 'pulse-3d 1.2s ease-in-out infinite' : 'none',
              }}>

              {/* 3D HEART MODEL */}
              {selectedStructure.type === 'heart' && (
                <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Outer glowing volumetric sphere */}
                  <div className="absolute inset-8 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #ef4444 0%, #991b1b 50%, #450a0a 90%)',
                      boxShadow: `0 0 60px ${selectedStructure.glowColor}, inset 0 -20px 40px rgba(0,0,0,0.8)`,
                      transform: 'translateZ(0px)',
                    }} />

                  {/* Left Ventricle volume bulge */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #f87171 0%, #dc2626 70%, transparent 100%)',
                      transform: 'translateZ(45px)',
                      filter: 'blur(2px)',
                    }} />

                  {/* Aorta 3D Arc (front to back curve) */}
                  <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full overflow-visible" style={{ transform: 'translateZ(30px)' }}>
                    <path d="M140 100 Q150 20 190 30 T180 120" fill="none" stroke="#f43f5e" strokeWidth="18" strokeLinecap="round" />
                    <path d="M140 100 Q150 20 190 30 T180 120" fill="none" stroke="#fda4af" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                  </svg>

                  {/* Coronary arteries network 3D */}
                  <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full overflow-visible" style={{ transform: 'translateZ(60px)' }}>
                    <path d="M150 90 Q120 150 140 240" fill="none" stroke="#fecdd3" strokeWidth="4" strokeDasharray="6 3" />
                    <path d="M150 90 Q190 140 180 220" fill="none" stroke="#38bdf8" strokeWidth="4" />
                  </svg>
                </div>
              )}

              {/* 3D BRAIN MODEL */}
              {selectedStructure.type === 'brain' && (
                <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="absolute inset-10 rounded-[40%]"
                    style={{
                      background: 'radial-gradient(circle at 40% 30%, #c084fc 0%, #7e22ce 60%, #3b0764 95%)',
                      boxShadow: `0 0 50px ${selectedStructure.glowColor}, inset 0 -15px 30px rgba(0,0,0,0.8)`,
                      transform: 'translateZ(0px)',
                    }} />

                  {/* Frontal Lobe Depth Layer */}
                  <div className="absolute top-12 left-12 w-2/5 h-2/5 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #e9d5ff 0%, #a855f7 70%, transparent 100%)',
                      transform: 'translateZ(40px)',
                      filter: 'blur(3px)',
                    }} />

                  {/* Cerebellum rear volume */}
                  <div className="absolute bottom-12 right-12 w-1/3 h-1/3 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 40% 40%, #9333ea 0%, #581c87 80%)',
                      transform: 'translateZ(-30px)',
                      boxShadow: '0 0 20px rgba(147,51,234,0.5)',
                    }} />
                </div>
              )}

              {/* 3D LUNGS MODEL */}
              {selectedStructure.type === 'lungs' && (
                <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Left Lung 3D volume */}
                  <div className="absolute top-10 left-6 w-2/5 h-3/4 rounded-[45%]"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #38bdf8 0%, #0284c7 60%, #0c4a6e 95%)',
                      boxShadow: `0 0 45px ${selectedStructure.glowColor}`,
                      transform: 'translateZ(20px) rotate(-10deg)',
                    }} />
                  {/* Right Lung 3D volume */}
                  <div className="absolute top-10 right-6 w-2/5 h-3/4 rounded-[45%]"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #38bdf8 0%, #0284c7 60%, #0c4a6e 95%)',
                      boxShadow: `0 0 45px ${selectedStructure.glowColor}`,
                      transform: 'translateZ(20px) rotate(10deg)',
                    }} />
                  {/* Trachea 3D pipe */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-28 rounded-xl"
                    style={{
                      background: 'linear-gradient(90deg, #7dd3fc 0%, #0284c7 50%, #075985 100%)',
                      transform: 'translateZ(35px)',
                    }} />
                </div>
              )}

              {/* 3D LIVER MODEL */}
              {selectedStructure.type === 'liver' && (
                <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="absolute inset-10 rounded-[35%]"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #fbbf24 0%, #b45309 60%, #451a03 95%)',
                      boxShadow: `0 0 50px ${selectedStructure.glowColor}`,
                      transform: 'translateZ(0px) rotate(-15deg)',
                    }} />
                  {/* Gallbladder 3D 3D volume */}
                  <div className="absolute bottom-16 right-20 w-10 h-16 rounded-full"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #4ade80 0%, #15803d 80%)',
                      transform: 'translateZ(40px)',
                      boxShadow: '0 0 20px rgba(74,222,128,0.5)',
                    }} />
                </div>
              )}

            </div>
          </div>

          {/* Dynamic 3D projected Hotspots */}
          {selectedStructure.hotspots.map(hs => {
            const projected = getProjectedPoint(hs);
            const isActive = hs.id === activeHotspot;
            const isBack = projected.depthZ < -20;

            return (
              <button key={hs.id} onClick={(e) => { e.stopPropagation(); setActiveHotspot(hs.id); }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-150 z-30 ${
                  isActive ? 'scale-125' : 'hover:scale-110'
                }`}
                style={{
                  left: `${projected.x}%`,
                  top: `${projected.y}%`,
                  opacity: isBack ? 0.35 : 1,
                  filter: isBack ? 'blur(1px)' : 'none',
                }}>
                <span className={`flex items-center justify-center w-7 h-7 rounded-full font-mono text-[11px] font-bold shadow-2xl transition-all ${
                  isActive
                    ? 'bg-teal-400 text-black ring-4 ring-teal-500/50 border-2 border-white animate-pulse'
                    : 'bg-[#18181B] text-teal-300 border border-teal-500/40'
                }`}>
                  {hs.id.replace(/^[a-z]+/, '')}
                </span>
                <span className={`absolute left-1/2 -bottom-6 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap px-2 py-0.5 rounded-full bg-black/90 text-white border border-white/10 pointer-events-none opacity-0 hover:opacity-100`}>
                  {hs.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* ─── DETAILS & PFE PEARLS SIDEBAR (Col 5) ─── */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active Hotspot Card */}
          <div className="bg-[#141417] rounded-3xl border border-teal-500/30 p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {hotspotDetails.label}
              </span>
              <span className="text-[11px] font-mono text-slate-400">Repère #{hotspotDetails.id}</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-snug">{hotspotDetails.label}</h3>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {hotspotDetails.info}
            </p>

            {/* PFE Exam Clinical Pearl */}
            {hotspotDetails.pfeTip && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1.5">
                  <Stethoscope className="w-4 h-4" />
                  <span>Incontournable PFE & Résidanat Maroc</span>
                </div>
                <p className="text-amber-200/90 text-xs leading-relaxed font-medium">
                  {hotspotDetails.pfeTip}
                </p>
              </div>
            )}
          </div>

          {/* Organ Clinical Summary & Hotspot List */}
          <div className="bg-[#101013] rounded-3xl border border-white/8 p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-teal-400" />
              Intérêt Pathologique & Chirurgical
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              {selectedStructure.clinicalImportance}
            </p>

            <div className="pt-2 border-t border-white/5">
              <span className="text-[11px] font-bold text-slate-500 block mb-2">SÉLECTIONNER UN REPÈRE (1 - {selectedStructure.hotspots.length}) :</span>
              <div className="space-y-1.5">
                {selectedStructure.hotspots.map(hs => (
                  <button key={hs.id} onClick={() => setActiveHotspot(hs.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      hs.id === activeHotspot
                        ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}>
                    <span>{hs.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes pulse-3d {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.04); }
        }
      `}</style>
    </div>
  );
}
