"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Enhanced 3D printer model with animation
function PrinterModel() {
  const printerRef = useRef<THREE.Group>(null);
  const extruderRef = useRef<THREE.Mesh>(null);
  const printBedRef = useRef<THREE.Mesh>(null);
  const printObjectRef = useRef<THREE.Mesh>(null);
  const extruderHeadRef = useRef<THREE.Mesh>(null);

  // Animation state
  const [printProgress, setPrintProgress] = useState(0);
  const [extruderPosition, setExtruderPosition] = useState({
    x: 0,
    y: 0.5,
    z: 0,
  });
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [layerHeight, setLayerHeight] = useState(0); // Current layer height

  // Update animation on each frame
  useFrame((state, delta) => {
    if (
      extruderRef.current &&
      printObjectRef.current &&
      printBedRef.current &&
      extruderHeadRef.current
    ) {
      // Move extruder back and forth
      setExtruderPosition((prev) => {
        const newX = prev.x + direction * delta * 0.3;

        if (newX > 0.8) {
          setDirection(-1);
          const newZ = prev.z + 0.05;
          if (newZ < 0.8) {
            setLayerHeight((prev) => prev + 0.05);
            return { x: 0.8, y: prev.y, z: newZ };
          }
          return { ...prev, x: 0.8 };
        } else if (newX < -0.8) {
          setDirection(1);
          return { ...prev, x: -0.8 };
        }

        return { ...prev, x: newX };
      });

      // Update print progress
      setPrintProgress((prev) => {
        const newProgress = prev + delta * 0.2;
        return newProgress > 1 ? 0 : newProgress;
      });

      // Apply extruder movement
      extruderRef.current.position.x = extruderPosition.x;
      extruderRef.current.position.z = extruderPosition.z;

      // Update printed object height
      printObjectRef.current.scale.y = 0.1 + printProgress * 0.9;
      printObjectRef.current.position.y = -0.25 + printProgress * 0.25;

      // Subtle head movement
      extruderHeadRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 10) * 0.01;
    }
  });

  return (
    <group ref={printerRef}>
      {/* Printer Base/Frame */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <boxGeometry args={[2.5, 0.2, 2.5]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.7} />
      </mesh>

      {/* Printer Enclosure - Side Panels with increased transparency */}
      <mesh position={[-1.2, 0.5, 0]} castShadow>
        <boxGeometry args={[0.05, 1.9, 2.4]} />
        <meshStandardMaterial
          color="#444"
          transparent
          opacity={0.15}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[1.2, 0.5, 0]} castShadow>
        <boxGeometry args={[0.05, 1.9, 2.4]} />
        <meshStandardMaterial
          color="#444"
          transparent
          opacity={0.15}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 0.5, 1.2]} castShadow>
        <boxGeometry args={[2.4, 1.9, 0.05]} />
        <meshStandardMaterial
          color="#444"
          transparent
          opacity={0.15}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 0.5, -1.2]} castShadow>
        <boxGeometry args={[2.4, 1.9, 0.05]} />
        <meshStandardMaterial
          color="#444"
          transparent
          opacity={0.15}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Printer Top*/}
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[2.5, 0.35, 2.5]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.7} />
      </mesh>

      {/* LED Light Strips along the top interior edges */}
      {/* Front strip */}
      <mesh position={[0, 1.55, -1.15]} castShadow>
        <boxGeometry args={[2.2, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Back strip */}
      <mesh position={[0, 1.55, 1.15]} castShadow>
        <boxGeometry args={[2.2, 0.03, 0.03]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Left strip */}
      <mesh position={[-1.15, 1.55, 0]} castShadow>
        <boxGeometry args={[0.03, 0.03, 2.2]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Right strip */}
      <mesh position={[1.15, 1.55, 0]} castShadow>
        <boxGeometry args={[0.03, 0.03, 2.2]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Interior Lights - Positioned to simulate LED strip lighting */}
      <pointLight
        position={[0, 1.5, -1.1]}
        intensity={0.3}
        color="#ffffff"
        distance={2}
        decay={2}
        castShadow
      />
      <pointLight
        position={[0, 1.5, 1.1]}
        intensity={0.3}
        color="#ffffff"
        distance={2}
        decay={2}
        castShadow
      />
      <pointLight
        position={[-1.1, 1.5, 0]}
        intensity={0.3}
        color="#ffffff"
        distance={2}
        decay={2}
        castShadow
      />
      <pointLight
        position={[1.1, 1.5, 0]}
        intensity={0.3}
        color="#ffffff"
        distance={2}
        decay={2}
        castShadow
      />

      {/* Vertical Supports/Rails */}
      <mesh position={[-1.2, 0.5, -1.2]} castShadow>
        <boxGeometry args={[0.08, 2, 0.08]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.7} />
      </mesh>
      <mesh position={[1.2, 0.5, -1.2]} castShadow>
        <boxGeometry args={[0.08, 2, 0.08]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.7} />
      </mesh>
      <mesh position={[-1.2, 0.5, 1.2]} castShadow>
        <boxGeometry args={[0.08, 2, 0.08]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.7} />
      </mesh>
      <mesh position={[1.2, 0.5, 1.2]} castShadow>
        <boxGeometry args={[0.08, 2, 0.08]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.7} />
      </mesh>

      {/* Vertical LED Strips on corners */}
      {/* Front Left vertical LED */}
      <mesh position={[-1.15, 0.5, -1.15]} castShadow>
        <boxGeometry args={[0.03, 1.8, 0.03]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Front Right vertical LED */}
      <mesh position={[1.15, 0.5, -1.15]} castShadow>
        <boxGeometry args={[0.03, 1.8, 0.03]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Back Left vertical LED */}
      <mesh position={[-1.15, 0.5, 1.15]} castShadow>
        <boxGeometry args={[0.03, 1.8, 0.03]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Back Right vertical LED */}
      <mesh position={[1.15, 0.5, 1.15]} castShadow>
        <boxGeometry args={[0.03, 1.8, 0.03]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Vertical corner lights */}
      <pointLight
        position={[-1.15, 0.5, -1.15]}
        intensity={0.25}
        color="#ffffff"
        distance={2}
        decay={2}
        castShadow
      />
      <pointLight
        position={[1.15, 0.5, -1.15]}
        intensity={0.25}
        color="#ffffff"
        distance={2}
        decay={2}
        castShadow
      />
      <pointLight
        position={[-1.15, 0.5, 1.15]}
        intensity={0.25}
        color="#ffffff"
        distance={2}
        decay={2}
        castShadow
      />
      <pointLight
        position={[1.15, 0.5, 1.15]}
        intensity={0.25}
        color="#ffffff"
        distance={2}
        decay={2}
        castShadow
      />

      {/* Heated Print Bed with texture */}
      <mesh position={[0, -0.3, 0]} ref={printBedRef} receiveShadow>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial
          color="#999"
          roughness={0.2}
          metalness={0.6}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Print bed grid pattern */}
      <mesh
        position={[0, -0.24, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[1.9, 1.9]} />
        <meshStandardMaterial
          color="#aaa"
          wireframe={true}
          emissive="#333"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Extruder Assembly with X-carriage */}
      <group
        ref={extruderRef}
        position={[extruderPosition.x, 1.2, extruderPosition.z]}
      >
        {/* Extruder Carriage */}
        <mesh castShadow>
          <boxGeometry args={[0.25, 0.15, 0.3]} />
          <meshStandardMaterial color="#222" />
        </mesh>

        {/* Extruder Motor */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#111" metalness={0.7} roughness={0.2} />
        </mesh>

        {/* Extruder Head */}
        <group ref={extruderHeadRef}>
          {/* Cooling Fan */}
          <mesh position={[0, 0, 0.15]} castShadow>
            <boxGeometry args={[0.15, 0.15, 0.05]} />
            <meshStandardMaterial color="#444" />
          </mesh>

          {/* Hot End */}
          <mesh position={[0, -0.15, 0]} castShadow>
            <boxGeometry args={[0.12, 0.15, 0.12]} />
            <meshStandardMaterial color="#333" />
          </mesh>

          {/* Nozzle - Improved with more detailed geometry */}
          <group position={[0, -0.28, 0]}>
            {/* Main nozzle body */}
            <mesh castShadow>
              <cylinderGeometry args={[0.04, 0.025, 0.08, 16]} />
              <meshStandardMaterial
                color="#444"
                metalness={0.95}
                roughness={0.1}
                envMapIntensity={1.5}
              />
            </mesh>
            {/* Nozzle tip */}
            <mesh position={[0, -0.05, 0]} castShadow>
              <coneGeometry args={[0.025, 0.04, 16, 1]} />
              <meshStandardMaterial
                color="#222"
                metalness={1}
                roughness={0.05}
                envMapIntensity={2}
              />
            </mesh>
          </group>

          {/* Filament */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
            <meshStandardMaterial color="#f5822d" />
          </mesh>
        </group>
      </group>

      {/* Object Being Printed */}
      <mesh
        position={[0, -0.25, 0]}
        ref={printObjectRef}
        castShadow
        scale={[0.8, 0.1, 0.8]}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f5822d" />{" "}
        {/* Orange color matching the site theme */}
      </mesh>
    </group>
  );
}

export function PrinterAnimation() {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [4, 0.5, -2], fov: 80 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize={2048}
        />
        <pointLight
          position={[0, 1.5, 2]}
          intensity={0.6}
          color="#ffffff"
          distance={6}
          castShadow
        />
        <spotLight
          position={[-2, 2, -2]}
          angle={0.15}
          penumbra={1}
          intensity={0.5}
          castShadow
          shadow-mapSize={1024}
        />
        <pointLight
          position={[0, 1.5, 2]}
          intensity={0.6}
          color="#ffffff"
          distance={6}
          castShadow
        />
        <spotLight
          position={[-2, 2, -2]}
          angle={0.15}
          penumbra={1}
          intensity={0.5}
          castShadow
          shadow-mapSize={1024}
        />
        <PrinterModel />
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.4}
          scale={5}
          blur={2}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
        <Environment preset="studio" background={false} />
      </Canvas>
    </div>
  );
}
