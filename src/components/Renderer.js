import { useThree } from "@react-three/fiber";
import { useEffect, useCallback } from "react";
import * as THREE from "three";
import { useDomToFiberContext } from "../contexts/DomToFiberContext";
import Plane from "./Plane";

const Renderer = () => {
    const { camera } = useThree();
    const { getRefs } = useDomToFiberContext();
    
    const updateViewport = useCallback(() => {
      console.log("update")
      camera.fov = Math.atan(window.innerHeight/2 / camera.position.z) *2 * THREE.MathUtils.RAD2DEG
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix()
    }, [camera])
  
    useEffect(()=>{
      window.addEventListener("resize", updateViewport)
      updateViewport()
    },[updateViewport])

    const currentRefs = getRefs();

    return (
        <group>
            {currentRefs.map((planeEl, index) => {
                console.log('Rendering plane at index:', index, 'element:', planeEl);
                return planeEl && <Plane element={planeEl} key={index} />;
            })}
        </group>
    )
};

export default Renderer;