/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/think/:path*', destination: '/es/think/:path*', permanent: true },
      { source: '/tech/:path*', destination: '/es/tech/:path*', permanent: true },
      { source: '/trends/:path*', destination: '/es/trends/:path*', permanent: true },
      { source: '/team/:path*', destination: '/es/team/:path*', permanent: true },
      { source: '/events/:path*', destination: '/es/events/:path*', permanent: true },
      { source: '/clientes', destination: '/es/clientes', permanent: true },
      { source: '/empresa', destination: '/es/empresa', permanent: true },
      { source: '/contacto', destination: '/es/contacto', permanent: true },
      { source: '/insights', destination: '/es/insights', permanent: true },
    ];
  },
};

export default nextConfig;
