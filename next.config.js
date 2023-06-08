/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "icdn.dantri.com.vn",
      "thitbohuunghi.com",
      "vinafood.vn",
      "vinmec-prod.s3.amazonaws.com",
      "cdn.tgdd.vn",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
