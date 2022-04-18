import slugify from 'slugify';

export function title2slug(properties): string {
  const slugTitle = slugify(properties?.title?.title[0]?.plain_text || '', { replacement: '-', lower: true });
  return properties?.slug?.rich_text[0]?.plain_text || slugTitle;
}

export function realUuid(uuid: string): string {
  return uuid.replace(/-/g, '');
}
