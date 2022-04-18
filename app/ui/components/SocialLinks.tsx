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
}

export function SocialLinks({ links = [] }: SocialLinksProps): React.ReactElement {
  return (
    <ul className="socialLinks">
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
