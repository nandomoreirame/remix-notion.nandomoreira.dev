import { NavLink } from '@remix-run/react';
import * as React from 'react';
import type { PageMenuLink } from '~/ui/components';
import { PageMenu } from '~/ui/components';
import { BlankLayout } from './Blank';

export interface DefaultLayoutProps {
  children: React.ReactNode;
  menuLinks?: PageMenuLink[];
}

export function DefaultLayout({ children, menuLinks }: DefaultLayoutProps): React.ReactElement {
  return (
    <BlankLayout className="mainLayout">
      <header className="header">
        <div className="header__inner container">
          <NavLink className="header__logo" to="/" end>
            nando<span>moreira</span>
          </NavLink>
          {menuLinks && <PageMenu links={menuLinks} />}
        </div>
      </header>
      {children}
    </BlankLayout>
  );
}
