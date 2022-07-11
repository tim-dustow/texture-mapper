import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls, useGLTF } from '@react-three/drei'
import styles from '../styles/Home.module.css'

useGLTF.preload('/harmonaig.glb')

function Shoe({ ...props }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/harmonaig.glb')
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.set(
      0.1 + Math.cos(t / 4.5) / 10,
      Math.sin(t / 4) / 4,
      0.3 - (1 + Math.sin(t / 4)) / 8
    )
    ref.current.position.y = (1 + Math.sin(t / 2)) / 10
  })
  return (
    <group {...props} dispose={null}>
      <group ref={ref}>
        <group
          position={[-0.16, 0, -0.22]}
          rotation={[Math.PI / 5, -Math.PI / 0.1, 0]}
        >
          <mesh
            castShadow
            geometry={nodes.harmonaig.geometry}
            material={materials['harmonaig']}
          />
        </group>
      </group>
    </group>
  )
}

export default function Harmonaig() {
  return (
    <div className={styles.canvas}>
      <Canvas
        className={styles.Canvas}
        shadows
        dpr={[1, 2]}
        camera={{ position: [1, 1, 7], fov: 50 }}
      >
        <OrbitControls enableZoom={true} />
        <ambientLight intensity={1} />
        <spotLight
          position={[1, 6, 1.5]}
          angle={0.2}
          penumbra={1}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <spotLight
          position={[-5, 5, -1.5]}
          angle={0.03}
          penumbra={1}
          intensity={4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight
          position={[5, 5, -5]}
          angle={0.3}
          penumbra={1}
          intensity={4}
          castShadow={true}
          shadow-mapSize={[256, 256]}
          color="#ffffc0"
        />
        <Suspense fallback={null}>
          <Shoe scale={3} position={[0, -0.09, 0]} />
          <ContactShadows
            frames={1}
            rotation-x={[Math.PI / 2]}
            position={[0, -0.33, 0]}
            far={0.4}
            width={2}
            height={2}
            blur={4}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
