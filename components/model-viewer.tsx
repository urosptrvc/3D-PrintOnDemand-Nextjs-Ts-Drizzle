"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
// @ts-ignore
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
// @ts-ignore
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader";
import { Button } from "@/components/ui/button";
import { Loader2, RotateCw } from "lucide-react";
import { useAtom } from "jotai";
import { printOrderAtom } from "@/lib/store";

// Supported file types
const SUPPORTED_TYPES = ["stl", "obj", "3mf"] as const;
type SupportedFileType = (typeof SUPPORTED_TYPES)[number];

// Define loader types
type ModelLoader = STLLoader | OBJLoader | ThreeMFLoader;
type ModelResult = THREE.BufferGeometry | THREE.Group;

// Loader function that returns a promise
const loadModel = (
  url: string,
  fileType: SupportedFileType,
): Promise<ModelResult> => {
  let loader: ModelLoader;

  switch (fileType) {
    case "stl":
      loader = new STLLoader();
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });

    case "obj":
      loader = new OBJLoader();
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });

    case "3mf":
      loader = new ThreeMFLoader();
      return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      });

    default:
      return Promise.reject(new Error(`Unsupported file type: ${fileType}`));
  }
};

// Loading spinner component
function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-gray-600">Loading model...</p>
      </div>
    </Html>
  );
}

// Error message component
function ErrorMessage({ message }: { message: string }) {
  return (
    <Html center>
      <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-xs">
        <p className="text-red-600 text-sm">{message}</p>
      </div>
    </Html>
  );
}

// The actual 3D model component
function ModelObject({
  url,
  fileType,
}: {
  url: string;
  fileType: SupportedFileType;
}) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [object, setObject] = useState<THREE.Group | null>(null);
  const [error, _setError] = useState<string | null>(null);
  const objectRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Load the model
  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const result = await loadModel(url, fileType);

      if (!isMounted) return;

      if (fileType === "stl") {
        // STL loader returns geometry directly
        setGeometry(result as THREE.BufferGeometry);
      } else {
        // OBJ and 3MF loaders return Object3D/Group
        setObject(result as THREE.Group);
      }
    };

    load().then(() => (isMounted = false));
    // return () => {
    //   isMounted = false;
    // };
  }, [url, fileType]);

  // Center and fit model to view
  useEffect(() => {
    if (!objectRef.current) return;

    const box = new THREE.Box3().setFromObject(objectRef.current);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();

    box.getCenter(center);
    box.getSize(size);

    // Center the object
    objectRef.current.position.x = -center.x;
    objectRef.current.position.y = -center.y;
    objectRef.current.position.z = -center.z;

    // Fit to camera view
    const maxDim = Math.max(size.x, size.y, size.z);
    // @ts-ignore
    const fov = camera.fov * (Math.PI / 180);
    camera.position.z = (maxDim / 2 / Math.tan(fov / 2)) * 1.5;
    camera.updateProjectionMatrix();
  }, [geometry, object, camera]);

  if (error) return <ErrorMessage message={error} />;
  if (!geometry && !object) return <LoadingSpinner />;

  return (
    <group ref={objectRef}>
      {geometry ? (
        <mesh>
          <bufferGeometry attach="geometry" {...geometry} />
          <meshPhongMaterial
            color="#e0e0e0"
            specular="#111111"
            shininess={30}
            flatShading={false}
          />
        </mesh>
      ) : object ? (
        <primitive object={object} />
      ) : null}
    </group>
  );
}

// The scene setup component
function ModelScene({
  url,
  fileType,
}: {
  url: string;
  fileType: SupportedFileType;
}) {
  // @ts-ignore
  const controlsRef = useRef<OrbitControls>(null);
  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow={true}
      />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} />
      <directionalLight position={[0, -10, 0]} intensity={0.3} />

      {/* The actual model */}
      <Suspense fallback={<LoadingSpinner />}>
        <ModelObject url={url} fileType={fileType} />
      </Suspense>

      {/* Controls */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.1}
        minDistance={1}
        maxDistance={100}
      />
    </>
  );
}

// Main component that is exported
export function ModelViewer({ height = 400 }: { height?: number }) {
  const [printOrder] = useAtom(printOrderAtom);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<SupportedFileType | "">("");
  // @ts-ignore
  const controlsRef = useRef<OrbitControls>(null);

  // Create object URL when file changes
  useEffect(() => {
    if (printOrder.uploadedFile) {
      // Get file extension
      const extension =
        printOrder.uploadedFile.name.split(".").pop()?.toLowerCase() || "";

      if (!SUPPORTED_TYPES.includes(extension as SupportedFileType)) {
        console.error(`Unsupported file type: ${extension}`);
        return;
      }

      // Create object URL
      const url = URL.createObjectURL(printOrder.uploadedFile);
      setModelUrl(url);
      setFileType(extension as SupportedFileType);

      // Clean up
      return () => {
        if (url) URL.revokeObjectURL(url);
      };
    } else {
      setModelUrl(null);
      setFileType("");
    }
  }, [printOrder.uploadedFile]);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // Empty state
  if (!modelUrl || !fileType) {
    return (
      <div
        className="flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200"
        style={{ height: `${height}px` }}
      >
        <div className="text-center">
          <p className="text-gray-500">No model selected</p>
          <p className="text-gray-400 text-sm mt-1">
            Upload a 3D model file to preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden border border-gray-200 shadow-sm"
      style={{ height: `${height}px` }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ModelScene url={modelUrl} fileType={fileType} />
      </Canvas>

      {/* Controls overlay */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={resetCamera}
          className="bg-white bg-opacity-70 hover:bg-opacity-100"
        >
          <RotateCw className="h-4 w-4" />
          <span className="sr-only">Reset View</span>
        </Button>
      </div>
    </div>
  );
}
