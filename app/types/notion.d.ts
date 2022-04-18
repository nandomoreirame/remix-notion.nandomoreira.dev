export type NotionBaseProperty = {
  id: string;
  type: string;
};

export type NotionFile = {
  file: {
    url: string;
    expiry_time: string;
  };
  name: string;
  type: string;
};

export type NotionCover = {
  external: { url: string };
  type: string;
};

export type NotionFiles = NotionBaseProperty & {
  files: Array<NotionFile>;
};

export type NotionIcon = {
  emoji: string;
  type: string;
};

export type NotionObject = {
  object: string;
  id: string;
};

export type NotionDatabaseParent = {
  type: string;
  database_id: string;
};

export type NotionText = {
  content: string | null;
  link: string | null;
};

export type NotionSelect = {
  color: string;
  id: string;
  name: string;
};

export type NotionAnotaions = {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
};

export type NotionTitleProperty = {
  annotations: NotionAnotaions;
  href: string | null;
  plain_text: string;
  text: NotionText;
  type: string;
};

export type NotionNameProperty = NotionBaseProperty & {
  title: NotionTitleProperty[];
};

export type NotionUrlProperty = NotionBaseProperty & {
  url: string;
};

export type NotionPublishedProperty = NotionBaseProperty & {
  checkbox: boolean;
};

export type NotionUpdatedProperty = NotionBaseProperty & {
  last_edited_time: string;
};

export type NotionDatabaseProperties = {
  title: NotionNameProperty;
  published: NotionPublishedProperty;
  url: NotionUrlProperty;
  image: NotionFiles;
  created: NotionUpdatedProperty;
  updated: NotionUpdatedProperty;
};

export type NotionObjectPage = {
  archived: boolean;
  cover: NotionCover | null;
  created_by: NotionObject;
  created_time: string;
  icon: NotionIcon | null;
  id: string;
  last_edited_by: NotionObject;
  last_edited_time: string;
  object: string;
  parent: NotionDatabaseParent;
  url: string;
};
