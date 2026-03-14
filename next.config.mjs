/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      // --- Active verticals: bare path → /es/ prefix ---
      { source: '/think/:path*', destination: '/es/think/:path*', permanent: true },
      { source: '/tech/:path*', destination: '/es/tech/:path*', permanent: true },
      { source: '/tailor', destination: '/es/tailor/', permanent: true },
      { source: '/tailor/:path*', destination: '/es/tailor/:path*', permanent: true },
      { source: '/trade', destination: '/es/trade/', permanent: true },
      { source: '/trade/:path*', destination: '/es/trade/:path*', permanent: true },
      { source: '/talk', destination: '/es/talk/', permanent: true },
      { source: '/talk/:path*', destination: '/es/talk/:path*', permanent: true },
      { source: '/team/:path*', destination: '/es/team/:path*', permanent: true },
      { source: '/clientes', destination: '/es/clientes', permanent: true },
      { source: '/empresa', destination: '/es/empresa', permanent: true },
      { source: '/contacto', destination: '/es/contacto', permanent: true },
      { source: '/insights', destination: '/es/insights', permanent: true },

      // --- Deleted: t&trends → redistributed to t&think ---
      { source: '/trends', destination: '/es/think/estrategia/', permanent: true },
      { source: '/trends/:path*', destination: '/es/think/estrategia/', permanent: true },
      { source: '/es/trends', destination: '/es/think/estrategia/', permanent: true },
      { source: '/es/trends/consultoria', destination: '/es/think/estrategia/', permanent: true },
      { source: '/es/trends/consultoria/:path*', destination: '/es/think/estrategia/', permanent: true },
      { source: '/es/trends/data-analitica', destination: '/es/think/data-analitica/', permanent: true },
      { source: '/es/trends/data-analitica/:path*', destination: '/es/think/data-analitica/', permanent: true },
      { source: '/es/trends/investigacion', destination: '/es/think/investigacion/', permanent: true },
      { source: '/es/trends/investigacion/:path*', destination: '/es/think/investigacion/', permanent: true },
      { source: '/en/trends', destination: '/en/think/strategy/', permanent: true },
      { source: '/en/trends/consulting', destination: '/en/think/strategy/', permanent: true },
      { source: '/en/trends/consulting/:path*', destination: '/en/think/strategy/', permanent: true },
      { source: '/en/trends/data-analytics', destination: '/en/think/data-analytics/', permanent: true },
      { source: '/en/trends/data-analytics/:path*', destination: '/en/think/data-analytics/', permanent: true },
      { source: '/en/trends/research', destination: '/en/think/research/', permanent: true },
      { source: '/en/trends/research/:path*', destination: '/en/think/research/', permanent: true },

      // --- Deleted: t&events → redistributed to t&trade ---
      { source: '/events', destination: '/es/trade/trade-show/', permanent: true },
      { source: '/events/:path*', destination: '/es/trade/trade-show/', permanent: true },
      { source: '/es/events', destination: '/es/trade/trade-show/', permanent: true },
      { source: '/es/events/corporativos', destination: '/es/trade/trade-show/', permanent: true },
      { source: '/es/events/corporativos/:path*', destination: '/es/trade/trade-show/', permanent: true },
      { source: '/es/events/stands', destination: '/es/trade/trade-show/', permanent: true },
      { source: '/es/events/stands/:path*', destination: '/es/trade/trade-show/', permanent: true },
      { source: '/es/events/marketing-experiencial', destination: '/es/tailor/', permanent: true },
      { source: '/es/events/marketing-experiencial/:path*', destination: '/es/tailor/', permanent: true },
      { source: '/en/events', destination: '/en/trade/trade-show/', permanent: true },
      { source: '/en/events/corporate', destination: '/en/trade/trade-show/', permanent: true },
      { source: '/en/events/corporate/:path*', destination: '/en/trade/trade-show/', permanent: true },
      { source: '/en/events/stands', destination: '/en/trade/trade-show/', permanent: true },
      { source: '/en/events/stands/:path*', destination: '/en/trade/trade-show/', permanent: true },
      { source: '/en/events/experiential-marketing', destination: '/en/tailor/', permanent: true },
      { source: '/en/events/experiential-marketing/:path*', destination: '/en/tailor/', permanent: true },

      // --- Moved think subpages ---
      { source: '/es/think/pr-comunicacion', destination: '/es/talk/', permanent: true },
      { source: '/es/think/pr-comunicacion/:path*', destination: '/es/talk/', permanent: true },
      { source: '/es/think/performance', destination: '/es/talk/', permanent: true },
      { source: '/es/think/performance/:path*', destination: '/es/talk/', permanent: true },
      { source: '/es/think/trade-marketing', destination: '/es/trade/trade-marketing/', permanent: true },
      { source: '/es/think/trade-marketing/:path*', destination: '/es/trade/trade-marketing/', permanent: true },
      { source: '/en/think/pr-communications', destination: '/en/talk/', permanent: true },
      { source: '/en/think/pr-communications/:path*', destination: '/en/talk/', permanent: true },
      { source: '/en/think/performance', destination: '/en/talk/', permanent: true },
      { source: '/en/think/performance/:path*', destination: '/en/talk/', permanent: true },
      { source: '/en/think/trade-marketing', destination: '/en/trade/trade-marketing/', permanent: true },
      { source: '/en/think/trade-marketing/:path*', destination: '/en/trade/trade-marketing/', permanent: true },

      // --- Deleted tech subpages → tech hub ---
      { source: '/es/tech/desarrollo', destination: '/es/tech/', permanent: true },
      { source: '/es/tech/desarrollo/:path*', destination: '/es/tech/', permanent: true },
      { source: '/es/tech/inteligencia-artificial', destination: '/es/tech/', permanent: true },
      { source: '/es/tech/inteligencia-artificial/:path*', destination: '/es/tech/', permanent: true },
      { source: '/es/tech/crm', destination: '/es/tech/', permanent: true },
      { source: '/es/tech/crm/:path*', destination: '/es/tech/', permanent: true },
      { source: '/es/tech/automatizacion', destination: '/es/tech/', permanent: true },
      { source: '/es/tech/automatizacion/:path*', destination: '/es/tech/', permanent: true },
      { source: '/en/tech/development', destination: '/en/tech/', permanent: true },
      { source: '/en/tech/development/:path*', destination: '/en/tech/', permanent: true },
      { source: '/en/tech/artificial-intelligence', destination: '/en/tech/', permanent: true },
      { source: '/en/tech/artificial-intelligence/:path*', destination: '/en/tech/', permanent: true },
      { source: '/en/tech/crm', destination: '/en/tech/', permanent: true },
      { source: '/en/tech/crm/:path*', destination: '/en/tech/', permanent: true },
      { source: '/en/tech/automation', destination: '/en/tech/', permanent: true },
      { source: '/en/tech/automation/:path*', destination: '/en/tech/', permanent: true },
    ];
  },
};

export default nextConfig;
