import { ContentSection } from '~/modules/settings/components/ContentSection';
import { NotificationsForm } from '~/modules/settings/components/NotificationForm';

export default function SettingsNotifications() {
  return (
    <ContentSection
      title="Notifications"
      desc="Configure how you receive notifications."
    >
      <NotificationsForm />
    </ContentSection>
  );
}
