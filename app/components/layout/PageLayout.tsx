import type { ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { KBar } from '../atoms/kbar';
import Header from '../organisms/Header';

interface PageLayoutProps {
  children?: ReactNode;
  user: { id: string; email: string; name: string };
}

export default function PageLayout({ children = null, user }: PageLayoutProps) {
  return (
    <KBar>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
