import React, { forwardRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useDomToFiberContext } from '../contexts/DomToFiberContext';

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  visibility: hidden !important;
`;

/**
 * FiberImage component that renders a DOM image and registers it for Three.js conversion
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {number} props.index - Index for registration in the context
 * @param {string} [props.vertexShader] - Custom vertex shader code
 * @param {string} [props.fragmentShader] - Custom fragment shader code
 * @param {Object} [props.uniforms] - Custom uniforms object for shaders
 * @param {Function} [props.onUniformUpdate] - Callback for custom uniform updates
 * @param {string|Object} [props.styles] - Custom CSS styles (string for CSS-in-JS, object for inline styles)
 * @param {React.Ref} ref - Forwarded ref
 */
const FiberImage = forwardRef(({ 
  src, 
  alt, 
  index, 
  vertexShader, 
  fragmentShader, 
  uniforms, 
  onUniformUpdate,
  styles,
  ...props 
}, ref) => {
  const { registerRef } = useDomToFiberContext();
  
  const setRef = useCallback((element) => {
    // Call the forwardRef
    if (typeof ref === 'function') {
      ref(element);
    } else if (ref) {
      ref.current = element;
    }
    
    // Register with our hook
    if (element && registerRef) {
      console.log('FiberImage registering element:', element, 'at index:', index);
      registerRef(index, { 
        current: element,
        vertexShader,
        fragmentShader,
        uniforms,
        onUniformUpdate
      });
    }
  }, [ref, registerRef, index, vertexShader, fragmentShader, uniforms, onUniformUpdate]);

  // Memoize the component to prevent unnecessary re-renders
  const memoizedComponent = useMemo(() => (
    <StyledImage
      ref={setRef}
      src={src}
      alt={alt}
      {...props}
    />
  ), [setRef, src, alt, props]);

  return memoizedComponent;
});

export default FiberImage; 