'use client';

import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { 
  Heart, Brain, Wind, Activity, Eye, EyeOff, Sparkles, ZoomIn, ZoomOut, 
  RotateCcw, Layers, Info, CheckCircle2, ChevronRight, Stethoscope, Search,
  Box, Shield, Cpu, RefreshCw, Play, Pause, Move, Maximize2, Compass
} from 'lucide-react';

interface Hotspot3D {
  id: string;
  label: string;
  pos: [number, number, number]; // [x, y, z] in Three.js world space
  info: string;
  pfeTip?: string;
}

interface Organ3DData {
  id: string;
  name: string;
  latinName: string;
  system: 'Cardiovasculaire' | 'Nerveux' | 'Respiratoire' | 'Digestif';
  description: string;
  clinicalImportance: string;
  hotspots: Hotspot3D[];
  type: 'heart' | 'brain' | 'lungs' | 'liver';
  color: number;
}

const ORGANS_DATA: Organ3DData[] = [
  {
    id: 'heart-three',
    name: 'Cœur & Arbre Coronaire 3D (WebGL)',
    latinName: 'Cor 3D - Systema cardiovasculare',
    system: 'Cardiovasculaire',
    color: 0xef4444,
    type: 'heart',
    description: 'Modèle tridimensionnel WebGL du cœur montrant le ventricule gauche, l\'oreillette droite, la crosse aortique et l\'artère interventriculaire antérieure.',
    clinicalImportance: 'Visualisation 3D dynamique pour localiser les infarctus du myocarde (STEMI antérieur sur occlusion de l\'IVA) et les blocs de branche.',
    hotspots: [
      { id: 'h1', label: '1. Oreillette Droite (OD)', pos: [1.2, 0.4, 0.6], info: 'Reçoit le sang veineux des veines caves. Contient le nœud sinusal de Keith & Flack.', pfeTip: 'Fosse ovale à la face septale interauriculaire (vestige du foramen ovale).' },
      { id: 'h2', label: '2. Ventricule Gauche (VG)', pos: [-0.9, -0.6, 0.9], info: 'Paroi musculaire épaisse (8-12 mm). Éjecte le sang dans l\'aorte sous haute pression.', pfeTip: 'FEVG normale ≥ 55%. Épaississement > 15 mm = HVG sur HTA.' },
      { id: 'h3', label: '3. Crosse de l\'Aorte (Arc 3D)', pos: [-0.2, 1.8, 0.1], info: 'Tronc artériel majeur de 3 cm. Donne le TBC, la carotide commune G et la sous-clavière G.', pfeTip: 'Lieu de la dissection aortique type A de Stanford (urgence absolue).' },
      { id: 'h4', label: '4. Artère Interventriculaire Antérieure (IVA)', pos: [0.1, -0.2, 1.4], info: 'Branche majeure du tronc commun gauche descendant dans le sillon IV antérieur.', pfeTip: 'L\'occlusion de l\'IVA cause les infarctus antérieurs et apicaux graves.' },
      { id: 'h5', label: '5. Face Postérieure & Sinus Coronaire', pos: [0.3, -0.3, -1.3], info: 'Face postérieure du cœur drainant le réseau veineux coronarien dans l\'OD.', pfeTip: 'L\'artère coronaire droite chemine à la face postérieure dans le sillon AV.' }
    ]
  },
  {
    id: 'brain-three',
    name: 'Encéphale & Polygone de Willis 3D',
    latinName: 'Encephalon 3D - Systema nervosum',
    system: 'Nerveux',
    color: 0xa855f7,
    type: 'brain',
    description: 'Structure encéphalique 3D avec cortex cérébral bilatéral, cervelet, tronc cérébral et polygone de Willis à la base.',
    clinicalImportance: 'Repérage 3D des territoires d\'AVC ischémique (Sylvien, Cérébral antérieur, Tronc basilaire) et des aires du langage (Broca, Wernicke).',
    hotspots: [
      { id: 'b1', label: '1. Lobe Frontal & Aire de Broca', pos: [-1.2, 0.5, 0.8], info: 'Aire motrice du langage (Aires 44/45 de Brodmann). Contrôle la production verbale.', pfeTip: 'AVC sylvien gauche superficiel → Aphasie de Broca d\'expression.' },
      { id: 'b2', label: '2. Lobe Temporal & Aire de Wernicke', pos: [-1.4, -0.4, 0.3], info: 'Aire de compréhension du langage parlé et écrit (Aire 22 de Brodmann).', pfeTip: 'Aphasie de Wernicke : jargonaphasie avec compréhension altérée.' },
      { id: 'b3', label: '3. Cervelet (Vue Postérieure)', pos: [0.8, -1.1, -1.0], info: 'Coordination motrice et équilibre. Divisé en vermis et 2 hémisphères.', pfeTip: 'Syndrome cérébelleux : ataxie, hypotonie, dysmétrie au test index-nez.' },
      { id: 'b4', label: '4. Tronc Cérébral (Pédoncules & Bulbe)', pos: [0.0, -1.3, 0.1], info: 'Contient la substance réticulée activatrice et les noyaux des nerfs crâniens III à XII.', pfeTip: 'Atteinte du tronc → Syndromes alternés (hémiplégie croisée).' },
      { id: 'b5', label: '5. Polygone de Willis (Base)', pos: [0.0, -0.4, -0.8], info: 'Cercle artériel anastomotique réorientant la circulation entre carotides et vertébrales.', pfeTip: 'Siège des anévrismes intracrâniens (rupture → Hémorragie méningée).' }
    ]
  },
  {
    id: 'lungs-three',
    name: 'Poumons & Arbre Bronchique 3D',
    latinName: 'Pulmones 3D - Systema respiratorium',
    system: 'Respiratoire',
    color: 0x0284c7,
    type: 'lungs',
    description: 'Volume 3D des poumons droit et gauche avec la trachée centrale et l\'arbre bronchique.',
    clinicalImportance: 'Visualisation de l\'asymétrie bronchique, de la déclivité des culs-de-sac pleuraux et des sommets pulmonaires.',
    hotspots: [
      { id: 'l1', label: '1. Apex Pulmonaire Droit', pos: [-0.9, 1.6, 0.3], info: 'Sommet pulmonaire dépassant la 1ère côte. Zone fortement oxygénée.', pfeTip: 'Zone de prédilection de la tuberculose pulmonaire secondaire (cavernes).' },
      { id: 'l2', label: '2. Carène & Bronche Souche Droite', pos: [0.0, 0.5, -0.2], info: 'Bifurcation trachéale à T5. La bronche droite est plus verticale (angle 25°).', pfeTip: 'Les corps étrangers inhalés tombent quasi toujours dans la bronche droite.' },
      { id: 'l3', label: '3. Lobe Moyen Droit', pos: [-1.4, -0.3, 0.7], info: 'Poumon droit trilobé séparé par la grande scissure et la petite scissure horizontale.', pfeTip: 'Pneumopathie franche lobaire aiguë (PFLA) à pneumocoque.' },
      { id: 'l4', label: '4. Sinus Pleural Costo-Diaphragmatique', pos: [1.3, -1.6, 0.3], info: 'Cul-de-sac pleural le plus déclive où s\'accumule l\'épanchement liquide (pleurésie).', pfeTip: 'Épanchement pleural visible à la radio si V > 250 mL.' }
    ]
  },
  {
    id: 'liver-three',
    name: 'Foie & Segmentation de Couinaud 3D',
    latinName: 'Hepar 3D - Systema digestorium',
    system: 'Digestif',
    color: 0xd97706,
    type: 'liver',
    description: 'Glande hépatique volumétrique 3D avec sa vascularisation portale et la vésicule biliaire.',
    clinicalImportance: 'Essentiel pour repérer la cirrhose, les nœuds de régénération, le CHC et le hile hépatique.',
    hotspots: [
      { id: 'li1', label: '1. Lobe Caudé (Segment I - Postérieur)', pos: [0.0, 0.6, -1.0], info: 'Segment autonome adjacent à la veine cave inférieure. Vascularisation propre.', pfeTip: 'Hypertrophié de façon compensatrice dans la cirrhose hépatique.' },
      { id: 'li2', label: '2. Lobe Gauche (Segments II & III)', pos: [-1.5, 0.2, 0.5], info: 'Secteur latéral gauche s\'étendant vers l\'épigastre.', pfeTip: 'Accessible à la résection segmentaire gauche.' },
      { id: 'li3', label: '3. Vésicule Biliaire (Face Inférieure)', pos: [0.8, -1.0, 0.9], info: 'Réservoir de bile sous la face viscérale du foie. Reliée au canal cystique.', pfeTip: 'Point de Murphy sous-costal droit. Lithiase biliaire → Cholécystite.' },
      { id: 'li4', label: '4. Hile Hépatique & Tronc Porte', pos: [0.1, -0.3, 0.2], info: 'Arrivée de la veine porte (80% du débit) et de l\'artère hépatique.', pfeTip: 'Hypertension Portale (HTP) si pression portale > 10 mmHg → Varices œsophagiennes.' }
    ]
  }
];

export default function Anatomy3DSection() {
  const [selectedOrgan, setSelectedOrgan] = useState<Organ3DData>(ORGANS_DATA[0]);
  const [activeHotspotId, setActiveHotspotId] = useState<string>(ORGANS_DATA[0].hotspots[0].id);

  // Controls state
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseAnim, setPulseAnim] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [viewAngle, setViewAngle] = useState<'FRONT' | 'BACK' | 'SIDE'>('FRONT');

  // Canvas & WebGL Refs
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const organMeshGroupRef = useRef<THREE.Group | null>(null);

  // Hotspot Screen Positions Map (id -> { x, y, isVisible })
  const [screenHotspots, setScreenHotspots] = useState<Record<string, { x: number; y: number; isBack: boolean }>>({});

  // Mouse Drag Tracking
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const rotationGroupRef = useRef({ x: 0, y: 0 });

  // ───────────────────────────────────────────────────────────────────────────
  // THREE.JS SCENE INITIALIZATION & ANIMATION LOOP
  // ───────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const mountElem = mountRef.current;
    if (!mountElem) return;

    const width = mountElem.clientWidth;
    const height = mountElem.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountElem.appendChild(renderer.domElement);

    // 4. Lighting (Studio Volumetric Setup)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0d9488, 2.0); // Teal rim light
    dirLight2.position.set(-5, -4, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(selectedOrgan.color, 3, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // 5. Build Organ 3D Mesh Group
    const group = buildOrganMeshGroup(selectedOrgan);
    scene.add(group);
    organMeshGroupRef.current = group;

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (group) {
        // Auto-rotation
        if (autoRotate && !isDraggingRef.current) {
          group.rotation.y += 0.008;
          rotationGroupRef.current.y = group.rotation.y;
        } else {
          group.rotation.y = rotationGroupRef.current.y;
          group.rotation.x = rotationGroupRef.current.x;
        }

        // Pulse Expansion Animation (Cardiac/Respiratory)
        if (pulseAnim) {
          const scaleOffset = Math.sin(elapsedTime * 3) * 0.04;
          const currentZoomScale = zoomLevel;
          group.scale.set(
            currentZoomScale + scaleOffset,
            currentZoomScale + scaleOffset,
            currentZoomScale + scaleOffset
          );
        } else {
          group.scale.set(zoomLevel, zoomLevel, zoomLevel);
        }

        // Project 3D Hotspot Coordinates to 2D Screen Canvas
        const newHotspotScreenMap: Record<string, { x: number; y: number; isBack: boolean }> = {};
        
        selectedOrgan.hotspots.forEach(hs => {
          const worldVec = new THREE.Vector3(...hs.pos);
          worldVec.applyMatrix4(group.matrixWorld);

          // Check if point is on back side facing away from camera
          const camDir = new THREE.Vector3(0, 0, 1).applyQuaternion(camera.quaternion);
          const isBack = worldVec.z < 0;

          // Project to Normalized Device Coordinates (-1 to +1)
          const projectedVec = worldVec.clone().project(camera);

          // Convert to Pixel Coordinates (0 to width/height)
          const px = ((projectedVec.x + 1) * width) / 2;
          const py = ((-projectedVec.y + 1) * height) / 2;

          newHotspotScreenMap[hs.id] = { x: px, y: py, isBack };
        });

        setScreenHotspots(newHotspotScreenMap);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountElem || !renderer || !camera) return;
      const w = mountElem.clientWidth;
      const h = mountElem.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountElem.contains(renderer.domElement)) {
        mountElem.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedOrgan, autoRotate, pulseAnim, zoomLevel]);

  // ───────────────────────────────────────────────────────────────────────────
  // THREE.JS MESH GEOMETRY BUILDERS FOR EACH ORGAN
  // ───────────────────────────────────────────────────────────────────────────
  const buildOrganMeshGroup = (organ: Organ3DData): THREE.Group => {
    const group = new THREE.Group();

    if (organ.type === 'heart') {
      // Main Heart Body (Deformed Sphere/Torus composite)
      const heartGeo = new THREE.SphereGeometry(1.4, 32, 32);
      // Deform sphere to heart shape
      const posAttr = heartGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        let y = posAttr.getY(i);
        let x = posAttr.getX(i);
        let z = posAttr.getZ(i);
        if (y < 0) {
          x *= (1 + y * 0.3);
          z *= (1 + y * 0.3);
        }
        posAttr.setXYZ(i, x, y, z);
      }
      heartGeo.computeVertexNormals();

      const heartMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        roughness: 0.3,
        metalness: 0.2,
        bumpScale: 0.05,
      });
      const heartMesh = new THREE.Mesh(heartGeo, heartMat);
      group.add(heartMesh);

      // Aorta Arc (Torus Geometry)
      const aortaGeo = new THREE.TorusGeometry(0.8, 0.22, 16, 32, Math.PI * 1.2);
      const aortaMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.2 });
      const aortaMesh = new THREE.Mesh(aortaGeo, aortaMat);
      aortaMesh.position.set(-0.2, 1.0, 0);
      aortaMesh.rotation.z = Math.PI / 4;
      group.add(aortaMesh);

      // Pulmonary Trunk (Cylinder)
      const pulmGeo = new THREE.CylinderGeometry(0.2, 0.25, 1.2, 16);
      const pulmMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
      const pulmMesh = new THREE.Mesh(pulmGeo, pulmMat);
      pulmMesh.position.set(0.5, 0.9, 0.3);
      pulmMesh.rotation.z = -Math.PI / 6;
      group.add(pulmMesh);

      // Coronary Arteries (Tube Geometry curves)
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.8, 0.8),
        new THREE.Vector3(-0.4, 0.2, 1.2),
        new THREE.Vector3(0, -0.6, 1.3),
        new THREE.Vector3(0.2, -1.2, 0.7),
      ]);
      const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.06, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({ color: 0xfecdd3, emissive: 0xe11d48, emissiveIntensity: 0.3 });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tubeMesh);
    } else if (organ.type === 'brain') {
      // Cerebral Hemispheres (Left & Right Spheres)
      const leftGeo = new THREE.SphereGeometry(1.2, 32, 32);
      leftGeo.scale(1, 0.85, 1.3);
      const brainMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        roughness: 0.4,
        metalness: 0.1,
      });

      const leftMesh = new THREE.Mesh(leftGeo, brainMat);
      leftMesh.position.set(-0.55, 0.2, 0);
      group.add(leftMesh);

      const rightMesh = new THREE.Mesh(leftGeo, brainMat);
      rightMesh.position.set(0.55, 0.2, 0);
      group.add(rightMesh);

      // Cerebellum (Posterior Sphere)
      const cerebGeo = new THREE.SphereGeometry(0.7, 24, 24);
      const cerebMat = new THREE.MeshStandardMaterial({ color: 0x7e22ce, roughness: 0.5 });
      const cerebMesh = new THREE.Mesh(cerebGeo, cerebMat);
      cerebMesh.position.set(0, -0.7, -0.7);
      group.add(cerebMesh);

      // Brainstem (Cylinder)
      const stemGeo = new THREE.CylinderGeometry(0.25, 0.2, 1.2, 16);
      const stemMat = new THREE.MeshStandardMaterial({ color: 0x581c87 });
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.position.set(0, -1.0, -0.1);
      group.add(stemMesh);
    } else if (organ.type === 'lungs') {
      // Left & Right Lung Lobes
      const lungGeo = new THREE.ConeGeometry(1.0, 2.6, 24);
      const lungMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 });

      const leftLung = new THREE.Mesh(lungGeo, lungMat);
      leftLung.position.set(-1.1, -0.2, 0);
      leftLung.rotation.z = -0.15;
      group.add(leftLung);

      const rightLung = new THREE.Mesh(lungGeo, lungMat);
      rightLung.position.set(1.1, -0.2, 0);
      rightLung.rotation.z = 0.15;
      group.add(rightLung);

      // Trachea
      const trachGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.8, 16);
      const trachMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2 });
      const trachMesh = new THREE.Mesh(trachGeo, trachMat);
      trachMesh.position.set(0, 0.8, 0);
      group.add(trachMesh);
    } else if (organ.type === 'liver') {
      // Triangular volumetric hepatic lobe
      const liverGeo = new THREE.DodecahedronGeometry(1.5, 2);
      const posAttr = liverGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        let x = posAttr.getX(i);
        let y = posAttr.getY(i);
        let z = posAttr.getZ(i);
        if (x < 0) y *= 0.6;
        posAttr.setXYZ(i, x * 1.3, y * 0.8, z * 0.9);
      }
      liverGeo.computeVertexNormals();

      const liverMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 });
      const liverMesh = new THREE.Mesh(liverGeo, liverMat);
      group.add(liverMesh);

      // Gallbladder
      const gallGeo = new THREE.SphereGeometry(0.35, 16, 16);
      gallGeo.scale(1, 1.5, 0.8);
      const gallMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.2 });
      const gallMesh = new THREE.Mesh(gallGeo, gallMat);
      gallMesh.position.set(0.6, -0.8, 0.7);
      group.add(gallMesh);
    }

    return group;
  };

  // ───────────────────────────────────────────────────────────────────────────
  // MOUSE & TOUCH ORBIT DRAG HANDLERS
  // ───────────────────────────────────────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingRef.current = true;
    setAutoRotate(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    previousMousePosition.current = { x: clientX, y: clientY };
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - previousMousePosition.current.x;
    const deltaY = clientY - previousMousePosition.current.y;

    rotationGroupRef.current.y += deltaX * 0.015;
    rotationGroupRef.current.x += deltaY * 0.01;

    // Clamp pitch (rotation.x) to prevent flipping upside down
    rotationGroupRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationGroupRef.current.x));

    previousMousePosition.current = { x: clientX, y: clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleSelectOrgan = (organ: Organ3DData) => {
    setSelectedOrgan(organ);
    setActiveHotspotId(organ.hotspots[0].id);
    rotationGroupRef.current = { x: 0, y: 0 };
    setViewAngle('FRONT');
  };

  const setViewPreset = (angle: 'FRONT' | 'BACK' | 'SIDE') => {
    setViewAngle(angle);
    setAutoRotate(false);
    if (angle === 'FRONT') rotationGroupRef.current = { x: 0, y: 0 };
    if (angle === 'BACK')  rotationGroupRef.current = { x: 0, y: Math.PI };
    if (angle === 'SIDE')  rotationGroupRef.current = { x: 0, y: Math.PI / 2 };
  };

  const hotspotDetails = selectedOrgan.hotspots.find(h => h.id === activeHotspotId) || selectedOrgan.hotspots[0];

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-[#030305] min-h-screen text-white select-none"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif' }}>
      
      {/* ─── 3D WEBGL ENGINE HERO HEADER ─── */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-teal-500/20"
        style={{ background: 'linear-gradient(135deg, #091a16 0%, #020705 100%)', boxShadow: '0 0 45px rgba(20,184,166,0.15)' }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 tracking-wide">
                MOTEUR 3D WEBGL REALTIME (THREE.JS)
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PROJECTION ANATOMIQUE 1:1
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Box className="w-8 h-8 text-teal-400 animate-spin" style={{ animationDuration: '14s' }} />
              Atlas d'Anatomie 3D WebGL Réaliste
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Glissez la souris ou le doigt pour **faire tourner le volume 3D sous tous les angles à 360°**. 
              Les pastilles numérotées sont projetées en temps réel sur la surface 3D exacte de l'organe !
            </p>
          </div>

          {/* Quick controls top */}
          <div className="flex items-center gap-2 bg-[#121215] p-2 rounded-2xl border border-white/10 shrink-0">
            <button onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                autoRotate ? 'bg-teal-500 text-black shadow-lg' : 'text-slate-400 hover:text-white bg-white/5'
              }`}>
              {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>Rotation Auto 360°</span>
            </button>
            
            <button onClick={() => setPulseAnim(!pulseAnim)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                pulseAnim ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:text-white bg-white/5'
              }`}>
              <Heart className="w-3.5 h-3.5" />
              <span>Pulsation 3D</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── ORGAN SELECTOR TABS ─── */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
        {ORGANS_DATA.map(organ => {
          const isSelected = selectedOrgan.id === organ.id;
          return (
            <button key={organ.id} onClick={() => handleSelectOrgan(organ)}
              className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2.5 border shrink-0 ${
                isSelected
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/50 shadow-lg shadow-teal-500/10'
                  : 'bg-[#141417] text-slate-400 border-white/5 hover:border-white/20 hover:text-white'
              }`}>
              {organ.type === 'heart' && <Heart className="w-4 h-4 text-rose-400" />}
              {organ.type === 'brain' && <Brain className="w-4 h-4 text-purple-400" />}
              {organ.type === 'lungs' && <Wind className="w-4 h-4 text-cyan-400" />}
              {organ.type === 'liver' && <Activity className="w-4 h-4 text-amber-400" />}
              <span>{organ.name}</span>
            </button>
          );
        })}
      </div>

      {/* ─── MAIN 3D CANVAS & DETAILS ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ─── THREE.JS WEBGL CANVAS STAGE (Col 7) ─── */}
        <div className="lg:col-span-7 bg-[#070709] rounded-3xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[520px] shadow-2xl"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}>

          {/* Background Radial Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

          {/* Top Left Orientation Badge */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
            <span className="text-[11px] font-mono font-bold text-teal-400 bg-teal-950/90 border border-teal-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-teal-400 animate-spin" style={{ animationDuration: '10s' }} />
              {selectedOrgan.latinName}
            </span>
          </div>

          {/* Top Right View Angle Presets & Zoom */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-[#141417]/90 backdrop-blur-xl p-1.5 rounded-2xl border border-white/10"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setViewPreset('FRONT')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold ${viewAngle === 'FRONT' ? 'bg-teal-500 text-black' : 'text-slate-400 hover:text-white'}`}>
              Face
            </button>
            <button onClick={() => setViewPreset('BACK')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold ${viewAngle === 'BACK' ? 'bg-teal-500 text-black' : 'text-slate-400 hover:text-white'}`}>
              Dos
            </button>
            <button onClick={() => setViewPreset('SIDE')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold ${viewAngle === 'SIDE' ? 'bg-teal-500 text-black' : 'text-slate-400 hover:text-white'}`}>
              Profil
            </button>
            <div className="w-px h-4 bg-white/10" />
            <button onClick={() => setZoomLevel(z => Math.min(z + 0.2, 1.8))} className="p-1.5 text-slate-300 hover:text-white"><ZoomIn className="w-4 h-4" /></button>
            <button onClick={() => setZoomLevel(z => Math.max(z - 0.2, 0.6))} className="p-1.5 text-slate-300 hover:text-white"><ZoomOut className="w-4 h-4" /></button>
          </div>

          {/* Bottom Drag Instruction */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
            <span className="text-[11px] text-slate-400 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5 text-teal-400" />
              Glissez la souris/doigt pour tourner l'organe 3D à 360°
            </span>
          </div>

          {/* THREE.JS WEBGL RENDER CANVAS CONTAINER */}
          <div className="w-full h-full min-h-[520px] relative" ref={mountRef} />

          {/* ─── DYNAMICALLY PROJECTED 2D HOTSPOT PINS ─── */}
          {selectedOrgan.hotspots.map(hs => {
            const screenPos = screenHotspots[hs.id];
            if (!screenPos) return null;

            const isActive = hs.id === activeHotspotId;

            return (
              <button key={hs.id} onClick={(e) => { e.stopPropagation(); setActiveHotspotId(hs.id); }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-75 z-30 ${
                  isActive ? 'scale-125' : 'hover:scale-110'
                }`}
                style={{
                  left: `${screenPos.x}px`,
                  top: `${screenPos.y}px`,
                  opacity: screenPos.isBack ? 0.35 : 1,
                  filter: screenPos.isBack ? 'blur(1px)' : 'none',
                }}>
                <span className={`flex items-center justify-center w-7 h-7 rounded-full font-mono text-[11px] font-bold shadow-2xl transition-all ${
                  isActive
                    ? 'bg-teal-400 text-black ring-4 ring-teal-500/50 border-2 border-white animate-pulse'
                    : 'bg-[#141417] text-teal-300 border border-teal-500/40'
                }`}>
                  {hs.id.replace(/^[a-z]+/, '')}
                </span>
              </button>
            );
          })}
        </div>

        {/* ─── DETAILS & PFE PEARLS SIDEBAR (Col 5) ─── */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Active Hotspot Card */}
          <div className="bg-[#121215] rounded-3xl border border-teal-500/30 p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {hotspotDetails.label}
              </span>
              <span className="text-[11px] font-mono text-slate-400">Repère #{hotspotDetails.id}</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2 leading-snug">{hotspotDetails.label}</h3>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {hotspotDetails.info}
            </p>

            {/* PFE Exam Clinical Pearl */}
            {hotspotDetails.pfeTip && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1.5">
                  <Stethoscope className="w-4 h-4" />
                  <span>Incontournable PFE & Résidanat Maroc</span>
                </div>
                <p className="text-amber-200/90 text-xs leading-relaxed font-medium">
                  {hotspotDetails.pfeTip}
                </p>
              </div>
            )}
          </div>

          {/* Organ Clinical Summary & Hotspot List */}
          <div className="bg-[#0f0f12] rounded-3xl border border-white/8 p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Info className="w-4 h-4 text-teal-400" />
              Intérêt Pathologique & Chirurgical
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              {selectedOrgan.clinicalImportance}
            </p>

            <div className="pt-2 border-t border-white/5">
              <span className="text-[11px] font-bold text-slate-500 block mb-2">SÉLECTIONNER UN REPÈRE (1 - {selectedOrgan.hotspots.length}) :</span>
              <div className="space-y-1.5">
                {selectedOrgan.hotspots.map(hs => (
                  <button key={hs.id} onClick={() => setActiveHotspotId(hs.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      hs.id === activeHotspotId
                        ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}>
                    <span>{hs.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
