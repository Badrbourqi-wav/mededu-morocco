const fs = require('fs');
const path = require('path');

const moduleContent = `
export interface ModuleContent {
  moduleId: string;
  semester: number;
  discipline: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  duration: string;
  content: string;
  keyPoints: string[];
  clinicalCorrelation?: string;
}

export const MODULE_CONTENTS: ModuleContent[] = [
  {
    moduleId: 'MOD-ANAT-S1',
    semester: 1,
    discipline: 'Anatomie Générale',
    chapters: [
      {
        id: 'chap-anat-1',
        title: 'Anatomie des membres',
        duration: '45 min',
        content: \`# Anatomie du Membre Supérieur et Inférieur

## Introduction
L'anatomie des membres supérieurs et inférieurs est fondamentale pour la compréhension de la biomécanique humaine, de la traumatologie et de la rhumatologie. Le membre supérieur est spécialisé dans la préhension et la mobilité fine, tandis que le membre inférieur est adapté à la locomotion et au support du poids du corps.

## Le Membre Supérieur
### Ostéologie
Le squelette du membre supérieur se divise en quatre segments : la ceinture scapulaire (clavicule et scapula), le bras (humérus), l'avant-bras (radius en dehors, ulna en dedans) et la main (carpe, métacarpe, phalanges). L'articulation gléno-humérale est l'articulation la plus mobile du corps, ce qui la rend particulièrement vulnérable aux luxations antéro-internes.

### Myologie et Innervation
Les muscles du membre supérieur sont innervés par le plexus brachial (racines C5 à T1).
- **Loge antérieure du bras** : Muscle biceps brachial et brachial antérieur (nerf musculo-cutané). Fonction : flexion du coude.
- **Loge postérieure du bras** : Muscle triceps brachial (nerf radial). Fonction : extension du coude.
Le nerf médian innerve la majorité des muscles fléchisseurs de l'avant-bras, tandis que le nerf ulnaire innerve les petits muscles intrinsèques de la main responsables de la motricité fine.

## Le Membre Inférieur
### Ostéologie
La ceinture pelvienne (os coxal) relie le membre inférieur au tronc. Le fémur (cuisse) est l'os le plus long du corps. La jambe contient le tibia (os principal porteur) et la fibula. Le pied est organisé en tarse, métatarse et phalanges. L'articulation coxo-fémorale est une énarthrose très emboîtée, conférant une grande stabilité.

### Myologie et Innervation
Innervation issue des plexus lombaire (L1-L4) et sacré (L4-S3).
- **Loge antérieure de la cuisse** : Quadriceps fémoral (nerf fémoral), principal extenseur du genou.
- **Loge postérieure de la cuisse** : Ischio-jambiers (nerf sciatique), fléchisseurs du genou.
Le nerf sciatique se divise en nerf tibial et nerf fibulaire commun. Une lésion du nerf fibulaire commun entraîne un steppage (pied tombant).\`,
        keyPoints: [
          'Le plexus brachial (C5-T1) innerve le membre supérieur.',
          'Le nerf radial est responsable de l\\'extension du membre supérieur.',
          'L\\'articulation coxo-fémorale est très stable comparée à la gléno-humérale.',
          'Le nerf sciatique (L4-S3) innerve la face postérieure de la cuisse et toute la jambe/pied.'
        ],
        clinicalCorrelation: 'Fracture de la diaphyse humérale : risque de lésion du nerf radial entraînant une paralysie des extenseurs du poignet et des doigts ("main tombante").'
      },
      {
        id: 'chap-anat-2',
        title: 'Anatomie du thorax',
        duration: '45 min',
        content: \`# Anatomie du Thorax

## La Cage Thoracique
La cage thoracique protège les organes vitaux cardiopulmonaires et participe activement à la mécanique ventilatoire. Elle est constituée en arrière par les 12 vertèbres thoraciques, en avant par le sternum (manubrium, corps, processus xiphoïde) et latéralement par 12 paires de côtes (7 vraies, 3 fausses, 2 flottantes).

### Les Espaces Intercostaux
Chaque espace intercostal contient les muscles intercostaux (externes, intimes, internes) et le paquet vasculo-nerveux intercostal (Veine, Artère, Nerf - VAN). Ce paquet chemine dans la gouttière costale au bord inférieur de la côte sur-jacente. Il est donc crucial d'insérer l'aiguille de ponction pleurale au ras du bord supérieur de la côte inférieure pour éviter de léser ces éléments.

## Le Médiastin
Le thorax est divisé en deux cavités pleurales latérales et un espace central : le médiastin. 
Le médiastin est classiquement divisé en :
- **Médiastin supérieur** : contient l'arc aortique, le tronc brachio-céphalique, la veine cave supérieure, la trachée et l'œsophage.
- **Médiastin inférieur**, lui-même subdivisé par le péricarde en :
  - *Antérieur* (thymus, graisse)
  - *Moyen* (cœur, péricarde, aorte ascendante, tronc pulmonaire)
  - *Postérieur* (œsophage, aorte thoracique descendante, conduit thoracique, veines azygos).

## Diaphragme
C'est le muscle principal de la respiration. Il sépare la cavité thoracique de la cavité abdominale. Il est innervé par le nerf phrénique (C3-C4-C5). Ses orifices principaux laissent passer la veine cave inférieure (T8), l'œsophage (T10) et l'aorte (T12).\`,
        keyPoints: [
          'Le paquet vasculo-nerveux intercostal chemine sous le bord inférieur de chaque côte.',
          'Ponction pleurale : toujours raser le bord supérieur de la côte inférieure.',
          'Le diaphragme est innervé par le nerf phrénique (racines C3, C4, C5).',
          'L\\'aorte traverse le diaphragme en T12, l\\'œsophage en T10, la VCI en T8.'
        ],
        clinicalCorrelation: 'Lésion du nerf phrénique (ex: chirurgie cervicale ou tumeur apicale pulmonaire) entraîne une paralysie de l\\'hémidiaphragme homolatéral, visible à la radiographie par une surélévation de la coupole diaphragmatique.'
      }
    ]
  },
  {
    moduleId: 'MOD-PHYSIO-S2',
    semester: 2,
    discipline: 'Physiologie',
    chapters: [
      {
        id: 'chap-physio-1',
        title: 'Physiologie cardiaque',
        duration: '50 min',
        content: \`# Physiologie Cardiaque : Le Cycle et l'Hémodynamique

## Le Cycle Cardiaque
Le cycle cardiaque décrit les événements électriques et mécaniques d'un battement. Il se divise en systole (contraction et éjection) et diastole (relâchement et remplissage).
1. **Remplissage ventriculaire** : Les valves atrio-ventriculaires (mitrale et tricuspide) sont ouvertes. Le sang s'écoule passivement des oreillettes vers les ventricules. À la fin de cette phase, la contraction auriculaire (systole auriculaire) complète le remplissage actif (environ 20% du volume télédiastolique).
2. **Contraction isovolumétrique** : Les ventricules se contractent. La pression ventriculaire dépasse la pression auriculaire, entraînant la fermeture des valves AV (1er bruit du cœur, B1). Les valves sigmoïdes (aortique et pulmonaire) sont encore fermées. Le volume ventriculaire reste constant.
3. **Éjection ventriculaire** : La pression ventriculaire dépasse la pression aortique (et pulmonaire). Les valves sigmoïdes s'ouvrent et le sang est éjecté.
4. **Relaxation isovolumétrique** : Les ventricules se relâchent, la pression chute. La fermeture des valves sigmoïdes génère le 2ème bruit du cœur (B2).

## Débit Cardiaque (QC)
Le débit cardiaque est le volume de sang éjecté par chaque ventricule en une minute. 
**Formule : QC = FC × VES** (Débit Cardiaque = Fréquence Cardiaque × Volume d'Éjection Systolique).
Le VES dépend de trois facteurs majeurs :
- **Précharge** : le degré d'étirement des fibres myocardiques en fin de diastole (loi de Frank-Starling).
- **Postcharge** : la résistance à l'éjection (ex: pression artérielle, résistances vasculaires périphériques).
- **Inotropisme (contractilité)** : la force de contraction intrinsèque du myocarde, modulée par le système nerveux sympathique (catécholamines augmentant le calcium intracellulaire).

L'équation fondamentale de l'hémodynamique est : PA = QC × RVS (Pression Artérielle = Débit Cardiaque × Résistances Vasculaires Systémiques).\`,
        keyPoints: [
          'Le cycle cardiaque : Systole (isovolumétrique + éjection) et Diastole (isovolumétrique + remplissage).',
          'Bruit B1 = fermeture valves AV. Bruit B2 = fermeture valves sigmoïdes.',
          'Débit Cardiaque = Fréquence Cardiaque × Volume d\\'Éjection Systolique (VES).',
          'Le VES dépend de la précharge, de la postcharge et de la contractilité myocardique.'
        ],
        clinicalCorrelation: 'Dans l\\'insuffisance cardiaque systolique, la diminution de la contractilité (inotropisme) entraîne une baisse du VES et du débit cardiaque, avec augmentation des pressions de remplissage (congestion).'
      },
      {
        id: 'chap-physio-2',
        title: 'Physiologie respiratoire',
        duration: '45 min',
        content: \`# Physiologie Respiratoire : Ventilation et Échanges Gazeux

## La Ventilation Pulmonaire
La ventilation pulmonaire assure le renouvellement de l'air alvéolaire. 
- **L'inspiration** est un phénomène actif. La contraction du diaphragme et des muscles intercostaux externes augmente le volume de la cage thoracique, rendant la pression intra-pleurale plus négative, ce qui entraîne l'expansion des poumons et l'entrée de l'air.
- **L'expiration** de repos est passive, due à la rétraction élastique des poumons et de la paroi thoracique. L'expiration forcée sollicite les muscles abdominaux et intercostaux internes.

### Volumes et Capacités Pulmonaires
- **Volume Courant (VT)** : volume d'air inspiré ou expiré à chaque cycle au repos (~500 mL).
- **Volume de Réserve Inspiratoire (VRI)** : volume maximal pouvant être inspiré après une inspiration normale.
- **Volume de Réserve Expiratoire (VRE)** : volume maximal pouvant être expiré après une expiration normale.
- **Volume Résiduel (VR)** : volume d'air restant dans les poumons après une expiration maximale forcée.
La **Capacité Vitale (CV)** = VT + VRI + VRE.
La **Capacité Pulmonaire Totale (CPT)** = CV + VR.

## Échanges Gazeux Alvéolo-Capillaires
Les échanges gazeux obéissent à la loi de diffusion de Fick. Le transfert d'oxygène (O2) et de dioxyde de carbone (CO2) à travers la membrane alvéolo-capillaire dépend de :
1. Le gradient de pression partielle du gaz (PAO2 - PaO2).
2. La surface d'échange (diminuée dans l'emphysème).
3. L'épaisseur de la membrane (augmentée dans la fibrose pulmonaire).

Le CO2 diffuse 20 fois plus facilement que l'O2 grâce à son coefficient de solubilité beaucoup plus élevé.\`,
        keyPoints: [
          'L\\'inspiration de repos est active (diaphragme), l\\'expiration de repos est passive.',
          'Le Volume Résiduel (VR) ne peut pas être mesuré par spirométrie simple (nécessite la pléthysmographie).',
          'Loi de Fick : diffusion proportionnelle au gradient de pression et à la surface, inversement proportionnelle à l\\'épaisseur.',
          'Le CO2 a une capacité de diffusion 20 fois supérieure à celle de l\\'O2.'
        ],
        clinicalCorrelation: 'Dans les pneumopathies interstitielles (fibrose pulmonaire), l\\'épaississement de la membrane alvéolo-capillaire altère sévèrement la diffusion de l\\'oxygène, causant une hypoxémie, surtout à l\\'effort.'
      }
    ]
  },
  {
    moduleId: 'MOD-PHARMA-S3',
    semester: 3,
    discipline: 'Pharmacologie',
    chapters: [
      {
        id: 'chap-pharma-1',
        title: 'Pharmacocinétique',
        duration: '40 min',
        content: \`# Pharmacocinétique : Le Devenir du Médicament dans l'Organisme

La pharmacocinétique (ADME) étudie le sort du médicament dans l'organisme en 4 phases : Absorption, Distribution, Métabolisme, et Élimination.

## 1. Absorption
L'absorption est le passage du médicament de son site d'administration vers la circulation systémique. 
- **Voie intraveineuse** : absorption complète et immédiate (biodisponibilité F = 100%).
- **Voie orale** : absorption intestinale, sujette à l'effet de premier passage hépatique. 
La **biodisponibilité (F)** est la fraction de la dose administrée qui atteint la circulation systémique sous forme inchangée.

## 2. Distribution
Une fois dans le sang, le médicament se lie de manière réversible aux protéines plasmatiques (albumine pour les acides faibles, alpha-1-glycoprotéine acide pour les bases faibles). Seule la fraction libre est pharmacologiquement active et peut diffuser vers les tissus.
Le **Volume de distribution (Vd)** est un volume apparent reflétant la répartition du médicament. Un Vd important (>1 L/kg) indique une forte diffusion tissulaire (médicaments lipophiles).

## 3. Métabolisme
Principalement hépatique, il transforme les médicaments lipophiles en métabolites hydrosolubles plus facilement éliminables. 
- **Phase I (fonctionnalisation)** : oxydation (Cytochromes P450), réduction, hydrolyse.
- **Phase II (conjugaison)** : glucuronoconjugaison, sulfoconjugaison (ajout d'une molécule polaire).
Interactions médicamenteuses : inducteurs enzymatiques (rifampicine, antiépileptiques) accélèrent le métabolisme ; inhibiteurs (macrolides, antifongiques azolés) ralentissent le métabolisme.

## 4. Élimination
Majoritairement rénale (filtration glomérulaire, sécrétion tubulaire, réabsorption) ou biliaire.
La **Clairance (Cl)** est le volume de plasma totalement épuré du médicament par unité de temps. 
La **Demi-vie (T1/2)** est le temps nécessaire pour que la concentration plasmatique diminue de moitié. L'état d'équilibre est atteint au bout de 5 demi-vies.\`,
        keyPoints: [
          'ADME : Absorption, Distribution, Métabolisme, Élimination.',
          'Biodisponibilité = fraction de la dose atteignant la circulation générale.',
          'Seule la fraction libre (non liée aux protéines) du médicament est active.',
          'Le métabolisme hépatique implique principalement les cytochromes P450 (Phase I).',
          'État d\\'équilibre atteint après ~5 demi-vies.'
        ],
        clinicalCorrelation: 'L\\'administration simultanée de pamplemousse (inhibiteur du CYP3A4) et d\\'une statine (simvastatine) augmente fortement les concentrations de la statine, majorant le risque de rhabdomyolyse.'
      },
      {
        id: 'chap-pharma-2',
        title: 'Classes d\\'antibiotiques',
        duration: '60 min',
        content: \`# Les Grandes Classes d'Antibiotiques

La prescription d'antibiotiques doit être justifiée (antibiothérapie probabiliste ou documentée) pour limiter l'émergence des résistances bactériennes. Les antibiotiques sont classés selon leur mécanisme d'action.

## 1. Inhibiteurs de la synthèse de la paroi bactérienne
### Les Bêta-lactamines
Ils inhibent les Protéines Liant la Pénicilline (PLP ou transpeptidases) nécessaires à la synthèse du peptidoglycane. Bactéricides, temps-dépendants.
- **Pénicillines** : Pénicilline G/V, Aminopénicillines (Amoxicilline), Pénicillines M (Cloxacilline).
- **Céphalosporines** : C1G (Céfalexine), C2G, C3G (Ceftriaxone, Céfotaxime, Ceftazidime anti-pyocyanique).
- **Carbapénèmes** : Imipénème, Méropénème (spectre ultra-large).
*Risque principal : Allergie croisée, troubles digestifs.*

### Les Glycopeptides
Vancomycine, Teicoplanine. Inhibent la synthèse du peptidoglycane. Spectre limité aux Bactéries Gram Positif (inclus SARM). Nephrotoxiques et ototoxiques.

## 2. Inhibiteurs de la synthèse protéique (Action sur les ribosomes)
- **Aminosides** (Gentamicine, Amikacine) : se fixent sur la sous-unité 30S. Bactéricides rapides, concentration-dépendants. Toxicités : rénale et auditive (irréversible).
- **Macrolides** (Azithromycine, Clarithromycine) : se fixent sur la sous-unité 50S. Bactériostatiques. Très utiles pour les germes intracellulaires atypiques (Mycoplasma, Chlamydia, Legionella).
- **Tétracyclines** (Doxycycline) : se fixent sur 30S. Contre-indiqués chez l'enfant < 8 ans et la femme enceinte (coloration dentaire, retard de croissance osseuse).

## 3. Inhibiteurs de la synthèse des acides nucléiques
- **Fluoroquinolones** (Ciprofloxacine, Lévofloxacine) : inhibent l'ADN gyrase et la topoisomérase IV. Excellente biodisponibilité orale. Effets secondaires : tendinopathies (rupture tendon d'Achille), allongement de l'espace QT.
- **Sulfamides et Triméthoprime** (Cotrimoxazole) : inhibent la synthèse de l'acide folique. Utilisés pour les infections urinaires et la prévention de la pneumocystose.\`,
        keyPoints: [
          'Bêta-lactamines : bactéricides temps-dépendants inhibant la synthèse de la paroi (PLP).',
          'Aminosides : bactéricides concentration-dépendants, ototoxiques et néphrotoxiques.',
          'Macrolides : bactériostatiques ciblant la sous-unité 50S, actifs sur les germes atypiques.',
          'Fluoroquinolones : attention aux tendinopathies et à l\\'allongement du QT.'
        ],
        clinicalCorrelation: 'L\\'association Amoxicilline et Acide clavulanique permet de contourner la résistance bactérienne par production de bêta-lactamase, l\\'acide clavulanique étant un inhibiteur suicide de ces enzymes.'
      }
    ]
  },
  {
    moduleId: 'MOD-CARDIO-S5',
    semester: 5,
    discipline: 'Cardiologie',
    chapters: [
      {
        id: 'chap-cardio-1',
        title: 'Syndromes Coronariens Aigus',
        duration: '50 min',
        content: \`# Syndromes Coronariens Aigus (SCA)

Les SCA regroupent un ensemble de manifestations cliniques secondaires à une ischémie myocardique aiguë, généralement due à la rupture ou l'érosion d'une plaque d'athérome compliquée de thrombose.

## Classification et Physiopathologie
On distingue deux grands types de SCA selon l'ECG initial :
1. **SCA avec sus-décalage du segment ST (SCA ST+ ou STEMI)** : traduit une occlusion coronarienne totale et aiguë. Il y a une nécrose trans-murale rapide. C'est une urgence absolue nécessitant une reperfusion immédiate.
2. **SCA sans sus-décalage du segment ST (SCA non-ST+ ou NSTEMI / Angor instable)** : traduit une occlusion subtotale, intermittente, ou une micro-embolisation. La différenciation entre NSTEMI et Angor instable se fait par le dosage de la troponine (élevée dans le NSTEMI, normale dans l'angor instable).

## Diagnostic
- **Clinique** : Douleur thoracique rétrosternale, constrictive, prolongée (> 20 min pour le STEMI), irradiant vers la mâchoire ou le bras gauche, parfois atypique (diabétique, sujet âgé, femme).
- **ECG 12 dérivations** (en < 10 min) :
  - STEMI : Sus-décalage du segment ST convexe vers le haut englobant l'onde T (onde de Pardee), avec images en miroir. L'apparition d'ondes Q signe la nécrose.
  - NSTEMI : Sous-décalage du segment ST, inversion des ondes T, ou ECG normal.
- **Biologie** : Dosage de la troponine I ou T ultra-sensible (ne doit pas retarder la prise en charge du STEMI).

## Prise en charge du SCA ST+ (STEMI)
L'objectif est la reperfusion le plus rapidement possible.
- **Traitement médical initial** : MONA (Morphine, Oxygène si SpO2 < 90%, Nitrés sauf si infarctus droit ou hypotension, Aspirine). S'y ajoute une double antiagrégation plaquettaire (DAPT : Aspirine + Ticagrelor ou Prasugrel) et une anticoagulation efficace (HNF, Enoxaparine).
- **Reperfusion** : 
  - **Angioplastie primaire (ICP)** : traitement de choix si réalisable en moins de 120 minutes (délai premier contact médical - ballon).
  - **Fibrinolyse (Thrombolyse)** : si ICP impossible dans les délais, administrée en < 10 min, en l'absence de contre-indications (ex: saignement actif, AVC récent).

Traitement au long cours (ordonnance de sortie) : BASIC (Bêtabloquants, Antiagrégants x2, Statines, IEC, Contrôle des facteurs de risque).\`,
        keyPoints: [
          'La rupture de plaque d\\'athérome est l\\'événement physiopathologique majeur des SCA.',
          'SCA ST+ (STEMI) = occlusion totale = Reperfusion en urgence (<120 min pour ICP).',
          'SCA non-ST+ = occlusion subtotale = Stratification du risque et coro différée (sauf si instabilité).',
          'Troponine = biomarqueur de nécrose. Élévation confirme l\\'infarctus.',
          'Ordonnance de sortie = B.A.S.I.C.'
        ],
        clinicalCorrelation: 'Devant un SCA de topographie inférieure (DII, DIII, aVF), il faut toujours réaliser les dérivations droites (V3R, V4R) pour rechercher une extension au ventricule droit. Si c\\'est le cas, les dérivés nitrés sont formellement contre-indiqués.'
      },
      {
        id: 'chap-cardio-2',
        title: 'Hypertension Artérielle (HTA)',
        duration: '45 min',
        content: \`# Hypertension Artérielle (HTA) de l'Adulte

L'HTA est la maladie chronique la plus fréquente dans le monde et le principal facteur de risque d'AVC, d'insuffisance cardiaque, de coronaropathie et de maladie rénale chronique.

## Définition et Classification
Selon les recommandations de l'ESH (European Society of Hypertension) 2023, l'HTA est définie par une Pression Artérielle Systolique (PAS) ≥ 140 mmHg et/ou une Pression Artérielle Diastolique (PAD) ≥ 90 mmHg, mesurées en consultation médicale.
La confirmation du diagnostic (en dehors des HTA sévères d'emblée) nécessite :
- Soit des mesures répétées en consultation.
- Soit préférentiellement des mesures hors du cabinet médical : 
  - **MAPA** (Mesure Ambulatoire de la Pression Artérielle sur 24h) : seuil HTA si moyenne de jour ≥ 135/85 ou moyenne des 24h ≥ 130/80 mmHg.
  - **AMPA** (Automesure Tensionnelle à domicile) : seuil HTA ≥ 135/85 mmHg. Règle des 3 : 3 mesures matin, 3 mesures soir, 3 jours de suite.

## Étiologies
- **HTA Essentielle (Primaire)** : 90-95% des cas. Pas de cause curable identifiée, multifactorielle (génétique, âge, obésité, sel).
- **HTA Secondaire** : 5-10% des cas. À suspecter chez le sujet jeune (< 30 ans), en cas d'HTA d'emblée sévère ou résistante. Causes :
  - Rénales : Polykystose rénale, sténose de l'artère rénale.
  - Endocriniennes : Hyperaldostéronisme primaire (Syndrome de Conn, cause la plus fréquente d'HTA secondaire, associée à une hypokaliémie), Phéochromocytome, Syndrome de Cushing, Hyperthyroïdie.
  - Toxiques/Médicaments : AINS, corticoïdes, réglisse, contraceptifs oraux.

## Prise en charge Thérapeutique
1. **Mesures hygiéno-diététiques (MHD)** obligatoires pour tous : régime hyposodé (< 5g NaCl/j), activité physique régulière, perte de poids, arrêt du tabac, limitation de l'alcool.
2. **Traitement pharmacologique** :
   Les recommandations récentes privilégient l'initiation d'un traitement par **bithérapie en un seul comprimé** pour améliorer l'observance (ex: IEC ou ARA2 + Inhibiteur Calcique, ou IEC/ARA2 + Diurétique thiazidique).
   - Les IEC/ARA2 sont néphroprotecteurs mais contre-indiqués chez la femme enceinte.
   - Les Bêtabloquants ne sont plus des traitements de 1ère intention pour l'HTA non compliquée, ils sont réservés aux indications spécifiques (angor, post-IDM, insuffisance cardiaque).

L'HTA est dite **résistante** si elle n'est pas contrôlée malgré l'association de 3 classes (dont un diurétique) à dose optimale + MHD.\`,
        keyPoints: [
          'Seuil diagnostic HTA en cabinet : PAS ≥ 140 ou PAD ≥ 90 mmHg.',
          'Confirmation par MAPA ou AMPA recommandée (seuil 135/85 mmHg).',
          'HTA essentielle dans 90% des cas. Rechercher HTA secondaire si sujet jeune ou HTA résistante.',
          'Syndrome de Conn = cause n°1 d\\'HTA endocrinienne, se présente par HTA + Hypokaliémie.',
          'Traitement de choix : bithérapie fixe combinant IEC/ARA2 + Inhibiteur Calcique ou Diurétique.'
        ],
        clinicalCorrelation: 'L\\'association IEC et ARA2 est formellement proscrite car elle n\\'apporte pas de bénéfice supplémentaire sur la baisse tensionnelle mais augmente significativement le risque d\\'insuffisance rénale aiguë et d\\'hyperkaliémie sévère.'
      }
    ]
  },
  {
    moduleId: 'MOD-PNEUMO-S5',
    semester: 5,
    discipline: 'Pneumologie',
    chapters: [
      {
        id: 'chap-pneumo-1',
        title: 'Asthme et BPCO',
        duration: '60 min',
        content: \`# Pathologies Obstructives : Asthme et BPCO

L'asthme et la Bronchopneumopathie Chronique Obstructive (BPCO) sont les deux principales maladies respiratoires obstructives. Bien qu'elles partagent un Trouble Ventilatoire Obstructif (TVO), leur physiopathologie, présentation et traitement diffèrent.

## L'Asthme
L'asthme est une maladie inflammatoire chronique des voies aériennes, caractérisée par une hyperréactivité bronchique et une obstruction **réversible**.
- **Physiopathologie** : Inflammation à prédominance éosinophilique ou allergique (Th2), entraînant un œdème muqueux, une hypersécrétion de mucus et un bronchospasme.
- **Clinique** : Épisodes paroxystiques de dyspnée expiratoire, sibilants, toux sèche (souvent nocturne).
- **Spirométrie** : TVO (VEMS/CVF < 70% ou inférieur à la limite inférieure de la normale) avec **réversibilité significative** après administration de salbutamol (augmentation du VEMS de > 12% ET > 200 mL).
- **Traitement de fond** : La pierre angulaire est la corticothérapie inhalée (CSI), souvent associée à des bronchodilatateurs de longue durée d'action (LABA). Selon les recommandations GINA, le traitement de crise utilise préférentiellement une association CSI+Formotérol à la demande.

## La BPCO
La BPCO est une maladie respiratoire chronique, souvent liée à des expositions toxiques (tabac), caractérisée par des symptômes respiratoires persistants et une limitation des débits aériens **non complètement réversible**.
- **Physiopathologie** : Inflammation neutrophilique causant un remodelage des petites voies aériennes (bronchiolite obstructive) et une destruction du parenchyme alvéolaire (emphysème).
- **Clinique** : Patient généralement > 40 ans, fumeur. Toux chronique, expectoration matinale (bronchite chronique), dyspnée d'effort d'installation progressive.
- **Spirométrie** : TVO avec VEMS/CVF **< 70% post-bronchodilatateur**. Non ou peu réversible. La classification GOLD (stades I à IV) se base sur le VEMS post-BD.
- **Traitement de fond** : La pierre angulaire est l'utilisation des bronchodilatateurs (LAMA ou LABA, souvent combinés). Les corticoïdes inhalés ne sont indiqués que chez les patients avec des exacerbations fréquentes et un taux d'éosinophiles sanguin élevé (≥ 300/µL). Le sevrage tabagique et la réhabilitation respiratoire sont primordiaux.

## L'Exacerbation
C'est une aggravation aiguë des symptômes (dyspnée, toux, crachats purulents) nécessitant une modification du traitement (antibiothérapie, corticothérapie systémique courte, optimisation des bronchodilatateurs). \`,
        keyPoints: [
          'Asthme = Sujet jeune, inflammation à éosinophiles, TVO réversible, traitement par Corticoïdes Inhalés.',
          'BPCO = Sujet fumeur, destruction alvéolaire (emphysème), TVO non réversible, traitement par Bronchodilatateurs.',
          'Le diagnostic de BPCO nécessite obligatoirement une spirométrie (VEMS/CVF post-BD < 0.7).',
          'La réversibilité à la spirométrie = gain de +12% ET +200 mL du VEMS.'
        ],
        clinicalCorrelation: 'Oxygénothérapie dans l\\'exacerbation de BPCO : il faut cibler une SpO2 entre 88% et 92%. Une oxygénation excessive (cible > 95%) inhibe la commande respiratoire hypoxique et peut provoquer une hypoventilation alvéolaire avec hypercapnie sévère et coma (narcose au CO2).'
      }
    ]
  },
  {
    moduleId: 'MOD-NEURO-S6',
    semester: 6,
    discipline: 'Neurologie',
    chapters: [
      {
        id: 'chap-neuro-1',
        title: 'Accidents Vasculaires Cérébraux (AVC)',
        duration: '50 min',
        content: \`# Les Accidents Vasculaires Cérébraux (AVC)

L'AVC est une urgence diagnostique et thérapeutique absolue ("Time is brain"). C'est la première cause de handicap acquis chez l'adulte et la troisième cause de mortalité. Il est caractérisé par l'installation brutale d'un déficit neurologique focal.

## Classification
- **AVC Ischémiques (AVCI) ou Infarctus cérébraux** (80-85% des cas) : Occlusion d'une artère cérébrale.
- **AVC Hémorragiques** (15-20% des cas) : Hémorragie intraparenchymateuse (15%) par rupture de petites artères (souvent due à l'HTA) ou hémorragie méningée (5%) par rupture d'anévrisme.

## Présentation Clinique Topographique
La clinique dépend du territoire vasculaire atteint :
- **Artère cérébrale moyenne (sylvienne)** : C'est le plus fréquent. Hémiplégie à prédominance brachio-faciale, hémi-hypoesthésie, hémianopsie latérale homonyme (HLH). Si hémisphère dominant (gauche) : Aphasie (Broca ou Wernicke). Si hémisphère mineur (droit) : Syndrome d'Anton-Babinski (hémiasomatognosie, anosognosie).
- **Artère cérébrale antérieure** : Hémiplégie à prédominance crurale (membre inférieur), troubles sphinctériens, syndrome frontal.
- **Artère cérébrale postérieure** : Hémianopsie latérale homonyme, alexie sans agraphie.
- **Tronc vertébro-basilaire** : Syndrome alterne (paralysie d'un nerf crânien du côté de la lésion et hémiplégie controlatérale), syndrome cérébelleux, atteinte des voies longues.

## Diagnostic Radiologique
L'imagerie est immédiate pour différencier AVCI et hémorragie.
- **IRM cérébrale** (gold standard) : La séquence de **Diffusion (DWI)** montre l'ischémie très précocement (< 30 min) en hypersignal avec chute de l'ADC. La séquence T2*/Echo de Gradient détecte l'hémorragie précoce en hyposignal. La séquence FLAIR se positive plus tard (après 4-6h). Le Mismatch Diffusion/FLAIR permet de dater l'AVC.
- **Scanner sans injection** : Examen de débrouillage rapide si l'IRM n'est pas disponible. Normale au stade très précoce de l'AVCI, mais élimine formellement l'hémorragie (hyperdense).

## Prise en charge à la Phase Aiguë
- **Thrombolyse intraveineuse (rtPA/Alteplase)** : Indiquée pour les AVCI vus dans les **4,5 heures** suivant l'apparition des symptômes, en l'absence de contre-indications (hémorragie, PA > 185/110).
- **Thrombectomie mécanique endovasculaire** : Indiquée en cas d'occlusion proximale d'un gros tronc (carotide interne, sylvienne M1, tronc basilaire), souvent couplée à la thrombolyse, efficace jusqu'à 6h (voire 24h sur critères d'imagerie spécifiques de pénombre).
- Mesures générales en Unité Neurovasculaire (UNV) : maintien PA, normoglycémie, normothermie, prévention des complications.\`,
        keyPoints: [
          'AVC = déficit neurologique focal d\\'apparition brutale.',
          'Le territoire sylvien donne un déficit à prédominance brachio-faciale + aphasie (si H. mineur).',
          'IRM Diffusion : hypersignal précoce de l\\'ischémie. Scanner sans injection : élimine l\\'hémorragie.',
          'Thrombolyse IV possible jusqu\\'à 4,5h du début des symptômes.',
          'Thrombectomie mécanique en cas d\\'occlusion proximale d\\'une grosse artère (jusqu\\'à 6h ou plus).'
        ],
        clinicalCorrelation: 'L\\'AIT (Accident Ischémique Transitoire) est un AVC qui a spontanément reperfusé. Le déficit neurologique régresse en moins de 1h et l\\'IRM est normale. C\\'est une urgence extrême car le risque de faire un AVC constitué dans les jours suivants est très élevé. Une imagerie vasculaire et cardiaque est requise immédiatement.'
      }
    ]
  },
  {
    moduleId: 'MOD-HGE-S6',
    semester: 6,
    discipline: 'Gastro-entérologie',
    chapters: [
      {
        id: 'chap-hge-1',
        title: 'Les Cirrhoses',
        duration: '45 min',
        content: \`# La Cirrhose et ses Complications

La cirrhose est le stade terminal de la plupart des maladies chroniques du foie. Elle se caractérise par une architecture hépatique bouleversée par une fibrose mutilante annulaire délimitant des nodules de régénération, avec insuffisance hépatocellulaire (IHC) et hypertension portale (HTP).

## Étiologies Principales
Au Maroc, les causes les plus fréquentes sont :
1. Les hépatites virales chroniques : VHB et VHC.
2. La stéatopathie métabolique (NASH / MASLD) liée à l'obésité et au diabète.
3. La consommation chronique d'alcool.
4. Les maladies auto-immunes (CBP, CSP, hépatite auto-immune) et génétiques (hémochromatose, maladie de Wilson).

## Signes Cliniques et Biologiques
La cirrhose peut rester compensée et asymptomatique longtemps.
- **Signes d'IHC** : Asthénie, angiomes stellaires (territoire cave supérieur), érythème palmaire, ictère, encéphalopathie, baisse du TP, hypoalbuminémie, élévation de la bilirubine.
- **Signes d'HTP** : Splénomégalie, circulation veineuse collatérale (tête de méduse), ascite, thrombopénie (hypersplénisme).

## Complications de la Cirrhose
1. **Rupture de varices œsophagiennes (VO) ou gastriques** : Urgence absolue (hématémèse/méléna). Traitement : Transfusion, médicaments vasoactifs (Terlipressine, Somatostatine, Octréotide) et ligature endoscopique dans les 12h.
2. **Ascite et Infection du liquide d'ascite (ILA)** : L'ascite est traitée par régime hyposodé, spironolactone et paracentèses. L'ILA se manifeste par de la fièvre ou des douleurs abdominales (parfois asymptomatique) et se diagnostique par la ponction d'ascite (> 250 PNN/mm3). Traitement : Cefotaxime ou Ceftriaxone.
3. **Encéphalopathie Hépatique** : Troubles de la conscience, astérixis (flapping tremor), fœtor hepaticus. Causée par l'accumulation d'ammoniaque. Facteurs déclenchants : infection, hémorragie, constipation, sédatifs. Traitement : Lactulose.
4. **Carcinome Hépatocellulaire (CHC)** : Complication majeure à long terme. Dépistage obligatoire par échographie hépatique tous les 6 mois.

## Pronostic
Évalué par les scores de **Child-Pugh** (Bilirubine, Albumine, TP, Ascite, Encéphalopathie) classé A, B, C et par le score **MELD** (utilisé pour l'allocation des greffons hépatiques, calculé sur Bilirubine, INR et Créatinine).\`,
        keyPoints: [
          'La cirrhose associe fibrose diffuse et nodules de régénération (définition histologique).',
          'Associe deux grands syndromes : Insuffisance hépato-cellulaire et Hypertension portale.',
          'Urgence hémorragique par rupture de VO : Terlipressine + Ligature endoscopique.',
          'Infection du liquide d\\'ascite : diagnostic = PNN > 250/mm3. Traitement = C3G.',
          'Dépistage du Carcinome Hépatocellulaire par échographie semestrielle.'
        ],
        clinicalCorrelation: 'Devant tout patient cirrhotique présentant une altération de l\\'état général, une confusion, ou un épisode de décompensation hydropique (ascite), le premier geste à réaliser est une ponction exploratrice du liquide d\\'ascite pour éliminer une infection spontanée (ILA), complication mortelle en l\\'absence de traitement.'
      }
    ]
  },
  {
    moduleId: 'MOD-PEDIATRIE-S8',
    semester: 8,
    discipline: 'Pédiatrie',
    chapters: [
      {
        id: 'chap-ped-1',
        title: 'Ictère du Nouveau-né',
        duration: '45 min',
        content: \`# Les Ictères Néonatals

L'ictère est un signe clinique très fréquent chez le nouveau-né, visible cliniquement lorsque la bilirubinémie dépasse 50-70 µmol/L. La majorité des ictères sont bénins, mais la bilirubinémie non conjuguée (libre) expose au risque grave d'ictère nucléaire (encéphalopathie bilirubinique).

## Ictères à bilirubine non conjuguée (indirecte)
Ce sont de loin les plus fréquents.

### 1. L'Ictère Physiologique
Apparaît au 2ème ou 3ème jour de vie, sans aucun signe d'anomalie associée (foie de taille normale, urines claires, enfant tonique). Il est dû à l'immaturité hépatique (défaut de glycuroconjugaison) et à l'hémolyse physiologique néonatale. Il disparaît spontanément avant le 10ème jour.

### 2. Les Ictères Hémolytiques (Pathologiques)
Il faut y penser devant un ictère :
- Apparu très précocement (< 24 heures de vie).
- Intense et d'aggravation rapide.
- Accompagné de signes d'anémie, splénomégalie, ou signes de gravité neurologique.
Les causes principales :
- **Incompatibilité fœto-maternelle Rhésus (Allo-immunisation)** : mère Rh négatif, enfant Rh positif, test de Coombs direct positif.
- **Incompatibilité dans le système ABO** : mère O, enfant A ou B. Mieux tolérée que l'allo-immunisation Rhésus, test de Coombs souvent négatif.
- Hémolyses constitutionnelles : déficit en G6PD, sphérocytose héréditaire.

### 3. Ictère au lait maternel
Survient vers le 5-6ème jour chez l'enfant exclusivement allaité au sein, persiste parfois 4 à 8 semaines. Totalement bénin, il ne faut surtout pas interrompre l'allaitement maternel.

## L'Ictère Nucléaire
C'est la complication majeure de l'hyperbilirubinémie libre. La bilirubine non conjuguée, liposoluble, passe la barrière hémato-encéphalique et précipite dans les noyaux gris centraux. 
Signes cliniques : léthargie, refus de boire, hypertonie avec opisthotonos, cris aigus, convulsions, puis séquelles définitives (surdité, paralysie cérébrale choréoathétosique). 

## Traitement de l'hyperbilirubinémie libre
La surveillance s'aide du bilirubinomètre transcutané (Btc). Le traitement de première intention est la **photothérapie** (la lumière bleue transforme la bilirubine en photo-isomères hydrosolubles éliminables). En cas d'hyperbilirubinémie sévère avec risque neurologique imminent, l'exsanguino-transfusion est réalisée.

## Ictères à bilirubine conjuguée (directe)
Toute hyperbilirubinémie conjuguée (urines foncées, selles décolorées, hépatomégalie) est pathologique. L'urgence diagnostique est l'**atrésie des voies biliaires**, qui nécessite une intervention chirurgicale précoce (intervention de Kasaï) avant 45-60 jours de vie pour éviter la cirrhose biliaire irréversible.\`,
        keyPoints: [
          'L\\'ictère physiologique apparaît après 24h et disparaît en une semaine.',
          'Tout ictère apparaissant dans les 24 premières heures est pathologique (souvent hémolytique).',
          'Complication majeure = Ictère nucléaire, prévenu par la photothérapie.',
          'Allo-immunisation Rhésus : mère Rh-, bébé Rh+, test de Coombs direct positif.',
          'Ictère + selles blanches + urines foncées = atrésie des voies biliaires jusqu\\'à preuve du contraire (urgence chirurgicale).'
        ],
        clinicalCorrelation: 'Devant un nouveau-né présentant un ictère persistant au-delà de 14 jours de vie, la première étape indispensable est de vérifier la couleur des selles et de doser la bilirubine totale et conjuguée pour éliminer une atrésie des voies biliaires.'
      }
    ]
  }
];
`;

fs.writeFileSync(path.join(__dirname, 'lib/module-content.ts'), moduleContent.trim());
console.log('Module content library created.');
