'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, ImageIcon, Mic, MicOff, Sparkles, Trash2, Pencil, Check, X, ChevronDown } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  sender: 'me' | 'flakkai' | 'other';
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'audio';
  audioUrl?: string;
  audioDuration?: string;
  imageUrl?: string;
  edited?: boolean;
  isTyping?: boolean;
}

// ─── FLAKKAI Knowledge Base ───────────────────────────────────────────────────
const FLAKKAI_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ['hta', 'hypertension', 'tension'],
    response: `**HTA — Hypertension Artérielle** 🩺\n\nDéfinition : PA ≥ 140/90 mmHg en consultation (≥135/85 en automesure).\n\n**Paliers thérapeutiques (SFC 2023) :**\n• Étape 1 : Bithérapie d'emblée — IEC/ARA2 + ICa ou diurétique thiazidique\n• Étape 2 : Trithérapie — IEC/ARA2 + ICa + diurétique\n• Étape 3 : + Spironolactone 25mg\n\n**Urgences HTA :** PA > 180/110 + atteinte d'organe → SMUR + Nicardipine IV\n\n*💡 Pearl PFE : Contre-indication des IEC/ARA2 en grossesse !*`
  },
  {
    keywords: ['ecg', 'électrocardiogramme', 'onde', 'bloc', 'fibrillation', 'flutter'],
    response: `**Lecture ECG Systématique** ⚡\n\n1️⃣ **Rythme** : Sinusal ? (P avant chaque QRS)\n2️⃣ **Fréquence** : 300 ÷ nb de grands carreaux entre 2 R\n3️⃣ **Onde P** : visible, régulière, axis ?\n4️⃣ **PR** : 0.12–0.20s (3–5 petits carreaux)\n5️⃣ **QRS** : < 0.12s\n6️⃣ **ST** : sus ou sous-décalage ?\n7️⃣ **QT** : allongé si > 0.44s\n\n**BBD** : Oreilles de lapin en V1 (RSR'), qR en V6\n**BBG** : rS en V1, grand R en V6 — déviation axiale gauche\n\n*💡 FV = défibrillation immédiate, pas d'antiarythmique d'abord !*`
  },
  {
    keywords: ['avc', 'stroke', 'ischémique', 'hémorragique', 'accident vasculaire'],
    response: `**AVC — Conduite à Tenir** 🧠\n\n⏱️ **"Time is Brain"** — 1.9 million neurones meurent/minute\n\n**Clinique FAST :**\n• F — Face asymétrique\n• A — Arm faiblesse\n• S — Speech troubles\n• T — Time → appel 15 immédiat\n\n**Thrombolyse IV (rtPA) :** < 4h30 si ischémique, pas d'hémorragie\n**Thrombectomie mécanique :** < 6h (occlusion gros tronc)\n\n**CI absolues thrombolyse :**\n- TC < 3 mois, hémorragie récente, PA > 185/110 non contrôlée\n- INR > 1.7, plaquettes < 100.000\n\n*💡 Scanner cérébral sans injection EN URGENCE = 1er examen !*`
  },
  {
    keywords: ['diabète', 'glycémie', 'insuline', 'metformine', 'hba1c'],
    response: `**Diabète Type 2 — Prise en Charge** 🩸\n\n**Critères diagnostic :**\n• Glycémie à jeun ≥ 1.26 g/L (× 2)\n• Glycémie ≥ 2 g/L + symptômes\n• HbA1c ≥ 6.5%\n\n**Objectifs HbA1c :**\n• DT2 général : < 7%\n• Sujet âgé fragile : < 8–9%\n• Grossesse : < 6.5%\n\n**Escalade thérapeutique :**\n1. Metformine (si DFG > 30)\n2. + iSGLT2 (protection rénale/CV) ou GLP-1\n3. + Insuline basale\n\n*💡 Metformine contre-indiquée si DFG < 30 ou produit de contraste iodé !*`
  },
  {
    keywords: ['anatomie', 'muscle', 'os', 'nerf', 'artère', 'veine', 'foie', 'rein', 'cœur', 'poumon'],
    response: `**Anatomie — Points Clés PFE** 🫀\n\n**Cœur :**\n• 4 cavités : OD, OG, VD, VG\n• Septum interauriculaire = fosse ovale (FOP chez 25% adultes)\n• Nerf X (vague) : frein cardiaque\n\n**Foie :** 8 segments de Couinaud\n**Rein :** Épurateur, EPO (90%), rénine-angiotensine\n**Poumon :** Alvéoles = pneumocytes I (échanges) + II (surfactant)\n\n**Nerfs Membres :**\n• Médian → canal carpien (syndrome du canal carpien)\n• Cubital → gouttière épitrochléo-olécrânienne\n• Radial → gouttière humérale\n\n*💡 Précise-moi quel organe/région pour plus de détails !*`
  },
  {
    keywords: ['pharmacologie', 'médicament', 'antibiotique', 'antidote', 'posologie', 'effet', 'contre-indication'],
    response: `**Pharmacologie — Antidotes Essentiels** 💊\n\n| Toxique | Antidote |\n|---------|----------|\n| Paracétamol | N-acétylcystéine (NAC) |\n| Opioïdes | Naloxone |\n| Benzodiazépines | Flumazénil |\n| AVK | Vit K + PPSB |\n| Héparine | Sulfate de protamine |\n| Organophosphorés | Atropine + Pralidoxime |\n| Intox fer | Déféroxamine |\n\n**Fluoroquinolones** : toxicité tendineuse (CI sport ↑)\n**Aminosides** : néphrotoxique + ototoxique\n**Macrolides** : allongement QT\n\n*💡 Question sur une classe précise ? Tape /flakkai + ton médicament*`
  },
  {
    keywords: ['pfe', 'concours', 'résidanat', 'internat', 'examen', 'révision'],
    response: `**Conseils PFE / Résidanat Maroc** 🎓\n\n**Programme CNOM Prioritaire :**\n1. Cardiologie (HTA, IC, SCA, ECG)\n2. Pneumologie (BPCO, Asthme, EP, TB)\n3. Neurologie (AVC, Épilepsie, SEP)\n4. Réanimation (États de choc, ACR)\n5. Infectiologie (Sepsis, VIH, Méningite)\n\n**Stratégie :**\n• QCMs FMPR/FMPC 5 dernières années\n• Fiches de synthèse par item\n• Cas cliniques quotidiens\n• Révision active (Feynman technique)\n\n**Ressources :**\n• Section **Annales** de MedEdu → examens corrigés\n• Section **QCMs** → 40 questions par module\n\n*💡 Tu es dans la bonne plateforme ! Continue comme ça 💪*`
  },
  {
    keywords: ['tuberculose', 'tb', 'pnlat', 'bk', 'bacille', 'mycobacterium'],
    response: `**Tuberculose — Programme PNLAT Maroc** 🫁\n\n**Diagnostic :**\n• Clinique : toux > 3 sem, AEG, sueurs nocturnes, hémoptysie\n• Radio thorax : opacité apex, caverne\n• BAAR × 3 (expectorations)\n• GeneXpert MTB/RIF (résistance rifampicine)\n\n**Traitement (2HRZE/4HR) :**\n• Phase intensive 2 mois : H+R+Z+E\n• Phase continuation 4 mois : H+R\n\n**TB Latente (IGRA+/IDR > 10mm) :**\n• 3HP : Isoniazide + Rifapentine (3 mois, 1×/sem)\n• 6H : Isoniazide 6 mois\n\n*💡 Déclaration obligatoire au SIAAP Maroc !*`
  },
  {
    keywords: ['urgence', 'réanimation', 'choc', 'arrêt cardiaque', 'acr', 'rcp', 'défibrillation'],
    response: `**Urgences — Arrêt Cardiorespiratoire (ACR)** 🚨\n\n**Chaîne de survie :**\n1️⃣ Reconnaissance immédiate + appel 15\n2️⃣ RCP précoce : 30 compressions / 2 insufflations\n3️⃣ Défibrillation précoce (DSA)\n4️⃣ Réanimation spécialisée\n\n**Rythmes choquables :**\n• Fibrillation ventriculaire (FV)\n• Tachycardie ventriculaire sans pouls (TVsP)\n→ **Défibrillation IMMÉDIATE** (200J biph)\n\n**Rythmes non choquables :**\n• Asystolie, DEM → RCP + Adrénaline 1mg/3min\n\n**États de choc :**\n• Septique : remplissage + Noradrénaline + ATB < 1h\n• Cardiogénique : Dobutamine + diurétiques\n• Anaphylactique : Adrénaline 0.5mg IM cuisse\n\n*💡 Cause 4H4T à éliminer : Hypoxie, Hypovolémie, Hypothermie, H+ (acidose), Tamponnade, Thrombose, Tension pneumothorax, Toxiques*`
  },
  {
    keywords: ['bonjour', 'salut', 'salam', 'hello', 'allo', 'hi'],
    response: `Salam ! 👋 Je suis **FLAKKAI**, votre assistant IA médical MedEdu.\n\nJe peux vous aider sur :\n• 🫀 Cardiologie (HTA, ECG, IC...)\n• 🧠 Neurologie (AVC, Épilepsie...)\n• 💊 Pharmacologie (antidotes, posologies...)\n• 🦠 Infectiologie (TB, VIH, Sepsis...)\n• 🩸 Diabétologie & Endocrinologie\n• 🎓 Conseils PFE & Résidanat Maroc\n\nTapez **/flakkai** suivi de votre question ! 😊`
  },
];

function getFlakkaiResponse(query: string): string {
  const q = query.toLowerCase();
  for (const entry of FLAKKAI_RESPONSES) {
    if (entry.keywords.some(k => q.includes(k))) {
      return entry.response;
    }
  }
  return `Je cherche une réponse précise sur **"${query}"**...\n\nPour l'instant, ma base de connaissances couvre :\n• HTA, ECG, AVC, Diabète, TB, ACR\n• Pharmacologie & Antidotes\n• Conseils PFE Maroc\n\nEssayez une question plus spécifique ou consultez la **section Cours** du module concerné 📚`;
}

// ─── Markdown-lite renderer ───────────────────────────────────────────────────
function renderContent(text: string) {
  return text.split('\n').map((line, i) => {
    // Bold **text**
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i} className="block">
        {parts.map((part, j) =>
          j % 2 === 1
            ? <strong key={j} className="font-semibold">{part}</strong>
            : <span key={j}>{part}</span>
        )}
      </span>
    );
  });
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CommunityChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [contextMenu, setContextMenu] = useState<{ msgId: string; x: number; y: number } | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recordTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const now = () => new Date();
  const fmtTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const fmtDur = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // Scroll to bottom
  const scrollToBottom = useCallback((smooth = true) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
    }
  }, []);

  useEffect(() => { scrollToBottom(false); }, [messages]);

  // Scroll detection
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 120);
  };

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      recordTimerRef.current = setInterval(() => setRecordingSeconds(s => s + 1), 1000);
    } else {
      if (recordTimerRef.current) { clearInterval(recordTimerRef.current); recordTimerRef.current = null; }
    }
    return () => { if (recordTimerRef.current) clearInterval(recordTimerRef.current); };
  }, [isRecording]);

  // Close context menu on click
  useEffect(() => {
    const close = () => setContextMenu(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  // ── Send text / /flakkai command ──────────────────────────────────────────
  const sendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = inputValue.trim();
    if (!val) return;

    const myMsg: Message = {
      id: Date.now().toString(),
      sender: 'me', senderName: 'Badr Bourqi',
      content: val, timestamp: now(), type: 'text',
    };
    setMessages(prev => [...prev, myMsg]);
    setInputValue('');

    // Handle /flakkai command
    if (val.toLowerCase().startsWith('/flakkai')) {
      const query = val.slice(8).trim() || 'bonjour';

      // Typing indicator
      const typingId = `typing-${Date.now()}`;
      const typingMsg: Message = {
        id: typingId, sender: 'flakkai', senderName: 'FLAKKAI',
        content: '', timestamp: now(), type: 'text', isTyping: true,
      };
      setMessages(prev => [...prev, typingMsg]);

      setTimeout(() => {
        setMessages(prev => prev
          .filter(m => m.id !== typingId)
          .concat({
            id: `flakkai-${Date.now()}`,
            sender: 'flakkai', senderName: 'FLAKKAI',
            content: getFlakkaiResponse(query),
            timestamp: now(), type: 'text',
          })
        );
      }, 1200 + Math.random() * 600);
    }
  };

  // ── Image upload ─────────────────────────────────────────────────────────
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setMessages(prev => [...prev, {
      id: Date.now().toString(), sender: 'me', senderName: 'Badr Bourqi',
      content: '', timestamp: now(), type: 'image', imageUrl,
    }]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Audio recording toggle ────────────────────────────────────────────────
  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunksRef.current = [];
        const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm';
        const mr = new MediaRecorder(stream, { mimeType: mime });
        mediaRecorderRef.current = mr;

        mr.ondataavailable = e => { if (e.data?.size > 0) audioChunksRef.current.push(e.data); };
        mr.onstop = () => {
          stream.getTracks().forEach(t => t.stop());
          if (!audioChunksRef.current.length) return;
          const blob = new Blob(audioChunksRef.current, { type: mime });
          const url = URL.createObjectURL(blob);
          const dur = recordingSeconds;
          setMessages(prev => [...prev, {
            id: Date.now().toString(), sender: 'me', senderName: 'Badr Bourqi',
            content: 'Message vocal', timestamp: now(), type: 'audio',
            audioUrl: url, audioDuration: fmtDur(dur),
          }]);
        };
        mr.start(100);
        setIsRecording(true);
      } catch {
        alert('Accès au microphone refusé. Autorisez-le dans les paramètres du navigateur.');
      }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  // ── Audio playback ────────────────────────────────────────────────────────
  const togglePlay = (id: string, url: string) => {
    if (playingId && playingId !== id) { audioRefs.current[playingId]?.pause(); }
    if (!audioRefs.current[id]) {
      audioRefs.current[id] = new Audio(url);
      audioRefs.current[id].onended = () => setPlayingId(null);
    }
    const a = audioRefs.current[id];
    if (playingId === id) { a.pause(); setPlayingId(null); }
    else { a.play(); setPlayingId(id); }
  };

  // ── Delete message ────────────────────────────────────────────────────────
  const deleteMsg = (id: string) => setMessages(prev => prev.filter(m => m.id !== id));

  // ── Edit message ──────────────────────────────────────────────────────────
  const startEdit = (msg: Message) => {
    setEditingId(msg.id);
    setEditValue(msg.content);
    setContextMenu(null);
  };
  const confirmEdit = () => {
    if (!editValue.trim()) return;
    setMessages(prev => prev.map(m => m.id === editingId ? { ...m, content: editValue.trim(), edited: true } : m));
    setEditingId(null);
  };

  // ── Context menu ──────────────────────────────────────────────────────────
  const openCtx = (e: React.MouseEvent, msgId: string) => {
    e.preventDefault();
    setContextMenu({ msgId, x: e.clientX, y: e.clientY });
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  const isMine = (s: string) => s === 'me';
  const isAI = (s: string) => s === 'flakkai';

  return (
    <div
      className="flex flex-col bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      style={{ height: 'calc(100vh - 5rem)', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}
      onClick={() => setContextMenu(null)}
    >
      {/* ── iOS Status / Header ── */}
      <div className="shrink-0 px-5 pt-4 pb-3 bg-black/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* Group avatar */}
          <div className="relative w-10 h-10 shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-bold">ME</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[15px] font-semibold leading-tight">Communauté MedEdu</p>
            <p className="text-[#8E8E93] text-[12px] leading-tight mt-0.5">47 membres actifs • /flakkai pour l'IA</p>
          </div>
          {/* AI badge */}
          <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-teal-400" />
            <span className="text-teal-400 text-[11px] font-semibold">FLAKKAI</span>
          </div>
        </div>
      </div>

      {/* ── Messages ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
        style={{ background: 'linear-gradient(180deg, #000 0%, #0a0a0a 100%)', scrollbarWidth: 'none' }}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 select-none">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-teal-500/50" />
            </div>
            <p className="text-[#636366] text-[13px] text-center">Aucun message<br/>Tapez <span className="text-teal-400 font-mono">/flakkai bonjour</span> pour commencer</p>
          </div>
        )}

        {messages.map((msg, idx) => {
          const mine = isMine(msg.sender);
          const ai = isAI(msg.sender);
          const prevSame = idx > 0 && messages[idx - 1].sender === msg.sender;
          const nextSame = idx < messages.length - 1 && messages[idx + 1].sender === msg.sender;

          return (
            <div key={msg.id} className={`flex flex-col ${mine ? 'items-end' : 'items-start'} ${prevSame ? 'mt-0.5' : 'mt-3'}`}>
              {/* Sender name (first in group) */}
              {!mine && !prevSame && (
                <span className={`text-[12px] font-medium mb-1 ml-11 ${ai ? 'text-teal-400' : 'text-[#8E8E93]'}`}>
                  {ai ? '✦ FLAKKAI' : msg.senderName}
                </span>
              )}

              <div className={`flex items-end gap-2 max-w-[82%] ${mine ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar — only show for last in group */}
                <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold ${!nextSame ? 'opacity-100' : 'opacity-0'} ${
                  ai ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white' :
                  mine ? 'bg-gradient-to-br from-teal-500 to-teal-700 text-white' :
                  'bg-[#1C1C1E] text-[#8E8E93] border border-white/10'
                }`}>
                  {ai ? '✦' : msg.senderName.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>

                {/* Bubble */}
                <div
                  onContextMenu={e => mine && msg.type === 'text' && openCtx(e, msg.id)}
                  onDoubleClick={e => mine && msg.type === 'text' && openCtx(e, msg.id)}
                  className={`relative group cursor-default select-text ${
                    mine ? 'rounded-[20px] rounded-br-[6px]' :
                    ai   ? 'rounded-[20px] rounded-bl-[6px]' :
                           'rounded-[20px] rounded-bl-[6px]'
                  } overflow-hidden`}
                  style={{
                    background: mine ? 'linear-gradient(135deg, #0A84FF 0%, #0066CC 100%)' :
                                ai   ? 'linear-gradient(135deg, #0D2B24 0%, #0a1f1a 100%)' :
                                       '#1C1C1E',
                    border: ai ? '1px solid rgba(20,184,166,0.25)' : mine ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Typing indicator */}
                  {msg.isTyping && (
                    <div className="px-4 py-3 flex gap-1 items-center">
                      {[0, 0.2, 0.4].map((d, i) => (
                        <span key={i} className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: `${d}s` }} />
                      ))}
                    </div>
                  )}

                  {/* Text content */}
                  {!msg.isTyping && msg.type === 'text' && editingId !== msg.id && (
                    <div className={`px-[14px] py-[9px] text-[15px] leading-[1.4] ${mine ? 'text-white' : ai ? 'text-teal-50' : 'text-white'}`}
                      style={{ whiteSpace: 'pre-line' }}>
                      {renderContent(msg.content)}
                      {msg.edited && <span className="text-[10px] opacity-50 ml-1">(modifié)</span>}
                    </div>
                  )}

                  {/* Edit mode */}
                  {editingId === msg.id && (
                    <div className="px-2 py-2 flex gap-1">
                      <input
                        autoFocus
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') confirmEdit(); if (e.key === 'Escape') setEditingId(null); }}
                        className="flex-1 bg-transparent text-white text-[15px] outline-none px-2"
                      />
                      <button onClick={confirmEdit} className="p-1 text-green-400 hover:opacity-70"><Check className="w-4 h-4" /></button>
                      <button onClick={() => setEditingId(null)} className="p-1 text-red-400 hover:opacity-70"><X className="w-4 h-4" /></button>
                    </div>
                  )}

                  {/* Image */}
                  {msg.type === 'image' && msg.imageUrl && (
                    <img src={msg.imageUrl} alt="img" className="max-w-[220px] max-h-[220px] object-cover" />
                  )}

                  {/* Audio */}
                  {msg.type === 'audio' && msg.audioUrl && (
                    <div className="px-3 py-2.5 flex items-center gap-3 min-w-[180px]">
                      <button
                        onClick={() => togglePlay(msg.id, msg.audioUrl!)}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                      >
                        {playingId === msg.id
                          ? <span className="text-white text-xs font-bold">❚❚</span>
                          : <span className="text-white text-xs ml-0.5">▶</span>
                        }
                      </button>
                      <div className="flex items-center gap-px h-5 flex-1">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <div key={i} className="flex-1 rounded-full bg-white/40" style={{ height: `${30 + Math.sin(i * 0.8) * 50 + Math.random() * 20}%` }} />
                        ))}
                      </div>
                      <span className="text-white/60 text-[11px] shrink-0">{msg.audioDuration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Timestamp */}
              {(!nextSame || msg.sender !== messages[idx + 1]?.sender) && (
                <span className={`text-[#636366] text-[11px] mt-1 ${mine ? 'mr-9' : 'ml-9'}`}>
                  {fmtTime(msg.timestamp)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Context Menu ── */}
      {contextMenu && (
        <div
          className="fixed z-50 bg-[#1C1C1E] border border-white/10 rounded-2xl shadow-2xl overflow-hidden min-w-[160px]"
          style={{ top: contextMenu.y, left: Math.min(contextMenu.x, window.innerWidth - 180) }}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={() => { const m = messages.find(x => x.id === contextMenu.msgId); if (m) startEdit(m); setContextMenu(null); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-white text-[15px] hover:bg-white/5 transition-colors border-b border-white/5"
          >
            <Pencil className="w-4 h-4 text-[#0A84FF]" />
            Modifier
          </button>
          <button
            onClick={() => { deleteMsg(contextMenu.msgId); setContextMenu(null); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 text-[15px] hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </button>
        </div>
      )}

      {/* ── Scroll to bottom btn ── */}
      {showScrollBtn && (
        <button
          onClick={() => scrollToBottom()}
          className="absolute bottom-24 right-5 w-8 h-8 rounded-full bg-[#1C1C1E] border border-white/10 flex items-center justify-center shadow-lg hover:bg-white/10 transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-white" />
        </button>
      )}

      {/* ── Recording bar ── */}
      {isRecording && (
        <div className="shrink-0 flex items-center gap-3 px-4 py-2.5 bg-red-500/10 border-t border-red-500/20">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 text-[13px] font-medium flex-1">Enregistrement…</span>
          <span className="text-red-400 font-mono text-[13px] font-bold">{fmtDur(recordingSeconds)}</span>
          <span className="text-red-400/50 text-[11px]">Tap 🎤 pour envoyer</span>
        </div>
      )}

      {/* ── Input Bar (iOS style) ── */}
      <div className="shrink-0 px-3 py-3 bg-black/90 backdrop-blur-xl border-t border-white/5">
        {/* /flakkai hint */}
        {inputValue.startsWith('/f') && !inputValue.startsWith('/flakkai ') && (
          <button
            onClick={() => setInputValue('/flakkai ')}
            className="mb-2 flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-400 text-[13px] hover:bg-teal-500/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>/flakkai — Poser une question à l'IA</span>
          </button>
        )}

        <form onSubmit={sendText} className="flex items-center gap-2">
          {/* Image */}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-[#636366] hover:text-teal-400 transition-colors"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Text input — iOS pill style */}
          <div className="flex-1 flex items-center bg-[#1C1C1E] rounded-full border border-white/8 px-4 py-2.5 gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) sendText(); }}
              disabled={isRecording}
              placeholder={isRecording ? '🎤 Enregistrement...' : 'iMessage  •  /flakkai'}
              className="flex-1 bg-transparent text-white text-[15px] placeholder-[#48484A] outline-none"
              style={{ fontFamily: 'inherit' }}
            />
          </div>

          {/* Mic */}
          <button
            type="button"
            onClick={toggleRecording}
            className={`p-2 rounded-full transition-all ${
              isRecording
                ? 'text-red-400 bg-red-500/15 animate-pulse'
                : 'text-[#636366] hover:text-teal-400'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Send */}
          {inputValue.trim() && !isRecording && (
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-[#0A84FF] flex items-center justify-center shadow-lg hover:bg-[#0A7AE8] transition-colors"
            >
              <Send className="w-4 h-4 text-white ml-0.5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
