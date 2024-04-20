/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects(){
        return [
            {
              source: '/',
              destination: '/main',
              permanent: true,
            },
            {
              source: '/dashboard',
              destination: '/dashboard/add-expenses',
              permanent: true,
            },
          ]
    }
};

export default nextConfig;
