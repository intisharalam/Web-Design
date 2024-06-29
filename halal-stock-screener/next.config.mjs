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
            {
              source: "/api/:path*",
              destination:
              process.env.NODE_ENV === "development" ? "http://127.0.0.1:8000/api/:path*" : "/api/:path*",
              permanent: true,
            },
        ];
    },
};