import './globals.css';
import FloatingContactButton from './components/FloatingContactButton';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
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
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Fornieri & Azar',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - Main Website */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZXT1MH0PT1"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZXT1MH0PT1');
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
      <body>
        {children}
        <FloatingContactButton />
        <Analytics />
      </body>
    </html>
  );
}
