import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import styles from '../styles/Home.module.css'
import { OrbitControls } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

import * as THREE from 'three'

const Box = () => {
  const meshRef = useRef()
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const props = useSpring({
    scale: !active ? [1, 1, 1] : [1.5, 1.5, 1.5],
    color: hover ? 'pink' : 'blue',
  })

  useFrame(() => {
    /* meshRef.current.rotation.y += 0.005 */
    /* meshRef.current.rotation.x += 0.02 */
  })

  return (
    <a.mesh
      ref={meshRef}
      onPointerOver={() => {
        setHover(true)
      }}
      onPointerOut={() => {
        setHover(false)
      }}
      onClick={() => setActive(!active)}
      scale={props.scale}
      castShadow
    >
      <ambientLight />
      <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  )
}
const Plane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeBufferGeometry attach="geometry" args={[50, 50]} recieveShadow />
      <meshPhysicalMaterial attach="material" color="white" />
    </mesh>
  )
}

export default function boxDisplay() {
  return (
    <div>
      <h1>TEXTURE*MAPPER</h1>
      <Canvas
        className={styles.canvas}
        camera={{ position: [0, 3, 5] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFShadowMap
        }}
      >
        <OrbitControls />
        <fog attach="fog" args={['white', 3, 20]} />
        <Box />
        <Plane />
      </Canvas>
    </div>
  )
}
