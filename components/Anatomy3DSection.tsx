'use client';

import React, { useState } from 'react';
import { 
  Heart, Brain, Wind, Activity, Eye, EyeOff, Sparkles, ZoomIn, ZoomOut, 
  RotateCcw, Layers, Info, CheckCircle2, ChevronRight, Stethoscope, Search,
  Box, Shield, Cpu, RefreshCw
} from 'lucide-react';

interface AnatomicalStructure {
  id: string;
  name: string;
  latinName: string;
  system: 'Cardiovasculaire' | 'Nerveux' | 'Respiratoire' | 'Digestif' | 'Osteo-articulaire';
  description: string;
  clinicalImportance: string;
  hotspots: {
    id: string;
    label: string;
    x: number; // percentage
    y: number; // percentage
    info: string;
    pfeTip?: string;
  }[];
  svgType: 'heart' | 'brain' | 'lungs' | 'liver' | 'kidney' | 'skeleton';
}

const STRUCTURES: AnatomicalStructure[] = [
  {
    id: 'heart-3d',
    name: 'Cœur & Ostiums Coronaires',
    latinName: 'Cor - Systema cardiovasculare',
    system: 'Cardiovasculaire',
    description: 'Organe musculaire creux à 4 cavités (2 oreillettes, 2 ventricules) assurant la grande et la petite circulation.',
    clinicalImportance: 'Site principal des pathologies ischémiques (SCA), des valvulopathies et de l\'insuffisance cardiaque. Vascularisé par les artères coronaires gauche et droite.',
    svgType: 'heart',
    hotspots: [
      { id: 'h1', label: '1. Oreillette Droite (OD)', x: 68, y: 35, info: 'Reçoit le sang désoxygéné venant des veines caves supérieure et inférieure. Contient le nœud sinusal de Keith et Flack.', pfeTip: 'Fosse ovale à la face septale, vestige du foramen ovale fœtal.' },
      { id: 'h2', label: '2. Ventricule Gauche (VG)', x: 38, y: 65, info: 'Cavité à paroi musculaire très épaisse (8-12 mm). Propulse le sang oxygéné vers l\'aorte sous haute pression.', pfeTip: 'FEVG normale > 55%. Épaisseur > 15 mm = Hypertrophie Ventriculaire Gauche.' },
      { id: 'h3', label: '3. Crosse de l\'Aorte', x: 42, y: 15, info: 'Naît du VG. Donne le tronc brachiocéphalique, la carotide commune gauche et l\'artère sous-clavière gauche.', pfeTip: 'Donne à son origine les artères coronaires au niveau des sinus de Valsalva.' },
      { id: 'h4', label: '4. Artère Interventriculaire Antérieure (IVA)', x: 50, y: 55, info: 'Branche majeure du tronc commun gauche. Chemine dans le sillon interventriculaire antérieur.', pfeTip: 'L\'occlusion de l\'IVA cause les infarctus antérieurs et apicaux graves.' },
      { id: 'h5', label: '5. Arbre Pulmonaire', x: 28, y: 28, info: 'Tronc pulmonaire issu du VD se divisant en artères pulmonaires droite et gauche.', pfeTip: 'Transporte le sang veineux désoxygéné vers les alvéoles pulmonaires.' }
    ]
  },
  {
    id: 'brain-3d',
    name: 'Encéphale & Polygone de Willis',
    latinName: 'Encephalon - Circulus arteriosus cerebri',
    system: 'Nerveux',
    description: 'Centre de contrôle du système nerveux central comprenant le cerveau, le cervelet et le tronc cérébral.',
    clinicalImportance: 'Siège des AVC ischémiques et hémorragiques. Vascularisation assurée par le système carotidien interne et le système vertéro-basilaire reliés par le polygone de Willis.',
    svgType: 'brain',
    hotspots: [
      { id: 'b1', label: '1. Cortex Frontal & Aire de Broca', x: 28, y: 32, info: 'Contrôle la motricité volontaire et le langage articulé (Aire 44 et 45 de Brodmann dans l\'hémisphère dominant).', pfeTip: 'Lésion de Broca = Aphasie d\'expression (langage réduit, compréhension préservée).' },
      { id: 'b2', label: '2. Cortex Temporal & Aire de Wernicke', x: 45, y: 58, info: 'Aire auditive primordiale et décodage du langage (Aire 22 de Brodmann).', pfeTip: 'Lésion de Wernicke = Aphasie de réception (jargonaphasie, anosognosie).' },
      { id: 'b3', label: '3. Troncs Cérébral (Protubérance & Bulbe)', x: 55, y: 72, info: 'Contient les noyaux des nerfs crâniens (III à XII) et le centre cardiorespiratoire vital.', pfeTip: 'Lésions du tronc = Syndromes alternés (atteinte V-XII homolatérale et hémiplégie controlatérale).' },
      { id: 'b4', label: '4. Cervelet (Vermis et Hémisphères)', x: 72, y: 68, info: 'Régulation de l\'équilibre, de la coordination motrice et du tonus musculaire.', pfeTip: 'Syndrome cérébelleux = Ataxie, dysmétrie, hypermétrie, nystagmus, hypotonie.' },
      { id: 'b5', label: '5. Polygone de Willis (Base)', x: 50, y: 48, info: 'Anastomose artérielle hexagonale réunissant carotides internes et artères cérébrales postérieures.', pfeTip: 'Siège préférentiel des anévrismes sacculaires (rupture = hémorragie méningée).' }
    ]
  },
  {
    id: 'lungs-3d',
    name: 'Poumons & Arbre Bronchique',
    latinName: 'Pulmones - Arbor bronchialis',
    system: 'Respiratoire',
    description: 'Organes de la hématose. Le poumon droit comporte 3 lobes (supérieur, moyen, inférieur) et le gauche 2 lobes (supérieur, inférieur).',
    clinicalImportance: 'Zone d\'échanges gazeux alvéolo-capillaires (O2/CO2). Siège de la tuberculose (cavernes apicales), de la BPCO, de l\'asthme et des pneumonies.',
    svgType: 'lungs',
    hotspots: [
      { id: 'l1', label: '1. Apex Pulmonaire Droit', x: 30, y: 22, info: 'Sommet pulmonaire s\'élevant au-dessus de la 1ère côte. Zone préférentielle de réactivation tuberculeuse.', pfeTip: 'Infiltrats et cavernes tuberculeuses apicales bilatérales.' },
      { id: 'l2', label: '2. Bronche Souche Droite', x: 46, y: 42, info: 'Plus courte, plus large et plus verticale que la gauche (angle de 20°-30° avec l\'axe médial).', pfeTip: 'Les corps étrangers inhalés s\'enclavent préférentiellement dans la bronche souche droite.' },
      { id: 'l3', label: '3. Membrane Alvéolo-Capillaire', x: 68, y: 62, info: 'Épaisseur très fine (0,5 µm) permettant la diffusion passive de l\'O2 et du CO2 selon la loi de Fick.', pfeTip: 'Épaissie dans la fibrose pulmonaire et l\'OAP (baisse de la DLCO).' },
      { id: 'l4', label: '4. Cul-de-sac Pleural Diaphragmatique', x: 75, y: 80, info: 'Espace le plus déclive de la cavité pleurale virtuelle.', pfeTip: 'Pleurésie : comblement du cul-de-sac pleural visible dès 250 mL sur la radio de face.' }
    ]
  },
  {
    id: 'liver-3d',
    name: 'Foie & Segmentation de Couinaud',
    latinName: 'Hepar - Segmentatio hepatis',
    system: 'Digestif',
    description: 'La plus grande glande de l\'organisme (1,5 kg). Divisé en 8 segments fonctionnels indépendants possédant chacun leur vascularisation portale et leur drainage biliaire.',
    clinicalImportance: 'Siège de la cirrhose hépatique, du carcinome hépatocellulaire (CHC), des hépatites virales (B, C) et des métastases digestives.',
    svgType: 'liver',
    hotspots: [
      { id: 'li1', label: '1. Segment I (Lobe Caudé)', x: 45, y: 30, info: 'Segment postérieur indépendant situé entre la VCI et la scissure du ligament veineux.', pfeTip: 'Épargné dans la cirrhose ; peut subir une hypertrophie vicariante.' },
      { id: 'li2', label: '2. Segments II et III (Foie Gauche)', x: 28, y: 45, info: 'Secteur latéral gauche drainé par la veine sus-hépatique gauche.', pfeTip: 'Accessible à la résection hépatique segmentaire (lobectomie gauche).' },
      { id: 'li3', label: '3. Vésicule Biliaire & Lit Vésiculaire', x: 62, y: 68, info: 'Réservoir de la bile situé sous le segment IV à la face inférieure du foie.', pfeTip: 'Point de Murphy sous-costal droit. Lithiase biliaire → Cholécystite.' },
      { id: 'li4', label: '4. Tronc Porte & Hile Hépatique', x: 50, y: 55, info: 'Arrivée de la veine porte (80% du débit sanguin hépatique) et de l\'artère hépatique.', pfeTip: 'Hypertension Portale (HTP) si pression portale > 10 mmHg → Varices œsophagiennes.' }
    ]
  }
];

export default function Anatomy3DSection() {
  const [selectedStructure, setSelectedStructure] = useState<AnatomicalStructure>(STRUCTURES[0]);
  const [activeHotspot, setActiveHotspot] = useState<string>(STRUCTURES[0].hotspots[0].id);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLayer, setActiveLayer] = useState<'ALL' | 'VASCULAR' | 'NERVOUS' | 'ORGAN'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const hotspotDetails = selectedStructure.hotspots.find(h => h.id === activeHotspot) || selectedStructure.hotspots[0];

  const handleSelectStructure = (struct: AnatomicalStructure) => {
    setSelectedStructure(struct);
    setActiveHotspot(struct.hotspots[0].id);
    setRotationAngle(0);
    setZoomLevel(1);
  };

  const handleRotate = () => {
    setRotationAngle(prev => (prev + 90) % 360);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-black min-h-screen text-white font-sans" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      
      {/* ── HEADER HERO ── */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-teal-500/20"
        style={{ background: 'linear-gradient(135deg, #091a16 0%, #030a08 100%)', boxShadow: '0 0 35px rgba(20,184,166,0.12)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                MODULE ANATOMIE & ANATOMIE PATHOLOGIQUE
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                VECTOR 3D INTERACTIF
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Box className="w-8 h-8 text-teal-400 animate-pulse" />
              Atlas d'Anatomie 3D & Schémas Médicaux
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Explorez les structures anatomiques fondamentales avec repères cliniques, 
              angles de rotation 3D, calques anatomiques et perles d'examen PFE / Résidanat Maroc.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveLayer('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeLayer === 'ALL' ? 'bg-teal-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vue Globale
            </button>
            <button
              onClick={() => setActiveLayer('VASCULAR')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeLayer === 'VASCULAR' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vaisseaux 🔴
            </button>
            <button
              onClick={() => setActiveLayer('NERVOUS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeLayer === 'NERVOUS' ? 'bg-amber-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              Nerfs 🟡
            </button>
          </div>
        </div>
      </div>

      {/* ── STRUCTURE SELECTOR ROW ── */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {STRUCTURES.map(struct => {
          const isSelected = selectedStructure.id === struct.id;
          return (
            <button
              key={struct.id}
              onClick={() => handleSelectStructure(struct)}
              className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2.5 border shrink-0 ${
                isSelected
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-lg shadow-teal-500/10'
                  : 'bg-[#1C1C1E] text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              {struct.svgType === 'heart' && <Heart className="w-4 h-4 text-rose-400" />}
              {struct.svgType === 'brain' && <Brain className="w-4 h-4 text-purple-400" />}
              {struct.svgType === 'lungs' && <Wind className="w-4 h-4 text-cyan-400" />}
              {struct.svgType === 'liver' && <Activity className="w-4 h-4 text-amber-400" />}
              <span>{struct.name}</span>
            </button>
          );
        })}
      </div>

      {/* ── MAIN 3D CANVAS & DETAILS GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* CANVAS 3D (Col 7) */}
        <div className="lg:col-span-7 bg-[#0c0c0e] rounded-3xl border border-white/10 p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] shadow-2xl">
          
          {/* Controls Bar */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-[#1C1C1E]/90 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2))}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              title="Zoom Avancer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              title="Zoom Reculer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10" />
            <button
              onClick={handleRotate}
              className="p-2 text-teal-400 hover:bg-teal-500/10 rounded-xl transition-colors flex items-center gap-1 text-xs font-mono"
              title="Pivoter de 90°"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{rotationAngle}°</span>
            </button>
          </div>

          {/* Title tag on canvas */}
          <div className="absolute top-4 left-4 z-20">
            <span className="text-[11px] font-mono font-bold text-teal-400 bg-teal-950/80 border border-teal-500/30 px-3 py-1 rounded-full">
              {selectedStructure.latinName}
            </span>
          </div>

          {/* Interactive SVG Container */}
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center transition-all duration-500"
            style={{
              transform: `scale(${zoomLevel}) rotate(${rotationAngle}deg)`,
              filter: 'drop-shadow(0 0 35px rgba(20,184,166,0.15))'
            }}>
            
            {/* SVG Illustration Vector */}
            {selectedStructure.svgType === 'heart' && (
              <svg viewBox="0 0 320 320" className="w-full h-full">
                <defs>
                  <linearGradient id="heart3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#991b1b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <path d="M160 280 C110 240, 40 190, 40 120 C40 70, 80 40, 120 40 C145 40, 155 55, 160 65 C165 55, 175 40, 200 40 C240 40, 280 70, 280 120 C280 190, 210 240, 160 280 Z"
                  fill="url(#heart3dGrad)" stroke="#f87171" strokeWidth="2.5" />
                {/* Aorta arc */}
                <path d="M140 70 Q160 10 190 40 T170 100" fill="none" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" opacity="0.85" />
                {/* Coronary arteries */}
                <path d="M160 85 Q130 140 150 250" fill="none" stroke="#fecdd3" strokeWidth="3.5" strokeDasharray="4 2" />
                <path d="M160 85 Q200 130 190 220" fill="none" stroke="#38bdf8" strokeWidth="3" />
              </svg>
            )}

            {selectedStructure.svgType === 'brain' && (
              <svg viewBox="0 0 320 320" className="w-full h-full">
                <defs>
                  <linearGradient id="brain3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#3b0764" stopOpacity="0.95" />
                  </linearGradient>
                </defs>
                <path d="M80 170 C60 120, 100 50, 170 50 C240 50, 270 100, 260 170 C260 210, 230 230, 200 230 C180 230, 170 210, 160 210 C150 210, 140 230, 120 230 C90 230, 80 200, 80 170 Z"
                  fill="url(#brain3dGrad)" stroke="#c084fc" strokeWidth="2.5" />
                {/* Brain sulci / convolutions */}
                <path d="M110 110 Q140 90 170 120 T230 100" fill="none" stroke="#e9d5ff" strokeWidth="2" opacity="0.7" />
                <path d="M100 150 Q150 140 180 170 T240 150" fill="none" stroke="#e9d5ff" strokeWidth="2" opacity="0.7" />
                {/* Cerebellum */}
                <circle cx="210" cy="210" r="30" fill="#6b21a8" stroke="#a855f7" strokeWidth="2" />
                {/* Brainstem */}
                <rect x="150" y="210" width="20" height="50" rx="8" fill="#581c87" stroke="#c084fc" strokeWidth="2" />
              </svg>
            )}

            {selectedStructure.svgType === 'lungs' && (
              <svg viewBox="0 0 320 320" className="w-full h-full">
                <defs>
                  <linearGradient id="lungs3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.95" />
                  </linearGradient>
                </defs>
                {/* Trachea */}
                <rect x="150" y="30" width="20" height="70" rx="4" fill="#38bdf8" stroke="#7dd3fc" strokeWidth="2" />
                {/* Left Lung */}
                <path d="M140 100 C90 110, 60 150, 70 240 C90 270, 140 260, 140 180 Z" fill="url(#lungs3dGrad)" stroke="#38bdf8" strokeWidth="2" />
                {/* Right Lung */}
                <path d="M180 100 C230 110, 260 150, 250 240 C230 270, 180 260, 180 180 Z" fill="url(#lungs3dGrad)" stroke="#38bdf8" strokeWidth="2" />
              </svg>
            )}

            {selectedStructure.svgType === 'liver' && (
              <svg viewBox="0 0 320 320" className="w-full h-full">
                <defs>
                  <linearGradient id="liver3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d97706" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#451a03" stopOpacity="0.95" />
                  </linearGradient>
                </defs>
                <path d="M60 140 C80 80, 220 70, 260 120 C280 150, 250 220, 180 230 C120 240, 50 200, 60 140 Z"
                  fill="url(#liver3dGrad)" stroke="#fbbf24" strokeWidth="2.5" />
                {/* Gallbladder */}
                <ellipse cx="200" cy="200" rx="14" ry="22" fill="#16a34a" stroke="#4ade80" strokeWidth="2" />
              </svg>
            )}

            {/* Hotspot Pins */}
            {selectedStructure.hotspots.map(hs => {
              const isActive = hs.id === activeHotspot;
              return (
                <button
                  key={hs.id}
                  onClick={() => setActiveHotspot(hs.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${
                    isActive ? 'z-30 scale-125' : 'z-10 hover:scale-110'
                  }`}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                >
                  <span className={`relative flex items-center justify-center w-7 h-7 rounded-full font-mono text-[11px] font-bold shadow-lg transition-all ${
                    isActive
                      ? 'bg-teal-400 text-black border-2 border-white ring-4 ring-teal-500/40 animate-pulse'
                      : 'bg-[#1C1C1E] text-teal-400 border border-teal-500/50'
                  }`}>
                    {hs.id.replace(/^[a-z]+/, '')}
                  </span>
                  <span className={`absolute left-1/2 -bottom-6 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap px-2 py-0.5 rounded-full bg-black/90 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
                    {hs.label.split('.')[1] || hs.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <p className="text-slate-400 text-xs flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Cliquez sur les numéros pour afficher l'explication anatomique détaillée
            </p>
          </div>
        </div>

        {/* DETAILS SIDEBAR (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Selected Hotspot Card */}
          <div className="bg-[#1C1C1E] rounded-3xl border border-teal-500/30 p-6 shadow-2xl relative overflow-hidden">
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

            {/* PFE Clinical Pearl */}
            {hotspotDetails.pfeTip && (
              <div className="bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                  <Stethoscope className="w-4 h-4" />
                  <span>Pearl Examen PFE & Résidanat</span>
                </div>
                <p className="text-amber-200/90 text-xs leading-relaxed">
                  {hotspotDetails.pfeTip}
                </p>
              </div>
            )}
          </div>

          {/* Structure Overview */}
          <div className="bg-[#121214] rounded-3xl border border-white/8 p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-teal-400" />
              Physiopathologie & Intérêt Clinique
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              {selectedStructure.clinicalImportance}
            </p>

            {/* List of all hotspots */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-500 block mb-2">LISTE DES REPÈRES ANATOMIQUES :</span>
              <div className="space-y-1.5">
                {selectedStructure.hotspots.map(hs => (
                  <button
                    key={hs.id}
                    onClick={() => setActiveHotspot(hs.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      hs.id === activeHotspot
                        ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{hs.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
