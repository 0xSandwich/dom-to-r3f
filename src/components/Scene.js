import React from "react";
import useScroll from "../hooks/useScroll";
import Renderer from "./Renderer";

const Scene = () => {
    const { value } = useScroll();

    return (
    <scene>
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
        <group position={[0, value, 0]}>
        <mesh  position={[5,-5,10]} rotation={[value/4,value/8,0]}>
            <boxGeometry args={[3,3,3,3]} castShadow />
            <meshStandardMaterial attach="material" color={"#6be092"} />
        </mesh>
        <mesh  position={[-3,-5,-10]} rotation={[value/4,value/8,0]}>
            <boxGeometry args={[3,3,3,3]} castShadow />
            <meshStandardMaterial attach="material" color={"#3f93d2"} />
        </mesh>
        <Renderer />
        </group>
    </scene>
    )
}

export default Scene