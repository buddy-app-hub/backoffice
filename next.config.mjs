/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*', // Ruta que se va a redirigir
                destination: 'http://localhost:8086/:path*', // Dirección de tu API
            },
        ];
    },
};

export default nextConfig;
