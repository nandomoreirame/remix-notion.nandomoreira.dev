import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useTransition } from '@remix-run/react';
import { Loading } from '~/ui/components';
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

export function RootApp() {
  const [loading, setLoading] = React.useState(false);
  const transition = useTransition();

  React.useEffect(() => {
    setLoading(transition?.state === 'loading');
  }, [transition]);

  return (
    <html lang="pt-br">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <DefaultLayout menuLinks={MENU_LINKS}>
          <Outlet />
          <ScrollRestoration />
        </DefaultLayout>
        {loading && <Loading />}
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
