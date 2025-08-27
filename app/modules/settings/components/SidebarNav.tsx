import { useState, type JSX } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SidebarNavProps = React.HTMLAttributes<HTMLElement> & {
  items: {
    url: string;
    title: string;
    icon: LucideIcon;
  }[];
};

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [val, setVal] = useState(pathname ?? '/settings');

  const handleSelect = (e: string) => {
    setVal(e);
    navigate(e);
  };

  return (
    <>
      <div className="p-1 md:hidden">
        <Select value={val} onValueChange={handleSelect}>
          <SelectTrigger className="h-12 sm:w-48">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.url} value={item.url}>
                <div className="flex gap-x-4 px-2 py-1">
                  <span className="scale-125">{<item.icon />}</span>
                  <span className="text-md">{item.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ScrollArea
        type="always"
        className="hidden w-full min-w-40 bg-background px-1 py-2 md:block"
      >
        <nav
          className={cn(
            'flex space-x-2 py-1 lg:flex-col lg:space-y-1 lg:space-x-0',
            className,
          )}
          {...props}
        >
          {items.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === item.url
                  ? 'bg-muted hover:bg-accent'
                  : 'hover:bg-accent hover:underline',
                'justify-start',
              )}
            >
              <span className="me-2">{<item.icon />}</span>
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </>
  );
}
