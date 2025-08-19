import type { ReactNode } from 'react';

export function EntityTableLayout({ children }: { children: ReactNode }) {
  return <div className="w-full space-y-4">{children}</div>;
}

EntityTableLayout.Header = function Header({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex w-full items-center justify-between">{children}</div>
  );
};

EntityTableLayout.Body = function Body({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-md border">{children}</div>
  );
};

EntityTableLayout.Footer = function Footer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex w-full items-center justify-end">{children}</div>;
};
