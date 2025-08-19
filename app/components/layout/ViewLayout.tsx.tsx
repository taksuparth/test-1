import type { ReactNode } from 'react';
import type { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const ViewLayout = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  return <>{children}</>;
};

const Header = ({ children }: { children?: ReactNode | ReactNode[] }) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex flex-1 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex flex-1 flex-row items-center justify-between">
          {children}
        </div>
      </div>
    </header>
  );
};

Header.Title = ({ children }: { children: ReactNode }) => {
  return <h1>{children}</h1>;
};

Header.Actions = ({
  className,
  children,
}: {
  className?: ClassValue;
  children: ReactNode | ReactNode[];
}) => {
  return (
    <div className={cn('flex flex-row items-center gap-2', className)}>
      {children}
    </div>
  );
};

ViewLayout.Header = Header;

ViewLayout.Body = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <div className="min-h-[100vh] flex-1 rounded-xl bg-background p-4 pt-0 md:min-h-min">
      {children}
    </div>
  );
};
