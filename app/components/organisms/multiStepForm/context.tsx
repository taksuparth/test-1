import { createContext, useContext } from 'react';
import type { MultiStepContext as MultiStepContextTypes } from './types';

const MultiStepContext = createContext<MultiStepContextTypes | null>(null);

export const useMultiStep = () => {
  const ctx = useContext(MultiStepContext);
  if (!ctx) {
    throw new Error('useMultiStep must be inside MultiStepForm');
  }

  return ctx;
};

export const MultiStepContextProvider = MultiStepContext.Provider;
