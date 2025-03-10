/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ale-buymeacoffee.s3.us-east-2.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
