import * as React from 'react';

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
      <img className="avatar__image" src={image} alt={alt} width={size} height={size} {...imgProps} />
    </div>
  );
}
