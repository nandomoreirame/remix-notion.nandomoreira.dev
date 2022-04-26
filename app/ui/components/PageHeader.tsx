import * as React from 'react';

export interface PageHeaderProps {
  title: React.ReactNode | string;
  description?: React.ReactNode | string;
  cover?: string;
}

export function PageHeader({ title, description, cover = '/images/cover.jpg' }: PageHeaderProps): React.ReactElement {
  return (
    <header className="pageHeader">
      <div className="pageHeader__inner container --small">
        <span className="pageHeader__title">{title}</span>
        {description && <h1 className="pageHeader__description">{description}</h1>}
      </div>
      <div className="pageHeader__image" style={{ backgroundImage: `url("${cover}")` }} />
    </header>
  );
}
