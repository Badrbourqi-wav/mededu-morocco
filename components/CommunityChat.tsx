'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, ImageIcon, Mic, MicOff, Sparkles, Trash2, Pencil, Check, X, ChevronDown, Users } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────
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
  lang?: string;
}

// ─── Language Detection ─────────────────────────────────────────────────────────
function detectLang(text: string): 'darija' | 'arabic' | 'french' | 'english' {
  if (/[\u0600-\u06FF]/.test(text)) return 'arabic';
  const t = text.toLowerCase();
  const darijaWords = ['wach', 'bghit', 'kayn', 'hna', 'daba', 'zwina', 'mzyan', 'chno', 'fin', 'kif', 'ana', 'nta', 'ntia', 'howa', 'hiya', 'walo', 'chhal', 'mashi', 'machi', 'kifash', 'chmen', 'ash', 'wash', '7it', '3lash', 'bach', 'bzzaf', 'chwiya', 'gha', 'ga3', 'wakha', 'yallah', 'safi', 'dyal', 'dyal', 'dial', 'fhmt', 'smhli', 'allah', 'inshallah', 'barak', 'labas'];
  if (darijaWords.some(w => t.includes(w))) return 'darija';
  const frWords = ['est', 'sont', 'avec', 'dans', 'pour', 'que', 'qui', 'les', 'des', 'une', 'comment', 'pourquoi', 'quoi', 'quel', 'quelle', 'merci', 'bonjour', 'bonsoir', 'expliquer', 'donne', 'faire'];
  if (frWords.filter(w => t.split(/\s+/).includes(w)).length >= 1) return 'french';
  return 'english';
}

// ─── FLAKKAI Multilingual Knowledge Base ───────────────────────────────────────
interface KBEntry { keywords: string[]; responses: Record<string, string>; }

const KB: KBEntry[] = [
  // ── Greetings ──────────────────────────────────────────────────────────────
  {
    keywords: ['bonjour', 'salut', 'salam', 'hello', 'hi', 'allo', 'hey', 'labas', 'la bas', 'ahlan', 'مرحبا', 'السلام'],
    responses: {
      darija: `Salam! 👋 Ana **FLAKKAI**, l assistant IA dyal MedEdu.\n\nNqdr n3awnek f ay 7aja:\n• 🩺 Tibb w 3ulum saha\n• 📐 Mathématiques w logique\n• 🧪 Physique w Chimie\n• 💻 Tech w Informatique\n• 🌍 Jeografia w Tarikh\n• 🍽️ Cuisine w recettes\n• ⚽ Sport w actualité\n• 📚 Lugha w dirasat\n\nSol ay haja! /flakkai + su2alek 😊`,
      arabic: `السلام عليكم! 👋 أنا **FLAKKAI**، المساعد الذكي لـ MedEdu.\n\nأستطيع مساعدتك في:\n• 🩺 الطب والعلوم الصحية\n• 📐 الرياضيات والمنطق\n• 🧪 الفيزياء والكيمياء\n• 💻 التكنولوجيا والمعلوماتية\n• 🌍 الجغرافيا والتاريخ\n• 📚 اللغات والدراسات\n\nاسألني أي شيء! استخدم /flakkai + سؤالك 😊`,
      french: `Bonjour! 👋 Je suis **FLAKKAI**, l'assistant IA de MedEdu.\n\nJe peux vous aider dans:\n• 🩺 Médecine & Sciences de la santé\n• 📐 Mathématiques & Logique\n• 🧪 Physique & Chimie\n• 💻 Tech & Informatique\n• 🌍 Géographie & Histoire\n• 🍽️ Cuisine & Recettes\n• ⚽ Sport & Actualité\n\nPosez-moi n'importe quelle question! 😊`,
      english: `Hello! 👋 I'm **FLAKKAI**, the MedEdu AI assistant.\n\nI can help you with:\n• 🩺 Medicine & Health Sciences\n• 📐 Mathematics & Logic\n• 🧪 Physics & Chemistry\n• 💻 Tech & Computer Science\n• 🌍 Geography & History\n• 🍽️ Cooking & Recipes\n• ⚽ Sports & News\n\nAsk me anything! 😊`,
    }
  },

  // ── Anatomie / Anatomy ─────────────────────────────────────────────────────
  {
    keywords: ['anatomie', 'anatomy', 'anatomi', 'تشريح', 'جسم', 'عضو', 'os', 'muscle', 'nerf', 'artère', 'veine', 'organe', 'corps'],
    responses: {
      darija: `**Anatomie — Points Clés** 🫀\n\n**Alb (Cœur):**\n• 4 ghorf: OD, OG, VD, VG\n• Septum interauriculaire = fosse ovale\n• Nerf vague (X) = frein cardiaque\n\n**Kibda (Foie):** 8 segments de Couinaud\n**Klawi (Reins):** Epurateurs + EPO 90% + rénine\n**Ri2a (Poumons):** Alvéoles = pneumocytes I (échanges) + II (surfactant)\n\n**A3sab Membres:**\n• Médian → canal carpien\n• Cubital → gouttière épitrochléo-olécrânienne\n• Radial → gouttière humérale\n\n*💡 Sw2elni 3la organe mo3ayan bach nzidek details!*`,
      arabic: `**علم التشريح — النقاط الأساسية** 🫀\n\n**القلب:** 4 تجاويف (أذينان + بطينان)\n**الكبد:** 8 قطاعات وفق Couinaud\n**الكلية:** تنقية الدم + هرمون EPO + رينين\n**الرئتان:** الحويصلات الهوائية = تبادل غازي\n\n**الأعصاب الطرفية:**\n• العصب المتوسط → النفق الرسغي\n• العصب الزندي → الأخدود الزندي\n\n*💡 اسأل عن عضو محدد لمزيد من التفاصيل!*`,
      french: `**Anatomie — Points Clés** 🫀\n\n**Cœur:** 4 cavités • Septum interauriculaire = fosse ovale • Nerf X = frein\n**Foie:** 8 segments de Couinaud\n**Reins:** Épurateurs + EPO 90% + rénine-angiotensine\n**Poumons:** Pneumocytes I (échanges) + II (surfactant)\n\n**Nerfs des membres:**\n• Médian → canal carpien (syndrome du canal carpien)\n• Cubital → gouttière épitrochléo-olécrânienne\n• Radial → gouttière humérale (fracture humérale)\n\n*💡 Précise l'organe/région pour plus de détails!*`,
      english: `**Anatomy — Key Points** 🫀\n\n**Heart:** 4 chambers • Interatrial septum = oval fossa • Vagus nerve = cardiac brake\n**Liver:** 8 Couinaud segments\n**Kidneys:** Blood filtration + 90% EPO + renin-angiotensin\n**Lungs:** Pneumocytes I (gas exchange) + II (surfactant)\n\n**Peripheral nerves:**\n• Median → carpal tunnel\n• Ulnar → epitrochlear groove\n• Radial → humeral groove\n\n*💡 Ask about a specific organ for more details!*`,
    }
  },

  // ── HTA / Hypertension ─────────────────────────────────────────────────────
  {
    keywords: ['hta', 'hypertension', 'tension', 'ضغط', 'blood pressure', 'pression'],
    responses: {
      darija: `**HTA — Darght Ddem** 🩺\n\nDefinition: PA ≥ 140/90 mmHg\n\n**Tri2 l3ilaj (SFC 2023):**\n• Awwal: bithérapie IEC/ARA2 + diurétique thiazidique\n• Tani: trithérapie + inhibiteur calcique\n• Talt: + Spironolactone 25mg\n\n**Urgence HTA:** PA > 180/110 + organe atteint → SMUR + Nicardipine IV\n\n*💡 CI IEC/ARA2 f l7aml (grossesse)!*`,
      arabic: `**ارتفاع ضغط الدم** 🩺\n\nالتعريف: PA ≥ 140/90 mmHg\n\n**خطوات العلاج:**\n• الخطوة 1: مزدوج IEC/ARA2 + ديوريتيك\n• الخطوة 2: ثلاثي + مثبط الكالسيوم\n• الخطوة 3: + Spironolactone\n\n*⚠️ موانع IEC/ARA2 خلال الحمل!*`,
      french: `**HTA — Hypertension Artérielle** 🩺\n\nDéf: PA ≥ 140/90 mmHg (≥135/85 automesure)\n\n**Paliers SFC 2023:**\n• Étape 1: Bithérapie IEC/ARA2 + thiazidique ou ICa\n• Étape 2: Trithérapie IEC/ARA2 + ICa + thiazidique\n• Étape 3: + Spironolactone 25mg\n\n**Urgence:** PA > 180/110 + atteinte organe → SMUR\n\n*💡 CI absolue IEC/ARA2 en grossesse!*`,
      english: `**Hypertension (HTN)** 🩺\n\nDefinition: BP ≥ 140/90 mmHg\n\n**Treatment steps (ESC 2023):**\n• Step 1: Dual therapy ACEi/ARB + thiazide or CCB\n• Step 2: Triple therapy ACEi/ARB + CCB + thiazide\n• Step 3: Add spironolactone 25mg\n\n**HTN emergency:** BP > 180/110 + organ damage → IV Nicardipine\n\n*💡 ACEi/ARB absolutely contraindicated in pregnancy!*`,
    }
  },

  // ── Mathématiques ──────────────────────────────────────────────────────────
  {
    keywords: ['math', 'mathématiques', 'calcul', 'algèbre', 'géométrie', 'équation', 'intégrale', 'dérivée', 'fonction', 'trigonométrie', 'رياضيات', 'حساب', 'hisab', 'riyada', 'ryadiyat'],
    responses: {
      darija: `**Mathématiques — L'Essentiel** 📐\n\n**Dérivées importantes:**\n• (xⁿ)' = nxⁿ⁻¹\n• (sin x)' = cos x\n• (cos x)' = -sin x\n• (eˣ)' = eˣ\n• (ln x)' = 1/x\n\n**Intégrales:**\n• ∫xⁿdx = xⁿ⁺¹/(n+1) + C\n• ∫eˣdx = eˣ + C\n• ∫(1/x)dx = ln|x| + C\n\n**Identités Trigonométriques:**\n• sin²x + cos²x = 1\n• cos(2x) = cos²x - sin²x\n\n*💡 Sol ay 7ssab mo3ayan nhelk!*`,
      arabic: `**الرياضيات — الأساسيات** 📐\n\n**المشتقات:**\n• (xⁿ)' = nxⁿ⁻¹\n• (sin x)' = cos x\n• (eˣ)' = eˣ\n• (ln x)' = 1/x\n\n**التكاملات:**\n• ∫xⁿdx = xⁿ⁺¹/(n+1) + C\n• ∫eˣdx = eˣ + C\n\n**المثلثات:**\n• sin²x + cos²x = 1\n\n*💡 اسألني عن أي مسألة رياضية!*`,
      french: `**Mathématiques — L'Essentiel** 📐\n\n**Dérivées clés:**\n• (xⁿ)' = nxⁿ⁻¹  •  (sin x)' = cos x  •  (eˣ)' = eˣ\n• Règle chaîne: [f(g(x))]' = f'(g(x))·g'(x)\n\n**Intégrales:**\n• ∫xⁿdx = xⁿ⁺¹/(n+1) + C\n• ∫eˣdx = eˣ + C  •  ∫(1/x)dx = ln|x| + C\n\n**Identités trig:** sin²x + cos²x = 1  •  1 + tan²x = sec²x\n\n**Limites:** lim(x→0) sin(x)/x = 1\n\n*💡 Posez-moi un exercice précis!*`,
      english: `**Mathematics — The Essentials** 📐\n\n**Key Derivatives:**\n• (xⁿ)' = nxⁿ⁻¹  •  (sin x)' = cos x  •  (eˣ)' = eˣ\n• Chain rule: [f(g(x))]' = f'(g(x))·g'(x)\n\n**Integrals:**\n• ∫xⁿdx = xⁿ⁺¹/(n+1) + C\n• ∫eˣdx = eˣ + C  •  ∫(1/x)dx = ln|x| + C\n\n**Trig identities:** sin²x + cos²x = 1\n\n*💡 Give me a specific problem to solve!*`,
    }
  },

  // ── Physique / Physics ────────────────────────────────────────────────────
  {
    keywords: ['physique', 'physics', 'force', 'énergie', 'energy', 'vitesse', 'accélération', 'lumière', 'فيزياء', 'newton', 'relativité', 'quantum', 'électricité', 'magnétisme'],
    responses: {
      darija: `**Physique — L'Essentiel** ⚡\n\n**Newton (lois):**\n• F = ma (deuxième loi)\n• Action-réaction (troisième loi)\n\n**Énergie:**\n• Ec = ½mv² (cinétique)\n• Ep = mgh (potentielle)\n• E = mc² (Einstein)\n\n**Électricité:**\n• U = R·I (loi d'Ohm)\n• P = U·I (puissance)\n\n**Vitesse lumière:** c = 3×10⁸ m/s\n\n*💡 Sol ay su2al f physique nhelk!*`,
      arabic: `**الفيزياء — الأساسيات** ⚡\n\n**قوانين نيوتن:**\n• F = ma (القانون الثاني)\n• لكل فعل ردّ فعل مساوٍ ومضاد\n\n**الطاقة:**\n• طاقة حركية: Ec = ½mv²\n• طاقة كامنة: Ep = mgh\n• معادلة أينشتاين: E = mc²\n\n**الكهرباء:**\n• قانون أوم: U = R·I\n\n*💡 اسألني عن أي موضوع فيزيائي!*`,
      french: `**Physique — L'Essentiel** ⚡\n\n**Mécanique:**\n• F = ma (2ème loi Newton)\n• Ec = ½mv²  •  Ep = mgh  •  E = mc²\n\n**Électricité:**\n• Loi d'Ohm: U = R·I\n• Puissance: P = U·I = R·I²\n• Loi de Kirchhoff: ΣU = 0, ΣI = 0\n\n**Optique:**\n• c = 3×10⁸ m/s (vitesse lumière)\n• Snell-Descartes: n₁sin(θ₁) = n₂sin(θ₂)\n\n*💡 Posez un exercice précis!*`,
      english: `**Physics — The Essentials** ⚡\n\n**Mechanics:**\n• F = ma (Newton's 2nd law)\n• Kinetic energy: Ek = ½mv²\n• Potential energy: Ep = mgh\n• Einstein: E = mc²\n\n**Electricity:**\n• Ohm's law: V = I·R\n• Power: P = V·I = I²R\n\n**Constants:**\n• c = 3×10⁸ m/s (speed of light)\n• g = 9.81 m/s² (gravity)\n\n*💡 Give me a specific problem!*`,
    }
  },

  // ── Chimie / Chemistry ────────────────────────────────────────────────────
  {
    keywords: ['chimie', 'chemistry', 'chimiya', 'kimi', 'كيمياء', 'molécule', 'atome', 'réaction', 'acide', 'base', 'ph', 'tableau périodique', 'liaison'],
    responses: {
      darija: `**Chimie — L'Essentiel** 🧪\n\n**Tableau Périodique — à retenir:**\n• Période 1: H, He\n• Métaux alcalins (groupe 1): Li, Na, K...\n• Halogènes (groupe 17): F, Cl, Br, I\n• Gaz nobles (groupe 18): He, Ne, Ar\n\n**Acides/Bases:**\n• pH < 7 = acide  •  pH = 7 = neutre  •  pH > 7 = base\n• Acide fort: HCl, H₂SO₄, HNO₃\n• Base forte: NaOH, KOH\n\n**Liaisons:**\n• Ionique: métal + non-métal\n• Covalente: non-métal + non-métal\n\n*💡 Sol ay su2al f chimie!*`,
      french: `**Chimie — L'Essentiel** 🧪\n\n**Tableau périodique:** H(1) He(2) Li(3) Be(4) B(5) C(6) N(7) O(8) F(9) Ne(10)\n\n**Acide-Base:**\n• pH < 7 = acide  •  pH > 7 = basique\n• Acides forts: HCl, H₂SO₄, HNO₃\n• Bases fortes: NaOH, KOH, Ca(OH)₂\n• pH = -log[H₃O⁺]\n\n**Liaisons:** Ionique (métal+non-métal) • Covalente (non-métal+non-métal) • Van der Waals\n\n**Stœchiométrie:** n = m/M  •  PV = nRT (gaz parfaits)\n\n*💡 Question précise = réponse précise!*`,
      english: `**Chemistry — The Essentials** 🧪\n\n**Periodic Table groups:**\n• Alkali metals (gr.1): Li, Na, K\n• Halogens (gr.17): F, Cl, Br, I\n• Noble gases (gr.18): He, Ne, Ar\n\n**Acid-Base:**\n• pH = -log[H⁺]  •  pH < 7 = acid  •  pH > 7 = base\n• Strong acids: HCl, H₂SO₄, HNO₃\n\n**Bonding:** Ionic (metal+nonmetal) • Covalent (nonmetal+nonmetal)\n\n**Gas laws:** PV = nRT\n\n*💡 Ask me a specific chemistry question!*`,
      arabic: `**الكيمياء — الأساسيات** 🧪\n\n**الجدول الدوري:**\n• المعادن القلوية (المجموعة 1): Li, Na, K\n• الهالوجينات (المجموعة 17): F, Cl, Br, I\n\n**الأحماض والقواعد:**\n• pH < 7 = حمض  •  pH > 7 = قاعدة\n• قانون pH = -log[H⁺]\n\n**الروابط الكيميائية:**\n• أيونية: معدن + لامعدن\n• تساهمية: لامعدن + لامعدن\n\n*💡 اسألني أي سؤال كيميائي!*`,
    }
  },

  // ── Tech / Informatique ───────────────────────────────────────────────────
  {
    keywords: ['informatique', 'computer', 'programming', 'code', 'python', 'javascript', 'html', 'ai', 'artificial intelligence', 'machine learning', 'data', 'internet', 'تقنية', 'برمجة', 'برمج', 'برنامج'],
    responses: {
      darija: `**Tech & Informatique** 💻\n\n**Langages populaires:**\n• **Python** → AI/Data Science/Automation\n• **JavaScript** → Web (frontend + Node.js)\n• **Java** → Android + Enterprise\n• **C/C++** → Systèmes + Performance\n• **SQL** → Bases de données\n\n**AI/ML:**\n• Machine Learning: modèles katata3allam mn data\n• Deep Learning: réseaux neuronaux\n• ChatGPT = Large Language Model (LLM)\n\n**Concepts clés:**\n• API: bridge byn applications\n• Git: version control\n• Cloud: AWS/Azure/GCP\n\n*💡 Sol 3la ay langaj wla concept nzidek!*`,
      french: `**Tech & Informatique** 💻\n\n**Langages populaires 2024:**\n• **Python** → IA/Data Science/Automatisation\n• **JavaScript/TypeScript** → Web full-stack\n• **Java** → Android/Enterprise\n• **Rust** → Performance/Sécurité\n• **SQL** → Bases de données\n\n**Intelligence Artificielle:**\n• ML: apprentissage automatique depuis les données\n• Deep Learning: réseaux de neurones artificiels\n• LLM: GPT-4, Gemini, Claude = modèles de langage\n• RAG: Retrieval-Augmented Generation\n\n**Web:**\n• Frontend: HTML/CSS/JS/React/Next.js\n• Backend: Node.js/Python/Java\n• Base de données: PostgreSQL/MongoDB\n\n*💡 Quelle techno vous intéresse?*`,
      english: `**Tech & Computer Science** 💻\n\n**Top languages 2024:**\n• **Python** → AI/ML/Data Science\n• **JavaScript/TypeScript** → Web/Full-stack\n• **Java** → Android/Enterprise\n• **Rust** → Systems/Performance\n• **SQL** → Databases\n\n**AI/ML:**\n• Machine Learning: models learn from data\n• Deep Learning: artificial neural networks\n• LLMs: GPT-4, Gemini, Claude (language models)\n• Computer Vision, NLP, Reinforcement Learning\n\n**Key concepts:** API, REST, Git, Docker, Cloud (AWS/GCP/Azure)\n\n*💡 Ask about any specific technology!*`,
      arabic: `**التكنولوجيا والمعلوماتية** 💻\n\n**لغات البرمجة الشائعة:**\n• Python → الذكاء الاصطناعي والبيانات\n• JavaScript → تطوير الويب\n• Java → تطبيقات الأندرويد\n• SQL → قواعد البيانات\n\n**الذكاء الاصطناعي:**\n• تعلم الآلة: نماذج تتعلم من البيانات\n• التعلم العميق: شبكات عصبية اصطناعية\n• نماذج اللغة الكبيرة: GPT، Gemini، Claude\n\n*💡 اسألني عن أي تقنية بالتفصيل!*`,
    }
  },

  // ── Histoire du Maroc ─────────────────────────────────────────────────────
  {
    keywords: ['maroc', 'morocco', 'المغرب', 'histoire', 'tarikh', 'alaouite', 'hassan', 'mohammed', 'chérifien', 'saâdien', 'mérinide', 'almohade', 'almoravide'],
    responses: {
      darija: `**Tarikh l Maghrib** 🇲🇦\n\n**Dynasties importantes:**\n• **Idrissides** (788-974): Idris I, fondateur\n• **Almoravides** (1040-1147): Marrakech fondée 1062\n• **Almohades** (1121-1269): Empire maghrébin\n• **Mérinides** (1244-1465): Fès capitale\n• **Saâdiens** (1554-1659): Victoire de Wadi l-Makhazin 1578\n• **Alaouites** (1631-présent): Dynastie actuelle\n\n**Indépendance:** 2 Mars 1956 (France) + Avril 1956 (Espagne)\n\n**Rois Alaouites modernes:**\n• Mohammed V (1927-1961)\n• Hassan II (1961-1999)\n• Mohammed VI (1999-présent)\n\n*💡 Sol 3la ay 7a9ba bach nzidek!*`,
      french: `**Histoire du Maroc** 🇲🇦\n\n**Dynasties majeures:**\n• **Idrissides** (788-974): Idris Ier fondateur\n• **Almoravides** (1040-1147): Fondation de Marrakech 1062\n• **Almohades** (1121-1269): Empire berbère\n• **Mérinides** (1244-1465): Fès capitale, médersa Bou Inania\n• **Saâdiens** (1554-1659): Victoire Wadi l-Makhazin 1578\n• **Alaouites** (1631-): Monarchie chérifienne actuelle\n\n**Indépendance:** 2 mars 1956\n\n**Rois modernes:** Mohammed V • Hassan II • Mohammed VI (1999-)\n\n*💡 Quelle période vous intéresse?*`,
      english: `**History of Morocco** 🇲🇦\n\n**Major dynasties:**\n• Idrisids (788-974): Idris I, founder\n• Almoravids (1040-1147): Founded Marrakesh 1062\n• Almohads (1121-1269): Berber empire\n• Marinids (1244-1465): Fez as capital\n• Saadians (1554-1659): Battle of Wadi l-Makhazin 1578\n• Alaouites (1631-present): Current dynasty\n\n**Independence:** March 2, 1956\n\n*💡 Ask about any specific period!*`,
      arabic: `**تاريخ المغرب** 🇲🇦\n\n**الأسرات الحاكمة:**\n• الأدارسة (788-974): إدريس الأول المؤسس\n• المرابطون (1040-1147): تأسيس مراكش 1062\n• الموحدون (1121-1269): إمبراطورية أمازيغية\n• المرينيون (1244-1465): فاس عاصمةً\n• السعديون (1554-1659): معركة وادي المخازن 1578\n• العلويون (1631-حتى الآن): الأسرة الحاكمة الحالية\n\n**الاستقلال:** 2 مارس 1956\n\n*💡 اسألني عن أي حقبة تاريخية!*`,
    }
  },

  // ── Cuisine / Recettes ────────────────────────────────────────────────────
  {
    keywords: ['cuisine', 'recipe', 'recette', 'tajine', 'couscous', 'pastilla', 'harira', 'méchoui', 'rfissa', 'msemen', 'baghrir', 'طبخ', 'طاجين', 'كسكس', 'أكل', 'makla', 'kula'],
    responses: {
      darija: `**Cuisine Maghribiya** 🍽️\n\n**Tajine Djaj b Citron:**\n1. Djaj + oignon + huile d'olive\n2. Citron confit + olives vertes\n3. Curcuma + gingembre + safran\n4. Cuisson 45min feu doux\n\n**Harira:**\n• Tomates + lentilles + pois chiches\n• Coriandre + cumin + gingembre\n• Vermicelles + œuf battu\n• Cuisson 1h\n\n**Couscous Vendredi:**\n• 7 légumes: courgette, navet, carotte...\n• Viande (agneau/poulet)\n• Bouillon + ras el hanout\n\n*💡 Sol 3la ay recette bach nzidek details!*`,
      french: `**Cuisine Marocaine** 🍽️\n\n**Tajine Poulet aux Citrons Confits:**\n1. Faire revenir poulet + oignon + huile d'olive\n2. Ajouter citrons confits + olives vertes\n3. Épices: curcuma + gingembre + safran + ail\n4. Cuisson 45min à feu doux\n\n**Harira (soupe):**\n• Tomates + lentilles + pois chiches\n• Coriandre fraîche + cumin + gingembre\n• Vermicelles + œuf battu en fin\n\n**Couscous traditionnel:**\n• 7 légumes (courgette, navet, carotte, potiron...)\n• Viande d'agneau ou poulet\n• Bouillon + ras el hanout\n\n*💡 Quelle recette précise vous intéresse?*`,
      english: `**Moroccan Cuisine** 🍽️\n\n**Chicken Tagine with Preserved Lemon:**\n1. Brown chicken + onion + olive oil\n2. Add preserved lemons + green olives\n3. Spices: turmeric + ginger + saffron + garlic\n4. Cook 45min on low heat\n\n**Harira Soup:**\n• Tomatoes + lentils + chickpeas\n• Fresh cilantro + cumin + ginger\n• Vermicelli + beaten egg at end\n\n*💡 Ask for any specific Moroccan recipe!*`,
      arabic: `**المطبخ المغربي** 🍽️\n\n**طاجين الدجاج بالليمون المخلل:**\n1. تقلية الدجاج مع البصل وزيت الزيتون\n2. إضافة الليمون المخلل والزيتون الأخضر\n3. البهارات: كركم + زنجبيل + زعفران\n4. طبخ 45 دقيقة على نار هادئة\n\n**الحريرة:**\n• طماطم + عدس + حمص\n• كزبرة + كمون + زنجبيل\n\n*💡 اسألني عن أي وصفة!*`,
    }
  },

  // ── Football / Sport ──────────────────────────────────────────────────────
  {
    keywords: ['football', 'foot', 'sport', 'match', 'équipe', 'joueur', 'buteur', 'champion', 'coupe', 'mondial', 'كرة', 'مونديال', 'رياضة', 'kora', 'mondial', 'champions league'],
    responses: {
      darija: `**Foot w Sport** ⚽\n\n**Maghrib f Mondial 2022 Qatar:**\n• Groupe F: Maroc, Croatie, Belgique, Canada\n• 1er tour → 1er de groupe!\n• 1/8: Maroc 0-0 Espagne (pen: 3-0) ✅\n• 1/4: Maroc 1-0 Portugal ✅ (Cheddira + En-Nesyri)\n• 1/2: Maroc 0-2 France ❌\n• 3ème place: Maroc 1-2 Croatie ❌\n\n**Stars Maghribiyin:**\n• Achraf Hakimi (PSG)\n• Hakim Ziyech (Galatasaray)\n• Youssef En-Nesyri (Fenerbahce)\n• Sofiane Boufal\n\n**Coupe d'Afrique CAN 2025:** Maroc organisateur!\n\n*💡 Sol 3la ay su2al f sport!*`,
      french: `**Football & Sport** ⚽\n\n**Maroc au Mondial Qatar 2022:**\n• Groupe F: 1er (Belgique, Croatie, Canada)\n• 1/8: Maroc 0-0 Espagne (tap: 3-0) ✅\n• 1/4: Maroc 1-0 Portugal ✅ (En-Nesyri)\n• 1/2: Maroc 0-2 France ❌\n• 1er pays africain/arabe en demi-finale mondiale!\n\n**Stars Marocaines:**\n• Achraf Hakimi (PSG) — meilleur latéral africain\n• Hakim Ziyech (Galatasaray)\n• Youssef En-Nesyri (Fenerbahce)\n\n**CAN 2025:** Maroc organisateur 🇲🇦\n\n*💡 Question sur un sport ou joueur précis?*`,
      english: `**Football & Sports** ⚽\n\n**Morocco at 2022 World Cup Qatar:**\n• Group stage: 1st place\n• R16: Morocco 0-0 Spain (pens 3-0) ✅\n• QF: Morocco 1-0 Portugal ✅\n• SF: Morocco 0-2 France ❌\n• First African/Arab team in World Cup semis!\n\n**Moroccan Stars:**\n• Achraf Hakimi (PSG)\n• Hakim Ziyech (Galatasaray)\n• Youssef En-Nesyri (Fenerbahce)\n\n*💡 Ask about any sport or player!*`,
      arabic: `**كرة القدم والرياضة** ⚽\n\n**المغرب في مونديال قطر 2022:**\n• دور المجموعات: المركز الأول\n• ثمن النهائي: المغرب 0-0 إسبانيا (ركلات الترجيح 3-0) ✅\n• ربع النهائي: المغرب 1-0 البرتغال ✅\n• نصف النهائي: المغرب 0-2 فرنسا ❌\n• أول منتخب عربي وأفريقي يبلغ نصف نهائي كأس العالم!\n\n*💡 اسألني عن أي رياضة أو لاعب!*`,
    }
  },

  // ── Anglais / Français langue ─────────────────────────────────────────────
  {
    keywords: ['anglais', 'english', 'langue', 'grammaire', 'grammar', 'tense', 'conjugaison', 'verbe', 'vocabulaire', 'vocabulary', 'إنجليزي', 'français', 'french language'],
    responses: {
      darija: `**Ta3lem Ingliziya** 🇬🇧\n\n**Temps les plus utilisés:**\n• Present Simple: I work / She works\n• Present Continuous: I am working\n• Past Simple: I worked / She worked\n• Future: I will work / I'm going to work\n• Present Perfect: I have worked\n\n**Vocabulaire médical:**\n• Heart = Cœur  •  Lung = Poumon\n• Liver = Foie  •  Kidney = Rein\n• Brain = Cerveau  •  Bone = Os\n\n**Faux amis FR/EN:**\n• Actually ≠ Actuellement (= En ce moment)\n• Library ≠ Librairie (= Bibliothèque)\n\n*💡 Sol 3la ay haja f ingliziya nzidek!*`,
      french: `**Langues — Anglais & Grammaire** 🇬🇧\n\n**Temps anglais essentiels:**\n• Present Simple: I work (habitude)\n• Present Continuous: I am working (maintenant)\n• Past Simple: I worked (passé révolu)\n• Present Perfect: I have worked (passé lié au présent)\n• Future: will + BV ou going to\n\n**Faux amis FR/EN:**\n• Actually ≠ Actuellement → = En réalité\n• Eventually ≠ Éventuellement → = Finalement\n• Library ≠ Librairie → = Bibliothèque\n• Sensible ≠ Sensible → = Raisonnable\n\n*💡 Question de grammaire ou vocabulaire précis?*`,
      english: `**English Grammar — Essentials** 🇬🇧\n\n**Tenses overview:**\n• Present Simple: habits (I work every day)\n• Present Continuous: now (I am working)\n• Past Simple: finished past (I worked yesterday)\n• Present Perfect: past connected to now (I have worked here for 3 years)\n• Future: will (decision now) vs going to (plan)\n\n**Common mistakes:**\n• Its vs It's  •  Their/There/They're\n• Affect (verb) vs Effect (noun)\n• Less (uncountable) vs Fewer (countable)\n\n*💡 Ask about any grammar point!*`,
      arabic: `**اللغة الإنجليزية — الأساسيات** 🇬🇧\n\n**الأزمنة الرئيسية:**\n• المضارع البسيط: عادة (I work)\n• المضارع المستمر: الآن (I am working)\n• الماضي البسيط: ماضٍ منتهٍ (I worked)\n• المستقبل: will + فعل أساسي\n\n**أكثر الأخطاء شيوعاً:**\n• Its vs It's  •  Their/There/They're\n\n*💡 اسألني عن أي قاعدة نحوية!*`,
    }
  },

  // ── Médecine générale / ECG ───────────────────────────────────────────────
  {
    keywords: ['ecg', 'électrocardiogramme', 'onde', 'qrs', 'avc', 'stroke', 'neurologie', 'diabète', 'pharmacologie', 'antibiotique', 'urgence', 'réanimation', 'cardiologie', 'pneumologie', 'pfe', 'résidanat', 'concours'],
    responses: {
      darija: `**Tibb — Points Essentiels** 🩺\n\n**ECG systématique:**\n1. Rythme sinusal? (P avant QRS)\n2. Fréquence: 300 ÷ nb carreaux entre RR\n3. PR: 3-5 petits carreaux (0.12-0.20s)\n4. QRS: < 3 petits carreaux\n5. ST: sus ou sous-décalage?\n\n**BBD vs BBG:**\n• BBD: Oreilles lapin V1, qR V6\n• BBG: rS V1, grand R V6\n\n**AVC — Time is Brain:**\n• FAST: Face/Arm/Speech/Time\n• Thrombolyse: < 4h30 si ischémique\n• Scanner sans injection EN URGENCE\n\n*💡 Sol 3la ay su2al tibbi!*`,
      french: `**Médecine — Points Clés** 🩺\n\nQuel sujet médical vous intéresse?\n• 🫀 Cardiologie (HTA, ECG, IC, SCA)\n• 🧠 Neurologie (AVC, Épilepsie, SEP)\n• 🫁 Pneumologie (BPCO, Asthme, EP, TB)\n• 🩸 Hématologie (Anémies, Hémostase)\n• 💊 Pharmacologie (Antidotes, CI)\n• 🚨 Urgences (ACR, Chocs)\n• 🎓 PFE/Résidanat Maroc\n\nPosez votre question précise avec /flakkai + sujet!`,
      english: `**Medicine — Key Points** 🩺\n\nWhat medical topic interests you?\n• 🫀 Cardiology (HTN, ECG, HF, ACS)\n• 🧠 Neurology (Stroke, Epilepsy, MS)\n• 🫁 Pulmonology (COPD, Asthma, PE, TB)\n• 💊 Pharmacology (Antidotes, interactions)\n• 🚨 Emergency (CPR, Shock management)\n\nAsk: /flakkai + your specific question!`,
      arabic: `**الطب — النقاط الأساسية** 🩺\n\nما الموضوع الطبي الذي يهمك؟\n• 🫀 أمراض القلب والأوعية\n• 🧠 الأعصاب (السكتة، الصرع)\n• 🫁 الجهاز التنفسي (ربو، سل)\n• 💊 الصيدلة السريرية\n• 🚨 الإسعافات الطبية\n\nاسأل: /flakkai + سؤالك المحدد!`,
    }
  },
];

// ── Fallback responses ─────────────────────────────────────────────────────
const FALLBACK: Record<string, (q: string) => string> = {
  darija: (q: string) => `Mfhmt su2alek 3la **"${q}"** 🤔\n\nN9dr n3awnek f:\n• 🩺 Tibb w Anatomie\n• 📐 Mathématiques w Physique\n• 🧪 Chimie\n• 💻 Tech w Informatique\n• 🇲🇦 Tarikh Maghrib\n• 🍽️ Cuisine\n• ⚽ Sport w Foot\n• 🇬🇧 Ingliziya w Français\n\nZid details f su2alek bach n3awnek mzyan!`,
  arabic: (q: string) => `أفهم أنك تسأل عن **"${q}"** 🤔\n\nيمكنني مساعدتك في:\n• الطب والعلوم الصحية\n• الرياضيات والفيزياء والكيمياء\n• التكنولوجيا والبرمجة\n• التاريخ والجغرافيا\n• اللغات\n\nأعطني المزيد من التفاصيل!`,
  french: (q: string) => `Je comprends votre question sur **"${q}"** 🤔\n\nJe peux vous aider en:\n• Médecine & Sciences de la santé\n• Mathématiques, Physique & Chimie\n• Tech & Informatique\n• Histoire & Géographie\n• Langues (anglais, arabe...)\n• Cuisine & Sport\n\nPrécisez davantage pour une réponse optimale!`,
  english: (q: string) => `I understand you're asking about **"${q}"** 🤔\n\nI can help with:\n• Medicine & Health Sciences\n• Mathematics, Physics & Chemistry\n• Tech & Computer Science\n• History & Geography\n• Languages & Literature\n• Cooking & Sports\n\nPlease give more details for a better answer!`,
} as any;

function getFallback(lang: string, query: string): string {
  const fn = FALLBACK[lang] || FALLBACK['french'];
  return fn(query);
}

function getAIResponse(query: string): string {
  const lang = detectLang(query);
  const q = query.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some(k => q.includes(k))) {
      return entry.responses[lang] || entry.responses['french'];
    }
  }
  return getFallback(lang, query);
}

// ── Markdown renderer ──────────────────────────────────────────────────────
function RenderContent({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <span key={i} className="block leading-snug">
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : <span key={j}>{p}</span>)}
          </span>
        );
      })}
    </>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function CommunityChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState<'gemini' | 'chatgpt' | 'claude' | 'flakkai'>('gemini');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [ctxMenu, setCtxMenu] = useState<{ id: string; x: number; y: number } | null>(null);
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

  useEffect(() => {
    const savedKey = localStorage.getItem('mededu_gemini_api_key');
    if (savedKey) setClientApiKey(savedKey);
  }, []);

  const handleSaveApiKey = () => {
    if (!tempKeyInput.trim()) return;
    setClientApiKey(tempKeyInput.trim());
    localStorage.setItem('mededu_gemini_api_key', tempKeyInput.trim());
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

  const sendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = inputValue.trim();
    if (!val) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'me', senderName: 'Badr Bourqi', content: val, timestamp: now(), type: 'text' }]);
    setInputValue('');

    // AUTOMATIC AI RESPONSE FOR EVERY MESSAGE
    const query = val.replace(/^\/flakkai/i, '').replace(/^\//, '').trim() || val;
    const typingId = `t-${Date.now()}`;
    
    // Model name badges
    const modelBadge = selectedModel === 'chatgpt' ? '🤖 ChatGPT (GPT-4o)' 
                     : selectedModel === 'claude' ? '🧠 Claude 3.5' 
                     : selectedModel === 'flakkai' ? '🇲🇦 FLAKKAI Native' 
                     : '♊ Gemini 1.5';

    setMessages(prev => [...prev, { 
      id: typingId, 
      sender: 'flakkai', 
      senderName: modelBadge, 
      content: '', 
      timestamp: now(), 
      type: 'text', 
      isTyping: true 
    }]);
    
    fetch('/api/flakkai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query, history: [], modelId: selectedModel, clientApiKey })
    })
    .then(res => res.json())
    .then(data => {
      const responseText = data.response || getAIResponse(query);
      if (data.isFallback && !clientApiKey) {
        setShowApiKeyBanner(true);
      }
      setMessages(prev => prev.filter(m => m.id !== typingId).concat({
        id: `f-${Date.now()}`, 
        sender: 'flakkai', 
        senderName: modelBadge,
        content: responseText, 
        timestamp: now(), 
        type: 'text',
      }));
    })
    .catch(err => {
      console.warn('API error, using local FLAKKAI engine:', err);
      setMessages(prev => prev.filter(m => m.id !== typingId).concat({
        id: `f-${Date.now()}`, 
        sender: 'flakkai', 
        senderName: modelBadge,
        content: getAIResponse(query), 
        timestamp: now(), 
        type: 'text',
      }));
    });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'me', senderName: 'Badr Bourqi', content: '', timestamp: now(), type: 'image', imageUrl: URL.createObjectURL(file) }]);
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
          setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'me', senderName: 'Badr Bourqi', content: 'Message vocal', timestamp: now(), type: 'audio', audioUrl: url, audioDuration: fmtDur(recordingSeconds) }]);
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

  // ── waveform bars (stable per message) ───────────────────────────────────
  const waveform = (id: string) => Array.from({ length: 28 }, (_, i) => {
    const seed = id.charCodeAt(i % id.length) + i * 7;
    return 20 + (seed % 65);
  });

  return (
    <>
      {/* iOS-style global CSS */}
      <style>{`
        .ios-chat-scroll::-webkit-scrollbar { display: none; }
        .ios-chat-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        /* Bubble tail — mine (right) */
        .bubble-mine::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: -7px;
          width: 14px;
          height: 18px;
          background: #0A84FF;
          clip-path: polygon(0 0, 0 100%, 100% 100%);
          border-radius: 0 0 4px 0;
        }

        /* Bubble tail — other (left) */
        .bubble-other::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: -7px;
          width: 14px;
          height: 18px;
          background: #1C1C1E;
          clip-path: polygon(100% 0, 100% 100%, 0 100%);
          border-radius: 0 0 0 4px;
        }

        /* Bubble tail — FLAKKAI (left, teal) */
        .bubble-ai::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: -7px;
          width: 14px;
          height: 18px;
          background: #0D2A24;
          clip-path: polygon(100% 0, 100% 100%, 0 100%);
          border-radius: 0 0 0 4px;
        }

        /* Message appear animation */
        @keyframes msg-in {
          from { opacity: 0; transform: scale(0.92) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        .msg-appear { animation: msg-in 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        /* Audio waveform playing */
        @keyframes bar-dance {
          0%,100% { transform: scaleY(1); }
          50%      { transform: scaleY(1.8); }
        }
        .bar-playing { animation: bar-dance 0.5s ease-in-out infinite; }

        /* Typing dots */
        @keyframes dot-bounce {
          0%,80%,100% { transform: translateY(0); }
          40%          { transform: translateY(-5px); }
        }
      `}</style>

    <div className="flex flex-col rounded-3xl overflow-hidden shadow-2xl"
      style={{ height: 'calc(100vh - 5rem)', background: '#000000', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif', border: '1px solid rgba(255,255,255,0.07)' }}
      onClick={() => setCtxMenu(null)}>

      {/* ─── iOS Header ─── */}
      <div className="shrink-0 px-4 pt-3 pb-3" style={{ background: 'rgba(18,18,18,0.98)', borderBottom: '0.5px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center gap-3">
          {/* Group avatar with glow */}
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#14b8a6 0%,#0891b2 100%)', boxShadow: '0 0 12px rgba(20,184,166,0.4)' }}>
              <Users className="w-[18px] h-[18px] text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#30D158] border-2 border-black" />
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ color: '#fff', fontSize: 16, fontWeight: 600, letterSpacing: '-0.3px', lineHeight: 1.2 }}>Communauté MedEdu</p>
            <p style={{ color: '#8E8E93', fontSize: 12, marginTop: 1 }}>47 en ligne · <span style={{ color: '#30D158', fontWeight: 500 }}>FLAKKAI actif</span></p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'linear-gradient(135deg,rgba(20,184,166,0.15),rgba(8,145,178,0.1))', border: '0.5px solid rgba(20,184,166,0.25)' }}>
            <Sparkles className="w-3 h-3 text-teal-400" />
            <span style={{ color: '#5AC8FA', fontSize: 11, fontWeight: 700, letterSpacing: '0.5px' }}>AUTO-AI</span>
          </div>
        </div>

        {/* ─── Model Selector Bar ─── */}
        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Modèle IA :</span>
          
          <button onClick={() => setSelectedModel('gemini')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 border flex items-center gap-1.5 ${
              selectedModel === 'gemini'
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-sm shadow-teal-500/20'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
            }`}>
            <span>♊ Gemini 1.5</span>
          </button>

          <button onClick={() => setSelectedModel('chatgpt')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 border flex items-center gap-1.5 ${
              selectedModel === 'chatgpt'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/20'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
            }`}>
            <span>🤖 ChatGPT (GPT-4o)</span>
          </button>

          <button onClick={() => setSelectedModel('claude')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 border flex items-center gap-1.5 ${
              selectedModel === 'claude'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
            }`}>
            <span>🧠 Claude 3.5</span>
          </button>

          <button onClick={() => setSelectedModel('flakkai')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 border flex items-center gap-1.5 ${
              selectedModel === 'flakkai'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
            }`}>
            <span>🇲🇦 FLAKKAI Native</span>
          </button>
        </div>
      </div>

      {/* ─── Messages ─── */}
      <div ref={scrollRef} className="ios-chat-scroll flex-1 overflow-y-auto px-4 py-4" style={{ background: '#000', gap: 2, display: 'flex', flexDirection: 'column' }}>
        {messages.length === 0 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, userSelect: 'none' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(20,184,166,0.07)', border: '1px solid rgba(20,184,166,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles style={{ width: 28, height: 28, color: 'rgba(20,184,166,0.35)' }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#48484A', fontSize: 14, fontWeight: 500 }}>Aucun message pour l'instant</p>
              <p style={{ color: '#3A3A3C', fontSize: 12, marginTop: 6 }}>Tapez <code style={{ color: 'rgba(20,184,166,0.5)', fontFamily: 'monospace' }}>/flakkai bonjour</code> pour commencer</p>
            </div>
          </div>
        )}

        {messages.map((msg, idx) => {
          const mine = msg.sender === 'me';
          const ai = msg.sender === 'flakkai';
          const prevSame = idx > 0 && messages[idx - 1].sender === msg.sender;
          const nextSame = idx < messages.length - 1 && messages[idx + 1].sender === msg.sender;
          const isLast = !nextSame;
          const bars = waveform(msg.id);

          return (
            <div key={msg.id} className={`msg-appear flex flex-col ${mine ? 'items-end' : 'items-start'}`}
              style={{ marginTop: prevSame ? 2 : 14 }}>

              {/* Sender name */}
              {!mine && !prevSame && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, marginLeft: 36 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: ai ? '#5AC8FA' : '#8E8E93', letterSpacing: '-0.1px' }}>
                    {ai ? '✦ FLAKKAI' : msg.senderName}
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, maxWidth: '82%', flexDirection: mine ? 'row-reverse' : 'row' }}>

                {/* Avatar */}
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 2, opacity: isLast ? 1 : 0,
                  background: ai ? 'linear-gradient(135deg,#14b8a6,#0891b2)' : mine ? 'linear-gradient(135deg,#0A84FF,#0055D4)' : '#2C2C2E',
                  color: '#fff',
                  boxShadow: ai ? '0 0 8px rgba(20,184,166,0.35)' : mine ? '0 0 8px rgba(10,132,255,0.3)' : 'none',
                  border: (!ai && !mine) ? '0.5px solid rgba(255,255,255,0.1)' : 'none',
                  transition: 'opacity 0.15s',
                }}>
                  {ai ? '✦' : msg.senderName.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                </div>

                {/* Bubble */}
                <div
                  onContextMenu={e => mine && msg.type === 'text' && !msg.isTyping && openCtx(e, msg.id)}
                  onDoubleClick={e => mine && msg.type === 'text' && !msg.isTyping && openCtx(e, msg.id)}
                  className={`relative ${isLast ? (mine ? 'bubble-mine' : ai ? 'bubble-ai' : 'bubble-other') : ''}`}
                  style={{
                    borderRadius: mine
                      ? (prevSame ? '18px 18px 6px 18px' : '18px 18px 6px 18px')
                      : (prevSame ? '18px 18px 18px 6px' : '18px 18px 18px 6px'),
                    overflow: msg.type === 'image' ? 'hidden' : 'visible',
                    background: mine
                      ? '#0A84FF'
                      : ai
                      ? 'linear-gradient(145deg,#0f2d26,#0a1f1a)'
                      : '#1C1C1E',
                    border: ai ? '0.5px solid rgba(20,184,166,0.22)' :
                            mine ? 'none' :
                            '0.5px solid rgba(255,255,255,0.06)',
                    boxShadow: mine ? '0 1px 6px rgba(10,132,255,0.25)' :
                               ai   ? '0 1px 6px rgba(20,184,166,0.12)' :
                                      '0 1px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* TYPING INDICATOR */}
                  {msg.isTyping && (
                    <div style={{ padding: '10px 16px', display: 'flex', gap: 4, alignItems: 'center', height: 40 }}>
                      {[0, 160, 320].map((d, i) => (
                        <span key={i} style={{
                          width: 7, height: 7, borderRadius: '50%',
                          background: '#5AC8FA',
                          display: 'inline-block',
                          animation: `dot-bounce 0.9s ${d}ms ease-in-out infinite`,
                        }} />
                      ))}
                    </div>
                  )}

                  {/* TEXT */}
                  {!msg.isTyping && msg.type === 'text' && editingId !== msg.id && (
                    <div style={{ padding: '9px 14px', fontSize: 15, color: '#fff', whiteSpace: 'pre-line', lineHeight: 1.42, fontWeight: 400, letterSpacing: '-0.1px' }}>
                      <RenderContent text={msg.content} />
                      {msg.edited && <span style={{ fontSize: 10, opacity: 0.38, marginLeft: 4 }}>modifié</span>}
                    </div>
                  )}

                  {/* EDIT MODE */}
                  {editingId === msg.id && (
                    <div style={{ padding: '6px 8px', display: 'flex', gap: 4, alignItems: 'center' }}>
                      <input autoFocus value={editValue} onChange={e => setEditValue(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') confirmEdit(); if (e.key === 'Escape') setEditingId(null); }}
                        style={{ flex: 1, background: 'transparent', color: '#fff', fontSize: 15, outline: 'none', padding: '0 8px', fontFamily: 'inherit' }} />
                      <button onClick={confirmEdit} style={{ padding: 4, color: '#30D158' }}><Check style={{ width: 16, height: 16 }} /></button>
                      <button onClick={() => setEditingId(null)} style={{ padding: 4, color: '#FF453A' }}><X style={{ width: 16, height: 16 }} /></button>
                    </div>
                  )}

                  {/* IMAGE — iOS style full bleed */}
                  {msg.type === 'image' && msg.imageUrl && (
                    <div style={{ borderRadius: 18, overflow: 'hidden', maxWidth: 240 }}>
                      <img src={msg.imageUrl} alt="" style={{ display: 'block', width: '100%', maxHeight: 220, objectFit: 'cover' }} />
                    </div>
                  )}

                  {/* AUDIO — iOS waveform */}
                  {msg.type === 'audio' && msg.audioUrl && (
                    <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, minWidth: 200, maxWidth: 240 }}>
                      <button
                        onClick={() => togglePlay(msg.id, msg.audioUrl!)}
                        style={{
                          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                          background: mine ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: 'none', cursor: 'pointer', transition: 'background 0.15s',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                        }}>
                        <span style={{ color: '#fff', fontSize: 14, marginLeft: playingId === msg.id ? 0 : 2 }}>
                          {playingId === msg.id ? '⏸' : '▶'}
                        </span>
                      </button>

                      {/* Waveform */}
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1.5, height: 28, overflow: 'hidden' }}>
                        {bars.map((h, i) => (
                          <div key={i}
                            className={playingId === msg.id ? 'bar-playing' : ''}
                            style={{
                              flex: 1, borderRadius: 99,
                              background: mine ? 'rgba(255,255,255,0.5)' : 'rgba(20,184,166,0.5)',
                              height: `${h}%`,
                              transformOrigin: 'center',
                              animationDelay: `${(i * 37) % 500}ms`,
                            }}
                          />
                        ))}
                      </div>

                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, flexShrink: 0, fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
                        {msg.audioDuration || '0:00'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Timestamp — show after last in group */}
              {isLast && (
                <span style={{ fontSize: 11, color: '#48484A', marginTop: 4, [mine ? 'marginRight' : 'marginLeft']: 36, fontWeight: 400 }}>
                  {fmtTime(msg.timestamp)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* ─── iOS Context Menu (blur sheet) ─── */}
      {ctxMenu && (
        <div className="fixed z-[999]" style={{ top: ctxMenu.y - 10, left: Math.min(ctxMenu.x, (typeof window !== 'undefined' ? window.innerWidth : 400) - 170) }}
          onClick={e => e.stopPropagation()}>
          <div style={{ background: 'rgba(44,44,46,0.95)', backdropFilter: 'blur(25px)', borderRadius: 16, overflow: 'hidden', minWidth: 160, boxShadow: '0 8px 32px rgba(0,0,0,0.6)', border: '0.5px solid rgba(255,255,255,0.12)' }}>
            <button onClick={() => { const m = messages.find(x => x.id === ctxMenu.id); if (m) startEdit(m); }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', color: '#fff', fontSize: 15, fontWeight: 400, background: 'transparent', cursor: 'pointer', borderBottom: '0.5px solid rgba(255,255,255,0.08)', fontFamily: 'inherit' }}
              className="hover:bg-white/5 transition-colors">
              <Pencil style={{ width: 16, height: 16, color: '#0A84FF' }} />Modifier
            </button>
            <button onClick={() => { deleteMsg(ctxMenu.id); setCtxMenu(null); }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', color: '#FF453A', fontSize: 15, fontWeight: 400, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}
              className="hover:bg-red-500/10 transition-colors">
              <Trash2 style={{ width: 16, height: 16 }} />Supprimer
            </button>
          </div>
        </div>
      )}

      {/* ─── Recording Bar ─── */}
      {isRecording && (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', background: 'rgba(255,69,58,0.07)', borderTop: '0.5px solid rgba(255,69,58,0.15)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FF453A', display: 'inline-block', animation: 'dot-bounce 1s ease-in-out infinite' }} />
          <span style={{ color: '#FF453A', fontSize: 13, flex: 1, fontWeight: 500 }}>Enregistrement en cours…</span>
          <span style={{ color: '#FF453A', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{fmtDur(recordingSeconds)}</span>
          <span style={{ color: 'rgba(255,69,58,0.45)', fontSize: 11 }}>Tap 🎤 pour envoyer</span>
        </div>
      )}

      {/* ─── API Key Banner ─── */}
      {showApiKeyBanner && (
        <div style={{ padding: '16px', background: 'linear-gradient(135deg, rgba(20,184,166,0.1), rgba(8,145,178,0.15))', borderTop: '1px solid rgba(20,184,166,0.3)', borderBottom: '1px solid rgba(20,184,166,0.3)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <p style={{ color: '#5AC8FA', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>🔓 Débloquez l'IA Complète (Claude, GPT, Gemini)</p>
              <p style={{ color: '#E5E5EA', fontSize: 13, lineHeight: 1.4 }}>Les API gratuites sont actuellement surchargées. Pour obtenir de vraies réponses IA sans aucune limite, ajoutez votre propre clé Gemini API gratuite (ça prend 2 minutes sur Google AI Studio).</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input 
                type="password"
                placeholder="Collez votre clé API Gemini ici..."
                value={tempKeyInput}
                onChange={e => setTempKeyInput(e.target.value)}
                style={{ flex: 1, padding: '8px 14px', borderRadius: 8, background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none' }}
              />
              <button 
                onClick={handleSaveApiKey}
                style={{ padding: '8px 16px', borderRadius: 8, background: '#0A84FF', color: '#fff', fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                Enregistrer
              </button>
            </div>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: '#30D158', fontSize: 12, textDecoration: 'underline' }}>
              Comment obtenir une clé gratuite ?
            </a>
          </div>
        </div>
      )}

      {/* ─── /flakkai autocomplete ─── */}
      {inputValue.startsWith('/f') && !inputValue.startsWith('/flakkai ') && (
        <div style={{ flexShrink: 0, padding: '6px 12px', background: 'rgba(12,12,12,0.98)', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => { setInputValue('/flakkai '); inputRef.current?.focus(); }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 12, background: 'rgba(20,184,166,0.07)', border: '0.5px solid rgba(20,184,166,0.18)', cursor: 'pointer', fontFamily: 'inherit' }}>
            <Sparkles style={{ width: 13, height: 13, color: '#5AC8FA' }} />
            <span style={{ color: '#5AC8FA', fontSize: 13, fontFamily: 'monospace', fontWeight: 700 }}>/flakkai</span>
            <span style={{ color: 'rgba(90,200,250,0.5)', fontSize: 12 }}>— Poser une question à l'IA</span>
          </button>
        </div>
      )}

      {/* ─── iOS Input Bar ─── */}
      <div style={{ flexShrink: 0, padding: '8px 12px 10px', background: 'rgba(18,18,18,0.97)', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
        <form onSubmit={sendText} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />

          {/* Image btn */}
          <button type="button" onClick={() => fileInputRef.current?.click()}
            style={{ padding: 6, color: '#636366', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '50%', transition: 'color 0.15s', flexShrink: 0 }}>
            <ImageIcon style={{ width: 22, height: 22 }} />
          </button>

          {/* Mic btn */}
          <button type="button" onClick={toggleRecording}
            style={{ padding: 6, borderRadius: '50%', border: 'none', cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s',
              color: isRecording ? '#FF453A' : '#636366',
              background: isRecording ? 'rgba(255,69,58,0.12)' : 'transparent',
              animation: isRecording ? 'dot-bounce 1s ease-in-out infinite' : 'none',
            }}>
            {isRecording ? <MicOff style={{ width: 22, height: 22 }} /> : <Mic style={{ width: 22, height: 22 }} />}
          </button>

          {/* Text input pill */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '9px 16px', borderRadius: 999, background: '#1C1C1E', border: '0.5px solid rgba(255,255,255,0.08)' }}>
            <input ref={inputRef} type="text" value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) sendText(); }}
              disabled={isRecording}
              placeholder={isRecording ? '🎤 Enregistrement...' : 'iMessage  ·  /flakkai'}
              style={{ flex: 1, background: 'transparent', color: '#fff', fontSize: 15, outline: 'none', fontFamily: 'inherit', fontWeight: 400, letterSpacing: '-0.1px' }} />
          </div>

          {/* Send btn — appears when text present */}
          {inputValue.trim() && !isRecording ? (
            <button type="submit" style={{ width: 34, height: 34, borderRadius: '50%', background: '#0A84FF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(10,132,255,0.35)', transition: 'transform 0.12s', }}>
              <Send style={{ width: 16, height: 16, color: '#fff', marginLeft: 1 }} />
            </button>
          ) : null}
        </form>
      </div>
    </div>
    </>
  );
}
