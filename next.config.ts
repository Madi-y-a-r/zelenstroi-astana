// next.config.mjs

import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Правило для локальной разработки (оставляем его)
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      // НОВОЕ правило для опубликованного бэкенда на Render
      {
        protocol: 'https',
        hostname: 'zelenstroi-back.onrender.com',
        port: '', // Порт не нужен для стандартного https (порт 443)
        pathname: '/uploads/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);