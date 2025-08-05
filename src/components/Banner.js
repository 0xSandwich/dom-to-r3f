import React, { forwardRef, useMemo } from "react";
import styled from "styled-components";
import FiberImage from "../lib/components/FiberImage";

const StyledBanner = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;

const Banner = forwardRef(({ index, ...props }, ref) => {
  // Example custom shaders and uniforms
  const customVertexShader = `
    varying vec2 vUv;
    uniform float time;
    void main() {
        vUv = uv;
        vec3 pos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const customFragmentShader = `
    varying vec2 vUv;
    uniform sampler2D planeTexture;
    uniform float time;
    uniform vec3 color;
    void main() {
        vec4 texColor = texture2D(planeTexture, vUv);
        // Add some color variation based on time
        vec3 finalColor = texColor.rgb * color * (0.8 + 0.2 * sin(time));
        gl_FragColor = vec4(finalColor, texColor.a);
    }
  `;

  const customUniforms = useMemo(() => ({
    time: { value: 0.0 },
    color: { value: [1.0, 1.0, 1.0] }
  }), []);

  // Example custom styles - CSS-in-JS string
  const customStyles = `

  `;

  return (
    <StyledBanner>
      <FiberImage
        ref={ref}
        src={`/images/${index+1}.jpg`}
        alt="block"
        index={index}
        vertexShader={customVertexShader}
        fragmentShader={customFragmentShader}
        uniforms={customUniforms}
        styles={customStyles}
        {...props}
      />
      <div>
        <h1>Lorem Ipsum</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>
    </StyledBanner>
  );
});

export default Banner;
