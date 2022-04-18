import * as React from 'react';

export interface BlankLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BlankLayout({ children, ...props }: BlankLayoutProps): React.ReactElement {
  return <main {...props}>{children}</main>;
}
