import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function fetchFreeScraperAPI(query: string, systemPrompt: string): Promise<string> {
  const fullPrompt = `System: ${systemPrompt}\nUser: ${query}`;
  
  // 1. Try Pollinations modern endpoint
  try {
    const res = await fetch(`https://text.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}`, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(6000)
    });
    if (res.ok) {
      const text = await res.text();
      if (text && text.length > 15 && !text.includes('429') && !text.includes('Payment Required') && !text.includes('error')) {
        return text;
      }
    }
  } catch (e) {
    // Silent catch
  }

  // 2. Try Kastg proxy
  try {
    const res = await fetch(`https://api.kastg.xyz/api/ai/chatgptV4?prompt=${encodeURIComponent(fullPrompt)}`, {
      method: 'GET',
      signal: AbortSignal.timeout(6000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.result?.[0]?.response) {
        return data.result[0].response;
      }
    }
  } catch (e) {
    // Silent catch
  }

  return "";
}

async function callOpenAI(apiKey: string, modelId: string, systemInstruction: string, message: string, history: any[]) {
  const openAIModel = modelId === 'chatgpt' ? 'gpt-4o' : modelId === 'claude' ? 'gpt-4o-mini' : 'gpt-4o-mini';
  
  const messages = [
    { role: 'system', content: systemInstruction },
    ...(history || []).map(h => ({
      role: h.role === 'model' ? 'assistant' : 'user',
      content: h.parts?.[0]?.text || ''
    })),
    { role: 'user', content: message }
  ];

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: openAIModel,
      messages
    })
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson?.error?.message || `OpenAI API Error ${res.status}`);
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || '';
}

export async function POST(req: NextRequest) {
  try {
    const { message, history, modelId = 'gemini', clientApiKey } = await req.json();
    
    // Key prioritization: clientKey -> env GEMINI_API_KEY -> env OPENAI_API_KEY
    const apiKey = (clientApiKey && clientApiKey.trim().length > 10) ? clientApiKey.trim() : (process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || '');

    // Persona System Instructions
    let systemInstruction = "";
    if (modelId === 'chatgpt') {
      systemInstruction = `Tu es ChatGPT (GPT-4o), développé par OpenAI. Adopte le style de ChatGPT : des réponses très bien structurées avec du Markdown clair, des titres et des listes à puces synthétiques avec un ton d'expert analytique, neutre et précis. Tu réponds de manière 100% dynamique et non-scriptée à TOUTES les questions (médecine, sciences, informatique, traduction Darija/Français/Anglais/Arabe, etc.).`;
    } else if (modelId === 'claude') {
      systemInstruction = `Tu es Claude 3.5 Sonnet, développé par Anthropic. Adopte le style de Claude : des explications hautement détaillées, un raisonnement physiopathologique et scientifique approfondi, une approche nuancée et un ton élégant, académique et pédagogique. Tu réponds de manière dynamique et non-scriptée à TOUTES les questions.`;
    } else if (modelId === 'flakkai') {
      systemInstruction = `Tu es FLAKKAI Native, l'assistant IA médical et académique marocain N°1. Tu réponds en Darija marocain mélangé au français médical. Sois très proche des étudiants marocains (expressions amicales comme Khouya/Khtyi, Labas 3lik...), tout en restant irréprochable sur la médecine et les annales des facultés du Maroc (FMPR, FMPC, FMPF, FMPM, FMPO, FMPT). Tu traduis et réponds à toutes les questions de manière vivante et naturelle.`;
    } else {
      systemInstruction = `Tu es Gemini 2.0 Flash, développé par Google. Adopte un style ultra-rapide, clair, structuré, moderne et pédagogique avec des emojis appropriés. Tu réponds de manière 100% dynamique, intelligente et non-scriptée à TOUTES les questions posées dans tous les domaines (médecine, codage, langues, traduction Darija, mathématiques, histoire...).`;
    }

    // 1. OpenAI Key Handler (starts with sk-)
    if (apiKey && apiKey.startsWith('sk-')) {
      try {
        const text = await callOpenAI(apiKey, modelId, systemInstruction, message, history);
        if (text) {
          return NextResponse.json({ response: text, modelId, isFallback: false });
        }
      } catch (openAIErr: any) {
        console.warn('OpenAI Call Failed:', openAIErr.message);
      }
    }

    // 2. Gemini Key Handler (starts with AIzaSy)
    if (apiKey && apiKey.startsWith('AIzaSy')) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const targetModels = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash-latest'];
      
      for (const mName of targetModels) {
        try {
          const model = genAI.getGenerativeModel({ model: mName, systemInstruction });
          const chat = model.startChat({ history: history || [] });
          const result = await chat.sendMessage(message);
          const text = result.response.text();
          if (text) {
            return NextResponse.json({ response: text, modelId, isFallback: false });
          }
        } catch (geminiErr) {
          console.warn(`Gemini model ${mName} failed:`, geminiErr);
        }
      }
    }

    // 3. Free Scraper Fallback
    const scrapedText = await fetchFreeScraperAPI(message, systemInstruction);
    if (scrapedText && scrapedText.trim().length > 10) {
      return NextResponse.json({ response: scrapedText, modelId, isFallback: false });
    }

    // 4. Return clear fallback signal to activate UI setup banner
    return NextResponse.json({ 
      response: `[CLÉ API REQUISE] Votre clé API (OpenAI ou Gemini) nécessite un quota actif. Veuillez entrer une clé API Gemini 2.0 Flash (gratuite sur Google AI Studio) pour débloquer la génération IA 100% dynamique illimitée sur toutes les spécialités et traductions.`,
      modelId, 
      isFallback: true 
    });

  } catch (error) {
    console.error('FLAKKAI Route Error:', error);
    return NextResponse.json({ 
      response: `[ERREUR API] Connexion impossible. Veuillez vérifier votre clé API ou votre réseau.`, 
      modelId: 'gemini', 
      isFallback: true 
    });
  }
}
