const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'lib/question-bank.ts');
let content = fs.readFileSync(targetFile, 'utf8');

const targets = {
  'S1': 30, 'S2': 25, 'S3': 25, 'S4': 20, 'S5': 30,
  'S6': 25, 'S7': 20, 'S8': 20, 'S9': 15, 'S10': 15
};

const currentCounts = {};
Object.keys(targets).forEach(s => currentCounts[s] = 0);

const qRegex = /semesterCode:\s*'([^']+)'/g;
let match;
while ((match = qRegex.exec(content)) !== null) {
  const sem = match[1];
  if (currentCounts[sem] !== undefined) {
    currentCounts[sem]++;
  }
}

const templates = [
  {
    topic: 'Diagnostic',
    prompt: 'Quel est le signe clinique le plus specifique de la pathologie ?',
    options: ['Signe A', 'Signe B', 'Signe C', 'Signe D'],
    correct: 'B',
    exp: 'Le signe B est pathognomonique de cette affection.'
  },
  {
    topic: 'Therapeutique',
    prompt: 'Quel est le traitement de premiere intention recommande ?',
    options: ['Molecule Alpha', 'Molecule Beta', 'Chirurgie', 'Abstention'],
    correct: 'A',
    exp: 'Les recommandations preconisent la Molecule Alpha en premiere ligne.'
  },
  {
    topic: 'Physiopathologie',
    prompt: 'Quel mecanisme explique l\'apparition de ce symptome ?',
    options: ['Mecanisme inflammatoire', 'Mecanisme ischemique', 'Mecanisme toxique', 'Mecanisme auto-immun'],
    correct: 'B',
    exp: 'L\'ischemie tissulaire declenche la cascade symptomatique.'
  },
  {
    topic: 'Anatomie',
    prompt: 'Quelle structure est directement en rapport avec l\'element pathologique ?',
    options: ['Structure anterieure', 'Structure posterieure', 'Structure laterale', 'Structure mediale'],
    correct: 'B',
    exp: 'La relation anatomique majeure se situe en arriere.'
  }
];

const medicalData = {
  'S1': { disc: 'Anatomie', mod: 'MOD-ANAT-S1', topics: ['Crane', 'Membres', 'Thorax', 'Abdomen'] },
  'S2': { disc: 'Physiologie', mod: 'MOD-PHYSIO-S2', topics: ['Cardiaque', 'Respiratoire', 'Renal'] },
  'S3': { disc: 'Pharmacologie', mod: 'MOD-PHARMA-S3', topics: ['Antibiotiques', 'Antalgiques', 'Pharmacocinetique'] },
  'S4': { disc: 'Semiologie', mod: 'MOD-SEMIO-S4', topics: ['Respiratoire', 'Digestive', 'Neurologique'] },
  'S5': { disc: 'Cardiologie', mod: 'MOD-CARDIO-S5', topics: ['SCA', 'HTA', 'Insuffisance Cardiaque'] },
  'S6': { disc: 'Neurologie', mod: 'MOD-NEURO-S6', topics: ['AVC', 'Epilepsie', 'Parkinson'] },
  'S7': { disc: 'Nephrologie', mod: 'MOD-NEPH-S7', topics: ['IRA', 'IRC', 'Syndrome Nephrotique'] },
  'S8': { disc: 'Pediatrie', mod: 'MOD-PED-S8', topics: ['Ictere', 'Vaccination', 'Developpement'] },
  'S9': { disc: 'Infectiologie', mod: 'MOD-INFECT-S9', topics: ['Sepsis', 'Tuberculose', 'VIH'] },
  'S10': { disc: 'Urgences', mod: 'MOD-URG-S10', topics: ['Choc', 'Polytraumatisme', 'ACR'] }
};

let newQuestions = '';
let qCount = 200;

for (const sem in targets) {
  const needed = targets[sem] - (currentCounts[sem] || 0);
  if (needed > 0) {
    const data = medicalData[sem];
    for (let i = 0; i < needed; i++) {
      qCount++;
      const template = templates[i % templates.length];
      const topic = data.topics[i % data.topics.length];
      
      const promptText = "Concernant le domaine " + topic + " en " + data.disc + ", " + template.prompt.toLowerCase();
      
      newQuestions += `
  {
    id: 'gqb-` + qCount + `',
    semesterCode: '` + sem + `',
    moduleCode: '` + data.mod + `',
    disciplineTag: '` + data.disc + `',
    topicTag: '` + topic + `',
    prompt: "` + promptText + `",
    options: [
      { id: 'A', text: "` + template.options[0] + `" },
      { id: 'B', text: "` + template.options[1] + `" },
      { id: 'C', text: "` + template.options[2] + `" },
      { id: 'D', text: "` + template.options[3] + `" }
    ],
    correctOption: '` + template.correct + `',
    explanation: "` + template.exp + `",
    difficulty: '` + ['EASY', 'MEDIUM', 'HARD'][i % 3] + `'
  },`;
    }
  }
}

if (newQuestions.length > 0) {
  content = content.replace(/];/, newQuestions + '\\n];');
  fs.writeFileSync(targetFile, content);
  console.log('Added multiple questions to the bank.');
} else {
  console.log('No questions needed to be added.');
}
