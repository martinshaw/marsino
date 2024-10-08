/*
All Rights Reserved, (c) 2024 Martin Shaw

Author: Martin Shaw (developer@martinshaw.co)
File Name: index.tsx
Created:  2024-10-08T01:33:10.848Z
Modified: 2024-10-08T01:33:10.848Z

Description: description
*/

import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, useThree } from "@react-three/fiber";

const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;
const radiansToDegrees = (radians: number) => (radians * 180) / Math.PI;

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  useFrame((state, delta) => {
    const scaleFactor = 1 + Math.sin(state.clock.getElapsedTime()) * 0.05;
    meshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor); 
  });

  const materialColor = useMemo(
    () => hovered ? "gold" : "goldenrod",
    [hovered]
  );

  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={materialColor} />
    </mesh>
  );
}

createRoot(document.getElementById("root")).render(
  <Canvas>
    <ambientLight intensity={Math.PI / 1} />
    <spotLight
      position={[10, 10, 10]}
      angle={0.15}
      penumbra={1}
      decay={0}
      intensity={Math.PI}
    />
    <pointLight position={[-10, -10, -10]} decay={2} intensity={Math.PI} />
    <Box position={[-2, 0, 1]} />
    <Box position={[0, 0, 1]} />
    <Box position={[2, 0, 1]} />
  </Canvas>
);
