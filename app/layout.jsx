import './globals.css';

export const metadata = {
  title: 'Fornieri | Luxury Real Estate Melbourne',
  description: 'Fornieri is Melbourne\'s trusted luxury real estate advisor, curating prestige properties with concierge-level service and unparalleled market insight.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Tera:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
