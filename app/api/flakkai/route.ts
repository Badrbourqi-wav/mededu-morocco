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
- **Triade diagnostique** : Douleur thoracique rétrosternale constrictive > 20 min + Sus-décalage ST ≥ 1 mm dans 2 dérivations contiguës + Élévation des Troponines I/T.
- **Prise en Charge Urgente (< 12h)** :
  - **Angioplastie coronaire primaire** (délai < 120 min).
  - **Thrombolyse IV** (Alteplase/Tenecteplase) si délai > 120 min.
  - **Traitement Médical** : Aspirine 300 mg + Clopidogrel 600 mg + Heparine IV.

#### 2. Hypertension Artérielle (HTA)
- **Définition** : PAS ≥ 140 mmHg et/ou PAD ≥ 90 mmHg mesurée au cabinet.
- **Première ligne** : IEC / ARA2, Antagonistes calciques, Diurétiques thiazidiques.

*💡 ChatGPT Insight : La reperfusion coronaire dans le STEMI doit être initiée le plus rapidement possible ("Time is muscle").*`;
    }

    if (modelId === 'claude') {
      return `${modelName} :

#### Analyse Clinique & Physiopathologique — Cardiologie

Dans le cadre du programme de cardiologie des facultés de médecine du Maroc (S5) :

1. **Physiopathologie du Syndrome Coronarien Aigu (SCA)** :
   - Rupture d'une plaque d'athérome vulnérable ➔ Exposition du sous-endothélium ➔ Activation et agrégation plaquettaire ➔ Formation d'un thrombus occlusif fibrinoplacquettaire.
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

• **HTA** : PAS ≥ 140 mmHg / PAD ≥ 90 mmHg. Traitement par IEC/ARA2 + Calciquant.

💡 *Astuce révision : Entraînez-vous sur nos 200+ QCMs dans le Dashboard !*`;
  }

  // 2. NEUROLOGIE : AVC
  if (q.includes('avc') || q.includes('accident vasculaire') || q.includes('ischémie') || q.includes('hemorragie')) {
    if (modelId === 'chatgpt') {
      return `${modelName} :
### 🧠 Prise en Charge de l'AVC Ischémique
1. **Scanner Cérébral Sans Injection (TDM)** :
   - **Objectif n°1** : Éliminer formellement un AVC Hémorragique (hyperdensité spontanée).
2. **Thrombolyse IV (rtPA)** :
   - Indiquée si fenêtre thérapeutique < 4h30 après l'apparition des premiers symptômes.
3. **Thrombectomie Mécanique** :
   - Indiquée si occlusion d'une grosse artère cérébrale (fenêtre jusqu'à 6h-24h).`;
    }
    if (modelId === 'claude') {
      return `${modelName} :
#### Physiopathologie & Prise en Charge de l'AVC (S6)
L'Accident Vasculaire Cérébral (AVC) représente une urgence diagnostique et thérapeutique absolue.
1. **Ischémie vs Hémorragie** :
   - L'ischémie (80% des cas) est due à une occlusion artérielle (athérome ou embole).
   - L'hémorragie (20%) est souvent liée à l'HTA ou rupture d'anévrisme.
2. **Imagerie** : L'IRM de diffusion est l'examen de choix (hypersignal précoce), mais le TDM sans injection est le plus accessible pour éliminer l'hémorragie en urgence.
3. **Traitement** : Actilyse (Thrombolyse IV) si délai < 4h30 et absence de contre-indications (troubles de coagulation, chirurgie récente).`;
    }
    if (modelId === 'flakkai') {
      return `${modelName} :
Khouya, l-**AVC (L-falj / Accident Vasculaire Cérébral)** hiya urgence kbira ! 🇲🇦
- **1er réflexe** = Scanner cérébral blla injection (bach n-t-3akdo wash machi نزيف / Hémorragie f dmagh).
- Si l-AVC ischémique (3ar9 t-sadd) w l-patient ja f a9al mn 4h30 ➔ Kan-dirou Thrombolyse (rtPA f d-dam).
- Si dazet 4h30 ➔ Dwa khor (Aspirine) w rééducation.`;
    }
    return `${modelName} :
🧠 **AVC Ischémique** :
- **1er réflexe** : Scanner cérébral sans injection pour éliminer l'hémorragie.
- **Traitement Urgence** : Thrombolyse IV si le délai est < 4h30 depuis l'apparition des signes.`;
  }

  // 3. NEUROLOGIE : MENINGITE
  if (q.includes('méningite') || q.includes('meningite') || q.includes('sémiologie') || q.includes('céphalées')) {
    if (modelId === 'claude') {
      return `${modelName} :
#### Démarche Diagnostique du Syndrome Méningé (S6)
1. **Sémiologie du Syndrome Méningé** :
   - **Triade clinique** : Céphalées intenses en casque, Vomissements en fusée, Photophobie.
   - **Signes physiques** : Raideur de la nuque, Signe de Kernig (douleur à l'extension du genou).
   - **Conduite à tenir** : Hémocultures ➔ Ponction Lombaire (PL) en l'absence de signe de focalisation ➔ Antibiothérapie IV immédiate (Céfotaxime / Ceftriaxone).
2. **Physiopathologie** :
   - Franchissement de la BHE par *Streptococcus pneumoniae* ➔ Réaction inflammatoire majeure du LCS.`;
    }
    return `${modelName} :
🧠 **Méningite Bactérienne** :
Raideur de nuque + Fièvre + Céphalées intenses ➔ Hémocultures ➔ Ponction Lombaire + Antibiothérapie IV immédiate !`;
  }

  // 4. ANATOMIE & DEFINITIONS
  if (q.includes('anatomie') || q.includes('anatomy') || q.includes('c\'est quoi l\'anatomie') || q.includes('chnahiya l anatomie')) {
    if (modelId === 'chatgpt') {
      return `${modelName} :
L'**Anatomie** (du grec *ana* = à travers, et *tomein* = couper) est la branche des sciences biologiques et médicales qui étudie la structure, la forme, la situation et les rapports des différents organes et tissus du corps humain.

Elle se divise en plusieurs spécialités :
- **Anatomie Descriptive** : Étude détaillée de chaque organe (forme, dimensions, constitution).
- **Anatomie Topographique / Régionale** : Étude des rapports des organes entre eux par région (Thorax, Abdomen, Membres, Tête & Cou).
- **Anatomie Fonctionnelle** : Relation entre la structure d'un organe et sa fonction physiologique.
- **Anatomie Pathologique (Anapath)** : Étude des altérations microscopiques et macroscopiques causées par les maladies.

*C'est la discipline fondamentale enseignée en S1 et S2 dans les facultés de médecine au Maroc.*`;
    }

    if (modelId === 'claude') {
      return `${modelName} :
#### Concept & Fondements de l'Anatomie Humaine (S1/S2)

L'Anatomie est la science fondamentale de la médecine. Elle pose le socle de toute la sémiologie et de la chirurgie.

1. **Définition & Découpage** :
   - **Anatomie Macroscopique** : Observation directe des structures (ostéologie, myologie, arthrologie, angiologie, névrologie, splanchnologie).
   - **Anatomie Microscopique (Histologie)** : Organisation cellulaire et tissulaire.
   - **Anatomie du Développement (Embryologie)** : Formation des organes de la fécondation à la naissance.

2. **Importance en Pratique Médicale & Chirurgicale** :
   La compréhension de l'anatomie est indispensable pour interpréter l'imagerie (Radio, TDM, IRM), réaliser l'examen physique (palpation, auscultation) et réaliser des actes chirurgicaux en toute sécurité.`;
    }

    if (modelId === 'flakkai') {
      return `${modelName} :
Khouya / Khtyi, l-**Anatomie (علم التشريح)** hiya l-baza dyal l-médecine كاملا ! 🇲🇦

• **Chno hiya?**
Hiya l-madda li katqra fiha l-kard (forme), l-blassa (situation), w les rapports dyal ga3 l-a3da3 d l-jissm (Cœur, Poumons, Cerveau, Os, Muscles...).

• **Les branches dyalha f S1 & S2 :**
1. **Ostéologie** : Dérassat l-3dam (Os).
2. **Myologie** : Dérassat l-3adalat (Muscles).
3. **Angiologie** : Dérassat l-3ro9 d-dam (Vaisseaux).
4. **Névrologie** : Dérassat l-a3sab (Nerfs).

💡 *Zid 3liha : N9dr n-traduire lik ay terme médical f l-Anatomie mn l-Français l l-Arabe wla l-Darija wla l-Anglais !*`;
    }

    return `${modelName} :
🎨 **Anatomie Humaine (Définition & Principes)**
L'Anatomie est la science médicale qui étudie la morphologie, la structure et les relations spatiales des organes du corps humain. Elle comprend l'ostéologie (os), la myologie (muscles), l'arthrologie (articulations) et la splanchnologie (viscères).`;
  }

  // 5. GREETINGS & SALUTATIONS (Hello, Salam, Hey, etc.)
  if (q.includes('hello') || q.includes('hellow') || q.includes('salut') || q.includes('salam') || q.includes('coucou') || q.includes('hey') || q.includes('marhaba') || q.includes('sbah') || q.includes('msah') || q.includes('bonjour') || q.includes('bonsoir')) {
    if (modelId === 'chatgpt') {
      return `${modelName} :
Bonjour ! Comment puis-je vous aider aujourd'hui dans vos révisions médicales ? N'hésitez pas à me poser n'importe quelle question sur vos cours (S1-S12), l'ECG, l'anatomie ou la démarche diagnostique.`;
    }
    if (modelId === 'claude') {
      return `${modelName} :
Bienvenue ! Je suis à votre disposition pour analyser vos cas cliniques, clarifier les concepts physiopathologiques complexes ou revoir les annales des facultés de médecine marocaines. Quel sujet souhaitez-vous aborder aujourd'hui ?`;
    }
    if (modelId === 'flakkai') {
      return `${modelName} :
Salam Khouya / Khtyi ! 🇲🇦 Labas 3lik? Kifash n9dr n3awnek l-yoma f l-préparation dyal l-examens d l-médecine (Anatomie, Cardio, Neuro, QCMs...)? Gol liya chno 3ndek!`;
    }
    return `${modelName} :
Bonjour et bienvenue sur MedEdu Morocco ! 🩺 Posez votre question sur n'importe quel module ou spécialité médicale, je suis là pour vous répondre de manière claire et détaillée.`;
  }

  // 6. PNEUMOLOGIE (Asthme, BPCO, Tuberculose, Pneumopathie)
  if (q.includes('pneumo') || q.includes('asthme') || q.includes('bpco') || q.includes('tuberculose') || q.includes('poumon') || q.includes('pleurésie')) {
    if (modelId === 'claude') {
      return `${modelName} :
#### Pneumologie Clinique (S5 / FMP Maroc)
1. **Crise d'Asthme Aiguë Grave (AAG)** :
   - **Signes de gravité** : Parole impossible, fréquence respiratoire > 30/min, fréquence cardiaque > 120/min, Silence auscultatoire.
   - **Prise en charge** : Salbutamol nébulisé + O2 fort débit + Corticothérapie systémique IV.
2. **Tuberculose Pulmonaire (Spécialité Marocaine PNT)** :
   - Triade : Toux chronique > 15 jours + Hémoptysie + Sueurs nocturnes.
   - Traitement standard (Rifampicine, Isoniazide, Pyrazinamide, Éthambutol : 2RHZE/4RH).`;
    }
    return `${modelName} :
🫁 **Pneumologie** :
- **Asthme Aigu Grave (AAG)** : B2-mimétiques en nébulisation + Corticothérapie IV + O2.
- **Tuberculose Pulmonaire** : Déclaration obligatoire au Maroc (PNT). Traitement 2RHZE/4RH.`;
  }

  // 7. GASTRO-ENTÉROLOGIE & HÉPATOLOGIE (Cirrhose, Ulcère, MICI, Hépatite)
  if (q.includes('gastro') || q.includes('ulcère') || q.includes('ulcere') || q.includes('cirrhose') || q.includes('foie') || q.includes('mici') || q.includes('crohn') || q.includes('hépatite')) {
    return `${modelName} :
🩺 **Gastro-Entérologie (S6 / FMP)**
- **Cirrhose Hépatique** : Insuffisance hépatocellulaire (Ictère, baisse TP) + Hypertension Portale (Ascite, Varices Œsophagiennes).
- **Ulcère Gastroduodénal** : Douleur épigastrique post-prandiale. Recherche systématique d'Helicobacter Pylori (Quadrithérapie au Bismuth ou Trithérapie IPP + Amox + Clarithro).`;
  }

  // 8. ENDOCRINOLOGIE & DIABÈTE
  if (q.includes('diabète') || q.includes('diabete') || q.includes('insuline') || q.includes('thyroïde') || q.includes('thyroide') || q.includes('endocrino')) {
    return `${modelName} :
🩸 **Endocrinologie & Diabétologie**
- **Diabète de Type 1** : Carence absolue en insuline. Risque principal = Acidocétose Diabétique (Glycémie > 2.5 g/L + Cétonurie + Acidose métabolique).
- **Diabète de Type 2** : Insulinorésistance. Traitement de 1ère ligne = Hygiène hygiéno-diététique + Metformine.`;
  }

  // 9. DYNAMIC DARIJA & GENERAL MEDICAL CONSULTANT (Sans modèle stéréotypé)
  if (modelId === 'flakkai') {
    return `${modelName} :
Khouya / Khtyi, par rapport l l-question dyalek 3la **"${cleanQ || 'hadd l-sujet'}"** : 🇲🇦

• **Analyse Médicale & Conseil Révision** :
Hadd l-point kayti7 dima f l-examens w les annales des facultés de médecine du Maroc (FMPR, FMPC, FMPF, FMPM, FMPO, FMPT).

1. **Pratique Diagnostique** : Dima bda b l-Anamnèse w Examen Clinique complet ➔ Examen paraclinique (Imagerie / Biologie).
2. **Pour vos révisions** : Consultez les fiches détaillées dans la section **Modules** et faites une session de **20 QCMs** ciblés dans le Dashboard !

*Des questions précises sur la posologie ou le traitement ? Écrivez-les directement !* 🩺`;
  }

  if (modelId === 'chatgpt') {
    return `${modelName} :
### 📋 Analyse Clinique — ${cleanQ || 'Question Médicale'}

1. **Aperçu Synthétique** :
   Votre question concerne une notion essentielle du cursus médical. L'évaluation repose sur un examen clinique méthodique associé aux examens complémentaires de première intention.

2. **Conseil Pédagogique** :
   Pour approfondir ce chapitre, référez-vous aux cours du curriculum national S1-S12 et entraînez-vous sur les annales officielles.`;
  }

  if (modelId === 'claude') {
    return `${modelName} :
#### Synthèse Médicale Approfondie — ${cleanQ || 'Sujet Médical'}

Concernant votre interrogation sur **"${cleanQ}"** :

1. **Cadre Physiopathologique & Démarche Diagnostique** :
   Une prise en charge rigoureuse nécessite l'intégration des données de l'EBM (*Evidence-Based Medicine*) et la prise en compte des recommandations des sociétés savantes (SFMU, ESC, SRLF).

2. **Éléments de Révision** :
   Retrouvez la fiche de cours correspondante et les QCMs d'entraînement dans votre espace étudiant MedEdu Morocco.`;
  }

  return `${modelName} :
💡 **Réponse Pédagogique**

Merci pour votre message concernant **"${cleanQ}"** !
• **Orientation** : Ce sujet fait partie intégrante du programme d'études médicales au Maroc.
• **Recommandation** : Explorez les fiches de révision et les modules d'entraînement QCM dans votre tableau de bord.`;
}

export async function POST(req: NextRequest) {
  try {
    const { message, history, modelId = 'gemini', clientApiKey } = await req.json();
    
    // Prefer client-provided key, fallback to env variable
    const apiKey = (clientApiKey && clientApiKey.trim().length > 10) ? clientApiKey : process.env.GEMINI_API_KEY;

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
      const genAI = new GoogleGenerativeAI(apiKey);
      const targetModels = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash'];
      
      for (const modelName of targetModels) {
        try {
          const model = genAI.getGenerativeModel({ 
            model: modelName,
            systemInstruction
          });
          
          const chat = model.startChat({
            history: history || [],
          });
          
          const result = await chat.sendMessage(message);
          const text = result.response.text();
          if (text) {
            return NextResponse.json({ response: text, modelId, isFallback: false });
          }
        } catch (geminiError) {
          console.warn(`Gemini model ${modelName} failed:`, geminiError);
        }
      }
    }

    return NextResponse.json({ response: await getFallbackResponse(message, modelId, systemInstruction), modelId, isFallback: true });
  } catch (error) {
    console.error('FLAKKAI Route Error:', error);
    return NextResponse.json({ response: await getFallbackResponse('question', 'gemini', ''), modelId: 'gemini', isFallback: true });
  }
}
