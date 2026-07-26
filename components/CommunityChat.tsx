'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, ImageIcon, Mic, MicOff, Sparkles, Trash2, Pencil, Check, X, Users, Key, Zap, Bot, Brain } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────
type AIModel = 'gemini' | 'chatgpt' | 'claude' | 'flakkai';

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
  modelId?: AIModel;
}

// ─── Clean Markdown & LaTeX Symbol Formatter ──────────────────────────────────
function RenderContent({ text }: { text: string }) {
  if (!text) return null;

  // Clean raw LaTeX symbol strings into clean Unicode characters
  const cleanedText = text
    .replace(/\\rightarrow|\$\\rightarrow\$/g, '➔')
    .replace(/\\leftarrow|\$\\leftarrow\$/g, '⬅')
    .replace(/\\ge|\$\\ge\$/g, '≥')
    .replace(/\\le|\$\\le\$/g, '≤')
    .replace(/\\pm|\$\\pm\$/g, '±')
    .replace(/\$(.*?)\$/g, '$1');

  return (
    <div className="space-y-1.5 leading-relaxed text-sm sm:text-base">
      {cleanedText.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1.5" />;
        
        // Header parsing
        if (line.startsWith('#### ')) {
          return <h4 key={i} className="font-bold text-teal-300 text-base mt-2 mb-1">{line.replace('#### ', '')}</h4>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={i} className="font-bold text-cyan-300 text-lg mt-3 mb-1">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={i} className="font-bold text-sky-300 text-xl mt-3 mb-1">{line.replace('## ', '')}</h2>;
        }

        // Bold parsing
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="leading-snug">
            {parts.map((p, j) => (j % 2 === 1 ? <strong key={j} className="font-semibold text-white">{p}</strong> : <span key={j}>{p}</span>))}
          </p>
        );
      })}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function CommunityChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState<AIModel>('gemini');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [ctxMenu, setCtxMenu] = useState<{ id: string; x: number; y: number } | null>(null);
  
  // API Key states
  const [clientApiKey, setClientApiKey] = useState('');
  const [showApiKeyBanner, setShowApiKeyBanner] = useState(false);
  const [tempKeyInput, setTempKeyInput] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recordTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const now = () => new Date();
  const fmtTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const fmtDur = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  // Load saved API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('mededu_gemini_api_key');
    if (savedKey) setClientApiKey(savedKey);
  }, []);

  const handleSaveApiKey = () => {
    if (!tempKeyInput.trim()) return;
    const cleanKey = tempKeyInput.trim();
    setClientApiKey(cleanKey);
    localStorage.setItem('mededu_gemini_api_key', cleanKey);
    setShowApiKeyBanner(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, showApiKeyBanner]);

  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      recordTimerRef.current = setInterval(() => setRecordingSeconds(s => s + 1), 1000);
    } else {
      if (recordTimerRef.current) { clearInterval(recordTimerRef.current); recordTimerRef.current = null; }
    }
    return () => { if (recordTimerRef.current) clearInterval(recordTimerRef.current); };
  }, [isRecording]);

  useEffect(() => {
    const close = () => setCtxMenu(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  // Send message to dynamic AI route with API key auto-detection
  const sendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = inputValue.trim();
    if (!val) return;

    // AUTO-DETECT API KEY PASTED IN CHAT INPUT!
    if ((val.startsWith('AIza') || val.startsWith('sk-') || val.startsWith('AQ.')) && val.length > 25 && !val.includes(' ')) {
      setClientApiKey(val);
      localStorage.setItem('mededu_gemini_api_key', val);
      setShowApiKeyBanner(false);
      setInputValue('');

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'me',
          senderName: 'Étudiant MedEdu',
          content: '🔑 Clé API soumise...',
          timestamp: now(),
          type: 'text'
        },
        {
          id: (Date.now() + 1).toString(),
          sender: 'flakkai',
          senderName: '⚡ Système MedEdu AI',
          content: `✅ **Clé API enregistrée et configurée avec succès !**\n\nVotre clé a été sauvegardée dans votre navigateur. Vous pouvez maintenant poser n'importe quelle question sur vos cours, la médecine, la traduction ou la culture générale ! 🩺🚀`,
          timestamp: now(),
          type: 'text',
          modelId: selectedModel
        }
      ]);
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'me',
      senderName: 'Étudiant MedEdu',
      content: val,
      timestamp: now(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    const query = val.replace(/^\/flakkai/i, '').replace(/^\//, '').trim() || val;
    const typingId = `t-${Date.now()}`;
    
    const modelBadgeName = selectedModel === 'chatgpt' ? '🤖 ChatGPT (GPT-4o)' 
                         : selectedModel === 'claude' ? '🧠 Claude 3.5' 
                         : selectedModel === 'flakkai' ? '🇲🇦 FLAKKAI Native' 
                         : '⚡ Gemini 2.0 Flash';

    // Show typing indicator
    setMessages(prev => [...prev, { 
      id: typingId, 
      sender: 'flakkai', 
      senderName: modelBadgeName, 
      content: '', 
      timestamp: now(), 
      type: 'text', 
      isTyping: true,
      modelId: selectedModel
    }]);

    // Build chat history context
    const chatHistory = messages.slice(-6).map(m => ({
      role: m.sender === 'me' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));
    
    fetch('/api/flakkai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query, history: chatHistory, modelId: selectedModel, clientApiKey })
    })
    .then(res => res.json())
    .then(data => {
      if (data.isFallback && !clientApiKey) {
        setShowApiKeyBanner(true);
      }

      setMessages(prev => prev.filter(m => m.id !== typingId).concat({
        id: `ai-${Date.now()}`, 
        sender: 'flakkai', 
        senderName: modelBadgeName,
        content: data.response || "Désolé, aucune réponse reçue du serveur.", 
        timestamp: now(), 
        type: 'text',
        modelId: data.modelId || selectedModel
      }));
    })
    .catch(err => {
      console.error('API Call Error:', err);
      setMessages(prev => prev.filter(m => m.id !== typingId).concat({
        id: `err-${Date.now()}`, 
        sender: 'flakkai', 
        senderName: modelBadgeName,
        content: "⚠️ Erreur de connexion aux serveurs d'IA. Veuillez réessayer dans quelques instants.", 
        timestamp: now(), 
        type: 'text',
        modelId: selectedModel
      }));
    });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'me', senderName: 'Étudiant MedEdu', content: '', timestamp: now(), type: 'image', imageUrl: URL.createObjectURL(file) }]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
          const url = URL.createObjectURL(new Blob(audioChunksRef.current, { type: mime }));
          setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'me', senderName: 'Étudiant MedEdu', content: 'Message vocal', timestamp: now(), type: 'audio', audioUrl: url, audioDuration: fmtDur(recordingSeconds) }]);
        };
        mr.start(100);
        setIsRecording(true);
      } catch { alert('Autorisez le microphone dans les paramètres du navigateur.'); }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  const togglePlay = (id: string, url: string) => {
    if (playingId && playingId !== id) { audioRefs.current[playingId]?.pause(); }
    if (!audioRefs.current[id]) { audioRefs.current[id] = new Audio(url); audioRefs.current[id].onended = () => setPlayingId(null); }
    const a = audioRefs.current[id];
    if (playingId === id) { a.pause(); setPlayingId(null); } else { a.play(); setPlayingId(id); }
  };

  const deleteMsg = (id: string) => setMessages(prev => prev.filter(m => m.id !== id));
  const startEdit = (msg: Message) => { setEditingId(msg.id); setEditValue(msg.content); setCtxMenu(null); };
  const confirmEdit = () => {
    if (!editValue.trim()) return;
    setMessages(prev => prev.map(m => m.id === editingId ? { ...m, content: editValue.trim(), edited: true } : m));
    setEditingId(null);
  };

  const openCtx = (e: React.MouseEvent, id: string) => { e.preventDefault(); setCtxMenu({ id, x: e.clientX, y: e.clientY }); };

  const waveform = (id: string) => Array.from({ length: 26 }, (_, i) => {
    const seed = id.charCodeAt(i % id.length) + i * 7;
    return 20 + (seed % 65);
  });

  return (
    <>
      <style>{`
        .ios-chat-scroll::-webkit-scrollbar { display: none; }
        .ios-chat-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes msg-in {
          from { opacity: 0; transform: scale(0.96) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .msg-appear { animation: msg-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }

        .glass-panel {
          background: rgba(13, 17, 23, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .glass-bubble-user {
          background: linear-gradient(135deg, #0A84FF 0%, #0055D4 100%);
          box-shadow: 0 4px 15px rgba(10, 132, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .glass-bubble-ai {
          background: rgba(18, 24, 38, 0.9);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(20, 184, 166, 0.3);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(20, 184, 166, 0.1);
        }
      `}</style>

      <div className="flex flex-col rounded-3xl overflow-hidden shadow-2xl glass-panel text-slate-100"
        style={{ height: 'calc(100vh - 5.5rem)', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
        onClick={() => setCtxMenu(null)}>

        {/* ─── iOS Glass Header ─── */}
        <div className="shrink-0 px-5 pt-4 pb-3 border-b border-white/10" style={{ background: 'rgba(15, 20, 30, 0.95)' }}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/30">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base tracking-tight flex items-center gap-2">
                  Communauté & Assistant IA FLAKKAI
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">V2.0 LIVE</span>
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  <span>47 Étudiants en ligne</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-teal-400 font-medium">Génération DYNAMIQUE active</span>
                </p>
              </div>
            </div>
          </div>

          {/* ─── Multi-Model Selector Bar ─── */}
          <div className="flex items-center gap-2 mt-3.5 pt-2.5 border-t border-white/10 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Modèle IA :</span>
            
            <button onClick={() => setSelectedModel('gemini')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 border flex items-center gap-1.5 ${
                selectedModel === 'gemini'
                  ? 'bg-teal-500/25 text-teal-200 border-teal-400/50 shadow-md shadow-teal-500/20 scale-105'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}>
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              <span>⚡ Gemini 2.0 Flash</span>
            </button>

            <button onClick={() => setSelectedModel('chatgpt')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 border flex items-center gap-1.5 ${
                selectedModel === 'chatgpt'
                  ? 'bg-emerald-500/25 text-emerald-200 border-emerald-400/50 shadow-md shadow-emerald-500/20 scale-105'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}>
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>🟢 ChatGPT (GPT-4o)</span>
            </button>

            <button onClick={() => setSelectedModel('claude')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 border flex items-center gap-1.5 ${
                selectedModel === 'claude'
                  ? 'bg-amber-500/25 text-amber-200 border-amber-400/50 shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}>
              <Brain className="w-3.5 h-3.5 text-amber-400" />
              <span>🟠 Claude 3.5 Sonnet</span>
            </button>

            <button onClick={() => setSelectedModel('flakkai')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 border flex items-center gap-1.5 ${
                selectedModel === 'flakkai'
                  ? 'bg-cyan-500/25 text-cyan-200 border-cyan-400/50 shadow-md shadow-cyan-500/20 scale-105'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>🇲🇦 FLAKKAI Native</span>
            </button>
          </div>
        </div>

        {/* ─── API Setup Banner ─── */}
        {showApiKeyBanner && (
          <div className="shrink-0 p-4 bg-gradient-to-r from-teal-950/90 via-slate-900 to-cyan-950/90 border-b border-teal-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-bold text-teal-300 flex items-center gap-2">
                  <Key className="w-4 h-4 text-teal-400" />
                  Configuration de votre Clé API Gratuit (Gemini 2.0 Flash)
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pour débloquer la génération 100% dynamique illimitée sur toutes les spécialités médicales et traductions, entrez votre clé API gratuite Google.
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <input 
                  type="password"
                  placeholder="Collez votre clé API Gemini..."
                  value={tempKeyInput}
                  onChange={e => setTempKeyInput(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-white/15 text-white text-xs outline-none focus:border-teal-400 w-full sm:w-56"
                />
                <button 
                  onClick={handleSaveApiKey}
                  className="px-4 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors shrink-0">
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── Messages Area ─── */}
        <div ref={scrollRef} className="ios-chat-scroll flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 select-none opacity-80 py-12">
              <div className="w-16 h-16 rounded-3xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-inner">
                <Sparkles className="w-8 h-8 text-teal-400" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h4 className="font-bold text-white text-base">Assistant IA Médical FLAKKAI</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Posez vos questions en Français, Darija, Arabe ou Anglais sur le programme FMP Maroc, l'anatomie, les QCMs ou la physiopathologie.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, idx) => {
            const mine = msg.sender === 'me';
            const ai = msg.sender === 'flakkai';
            const bars = waveform(msg.id);

            return (
              <div key={msg.id} className={`msg-appear flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
                {/* Sender badge */}
                {!mine && (
                  <div className="flex items-center gap-1.5 mb-1 ml-9">
                    <span className="text-[11px] font-semibold text-teal-300 flex items-center gap-1">
                      {msg.senderName}
                    </span>
                  </div>
                )}

                <div className={`flex items-end gap-2.5 max-w-[85%] ${mine ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full shrink-0 text-[10px] font-bold flex items-center justify-center shadow-md ${
                    ai ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-teal-500/20' : 'bg-blue-600 text-white'
                  }`}>
                    {ai ? '✦' : 'EM'}
                  </div>

                  {/* Bubble */}
                  <div
                    onContextMenu={e => mine && msg.type === 'text' && !msg.isTyping && openCtx(e, msg.id)}
                    className={`rounded-2xl px-4 py-2.5 relative ${
                      mine ? 'glass-bubble-user text-white' : 'glass-bubble-ai text-slate-100'
                    }`}
                  >
                    {/* TYPING DOTS */}
                    {msg.isTyping && (
                      <div className="flex items-center gap-1.5 py-1 px-2">
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-[dot-bounce_0.8s_0ms_infinite]" />
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-[dot-bounce_0.8s_160ms_infinite]" />
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-[dot-bounce_0.8s_320ms_infinite]" />
                      </div>
                    )}

                    {/* TEXT CONTENT */}
                    {!msg.isTyping && msg.type === 'text' && editingId !== msg.id && (
                      <div>
                        <RenderContent text={msg.content} />
                        {msg.edited && <span className="text-[10px] opacity-40 ml-1">(modifié)</span>}
                      </div>
                    )}

                    {/* EDIT MODE */}
                    {editingId === msg.id && (
                      <div className="flex items-center gap-2">
                        <input autoFocus value={editValue} onChange={e => setEditValue(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') confirmEdit(); if (e.key === 'Escape') setEditingId(null); }}
                          className="bg-transparent text-white text-sm outline-none border-b border-teal-400 px-1 py-0.5" />
                        <button onClick={confirmEdit} className="text-emerald-400"><Check className="w-4 h-4" /></button>
                        <button onClick={() => setEditingId(null)} className="text-rose-400"><X className="w-4 h-4" /></button>
                      </div>
                    )}

                    {/* IMAGE */}
                    {msg.type === 'image' && msg.imageUrl && (
                      <div className="rounded-xl overflow-hidden max-w-xs mt-1">
                        <img src={msg.imageUrl} alt="" className="w-full max-h-56 object-cover" />
                      </div>
                    )}

                    {/* AUDIO PLAYER */}
                    {msg.type === 'audio' && msg.audioUrl && (
                      <div className="flex items-center gap-3 py-1 px-1 min-w-[200px]">
                        <button onClick={() => togglePlay(msg.id, msg.audioUrl!)}
                          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 hover:bg-white/30 transition-colors">
                          <span>{playingId === msg.id ? '⏸' : '▶'}</span>
                        </button>
                        <div className="flex-1 flex items-center gap-1 h-6">
                          {bars.map((h, i) => (
                            <div key={i} className={`flex-1 rounded-full bg-teal-400/60 ${playingId === msg.id ? 'animate-pulse' : ''}`}
                              style={{ height: `${h}%` }} />
                          ))}
                        </div>
                        <span className="text-xs opacity-70 font-mono">{msg.audioDuration || '0:00'}</span>
                      </div>
                    )}
                  </div>
                </div>

                <span className="text-[10px] text-slate-500 mt-1 mx-11 font-mono">
                  {fmtTime(msg.timestamp)}
                </span>
              </div>
            );
          })}
        </div>

        {/* ─── Recording Bar ─── */}
        {isRecording && (
          <div className="shrink-0 flex items-center gap-3 px-4 py-2 bg-rose-500/10 border-t border-rose-500/20 text-rose-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="flex-1">Enregistrement vocal en cours…</span>
            <span className="font-mono font-bold">{fmtDur(recordingSeconds)}</span>
          </div>
        )}

        {/* ─── iOS Glass Input Bar ─── */}
        <div className="shrink-0 p-3.5 bg-slate-950/90 border-t border-white/10">
          <form onSubmit={sendText} className="flex items-center gap-2.5">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />

            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors">
              <ImageIcon className="w-5 h-5" />
            </button>

            <button type="button" onClick={toggleRecording}
              className={`p-2 rounded-xl transition-all ${
                isRecording ? 'bg-rose-500/20 text-rose-400 animate-pulse' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}>
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <div className="flex-1 flex items-center px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 focus-within:border-teal-400/50 transition-colors">
              <input ref={inputRef} type="text" value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) sendText(); }}
                disabled={isRecording}
                placeholder={isRecording ? '🎤 Enregistrement...' : 'Poser une question ou coller votre clé API...'}
                className="w-full bg-transparent text-white text-sm outline-none placeholder:text-slate-500" />
            </div>

            {inputValue.trim() && !isRecording && (
              <button type="submit" className="w-9 h-9 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-teal-500/25 transition-all shrink-0">
                <Send className="w-4 h-4 font-bold" />
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
