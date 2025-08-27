import { Main } from '~/components/layout/Main';
import { PageContainer } from '~/components/layout/PageContainer';
import { SidebarNav } from '~/modules/settings/components/SidebarNav';
import { Bell, Monitor, Palette, User, Wrench } from 'lucide-react';
import { Outlet } from 'react-router';
import { Separator } from '@/components/ui/separator';

const sidebarNavItems = [
  {
    title: 'Profile',
    icon: User,
    url: '/settings/profile',
  },
  {
    title: 'Account',
    icon: Wrench,
    url: '/settings/account',
  },
  {
    title: 'Appearance',
    icon: Palette,
    url: '/settings/appearance',
  },
  {
    title: 'Notifications',
    icon: Bell,
    url: '/settings/notifications',
  },
  {
    title: 'Display',
    icon: Monitor,
    url: '/settings/display',
  },
];

const SettingLayout = () => {
  return (
    <Main fixed>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full overflow-y-hidden p-1">
          <Outlet />
        </div>
      </div>
    </Main>
  );
};

export default SettingLayout;
