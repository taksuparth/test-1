import React, { Children, isValidElement, useMemo } from 'react';
import {
  FormProvider,
  type DefaultValues,
  type FieldValues,
  type UseFormProps,
} from 'react-hook-form';
import type { $ZodType, $ZodTypeInternals } from 'zod/v4/core';
import { Button } from '@/components/ui/button';
import { Step } from './components/Step';
import { MultiStepContextProvider } from './context';
import { useMultiStepForm } from './hooks/useMultiStepForm';
import type { MultiStepContext, StepConfig } from './types';

function MultiStepForm<
  FieldValue extends FieldValues = FieldValues,
  SchemaConfig extends $ZodType<
    unknown,
    FieldValues,
    $ZodTypeInternals<unknown, FieldValues>
  > = $ZodType<unknown, FieldValues, $ZodTypeInternals<unknown, FieldValues>>,
>({
  children,
  onSubmit,
  defaultValues,
  formConfig,
}: {
  children: React.ReactNode;
  onSubmit: (data: FieldValue) => void;
  defaultValues?: DefaultValues<FieldValue>;
  formConfig?: Omit<UseFormProps<FieldValue>, 'defaultValues'>;
}) {
  const steps = useMemo<StepConfig<SchemaConfig>[]>(() => {
    return Children.toArray(children)
      .filter((c) => isValidElement(c) && c.type === Step)
      .map((c: any) => ({
        title: c.props.title,
        schema: c.props.schema,
        children: c.props.children,
      }));
  }, [children]);

  const { activeStep, next, back, goTo, isFirst, isLast, form } =
    useMultiStepForm({
      formConfig,
      defaultValues,
      steps,
    });

  const ctxValue: MultiStepContext = {
    current: activeStep,
    next,
    back,
    goTo,
    isFirst,
    isLast,
    steps,
  };

  const activeContent = steps[activeStep].children;

  return (
    <FormProvider {...form}>
      <MultiStepContextProvider value={ctxValue}>
        <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row">
          {/* Sidebar */}
          <aside className="w-full bg-gray-50 p-6 md:w-1/4">
            <h2 className="mb-4 text-lg font-semibold">Steps</h2>
            <ol className="space-y-3">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <button
                    onClick={() => ctxValue.goTo(i)}
                    className={`w-full text-left ${i === activeStep ? 'font-bold text-indigo-600' : 'text-gray-700'}`}
                  >
                    {i + 1}. {s.title}
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          {/* Form Content */}
          <section className="flex-1 p-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {activeContent}

              <div className="flex justify-between pt-4">
                <div>
                  {!isFirst && (
                    <Button variant="secondary" onClick={back} type="button">
                      Back
                    </Button>
                  )}
                </div>
                <div className="space-x-2">
                  {!isLast ? (
                    <Button onClick={next} type="button">
                      Next
                    </Button>
                  ) : (
                    <Button type="submit">Submit</Button>
                  )}
                </div>
              </div>
            </form>
          </section>
        </div>
      </MultiStepContextProvider>
    </FormProvider>
  );
}

MultiStepForm.Step = Step;

export { MultiStepForm };
