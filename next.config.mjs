/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    // WWW -> Non-WWW 리디렉션은 Vercel 대시보드에서 설정 (코드 충돌 방지)
    // Vercel > Settings > Domains > www.babyoutcallmassage.com > Redirect to babyoutcallmassage.com
    return [
      // WordPress 관련 경로 -> 메인으로 리디렉션
      {
        source: '/wp-admin',
        destination: '/',
        permanent: false,
      },
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: false,
      },
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/wp-includes/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/xmlrpc.php',
        destination: '/',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
