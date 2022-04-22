import { json } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';
import { CatchBoundary as ErrorsBoundaryView, RootApp as RootAppView } from './ui/views';

import rootStyles from './ui/styles/css/root.css';
import globalsStyles from './ui/styles/css/globals.css';

export const links: LinksFunction = () => {
  return [
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

type LoaderData = {
  googleAnalyticsId?: string;
};

export async function loader() {
  const googleAnalyticsId = process.env?.SITE_GA_ID;
  return json<LoaderData>({ googleAnalyticsId });
}

export function ErrorBoundary({ error }) {
  console.error({ error });
  return <ErrorsBoundaryView status={'500'} text={error?.message || 'An error happened here!'} />;
}

export function CatchBoundary() {
  const caught = useCatch();
  return <ErrorsBoundaryView status={caught.status} text={caught.statusText} />;
}

export default function App() {
  const { googleAnalyticsId } = useLoaderData<LoaderData>();
  return <RootAppView gaId={googleAnalyticsId} />;
}
