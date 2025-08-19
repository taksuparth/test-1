import type { ReactNode } from 'react';

export type StepConfig<SchemaConfig> = {
  title: string;
  schema?: SchemaConfig;
  children: ReactNode | ReactNode[];
};

export type MultiStepContext = {
  current: number;
  next: () => Promise<void>;
  back: () => void;
  goTo: (index: number) => Promise<void>;
  isFirst: boolean;
  isLast: boolean;
  steps: StepConfig[];
};
