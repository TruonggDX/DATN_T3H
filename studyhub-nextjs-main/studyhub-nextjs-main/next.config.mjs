/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            // HTTP - tạm thời thêm để fix lỗi ngay
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
            // Các domain khác nếu cần
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;