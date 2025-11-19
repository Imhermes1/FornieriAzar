import './globals.css';
import FloatingContactButton from './components/FloatingContactButton';

export const metadata = {
  title: 'Fornieri & Azar | Boutique Real Estate Melbourne',
  description: 'A trusted boutique real estate agency in Melbourne helping families buy, sell, and manage properties with honest advice and personal service.',
  openGraph: {
    title: 'Fornieri & Azar | Boutique Real Estate Melbourne',
    description: 'A trusted boutique real estate agency in Melbourne helping families buy, sell, and manage properties with honest advice and personal service.',
    url: 'https://fornieriazar.com.au',
    siteName: 'Fornieri & Azar',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
      </body>
    </html>
  );
}
