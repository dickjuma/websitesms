import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  turbopack: {
    root: __dirname,
  },

  outputFileTracingRoot: process.cwd(),

  transpilePackages: ['next-seo'],

  outputFileTracingExcludes: {
    '*': [
      '**/Desktop/**/*',
      '**/Documents/**/*',
      '**/Downloads/**/*',
    ],
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

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/(.*).xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ];
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

  async rewrites() {
    return [];
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        mongodb: false,
        fs: false,
        dns: false,
        'dns/promises': false,
        net: false,
        tls: false,
        'child_process': false,
        'timers/promises': false,
        crypto: false,
        http: false,
        https: false,
        url: false,
        querystring: false,
        path: false,
        os: false,
        util: false,
        stream: false,
        zlib: false,
        buffer: false,
        events: false,
        assert: false,
      };
    }
    return config;
  },
};

export default nextConfig;
