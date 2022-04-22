import {
  Links,
  LiveReload,
  Meta,
  PrefetchPageLinks,
  Scripts,
  ScrollRestoration,
  useMatches,
  useTransition,
} from '@remix-run/react';
import * as React from 'react';
// import { useShouldHydrate } from 'remix-utils';
import { DefaultLayout } from '../layouts';
import { EasterEgg, Loading } from '../components';
import { getBaseUrl } from '~/util/helpers';
import type { SEO } from '~/types';

export interface DocumentProps {
  children: React.ReactNode;
  gaId?: string;
  lang?: string;
  title?: string;
}

const MENU_LINKS = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Sobre',
    path: '/sobre',
  },
  // {
  //   title: 'Projetos',
  //   path: '/projetos',
  // },
  // {
  //   title: 'Portfolio',
  //   path: '/portfolio',
  // },
  {
    title: 'Contato',
    path: '/contato',
  },
];

export function Document({ children, gaId, lang = 'pt-br', title }: DocumentProps): React.ReactElement {
  const [loading, setLoading] = React.useState(false);
  const transition = useTransition();
  // note: use `export const handle = { hydrate: true };` in any route to enable JS
  // const includeScripts = useShouldHydrate();
  const matches = useMatches();
  const match = matches.find(match => match.data && match.data.seo);
  const seo: SEO = match?.data?.seo;

  React.useEffect(() => {
    setLoading(transition?.state === 'loading');
  }, [transition]);

  return (
    <html lang={lang} data-theme="dracula">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <Meta />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&amp;display=swap"
        />

        {seo && (
          <>
            <link rel="canonical" href={seo.url || `${getBaseUrl()}/`} />
            <meta property="og:url" content={seo.url || `${getBaseUrl()}/`} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo?.image || `${getBaseUrl()}/images/share.jpg`} />
            <meta property="og:site_name" content="nandomoreira.dev" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@oseunando" />
            <meta name="twitter:site" content="@oseunando" />
            <meta name="twitter:alt" content={seo.title} />
            <meta property="og:type" content={seo.type || 'website'} />

            {seo.type && seo.type === 'article' && (
              <>
                <meta name="article:published_time" content={seo?.published_time} />
                <meta name="article:author" content={site?.author} />
              </>
            )}
          </>
        )}

        <Links />

        <PrefetchPageLinks page="/" />
        <PrefetchPageLinks page="/sobre" />
        <PrefetchPageLinks page="/contato" />

        {process.env.NODE_ENV === 'production' && gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <DefaultLayout menuLinks={MENU_LINKS}>{children}</DefaultLayout>
        {loading && <Loading />}
        <EasterEgg />
        <ScrollRestoration />
        <Scripts />
        {/* {includeScripts && <Scripts />} */}
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
