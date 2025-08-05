import { useRef, useCallback, useMemo } from 'react';

const useDomToFiber = () => {
  const domRefs = useRef([]);

  const registerRef = useCallback((index, ref) => {
    domRefs.current[index] = ref;
  }, []);

  const getRefs = useCallback(() => {
    return domRefs.current;
  }, []);

  const hookValue = useMemo(() => ({
    registerRef,
    getRefs
  }), [registerRef, getRefs]);

  return hookValue;
};

export default useDomToFiber;
