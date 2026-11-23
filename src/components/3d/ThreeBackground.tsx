import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Escena, cámara y renderizador
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080d, 0.0022);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 55);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x06080d, 0);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. RED NEURONAL PLEXUS 3D (Nodos conectados dinámicamente)
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 65 : 120;
    const maxDistance = isMobile ? 14 : 17;
    const maxConnections = isMobile ? 3 : 4;

    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities: { x: number; y: number; z: number }[] = [];

    // Colores vibrantes de la marca
    const colorLime = new THREE.Color(0xa3e635);
    const colorCyan = new THREE.Color(0x22d3ee);
    const colorViolet = new THREE.Color(0xa78bfa);

    const bounds = { x: 70, y: 45, z: 40 };

    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] = (Math.random() - 0.5) * bounds.x * 2;
      nodePositions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y * 2;
      nodePositions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: (Math.random() - 0.5) * 0.04,
        z: (Math.random() - 0.5) * 0.03,
      });
    }

    // Geometría de Nodos (Puntos brillantes)
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    // Textura circular suave para nodos
    const nodeCanvas = document.createElement('canvas');
    nodeCanvas.width = 32;
    nodeCanvas.height = 32;
    const nCtx = nodeCanvas.getContext('2d');
    if (nCtx) {
      const grad = nCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.35, 'rgba(163, 230, 53, 0.9)');
      grad.addColorStop(0.7, 'rgba(34, 211, 238, 0.4)');
      grad.addColorStop(1, 'rgba(6, 8, 13, 0)');
      nCtx.fillStyle = grad;
      nCtx.fillRect(0, 0, 32, 32);
    }
    const nodeTexture = new THREE.CanvasTexture(nodeCanvas);

    const nodeMaterial = new THREE.PointsMaterial({
      size: isMobile ? 2.2 : 2.8,
      map: nodeTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodesMesh = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodesMesh);

    // Geometría de Conexiones de Luz (Plexus Lines)
    const maxLineSegments = nodeCount * maxConnections;
    const linePositions = new Float32Array(maxLineSegments * 6); // 2 vértices por segmento * 3 componentes
    const lineColors = new Float32Array(maxLineSegments * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    lineGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // 3. TERRENO ONDULATORIO CIBERNÉTICO (Cyber Synth Wave Terrain)
    const gridCols = isMobile ? 35 : 55;
    const gridRows = isMobile ? 35 : 55;
    const gridWidth = 140;
    const gridDepth = 140;

    const terrainGeo = new THREE.PlaneGeometry(gridWidth, gridDepth, gridCols, gridRows);
    terrainGeo.rotateX(-Math.PI / 2.2);
    terrainGeo.translate(0, -22, 0);

    const terrainMat = new THREE.MeshBasicMaterial({
      color: 0xa3e635,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });

    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    scene.add(terrainMesh);

    // Posiciones originales de vértices del terreno para la ondulación senoidal
    const terrainPos = terrainGeo.attributes.position;
    const originalTerrainY = new Float32Array(terrainPos.count);
    for (let i = 0; i < terrainPos.count; i++) {
      originalTerrainY[i] = terrainPos.getY(i);
    }

    // 4. ANILLOS DE ENERGÍA DIMENSIONAL EN EL FONDO (Cosmic Rings)
    const ringsGroup = new THREE.Group();
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(26, 0.08, 16, 90),
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      })
    );
    ring1.position.set(22, 4, -28);
    ring1.rotation.x = Math.PI / 3.5;
    ringsGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(18, 0.07, 16, 70),
      new THREE.MeshBasicMaterial({
        color: 0xa78bfa,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      })
    );
    ring2.position.set(-25, 8, -25);
    ring2.rotation.y = Math.PI / 4;
    ringsGroup.add(ring2);

    scene.add(ringsGroup);

    // 5. INTERACCIÓN CON EL MOUSE & GRAVITACIÓN DE NODOS
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 6. BUCLE DE ANIMACIÓN CONTINUO
    const clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Suavizado del mouse con inercia
      mouseX += (targetMouseX - mouseX) * 0.035;
      mouseY += (targetMouseY - mouseY) * 0.035;

      if (!prefersReducedMotion) {
        // A) Actualizar posiciones de nodos y rebotar en los límites
        const pArray = nodeGeometry.attributes.position.array as Float32Array;

        for (let i = 0; i < nodeCount; i++) {
          const idx = i * 3;
          pArray[idx] += nodeVelocities[i].x;
          pArray[idx + 1] += nodeVelocities[i].y;
          pArray[idx + 2] += nodeVelocities[i].z;

          // Rebotar en los bordes
          if (Math.abs(pArray[idx]) > bounds.x) nodeVelocities[i].x *= -1;
          if (Math.abs(pArray[idx + 1]) > bounds.y) nodeVelocities[i].y *= -1;
          if (Math.abs(pArray[idx + 2]) > bounds.z) nodeVelocities[i].z *= -1;

          // Atracción gravitatoria sutil hacia el cursor en 3D
          const dx = mouseX * 25 - pArray[idx];
          const dy = mouseY * 20 - pArray[idx + 1];
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          if (distToMouse < 30 && distToMouse > 2) {
            pArray[idx] += (dx / distToMouse) * 0.02;
            pArray[idx + 1] += (dy / distToMouse) * 0.02;
          }
        }
        nodeGeometry.attributes.position.needsUpdate = true;

        // B) Calcular líneas de conexión dinámicas entre nodos cercanos (Plexus)
        let lineIdx = 0;
        let colorIdx = 0;

        for (let i = 0; i < nodeCount; i++) {
          let connections = 0;
          const x1 = pArray[i * 3];
          const y1 = pArray[i * 3 + 1];
          const z1 = pArray[i * 3 + 2];

          for (let j = i + 1; j < nodeCount; j++) {
            if (connections >= maxConnections) break;

            const x2 = pArray[j * 3];
            const y2 = pArray[j * 3 + 1];
            const z2 = pArray[j * 3 + 2];

            const dist = Math.sqrt(
              (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2)
            );

            if (dist < maxDistance) {
              const alpha = 1.0 - dist / maxDistance;

              linePositions[lineIdx++] = x1;
              linePositions[lineIdx++] = y1;
              linePositions[lineIdx++] = z1;

              linePositions[lineIdx++] = x2;
              linePositions[lineIdx++] = y2;
              linePositions[lineIdx++] = z2;

              // Alternar gradientes entre Lima y Cyan según distancia
              const nodeColor = dist < maxDistance * 0.5 ? colorLime : colorCyan;

              lineColors[colorIdx++] = nodeColor.r * alpha;
              lineColors[colorIdx++] = nodeColor.g * alpha;
              lineColors[colorIdx++] = nodeColor.b * alpha;

              lineColors[colorIdx++] = colorViolet.r * alpha;
              lineColors[colorIdx++] = colorViolet.g * alpha;
              lineColors[colorIdx++] = colorViolet.b * alpha;

              connections++;
            }
          }
        }

        // Rellenar resto del buffer con ceros
        while (lineIdx < linePositions.length) {
          linePositions[lineIdx++] = 0;
          lineColors[colorIdx++] = 0;
        }

        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.color.needsUpdate = true;

        // C) Ondulación del terreno cibernético (Wave Grid)
        for (let i = 0; i < terrainPos.count; i++) {
          const vx = terrainPos.getX(i);
          const vz = terrainPos.getZ(i);
          const wave =
            Math.sin(vx * 0.08 + time * 0.8) * 2.2 +
            Math.cos(vz * 0.08 + time * 0.6) * 2.2;
          terrainPos.setY(i, originalTerrainY[i] + wave);
        }
        terrainPos.needsUpdate = true;

        // D) Rotación de los anillos cósmicos
        ring1.rotation.z = time * 0.08;
        ring1.rotation.y = time * 0.05;
        ring2.rotation.x = time * -0.07;

        // E) Desplazamiento reactivo de cámara con Scroll y Mouse
        const scrollFactor = scrollY * 0.016;
        camera.position.y = 5 - Math.min(scrollFactor, 16) + mouseY * 2.5;
        camera.position.x = mouseX * 4;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      nodeGeometry.dispose();
      nodeMaterial.dispose();
      nodeTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      ring1.geometry.dispose();
      (ring1.material as THREE.Material).dispose();
      ring2.geometry.dispose();
      (ring2.material as THREE.Material).dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden opacity-90 transition-opacity duration-1000"
      style={{ willChange: 'transform' }}
    />
  );
}
