import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useTransition } from '@remix-run/react';
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

  React.useEffect(() => {
    setLoading(transition?.state === 'loading');
  }, [transition]);

  return (
    <html lang="pt-br" data-theme="dracula">
      <head>
        <Meta />
        <Links />
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
          <ScrollRestoration />
        </DefaultLayout>
        {loading && <Loading />}
        <EasterEgg />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
