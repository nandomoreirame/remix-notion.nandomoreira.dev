import { NavLink } from '@remix-run/react';
import * as React from 'react';

export interface PageMenuLink {
  title: string;
  path: string;
  slug?: string;
}

export interface PageMenuProps {
  links?: PageMenuLink[];
}

export function PageMenu({ links = [] }: PageMenuProps): React.ReactElement {
  return (
    <nav className="pageMenu">
      {links.length > 0 &&
        links.map(({ title, path }, k) => (
          <NavLink key={k} className="pageMenu__link" to={`${path}`}>
            {title}
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
