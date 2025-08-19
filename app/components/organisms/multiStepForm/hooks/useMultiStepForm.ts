import { useCallback, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type UseFormProps,
} from 'react-hook-form';
import type { $ZodType, $ZodTypeInternals } from 'zod/v4/core';
import type { StepConfig } from '../types';

export const useMultiStepForm = <
  FieldValue extends FieldValues = FieldValues,
  SchemaConfig extends $ZodType<
    unknown,
    FieldValues,
    $ZodTypeInternals<any, FieldValues>
  > = $ZodType<any, any, $ZodTypeInternals<unknown, FieldValues>>,
>({
  steps,
  defaultValues,
  formConfig,
}: {
  steps: StepConfig<SchemaConfig>[];
  defaultValues?: DefaultValues<FieldValue>;
  formConfig?: Omit<UseFormProps<FieldValue>, 'defaultValues'>;
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const activeSchema = steps[activeStep]?.schema;

  const form = useForm<FieldValue>({
    mode: 'onTouched',
    shouldFocusError: true,
    ...formConfig,
    defaultValues,
    resolver: activeSchema ? zodResolver(activeSchema) : undefined,
  });

  const { trigger } = form;
  const isFirst = activeStep === 0;
  const isLast = activeStep === steps.length - 1;

  const next = useCallback(async () => {
    if (activeSchema) {
      const valid = await trigger();
      if (!valid) return;
    }
    if (!isLast) setActiveStep((i) => i + 1);
  }, [activeSchema, trigger, isLast]);

  const back = useCallback(() => {
    if (!isFirst) setActiveStep((i) => i - 1);
  }, [isFirst]);

  const goTo = useCallback(
    async (i: number) => {
      if (i > activeStep) {
        // validate all intermediate
        for (let step = activeStep; step < i; step++) {
          const schema = steps[step].schema;
          if (schema) {
            const valid = await trigger();
            if (!valid) return;
          }
        }
      }
      setActiveStep(i);
    },
    [activeStep, steps, trigger],
  );

  return { goTo, back, next, form, isFirst, isLast, activeStep };
};
