import * as React from 'react';
import { BlankLayout } from './Blank';

export interface ErrorLayoutProps {
  children: React.ReactNode;
}

export function ErrorLayout({ children }: ErrorLayoutProps): React.ReactElement {
  return (
    <BlankLayout className="pageErrors">
      <div className="pageErrors__inner">{children}</div>
    </BlankLayout>
  );
}
