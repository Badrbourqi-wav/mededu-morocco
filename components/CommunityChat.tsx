'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Mic, X, Square, Play, Pause, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  initials: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'audio';
  audioUrl?: string;
}

const MOCK_MESSAGES: Message[] = [
  { id: '1', sender: 'Amine B.', initials: 'AB', content: 'Quelqu\'un peut m\'expliquer les nouveaux paliers de traitement de l\'HTA selon la SFC ?', timestamp: '10:30', type: 'text' },
  { id: '2', sender: 'Sara M.', initials: 'SM', content: 'Le palier 1 c\'est souvent une bithérapie d\'emblée (IEC/ARA2 + diurétique thiazidique ou inhibiteur calcique).', timestamp: '10:32', type: 'text' },
  { id: '3', sender: 'Youssef R.', initials: 'YR', content: 'Merci Sara ! Vous avez des astuces pour l\'ECG en cardio ? Je galère avec les blocs de branche.', timestamp: '10:35', type: 'text' },
  { id: '4', sender: 'Fatima Z.', initials: 'FZ', content: 'Regarde V1 et V6. Oreilles de lapin en V1 = BBD. Aspect rS en V1 et grand R en V6 = BBG.', timestamp: '10:40', type: 'text' },
  { id: '5', sender: 'Karim O.', initials: 'KO', content: 'Je viens de tomber sur ce cas clinique, ça vous dit quelque chose ?', timestamp: '10:45', type: 'text' },
  { id: '6', sender: 'Karim O.', initials: 'KO', content: '', timestamp: '10:46', type: 'image' },
  { id: '7', sender: 'Amine B.', initials: 'AB', content: 'On dirait un OAP cardiogénique sur la radio.', timestamp: '10:50', type: 'text' },
  { id: '8', sender: 'Sara M.', initials: 'SM', content: 'Oui, cardiomégalie + redistribution vasculaire aux sommets.', timestamp: '10:52', type: 'text' }
];

export default function CommunityChat() {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'Moi',
      initials: 'MO',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, we'd upload and get a URL. Here we just mock it.
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'Moi',
        initials: 'MO',
        content: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'image'
      };
      setMessages([...messages, newMessage]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        
        const newMessage: Message = {
          id: Date.now().toString(),
          sender: 'Moi',
          initials: 'MO',
          content: 'Audio message',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'audio',
          audioUrl: url
        };
        setMessages(prev => [...prev, newMessage]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-screen w-full bg-slate-900 border-l border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Communauté MedEdu</h2>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-slate-400">47 étudiants en ligne</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start space-x-3 ${msg.sender === 'Moi' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
              {msg.initials}
            </div>
            <div className={`flex flex-col ${msg.sender === 'Moi' ? 'items-end' : 'items-start'} max-w-[75%]`}>
              <div className="flex items-baseline space-x-2 mb-1">
                <span className="text-sm font-semibold text-slate-300">{msg.sender}</span>
                <span className="text-xs text-slate-500">{msg.timestamp}</span>
              </div>
              
              {msg.type === 'text' && (
                <div className={`px-4 py-2 rounded-2xl ${msg.sender === 'Moi' ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'}`}>
                  {msg.content}
                </div>
              )}
              
              {msg.type === 'image' && (
                <div className="w-48 h-48 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-500 overflow-hidden">
                  <ImageIcon className="w-8 h-8 opacity-50" />
                </div>
              )}
              
              {msg.type === 'audio' && (
                <div className={`px-4 py-2 rounded-2xl flex items-center space-x-3 ${msg.sender === 'Moi' ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'}`}>
                  <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Play className="w-4 h-4" />
                  </button>
                  <div className="w-24 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-white rounded-full"></div>
                  </div>
                  {msg.audioUrl && (
                    <audio src={msg.audioUrl} controls className="hidden" />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <form onSubmit={handleSendText} className="flex items-center space-x-2">
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
            className="p-2.5 text-slate-400 hover:text-teal-400 hover:bg-slate-800 rounded-full transition-colors"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          
          <button 
            type="button"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={stopRecording}
            className={`p-2.5 rounded-full transition-all ${isRecording ? 'text-red-500 bg-red-500/10 animate-pulse' : 'text-slate-400 hover:text-teal-400 hover:bg-slate-800'}`}
          >
            {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Écrivez un message..."
            className="flex-1 bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2.5 rounded-full focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
          />
          
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2.5 bg-teal-500 text-white rounded-full hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
