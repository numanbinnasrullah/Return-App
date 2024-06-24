/** @type {import('next').NextConfig} */
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: "/api/:path*", // Corrected the source value
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "http://localhost:3000/" }, // Removed trailing slash
  //         { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  //       ]
  //     },
  //   ];
  // },
}

export default nextConfig;
