/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return config; // just ensures Webpack is used
  },

   async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://linkedinclone-zuc5.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
