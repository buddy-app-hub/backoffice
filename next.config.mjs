import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKOFFICE_URL}/:path*`,
      },
      {
        source: '/payments-api/:path*',
        destination: `${process.env.NEXT_PUBLIC_PAYMENT_API_URL}/:path*`,
      },
    ];
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      fallback: false,
      apexcharts: path.resolve('./node_modules/apexcharts-clevision'),
    };

    return config;
  },
};

// Exportamos la configuración usando 'export default' en lugar de 'module.exports'.
export default nextConfig;
