import { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Line } from '@react-three/drei';
import CustomObject from './components/CustomObject';
import { Box } from './components/Box';
import { Suzanne } from './components/Suzanne';
import { Loader } from './components/Loader';
import { useControls } from 'leva';

// https://docs.pmnd.rs/react-three-fiber/tutorials/typescript
// TS Starter https://codesandbox.io/s/brnsm

// https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models
// GLTF Loader https://codesandbox.io/s/vbnbf

export default function App() {
  const { grid, rotation, point } = useControls({
    grid: true,
    rotation: {
      value: 0,
      min: 0,
      max: 4,
      step: 0.01,
    },
    point: {
      value: 0,
      min: -4,
      max: 4,
      step: 0.01,
    },
  });

  const points = [];
  points.push(new THREE.Vector3(-4, 0, 0));
  points.push(new THREE.Vector3(point, 2, 0));
  points.push(new THREE.Vector3(4, 0, 0));

  return (
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        // outputColorSpace: THREE.SRGBColorSpace,
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
        {grid && <gridHelper />}

        {/* <ambientLight intensity={0.5} />
        <directionalLight position={[1, 2, 3]} intensity={1.5} /> */}

        <Environment preset="city" background resolution={100} blur={0.4} />

        <Line points={points} color="red" lineWidth={3} />

        <group>
          <Box position={[-2.2, 0, 0]} />
          <Box position={[2.2, 0, 0]} rotation-y={rotation} />
        </group>

        <CustomObject position-x={-5} />

        <Suzanne />
      </Suspense>
    </Canvas>
  );
}
