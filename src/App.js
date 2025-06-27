import Banner from "./components/Banner";
import CanvasWrapper from "./components/Canvas";
import "./styles.css";
import styled from "styled-components";
import React from "react";
import { DomToFiberProvider } from "./contexts/DomToFiberContext";

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
  const items = [1, 2, 3, 4, 5, 6, 5, 4, 4, 5];

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
