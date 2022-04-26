import { NavLink, useLocation } from '@remix-run/react';
import * as React from 'react';

export interface PageMenuLink {
  title: string;
  path: string;
  slug?: string;
  icon?: React.ReactNode;
  activeIcon?: Reat.ReactNode;
}

export interface PageMenuProps {
  links?: PageMenuLink[];
}

export function PageMenu({ links = [] }: PageMenuProps): React.ReactElement {
  let { pathname } = useLocation();

  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ pathname });
  }, [pathname]);

  return (
    <nav className="pageMenu">
      {links.length > 0 &&
        links.map(({ title, path, icon, activeIcon }, k) => (
          <NavLink key={k} className={`pageMenu__link`} to={`${path}`}>
            <i className={`pageMenu__icon --activeIcon`}>{activeIcon}</i>
            <i className={`pageMenu__icon --nonActiveIcon`}>{icon}</i>
            <span>{title}</span>
          </NavLink>
        ))}
      <a
        className="pageMenu__link --external"
        href="https://blog.nandomoreira.dev/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Blog
      </a>
    </nav>
  );
}
