/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static site → plain HTML/CSS/JS in out/, hostable anywhere (Netlify publishes out/)
  output: "export",
};

export default nextConfig;
