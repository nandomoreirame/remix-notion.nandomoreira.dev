import type { MetaFunction } from '@remix-run/node';
import { CatchBoundary as ErrorsBoundaryView, RootApp as RootAppView } from './ui/views';

import rootStyles from './ui/styles/css/root.css';
import globalsStyles from './ui/styles/css/globals.css';
import { useCatch } from '@remix-run/react';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  description: '...',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap',
    },
    {
      rel: 'stylesheet',
      href: rootStyles,
    },
    {
      rel: 'stylesheet',
      href: globalsStyles,
    },
  ];
};

// export async function loader() {}

export function ErrorBoundary({ error }) {
  console.error({ error });
  return <ErrorsBoundaryView status={'500'} text={error?.message || 'An error happened here!'} />;
}

export function CatchBoundary() {
  const caught = useCatch();
  return <ErrorsBoundaryView status={caught.status} text={caught.statusText} />;
}

export default function App() {
  return <RootAppView />;
}
