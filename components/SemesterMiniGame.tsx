'use client';
// components/SemesterMiniGame.tsx
// MedEdu Morocco — 2D Medical Arcade Clinical Engine (Minimum 10 QCMs per Semester, Random Answer Shuffling & Dynamic Question Pools)

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, Sparkles, HeartPulse, Trophy, RefreshCcw, 
  Zap, CheckCircle2, XCircle, ShieldAlert, Timer, Flame, Award,
  Activity, Stethoscope, ChevronRight, Layers, Filter
} from 'lucide-react';

export interface GameScenario {
  id: string;
  semesterCode: string;
  moduleName: string;
  title: string;
  clinicalPresentation: string;
  vitalSign: string;
  correctOptionId: 'A' | 'B' | 'C' | 'D' | 'E';
  options: {
    id: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
    feedbackText: string;
  }[];
}

// 10+ QUESTIONS PER SEMESTER WITH VARIED CORRECT ANSWERS (A, B, C, D, E)
const FULL_SEMESTER_SCENARIOS_BANK: Record<string, GameScenario[]> = {
  S1: [
    {
      id: 'g-s1-1', semesterCode: 'S1', moduleName: 'Anatomie I', title: 'Fracture Diaphyse Humérale',
      clinicalPresentation: 'AVP chez un homme de 25 ans. Main en goutte avec impotence de l extension du poignet.',
      vitalSign: 'Déficit Moteur Radial', correctOptionId: 'B',
      options: [
        { id: 'A', text: 'Lésion du Nerf Médian au canal carpien', feedbackText: '❌ Faux ! Médian donne la main de prédicateur.' },
        { id: 'B', text: 'Lésion du Nerf Radial f le sillon huméral', feedbackText: '✓ Vrai ! Le nerf radial contourne l humérus, sa lésion donne la main en goutte.' },
        { id: 'C', text: 'Compression du Nerf Ulnaire à l coude', feedbackText: '❌ Faux ! Ulnaire donne la griffe ulnaire.' },
        { id: 'D', text: 'Atteinte du plexus brachial inférieur (C8-T1)', feedbackText: '❌ Faux ! Paralysie de Dejerine-Klumpke.' },
        { id: 'E', text: 'Rupture du tendon du biceps brachial', feedbackText: '❌ Faux ! Signe de Popeye.' },
      ]
    },
    {
      id: 'g-s1-2', semesterCode: 'S1', moduleName: 'Histologie', title: 'Échanges Alvéolaires',
      clinicalPresentation: 'Structure microscopique alvéolaire. Quelle cellule assure 95% des échanges gazeux ?',
      vitalSign: 'Épithélium Alvéolaire', correctOptionId: 'C',
      options: [
        { id: 'A', text: 'Pneumocytes de Type II', feedbackText: '❌ Faux ! Type II sécrètent le surfactant.' },
        { id: 'B', text: 'Macrophages alvéolaires', feedbackText: '❌ Faux ! Fonction d immunité.' },
        { id: 'C', text: 'Pneumocytes de Type I (Pavimenteux)', feedbackText: '✓ Vrai ! Pneumocytes I ultra-fins (0.2µm) pour l hématose.' },
        { id: 'D', text: 'Cellules de Clara (Club cells)', feedbackText: '❌ Faux ! F les bronchioles terminales.' },
        { id: 'E', text: 'Fibroblastes interstitiels', feedbackText: '❌ Faux ! Sécrètent le collagène.' },
      ]
    },
    {
      id: 'g-s1-3', semesterCode: 'S1', moduleName: 'Ostéologie', title: 'Fracture du Scaphoïde',
      clinicalPresentation: 'Chute sur la paume de la main chez un jeune sportif. Douleur exquise à la tabatière anatomique.',
      vitalSign: 'Tabatière Anatomique (+)', correctOptionId: 'A',
      options: [
        { id: 'A', text: 'Fracture du Scaphoïde Carpie (Risque de nécrose de la tête)', feedbackText: '✓ Vrai ! Vascularisation rétrograde par l artère radiale.' },
        { id: 'B', text: 'Entorse du poignet bénigne', feedbackText: '❌ Faux ! Tabatière (+) = Scaphoïde jusqu à preuve du contraire.' },
        { id: 'C', text: 'Fracture de Pouteau-Colles', feedbackText: '❌ Faux ! Épiphyse inférieure du radius.' },
        { id: 'D', text: 'Luxation du Lunatum', feedbackText: '❌ Faux ! Signe du coup de hache.' },
        { id: 'E', text: 'Fracture du Triquetrum', feedbackText: '❌ Faux ! Face dorsale du carpe.' },
      ]
    },
    {
      id: 'g-s1-4', semesterCode: 'S1', moduleName: 'Biochimie', title: 'Glycolyse Anaérobie',
      clinicalPresentation: 'Enzyme clé irréversible régulatrice de la glycolyse activée par l AMP et le F-2,6-bP.',
      vitalSign: 'Étape 3 Glycolyse', correctOptionId: 'D',
      options: [
        { id: 'A', text: 'Hexokinase', feedbackText: '❌ Faux ! Hexokinase = étape 1.' },
        { id: 'B', text: 'Pyruvate Kinase', feedbackText: '❌ Faux ! Pyruvate kinase = étape 10.' },
        { id: 'C', text: 'Glucose-6-Phosphatase', feedbackText: '❌ Faux ! Enzyme de la néoglucogenèse.' },
        { id: 'D', text: 'Phosphofructokinase-1 (PFK-1)', feedbackText: '✓ Vrai ! PFK-1 est la principale enzyme régulatrice.' },
        { id: 'E', text: 'Lactate Déshydrogénase', feedbackText: '❌ Faux ! Réduction du pyruvate f la fermentation.' },
      ]
    },
    {
      id: 'g-s1-5', semesterCode: 'S1', moduleName: 'Biologie Cellulaire', title: 'Cycle Cellulaire M-Phase',
      clinicalPresentation: 'Phase de la mitose où les chromosomes sont alignés sur la plaque équatoriale.',
      vitalSign: 'Fuseau Mitotique', correctOptionId: 'B',
      options: [
        { id: 'A', text: 'Prophase', feedbackText: '❌ Faux ! Condensation de la chromatine.' },
        { id: 'B', text: 'Métaphase', feedbackText: '✓ Vrai ! Plaque équatoriale métaphasique.' },
        { id: 'C', text: 'Anaphase', feedbackText: '❌ Faux ! Séparation des chromatides sœurs.' },
        { id: 'D', text: 'Télophase', feedbackText: '❌ Faux ! Décondensation et enveloppe nucléaire.' },
        { id: 'E', text: 'Interphase G2', feedbackText: '❌ Faux ! Réplication terminée.' },
      ]
    },
    {
      id: 'g-s1-6', semesterCode: 'S1', moduleName: 'Anatomie Arthrologie', title: 'Articulation du Genou',
      clinicalPresentation: 'Entorse grave du genou chez un footballeur. Tiroir antérieur positif à l examen.',
      vitalSign: 'Tiroir Antérieur (+)', correctOptionId: 'E',
      options: [
        { id: 'A', text: 'Rupture du Ligament Croisé Postérieur (LCP)', feedbackText: '❌ Faux ! LCP donne le tiroir postérieur.' },
        { id: 'B', text: 'Lésion du Menisque Interne isolé', feedbackText: '❌ Faux ! Menisque donne le cri du ménisque.' },
        { id: 'C', text: 'Entorse du Ligament Collatéral Interne', feedbackText: '❌ Faux ! LCI donne le laxité en valgus.' },
        { id: 'D', text: 'Syndrome rotulien aigu', feedbackText: '❌ Faux ! Douleur à l instabilité rotulienne.' },
        { id: 'E', text: 'Rupture du Ligament Croisé Antérieur (LCA)', feedbackText: '✓ Vrai ! Tiroir antérieur et test de Lachman signent la rupture du LCA.' },
      ]
    },
    {
      id: 'g-s1-7', semesterCode: 'S1', moduleName: 'Cytologie', title: 'Lysosomes et Autophagie',
      clinicalPresentation: 'Organite cellulaire contenant des hydrolases acides (pH 4.5 - 5.0) pour la dégradation.',
      vitalSign: 'pH Intracellulaire 4.8', correctOptionId: 'A',
      options: [
        { id: 'A', text: 'Lysosome', feedbackText: '✓ Vrai ! Contient des hydrolases acides maintenues par pompe à protons V-type.' },
        { id: 'B', text: 'Peroxysome', feedbackText: '❌ Faux ! Détoxification par catalase et H2O2.' },
        { id: 'C', text: 'Appareil de Golgi', feedbackText: '❌ Faux ! Maturation des protéines et glycosylation.' },
        { id: 'D', text: 'Réticulum Endoplasmique Lisse', feedbackText: '❌ Faux ! Synthèse des lipides et Ca2+.' },
        { id: 'E', text: 'Endosome Précoce', feedbackText: '❌ Faux ! Tri du matériel endocyté.' },
      ]
    },
    {
      id: 'g-s1-8', semesterCode: 'S1', moduleName: 'Anatomie Thoracique', title: 'Canal Thoracique',
      clinicalPresentation: 'Vaisseau lymphatique principal draining la lymphe du corps sous-diaphragmatique. Où se jette-t-il ?',
      vitalSign: 'Lymphe Systémique', correctOptionId: 'C',
      options: [
        { id: 'A', text: 'Oreillette Droite directement', feedbackText: '❌ Faux ! Le sang veineux y arrive par les veines caves.' },
        { id: 'B', text: 'Veine Cave Inférieure', feedbackText: '❌ Faux !' },
        { id: 'C', text: 'Confluent jugulo-subclavier gauche (Angle de Pirogoff gauche)', feedbackText: '✓ Vrai ! Le canal thoracique se termine dans le confluent Pirogoff gauche.' },
        { id: 'D', text: 'Veine Porte Hépatique', feedbackText: '❌ Faux ! Veine porte draine le tube digestif.' },
        { id: 'E', text: 'Veine Azygos', feedbackText: '❌ Faux ! Draine les parois thoraciques.' },
      ]
    },
    {
      id: 'g-s1-9', semesterCode: 'S1', moduleName: 'Biochimie Protéique', title: 'Structure de l Hémoglobine',
      clinicalPresentation: 'Protéine tétramérique fixant l oxygène. Quel effet allostérique diminue l affinité de l Hb pour l O2 (effet Bohr) ?',
      vitalSign: 'Effet Bohr / pH', correctOptionId: 'D',
      options: [
        { id: 'A', text: 'Augmentation du pH (Alcalose)', feedbackText: '❌ Faux ! L alcalose augmente l affinité pour l O2.' },
        { id: 'B', text: 'Chute du 2,3-BPG', feedbackText: '❌ Faux ! La baisse de 2,3-BPG dévie la courbe à gauche.' },
        { id: 'C', text: 'Diminution de la PCO2', feedbackText: '❌ Faux ! La baisse de CO2 dévie à gauche.' },
        { id: 'D', text: 'Acidose (Baisse du pH) et élévation de la PCO2', feedbackText: '✓ Vrai ! L acidose et le CO2 stabilisent la forme désoxy (T) et libèrent l O2.' },
        { id: 'E', text: 'Hypothermie extrême', feedbackText: '❌ Faux ! L hypothermie dévie la courbe à gauche.' },
      ]
    },
    {
      id: 'g-s1-10', semesterCode: 'S1', moduleName: 'Histologie Osseuse', title: 'Ostéoclastes et Résorption',
      clinicalPresentation: 'Cellule géante multinucléée responsable de la résorption osseuse.',
      vitalSign: 'Lacune de Howship', correctOptionId: 'B',
      options: [
        { id: 'A', text: 'Ostéoblaste', feedbackText: '❌ Faux ! Ostéoblaste synthétise la matrice osseuse.' },
        { id: 'B', text: 'Ostéoclaste', feedbackText: '✓ Vrai ! Cellule dérivée de la lignée monocyte-macrophage.' },
        { id: 'C', text: 'Ostéocyte', feedbackText: '❌ Faux ! Ostéoblaste quiescent incarcéré dans son ostéoplaste.' },
        { id: 'D', text: 'Chondrocyte', feedbackText: '❌ Faux ! Cellule du cartilage.' },
        { id: 'E', text: 'Fibroblaste', feedbackText: '❌ Faux ! Cellule du tissu conjonctif banal.' },
      ]
    },
  ],
  S5: [
    {
      id: 'g-s5-1', semesterCode: 'S5', moduleName: 'Cardiologie', title: 'SCA ST+ Antérieur Aigu',
      clinicalPresentation: 'Homme de 54 ans, douleur constrictive rétrosternale violente depuis 1h30. ECG : Sus-décalage de V1 à V5 (Onde de Pardee).',
      vitalSign: 'ECG: Pardee V1-V5', correctOptionId: 'C',
      options: [
        { id: 'A', text: 'Thrombolyse IV immédiate sans tenter l angioplastie', feedbackText: '❌ Faux ! ICP primaire est supérieure si disponible dans les 120min.' },
        { id: 'B', text: 'Prescription de dérivés nitrés seuls et attente troponine', feedbackText: '❌ Mortel ! Perte du myocarde.' },
        { id: 'C', text: 'Angioplastie Primaire en urgence (ICP < 120 min) + Aspirine + Ticagrélor', feedbackText: '✓ Vrai ! ICP Primaire est le GOLD STANDARD absolu.' },
        { id: 'D', text: 'Heparine seule et repos au lit', feedbackText: '❌ Insuffisant.' },
        { id: 'E', text: 'Pontage aorto-coronarien en urgence extrême d emblée', feedbackText: '❌ Reservé aux échecs d ICP ou lésions complexes.' },
      ]
    },
    {
      id: 'g-s5-2', semesterCode: 'S5', moduleName: 'Pneumologie', title: 'Asthme Aigu Grave (AAG)',
      clinicalPresentation: 'Jeune fille de 18 ans en détresse respiratoire. Impossible de parler. Auscultation: SILENCE RESPIRATOIRE bilatéral.',
      vitalSign: 'SpO2: 83% | Silence Auscultatoire', correctOptionId: 'A',
      options: [
        { id: 'A', text: 'O2 fort débit + Salbutamol nébulisé + Corticoïdes IV', feedbackText: '✓ Vrai ! Le silence auscultatoire est un signe de gravité extrême.' },
        { id: 'B', text: 'Sédatif léger pour anxiété', feedbackText: '❌ Contre-indiqué ! Risque d arrêt respiratoire.' },
        { id: 'C', text: 'Antibiothérapie Amoxicilline seule', feedbackText: '❌ Inefficace f la crise aiguë.' },
        { id: 'D', text: 'Faire une spirométrie EFR immédiatement', feedbackText: '❌ Impossible et dangereux en urgence.' },
        { id: 'E', text: 'Mise en PLS sans oxygène', feedbackText: '❌ Faux.' },
      ]
    },
    {
      id: 'g-s5-3', semesterCode: 'S5', moduleName: 'Cardiologie', title: 'Fibrillation Auriculaire (FA)',
      clinicalPresentation: 'Patient de 68 ans, palpitations. ECG : Rythme irrégulièrement irrégulier sans ondes P visibles. CHA2DS2-VASc = 4.',
      vitalSign: 'ECG: Rythme Irrégulier', correctOptionId: 'D',
      options: [
        { id: 'A', text: 'Aspirine 75mg par jour seule', feedbackText: '❌ Faux ! L aspirine n protège pas contre l AVC f la FA.' },
        { id: 'B', text: 'Cardioversion électrique sans anticoagulation préalable', feedbackText: '❌ Risque majeur d embolie cérébrale.' },
        { id: 'C', text: 'Pas de traitement anticoagulant nécessaire', feedbackText: '❌ Faux ! Score ≥ 2 chez l homme / ≥ 3 chez la femme exige anticoagulation.' },
        { id: 'D', text: 'Anticoagulation Curative par AOD (Rivaroxaban/Apixaban) ou AVK', feedbackText: '✓ Vrai ! CHA2DS2-VASc = 4 nécessite une anticoagulation curative.' },
        { id: 'E', text: 'Amiodarone seule sans anticoagulant', feedbackText: '❌ Risque thromo-embolique persiste.' },
      ]
    },
    {
      id: 'g-s5-4', semesterCode: 'S5', moduleName: 'Cardiologie', title: 'OAP Cardiogénique',
      clinicalPresentation: 'Patient en détresse respiratoire aiguë. Dyspnée majeure, grésinement laryngé et crachats mousseux saumonés.',
      vitalSign: 'PA: 190/110 | SpO2: 82%', correctOptionId: 'B',
      options: [
        { id: 'A', text: 'Remplissage vasculaire rapide par Sérum Salé 1 Litre', feedbackText: '❌ Mortel ! Aggrave la surcharge volumique.' },
        { id: 'B', text: 'Furosemide IV (Lasilix®) + Nitrés IV + VNI (CPAP) + O2', feedbackText: '✓ Vrai ! La triade Diurétique + Vasodilatateur + CPAP est le traitement de choix.' },
        { id: 'C', text: 'Bêta-bloquant fort dose IV', feedbackText: '❌ Contre-indiqué en phase aiguë décompensée.' },
        { id: 'D', text: 'Anticoagulation par thrombolyse', feedbackText: '❌ Inutile.' },
        { id: 'E', text: 'Sédation par Benzodiazépines fortes', feedbackText: '❌ Risque de dépression respiratoire.' },
      ]
    },
    {
      id: 'g-s5-5', semesterCode: 'S5', moduleName: 'Pneumologie', title: 'Pneumothorax Spontané Sévère',
      clinicalPresentation: 'Homme jeune de 20 ans, longiligne, douleur thoracique aiguë unilatérale en coup de poignard avec tympanisme et abolition du murmure vésiculaire.',
      vitalSign: 'Tympanisme Droit', correctOptionId: 'E',
      options: [
        { id: 'A', text: 'Thoracotomie d emblée', feedbackText: '❌ Faux ! Trop invasif.' },
        { id: 'B', text: 'Scanner Thoracique injecté en première intention', feedbackText: '❌ La radio de thorax suffit.' },
        { id: 'C', text: 'Kinésithérapie respiratoire', feedbackText: '❌ Inefficace et dangereux.' },
        { id: 'D', text: 'Prescription de mucolytiques', feedbackText: '❌ Inutile.' },
        { id: 'E', text: 'Exsufflation à l aiguille ou Drainage Thoracique (2ème espace intercostal)', feedbackText: '✓ Vrai ! Évacuation de l air pleural sous tension.' },
      ]
    },
    {
      id: 'g-s5-6', semesterCode: 'S5', moduleName: 'Pneumologie', title: 'Embolie Pulmonaire (EP)',
      clinicalPresentation: 'Patiente de 45 ans au décours d une chirurgie orthopédique. Dyspnée brutale, douleur thoracique et tachycardie à 120 bpm.',
      vitalSign: 'Score de Wells Élevé', correctOptionId: 'C',
      options: [
        { id: 'A', text: 'D-Dimères en première intention pour exclure', feedbackText: '❌ Faux ! D-Dimères inutiles en probabilité forte.' },
        { id: 'B', text: 'Antibiothérapie à large spectre', feedbackText: '❌ Inutile.' },
        { id: 'C', text: 'Angio-Scanner Thoracique en urgence + Anticoagulation par HBPM', feedbackText: '✓ Vrai ! Angioscanner confirma le thrombus f les artères pulmonaires.' },
        { id: 'D', text: 'IRM Cardiaque repos', feedbackText: '❌ Non disponible en urgence.' },
        { id: 'E', text: 'Aspirine faible dose seule', feedbackText: '❌ Insuffisant.' },
      ]
    },
    {
      id: 'g-s5-7', semesterCode: 'S5', moduleName: 'Cardiologie', title: 'Endocardite Infectieuse',
      clinicalPresentation: 'Fièvre au long cours chez un porteur de prothèse valvulaire, avec apparition d un nouveau souffle d insuffisance aortique et faux panaris de Janeway.',
      vitalSign: 'Hemocultures (+)', correctOptionId: 'A',
      options: [
        { id: 'A', text: 'Hemocultures répétées (3 séries) + Échocardiographie Transœsophagienne (ETO)', feedbackText: '✓ Vrai ! Critères de Duke majeurs.' },
        { id: 'B', text: 'Antibiothérapie Flash sans faire d hémocultures', feedbackText: '❌ Erreur majeure ! Toujours prélever avant ABT.' },
        { id: 'C', text: 'Changement valvulaire immédiat sans bilan', feedbackText: '❌ Faux.' },
        { id: 'D', text: 'Prescription de Corticoïdes forte dose', feedbackText: '❌ Contre-indiqué en cas d infection.' },
        { id: 'E', text: 'Radiographie du thorax isolée', feedbackText: '❌ Ne voit pas les végétations.' },
      ]
    },
    {
      id: 'g-s5-8', semesterCode: 'S5', moduleName: 'Pneumologie', title: 'Tuberculose Pulmonaire (PNLAT)',
      clinicalPresentation: 'Toux avec crachats hémoptoïques depuis 1 mois, sueurs nocturnes, amaigrissement. GeneXpert MTB/RIF (+). Protocol Maroc.',
      vitalSign: 'GeneXpert (+)', correctOptionId: 'B',
      options: [
        { id: 'A', text: 'Traitement par Isoniazide monothérapie 6 mois', feedbackText: '❌ Faux ! Monothérapie sélectionne des mutants résistants.' },
        { id: 'B', text: 'Quadritérapie 2 RHZE puis Bithérapie 4 RH (Schéma 2RHZE/4RH)', feedbackText: '✓ Vrai ! Standard national PNLAT Maroc.' },
        { id: 'C', text: 'Amoxicilline-Acide Clavulanique 14 jours', feedbackText: '❌ Inefficace sur le BKP.' },
        { id: 'D', text: 'Corticothérapie isolée sans antituberculeux', feedbackText: '❌ Mortel !' },
        { id: 'E', text: 'Vaccination BCG en urgence curative', feedbackText: '❌ Le BCG est un vaccin préventif.' },
      ]
    },
    {
      id: 'g-s5-9', semesterCode: 'S5', moduleName: 'Cardiologie', title: 'Tamponnade Cardiaque',
      clinicalPresentation: 'Patient victime d un trauma thoracique. Triade de Beck : Hypotension, Turgescence jugulaire et Assourdissement des bruits du cœur.',
      vitalSign: 'Triade de Beck (+)', correctOptionId: 'D',
      options: [
        { id: 'A', text: 'Diurétiques IV forte dose', feedbackText: '❌ Mortel ! La tamponnade nécessite le maintien du remplissage.' },
        { id: 'B', text: 'Bêta-bloquant IV', feedbackText: '❌ Dangereux ! Baisse encore le débit cardiaque.' },
        { id: 'C', text: 'Radio du thorax simple et repos', feedbackText: '❌ Perte de temps.' },
        { id: 'D', text: 'Drainage Péricardique en urgence (Ponction sous-xiphoïdienne)', feedbackText: '✓ Vrai ! Décompression du péricarde indispensable.' },
        { id: 'E', text: 'Pose d un Pacemaker définitif', feedbackText: '❌ Non indiqué.' },
      ]
    },
    {
      id: 'g-s5-10', semesterCode: 'S5', moduleName: 'Pneumologie', title: 'Pneumopathie Franche Lobaire Aiguë (PFLA)',
      clinicalPresentation: 'Début brutal, frissons solennels, fièvre à 40°C, douleur thoracique en point de côté et crachats rouillés. Syndrome de condensation pulmonaire.',
      vitalSign: 'Pneumocoque Probable', correctOptionId: 'A',
      options: [
        { id: 'A', text: 'Amoxicilline 1g x 3 par jour per os', feedbackText: '✓ Vrai ! Streptococcus pneumoniae est la 1ère cause de PFLA, sensible à l amoxicilline.' },
        { id: 'B', text: 'Ciprofloxacine per os', feedbackText: '❌ Pas en 1ère intention chez l adulte sain.' },
        { id: 'C', text: 'Antifongique par Fluconazole', feedbackText: '❌ Inutile.' },
        { id: 'D', text: 'Corticothérapie forte dose seule', feedbackText: '❌ Inefficace et risqué.' },
        { id: 'E', text: 'Hospitalisation en réanimation d emblée sans détresse', feedbackText: '❌ Si ambulatoire sans signes de gravité.' },
      ]
    },
  ],
};

// HELPER TO SHUFFLE ARRAY (FISHER-YATES ALGORITHM)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function SemesterMiniGame({ semesterCode = 'S5' }: { semesterCode?: string }) {
  const [selectedSem, setSelectedSem] = useState<string>(semesterCode);
  const [activeScenarios, setActiveScenarios] = useState<GameScenario[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'FEEDBACK' | 'GAMEOVER' | 'VICTORY'>('IDLE');
  const [lastAnswer, setLastAnswer] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(20);

  const semestersList = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12'];

  // Initialize and shuffle questions pool on semester change or restart
  const initializeGamePool = (sem: string) => {
    const bank = FULL_SEMESTER_SCENARIOS_BANK[sem] || FULL_SEMESTER_SCENARIOS_BANK.S5;
    // Shuffle questions AND shuffle options for absolute variety
    const shuffledBank = shuffleArray(bank).map(q => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setActiveScenarios(shuffledBank);
    setSelectedSem(sem);
    setGameState('IDLE');
  };

  useEffect(() => {
    initializeGamePool(semesterCode);
  }, [semesterCode]);

  const currentQ = activeScenarios[currentIdx] || activeScenarios[0];

  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    if (timeLeft <= 0) {
      handleOptionSelect('TIMEOUT', '⏱️ Temps écoulé ! Échec de la décision d urgence.');
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setLives(3);
    setCurrentIdx(0);
    setTimeLeft(20);
    // Re-shuffle on every play click!
    const bank = FULL_SEMESTER_SCENARIOS_BANK[selectedSem] || FULL_SEMESTER_SCENARIOS_BANK.S5;
    const shuffled = shuffleArray(bank).map(q => ({
      ...q,
      options: shuffleArray(q.options),
    }));
    setActiveScenarios(shuffled);
    setGameState('PLAYING');
  };

  const handleOptionSelect = (optionId: string, feedbackText: string) => {
    const isCorrect = currentQ && optionId === currentQ.correctOptionId;
    setLastAnswer({ isCorrect, text: feedbackText });
    setGameState('FEEDBACK');

    if (isCorrect) {
      setScore(s => s + 150 + streak * 30);
      setStreak(st => st + 1);
    } else {
      setStreak(0);
      setLives(l => {
        const nextLives = l - 1;
        if (nextLives <= 0) {
          setTimeout(() => setGameState('GAMEOVER'), 1200);
        }
        return nextLives;
      });
    }
  };

  const nextQuestion = () => {
    if (lives <= 0) {
      setGameState('GAMEOVER');
      return;
    }
    if (currentIdx + 1 >= activeScenarios.length) {
      setGameState('VICTORY');
      return;
    }
    setCurrentIdx(i => i + 1);
    setTimeLeft(20);
    setGameState('PLAYING');
  };

  return (
    <div className="glass-panel rounded-3xl border border-amber-500/30 p-6 bg-slate-950/90 shadow-2xl relative overflow-hidden">
      {/* Background Pulse Ambient */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Controls & Semester Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/25 shrink-0">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              Jeu 2D Simulation Clinique
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                10+ QCMs / Semestre
              </span>
            </h3>
            <p className="text-xs text-slate-400">Joueur : <span className="text-teal-300 font-bold">Badr Bourqi</span> | Melange Aléatoire Dynamique</p>
          </div>
        </div>

        {/* Semester Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
          {semestersList.map(s => (
            <button
              key={s}
              onClick={() => initializeGamePool(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all border shrink-0 ${
                selectedSem === s
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20 scale-105'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-amber-500/40 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* IDLE STATE */}
      {gameState === 'IDLE' && (
        <div className="text-center py-12 space-y-5">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto animate-bounce shadow-xl shadow-amber-500/10">
            <Trophy className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-xl font-extrabold text-white mb-2">
              Simulation Clinique 2D — Semestre <span className="text-amber-400">{selectedSem}</span>
            </h4>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              Banque active : <span className="text-teal-300 font-bold">{activeScenarios.length} QCMs cliniques aléatoires</span>. Les réponses (A, B, C, D, E) et l ordre des questions changent à chaque partie !
            </p>
          </div>
          <button
            onClick={startGame}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-teal-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/30 hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
          >
            <Zap className="w-5 h-5 fill-current" />
            Lancer la Partie 2D ({selectedSem} - 10 QCMs)
          </button>
        </div>
      )}

      {/* PLAYING / FEEDBACK STATE */}
      {(gameState === 'PLAYING' || gameState === 'FEEDBACK') && currentQ && (
        <div className="space-y-5">
          {/* Game HUD Bar */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 font-mono font-bold text-xs">
                QCM {currentIdx + 1}/{activeScenarios.length} — {currentQ.moduleName}
              </span>
              <span className="text-xs font-bold text-white hidden sm:inline">{currentQ.title}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Streak Multiplier */}
              {streak > 1 && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-mono font-bold animate-pulse">
                  🔥 Combo x{streak}
                </span>
              )}

              {/* Hearts */}
              <div className="flex items-center gap-1">
                {[1, 2, 3].map(h => (
                  <span key={h} className={`text-sm ${h <= lives ? 'opacity-100 scale-110' : 'opacity-20'} transition-all`}>
                    ❤️
                  </span>
                ))}
              </div>

              {/* Score */}
              <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-amber-500/30 text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                {score} pts
              </div>
            </div>
          </div>

          {/* Clinical Scenario Box */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-teal-500/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-extrabold text-teal-300 uppercase tracking-wider">Cas Clinique d Urgence</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                  {currentQ.vitalSign}
                </span>
                <span className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold flex items-center gap-1 ${timeLeft <= 5 ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-ping' : 'bg-slate-900 text-amber-300 border-slate-800'}`}>
                  <Timer className="w-3.5 h-3.5" />
                  {timeLeft}s
                </span>
              </div>
            </div>
            <p className="text-sm font-semibold text-white leading-relaxed">{currentQ.clinicalPresentation}</p>
          </div>

          {/* Choices Grid (Shuffled options per play) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentQ.options.map(opt => {
              const isCorrectOption = opt.id === currentQ.correctOptionId;
              return (
                <button
                  key={opt.id}
                  disabled={gameState === 'FEEDBACK'}
                  onClick={() => handleOptionSelect(opt.id, opt.feedbackText)}
                  className={`p-4 rounded-2xl border text-xs text-left font-bold transition-all flex flex-col justify-between min-h-[90px] ${
                    gameState === 'FEEDBACK'
                      ? isCorrectOption
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50'
                      : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/50 hover:bg-slate-800 text-slate-200 hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-mono font-bold text-xs">
                      {opt.id}
                    </span>
                    {gameState === 'FEEDBACK' && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  </div>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback banner */}
          {gameState === 'FEEDBACK' && lastAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border text-xs flex items-center justify-between gap-4 ${
                lastAnswer.isCorrect
                  ? 'bg-emerald-950/90 border-emerald-500 text-emerald-100'
                  : 'bg-rose-950/90 border-rose-500 text-rose-100'
              }`}
            >
              <div className="flex items-start gap-3">
                {lastAnswer.isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> : <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
                <div>
                  <span className="font-extrabold uppercase text-xs tracking-wider block mb-1">
                    {lastAnswer.isCorrect ? '✓ Décision Médicale Correcte !' : '❌ Erreur Clinique !'}
                  </span>
                  <p className="text-xs leading-relaxed">{lastAnswer.text}</p>
                </div>
              </div>
              <button
                onClick={nextQuestion}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs border border-slate-700 shrink-0 flex items-center gap-1.5"
              >
                Suivant ({currentIdx + 1}/{activeScenarios.length}) <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* GAMEOVER / VICTORY */}
      {(gameState === 'GAMEOVER' || gameState === 'VICTORY') && (
        <div className="text-center py-10 space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-3xl shadow-xl">
            {gameState === 'VICTORY' ? '🏆' : '💀'}
          </div>
          <h4 className="text-xl font-extrabold text-white">
            {gameState === 'VICTORY' ? 'Félicitations Badr Bourqi ! Niveau Validé' : 'Échec de la Réanimation'}
          </h4>
          <p className="text-xs text-slate-300">
            Score Final : <span className="text-amber-400 font-bold text-base">{score} pts</span> sur le Semestre {selectedSem}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" /> Rejouer avec Nouvelles Questions (Random Pool)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
