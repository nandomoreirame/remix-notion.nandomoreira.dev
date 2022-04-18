import type { ContentDatabase } from '~/types';
import { realUuid, title2slug } from './utils';
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoGithub,
  IoLogoWhatsapp,
  IoLogoCodepen,
  IoLogoLinkedin,
  IoLogoDribbble,
  IoLogoBehance,
} from 'react-icons/io5';

const ICONS_DATA = {
  instagram: <IoLogoInstagram title="Instagram" size={32} />,
  twitter: <IoLogoTwitter title="twitter" size={32} />,
  github: <IoLogoGithub title="github" size={32} />,
  whatsapp: <IoLogoWhatsapp title="whatsapp" size={32} />,
  linkedin: <IoLogoLinkedin title="linkedin" size={32} />,
  codepen: <IoLogoCodepen title="codepen" size={32} />,
  dribbble: <IoLogoDribbble title="dribbble" size={32} />,
  behance: <IoLogoBehance title="behance" size={32} />,
};

export function formatMenuLinks<T>(database: ContentDatabase): T[] {
  return database.map(({ id, properties }: ContentDatabase) => ({
    id: realUuid(id),
    title: properties.title.title[0].plain_text,
    slug: title2slug(properties),
  }));
}

export function formatSocialLinks<T>(database: ContentDatabase): T[] {
  return database.map(({ id, properties }: ContentDatabase) => {
    const slug = title2slug(properties);
    return {
      icon: ICONS_DATA[slug],
      id: realUuid(id),
      label: properties.title.title[0].plain_text,
      slug,
      url: properties.url.url,
    };
  });
}
