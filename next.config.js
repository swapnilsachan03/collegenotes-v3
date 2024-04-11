/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.fineartamerica.com',
      'collegenotes-disk.s3.ap-south-1.amazonaws.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
    ],
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    
    return config;
  },
}

module.exports = nextConfig
