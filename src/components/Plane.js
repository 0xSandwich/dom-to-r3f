import React, { useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const Plane = ({ element }) => {
  // Create texture
  let imageSrc = element.current.attributes.getNamedItem("src").value;
  const imageMap = useLoader(TextureLoader, imageSrc);

  const [pos, setPos] = useState({ x: -3.32, y: 0 });
  const [size, setSize] = useState({ w: 7, h: 3.8 });

  const getPlanePos = () => {
    const boundingRect = element.current.getBoundingClientRect();
    const docWidth = window.innerWidth;
    const docHeight = window.innerHeight;
    // get size of the element
    let sizeX = (boundingRect.width / 100) * 2;
    let sizeY = (boundingRect.height / 100) * 2;
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
  };

  useEffect(() => {
    getPlanePos();
    window.addEventListener("resize", getPlanePos);
  }, []);

  const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D planeTexture;
  void main() {
      gl_FragColor = texture2D(planeTexture, vUv);
  }
  `;

  const vertexShader = `
  varying vec2 vUv;
  void main() {
      vUv = uv;
      gl_PointSize = 8.0;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `;

  return (
    <mesh position={[pos.x, pos.y, 0]}>
      <planeGeometry attach="geometry" args={[size.w, size.h, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={
          {
            planeTexture: { value: imageMap }
          }
        }
      />
    </mesh>
  );
};

export default Plane;
