/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.instagram.com https://connect.facebook.net",
              "frame-src https://www.instagram.com",
              "img-src 'self' data: https://www.instagram.com https://scontent*.cdninstagram.com https://scontent*.fbcdn.net",
              "style-src 'self' 'unsafe-inline'",
              "connect-src 'self' https://www.instagram.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
