'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  Text, 
  Points, 
  PointMaterial, 
  Line, 
  Box, 
  useGLTF,
  ScrollControls,
  useScroll,
  PerspectiveCamera,
  useTexture,
  Sphere
} from '@react-three/drei';
import { 
  EffectComposer,
  Bloom,
  DepthOfField,
  ChromaticAberration
} from '@react-three/postprocessing';
import { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useSpring, animated, config } from '@react-spring/three';
import { createNoise3D } from 'simplex-noise';

// Initialize simplex noise
const noise3D = createNoise3D();

interface Vector2D {
  x: number;
  y: number;
}

interface ScrollCameraProps {
  scrollY: number;
  mousePosition: Vector2D;
  isMobile: boolean;
}

interface MouseTrackerProps {
  children: React.ReactNode;
  onMouseMove: (position: Vector2D) => void;
}

interface FeaturePlateProps {
  position: [number, number, number];
  text: string;
  index: number;
  isMobile: boolean;
}

interface FloatingFeaturesProps {
  scrollY: number;
  mousePosition: Vector2D;
  isMobile: boolean;
}

interface SceneProps {
  scrollY: number;
  mousePosition: Vector2D;
  isMobile: boolean;
}

interface DataStreamProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  isMobile?: boolean;
}

function ScrollCamera({ scrollY, mousePosition, isMobile }: ScrollCameraProps) {
  const { camera, scene } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 20));
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));
  
  useFrame((state) => {
    // Base camera position from scroll (less dramatic for mobile)
    const targetZ = isMobile 
      ? 20 - (scrollY * 10) // Less movement for mobile
      : 20 - (scrollY * 15);
    targetPosition.current.z = targetZ;
    
    // Add mouse/touch influence (reduced for mobile)
    if (isMobile) {
      targetPosition.current.x = mousePosition.x * 1; // Reduced movement
      targetPosition.current.y = mousePosition.y * 1;
    } else {
      targetPosition.current.x = mousePosition.x * 2;
      targetPosition.current.y = mousePosition.y * 2;
    }
    
    // Smooth camera movement using lerp (slower for mobile)
    const lerpFactor = isMobile ? 0.03 : 0.05;
    camera.position.lerp(targetPosition.current, lerpFactor);
    
    // Calculate target rotation based on scroll and mouse (reduced for mobile)
    const targetRotationX = scrollY * Math.PI * (isMobile ? 0.05 : 0.1);
    const targetRotationY = mousePosition.x * (isMobile ? 0.1 : 0.2);
    targetRotation.current.x = targetRotationX;
    targetRotation.current.y = targetRotationY;
    
    // Apply smooth rotation
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.current.x, lerpFactor);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.current.y, lerpFactor);
    
    // Update fog density if fog exists
    const fog = scene.fog as THREE.FogExp2;
    if (fog && 'density' in fog) {
      fog.density = THREE.MathUtils.lerp(0.01, 0.05, scrollY);
    }
  });
  
  return null;
}

function MouseTracker({ children, onMouseMove }: MouseTrackerProps) {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const position = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
      onMouseMove(position);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const position = {
          x: (touch.clientX / window.innerWidth) * 2 - 1,
          y: -(touch.clientY / window.innerHeight) * 2 + 1
        };
        onMouseMove(position);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onMouseMove]);

  return <>{children}</>;
}

function BackgroundParticles({ count = 2000, mousePosition, scrollY, isMobile }: { count: number; mousePosition: Vector2D; scrollY: number; isMobile: boolean }) {
  // Reduce particle count for mobile
  const particleCount = isMobile ? Math.floor(count / 3) : count;
  
  const points = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 20 + Math.random() * 10;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      p[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      p[i * 3 + 2] = radius * Math.cos(phi);
    }
    return p;
  }, [particleCount]);

  const ref = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Use simpler animation logic for mobile
    if (isMobile) {
      // Simple rotation with time
      ref.current.rotation.x = time * 0.02 + scrollY * 0.3;
      ref.current.rotation.y = time * 0.03;
    } else {
      // Full animation for desktop
      // Apply noise-based movement
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const noise = noise3D(
          positions[i] * 0.05,
          positions[i + 1] * 0.05,
          time * 0.1
        ) * 0.2;
        
        positions[i] += noise;
        positions[i + 1] += noise;
        positions[i + 2] += noise;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
      
      // Rotate based on mouse position and scroll
      ref.current.rotation.x = mousePosition.y * 0.2 + scrollY * 0.5;
      ref.current.rotation.y = mousePosition.x * 0.2 + time * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={points}>
      <PointMaterial
        transparent
        color="#4299e1"
        size={isMobile ? 0.08 : 0.05} // Larger points for mobile for better visibility
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Mobile-optimized 3D element that responds to scroll
function MobileScrollObject({ scrollY }: { scrollY: number }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Animation based on scroll position
    ref.current.rotation.y = scrollY * Math.PI * 2 + time * 0.2;
    ref.current.rotation.x = scrollY * Math.PI * 0.5;
    
    // Scale effect based on scroll
    const scale = 1 + scrollY * 0.5;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={ref} position={[0, 0, -5]}>
      {/* Create a simple folder-like shape */}
      <mesh position={[0, 0, 0]}>
        <Box args={[2, 1.5, 0.2]} />
        <meshStandardMaterial 
          color="#1e40af" 
          metalness={0.7} 
          roughness={0.2} 
          transparent 
          opacity={0.9} 
        />
      </mesh>
      
      {/* Add some orbiting elements */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos(i * Math.PI * 0.4) * 3,
            Math.sin(i * Math.PI * 0.4) * 3,
            0
          ]}
        >
          <Sphere args={[0.3, 16, 16]} />
          <meshStandardMaterial 
            color="#60a5fa" 
            emissive="#3b82f6"
            emissiveIntensity={0.5}
            transparent 
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

interface InteractiveFolderProps {
  position: [number, number, number];
  scale?: number;
}

function InteractiveFolder({ position, scale = 1 }: InteractiveFolderProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { rotation, folderScale, color } = useSpring({
    rotation: clicked ? [0, Math.PI, 0] : [0, 0, 0],
    folderScale: hovered ? 1.2 : 1,
    color: hovered ? "#0f172a" : "#020617",
    config: config.wobbly
  });

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y += Math.sin(t + position[0]) * 0.001;
      if (hovered) {
        meshRef.current.rotation.z = Math.sin(t) * 0.1;
      }
    }
  });

  // Ensure rotation array has exactly 3 elements
  const rotationValue = rotation.get();
  const rotationArray: [number, number, number] = [
    rotationValue[0] || 0,
    rotationValue[1] || 0,
    rotationValue[2] || 0
  ];

  return (
    <animated.group 
      position={position} 
      scale={folderScale.to(s => s * scale)}
      rotation={rotationArray}
    >
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <Box args={[1.4, 1, 0.1]} />
        <animated.meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </animated.group>
  );
}

function DataStream({ start, end, color = "#4299e1", isMobile }: DataStreamProps) {
  const points = useMemo(() => [start, end], [start, end]);
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const { lineWidth, streamColor } = useSpring({
    lineWidth: hovered ? 3 : 1,
    streamColor: hovered ? "#60a5fa" : color,
    config: config.wobbly
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    setOpacity(Math.abs(Math.sin(t * (hovered ? 4 : 2))));
  });

  return (
    <animated.group>
      <Line
        ref={ref}
        points={points}
        color={streamColor.get()}
        lineWidth={lineWidth.get()}
        transparent
        opacity={opacity}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </animated.group>
  );
}

function DataFlows({ mousePosition }: { mousePosition: Vector2D }) {
  const streams = useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      start: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ] as [number, number, number],
      end: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ] as [number, number, number]
    }));
  }, []);

  return (
    <group>
      {streams.map((stream, i) => (
        <DataStream
          key={i}
          start={stream.start}
          end={stream.end}
          color={i % 2 === 0 ? "#4299e1" : "#60a5fa"}
        />
      ))}
    </group>
  );
}

function FloatingFolders({ mousePosition }: { mousePosition: Vector2D }) {
  const folders = useMemo(() => {
    return Array.from({ length: 10 }, () => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.5
    }));
  }, []);

  return (
    <group>
      {folders.map((folder, i) => (
        <Float
          key={i}
          speed={(1 + Math.random()) * 2}
          rotationIntensity={0.2}
          floatIntensity={0.5}
        >
          <InteractiveFolder position={folder.position} scale={folder.scale} />
        </Float>
      ))}
    </group>
  );
}

function FeaturePlate({ position, text, index, isMobile }: FeaturePlateProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const { scale, rotation } = useSpring({
    scale: hovered ? 1.2 : 1,
    rotation: hovered ? [0, Math.PI * 0.1, 0] : [0, 0, 0],
    config: isMobile ? config.gentle : config.wobbly
  });

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Simplified animation for mobile
      if (isMobile) {
        meshRef.current.position.y += Math.sin(t * 0.5 + index) * 0.001;
      } else {
        meshRef.current.position.y += Math.sin(t + index) * 0.002;
      }
    }
  });

  // Adjust size for mobile
  const boxSize: [width: number, height: number, depth: number] = isMobile 
    ? [3.5, 1.8, 0.2] 
    : [4, 2, 0.2];
    
  const fontSize = isMobile ? 0.35 : 0.4;

  return (
    <animated.group position={position} scale={scale} rotation={rotation as any}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Box args={boxSize} />
        <animated.meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.9}
          transparent
          opacity={0.95}
        />
        <Text
          position={[0, 0, 0.2]}
          fontSize={fontSize}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0}
          fontWeight={900}
          letterSpacing={0.05}
        >
          {text}
        </Text>
      </mesh>
    </animated.group>
  );
}

function FloatingFeatures({ scrollY, mousePosition, isMobile }: FloatingFeaturesProps) {
  const features = [
    "Secure Storage",
    "Real-time Sync",
    "Team Collaboration",
    "Version Control",
    "AI-Powered Search",
    "24/7 Support"
  ];

  // For mobile, use fewer features to improve performance
  const displayFeatures = isMobile ? features.slice(0, 4) : features;

  return (
    <group position={[0, -5 + scrollY * 10, 0]}>
      {displayFeatures.map((feature, i) => (
        <Float 
          key={i} 
          speed={isMobile ? 1.5 : 2} 
          rotationIntensity={isMobile ? 0.3 : 0.5} 
          floatIntensity={isMobile ? 0.3 : 0.5}
        >
          <FeaturePlate
            position={[
              (i % 2) * 6 - 3, // Simplified layout for mobile
              Math.floor(i / 2) * 3 - 2,
              0
            ]}
            text={feature}
            index={i}
            isMobile={isMobile}
          />
        </Float>
      ))}
    </group>
  );
}

// Separate components for mobile and desktop effects
function DesktopEffects() {
  return (
    <>
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        height={300}
      />
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />
    </>
  );
}

function MobileEffects({ scrollY }: { scrollY: number }) {
  // Fix for TypeScript issue with Vector2 in ChromaticAberration
  const aberrationOffset = useMemo(() => {
    return new THREE.Vector2(scrollY * 0.005, 0);
  }, [scrollY]);
  
  return (
    <>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        height={200}
      />
      <ChromaticAberration
        offset={aberrationOffset}
        radialModulation={false}
        modulationOffset={0}
      />
    </>
  );
}

function Scene({ scrollY, mousePosition, isMobile }: SceneProps) {
  const { scene } = useThree();
  
  // Update lighting based on scroll
  useFrame(() => {
    const intensity = 0.5 + scrollY * 0.5;
    scene.traverse((object) => {
      if (object instanceof THREE.PointLight) {
        object.intensity = intensity;
      }
    });
  });
  
  return (
    <group>
      <BackgroundParticles count={2000} mousePosition={mousePosition} scrollY={scrollY} isMobile={isMobile} />
      
      {isMobile ? (
        // Mobile-specific 3D elements
        <group>
          <MobileScrollObject scrollY={scrollY} />
          <FloatingFeatures scrollY={scrollY} mousePosition={mousePosition} isMobile={true} />
        </group>
      ) : (
        // Desktop elements
        <group>
          <FloatingFeatures scrollY={scrollY} mousePosition={mousePosition} isMobile={false} />
          <FloatingFolders mousePosition={mousePosition} />
          <DataFlows mousePosition={mousePosition} />
        </group>
      )}
      
      <EffectComposer>
        {isMobile ? <MobileEffects scrollY={scrollY} /> : <DesktopEffects />}
      </EffectComposer>
    </group>
  );
}

export default function ThreeScene() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState<Vector2D>({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY / window.innerHeight);
    };
    
    // Initial checks
    checkMobile();
    handleScroll();
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: isMobile ? 70 : 60 }} // Wider FOV for mobile
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
      dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower DPR for mobile to improve performance
    >
      <Suspense fallback={null}>
        <MouseTracker onMouseMove={setMousePosition}>
          <color attach="background" args={['#000']} />
          <fog attach="fog" args={['#000', 20, 100]} />
          
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#4299e1" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />

          <ScrollCamera scrollY={scrollY} mousePosition={mousePosition} isMobile={isMobile} />
          <Scene scrollY={scrollY} mousePosition={mousePosition} isMobile={isMobile} />
        </MouseTracker>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Suspense>
    </Canvas>
  );
} 