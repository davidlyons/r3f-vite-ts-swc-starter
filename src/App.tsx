import { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import CustomObject from './components/CustomObject';
import { Box } from './components/Box';
import { Suzanne } from './components/Suzanne';
import { Loader } from './components/Loader';

// https://docs.pmnd.rs/react-three-fiber/tutorials/typescript
// TS Starter https://codesandbox.io/s/brnsm

// https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models
// GLTF Loader https://codesandbox.io/s/vbnbf

export default function App() {
  return (
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        // outputColorSpace: THREE.SRGBColorSpace
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2, 2, 7],
      }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls enableDamping={false} />
        <gridHelper />

        {/* <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} /> */}

        <Environment preset="city" background resolution={100} />

        <group>
          <Box position={[-2.2, 0, 0]} />
          <Box position={[2.2, 0, 0]} />
        </group>

        <CustomObject position-x={-5} />

        <Suzanne />
      </Suspense>
    </Canvas>
  );
}
