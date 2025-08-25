import { ContentSection } from '~/modules/settings/components/ContentSection';
import { DisplayForm } from '~/modules/settings/components/DisplayForm';

export default function SettingsDisplay() {
  return (
    <ContentSection
      title="Display"
      desc="Turn items on or off to control what's displayed in the app."
    >
      <DisplayForm />
    </ContentSection>
  );
}
