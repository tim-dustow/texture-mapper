import textureList from '../../data/textureDataTrue'
import styles from '../../styles/Home.module.css'
import { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MeshDistortMaterial, OrbitControls } from '@react-three/drei'

import Link from 'next/link'

// getting props
const data = textureList.textures

export const getStaticPaths = async () => {
  const route = data.map((texture) => {
    return {
      params: { id: texture.id },
    }
  })
  return {
    paths: route,
    fallback: false,
  }
}
export const getStaticProps = async (context) => {
  const idP = context.params.id
  const tex = data[idP - 1]

  return {
    props: { texture: tex },
  }
}

export const Sphere = ({ texture }) => {
  console.log('101', texture)
  const colorMap = useLoader(TextureLoader, texture.image_url)
  console.log('Sphere texture is:' + texture)
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh>
        <MeshDistortMaterial distort={0.4} speed={1} map={colorMap} />
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
    </>
  )
}

/* function warpDrive() {
  const warp = 0
  if (!warp) {
    return 1
  } else return 0
} */

const Details = ({ texture }) => {
  console.log('Details texture:' + texture.image_url)

  /*   const Sphere = () => {
    const colorMap = useLoader(TextureLoader, texture.image_url)
   const normals = useLoader(TextureLoader, texture.normals_url) 
    console.log('Sphere texture is:' + texture)
    return (
      <>
        <ambientLight intensity={0.2} />
        <directionalLight />
        <mesh>
          <MeshDistortMaterial
            distort={0.8}
            speed={1}
            map={colorMap}
            /* normalMap={normals}
          />
          <sphereGeometry args={[1, 32, 32]} p />
        </mesh>
      </>
    )
  } */
  return (
    <>
      <div className={styles.main}>
        <h1>Texture Details</h1>
        <div className={styles.card}>
          <div style={{ padding: '1px', width: '20vw', height: '20vw' }}>
            <Canvas camera={{ position: [0, 0, 2] }}>
              <OrbitControls />
              <Suspense fallback={null}>
                <Sphere texture={texture} />
              </Suspense>
            </Canvas>
          </div>
          <div className={styles.cardDetails}>
            <h2>{texture.name}</h2>
            <p>{texture.details}</p>
          </div>
        </div>
        <Link href={'/texture'}>
          <button className={styles.back}>BACK</button>
        </Link>
      </div>
    </>
  )
}

export default Details
