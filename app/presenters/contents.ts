import type { ContentDatabase } from '~/types';
import { title2slug } from './utils';

export interface PageContents {
  id: string;
  cover: string;
  created: string;
  description: string;
  slug: string;
  tags: string[];
  title: string;
  updated: string;
  url: string;
}

export function formatPageContents({ id, cover, properties }: ContentDatabase): PageContents {
  let _cover = cover;

  switch (cover?.type) {
    case 'file':
      _cover = cover.file.url;
      break;
    case 'external':
      _cover = cover.external.url;
      break;
    default:
      _cover = ''; // __ default image here __
  }

  return {
    id: id,
    cover: _cover,
    created: properties.created.created_time,
    description: properties.description?.rich_text[0]?.plain_text || '',
    slug: title2slug(properties),
    tags: properties.tags?.multi_select,
    title: properties.title.title[0].plain_text,
    updated: properties.updated.last_edited_time,
    url: properties.url?.url || '',
  };
}
