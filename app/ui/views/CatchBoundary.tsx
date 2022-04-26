import { Links, Meta, NavLink, Scripts } from '@remix-run/react';
import { ErrorLayout } from '../layouts';

export interface CatchBoundaryProps {
  status: string;
  text: string;
  lang?: string;
}

export function CatchBoundary({ status, text, lang = 'en' }: CatchBoundaryProps) {
  return (
    <html lang={lang} data-theme="dracula">
      <head>
        <title>
          Oops! {status} {text}
        </title>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorLayout>
          <h1 className="pageErrors__title">{status}</h1>
          <p className="pageErrors__description">{text}</p>
          <NavLink to="/" className="pageErrors__button" end>
            🏡 &nbsp; Ir para home!
          </NavLink>
        </ErrorLayout>
        <Scripts />
      </body>
    </html>
  );
}
