/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_BACKOFFICE_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;
