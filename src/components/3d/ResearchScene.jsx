import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural Academic Document Texture — High-Definition Bright Pearl Version
 * Creates a crisp, bright white/pearl research paper with deep navy text,
 * royal blue headings, and subtle lavender/blue accents.
 */
function createDocumentTexture(type = 'main') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1448; // High-res A4 ratio
  const ctx = canvas.getContext('2d');

  // ── 1. Base Paper Gradient: Bright White / Pearl with subtle cool wash ──
  const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bgGrad.addColorStop(0, '#FFFFFF');
  bgGrad.addColorStop(0.4, '#FBFDFF');
  bgGrad.addColorStop(0.85, '#F5F7FF');
  bgGrad.addColorStop(1, '#EFF2FF');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ── 2. Delicate Academic Borders ──
  // Outer subtle royal blue rule
  ctx.strokeStyle = 'rgba(41, 72, 216, 0.28)';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Inner faint violet coordinate guide
  ctx.strokeStyle = 'rgba(139, 109, 255, 0.16)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(32, 32, canvas.width - 64, canvas.height - 64);

  // ── 3. Top Header Banner & Badges ──
  // Peer-review / Indexing pill
  ctx.fillStyle = 'rgba(41, 72, 216, 0.08)';
  ctx.fillRect(64, 64, 340, 48);
  ctx.strokeStyle = 'rgba(41, 72, 216, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(64, 64, 340, 48);

  ctx.fillStyle = '#2948D8';
  ctx.font = 'bold 19px monospace';
  ctx.fillText(type === 'secondary' ? 'INDEXED SCOPUS / SCI-E' : 'PEER-REVIEWED MANUSCRIPT', 82, 95);

  // DOI / Citation metadata tag
  ctx.fillStyle = '#4C6BAD';
  ctx.font = '16px monospace';
  ctx.fillText('ISSN 2740-912X • OPEN ACCESS • VOL. 48', 430, 95);

  // ── 4. Article Title Lines (Deep Navy) ──
  ctx.fillStyle = '#0B1B4A';
  ctx.fillRect(64, 150, 780, 28);
  ctx.fillRect(64, 192, 540, 22);

  // Author & Institutional Attribution
  ctx.fillStyle = '#2948D8';
  ctx.fillRect(64, 240, 420, 14);
  ctx.fillStyle = '#7A90C3';
  ctx.fillRect(64, 264, 320, 11);

  // Section divider rule
  ctx.strokeStyle = 'rgba(41, 72, 216, 0.20)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(64, 300);
  ctx.lineTo(canvas.width - 64, 300);
  ctx.stroke();

  // ── 5. Abstract Box: Soft Lavender/Blue with Violet Border ──
  ctx.fillStyle = 'rgba(238, 242, 255, 0.85)';
  ctx.fillRect(64, 326, 896, 150);
  ctx.strokeStyle = 'rgba(139, 109, 255, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(64, 326, 896, 150);

  ctx.fillStyle = '#2948D8';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('ABSTRACT', 88, 360);

  // Abstract text lines (Deep royal/navy for sharp contrast)
  ctx.fillStyle = '#2E4D8F';
  for (let i = 0; i < 3; i++) {
    const w = i === 2 ? 680 : 848;
    ctx.fillRect(88, 382 + i * 26, w, 10);
  }

  // ── 6. Two-Column Body Layout ──
  const colWidth = 428;
  const colGap = 40;
  const col1Left = 64;
  const col2Left = col1Left + colWidth + colGap;

  // Section 1: Introduction Header
  ctx.fillStyle = '#2948D8';
  ctx.fillRect(col1Left, 520, 180, 14);
  ctx.fillRect(col2Left, 520, 190, 14);

  // Column 1 — Simulated paragraph text lines
  ctx.fillStyle = '#4C6BAD';
  for (let row = 0; row < 22; row++) {
    const lineWidth = (row % 6 === 5) ? colWidth - 80 : colWidth;
    ctx.fillRect(col1Left, 550 + row * 26, lineWidth, 8);
  }

  // Column 2 — Scientific Chart & Visual Graph Box
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.fillRect(col2Left, 550, colWidth, 180);
  ctx.strokeStyle = 'rgba(41, 72, 216, 0.40)';
  ctx.lineWidth = 2;
  ctx.strokeRect(col2Left, 550, colWidth, 180);

  // Graph interior grid lines
  ctx.strokeStyle = 'rgba(109, 140, 255, 0.22)';
  for (let g = 1; g < 4; g++) {
    ctx.beginPath();
    ctx.moveTo(col2Left, 550 + g * 45);
    ctx.lineTo(col2Left + colWidth, 550 + g * 45);
    ctx.stroke();
  }

  // Scientific data bars
  const bars = [
    { x: 30, h: 70, color: 'rgba(41, 72, 216, 0.85)' },
    { x: 100, h: 110, color: 'rgba(99, 102, 241, 0.85)' },
    { x: 170, h: 85, color: 'rgba(139, 109, 255, 0.85)' },
    { x: 240, h: 135, color: 'rgba(41, 72, 216, 0.90)' },
    { x: 310, h: 100, color: 'rgba(56, 189, 248, 0.85)' },
  ];
  for (const bar of bars) {
    ctx.fillStyle = bar.color;
    ctx.fillRect(col2Left + bar.x, 550 + 180 - bar.h - 10, 48, bar.h);
  }

  // Column 2 remaining text lines
  ctx.fillStyle = '#4C6BAD';
  for (let row = 0; row < 13; row++) {
    const lineWidth = (row % 5 === 4) ? colWidth - 90 : colWidth;
    ctx.fillRect(col2Left, 755 + row * 26, lineWidth, 8);
  }

  // ── 7. References Section at Bottom ──
  ctx.fillStyle = '#2948D8';
  ctx.fillRect(col1Left, 1140, 140, 12);
  for (let r = 0; r < 5; r++) {
    ctx.fillStyle = 'rgba(76, 107, 173, 0.75)';
    ctx.fillRect(col1Left, 1170 + r * 24, colWidth + colGap + colWidth, 7);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  // Ensure sRGB color space so Three.js renders colors without gamma-darkening
  if ('colorSpace' in texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }
  return texture;
}

/**
 * Floating 3D Research Document Component
 * Designed with a luminous pearl/white material, semi-gloss clearcoat,
 * subtle blue/violet edge illumination, and a soft cool-gray drop backing.
 */
function FloatingPaper({
  position,
  rotation,
  scale = 1,
  texture,
  speed = 1,
  delay = 0,
  glowColor = '#6D8CFF'
}) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed + delay;

    // Smooth floating hovering animation
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.16;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.5) * 0.09;
    meshRef.current.rotation.x = rotation[0] + Math.sin(t * 0.6) * 0.04;
    meshRef.current.rotation.y = rotation[1] + Math.cos(t * 0.7) * 0.06;
    meshRef.current.rotation.z = rotation[2] + Math.sin(t * 0.4) * 0.03;
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Front paper face — Bright Pearl / White with self-illuminated texture */}
      <mesh castShadow receiveShadow position={[0, 0, 0.005]}>
        <planeGeometry args={[2.1, 2.97]} />
        <meshPhysicalMaterial
          map={texture}
          color="#FFFFFF"
          emissive="#F4F6FF"
          emissiveMap={texture}
          emissiveIntensity={0.34}
          roughness={0.20}
          metalness={0.0}
          clearcoat={0.35}
          clearcoatRoughness={0.15}
          reflectivity={0.6}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Back paper face — clean bright pearl white */}
      <mesh position={[0, 0, -0.005]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.1, 2.97]} />
        <meshPhysicalMaterial
          color="#F8FAFF"
          emissive="#EEF2FF"
          emissiveIntensity={0.30}
          roughness={0.25}
          metalness={0.0}
          clearcoat={0.25}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Subtle edge glowing border */}
      <lineSegments position={[0, 0, 0.008]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.11, 2.98)]} />
        <lineBasicMaterial color={glowColor} transparent opacity={0.6} />
      </lineSegments>

      {/* Light cool gray drop-shadow backing plate for soft 3D depth */}
      <mesh position={[0.03, -0.04, -0.03]}>
        <planeGeometry args={[2.13, 3.0]} />
        <meshBasicMaterial color="#CAD5E8" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

/**
 * 3D Academic Book (hardcover with pages block and bookmark)
 */
function AcademicBook({ position, rotation, scale = 1, speed = 0.9, delay = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed + delay;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.75) * 0.13;
    meshRef.current.rotation.x = rotation[0] + Math.sin(t * 0.5) * 0.04;
    meshRef.current.rotation.y = rotation[1] + Math.cos(t * 0.6) * 0.05;
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Book Cover — Deep academic navy */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.22, 1.85]} />
        <meshStandardMaterial color="#1C3570" roughness={0.30} metalness={0.12} />
      </mesh>
      {/* Book Pages Block — Bright pearl white */}
      <mesh position={[0.04, 0, 0]}>
        <boxGeometry args={[1.28, 0.17, 1.76]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#F8FAFC"
          emissiveIntensity={0.28}
          roughness={0.4}
        />
      </mesh>
      {/* Gold Ribbon bookmark */}
      <mesh position={[0.55, -0.05, 0.4]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.04, 0.25, 0.08]} />
        <meshStandardMaterial color="#D97706" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Edge outline */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.36, 0.23, 1.86)]} />
        <lineBasicMaterial color="#6D8CFF" transparent opacity={0.45} />
      </lineSegments>
    </group>
  );
}

/**
 * 3D Graduation Cap (Mortarboard academic symbol)
 */
function GraduationCap({ position, rotation, scale = 1, speed = 0.85, delay = 2.5 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed + delay;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.14;
    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.4) * 0.08;
    meshRef.current.rotation.z = rotation[2] + Math.cos(t * 0.5) * 0.04;
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Cap Square Top (diamond orientation) */}
      <mesh rotation={[0, Math.PI / 4, 0]} castShadow>
        <boxGeometry args={[1.2, 0.04, 1.2]} />
        <meshStandardMaterial color="#0B1B4A" roughness={0.35} metalness={0.10} />
      </mesh>
      {/* Edge highlight on top */}
      <lineSegments rotation={[0, Math.PI / 4, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.21, 0.045, 1.21)]} />
        <lineBasicMaterial color="#8B6DFF" transparent opacity={0.50} />
      </lineSegments>
      {/* Skull cap underneath */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.35, 16]} />
        <meshStandardMaterial color="#0B1B4A" roughness={0.45} />
      </mesh>
      {/* Button on top */}
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Tassel */}
      <mesh position={[0.26, -0.06, 0.26]} rotation={[0.3, 0, -0.4]}>
        <cylinderGeometry args={[0.015, 0.02, 0.38, 8]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.4} />
      </mesh>
    </group>
  );
}

/**
 * Scientific Particle Network — adapted for light theme
 */
function ScientificNodes({ count = 38 }) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const [particles, connections] = useMemo(() => {
    const coords = [];
    for (let i = 0; i < count; i++) {
      coords.push(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6 - 0.5
      );
    }

    const lineCoords = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = coords[i * 3] - coords[j * 3];
        const dy = coords[i * 3 + 1] - coords[j * 3 + 1];
        const dz = coords[i * 3 + 2] - coords[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.6) {
          lineCoords.push(
            coords[i * 3], coords[i * 3 + 1], coords[i * 3 + 2],
            coords[j * 3], coords[j * 3 + 1], coords[j * 3 + 2]
          );
        }
      }
    }

    return [new Float32Array(coords), new Float32Array(lineCoords)];
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.08;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.35;
      pointsRef.current.rotation.x = t * 0.18;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.35;
      linesRef.current.rotation.x = t * 0.18;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        {/* Royal blue particles — visible against light BG */}
        <pointsMaterial size={0.065} color="#2948D8" transparent opacity={0.70} sizeAttenuation />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#8B6DFF" transparent opacity={0.22} />
      </lineSegments>
    </group>
  );
}

/**
 * Abstract Orbital Geometry — soft on light background
 */
function AbstractGeometry() {
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    ringRef.current.rotation.z = t * 0.06;
    ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.2) * 0.06;
  });

  return (
    <group ref={ringRef} position={[1.2, 0.1, -1.2]}>
      {/* Outer ring */}
      <mesh>
        <ringGeometry args={[3.2, 3.23, 64]} />
        <meshBasicMaterial color="#2948D8" transparent opacity={0.20} side={THREE.DoubleSide} />
      </mesh>

      {/* Middle ring */}
      <mesh>
        <ringGeometry args={[2.3, 2.32, 48]} />
        <meshBasicMaterial color="#8B6DFF" transparent opacity={0.16} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner tilted ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[1.6, 1.615, 36]} />
        <meshBasicMaterial color="#6D8CFF" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/**
 * Main Scene Composition with Studio Lighting & Internal Mouse Parallax
 */
function SceneComposition({ isMobile }) {
  const mainDocTexture = useMemo(() => createDocumentTexture('main'), []);
  const secondaryDocTexture = useMemo(() => createDocumentTexture('secondary'), []);
  const interactiveGroupRef = useRef();

  useFrame((state) => {
    if (!interactiveGroupRef.current || isMobile) return;
    // Pointer is normalized (-1 to 1) in Three.js Canvas
    interactiveGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      interactiveGroupRef.current.rotation.y,
      state.pointer.x * 0.12,
      0.04
    );
    interactiveGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      interactiveGroupRef.current.rotation.x,
      -state.pointer.y * 0.08,
      0.04
    );
  });

  return (
    <group ref={interactiveGroupRef}>
      {/* ── Brighter Studio Lighting Setup ── */}
      {/* 1. Pure bright white ambient light ensures papers never darken */}
      <ambientLight intensity={1.3} color="#FFFFFF" />

      {/* 2. Soft hemisphere light: pure white sky, delicate cool-lavender ground bounce */}
      <hemisphereLight
        skyColor="#FFFFFF"
        groundColor="#E2E8F8"
        intensity={1.1}
      />

      {/* 3. Primary Front Studio Key Light (direct frontal illumination on papers) */}
      <directionalLight
        position={[0.5, 3.5, 6.5]}
        intensity={1.6}
        color="#FFFFFF"
      />

      {/* 4. Secondary Soft Daylight Fill Light (soft upper-left) */}
      <directionalLight
        position={[-4.5, 4.0, 3.5]}
        intensity={0.9}
        color="#F0F4FF"
      />

      {/* 5. Soft Blue Accent / Specular Rim Light */}
      <pointLight
        position={[4.0, 2.5, 3.0]}
        intensity={0.85}
        color="#6D8CFF"
        distance={15}
      />

      {/* 6. Subtle Violet Rim Light (gives signature futuristic academic sheen) */}
      <pointLight
        position={[-3.5, -2.0, 2.5]}
        intensity={0.7}
        color="#A78BFA"
        distance={12}
      />

      {/* 7. Top Daylight Glint */}
      <pointLight
        position={[0.5, 5.0, 2.5]}
        intensity={0.65}
        color="#E0E7FF"
        distance={10}
      />

      {/* Main Focus Academic Paper — Luminous Pearl White */}
      <FloatingPaper
        position={isMobile ? [0, 0.1, 0] : [0.75, 0.2, 0.6]}
        rotation={[-0.1, -0.28, 0.04]}
        scale={isMobile ? 1.1 : 1.4}
        texture={mainDocTexture}
        speed={1}
        delay={0}
        glowColor="#6D8CFF"
      />

      {/* Secondary supporting document (Desktop depth layering) */}
      {!isMobile && (
        <FloatingPaper
          position={[-1.9, -0.5, -0.8]}
          rotation={[0.16, 0.36, -0.09]}
          scale={1.0}
          texture={secondaryDocTexture}
          speed={0.82}
          delay={2}
          glowColor="#8B6DFF"
        />
      )}

      {/* Academic Book (hardcover with bookmark) */}
      {!isMobile && (
        <AcademicBook
          position={[-0.8, -1.8, 0.4]}
          rotation={[0.3, 0.5, -0.15]}
          scale={0.95}
          speed={0.9}
          delay={1}
        />
      )}

      {/* Graduation Cap (academic symbol) */}
      {!isMobile && (
        <GraduationCap
          position={[-1.8, 1.8, -0.7]}
          rotation={[0.2, -0.3, 0.15]}
          scale={0.88}
          speed={0.85}
          delay={2.5}
        />
      )}

      {/* Third background manuscript layer for rich academic depth */}
      {!isMobile && (
        <FloatingPaper
          position={[2.3, 1.4, -1.8]}
          rotation={[-0.18, -0.42, 0.1]}
          scale={0.8}
          texture={mainDocTexture}
          speed={0.7}
          delay={4}
          glowColor="#6D8CFF"
        />
      )}

      {/* Scientific node network */}
      <ScientificNodes count={isMobile ? 20 : 38} />

      {/* Orbital geometry */}
      <AbstractGeometry />
    </group>
  );
}

/**
 * Exported ResearchScene Container
 */
export default function ResearchScene({ className = '' }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!hasWebGL) {
    // Light-theme CSS fallback
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="w-72 h-96 rounded-xl border border-royalBlue-500/20 bg-white/90 shadow-card-light p-6 flex flex-col justify-between backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-navy-100 pb-3">
            <span className="text-xs font-mono text-royalBlue-500">PEER-REVIEWED</span>
            <span className="text-[10px] font-mono text-navy-400">VOL. 48</span>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-navy-100 rounded w-5/6" />
            <div className="h-3 bg-navy-50 rounded w-full" />
            <div className="h-3 bg-navy-50 rounded w-4/6" />
          </div>
          <div className="border-t border-navy-100 pt-3 flex justify-between items-center text-[11px] text-navy-400">
            <span>Research Manuscript</span>
            <span className="text-royalBlue-500">● Live</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: isMobile ? 54 : 44 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,      // transparent canvas — scene floats over hero glow
          powerPreference: 'high-performance',
        }}
        className="w-full h-full pointer-events-none"
      >
        <SceneComposition isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
