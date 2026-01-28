import './globals.css';
import FloatingContactButton from './components/FloatingContactButton';
import { Analytics } from '@vercel/analytics/next';
import { Outfit, Manrope } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://fornieriazar.com.au'),
  title: {
    template: '%s | Fornieri & Azar Real Estate',
    default: 'Fornieri & Azar | Premium Real Estate East & South East Melbourne',
  },
  description: 'Fornieri & Azar is a boutique real estate agency serving East and South East Melbourne. We specialise in premium property sales, buyer advocacy, property management, and project marketing.',
  keywords: [
    'Real Estate Agents Melbourne',
    'South East Melbourne Real Estate',
    'East Melbourne Property',
    'Buyer Advocate',
    'Property Management',
    'Luxury Real Estate',
    'Fornieri & Azar',
    'Malvern East',
    'Chadstone',
    'Vermont South',
    'Blackburn South',
    'Glen Waverley',
    'Berwick',
    'Narre Warren North',
    'Dingley Village',
    'Keysborough',
    'Hampton',
    'Brighton'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Fornieri & Azar | Premium Real Estate Melbourne',
    description: 'Boutique real estate agency serving Melbourne\'s East and South East. Sales, Buying, and Property Management.',
    url: 'https://fornieriazar.com.au',
    siteName: 'Fornieri & Azar',
    images: [
      {
        url: '/images/LowRes_2k_18.jpg', // Using a high-quality existing image as OG image
        width: 1200,
        height: 630,
        alt: 'Fornieri & Azar Premium Real Estate',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fornieri & Azar Real Estate',
    description: 'Premium real estate services in Melbourne\'s East and South East.',
    images: ['/images/LowRes_2k_18.jpg'],
  },
  themeColor: '#FAFAFA',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-3D447ZRH15"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3D447ZRH15');
            `,
          }}
        />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif;
            line-height: 1.6;
            color: #000;
          }
        `}</style>
      </head>
      <body className={`${manrope.variable} ${outfit.variable}`} suppressHydrationWarning>
        {children}
        <FloatingContactButton />
        <Analytics />
      </body>
    </html>
  );
}
