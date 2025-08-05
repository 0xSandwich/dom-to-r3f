import React, { forwardRef, useCallback, useRef, useEffect } from 'react';
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
  uniforms = {},
  onUniformUpdate,
  styles,
  ...props
}, ref) => {
  const { registerRef } = useDomToFiberContext();
  const uniformsRef = useRef();
  const elementRef = useRef();

  // Create the uniforms object only once
  if (!uniformsRef.current) {
    uniformsRef.current = { ...uniforms };
  }

  // Keep uniformsRef values in sync with incoming uniforms (but not the object reference)
  useEffect(() => {
    Object.keys(uniforms).forEach(key => {
      uniformsRef.current[key] = uniforms[key];
    });
  }, [uniforms]);

  // Register only once when the DOM element mounts
  useEffect(() => {
    if (elementRef.current && registerRef) {
      registerRef(index, {
        current: elementRef.current,
        vertexShader,
        fragmentShader,
        uniforms: uniformsRef.current,
        onUniformUpdate
      });
    }
    // No cleanup needed; registration is idempotent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerRef, index, vertexShader, fragmentShader, onUniformUpdate]);

  // Forward the ref
  const setRef = useCallback((el) => {
    elementRef.current = el;
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  }, [ref]);

  return (
    <StyledImage
      ref={setRef}
      src={src}
      alt={alt}
      {...props}
    />
  );
});

export default FiberImage; 