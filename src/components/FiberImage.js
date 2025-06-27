import React, { forwardRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useDomToFiberContext } from '../contexts/DomToFiberContext';

const StyledImage = styled.img`
  width: 200%;
  height: auto;
  visibility: hidden !important;
  opacity: 0.9;
`;

const FiberImage = forwardRef(({ src, alt, index, ...props }, ref) => {
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
      registerRef(index, { current: element });
    }
  }, [ref, registerRef, index]);

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