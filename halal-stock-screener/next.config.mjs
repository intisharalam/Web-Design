/** @type {import('next').NextConfig} */
const nextConfig = {};



// next.config.mjs
export default {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true, // or false if it's a temporary redirect
            },
        ];
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8000/api/:path*', // Proxy to FastAPI backend
        },
      ];
    },
};