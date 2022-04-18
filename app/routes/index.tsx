import { json } from '@remix-run/node';
import type { ContentDatabase, User } from '~/types';
import { api, notionService } from '~/services';
import { formatPageContents, formatSocialLinks, realUuid } from '~/presenters';
import { useLoaderData } from '@remix-run/react';
import { marked } from 'marked';
import type { SocialLink } from '~/ui';
import { Hero } from '~/ui';

import homeStyles from '~/ui/styles/css/home.css';

export function links() {
  return [{ rel: 'stylesheet', href: homeStyles }];
}

type LoaderData = {
  content: string;
  description: string;
  socialLinks: ContentDatabase[];
  title: string;
  user: User;
};

export async function loader() {
  const contentBlock = await api.getContent<ContentDatabase>();
  const content = contentBlock.filter(
    ({ properties }: ContentDatabase) => properties.slug?.rich_text[0]?.plain_text === 'hero',
  );
  const contentFormated = formatPageContents(content[0]);
  const markdown = await notionService.page2markdownString(realUuid(contentFormated?.id));

  const users = await notionService.getUsers<User>();
  const user = users.filter(({ type }) => type === 'person')[0];

  const socialLinks = await api.getSocialLinks();

  // return json(user);
  return json<LoaderData>({
    content: marked(markdown),
    description: contentFormated.description,
    socialLinks,
    title: contentFormated.title,
    user,
  });
}

export const meta: MetaFunction = ({ data }) => {
  const { title, description } = data as LoaderData;
  return { title, description };
};

export default function () {
  const { user, content, socialLinks } = useLoaderData<LoaderData>();
  return <Hero user={user} content={content} socialLinks={formatSocialLinks<SocialLink>(socialLinks)} />;
}
