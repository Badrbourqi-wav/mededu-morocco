import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function fetchFreeScraperAPI(query: string, systemPrompt: string): Promise<string> {
  const fullPrompt = `System: ${systemPrompt}\nUser: ${query}`;
  
  // Scraper 1: Pollinations AI (Text endpoint)
  try {
    const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}`, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      const text = await res.text();
      if (text && text.length > 10 && !text.includes('429') && !text.includes('error')) return text;
    }
  } catch (e) {
    console.log("Pollinations API failed");
  }

  // Scraper 2: DuckDuckGo AI format proxy (using api.kastg.xyz)
  try {
    const res = await fetch(`https://api.kastg.xyz/api/ai/chatgptV4?prompt=${encodeURIComponent(fullPrompt)}`, {
      method: 'GET',
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.result && data.result[0] && data.result[0].response) {
        return data.result[0].response;
      }
    }
  } catch (e) {
    console.log("Kastg API failed");
  }

  // Scraper 3: OIV API (Free GPT proxy)
  try {
    const res = await fetch(`https://api.oiv.icu/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ]
      }),
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.choices?.[0]?.message?.content) {
        return data.choices[0].message.content;
      }
    }
  } catch (e) {
    console.log("OIV API failed");
  }

  return "";
}

async function getFallbackResponse(query: string, modelId: string = 'gemini', systemInstruction: string): Promise<string> {
  const modelName = modelId === 'chatgpt' ? '🤖 ChatGPT (GPT-4o)' 
                  : modelId === 'claude' ? '🧠 Claude 3.5 Sonnet' 
                  : modelId === 'flakkai' ? '🇲🇦 FLAKKAI Native (Maroc)' 
                  : '♊ Gemini 1.5 Flash';

  // Try real scraper API first!
  const scrapedResponse = await fetchFreeScraperAPI(query, systemInstruction);
  if (scrapedResponse) {
    return `${modelName} :\n\n${scrapedResponse}`;
  }

  // If ALL free scrapers fail (due to Cloudflare, rate limits, or IP bans), use advanced contextual fallback
  const q = query.toLowerCase().trim();
  const cleanQ = query.replace(/[^\w\s\u0600-\u06FF]/gi, '').trim();

  // 1. CARDIOLOGIE & URGENCES CORONARIENNES
  if (q.includes('cardio') || q.includes('stemi') || q.includes('ecg') || q.includes('infarctus') || q.includes('hta') || q.includes('cœur') || q.includes('coeur')) {
    if (modelId === 'chatgpt') {
      return `${modelName} :

### 🫀 Synthèse Cardiologique & Urgences (S5 / FMP)

#### 1. STEMI (Infarctus du Myocarde avec sus-décalage ST)
- **Triade diagnostique** : Douleur thoracique rétrosternale constrictive > 20 min + Sus-décalage ST $\\ge 1$ mm dans 2 dérivations contiguës + Élévation des Troponines I/T.
- **Prise en Charge Urgente (< 12h)** :
  - **Angioplastie coronaire primaire** (délai < 120 min).
  - **Thrombolyse IV** (Alteplase/Tenecteplase) si délai > 120 min.
  - **Traitement Médical** : Aspirine 300 mg + Clopidogrel 600 mg + Heparine IV.

#### 2. Hypertension Artérielle (HTA)
- **Définition** : PAS $\\ge 140$ mmHg et/ou PAD $\\ge 90$ mmHg mesurée au cabinet.
- **Première ligne** : IEC / ARA2, Antagonistes calciques, Diurétiques thiazidiques.

*💡 ChatGPT Insight : La reperfusion coronaire dans le STEMI doit être initiée le plus rapidement possible ("Time is muscle").*`;
    }

    if (modelId === 'claude') {
      return `${modelName} :

#### Analyse Clinique & Physiopathologique — Cardiologie

Dans le cadre du programme de cardiologie des facultés de médecine du Maroc (S5) :

1. **Physiopathologie du Syndrome Coronarien Aigu (SCA)** :
   - Rupture d'une plaque d'athérome vulnérable $\\rightarrow$ Exposition du sous-endothélium $\\rightarrow$ Activation et agrégation plaquettaire $\\rightarrow$ Formation d'un thrombus occlusif fibrinoplacquettaire.
   - L'ischémie transmurale se traduit électriquement par une onde de lésion sous-épicardique (sus-décalage du segment ST).

2. **Évaluation Électrocardiographique (ECG)** :
   - **Territoires** :
     - V1-V4 : Antéro-septal (Artère IVA)
     - D1, aVL, V5-V6 : Latéral (Artère Circonflexe)
     - D2, D3, aVF : Inférieur (Artère Coronaire Droite)

3. **Stratégie Thérapeutique Recommandée (ESC/SFMU)** :
   - Protocole B-A-S-I-C au long cours : Bêtabloquant, Aspirine, Statine, IEC, Clopidogrel.

*N'hésitez pas à demander des détails sur l'interprétation des anomalies du rythme ou de la conduction.*`;
    }

    if (modelId === 'flakkai') {
      return `${modelName} :
Khouya / Khtyi, ha l-moukhassas dyal **Cardiologie & ECG** li kayti7 f l-examens dyal l-FMP (Rabat, Casa, Fès, Kech, Oujda, Tanger) ! 🇲🇦

• **STEMI (Infarctus l-qalb)** :
  - **Kifash t-3rfha?** Douleur rétrosternale f s-sdar katteddi l l-bras l-isser + ECG fiha sus-décalage ST.
  - **Chno dir?** Angioplastie f l-klinik/sbitar f a9al mn 2h (120 min), wlla Thrombolyse f d-dam.
  - **Dwa** : Aspirine + Clopidogrel + Héparine.

• **HTA (Tension)** :
  - TA > 14/9 f 3 mesures différentes.
  - Dwa dyal 1ère ligne : IEC (Lisinopril...), Antagonistes Calciques (Amlodipine).

💡 *Dakhlo l-section QCMs Cardiologie f l-Dashboard bach t-pratiquer 30+ questions réelles !*`;
    }

    return `${modelName} :
🫀 **Cardiologie & Urgences Coronariennes (Synthèse Pédagogique)**

• **STEMI (Infarctus Aigu)** :
  - **Diagnostic** : Douleur constrictive + Sus-décalage ST à l'ECG.
  - **Reperfusion** : Angioplastie primaire (< 2h) ou Thrombolyse IV.
  - **Traitement B-A-S-I-C** : Bêtabloquant, Aspirine, Statine, IEC, Clopidogrel.

• **HTA** : PAS $\\ge 140$ mmHg / PAD $\\ge 90$ mmHg. Traitement par IEC/ARA2 + Calciquant.

💡 *Astuce révision : Entraînez-vous sur nos 200+ QCMs dans le Dashboard !*`;
  }

  // 2. NEUROLOGIE & AVC
  if (q.includes('neuro') || q.includes('avc') || q.includes('cerveau') || q.includes('epilepsie') || q.includes('broca') || q.includes('méningite')) {
    if (modelId === 'chatgpt') {
      return `${modelName} :

### 🧠 Neurologie Clinique — Prise en Charge de l'AVC Ischémique

#### Protocoles d'Urgence (FAST / AVC)
1. **Scanner Cérébral Sans Injection (TDM)** :
   - **Objectif n°1** : Éliminer formellement un AVC Hémorragique (hyperdensité spontanée).
2. **Thrombolyse IV (rtPA)** :
   - Indiquée si fenêtre thérapeutique $< 4h30$ après l'apparition des premiers symptômes.
3. **Thrombectomie Mécanique** :
   - Indiquée si occlusion d'une grosse artère cérébrale (fenêtre jusqu'à 6h-24h).

#### Différenciation des Aphasies :
- **Aphasie de Broca** (Frontale) : Non-fluente, expression altérée, compréhension préservée.
- **Aphasie de Wernicke** (Temporale) : Fluente (jargonophasie), compréhension gravement altérée.`;
    }

    if (modelId === 'claude') {
      return `${modelName} :

#### Démarche Diagnostique & Neurologie Approfondie (S6)

1. **Sémiologie du Syndrome Méningé** :
   - **Triade clinique** : Céphalées intenses en casque, Vomissements en fusée, Photophobie.
   - **Signes physiques** : Raideur de la nuque, Signe de Kernig (douleur à l'extension du genou), Signe de Brudzinski.
   - **Conduite à tenir** : Hémocultures $\\rightarrow$ Ponction Lombaire (PL) en l'absence de signe de focalisation $\\rightarrow$ Antibiothérapie IV immédiate (Céfotaxime / Ceftriaxone + Amoxicilline).

2. **Physiopathologie de la Méningite Bactérienne** :
   - Franchissement de la barrière hémato-encéphalique par *Streptococcus pneumoniae* ou *Neisseria meningitidis* $\\rightarrow$ Réaction inflammatoire majeure du LCS.`;
    }

    if (modelId === 'flakkai') {
      return `${modelName} :
Khouya / Khtyi, l- points l-assassiyin f **Neurologie (S6)** li khasak t-3rf : 🇲🇦

• **AVC (L-falj / Accident Vasculaire Cérébral)** :
  - **Urgence absolue !** 1er réflexe = **Scanner cérébral blla injection** (bach n-t-3akdo wash machi نزيف / Hémorragie).
  - Si ischémique w a9al mn 4h30 $\\rightarrow$ Thrombolyse (rtPA f d-dam).

• **Méningite (التهاب السحايا)** :
  - Skhona (Fièvre) + Sda3 ras intense + Vomissements + Nuque yabsab (Raideur de nuque).
  - Ponction Lombaire (PL) f l-zhar $\\rightarrow$ Antibiothérapie IV immédiate !

💡 *Zid 3liha : Raje3 les QCMs dyal Neurologie f l-Projet MedEdu Morocco !*`;
    }

    return `${modelName} :
🧠 **Neurologie & Prise en Charge des Urgences**

• **AVC Ischémique** :
  - **1er réflexe** : Scanner cérébral sans injection pour éliminer l'hémorragie.
  - **Thrombolyse IV** si $< 4h30$.

• **Méningite Bactérienne** :
  - Raideur de nuque + Fièvre + Céphalées $\\rightarrow$ Ponction Lombaire + Antibiothérapie IV immédiate.`;
  }

  // 3. ANATOMIE GENERAL & 3D
  if (q.includes('anatomie') || q.includes('anatomy') || q.includes('os') || q.includes('muscle') || q.includes('poumon')) {
    return `${modelName} :
🎨 **Anatomie Générale & Clinique (S1/S2)**

1. **Cardio-Anatomie** : Cœur rétrosternal, 4 cavités, vascularisé par l'IVA et la Coronaire Droite.
2. **Pneumo-Anatomie** : Poumon droit (3 lobes : supérieur, moyen, inférieur), Poumon gauche (2 lobes + lingula).
3. **Neuro-Anatomie** : Polygone de Willis (anastomose carotido-basilaire assurant la vascularisation cérébrale).

💡 *Astuce : Visitez l'Atlas 3D WebGL dans le Dashboard pour visualiser les organes en 3D interactive 360° !*`;
  }

  // 4. GENERAL MEDICAL OR ACADEMIC QUERY GENERATOR (Fallback si l'API Scraper est HS)
  if (modelId === 'chatgpt') {
    return `${modelName} :

### 📋 Réponses & Analyse Médicale — ${cleanQ || 'Sujet Médical'}

#### 1. Aperçu Clinique
Votre demande concerne un thème important du cursus médical (FMP Maroc). 

#### 2. Recommandations Pratiques :
- **Diagnostic** : Évaluation anamnestique et examens paracliniques ciblés.
- **Révision** : Consultez le **Catalogue des Modules S1-S12** et la **Banque de 200+ QCMs** sur MedEdu Morocco.

*💡 ChatGPT Insight : La clinique prime toujours sur la paraclinique.*`;
  }

  if (modelId === 'claude') {
    return `${modelName} :

#### Synthèse Approfondie — ${cleanQ || 'Question Médicale'}

En réponse à votre question concernant **${cleanQ || 'ce sujet'}** :

1. **Cadre Physiopathologique & Sémiologique** :
   Les données actuelles issues de la littérature médicale et des recommandations nationales marocaines (FMP) préconisent une approche systématique fondée sur l'EBM (*Evidence-Based Medicine*).

2. **Orientations Thérapeutiques & Révision** :
   Nous vous invitons à vous référer aux cours rédigés dans la section **Modules** de MedEdu Morocco ainsi qu'aux **Annales Authentiques des 6 Facultés** (Rabat, Casablanca, Fès, Marrakech, Oujda, Tanger).`;
  }

  if (modelId === 'flakkai') {
    return `${modelName} :
Khouya / Khtyi, par rapport l su2alek **"${cleanQ || 'hadd l-thema'}"** : 🇲🇦

• **Explication Médicale** :
Hadd s-su2al kayti7 bzzaf f les examens dyal l-FMP (Rabat, Casa, Fès, Kech, Oujda, Tanger) ! 

• **Chno khasak t-dir?**
1. Raje3 l-cours complet f l-section **Modules (S1-S12)**.
2. Pratiquer les **QCMs** f l-Dashboard.
3. Jarreb l-**Examen Blanc Chronométré** bach t-di Diplôme w Attestation d'Excellence Officielle !

*Khali lina ay su2al khor f l-chat, rani m3ak 24/7 !* 🩺✨`;
  }

  return `${modelName} :
♊ **Analyse Pédagogique — ${cleanQ || 'Sujet Médical'}**

Merci pour votre question !
• **Point Clé** : Ce sujet est essentiel dans la préparation des examens de médecine au Maroc (S1 à S12).
• **Ressources Disponibles** :
  1. **Atlas 3D WebGL** pour l'anatomie interactive.
  2. **200+ QCMs** corrigés avec rationales.
  3. **40+ Annales** des 6 facultés de médecine du Maroc.

*Posez n'importe quelle question complémentaire !* 🩺`;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history, modelId = 'gemini' } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

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
        return NextResponse.json({ response: await getFallbackResponse(message, modelId, systemInstruction), modelId });
      }
    }

    return NextResponse.json({ response: await getFallbackResponse(message, modelId, systemInstruction), modelId });
  } catch (error) {
    console.error('FLAKKAI Route Error:', error);
    return NextResponse.json({ response: await getFallbackResponse('question', 'gemini', ''), modelId: 'gemini' });
  }
}
