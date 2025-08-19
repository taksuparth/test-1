import type { ReactNode } from 'react';
import type { StepConfig } from '../types';

const Step = <SchemaConfig,>({
  title,
  schema,
  children,
}: StepConfig<SchemaConfig>) => {
  return <>{children}</>;
};

export { Step };
