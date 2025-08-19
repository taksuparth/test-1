import { MultiStepForm } from '~/components/organisms/multiStepForm';

export default function EntityForm() {
  return (
    <div className="h-screen w-screen">
      <MultiStepForm onSubmit={console.log}>
        <MultiStepForm.Step title="Basic info">
          <div>Hello</div>
        </MultiStepForm.Step>
        <MultiStepForm.Step title="Additional info">
          <div>Hi</div>
        </MultiStepForm.Step>
        <MultiStepForm.Step title="Review">
          <div>Review</div>
        </MultiStepForm.Step>
      </MultiStepForm>
    </div>
  );
}
