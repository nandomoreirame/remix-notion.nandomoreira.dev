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
      <PageHeader title={`Lab`} description="Alguns projetos paralelos que trabalho nas horas vagas" />
      <div className="page__inner container --small"></div>
    </section>
  );
}
