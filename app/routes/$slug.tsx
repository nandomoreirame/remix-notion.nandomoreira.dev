import * as React from 'react';
import type { LoaderSubmission } from '@remix-run/react/transition';
import { useLoaderData } from '@remix-run/react';
import { marked } from 'marked';
import { api, notionService } from '~/services';
import { json } from '@remix-run/node';
import type { PageContents } from '~/presenters';
import { formatSocialLinks, realUuid, formatMenuLinks, formatPageContents } from '~/presenters';
import type { ContentDatabase } from '~/types';
import type { PageMenuLink, SocialLink } from '~/ui';
import { SocialLinks, Avatar, PageHeader } from '~/ui';

import pagesStyles from '~/ui/styles/css/pages.css';

export function links() {
  return [{ rel: 'stylesheet', href: pagesStyles }];
}

type LoaderData = {
  user: User;
  page: PageContents;
  content: string;
  socialLinks: ContentDatabase[] | null;
  canonical: string;
};

export async function loader({ params }: LoaderSubmission) {
  const staticPages = await api.getStaticPageLinks();

  const pages = formatMenuLinks<PageMenuLink>(staticPages);
  const currentPage = pages.filter(page => page?.slug === params?.slug)[0];

  if (!currentPage) {
    throw new Response('Page not found!', {
      status: 404,
      statusText: 'A página que você está procurando não existe.',
    });
  }

  const pageContent: ContentDatabase[] = await api.getStaticPage<ContentDatabase>(currentPage?.slug);
  const page = formatPageContents(pageContent[0]);
  const markdown = await notionService.page2markdownString(realUuid(page?.id));

  const users = await notionService.getUsers<User>();
  const user = users.filter(({ type }) => type === 'person')[0];
  const socialLinks = await api.getSocialLinks();
  const canonical = `${process.env?.SITE_BASE_URL}/${page?.slug}`;

  return json<LoaderData>({
    user,
    page,
    content: marked(markdown),
    socialLinks,
    canonical,
  });
}

export const meta: MetaFunction = ({ data }) => {
  if (!data || data?.status) return { title: data?.status || 'Oops!', description: data?.statusText };
  const { page, user } = data as LoaderData;
  return { title: `${page.title} ⎼ ${user.name}`, description: page.description };
};

export default function () {
  const { user, page, content, socialLinks } = useLoaderData<LoaderData>();

  return (
    <section className="page">
      <PageHeader title={page.title} description={page.description} cover={page.cover} />
      <div className="page__inner container --small">
        {user && (
          <aside className="page__sidebar">
            <Avatar image={user.avatar_url} alt={`Avatar de ${user.name}`} size={220} />
            {socialLinks && <SocialLinks links={formatSocialLinks<SocialLink>(socialLinks)} />}
          </aside>
        )}
        <div className="mdContent page__content" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  );
}
