import * as React from 'react';
import type { User } from '~/types';
import { Avatar } from './Avatar';
import type { SocialLink } from './SocialLinks';
import { SocialLinks } from './SocialLinks';

export interface HeroProps {
  content: string;
  user: User;
  socialLinks?: SocialLink[];
}

export function Hero({ user, content, socialLinks }: HeroProps): React.ReactElement {
  return (
    <div className="hero container">
      <div className="hero__inner">
        <div className="hero__image">
          <Avatar image={'/images/avatar.png'} alt={`Avatar de ${user.name}`} size={220} circle />
        </div>
        <div className="hero__content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {socialLinks && <SocialLinks links={socialLinks} line />}
        </div>
      </div>
    </div>
  );
}
