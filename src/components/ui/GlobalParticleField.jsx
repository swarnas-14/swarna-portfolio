import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Particles() {
  const pointsRef = useRef()
  const count = 180

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return pos
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (pointsRef.current) {
      // Subtle cyan particles drift slowly in 3D space (rotation.y = t * 0.02)
      pointsRef.current.rotation.y = t * 0.02
      pointsRef.current.rotation.x = Math.sin(t * 0.015) * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#22d3ee"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function GlobalParticleField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
    </div>
  )
}
