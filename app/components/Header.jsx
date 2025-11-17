'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: 'transparent',
      padding: '20px 30px',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <nav style={{ display: 'flex', gap: '40px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'white', fontSize: '0.95rem', fontWeight: '400', transition: 'opacity 0.3s' }}>Home</Link>
          <Link href="/about" style={{ textDecoration: 'none', color: 'white', fontSize: '0.95rem', fontWeight: '400', transition: 'opacity 0.3s' }}>About</Link>
          <Link href="/sales" style={{ textDecoration: 'none', color: 'white', fontSize: '0.95rem', fontWeight: '400', transition: 'opacity 0.3s' }}>Sales</Link>
          <Link href="/buying" style={{ textDecoration: 'none', color: 'white', fontSize: '0.95rem', fontWeight: '400', transition: 'opacity 0.3s' }}>Buying</Link>
          <Link href="/rentals" style={{ textDecoration: 'none', color: 'white', fontSize: '0.95rem', fontWeight: '400', transition: 'opacity 0.3s' }}>Rentals</Link>
        </nav>
      </div>
    </header>
  );
}
