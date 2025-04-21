/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://root:V%40xNNT8hvHhMHGL@cluster0.qtyydwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  },
  // Ensure API routes are handled correctly
  api: {
    bodyParser: true,
  }
};

module.exports = nextConfig;