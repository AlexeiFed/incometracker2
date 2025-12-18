import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Отключено для работы с динамическими маршрутами
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  // Отключаем проверку generateStaticParams для динамических маршрутов
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
