import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural Academic Document Texture
 * Generates a scientific manuscript preview on a 2D canvas texture
 */
function createDocumentTexture(type = 'main') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 724; // Standard A4 ratio
  const ctx = canvas.getContext('2d');

  // Deep academic dark slate background
  ctx.fillStyle = '#0b1329';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle outer border with academic accent
  ctx.strokeStyle = '#1e3a8a';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

  // Header banner / badge
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(32, 32, 140, 24);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 11px monospace';
  ctx.fillText(type === 'secondary' ? 'INDEXED SCOPUS/SCI' : 'PEER-REVIEWED', 40, 48);

  // DOI / Citation tag placeholder
  ctx.fillStyle = '#64748b';
  ctx.font = '10px monospace';
  ctx.fillText('ISSN 2740-912X • VOL. 48', 200, 48);

  // Title lines
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(32, 75, 380, 16);
  ctx.fillRect(32, 100, 260, 14);

  // Author line
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(32, 130, 210, 8);

  // Divider rule
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(32, 155);
  ctx.lineTo(480, 155);
  ctx.stroke();

  // Abstract block
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(32, 175, 448, 75);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 11px sans-serif';
  ctx.fillText('ABSTRACT', 44, 195);
  
  // Abstract text lines
  ctx.fillStyle = '#cbd5e1';
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(44, 210 + i * 14, 420 - (i === 2 ? 80 : 0), 6);
  }

  // Two-column text content
  const colWidth = 210;
  const colGap = 28;
  const col1Left = 32;
  const col2Left = col1Left + colWidth + colGap;

  // Section 1: Introduction
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(col1Left, 275, 80, 8);
  ctx.fillRect(col2Left, 275, 80, 8);

  // Column 1 text lines
  ctx.fillStyle = '#475569';
  for (let row = 0; row < 18; row++) {
    const lineWidth = (row % 5 === 4) ? colWidth - 40 : colWidth;
    ctx.fillRect(col1Left, 295 + row * 15, lineWidth, 5);
  }

  // Column 2 chart / diagram box
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(col2Left, 295, colWidth, 90);
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1;
  ctx.strokeRect(col2Left, 295, colWidth, 90);
  // Grid lines inside chart
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
  for (let g = 1; g < 4; g++) {
    ctx.beginPath();
    ctx.moveTo(col2Left, 295 + g * 22);
    ctx.lineTo(col2Left + colWidth, 295 + g * 22);
    ctx.stroke();
  }

  // Column 2 remaining text lines
  for (let row = 0; row < 10; row++) {
    const lineWidth = (row % 4 === 3) ? colWidth - 50 : colWidth;
    ctx.fillRect(col2Left, 405 + row * 15, lineWidth, 5);
  }

  // References header & lines at bottom
  ctx.fillStyle = '#64748b';
  ctx.fillRect(col1Left, 580, 60, 6);
  for (let r = 0; r < 4; r++) {
    ctx.fillStyle = '#334155';
    ctx.fillRect(col1Left, 595 + r * 14, colWidth + colGap + colWidth, 5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

/**
 * Floating 3D Research Document Component
 */
function FloatingPaper({ position, rotation, scale = 1, texture, speed = 1, delay = 0, glowColor = "#38bdf8" }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed + delay;
    
    // Smooth scientific hovering
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.16;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.5) * 0.09;
    meshRef.current.rotation.x = rotation[0] + Math.sin(t * 0.6) * 0.04;
    meshRef.current.rotation.y = rotation[1] + Math.cos(t * 0.7) * 0.06;
    meshRef.current.rotation.z = rotation[2] + Math.sin(t * 0.4) * 0.03;
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Front paper sheet */}
      <mesh castShadow receiveShadow>
        <planeGeometry args={[2.1, 2.97]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.35}
          metalness={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle edge glowing border */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.13, 3.0)]} />
        <lineBasicMaterial color={glowColor} transparent opacity={0.55} />
      </lineSegments>

      {/* Soft back depth plate */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[2.15, 3.02]} />
        <meshBasicMaterial color="#020714" transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

/**
 * Scientific Particles & Network Nodes
 */
function ScientificNodes({ count = 38 }) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const [particles, connections] = useMemo(() => {
    const coords = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 9;
      const z = (Math.random() - 0.5) * 6 - 0.5;
      coords.push(x, y, z);
    }

    // Connect nodes that are within scientific proximity
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
      {/* Network points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          color="#38bdf8"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length / 3}
            array={connections}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.28} />
      </lineSegments>
    </group>
  );
}

/**
 * Abstract Orbital Geometry (Scientific coordinate rings)
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
      {/* Outer subtle orbital ring */}
      <mesh>
        <ringGeometry args={[3.2, 3.23, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Middle orbital ring */}
      <mesh>
        <ringGeometry args={[2.3, 2.32, 48]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner tilted orbital coordinate ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[1.6, 1.615, 36]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/**
 * Main 3D Scene Composition
 */
function SceneComposition({ isMobile }) {
  const mainDocTexture = useMemo(() => createDocumentTexture('main'), []);
  const secondaryDocTexture = useMemo(() => createDocumentTexture('secondary'), []);

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[6, 9, 6]} intensity={1.3} color="#e0f2fe" />
      <pointLight position={[3.5, 3.5, 3]} intensity={1.1} color="#38bdf8" />
      <pointLight position={[-4, -3, 2]} intensity={1.0} color="#818cf8" />
      <pointLight position={[0, 4.5, 2]} intensity={0.4} color="#c7d2fe" />

      {/* Main Focus Academic Paper - Increased visual prominence */}
      <FloatingPaper
        position={isMobile ? [0, 0.1, 0] : [0.8, 0.15, 0.6]}
        rotation={[-0.1, -0.28, 0.04]}
        scale={isMobile ? 1.1 : 1.45}
        texture={mainDocTexture}
        speed={1}
        delay={0}
        glowColor="#38bdf8"
      />

      {/* Secondary supporting document (Desktop depth layering) */}
      {!isMobile && (
        <FloatingPaper
          position={[-2.1, -0.65, -0.9]}
          rotation={[0.16, 0.36, -0.09]}
          scale={1.05}
          texture={secondaryDocTexture}
          speed={0.82}
          delay={2}
          glowColor="#818cf8"
        />
      )}

      {/* Third subtle background manuscript layer for rich academic depth */}
      {!isMobile && (
        <FloatingPaper
          position={[2.4, 1.3, -1.8]}
          rotation={[-0.18, -0.42, 0.1]}
          scale={0.82}
          texture={mainDocTexture}
          speed={0.7}
          delay={4}
          glowColor="#06b6d4"
        />
      )}

      {/* Scientific node network */}
      <ScientificNodes count={isMobile ? 22 : 42} />

      {/* Subtle orbital geometry */}
      <AbstractGeometry />
    </>
  );
}

/**
 * Exported ResearchScene Container
 * Handles responsive sizing, graceful fallback, and camera management
 */
export default function ResearchScene({ className = "" }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Verify basic WebGL support
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
    // Elegant CSS-based fallback if WebGL is unavailable
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="w-72 h-96 rounded-xl border border-cyan-500/25 bg-academic-900/70 shadow-glass-edge p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono text-cyan-400">PEER-REVIEWED</span>
            <span className="text-[10px] font-mono text-slate-400">VOL. 48</span>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-700/60 rounded w-5/6"></div>
            <div className="h-3 bg-slate-800 rounded w-full"></div>
            <div className="h-3 bg-slate-800 rounded w-4/6"></div>
          </div>
          <div className="border-t border-slate-800/80 pt-3 flex justify-between items-center text-[11px] text-slate-400">
            <span>Research Manuscript</span>
            <span className="text-cyan-400">● Live</span>
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
          alpha: true,
          powerPreference: "high-performance"
        }}
        className="w-full h-full pointer-events-none"
      >
        <SceneComposition isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
