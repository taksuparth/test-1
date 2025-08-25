import { ContentSection } from '~/modules/settings/components/ContentSection';
import { ProfileForm } from '~/modules/settings/components/ProfileForm';

export default function SettingsProfile() {
  return (
    <ContentSection
      title="Profile"
      desc="This is how others will see you on the site."
    >
      <ProfileForm />
    </ContentSection>
  );
}
