import './globals.css';

export const metadata = {
  title: 'Fornieri & Azar | Real Estate Melbourne',
  description: 'Premium real estate services in Melbourne. Sales, buying, and rental management.',
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
      </body>
    </html>
  );
}
