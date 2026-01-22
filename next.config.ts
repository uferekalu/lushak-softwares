/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbs.dreamstime.com',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'ripenapps.com',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'fenixcommerce.com',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'themindstudios.com',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'www.addevice.io',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;