/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // or false if you plan to change it later
      },
    ];
  },
};

export default nextConfig;
