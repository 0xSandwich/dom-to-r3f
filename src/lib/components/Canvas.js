import React from "react";
import Renderer from "./Renderer";
import { Canvas } from "@react-three/fiber";

const CanvasWrapper = ({ children, value }) => {
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
        <scene>          
          {children}
          <group position={[0, value, 0]}>
              <Renderer />
          </group>
        </scene>
      </Canvas>
    </div>
  );
};

export default CanvasWrapper;
