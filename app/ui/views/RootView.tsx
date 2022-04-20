import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  PrefetchPageLinks,
  Scripts,
  ScrollRestoration,
  useMatches,
  useTransition,
} from '@remix-run/react';
import { EasterEgg, Loading } from '~/ui/components';
import { DefaultLayout } from '../layouts';

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

export function RootApp({ gaId }: { gaId?: string }) {
  const [loading, setLoading] = React.useState(false);
  const transition = useTransition();
  const matches = useMatches();
  const match = matches.find(match => match.data && match.data.canonical);
  const canonical = match?.data?.canonical;

  React.useEffect(() => {
    setLoading(transition?.state === 'loading');
  }, [transition]);

  return (
    <html lang="pt-br" data-theme="dracula">
      <head>
        <Meta />
        {!!canonical && <link rel="canonical" href={canonical} />}
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
        <DefaultLayout menuLinks={MENU_LINKS}>
          <Outlet />
        </DefaultLayout>
        {loading && <Loading />}
        <EasterEgg />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
