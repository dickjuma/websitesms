/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  turbopack: {
    root: __dirname,
  },
  reactStrictMode: false,
  trailingSlash: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/demo', destination: '/book-demo', permanent: true },
      { source: '/erp', destination: '/services/erp-systems', permanent: true },
      { source: '/pos', destination: '/services/pos-systems', permanent: true },
      { source: '/crm', destination: '/services/crm-systems', permanent: true },
      { source: '/web-development', destination: '/services/web-development', permanent: true },
      { source: '/mobile-app', destination: '/services/mobile-app-development', permanent: true },
      { source: '/service-web-dev/:county', destination: '/services/location/:county', permanent: true },
      { source: '/service-web-dev/service/:service', destination: '/services/:service', permanent: true },
      { source: '/service-web-dev/service/:service/:county', destination: '/services/:service/:county', permanent: true },
      { source: '/service-web-dev/service/:service/:county/:constituency', destination: '/services/:service/:county/:constituency', permanent: true },
      { source: '/app/services', destination: '/services', permanent: true },
      { source: '/app/services/:service/:county/:constituency', destination: '/services/:service/:county/:constituency', permanent: true },
      { source: '/app/services/:service/:county', destination: '/services/:service/:county', permanent: true },
      { source: '/app/services/:county/:constituency', destination: '/services/location/:county/:constituency', permanent: true },
      { source: '/app/services/:county', destination: '/services/location/:county', permanent: true },
    ];
  },
};

module.exports = nextConfig;
