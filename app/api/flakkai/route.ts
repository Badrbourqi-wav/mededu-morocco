import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: `Tu es FLAKKAI, l'assistant IA médical de MedEdu Morocco. Tu comprends et réponds en Darija marocain, Arabe, Français, et Anglais — quelle que soit la langue utilisée par l'étudiant. Tu es spécialisé en médecine (anatomie, physiologie, pharmacologie, sémiologie, cardiologie, neurologie, pneumologie, gastro-entérologie, pédiatrie, gynécologie, urgences), mais tu peux aussi aider sur l'histoire, les maths, la physique et la culture générale. Pour les questions médicales marocaines, tu fais référence aux annales et examens des facultés de médecine du Maroc (FMPR Rabat, FMPC Casablanca, FMPF Fès, FMPM Marrakech, FMPO Oujda, FMPT Tanger). Réponds toujours de façon claire, structurée et pédagogique. Si l'étudiant écrit en Darija (ex: 'chno hiya l anatomie?'), réponds en Darija mélangé français. Sois chaleureux, encourageant et précis.`
    });
    
    const chat = model.startChat({
      history: history || [],
    });
    
    const result = await chat.sendMessage(message);
    const text = result.response.text();
    
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('FLAKKAI API Error:', error);
    return NextResponse.json({ response: 'Désolé, une erreur est survenue. Réessaie dans un instant !' }, { status: 500 });
  }
}
