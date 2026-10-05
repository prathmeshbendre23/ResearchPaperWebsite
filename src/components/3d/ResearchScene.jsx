import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Shared geometry cache (avoids recreation per render) ─────────────────────
const PLANE_GEO = new THREE.PlaneGeometry(2.1, 2.97);
const PLANE_SHADOW = new THREE.PlaneGeometry(2.4, 3.3);
const BOX_GEO_BOOK = new THREE.BoxGeometry(1.35, 0.22, 1.85);
const BOX_GEO_PAGES = new THREE.BoxGeometry(1.28, 0.17, 1.76);

// ─────────────────────────────────────────────────────────────────────────────
//  DOCUMENT TEXTURE GENERATOR
//  Pearl white, academic layout, blue/lavender accents
// ─────────────────────────────────────────────────────────────────────────────
function createDocumentTexture(type = 'main') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1448;
  const ctx = canvas.getContext('2d');

  // Base gradient — bright pearl white with very subtle cool tint
  const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bgGrad.addColorStop(0, '#FFFFFF');
  bgGrad.addColorStop(0.35, '#FAFCFF');
  bgGrad.addColorStop(0.72, '#F6F9FF');
  bgGrad.addColorStop(1, '#EFF3FF');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft ambient light overlay from top-left (matches 3D lighting)
  const lightOverlay = ctx.createRadialGradient(
    canvas.width * 0.2, canvas.height * 0.1, 0,
    canvas.width * 0.2, canvas.height * 0.1, canvas.width * 1.1
  );
  lightOverlay.addColorStop(0, 'rgba(200, 215, 255, 0.22)');
  lightOverlay.addColorStop(0.5, 'rgba(180, 200, 255, 0.06)');
  lightOverlay.addColorStop(1, 'transparent');
  ctx.fillStyle = lightOverlay;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer border — subtle royal blue
  ctx.strokeStyle = 'rgba(41, 72, 216, 0.22)';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

  // Inner guide — lavender
  ctx.strokeStyle = 'rgba(139, 109, 255, 0.12)';
  ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

  // Header label pill
  ctx.fillStyle = 'rgba(41, 72, 216, 0.06)';
  ctx.fillRect(64, 62, 340, 44);
  ctx.strokeStyle = 'rgba(41, 72, 216, 0.20)';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(64, 62, 340, 44);

  ctx.fillStyle = '#2948D8';
  ctx.font = 'bold 16px monospace';
  ctx.fillText(type === 'secondary' ? 'INDEXED SCOPUS / SCI-E' : 'PEER-REVIEWED MANUSCRIPT', 82, 90);

  ctx.fillStyle = '#4C6BAD';
  ctx.font = '13px monospace';
  ctx.fillText('ISSN 2740-912X · OPEN ACCESS · VOL. 48', 430, 90);

  // Title bars — navy
  ctx.fillStyle = '#0B1B4A';
  ctx.fillRect(64, 145, 790, 24);
  ctx.fillRect(64, 183, 550, 18);

  // Author / affiliation
  ctx.fillStyle = '#2948D8';
  ctx.fillRect(64, 227, 420, 12);
  ctx.fillStyle = '#7A90C3';
  ctx.fillRect(64, 248, 320, 9);

  // Divider
  ctx.strokeStyle = 'rgba(41, 72, 216, 0.16)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(64, 280);
  ctx.lineTo(canvas.width - 64, 280);
  ctx.stroke();

  // Abstract block
  ctx.fillStyle = 'rgba(238, 243, 255, 0.82)';
  ctx.fillRect(64, 304, 896, 142);
  ctx.strokeStyle = 'rgba(139, 109, 255, 0.28)';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(64, 304, 896, 142);

  ctx.fillStyle = '#2948D8';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('ABSTRACT', 88, 335);

  ctx.fillStyle = '#2E4D8F';
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(88, 358 + i * 25, i === 2 ? 660 : 840, 8);
  }

  // Two-column body
  const colW = 428;
  const gap = 40;
  const col1 = 64;
  const col2 = col1 + colW + gap;

  // Section headings
  ctx.fillStyle = '#2948D8';
  ctx.fillRect(col1, 497, 180, 12);
  ctx.fillRect(col2, 497, 190, 12);

  // Col 1 body text lines
  ctx.fillStyle = '#4C6BAD';
  for (let row = 0; row < 22; row++) {
    ctx.fillRect(col1, 524 + row * 24, row % 6 === 5 ? colW - 80 : colW, 7);
  }

  // Chart in col 2
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.fillRect(col2, 524, colW, 168);
  ctx.strokeStyle = 'rgba(41, 72, 216, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(col2, 524, colW, 168);

  // Chart grid lines
  ctx.strokeStyle = 'rgba(109, 140, 255, 0.18)';
  for (let g = 1; g < 4; g++) {
    ctx.beginPath();
    ctx.moveTo(col2, 524 + g * 42);
    ctx.lineTo(col2 + colW, 524 + g * 42);
    ctx.stroke();
  }

  // Chart bars
  const bars = [
    { x: 28, h: 68, color: 'rgba(41,  72, 216, 0.80)' },
    { x: 98, h: 105, color: 'rgba(99,  102, 241, 0.80)' },
    { x: 168, h: 80, color: 'rgba(139, 109, 255, 0.80)' },
    { x: 238, h: 128, color: 'rgba(41,  72,  216, 0.86)' },
    { x: 308, h: 95, color: 'rgba(56,  189, 248, 0.80)' },
  ];
  for (const bar of bars) {
    ctx.fillStyle = bar.color;
    ctx.fillRect(col2 + bar.x, 524 + 168 - bar.h - 7, 44, bar.h);
  }

  // Col 2 lower text
  ctx.fillStyle = '#4C6BAD';
  for (let row = 0; row < 12; row++) {
    ctx.fillRect(col2, 712 + row * 24, row % 5 === 4 ? colW - 90 : colW, 7);
  }

  // References section
  ctx.fillStyle = '#2948D8';
  ctx.fillRect(col1, 1108, 135, 10);
  ctx.fillStyle = 'rgba(76, 107, 173, 0.70)';
  for (let r = 0; r < 5; r++) {
    ctx.fillRect(col1, 1134 + r * 23, colW + gap + colW, 6);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  if ('colorSpace' in texture) texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// ─────────────────────────────────────────────────────────────────────────────
//  FLOATING PAPER
//  Elegant A4-ratio document with pearl material and edge highlights.
//  Each instance has fully independent timing (delay + speed).
// ─────────────────────────────────────────────────────────────────────────────
function FloatingPaper({
  position,
  rotation,
  scale = 1,
  texture,
  speed = 1,
  delay = 0,
  glowColor = '#6D8CFF',
  shadowOpacity = 0.14,
}) {
  const groupRef = useRef();
  const basePos = useRef(position);
  const baseRot = useRef(rotation);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() * speed + delay;

    // Organic multi-axis floating — each axis at different frequency
    groupRef.current.position.y =
      basePos.current[1] + Math.sin(t * 0.50) * 0.15 + Math.cos(t * 0.31) * 0.05;
    groupRef.current.position.x =
      basePos.current[0] + Math.cos(t * 0.34) * 0.07 + Math.sin(t * 0.22) * 0.03;

    // Very gentle rotation drift — feels like floating in air
    groupRef.current.rotation.x =
      baseRot.current[0] + Math.sin(t * 0.38) * 0.028;
    groupRef.current.rotation.y =
      baseRot.current[1] + Math.cos(t * 0.45) * 0.038;
    groupRef.current.rotation.z =
      baseRot.current[2] + Math.sin(t * 0.27) * 0.016;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>

      {/* === CONTACT SHADOW — soft, diffused, low opacity === */}
      <mesh position={[0.06, -0.08, -0.06]} rotation={[0, 0, 0]}>
        <planeGeometry args={[2.5, 3.4]} />
        <meshBasicMaterial
          color="#8FA0C8"
          transparent
          opacity={shadowOpacity}
          depthWrite={false}
        />
      </mesh>

      {/* === FRONT FACE — pearl white with texture === */}
      <mesh castShadow receiveShadow position={[0, 0, 0.004]}>
        <planeGeometry args={[2.1, 2.97]} />
        <meshPhysicalMaterial
          map={texture}
          color="#FFFFFF"
          emissive="#F2F6FF"
          emissiveMap={texture}
          emissiveIntensity={0.22}
          roughness={0.26}
          metalness={0.0}
          clearcoat={0.35}
          clearcoatRoughness={0.12}
          reflectivity={0.50}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* === BACK FACE — pearl === */}
      <mesh position={[0, 0, -0.004]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.1, 2.97]} />
        <meshPhysicalMaterial
          color="#F5F8FF"
          emissive="#EDF1FF"
          emissiveIntensity={0.20}
          roughness={0.30}
          metalness={0.0}
          clearcoat={0.18}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* === EDGE HIGHLIGHT — cool blue rim === */}
      <lineSegments position={[0, 0, 0.006]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.11, 2.98)]} />
        <lineBasicMaterial color={glowColor} transparent opacity={0.42} />
      </lineSegments>

      {/* === SECONDARY EDGE — lavender, very faint === */}
      <lineSegments position={[0, 0, -0.006]} rotation={[0, Math.PI, 0]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(2.11, 2.98)]} />
        <lineBasicMaterial color="#A78BFA" transparent opacity={0.22} />
      </lineSegments>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  STACKED BOOKS — premium academic look with depth shadow
// ─────────────────────────────────────────────────────────────────────────────
function StackedBooks({ position, rotation, scale = 1, speed = 0.65, delay = 1.2 }) {
  const groupRef = useRef();
  const basePos = useRef(position);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() * speed + delay;
    groupRef.current.position.y = basePos.current[1] + Math.sin(t * 0.44) * 0.10;
    groupRef.current.rotation.y = rotation[1] + Math.cos(t * 0.38) * 0.04;
    groupRef.current.rotation.x = rotation[0] + Math.sin(t * 0.30) * 0.025;
  });

  // Book color palette — navy/blue family
  const bookColors = ['#1C3570', '#2948D8', '#1E3A8A'];

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Contact shadow */}
      <mesh position={[0.04, -0.42, -0.06]}>
        <planeGeometry args={[2.0, 1.0]} />
        <meshBasicMaterial color="#8AA0C8" transparent opacity={0.12} depthWrite={false} />
      </mesh>

      {/* 3 stacked books — each slightly offset */}
      {[0, 1, 2].map((i) => (
        <group key={i} position={[i * 0.03, i * 0.22, i * -0.01]}>
          {/* Book cover */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.42, 0.20, 1.90]} />
            <meshStandardMaterial
              color={bookColors[i]}
              roughness={0.30}
              metalness={0.08}
            />
          </mesh>
          {/* Pages block */}
          <mesh position={[0.04, 0, 0]}>
            <boxGeometry args={[1.34, 0.16, 1.80]} />
            <meshStandardMaterial
              color="#FAFBFF"
              emissive="#F0F4FF"
              emissiveIntensity={0.18}
              roughness={0.44}
            />
          </mesh>
          {/* Edge lines */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.43, 0.21, 1.91)]} />
            <lineBasicMaterial color="#6D8CFF" transparent opacity={0.32} />
          </lineSegments>
        </group>
      ))}

      {/* Bookmark ribbon on top book */}
      <mesh position={[0.58, 0.50, 0.42]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.045, 0.26, 0.07]} />
        <meshStandardMaterial color="#D97706" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  FLOATING PEN — subtle academic detail
// ─────────────────────────────────────────────────────────────────────────────
function FloatingPen({ position, rotation, scale = 1, speed = 0.72, delay = 3.4 }) {
  const groupRef = useRef();
  const basePos = useRef(position);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() * speed + delay;
    groupRef.current.position.y = basePos.current[1] + Math.sin(t * 0.46) * 0.10;
    groupRef.current.position.x = basePos.current[0] + Math.cos(t * 0.28) * 0.05;
    groupRef.current.rotation.z = rotation[2] + Math.sin(t * 0.22) * 0.04;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Pen barrel */}
      <mesh castShadow>
        <cylinderGeometry args={[0.055, 0.055, 2.2, 20]} />
        <meshPhysicalMaterial
          color="#E8EDFF"
          emissive="#C8D8FF"
          emissiveIntensity={0.18}
          roughness={0.18}
          metalness={0.12}
          clearcoat={0.60}
          clearcoatRoughness={0.08}
        />
      </mesh>
      {/* Pen tip */}
      <mesh position={[0, -1.18, 0]}>
        <coneGeometry args={[0.055, 0.24, 20]} />
        <meshStandardMaterial color="#9B6DFF" metalness={0.4} roughness={0.25} />
      </mesh>
      {/* Pen cap area */}
      <mesh position={[0, 1.08, 0]}>
        <cylinderGeometry args={[0.062, 0.062, 0.14, 20]} />
        <meshStandardMaterial color="#2948D8" metalness={0.5} roughness={0.22} />
      </mesh>
      {/* Edge highlight */}
      <lineSegments>
        <edgesGeometry args={[new THREE.CylinderGeometry(0.056, 0.056, 2.21, 12)]} />
        <lineBasicMaterial color="#8B6DFF" transparent opacity={0.28} />
      </lineSegments>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  FLOATING SPHERE — decorative pearl sphere
// ─────────────────────────────────────────────────────────────────────────────
function FloatingSphere({ position, scale = 0.22, speed = 0.55, delay = 0, color = '#E8EDFF' }) {
  const meshRef = useRef();
  const basePos = useRef(position);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed + delay;
    meshRef.current.position.y = basePos.current[1] + Math.sin(t * 0.52) * 0.12;
    meshRef.current.position.x = basePos.current[0] + Math.cos(t * 0.36) * 0.06;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} castShadow>
      <sphereGeometry args={[1, 28, 28]} />
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.08}
        roughness={0.10}
        metalness={0.05}
        clearcoat={0.85}
        clearcoatRoughness={0.04}
        reflectivity={0.70}
        transparent
        opacity={0.88}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  GRADUATION CAP
// ─────────────────────────────────────────────────────────────────────────────
function GraduationCap({ position, rotation, scale = 1, speed = 0.62, delay = 2.6 }) {
  const groupRef = useRef();
  const basePos = useRef(position);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() * speed + delay;
    groupRef.current.position.y = basePos.current[1] + Math.sin(t * 0.44) * 0.11;
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.26) * 0.07;
    groupRef.current.rotation.z = rotation[2] + Math.cos(t * 0.32) * 0.025;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Board */}
      <mesh rotation={[0, Math.PI / 4, 0]} castShadow>
        <boxGeometry args={[1.25, 0.04, 1.25]} />
        <meshStandardMaterial color="#0B1B4A" roughness={0.32} metalness={0.10} />
      </mesh>
      <lineSegments rotation={[0, Math.PI / 4, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.26, 0.05, 1.26)]} />
        <lineBasicMaterial color="#8B6DFF" transparent opacity={0.40} />
      </lineSegments>
      {/* Cap body */}
      <mesh position={[0, -0.20, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.32, 18]} />
        <meshStandardMaterial color="#0B1B4A" roughness={0.44} />
      </mesh>
      {/* Tassel button */}
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.065, 14, 14]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.62} roughness={0.18} />
      </mesh>
      {/* Tassel string */}
      <mesh position={[0.25, -0.06, 0.25]} rotation={[0.3, 0, -0.4]}>
        <cylinderGeometry args={[0.014, 0.018, 0.38, 10]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.40} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  SCIENTIFIC NODE NETWORK
//  Much reduced and softened — acts as background texture only
// ─────────────────────────────────────────────────────────────────────────────
function ScientificNodes({ count = 24 }) {
  const pointsRef = useRef();
  const linesRef = useRef();

  const [particles, connections] = useMemo(() => {
    const coords = [];
    for (let i = 0; i < count; i++) {
      coords.push(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 4 - 2   // pushed further back
      );
    }
    const lineCoords = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = coords[i * 3] - coords[j * 3];
        const dy = coords[i * 3 + 1] - coords[j * 3 + 1];
        const dz = coords[i * 3 + 2] - coords[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.2) {
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
    const t = state.clock.getElapsedTime() * 0.045; // very slow
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.22;
      pointsRef.current.rotation.x = t * 0.10;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.22;
      linesRef.current.rotation.x = t * 0.10;
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
        {/* Very small, low opacity — supporting depth only */}
        <pointsMaterial size={0.042} color="#2948D8" transparent opacity={0.40} sizeAttenuation />
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
        {/* Extremely faint — should not dominate */}
        <lineBasicMaterial color="#8B6DFF" transparent opacity={0.10} />
      </lineSegments>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ORBITAL RINGS — thin, elegant, deep background
// ─────────────────────────────────────────────────────────────────────────────
function OrbitalRings() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = groupRef.current._t = (groupRef.current._t || 0) + 0.00035; // very slow
    const elapsed = state.clock.getElapsedTime();
    groupRef.current.rotation.z = elapsed * 0.030;
    groupRef.current.rotation.x = Math.PI / 3.5 + Math.sin(elapsed * 0.12) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0.8, 0.2, -2.2]}>
      {/* Outer ring — thin, blue */}
      <mesh>
        <ringGeometry args={[3.2, 3.22, 80]} />
        <meshBasicMaterial color="#2948D8" transparent opacity={0.10} side={THREE.DoubleSide} />
      </mesh>
      {/* Mid ring — lavender */}
      <mesh>
        <ringGeometry args={[2.3, 2.315, 64]} />
        <meshBasicMaterial color="#8B6DFF" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      {/* Inner tilted ring — ice blue */}
      <mesh rotation={[Math.PI / 4.5, 0, 0]}>
        <ringGeometry args={[1.5, 1.512, 48]} />
        <meshBasicMaterial color="#6D8CFF" transparent opacity={0.10} side={THREE.DoubleSide} />
      </mesh>
      {/* Tiny accent ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <ringGeometry args={[0.9, 0.908, 36]} />
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.09} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ATMOSPHERIC GLOW PLANE
//  Large translucent plane behind the composition to simulate volumetric glow
// ─────────────────────────────────────────────────────────────────────────────
function AtmosphericGlow() {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Very slow breathing pulse
    meshRef.current.material.opacity = 0.28 + Math.sin(t * 0.18) * 0.06;
  });
  return (
    <mesh ref={meshRef} position={[0.5, 0.2, -1.0]}>
      <planeGeometry args={[12, 8]} />
      <meshBasicMaterial color="#A8BFFF" transparent opacity={0.28} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  SCENE COMPOSITION
//  Three clear depth layers with independent motion phases
// ─────────────────────────────────────────────────────────────────────────────
function SceneComposition({ isMobile }) {
  const mainDocTexture = useMemo(() => createDocumentTexture('main'), []);
  const secondaryDocTexture = useMemo(() => createDocumentTexture('secondary'), []);
  const interactiveGroupRef = useRef();

  // Smooth mouse-parallax on main composition group
  useFrame((state) => {
    if (!interactiveGroupRef.current || isMobile) return;
    interactiveGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      interactiveGroupRef.current.rotation.y,
      state.pointer.x * 0.07,
      0.025
    );
    interactiveGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      interactiveGroupRef.current.rotation.x,
      -state.pointer.y * 0.05,
      0.025
    );
  });

  // ── MOBILE — lightweight single paper ──────────────────────────────────────
  if (isMobile) {
    return (
      <>
        {/* Warm, bright studio lighting */}
        <ambientLight intensity={1.6} color="#FFFFFF" />
        <hemisphereLight skyColor="#FFFFFF" groundColor="#E0E8F8" intensity={1.1} />
        <directionalLight position={[0, 3, 5]} intensity={1.6} color="#FFFFFF" />
        <pointLight position={[3, 2, 3]} intensity={0.65} color="#6D8CFF" distance={12} />

        <FloatingPaper
          position={[0, 0, 0]}
          rotation={[-0.08, -0.20, 0.03]}
          scale={0.90}
          texture={mainDocTexture}
          speed={0.75}
          delay={0}
          glowColor="#6D8CFF"
          shadowOpacity={0.10}
        />
        <ScientificNodes count={10} />
      </>
    );
  }

  // ── DESKTOP — full premium composition ────────────────────────────────────
  return (
    <group ref={interactiveGroupRef}>

      {/*
        STUDIO LIGHTING SYSTEM
        ─────────────────────
        Key light:    white directional from upper-right → main illumination
        Fill light:   soft blue from upper-left → secondary fill
        Rim light:    cool white from behind → edge definition
        Blue accent:  point light → blue glow on objects
        Lavender:     point light → lavender/violet accent
        Top white:    soft overhead → even coverage
      */}
      <ambientLight intensity={1.20} color="#FFFFFF" />
      <hemisphereLight skyColor="#F0F4FF" groundColor="#E2E8F8" intensity={1.00} />

      {/* Key light — slightly warm white from upper-right */}
      <directionalLight
        position={[2.5, 4.0, 6.0]}
        intensity={1.55}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-far={20}
        shadow-camera-near={0.1}
      />
      {/* Fill light — soft blue-white from upper-left */}
      <directionalLight position={[-4.0, 3.5, 3.5]} intensity={0.78} color="#EEF3FF" />

      {/* Rim light — from behind, cool */}
      <directionalLight position={[0.5, 0.5, -4.0]} intensity={0.30} color="#C8D8FF" />

      {/* Blue accent point light — near main document */}
      <pointLight position={[3.8, 2.2, 2.8]} intensity={0.70} color="#6D8CFF" distance={14} />

      {/* Lavender accent — from lower-left */}
      <pointLight position={[-3.2, -1.8, 2.0]} intensity={0.55} color="#A78BFA" distance={11} />

      {/* Soft top-white fill */}
      <pointLight position={[0, 5.5, 2.0]} intensity={0.50} color="#E8F0FF" distance={12} />

      {/*
        DEPTH LAYERS
        ════════════
        [BACKGROUND  z ≤ -2.0] — nodes, orbitals, atmospheric glow, bg paper
        [MIDGROUND   z ≈ -0.8] — secondary paper, books, cap, pen, spheres
        [FOREGROUND  z ≈  0.5] — primary paper (hero focal point)
      */}

      {/* ── BACKGROUND LAYER ────────────────────────────────────────────── */}
      {/* Atmospheric glow plane — very soft, breathing */}
      <AtmosphericGlow />

      {/* Orbital rings — thinnest, deepest */}
      <OrbitalRings />

      {/* Scientific node network — very subtle background texture */}
      <ScientificNodes count={24} />

      {/* Background manuscript — small, low opacity, large phase offset */}
      <FloatingPaper
        position={[2.4, 1.3, -2.4]}
        rotation={[-0.14, -0.40, 0.09]}
        scale={0.56}
        texture={mainDocTexture}
        speed={0.48}
        delay={4.8}
        glowColor="#6D8CFF"
        shadowOpacity={0.08}
      />

      {/* Decorative pearl spheres — background depth elements */}
      <FloatingSphere position={[3.2, 1.6, -2.0]} scale={0.28} speed={0.42} delay={1.5} color="#E8EDFF" />
      <FloatingSphere position={[-2.8, 2.0, -2.8]} scale={0.18} speed={0.38} delay={3.2} color="#DDE4FF" />

      {/* ── MIDGROUND LAYER ─────────────────────────────────────────────── */}
      {/* Secondary document — left, behind main */}
      <FloatingPaper
        position={[-1.75, -0.25, -0.85]}
        rotation={[0.12, 0.34, -0.08]}
        scale={0.78}
        texture={secondaryDocTexture}
        speed={0.62}
        delay={2.3}
        glowColor="#8B6DFF"
        shadowOpacity={0.11}
      />

      {/* Stacked books — bottom-left midground */}
      <StackedBooks
        position={[-0.55, -2.05, -0.35]}
        rotation={[0.22, 0.50, -0.10]}
        scale={0.82}
        speed={0.66}
        delay={1.0}
      />

      {/* Graduation cap — upper-left midground */}
      <GraduationCap
        position={[-2.2, 1.85, -0.90]}
        rotation={[0.16, -0.28, 0.10]}
        scale={0.76}
        speed={0.58}
        delay={2.8}
      />

      {/* Floating pen — lower-right midground */}
      <FloatingPen
        position={[2.0, -1.0, -0.55]}
        rotation={[0, 0, -1.10]}
        scale={0.88}
        speed={0.68}
        delay={3.6}
      />

      {/* Pearl spheres — midground */}
      <FloatingSphere position={[2.8, -0.8, -0.5]} scale={0.20} speed={0.52} delay={0.8} color="#EBF0FF" />
      <FloatingSphere position={[-1.0, 2.2, -1.0]} scale={0.14} speed={0.44} delay={5.2} color="#E0E8FF" />

      {/* ── FOREGROUND LAYER — Primary hero document ─────────────────────── */}
      <FloatingPaper
        position={[0.70, 0.28, 0.55]}
        rotation={[-0.08, -0.22, 0.03]}
        scale={1.20}
        texture={mainDocTexture}
        speed={0.78}
        delay={0}
        glowColor="#6D8CFF"
        shadowOpacity={0.16}
      />

    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  EXPORTED COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ResearchScene({ className = '' }) {
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    // WebGL capability check
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch { setHasWebGL(false); }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // WebGL fallback — static card
  if (!hasWebGL) {
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
        camera={{
          position: [0, 0, 7.0],
          fov: isMobile ? 52 : 40,
        }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 1.5)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        shadows="soft"
        className="w-full h-full pointer-events-none"
      >
        <SceneComposition isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
