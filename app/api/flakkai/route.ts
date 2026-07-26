import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();

  if (q.includes('anatomie') || q.includes('anatomy') || q.includes('cœur') || q.includes('coeur') || q.includes('brain') || q.includes('cerveau')) {
    return `🤖 **FLAKKAI AI (Anatomie & 3D)** :
L'**Anatomie** (الأnatomie) est la science qui étude la structure et la forme des êtres vivants.
• **En Médecine Marocaine (FMP)** : L'anatomie est enseignée au semestre **S1 & S2**.
• **Structures Clés** :
  1. **Cœur (Cor)** : 4 cavités (OD, OG, VD, VG), vascularisé par l'IVA et la Coronaire Droite.
  2. **Encéphale** : Cortex cérébral (aires de Broca & Wernicke), Cervelet et Polygone de Willis.
  3. **Poumons** : Poumon droit trilobé, poumon gauche bilobé (incisure cardiaque).

💡 *Astuce PFE* : Consultez notre section **🎨 Anatomie & Schémas 3D** dans le Dashboard pour faire pivoter l'organe à 360° !`;
  }

  if (q.includes('qcm') || q.includes('examen') || q.includes('annale') || q.includes('fmp')) {
    return `🤖 **FLAKKAI AI (QCMs & Annales FMP)** :
Dans notre plateforme MedEdu Morocco :
• Vous avez accès à plus de **200+ QCMs** tirés des annales officielles des 6 facultés de médecine du Maroc (**FMPR, FMPC, FMPF, FMPM, FMPO, FMPT**).
• Chaque question comporte une correction détaillée avec le signe clinique pathognomonique.
• Essayez le mode **🎓 Examen Blanc & Attestation** pour tester vos connaissances sous chrono de 20 minutes !`;
  }

  if (q.includes('cardio') || q.includes('stemi') || q.includes('ecg') || q.includes('infarctus')) {
    return `🤖 **FLAKKAI AI (Cardiologie - STEMI & HTA)** :
• **STEMI (Infarctus du Myocarde avec sus-décalage ST)** : Urgence vitale absolue !
  - **Diagnostic** : Douleur rétrosternale constrictive + Sus-décalage ST à l'ECG.
  - **Traitement** : Reperfusion urgente par Angioplastie primaire (ou Thrombolyse si délai > 120 min).
  - **Traitement médical** : B-A-S-I-C (Bêtabloquant, Aspirine + Statine, IEC, Clopidogrel).`;
  }

  if (q.includes('neuro') || q.includes('avc') || q.includes('broca') || q.includes('wernicke')) {
    return `🤖 **FLAKKAI AI (Neurologie - AVC Ischémique)** :
• **AVC Ischémique** : Début brutal d'un déficit focal (hémiplégie, aphasie).
  - **Urgence** : Scanner cérébral sans injection IMMÉDIAT pour éliminer l'hémorragie.
  - **Thrombolyse IV** par rtPA si délai < 4h30 après le début des symptômes.
  - **Aphasie de Broca** : Atteinte de l'aire motrice du langage (Lobe frontal gauche).`;
  }

  if (q.includes('salut') || q.includes('bonjour') || q.includes('salam') || q.includes('labas') || q.includes('sba7')) {
    return `🤖 **FLAKKAI AI** : Salam ! Labas 3lik ? Je suis **FLAKKAI**, ton assistant IA médical personnel. 
Je suis là pour t'aider dans tes révisions de médecine (S1 à S12), répondre à tes questions sur l'anatomie, la cardiologie, les annales FMP, ou t'expliquer n'importe quel concept en **Darija, Français, Arabe ou Anglais** ! 
Pose-moi ta question ! 🩺✨`;
  }

  // General fallback response for any medical or general question
  return `🤖 **FLAKKAI AI** :
Merci pour votre question : "*${query}*".

• **Réponse Médicale & Académique** :
Je comprends votre demande en médecine / culture générale. 
Dans le cursus des Facultés de Médecine du Maroc (FMP), ce sujet est abordé avec une grande rigueur diagnostique et thérapeutique.

• **Recommandation de Révision** :
1. Consultez les cours correspondants dans l'onglet **Modules (S1-S12)**.
2. Pratiquez les questions associées dans la **Banque de QCMs**.
3. N'hésitez pas à poser d'autres questions précises sur le diagnostic, la physiopathologie ou le traitement !

*(Note : Pour une réponse IA générative en temps réel via Google Gemini 1.5 Flash, assurez-vous que GEMINI_API_KEY est configurée dans votre fichier .env.local)*`;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE' && apiKey.trim().length > 10) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
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
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to smart engine:', geminiError);
        return NextResponse.json({ response: getFallbackResponse(message) });
      }
    }

    // Fallback response when GEMINI_API_KEY is not set
    return NextResponse.json({ response: getFallbackResponse(message) });
  } catch (error) {
    console.error('FLAKKAI Route Error:', error);
    return NextResponse.json({ response: getFallbackResponse('question') });
  }
}
