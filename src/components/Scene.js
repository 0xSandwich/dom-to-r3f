import React, {useState, useEffect} from "react";
import { useThree, useFrame } from "@react-three/fiber";
import useScroll from "../hooks/useScroll";
import Plane from "./Plane";
import * as THREE from "three"
import { useDomToFiberContext } from "../contexts/DomToFiberContext";

const Scene = () => {
    const { value } = useScroll();
    const {camera} = useThree();
    const { getRefs } = useDomToFiberContext();
    let r = 0

    useFrame((state) => {
        r+=0.01
    });

    const updateViewport = () => {
        console.log("update")
        camera.fov = Math.atan(window.innerHeight/2 / camera.position.z) *2 * THREE.MathUtils.RAD2DEG
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
      }
    
      useEffect(()=>{
        window.addEventListener("resize", updateViewport)
        updateViewport()
      },[])

    // Get the current refs from the hook
    const currentRefs = getRefs();
    console.log('Scene received refs:', currentRefs);

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
        {currentRefs.map((planeEl, index) => {
            console.log('Rendering plane at index:', index, 'element:', planeEl);
            return planeEl && <Plane element={planeEl} key={index} />;
        })}
        </group>
    </scene>
    )
}

export default Scene