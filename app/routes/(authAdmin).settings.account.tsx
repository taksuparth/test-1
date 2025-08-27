import { AccountForm } from '~/modules/settings/components/AccountForm';
import { ContentSection } from '~/modules/settings/components/ContentSection';

export default function SettingsAccount() {
  return (
    <ContentSection
      title="Account"
      desc="Update your account settings. Set your preferred language and
          timezone."
    >
      <AccountForm />
    </ContentSection>
  );
}
