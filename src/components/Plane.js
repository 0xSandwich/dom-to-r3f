import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Plane = ({ element }) => {
  // Create texture
  const imageSrc = element.current.attributes.getNamedItem("src").value;
  const imageMap = useLoader(TextureLoader, imageSrc);

  const [pos, setPos] = useState({ x: -3.32, y: 0 });
  const [size, setSize] = useState({ w: 7, h: 3.8 });
  const materialRef = useRef();

  const getPlanePos = useCallback(() => {
    if (!element.current) return;
    
    const boundingRect = element.current.getBoundingClientRect();
    const docWidth = window.innerWidth;
    const docHeight = window.innerHeight;
    // get size of the element
    const sizeX = (boundingRect.width / 100) * 2;
    const sizeY = (boundingRect.height / 100) * 2;
    // get origin of document
    const originX = sizeX / 2 - docWidth / 100;
    const originY = sizeY / 2 - docHeight / 100;
    // get space between the origin and the element
    const spaceX = (boundingRect.x / 100) * 2;
    const spaceY = (boundingRect.y / 100) * 2;
    // get scrolled height (in case of resize during scroll or refresh)
    const scrolledHeight = (window.pageYOffset / 100) * 2;
    
    setSize({
      w: sizeX,
      h: sizeY
    });
    setPos({
      x: originX + spaceX,
      y: -(originY + spaceY + scrolledHeight)
    });
  }, [element]);

  useEffect(() => {
    getPlanePos();
    window.addEventListener("resize", getPlanePos, { passive: true });
    return () => window.removeEventListener("resize", getPlanePos);
  }, [getPlanePos]);

  // Update uniforms in animation frame - generic approach
  useFrame((state) => {
    if (materialRef.current && element.uniforms) {
      // Call custom uniform update function if provided
      if (element.onUniformUpdate) {
        element.onUniformUpdate(materialRef.current.uniforms, state);
      }
      
      // Default time uniform update if it exists
      if (materialRef.current.uniforms.time) {
        materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      }
    }
  });

  // Get shader props from the element (passed through FiberImage)
  const vertexShader = element.vertexShader || `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_PointSize = 8.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = element.fragmentShader || `
    varying vec2 vUv;
    uniform sampler2D planeTexture;
    void main() {
        gl_FragColor = texture2D(planeTexture, vUv);
    }
  `;

  // Memoize uniforms to prevent recreation
  const uniforms = useMemo(() => {
    const baseUniforms = {
      planeTexture: { value: imageMap }
    };
    
    // Merge with custom uniforms if provided
    if (element.uniforms) {
      return { ...baseUniforms, ...element.uniforms };
    }
    
    return baseUniforms;
  }, [imageMap, element.uniforms]);

  return (
    <mesh position={[pos.x, pos.y, 0]}>
      <planeGeometry attach="geometry" args={[size.w, size.h, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Plane;
