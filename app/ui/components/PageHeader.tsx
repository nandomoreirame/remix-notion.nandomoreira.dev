import * as React from 'react';

export interface PageHeaderProps {
  title: React.ReactNode | string;
  description?: React.ReactNode | string;
  cover: string;
}

export function PageHeader({ title, description, cover }: PageHeaderProps): React.ReactElement {
  return (
    <header className="pageHeader">
      <div className="pageHeader__inner container --small">
        <h1 className="pageHeader__title">{title}</h1>
        {description && <p className="pageHeader__description">{description}</p>}
      </div>
      {cover && <div className="pageHeader__image" style={{ backgroundImage: `url("${cover}")` }} />}
    </header>
  );
}
