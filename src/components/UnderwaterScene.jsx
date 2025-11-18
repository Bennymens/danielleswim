import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Swimmer3D from "./Swimmer3D";

const UnderwaterScene = ({ score, distance, player, swimming, armAngle }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "75vh",
        background:
          "linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 50%, #0ea5e9 50%, #1e40af 100%)",
        position: "relative",
      }}
    >
      {/* Sky elements overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "37.5vh", // Half the height
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {/* Animated clouds */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "-100px",
            fontSize: "3rem",
            animation: "drift 20s linear infinite",
          }}
        >
          ☁️
        </div>
        <div
          style={{
            position: "absolute",
            top: "60px",
            left: "-200px",
            fontSize: "3rem",
            animation: "drift 20s linear infinite",
            animationDelay: "7s",
          }}
        >
          ☁️
        </div>
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "-150px",
            fontSize: "3rem",
            animation: "drift 20s linear infinite",
            animationDelay: "14s",
          }}
        >
          ☁️
        </div>

        {/* Trees on horizon */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10%",
            fontSize: "2rem",
            color: "#228B22",
          }}
        >
          🌲
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "15px",
            left: "30%",
            fontSize: "2.5rem",
            color: "#228B22",
          }}
        >
          🌳
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "60%",
            fontSize: "2rem",
            color: "#228B22",
          }}
        >
          🌲
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "80%",
            fontSize: "2.2rem",
            color: "#228B22",
          }}
        >
          🌳
        </div>
      </div>

      <style>
        {`
          @keyframes drift {
            0% { transform: translateX(-100px); }
            100% { transform: translateX(calc(100vw + 100px)); }
          }
        `}
      </style>

      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[0, -5, 0]} intensity={0.3} color="#ffffff" />

        {/* Underwater environment - only in bottom half */}
        <Stars
          radius={100}
          depth={50}
          count={500}
          factor={4}
          saturation={0}
          fade
        />

        {/* Animated water particles */}
        <WaterParticles />

        {/* 3D Swimmer */}
        <Swimmer3D
          position={[player.x / 50 - 7, -player.y / 50 + 3, 0]}
          swimming={swimming}
          armAngle={armAngle}
        />

        {/* Collectible stars */}
        <CollectibleStars />

        {/* UI Overlay */}
        <Text
          position={[-6, 4, 0]}
          fontSize={0.5}
          color="white"
          anchorX="left"
          anchorY="top"
        >
          Oxygen: {Math.round(oxygen)}%
        </Text>
        <Text
          position={[-6, 3.5, 0]}
          fontSize={0.5}
          color="white"
          anchorX="left"
          anchorY="top"
        >
          Distance: {distance.toFixed(0)}m
        </Text>

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom intensity={0.5} />
        </EffectComposer>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

const WaterParticles = () => {
  const particlesRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 200; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
        ],
        velocity: [0, -0.01, 0],
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += particles[i].velocity[1];
        if (particle.position.y < -10) {
          particle.position.y = 10;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

const JellyfishObstacles = () => {
  // This would be populated with actual jellyfish data from the game state
  return (
    <group>
      {/* Jellyfish would be rendered here based on game obstacles */}
    </group>
  );
};

const CollectibleStars = () => {
  // This would be populated with actual collectible data from the game state
  return (
    <group>
      {/* Stars would be rendered here based on game collectibles */}
    </group>
  );
};

export default UnderwaterScene;
