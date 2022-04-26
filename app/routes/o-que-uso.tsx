import { json } from '@remix-run/node';
import { PageHeader } from '~/ui';

import pagesStyles from '~/ui/styles/css/pages.css';

export function links() {
  return [{ rel: 'stylesheet', href: pagesStyles }];
}

export async function loader() {
  return json({});
}

export default function () {
  return (
    <section className="page">
      <PageHeader title="O que uso" description="Devices e aplicativos que uso no meu dia-a-dia" />
      <div className="page__inner container --small"></div>
    </section>
  );
}
