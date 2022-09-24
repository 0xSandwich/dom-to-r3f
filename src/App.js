import Banner from "./components/Banner";
import CanvasWrapper from "./components/Canvas";
import "./styles.css";
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 100px;

  & > div:nth-child(even) {
    align-self: end;
    flex-direction: row-reverse;
  }
`;

export default function App() {
  const items = [1, 2, 3, 4, 5, 6, 5, 4, 4, 5];
  const itemsRef = useRef([]);
  const childrenLength = itemsRef;

  if (itemsRef.current.length !== childrenLength) {
    itemsRef.current = Array(items.length)
      .fill()
      .map((_, i) => itemsRef.current[i] || React.createRef());
  }

  return (
    <div className="App">
      <h1>DOM images to Three.js</h1>
      <StyledWrapper>
        {items.map((v, i) => (
          <Banner key={i} ref={itemsRef.current[i]} />
        ))}
      </StyledWrapper>
      <CanvasWrapper DomPlanes={itemsRef} />
    </div>
  );
}
