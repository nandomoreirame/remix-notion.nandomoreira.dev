import * as React from 'react';
import Image from 'remix-image';

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  image: string;
  alt?: string;
  size?: string | number;
  circle?: boolean;
}

export function Avatar({
  image,
  alt = 'Avatar',
  size = 200,
  circle = false,
  ...imgProps
}: AvatarProps): React.ReactElement {
  return (
    <div className={`avatar ${circle ? '--circle' : '--square'}`} style={{ flex: `0 0 ${size}px` }}>
      <Image
        src={image}
        alt={alt}
        loaderUrl="/api/image"
        responsive={[
          {
            size: {
              width: size,
              height: size,
            },
            maxWidth: size * 2,
          },
        ]}
        className="avatar__image"
        {...imgProps}
      />
    </div>
  );
}
