import React from "react";
import { Canvas } from "@react-three/fiber";
import useScroll from "../hooks/useScroll";
import Plane from "./Plane";

const Scene = ({ DomPlanes }) => {
  const { value } = useScroll();
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
        orthographic
        camera={{ zoom: 50, position: [0, 0, 100] }}
      >
        <ambientLight />
        <group position={[0, value, 50]}>
          {DomPlanes.current.map((planeEl, index) => (
            <Plane element={planeEl} key={index} />
          ))}
        </group>
      </Canvas>
    </div>
  );
};

export default Scene;
