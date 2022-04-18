import * as React from 'react';

export interface SocialLink {
  icon: JSX.Element;
  id: string;
  label: string;
  slug: string;
  url: string;
}

export interface SocialLinksProps {
  links?: SocialLink[];
  line?: boolean;
}

export function SocialLinks({ links = [], line = false }: SocialLinksProps): React.ReactElement {
  return (
    <ul className={`socialLinks ${line ? '--line' : ''}`}>
      {links.length > 0 &&
        links.map(({ label, icon, id, url }) => (
          <li key={id} className="socialLinks__item">
            <a target="_blank" href={url} rel="noreferrer" className="socialLinks__link" title={`ir para ${label}`}>
              {icon}
            </a>
          </li>
        ))}
    </ul>
  );
}
