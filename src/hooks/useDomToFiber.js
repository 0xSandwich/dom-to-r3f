import { useRef, useCallback, useMemo } from 'react';

const useDomToFiber = () => {
  const domRefs = useRef([]);

  const registerRef = useCallback((index, ref) => {
    console.log('Registering ref at index:', index, 'ref:', ref);
    domRefs.current[index] = ref;
    console.log('Current refs:', domRefs.current);
  }, []);

  const getRefs = useCallback(() => {
    console.log('Getting refs:', domRefs.current);
    return domRefs.current;
  }, []);

  // Memoize the return value to prevent unnecessary re-renders
  const hookValue = useMemo(() => ({
    registerRef,
    getRefs
  }), [registerRef, getRefs]);

  return hookValue;
};

export default useDomToFiber;
