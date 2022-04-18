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
  instagram: <IoLogoInstagram title="Instagram" size={22} />,
  twitter: <IoLogoTwitter title="twitter" size={22} />,
  github: <IoLogoGithub title="github" size={22} />,
  whatsapp: <IoLogoWhatsapp title="whatsapp" size={22} />,
  linkedin: <IoLogoLinkedin title="linkedin" size={22} />,
  codepen: <IoLogoCodepen title="codepen" size={22} />,
  dribbble: <IoLogoDribbble title="dribbble" size={22} />,
  behance: <IoLogoBehance title="behance" size={22} />,
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
