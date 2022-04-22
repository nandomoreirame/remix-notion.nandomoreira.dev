import os from 'os';
import path from 'path';
import type { LoaderFunction } from 'remix';
import type { Resolver } from 'remix-image/server';
import { imageLoader, DiskCache, fsResolver, fetchResolver } from 'remix-image/server';
import { getBaseUrl, isDev } from '~/util/helpers';
import { sharpTransformer } from '~/util/sharp';

export const fetchImage: Resolver = async (asset, url, options, basePath) => {
  if (url.startsWith('/') && (url.length === 1 || url[1] !== '/')) {
    return fsResolver(asset, url, options, basePath);
  }

  return fetchResolver(asset, url, options, basePath);
};

const config = {
  selfUrl: getBaseUrl(),
  cache: new DiskCache({
    path: path.join(os.tmpdir(), 'img'),
  }),
  resolver: fetchImage,
  transformer: sharpTransformer,
  basePath: isDev() ? 'public' : '/',
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
