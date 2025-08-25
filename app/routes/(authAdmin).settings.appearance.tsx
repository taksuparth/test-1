import { AppearanceForm } from '~/modules/settings/components/AppearanceForm';
import { ContentSection } from '~/modules/settings/components/ContentSection';

export default function SettingsAppearance() {
  return (
    <ContentSection
      title="Appearance"
      desc="Customize the appearance of the app. Automatically switch between day
          and night themes."
    >
      <AppearanceForm />
    </ContentSection>
  );
}
