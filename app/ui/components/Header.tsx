import * as React from 'react';
import { NavLink } from '@remix-run/react';
import { PageMenu } from './PageMenu';

export interface HeaderProps {
  menuLinks?: PageMenuLink[];
}

export function Header({ menuLinks }: HeaderProps): React.ReactElement {
  return (
    <header className="header">
      <div className="header__inner container">
        <NavLink className="header__logo" to="/" end>
          <span>
            nando<strong>moreira</strong>
          </span>{' '}
          <sup>beta</sup>
        </NavLink>
        {menuLinks && <PageMenu links={menuLinks} />}
      </div>
    </header>
  );
}
