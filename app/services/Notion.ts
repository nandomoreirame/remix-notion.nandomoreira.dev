import { APIErrorCode, Client as NotionClient } from '@notionhq/client';
import type { ListUsersParameters, QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';

class NotionService {
  notion: NotionClient;
  markdown: NotionToMarkdown;

  constructor() {
    this.notion = new NotionClient({ auth: process.env.NOTION_ACCESS_TOKEN });
    this.n2m = new NotionToMarkdown({ notionClient: this.notion });
  }

  async page2markdownString(pageId: string) {
    const mdBlocks = await this.n2m.pageToMarkdown(pageId);
    return this.n2m.toMarkdownString(mdBlocks);
  }

  async getUsers<T>(params: ListUsersParameters = {}): Promise<Array<T>> {
    try {
      const { results } = await this.notion.users.list(params);
      return results;
    } catch (error) {
      if (error.code === APIErrorCode.ObjectNotFound) {
        //
        // For example: handle by asking the user to select a different database
        //
      } else {
        // Other error handling code
        console.error({ error });
      }
    }
  }

  async getDatabaseDataPage<T>(databaseId: string, params: QueryDatabaseParameters = {}): Promise<Array<T>> {
    try {
      const { filter, ...restParams } = params;

      let _filter = {
        property: 'published', // notion database "published" property
        checkbox: {
          equals: true,
        },
      };

      if (filter) {
        _filter = {
          and: [_filter, filter],
        };
      }

      const { results } = await this.notion.databases.query({
        database_id: databaseId,
        filter: _filter,
        sorts: [
          {
            property: 'title', // notion database "title" property
            direction: 'descending',
          },
          {
            property: 'created', // notion database "created" property
            direction: 'ascending',
          },
          {
            property: 'updated', // notion database "updated" property
            direction: 'ascending',
          },
        ],
        ...restParams,
      });

      return results;
    } catch (error) {
      if (error.code === APIErrorCode.ObjectNotFound) {
        //
        // For example: handle by asking the user to select a different database
        //
      } else {
        // Other error handling code
        console.error({ error });
      }
    }
  }
}

export const notionService = new NotionService();
