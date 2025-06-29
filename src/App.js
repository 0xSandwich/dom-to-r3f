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
      <CanvasWrapper />
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
