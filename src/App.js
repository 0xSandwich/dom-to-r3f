import Banner from "./components/Banner";
import CanvasWrapper from "./components/Canvas";
import "./styles.css";
import styled from "styled-components";
import React from "react";
import { DomToFiberProvider } from "./contexts/DomToFiberContext";
import { 
  WaveEffectExample, 
  ColorShiftExample, 
  DisplacementExample, 
  PixelationExample, 
  StyledOnlyExample, 
  CurtainsWaveExample,
  MouseDistortionExample,
  AudioReactiveExample
} from "./examples/ShaderExamples";
import useScroll from "./hooks/useScroll";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 100px;

  & > div:nth-child(even) {
    align-self: end;
    flex-direction: row-reverse;
  }
`;

function AppContent() {
  const items = [1, 2, 3, 4, 5];
  const { scrollPosition } = useScroll();
  return (
    <div className="App">
      <h1>DOM images to Three.js</h1>
      <StyledWrapper>
        {items.map((v, i) => (
          <Banner 
            key={i} 
            index={i}
          />
        ))}
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', width: '100%'}}>
        <WaveEffectExample index={5} />
        <ColorShiftExample index={6} />
        <DisplacementExample index={7} />
        <PixelationExample index={8} />
        <StyledOnlyExample index={9} />
        <CurtainsWaveExample index={10} />
        <MouseDistortionExample index={11} />
        <AudioReactiveExample index={12} />
      </div>
      </StyledWrapper>
        <CanvasWrapper value={scrollPosition}>
          <directionalLight
          castShadow
          position={[0,10,0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left = {-10}
          shadow-camera-right = {10}
          shadow-camera-top = {10}
          shadow-camera-bottom = {-10}
          />
          <ambientLight />
          <group position={[0, scrollPosition, 0]}>
            <mesh  position={[5,-5,10]} rotation={[scrollPosition/4,scrollPosition/8,0]}>
                <boxGeometry args={[3,3,3,3]} castShadow />
                <meshStandardMaterial attach="material" color={"#6be092"} />
            </mesh>
            <mesh  position={[-3,-5,-10]} rotation={[scrollPosition/4,scrollPosition/8,0]}>
                <boxGeometry args={[3,3,3,3]} castShadow />
                <meshStandardMaterial attach="material" color={"#3f93d2"} />
            </mesh>
          </group>
      </CanvasWrapper>
    </div>
  );
}

export default function App() {
  return (
    <DomToFiberProvider>
      <AppContent />
    </DomToFiberProvider>
  );
}
