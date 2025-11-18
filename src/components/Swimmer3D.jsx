import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Cylinder } from "@react-three/drei";
import * as THREE from "three";

const Swimmer3D = ({ position, swimming, armAngle }) => {
  const groupRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();

  // Simple stick man materials
  const blackMaterial = useMemo(
    () => new THREE.MeshLambertMaterial({ color: "#000000" }),
    []
  );
  const pinkMaterial = useMemo(
    () => new THREE.MeshLambertMaterial({ color: "#ec4899" }),
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      // Add subtle bobbing motion
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }

    if (leftArmRef.current && swimming) {
      leftArmRef.current.rotation.x = armAngle;
    }

    if (rightArmRef.current && swimming) {
      rightArmRef.current.rotation.x = armAngle + Math.PI;
    }

    if (leftLegRef.current && swimming) {
      leftLegRef.current.rotation.x = Math.sin(armAngle * 2) * 0.5;
    }

    if (rightLegRef.current && swimming) {
      rightLegRef.current.rotation.x = Math.sin(armAngle * 2 + Math.PI) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Head (circle) */}
      <Sphere args={[0.15]} position={[0, 0.3, 0]} material={blackMaterial} />

      {/* Body (vertical line) */}
      <Cylinder args={[0.02, 0.02, 0.6]} material={blackMaterial} />

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.2, 0.1, 0]}>
        <Cylinder args={[0.02, 0.02, 0.3]} material={blackMaterial} />
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.2, 0.1, 0]}>
        <Cylinder args={[0.02, 0.02, 0.3]} material={blackMaterial} />
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.1, -0.4, 0]}>
        <Cylinder args={[0.02, 0.02, 0.25]} material={blackMaterial} />
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.1, -0.4, 0]}>
        <Cylinder args={[0.02, 0.02, 0.25]} material={blackMaterial} />
      </group>

      {/* Swimming Cap (triangle) */}
      <group position={[0, 0.4, 0]}>
        <Cylinder
          args={[0.08, 0.08, 0.05]}
          position={[0, 0.05, 0]}
          material={pinkMaterial}
        />
      </group>
    </group>
  );
};

export default Swimmer3D;
