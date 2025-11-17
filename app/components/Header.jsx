'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header" id="home">
      <div className="nav-sidebar">
        <div className="nav-brand-text">FORNIERI AND AZAR</div>
        <div className="nav-social" aria-label="Follow Fornieri and Azar">
          <a className="nav-social__link" href="#" aria-label="Instagram">IG</a>
          <a className="nav-social__link" href="#" aria-label="Facebook">FB</a>
          <a className="nav-social__link" href="#" aria-label="LinkedIn">IN</a>
        </div>
      </div>
      <nav className="nav-top" data-component="nav" aria-label="Main navigation">
        <div className="nav-top__inner">
          <ul className="nav-links nav-links--desktop">
            <li><Link href="/listings" data-nav="listings">Property</Link></li>
            <li><Link href="/services" data-nav="services">Advocacy</Link></li>
            <li><Link href="/about" data-nav="about">About</Link></li>
            <li><Link href="/team" data-nav="team">Media</Link></li>
          </ul>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="nav-toggle__bar"></span>
            <span className="nav-toggle__bar"></span>
            <span className="nav-toggle__bar"></span>
          </button>
        </div>
        <div className="nav-links-wrapper" id="primary-navigation">
          <ul className="nav-links">
            <li><Link href="/listings" data-nav="listings">Property</Link></li>
            <li><Link href="/services" data-nav="services">Advocacy</Link></li>
            <li><Link href="/about" data-nav="about">About</Link></li>
            <li><Link href="/team" data-nav="team">Media</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
