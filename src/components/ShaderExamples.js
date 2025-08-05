import React, { useRef, useCallback } from 'react';
import FiberImage from '../lib/components/FiberImage';

// Example 1: Basic wave effect with custom styles
export const WaveEffectExample = React.memo(({ index }) => {
  const onUniformUpdate = useCallback((uniforms, state) => {
    if (uniforms.time) {
      uniforms.time.value = state.clock.elapsedTime;
    }
  }, []);

  const vertexShader = `
    varying vec2 vUv;
    uniform float time;
    void main() {
        vUv = uv;
        vec3 pos = position;
        // Add wave effect to the plane
        pos.z += sin(pos.x * 5.0 + time) * 0.2;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D planeTexture;
    void main() {
        gl_FragColor = texture2D(planeTexture, vUv);
    }
  `;

  const uniforms = {
    time: { value: 0.0 }
  };

  const styles = `
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  `;

  return (
    <FiberImage
      src="images/3.jpg"
      alt="Wave effect"
      index={index}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      onUniformUpdate={onUniformUpdate}
      styles={styles}
    />
  );
});

// Example 2: Color shift effect with inline styles
export const ColorShiftExample = React.memo(({ index }) => {
  const onUniformUpdate = useCallback((uniforms, state) => {
    if (uniforms.time) {
      uniforms.time.value = state.clock.elapsedTime;
    }
  }, []);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D planeTexture;
    uniform float time;
    uniform vec3 colorShift;
    void main() {
        vec4 texColor = texture2D(planeTexture, vUv);
        vec3 shiftedColor = texColor.rgb + colorShift * sin(time);
        gl_FragColor = vec4(shiftedColor, texColor.a);
    }
  `;

  const uniforms = {
    time: { value: 0.0 },
    colorShift: { value: [0.1, 0.2, 0.3] }
  };

  const inlineStyles = {
  };

  return (
    <FiberImage
      src="images/2.jpg"
      alt="Color shift"
      index={index}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      onUniformUpdate={onUniformUpdate}
      style={inlineStyles}
    />
  );
});

// Example 3: Displacement mapping with mixed styles
export const DisplacementExample = React.memo(({ index }) => {
  const onUniformUpdate = useCallback((uniforms, state) => {
    if (uniforms.time) {
      uniforms.time.value = state.clock.elapsedTime;
    }
  }, []);

  const vertexShader = `
    varying vec2 vUv;
    uniform float time;
    uniform float displacement;
    void main() {
        vUv = uv;
        vec3 pos = position;
        // Create displacement based on UV coordinates and time
        float disp = sin(pos.x * 10.0 + time) * cos(pos.y * 5.0 + time) * displacement;
        pos.z += disp;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D planeTexture;
    void main() {
        gl_FragColor = texture2D(planeTexture, vUv);
    }
  `;

  const uniforms = {
    time: { value: 0.0 },
    displacement: { value: 0.05 }
  };

  const styles = `
    border-radius: 50%;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
  `;

  const inlineStyles = {
  };

  return (
    <FiberImage
      src="images/1.jpg"
      alt="Displacement"
      index={index}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      onUniformUpdate={onUniformUpdate}
      styles={styles}
      style={inlineStyles}
    />
  );
});

// Example 4: Pixelation effect with minimal styles
export const PixelationExample = React.memo(({ index }) => {
  const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D planeTexture;
    uniform float pixelSize;
    void main() {
        vec2 uv = floor(vUv / pixelSize) * pixelSize;
        gl_FragColor = texture2D(planeTexture, uv);
    }
  `;

  const uniforms = {
    pixelSize: { value: 0.01 }
  };

  const styles = `
  `;

  return (
    <FiberImage
      src="images/4.jpg"
      alt="Pixelation"
      index={index}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      styles={styles}
    />
  );
});

// Example 5: No shader effects, just custom styling
export const StyledOnlyExample = React.memo(({ index }) => {
  const styles = `
  `;

  return (
    <FiberImage
      src="images/1.jpg"
      alt="Styled only"
      index={index}
      styles={styles}
    />
  );
});

// Example 6: Curtains.js wave effect reproduction with user-controlled logic
export const CurtainsWaveExample = React.memo(({ index }) => {
  // Curtains.js style deformation tracking
  const planesDeformations = useRef(0);
  const lastScrollY = useRef(0);

  // Lerp function for smooth interpolation
  const lerp = useCallback((from, to, factor) => {
    return from + (to - from) * factor;
  }, []);

  // Custom uniform update function
  const onUniformUpdate = useCallback((uniforms, state) => {
    // Get scroll delta
    const currentScrollY = window.pageYOffset;
    let deltaY = currentScrollY - lastScrollY.current;
    lastScrollY.current = currentScrollY;
    
    // Invert value for the effect (like in curtains.js)
    deltaY = -deltaY;
    
    // Apply threshold (like in curtains.js)
    if (deltaY > 60) {
      deltaY = 60;
    } else if (deltaY < -60) {
      deltaY = -60;
    }
    
    // Update deformation with lerp if delta is larger
    if (Math.abs(deltaY) > Math.abs(planesDeformations.current)) {
      planesDeformations.current = lerp(planesDeformations.current, deltaY, 0.2);
    }
    
    // Apply lerp to smooth out the deformation
    planesDeformations.current = lerp(planesDeformations.current, 0, 0.075);
    
    // Update uniforms
    if (uniforms.planeDeformation) {
      uniforms.planeDeformation.value = planesDeformations.current;
    }
    
    if (uniforms.textureScale) {
      const scale = 1 + (planesDeformations.current / 300);
      uniforms.textureScale.value = [scale, scale];
    }
  }, [lerp]);

  const vertexShader = `
    varying vec2 vUv;
    uniform float planeDeformation;
    uniform vec2 textureScale;
    
    void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Cool effect on scroll - sine wave deformation based on vertex position
        pos.y += sin(((pos.x + 1.0) / 2.0) * 3.141592) * (sin(planeDeformation / 90.0));
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D planeTexture;
    uniform vec2 textureScale;
    
    void main() {
        // Apply texture scaling for additional distortion effect
        vec2 scaledUv = (vUv - 0.5) * textureScale + 0.5;
        gl_FragColor = texture2D(planeTexture, scaledUv);
    }
  `;

  const uniforms = {
    planeDeformation: { value: 0.0 },
    textureScale: { value: [1.0, 1.0] }
  };

  const styles = `
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  `;

  return (
    <FiberImage
      src="images/2.jpg"
      alt="Curtains wave effect"
      index={index}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      onUniformUpdate={onUniformUpdate}
      styles={styles}
    />
  );
});

// Example 7: Mouse-based distortion effect
export const MouseDistortionExample = React.memo(({ index }) => {
  const mousePosition = useRef({ x: 0, y: 0 });

  // Track mouse position
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const onUniformUpdate = useCallback((uniforms, state) => {
    if (uniforms.mousePosition) {
      uniforms.mousePosition.value = [mousePosition.current.x, mousePosition.current.y];
    }
    if (uniforms.time) {
      uniforms.time.value = state.clock.elapsedTime;
    }
  }, []);

  const vertexShader = `
    varying vec2 vUv;
    uniform vec2 mousePosition;
    uniform float time;
    
    void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Create ripple effect from mouse position
        // Convert position to normalized coordinates (-1 to 1)
        vec2 normalizedPos = pos.xy / 3.5; // Adjust based on plane size
        float distance = length(normalizedPos - mousePosition);
        float ripple = sin(distance * 8.0 - time * 3.0) * 0.2;
        pos.z += ripple * exp(-distance * 3.0);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D planeTexture;
    uniform vec2 mousePosition;
    
    void main() {
        // Add subtle UV distortion based on mouse position
        vec2 uv = vUv;
        float distance = length(vUv - (mousePosition * 0.5 + 0.5));
        uv += (mousePosition * 0.1) * exp(-distance * 2.0);
        
        gl_FragColor = texture2D(planeTexture, uv);
    }
  `;

  const uniforms = {
    mousePosition: { value: [0, 0] },
    time: { value: 0.0 }
  };

  const styles = `
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    cursor: crosshair;
  `;

  return (
    <FiberImage
      src="images/3.jpg"
      alt="Mouse distortion"
      index={index}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      onUniformUpdate={onUniformUpdate}
      styles={styles}
    />
  );
});

// Example 8: Audio-reactive effect (simulated)
export const AudioReactiveExample = ({ index }) => {
  const audioLevel = useRef(0);

  // Simulate audio levels with sine wave
  const onUniformUpdate = useCallback((uniforms, state) => {
    // Simulate audio input with sine wave
    audioLevel.current = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5;
    
    if (uniforms.audioLevel) {
      uniforms.audioLevel.value = audioLevel.current;
    }
    if (uniforms.time) {
      uniforms.time.value = state.clock.elapsedTime;
    }
  }, []);

  const vertexShader = `
    varying vec2 vUv;
    uniform float audioLevel;
    uniform float time;
    
    void main() {
        vUv = uv;
        vec3 pos = position;
        
        // Audio-reactive displacement
        float displacement = audioLevel * 0.2;
        pos.z += sin(pos.x * 8.0 + time * 3.0) * displacement;
        pos.z += cos(pos.y * 6.0 + time * 2.0) * displacement;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D planeTexture;
    uniform float audioLevel;
    
    void main() {
        vec4 texColor = texture2D(planeTexture, vUv);
        // Add color intensity based on audio level
        vec3 enhancedColor = texColor.rgb * (1.0 + audioLevel * 0.3);
        gl_FragColor = vec4(enhancedColor, texColor.a);
    }
  `;

  const uniforms = {
    audioLevel: { value: 0.0 },
    time: { value: 0.0 }
  };

  const styles = `
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(255, 0, 255, 0.2);
  `;

  return (
    <FiberImage
      src="images/4.jpg"
      alt="Audio reactive"
      index={index}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      onUniformUpdate={onUniformUpdate}
      styles={styles}
    />
  );
}; 