export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function getBaseUrl(): string {
  if (isDev()) return 'http://localhost:3000';

  let vercelUrl = process.env?.VERCEL_URL;
  if (vercelUrl) vercelUrl = vercelUrl.startsWith('https') ? vercelUrl : `https://${vercelUrl}`;

  return vercelUrl || process.env?.SITE_BASE_URL || '';
}
