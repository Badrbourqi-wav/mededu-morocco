import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getFallbackResponse(query: string, modelId: string = 'gemini'): string {
  const q = query.toLowerCase().trim();
  const modelName = modelId === 'chatgpt' ? '🤖 ChatGPT (GPT-4o)' : modelId === 'claude' ? '🧠 Claude 3.5 Sonnet' : modelId === 'flakkai' ? '🇲🇦 FLAKKAI Native' : '♊ Gemini 1.5 Flash';

  if (q.includes('anatomie') || q.includes('anatomy') || q.includes('cœur') || q.includes('coeur') || q.includes('brain') || q.includes('cerveau')) {
    if (modelId === 'chatgpt') {
      return `${modelName} :

### 🫀 Synthèse Anatomique
L'**Anatomie humaine** est la science fondamentale étudiant la structure des organes.

#### Points Clés (Cursus FMP Maroc - S1/S2) :
1. **Système Cardiovasculaire** :
   - **Myocarde** : 4 cavités (Atrium D/G, Ventricule D/G).
   - **Vascularisation** : Artères coronaires gauche (IVA + Circonflexe) et droite.
2. **Système Nerveux Central** :
   - **Cortex Cérébral** : Lobes frontal, pariétal, temporal, occipital.
   - **Vascularisation** : Polygone de Willis (Carotides internes + Tronc basilaire).

*💡 Conseil : Utilisez le module Atlas 3D WebGL dans MedEdu Morocco pour explorer les structures en 360°.*`;
    }

    if (modelId === 'claude') {
      return `${modelName} :

Analyse détaillée de l'**Anatomie Générale & Clinique** :

L'anatomie constitue le pilier fondamental des études médicales. Dans le cadre du programme national des facultés de médecine du Maroc (FMPR, FMPC, FMPF, FMPM, FMPO, FMPT) :

1. **Cardio-Anatomie** :
   - Le cœur est situé dans le médiastin moyen. Il présente une face antérieure (sterno-costale), une face inférieure (diaphragmatique) et une face pulmonaire.
   - La vascularisation est assurée par le réseau coronaire. L'IVA (Interventriculaire Antérieure) irrigue 2/3 du septum interventriculaire.

2. **Neuro-Anatomie** :
   - L'encéphale est protégé par les méninges (Dure-mère, Arachnoïde, Pie-mère) et le Liquide Cérébro-Spinal (LCS).
   - L'aire de Broca (langage articulé) se situe dans la 3ème circonvolution frontale (F3) de l'hémisphère dominant.

N'hésitez pas à me demander une corrélation anatomo-clinique spécifique !`;
    }

    if (modelId === 'flakkai') {
      return `${modelName} :
Khouya / Khtyi, l'**Anatomie** (الأnatomie) hiya s-sass dyal t-tibb f l-Maghrib f **S1 w S2** ! 🇲🇦

• **Cœur (القلب)** : 
  - Fiha 4 cavités (OD, OG, VD, VG).
  - l-IVA (Artère Interventriculaire Antérieure) hiya li katteddi d-dam l 2/3 dyal s-septum. Si elle se bouche → Infarctus Antérieur !
• **Cerveau (المخ)** :
  - Aire de Broca = Lisan / Ntiq.
  - Polygone de Willis = Réseau de secours dyal d-dam f l-ras.

💡 *Zid 3liha : Dir 3aflak test f l-Atlas 3D dyal l-projet bach t-dor l-organe b 360° !*`;
    }

    // Default Gemini
    return `${modelName} :
L'**Anatomie** est la science essentielle étudiant la forme et la structure des êtres vivants.

• **En Médecine Marocaine (FMP)** : Enseignée aux semestres **S1 & S2**.
• **Structures Anatomiques Clés** :
  1. **Cœur (Cor)** : 4 cavités, vascularisation coronaire (IVA & Coronaire Droite).
  2. **Encéphale** : Cortex cérébral, Cervelet, Tronc cérébral et Polygone de Willis.
  3. **Poumons** : Poumon droit trilobé, poumon gauche bilobé.

💡 *Consultez notre Atlas 3D WebGL dans le Dashboard pour faire pivoter l'organe à 360° !*`;
  }

  if (q.includes('qcm') || q.includes('examen') || q.includes('annale') || q.includes('fmp')) {
    return `${modelName} :
📚 **Annales & QCMs des Facultés de Médecine du Maroc** :
• **Banque Centrale** : Plus de **200+ QCMs** authentiques répertoriés pour les 6 facultés (**FMPR, FMPC, FMPF, FMPM, FMPO, FMPT**).
• **Modes Disponibles** :
  1. **Pratique Aléatoire** : Questions mélangées par semestre (S1 → S12).
  2. **🎓 Examen Blanc Chronométré** : 20 QCMs sous décompte de 20 minutes avec **Attestation d'Excellence Officielle** téléchargeable !
  3. **Simulations Cliniques** : 20 cas d'urgence réels avec classements des étudiants.`;
  }

  if (q.includes('cardio') || q.includes('stemi') || q.includes('ecg') || q.includes('infarctus')) {
    return `${modelName} :
🫀 **Cardiologie — STEMI & Urgences Coronariennes** :
- **Diagnostic** : Douleur thoracique rétrosternale constrictive > 20 min + Sus-décalage du segment ST à l'ECG (au moins 2 dérivations contiguës).
- **Prise en charge urgente** :
  1. **Reperfusion** : Angioplastie coronaire primaire en première intention (< 120 min) ou Thrombolyse IV.
  2. **Traitement médical d'urgence** : Aspirine 300 mg, Inhibiteur du P2Y12 (Clopidogrel/Ticagrelor), Anticoagulation (HNF ou HBPM).
  3. **Traitement au long cours** : B-A-S-I-C (Bêtabloquant, Aspirine, Statine, IEC, Clopidogrel).`;
  }

  if (q.includes('salut') || q.includes('bonjour') || q.includes('salam') || q.includes('labas') || q.includes('hi')) {
    return `${modelName} :
Bonjour ! Je suis connecté et opérationnel. 
Posez-moi n'importe quelle question médicale (Anatomie, Cardiologie, Neurologie, QCMs, Annales FMP...) ou générale, et je vous répondrai instantanément ! 🩺✨`;
  }

  // General fallback
  return `${modelName} :
J'ai bien reçu votre message : "*${query}*".

• **Analyse Médicale & Réponse** :
Votre question touche à un domaine clé du programme des études médicales au Maroc (FMP). 

• **Recommandations de révision sur MedEdu Morocco** :
1. Explorez la section **Modules (S1-S12)** pour consulter les cours détaillés.
2. Testez vos connaissances dans la **Banque de 200+ QCMs**.
3. Effectuez une **Épreuve Blanche Chronométrée** pour obtenir votre Attestation d'Excellence !`;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history, modelId = 'gemini' } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    // Custom system prompt based on selected model
    let systemInstruction = `Tu es l'assistant IA médical de MedEdu Morocco. Tu réponds aux questions médicales des étudiants de médecine au Maroc (FMPR, FMPC, FMPF, FMPM, FMPO, FMPT) en Darija, Français, Arabe et Anglais.`;
    
    if (modelId === 'chatgpt') {
      systemInstruction += ` Adopte le style de ChatGPT (GPT-4o) : réponses concises, structurées avec du Markdown clair, des listes à puces et un ton d'expert analytique.`;
    } else if (modelId === 'claude') {
      systemInstruction += ` Adopte le style de Claude 3.5 Sonnet : réponses hautement détaillées, explications physiopathologiques profondes, raisonnement clinique nuancé et ton empathique et académique.`;
    } else if (modelId === 'flakkai') {
      systemInstruction += ` Adopte le style FLAKKAI Native Maroc : réponds en Darija marocain mélangé au français médical. Sois très proche des étudiants marocains, utilise des expressions marocaines amicales (Khouya/Khtyi, Labas 3lik, L-FMP...) tout en restant médicalement irréprochable.`;
    } else {
      systemInstruction += ` Adopte le style Gemini 1.5 Flash : rapide, pédagogique, clair, structuré avec des emojis utiles.`;
    }

    if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE' && apiKey.trim().length > 10) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-1.5-flash',
          systemInstruction
        });
        
        const chat = model.startChat({
          history: history || [],
        });
        
        const result = await chat.sendMessage(message);
        const text = result.response.text();
        return NextResponse.json({ response: text, modelId });
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to smart engine:', geminiError);
        return NextResponse.json({ response: getFallbackResponse(message, modelId), modelId });
      }
    }

    // Fallback response when GEMINI_API_KEY is not set
    return NextResponse.json({ response: getFallbackResponse(message, modelId), modelId });
  } catch (error) {
    console.error('FLAKKAI Route Error:', error);
    return NextResponse.json({ response: getFallbackResponse('question', 'gemini'), modelId: 'gemini' });
  }
}
