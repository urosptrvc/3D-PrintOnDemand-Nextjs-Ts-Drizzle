"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, useProgress, Html } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import * as THREE from "three";

interface ModelViewerProps {
  file: File | null;
  height?: number;
}

function LoadingIndicator() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">
          Loading model... {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
}

function Model({ url, fileType }: { url: string; fileType: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [model, setModel] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    let loader;

    if (fileType === "stl") {
      loader = new STLLoader();
    } else if (fileType === "obj") {
      loader = new OBJLoader();
    } else if (fileType === "3mf") {
      loader = new ThreeMFLoader();
    } else {
      console.error("Unsupported file type:", fileType);
      return;
    }

    loader.load(
      url,
      (result) => {
        if (fileType === "stl") {
          setModel(result);
        } else if (fileType === "obj" || fileType === "3mf") {
          // For OBJ and 3MF, we need to extract the geometry
          // This is simplified and might need adjustment based on the actual model structure
          if (result.children && result.children.length > 0) {
            const mesh = result.children.find(
              (child) => child instanceof THREE.Mesh,
            ) as THREE.Mesh;
            if (mesh && mesh.geometry) {
              setModel(mesh.geometry);
            }
          }
        }
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("An error occurred loading the model:", error);
      },
    );
  }, [url, fileType]);

  useEffect(() => {
    if (meshRef.current && model) {
      // Center the model
      model.computeBoundingBox();
      const center = new THREE.Vector3();
      model.boundingBox?.getCenter(center);
      model.center();

      // Scale the model to a reasonable size
      model.computeBoundingSphere();
      const radius = model.boundingSphere?.radius || 1;
      const scale = 5 / radius;
      meshRef.current.scale.set(scale, scale, scale);
    }
  }, [model]);

  if (!model) return null;

  return (
    <mesh ref={meshRef}>
      <bufferGeometry attach="geometry" {...model} />
      <meshStandardMaterial
        attach="material"
        color="#ffffff"
        roughness={0.5}
        metalness={0.1}
      />
    </mesh>
  );
}

export function ModelViewer({ file, height = 400 }: ModelViewerProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("");
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);

      // Determine file type from extension
      const extension = file.name.split(".").pop()?.toLowerCase() || "";
      setFileType(extension);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  if (!file || !objectUrl) {
    return (
      <div
        className="flex items-center justify-center bg-muted rounded-lg"
        style={{ height: `${height}px` }}
      >
        <p className="text-muted-foreground">No model file selected</p>
      </div>
    );
  }

  return (
    <div
      className="relative rounded-lg overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Suspense fallback={<LoadingIndicator />}>
          {objectUrl && fileType && (
            <Model url={objectUrl} fileType={fileType} />
          )}
          <Grid
            infiniteGrid
            cellSize={1}
            cellThickness={0.6}
            cellColor="#6e6e6e"
            sectionSize={5}
            sectionThickness={1.2}
            sectionColor="#9d4b4b"
            fadeDistance={30}
          />
        </Suspense>
        <OrbitControls ref={controlsRef} />
      </Canvas>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button variant="secondary" size="icon" onClick={resetCamera}>
          <RotateCw className="h-4 w-4" />
          <span className="sr-only">Reset View</span>
        </Button>
      </div>
    </div>
  );
}
