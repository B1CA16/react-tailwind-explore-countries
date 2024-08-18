import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

const Model = () => {
  const { scene } = useGLTF('/Globe.gltf')
  const modelRef = useRef()

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001
    }
  })

  return <primitive ref={modelRef} object={scene} scale={1} />
}

const Globe = () => {
  return (
    <Canvas camera={{ position: [0, 0, 150], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 5, 5]} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Model />
        <OrbitControls enableZoom={false} />
      </Suspense>
    </Canvas>
  )
}

export default Globe
