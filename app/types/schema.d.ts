import type { NotionDatabaseProperties, NotionObjectPage } from './notion';

export type ContentDatabase = NotionObjectPage & {
  properties: NotionDatabaseProperties;
};

export type User = {
  object: string;
  id: string;
  name: string;
  avatar_url: string;
  type: string;
  person: {
    email: string;
  };
};
