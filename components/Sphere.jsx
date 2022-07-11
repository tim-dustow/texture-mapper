import { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MeshDistortMaterial, OrbitControls } from '@react-three/drei'

function Sphere() {
  const colorMap = useLoader(TextureLoader, 'bricks.png' )
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh>
        <MeshDistortMaterial distort={.4} speed={1} map={colorMap}/>
        <sphereGeometry args={[100, 100, 100]} />
        {/* <meshStandardMaterial map={colorMap} /> */}
      </mesh>
    </>
  )
}

export default function OnTexture() {
  return (
    <Canvas>
      <OrbitControls/>
      <Suspense fallback={null}>
        <Sphere />
      </Suspense>
    </Canvas>
  )
}