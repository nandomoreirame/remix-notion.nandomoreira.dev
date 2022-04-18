import { notionService } from '~/services';

const { NOTION_CONTENTS_DATABASE_ID } = process.env;

export async function getSocialLinks() {
  return await notionService.getDatabaseDataPage<ContentDatabase>(NOTION_CONTENTS_DATABASE_ID, {
    filter: {
      property: 'category', // notion database "category" property
      select: {
        equals: 'socialLink',
      },
    },
  });
}

export async function getStaticPageLinks() {
  return await notionService.getDatabaseDataPage<ContentDatabase>(NOTION_CONTENTS_DATABASE_ID, {
    filter: {
      property: 'category', // notion database "category" property
      select: {
        equals: 'staticPage',
      },
    },
  });
}

export async function getContent<T>() {
  return await notionService.getDatabaseDataPage<T>(NOTION_CONTENTS_DATABASE_ID, {
    filter: {
      property: 'category', // notion database "category" property
      select: {
        equals: 'content',
      },
    },
  });
}

export async function getStaticPage<T>(pageSlug: string) {
  return await notionService.getDatabaseDataPage<T>(NOTION_CONTENTS_DATABASE_ID, {
    filter: {
      property: 'slug',
      rich_text: {
        equals: pageSlug,
      },
    },
  });
}
