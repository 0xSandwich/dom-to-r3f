import React from "react";
import Scene from "./Scene"
import { Canvas } from "@react-three/fiber";

const CanvasWrapper = ({ DomPlanes }) => {

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        left: "0",
        top: "0"
      }}
    >
      <Canvas
        flat
        linear
        shadows
        camera={{ zoom: 50, position: [0, 0, 100],isPerspectiveCamera: true }}
      >
        <Scene DomPlanes={DomPlanes} />
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
