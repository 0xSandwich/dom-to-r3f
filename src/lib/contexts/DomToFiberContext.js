import React, { createContext, useContext } from 'react';
import useDomToFiber from '../hooks/useDomToFiber';

const DomToFiberContext = createContext();

export const DomToFiberProvider = ({ children }) => {
  const hookValue = useDomToFiber();
  
  return (
    <DomToFiberContext.Provider value={hookValue}>
      {children}
    </DomToFiberContext.Provider>
  );
};

export const useDomToFiberContext = () => {
  const context = useContext(DomToFiberContext);
  if (!context) {
    throw new Error('useDomToFiberContext must be used within a DomToFiberProvider');
  }
  return context;
}; 