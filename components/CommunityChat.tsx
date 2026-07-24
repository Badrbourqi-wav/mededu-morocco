'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Mic, MicOff, MessageCircle, Users, Play, Pause } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  initials: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'audio';
  audioUrl?: string;
  audioDuration?: string;
  imageUrl?: string;
}

const MOCK_MESSAGES: Message[] = [
  { id: '1', sender: 'Amine B.', initials: 'AB', content: 'Quelqu\'un peut m\'expliquer les nouveaux paliers HTA selon la SFC ?', timestamp: '10:30', type: 'text' },
  { id: '2', sender: 'Sara M.', initials: 'SM', content: 'Palier 1 : bithérapie IEC/ARA2 + diurétique thiazidique ou inhibiteur calcique.', timestamp: '10:32', type: 'text' },
  { id: '3', sender: 'Youssef R.', initials: 'YR', content: 'Vous avez des astuces pour l\'ECG ? Je galère avec les blocs de branche 😅', timestamp: '10:35', type: 'text' },
  { id: '4', sender: 'Fatima Z.', initials: 'FZ', content: 'V1 et V6 ! Oreilles de lapin V1 = BBD. Grand R en V6 + rS en V1 = BBG.', timestamp: '10:40', type: 'text' },
  { id: '5', sender: 'Karim O.', initials: 'KO', content: 'PNLAT Maroc — qui a les nouveaux critères de la TB latente ? je cherche le document MS 2023', timestamp: '10:45', type: 'text' },
  { id: '6', sender: 'Amine B.', initials: 'AB', content: 'Je l\'ai ! IGRA positif + IDR > 10mm chez immunocompétent = traitement préventif 3HP.', timestamp: '10:50', type: 'text' },
  { id: '7', sender: 'Sara M.', initials: 'SM', content: 'Quelqu\'un a les annales de la FMPR 2023 cardio ? On prépare l\'exam de S5 ensemble ce week-end 💪', timestamp: '10:55', type: 'text' },
  { id: '8', sender: 'Karim O.', initials: 'KO', content: 'Oui ! Rejoignez la section Annales sur MedEdu, toutes les épreuves y sont avec corrections 🎯', timestamp: '11:00', type: 'text' },
];

export default function CommunityChat() {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      setRecordingSeconds(0);
    }
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, [isRecording]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'Badr Bourqi',
      initials: 'BB',
      content: inputValue.trim(),
      timestamp: now(),
      type: 'text',
    }]);
    setInputValue('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'Badr Bourqi',
      initials: 'BB',
      content: '',
      timestamp: now(),
      type: 'image',
      imageUrl,
    }]);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Toggle recording — click once to start, click again to stop & send
  const toggleRecording = async () => {
    if (!isRecording) {
      // START recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioChunksRef.current = [];

        // Prefer webm, fallback to whatever browser supports
        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : MediaRecorder.isTypeSupported('audio/webm')
          ? 'audio/webm'
          : 'audio/ogg;codecs=opus';

        const mediaRecorder = new MediaRecorder(stream, { mimeType });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          // Stop all tracks to release mic
          stream.getTracks().forEach(track => track.stop());

          if (audioChunksRef.current.length === 0) return;

          const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
          const url = URL.createObjectURL(audioBlob);
          const durationSecs = recordingSeconds;

          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            sender: 'Badr Bourqi',
            initials: 'BB',
            content: 'Message vocal',
            timestamp: now(),
            type: 'audio',
            audioUrl: url,
            audioDuration: formatTime(durationSecs),
          }]);
        };

        // Request data every 100ms to avoid empty chunks
        mediaRecorder.start(100);
        setIsRecording(true);
      } catch (err) {
        console.error('Microphone access denied:', err);
        alert('Accès au microphone refusé. Veuillez autoriser le microphone dans les paramètres de votre navigateur.');
      }
    } else {
      // STOP recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    }
  };

  const toggleAudioPlay = (msgId: string, audioUrl: string) => {
    // Stop currently playing audio
    if (playingId && playingId !== msgId) {
      audioRefs.current[playingId]?.pause();
    }

    if (!audioRefs.current[msgId]) {
      audioRefs.current[msgId] = new Audio(audioUrl);
      audioRefs.current[msgId].onended = () => setPlayingId(null);
    }

    const audio = audioRefs.current[msgId];
    if (playingId === msgId) {
      audio.pause();
      setPlayingId(null);
    } else {
      audio.play();
      setPlayingId(msgId);
    }
  };

  const isMine = (sender: string) => sender === 'Badr Bourqi';

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">Communauté MedEdu Maroc</h2>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-slate-400">47 étudiants en ligne</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1.5 bg-slate-800/60 px-3 py-1.5 rounded-full">
          <Users className="w-3.5 h-3.5 text-teal-400" />
          <span className="text-[11px] font-semibold text-teal-300">FMPR · FMPC · FMPF</span>
        </div>
      </div>

      {/* ── Messages Area ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4">

        {/* Empty state */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-16 select-none">
            <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-teal-500/40" />
            </div>
            <p className="text-slate-400 text-sm font-medium">Aucun message pour l'instant</p>
            <p className="text-slate-600 text-xs mt-1">Soyez le premier à écrire 👋</p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${isMine(msg.sender) ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mb-1 ${
              isMine(msg.sender)
                ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-slate-900'
                : 'bg-slate-800 text-slate-300'
            }`}>
              {msg.initials}
            </div>

            {/* Bubble */}
            <div className={`flex flex-col max-w-[72%] ${isMine(msg.sender) ? 'items-end' : 'items-start'}`}>
              {!isMine(msg.sender) && (
                <span className="text-[11px] text-slate-500 mb-1 ml-1">{msg.sender}</span>
              )}

              {/* TEXT */}
              {msg.type === 'text' && (
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMine(msg.sender)
                    ? 'bg-teal-600 text-white rounded-br-sm'
                    : 'bg-slate-800 text-slate-200 rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              )}

              {/* IMAGE */}
              {msg.type === 'image' && (
                <div className="rounded-2xl overflow-hidden border border-slate-700 max-w-[220px]">
                  {msg.imageUrl ? (
                    <img src={msg.imageUrl} alt="Image partagée" className="w-full h-auto object-cover" />
                  ) : (
                    <div className="w-48 h-36 bg-slate-800 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-slate-600" />
                    </div>
                  )}
                </div>
              )}

              {/* AUDIO */}
              {msg.type === 'audio' && msg.audioUrl && (
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl min-w-[180px] ${
                  isMine(msg.sender)
                    ? 'bg-teal-600 text-white rounded-br-sm'
                    : 'bg-slate-800 text-slate-200 rounded-bl-sm'
                }`}>
                  <button
                    onClick={() => toggleAudioPlay(msg.id, msg.audioUrl!)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors shrink-0"
                  >
                    {playingId === msg.id
                      ? <Pause className="w-4 h-4" />
                      : <Play className="w-4 h-4 ml-0.5" />
                    }
                  </button>
                  {/* Waveform bars */}
                  <div className="flex items-center gap-0.5 h-6 flex-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-full bg-white/40"
                        style={{ height: `${Math.random() * 70 + 20}%` }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] opacity-70 shrink-0">
                    {msg.audioDuration || '0:00'}
                  </span>
                </div>
              )}

              <span className="text-[10px] text-slate-600 mt-1 mx-1">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recording Indicator ── */}
      {isRecording && (
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-t border-red-500/20 shrink-0">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs text-red-400 font-medium">Enregistrement en cours…</span>
          <span className="ml-auto text-xs text-red-400 font-mono font-bold">{formatTime(recordingSeconds)}</span>
          <span className="text-xs text-red-400/60">Appuyez à nouveau sur 🎤 pour envoyer</span>
        </div>
      )}

      {/* ── Input Bar ── */}
      <div className="px-4 py-3 border-t border-slate-800 bg-slate-900/80 shrink-0">
        <form onSubmit={handleSendText} className="flex items-center gap-2">
          {/* Image upload */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Envoyer une image"
            className="p-2.5 text-slate-500 hover:text-teal-400 hover:bg-slate-800 rounded-full transition-colors shrink-0"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Mic — click once = start, click again = stop & send */}
          <button
            type="button"
            onClick={toggleRecording}
            title={isRecording ? 'Arrêter l\'enregistrement' : 'Enregistrer un message vocal'}
            className={`p-2.5 rounded-full transition-all shrink-0 ${
              isRecording
                ? 'text-red-400 bg-red-500/15 border border-red-500/40 animate-pulse'
                : 'text-slate-500 hover:text-teal-400 hover:bg-slate-800'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text input */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSendText(); }}
            placeholder={isRecording ? '🎤 En train d\'enregistrer...' : 'Écrire un message...'}
            disabled={isRecording}
            className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 px-4 py-2.5 rounded-full text-sm focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 transition-all disabled:opacity-50"
          />

          {/* Send button */}
          <button
            type="submit"
            disabled={!inputValue.trim() || isRecording}
            className="p-2.5 bg-teal-500 text-white rounded-full hover:bg-teal-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
