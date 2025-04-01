"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export function HeroModel({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) {
  //@ts-ignore
  const meshRef = useRef<THREE.Mesh>();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        (mousePosition.x * Math.PI) / 4,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        (mousePosition.y * Math.PI) / 4,
        0.1
      );
    }
  });

  return (
    <Box ref={meshRef} args={[3, 3, 3]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#0d9488"
        attach="material"
        distort={0.4}
        speed={4}
        roughness={0}
      />
    </Box>
  );
}
