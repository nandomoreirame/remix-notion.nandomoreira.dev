import type { ContentDatabase } from '~/types';
import { realUuid, title2slug } from './utils';
import {
  RiInstagramLine,
  RiTwitterLine,
  RiGithubLine,
  RiWhatsappLine,
  RiCodepenLine,
  RiLinkedinBoxLine,
  RiDribbbleLine,
  RiBehanceLine,
} from 'react-icons/ri';

const ICONS_DATA = {
  instagram: <RiInstagramLine title="Instagram" size={32} />,
  twitter: <RiTwitterLine title="twitter" size={32} />,
  github: <RiGithubLine title="github" size={32} />,
  whatsapp: <RiWhatsappLine title="whatsapp" size={32} />,
  linkedin: <RiLinkedinBoxLine title="linkedin" size={32} />,
  codepen: <RiCodepenLine title="codepen" size={32} />,
  dribbble: <RiDribbbleLine title="dribbble" size={32} />,
  behance: <RiBehanceLine title="behance" size={32} />,
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
