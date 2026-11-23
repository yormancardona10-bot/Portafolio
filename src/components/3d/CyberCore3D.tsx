import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Sparkles, Layers, Activity } from 'lucide-react';

export type CoreMode = 'reactor' | 'wireframe' | 'particles';

export function CyberCore3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CoreMode>('reactor');
  const [isInteracting, setIsInteracting] = useState(false);
  const [activePillar, setActivePillar] = useState<string>('Full Stack Core');

  // Referencias mutables para animación
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const innerMeshRef = useRef<THREE.Mesh | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);
  const ring3Ref = useRef<THREE.Mesh | null>(null);
  const satellitesRef = useRef<THREE.Group | null>(null);
  const shockwaveRef = useRef<THREE.Mesh | null>(null);

  // Pilares del stack que orbitan el núcleo
  const pillars = [
    { name: 'Frontend', color: '#A3E635', desc: 'React, CSS Grid, Flutter, UI/UX' },
    { name: 'Backend', color: '#22D3EE', desc: 'Node.js, Express, Django REST' },
    { name: 'Data & SQL', color: '#A78BFA', desc: 'MySQL, MongoDB, Mongoose' },
    { name: 'DevOps & AI', color: '#38BDF8', desc: 'Docker, Git, Pruebas, LLMs' },
  ];

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 400;
    const height = mount.clientHeight || 400;

    // 1. Escena & Renderizador
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // 2. Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const limePoint = new THREE.PointLight(0xa3e635, 3.5, 30);
    limePoint.position.set(5, 5, 5);
    scene.add(limePoint);

    const cyanPoint = new THREE.PointLight(0x22d3ee, 3.5, 30);
    cyanPoint.position.set(-5, -5, 4);
    scene.add(cyanPoint);

    const violetPoint = new THREE.PointLight(0xa78bfa, 2.5, 30);
    violetPoint.position.set(0, 6, -4);
    scene.add(violetPoint);

    // 3. Objeto Central: Icosaedro Holográfico de Doble Capa
    const coreGeo = new THREE.IcosahedronGeometry(1.65, 2);

    // Material según el modo
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0a0e18,
      emissive: 0x141a2b,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: mode === 'wireframe',
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMeshRef.current = coreMesh;
    scene.add(coreMesh);

    // Capa interior reluciente (Energy Plasma)
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xa3e635,
      wireframe: true,
      transparent: true,
      opacity: mode === 'wireframe' ? 0.7 : 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMeshRef.current = innerMesh;
    scene.add(innerMesh);

    // 4. Anillos Orbitales de Alta Precisión (Gimbal Rings)
    const ringGeo1 = new THREE.TorusGeometry(2.35, 0.035, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xa3e635,
      emissive: 0xa3e635,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1Ref.current = ring1;
    scene.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.65, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2.3;
    ring2Ref.current = ring2;
    scene.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(2.95, 0.02, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 3;
    ring3Ref.current = ring3;
    scene.add(ring3);

    // 5. Nodos Satélite (Pilares de Tecnología)
    const satellitesGroup = new THREE.Group();
    satellitesRef.current = satellitesGroup;
    scene.add(satellitesGroup);

    const satelliteColors = [0xa3e635, 0x22d3ee, 0xa78bfa, 0x38bdf8];
    const satelliteNodes: THREE.Mesh[] = [];

    pillars.forEach((_, idx) => {
      const satGeo = new THREE.SphereGeometry(0.16, 16, 16);
      const satMat = new THREE.MeshStandardMaterial({
        color: satelliteColors[idx],
        emissive: satelliteColors[idx],
        emissiveIntensity: 0.9,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satellitesGroup.add(satMesh);
      satelliteNodes.push(satMesh);
    });

    // 6. Onda expansiva (Shockwave al hacer click)
    const shockwaveGeo = new THREE.RingGeometry(0.1, 0.25, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0xa3e635,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const shockwave = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveRef.current = shockwave;
    scene.add(shockwave);

    // 7. Enjambre de micro-partículas
    const particleCount = mode === 'particles' ? 600 : 220;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.0 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      pPos[i] = radius * Math.sin(phi) * Math.cos(theta);
      pPos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pPos[i + 2] = radius * Math.cos(phi);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xa3e635,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 8. Control de arrastre e interactividad con el mouse
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.003, y: 0.005 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      rotationVelocity.y = deltaX * 0.006;
      rotationVelocity.x = deltaY * 0.006;

      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.y += rotationVelocity.y;
        coreMeshRef.current.rotation.x += rotationVelocity.x;
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    // Disparar pulso al hacer click
    let shockwaveScale = 0.1;
    let shockwaveOpacity = 0;

    const triggerShockwave = () => {
      shockwaveScale = 0.5;
      shockwaveOpacity = 1;
      // Rotar a un pilar aleatorio para mostrar dinamismo
      const randomPillar = pillars[Math.floor(Math.random() * pillars.length)];
      setActivePillar(`${randomPillar.name} — ${randomPillar.desc}`);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('click', triggerShockwave);

    // Resize
    const handleResize = () => {
      if (!mount) return;
      const newW = mount.clientWidth;
      const newH = mount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 9. Bucle de animación (60 FPS)
    let clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Rotación libre con inercia amortiguada
      if (!isDragging) {
        rotationVelocity.x *= 0.96;
        rotationVelocity.y *= 0.96;

        if (coreMeshRef.current) {
          coreMeshRef.current.rotation.y += 0.004 + rotationVelocity.y;
          coreMeshRef.current.rotation.x += 0.002 + rotationVelocity.x;
        }
      }

      // Capa interior con pulsación respiratoria
      if (innerMeshRef.current) {
        innerMeshRef.current.rotation.y -= 0.008;
        innerMeshRef.current.rotation.z += 0.005;
        const scale = 1.15 + Math.sin(time * 3) * 0.08;
        innerMeshRef.current.scale.set(scale, scale, scale);
      }

      // Anillos giroscópicos
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z = time * 0.4;
        ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.8) * 0.15;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.y = -time * 0.5;
        ring2Ref.current.rotation.z = Math.cos(time * 0.6) * 0.2;
      }
      if (ring3Ref.current) {
        ring3Ref.current.rotation.x = time * 0.25;
        ring3Ref.current.rotation.y = time * 0.35;
      }

      // Órbita de los 4 satélites
      satelliteNodes.forEach((node, index) => {
        const offset = (index * Math.PI * 2) / 4;
        const orbitRadius = 2.5;
        const currentAngle = time * 0.6 + offset;
        node.position.x = Math.cos(currentAngle) * orbitRadius;
        node.position.z = Math.sin(currentAngle) * orbitRadius;
        node.position.y = Math.sin(time * 1.5 + offset) * 0.6;
      });

      // Partículas orbitales
      particles.rotation.y = time * 0.08;

      // Animación de la onda expansiva
      if (shockwaveOpacity > 0.01) {
        shockwaveScale += 0.08;
        shockwaveOpacity *= 0.92;
        shockwave.scale.set(shockwaveScale, shockwaveScale, shockwaveScale);
        (shockwave.material as THREE.MeshBasicMaterial).opacity = shockwaveOpacity;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('click', triggerShockwave);
      window.removeEventListener('resize', handleResize);

      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      shockwaveGeo.dispose();
      shockwaveMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();

      if (mount.contains(domElement)) {
        mount.removeChild(domElement);
      }
    };
  }, [mode]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Marco de visualización holográfico */}
      <div className="relative h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] lg:h-[480px] lg:w-[480px]">
        {/* Glow de energía de fondo */}
        <div
          aria-hidden="true"
          className="absolute inset-4 -z-10 rounded-full opacity-60 transition-all duration-700"
          style={{
            background:
              mode === 'wireframe'
                ? 'radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(163,230,53,0.1) 45%, transparent 70%)'
                : 'radial-gradient(circle, rgba(163,230,53,0.3) 0%, rgba(34,211,238,0.15) 50%, transparent 70%)',
            filter: 'blur(35px)',
          }}
        />

        {/* HUD Ring externo decorativo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 rounded-full border border-lime/15 transition-all duration-1000"
          style={{
            boxShadow: 'inset 0 0 40px rgba(163, 230, 53, 0.05)',
          }}
        >
          {/* Muescas técnicas angulares */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-lime/50">
            ▲ 00° N
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-widest text-lime/50">
            ▼ 180° S
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-widest text-cyan/50">
            ◀ 270° W
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-widest text-cyan/50">
            ▶ 90° E
          </div>
        </div>

        {/* Canvas de Three.js montado */}
        <div
          ref={mountRef}
          className="h-full w-full cursor-grab active:cursor-grabbing"
          title="Arrastra para rotar · Haz clic para emitir pulso"
        />

        {/* Indicador de interacción táctil flotante */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/[0.08] bg-abyss/80 px-3.5 py-1 text-center font-mono text-[10px] text-muted backdrop-blur-md">
          {isInteracting ? (
            <span className="text-lime flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-lime" />
              Giro de órbita activo
            </span>
          ) : (
            <span>Arrastra para rotar 3D · Clic para pulso</span>
          )}
        </div>
      </div>

      {/* Panel de Telemetría y Controles del Núcleo 3D */}
      <div className="mt-3 flex w-full max-w-[420px] flex-col gap-2.5">
        {/* Pilar activo seleccionado */}
        <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-surface/70 px-4 py-2.5 backdrop-blur-lg">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-lime animate-pulse" />
            <span className="font-mono text-[11px] text-subtle font-medium">{activePillar}</span>
          </div>
          <span className="font-mono text-[10px] text-lime uppercase tracking-widest">
            SYNCHRONIZED
          </span>
        </div>

        {/* Botones de Modos 3D */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setMode('reactor')}
            className={`flex items-center justify-center gap-1.5 rounded-xl border py-2 font-mono text-[11px] font-semibold transition-all duration-300 ${
              mode === 'reactor'
                ? 'border-lime/40 bg-lime/10 text-lime shadow-glow-lime'
                : 'border-white/[0.06] bg-white/[0.02] text-muted hover:border-white/15 hover:text-ink'
            }`}
          >
            <Sparkles size={13} />
            Reactor
          </button>

          <button
            type="button"
            onClick={() => setMode('wireframe')}
            className={`flex items-center justify-center gap-1.5 rounded-xl border py-2 font-mono text-[11px] font-semibold transition-all duration-300 ${
              mode === 'wireframe'
                ? 'border-cyan/40 bg-cyan/10 text-cyan shadow-glow-cyan'
                : 'border-white/[0.06] bg-white/[0.02] text-muted hover:border-white/15 hover:text-ink'
            }`}
          >
            <Layers size={13} />
            Wireframe
          </button>

          <button
            type="button"
            onClick={() => setMode('particles')}
            className={`flex items-center justify-center gap-1.5 rounded-xl border py-2 font-mono text-[11px] font-semibold transition-all duration-300 ${
              mode === 'particles'
                ? 'border-violet/40 bg-violet/10 text-violet shadow-glow-violet'
                : 'border-white/[0.06] bg-white/[0.02] text-muted hover:border-white/15 hover:text-ink'
            }`}
          >
            <Eye size={13} />
            Partículas
          </button>
        </div>
      </div>
    </div>
  );
}
