import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

// ── 1. Central Quantum Core with AI Rotational Orbit ─────────────────────────
function QuantumCore() {
  const coreRef = useRef()
  const innerRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (coreRef.current) {
      // Rotates on X/Y axes based on elapsed time while tracking mouse pointer
      coreRef.current.rotation.x = t * 0.15 + state.pointer.y * 0.2
      coreRef.current.rotation.y = t * 0.2 + state.pointer.x * 0.4
    }
    if (innerRef.current) {
      innerRef.current.rotation.z = -t * 0.25
      innerRef.current.rotation.x = t * 0.1
    }
  })

  return (
    <group ref={coreRef}>
      {/* Outer Polyhedron Core */}
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#4338ca"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Inner Glowing Energy Sphere */}
      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#06b6d4"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  )
}

// ── 2. Triple Gimbal Ring Gyroscope ──────────────────────────────────────────
function GimbalRings() {
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Ring 1: Rotates on Z with cosine wave tilt
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4
      ring1Ref.current.rotation.x = Math.cos(t * 0.3) * 0.35
    }

    // Ring 2: Counter-rotates on Y with sine oscillation
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.3
      ring2Ref.current.rotation.z = Math.sin(t * 0.25) * 0.4
    }

    // Ring 3: Spins diagonally on X/Y
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.25
      ring3Ref.current.rotation.y = t * 0.35
    }
  })

  return (
    <group>
      {/* Ring 1 - Cyan primary gimbal */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.7, 0.022, 16, 64]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Ring 2 - Indigo secondary gimbal */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.0, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#818cf8"
          emissive="#6366f1"
          emissiveIntensity={0.7}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Ring 3 - Violet outer gimbal with dashes */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.3, 0.018, 16, 64]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </group>
  )
}

// ── 3. Neural Particle Stream (350 floating nodes in spherical orbit) ─────────
function NeuralParticleStream() {
  const particlesRef = useRef()
  const count = 350

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const colorPalette = [
      new THREE.Color("#6366f1"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#a855f7"),
      new THREE.Color("#38bdf8")
    ]

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const radius = 2.4 + Math.random() * 2.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }

    return [pos, col]
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (particlesRef.current) {
      // Produces spatial depth behind core rings with spherical drift
      particlesRef.current.rotation.y = t * 0.05
      particlesRef.current.rotation.x = Math.sin(t * 0.03) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ── Composite Computational Core ─────────────────────────────────────────────
export default function ComputationalCore() {
  return (
    <group scale={1.15}>
      <QuantumCore />
      <GimbalRings />
      <NeuralParticleStream />
    </group>
  )
}
