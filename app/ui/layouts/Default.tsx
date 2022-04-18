import * as React from 'react';
import type { PageMenuLink } from '~/ui/components';
import { Header } from '~/ui/components';
import { BlankLayout } from './Blank';

export interface DefaultLayoutProps {
  children: React.ReactNode;
  menuLinks?: PageMenuLink[];
}

export function DefaultLayout({ children, menuLinks }: DefaultLayoutProps): React.ReactElement {
  return (
    <BlankLayout className="mainLayout">
      <Header menuLinks={menuLinks} />
      {children}
    </BlankLayout>
  );
}
