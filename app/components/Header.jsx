'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (path) => pathname === path;

  return (
    <>
      <header className={`modern-header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="modern-header__container">
          {/* Logo - Empty spacer */}
          <div className="modern-header__logo"></div>

          {/* Desktop Navigation */}
          <nav className="modern-header__nav" aria-label="Main navigation">
            <Link
              href="/"
              className={`modern-header__link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`modern-header__link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
            <Link
              href="/listings"
              className={`modern-header__link ${isActive('/listings') ? 'active' : ''}`}
            >
              Listings
            </Link>
            <Link
              href="/services"
              className={`modern-header__link ${isActive('/services') ? 'active' : ''}`}
            >
              Services
            </Link>

          </nav>

          {/* Right Actions */}
          <div className="modern-header__actions">
            <Link href="/contact" className="modern-header__contact-btn">
              Contact
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="modern-header__menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="modern-header__menu-bar"></span>
              <span className="modern-header__menu-bar"></span>
              <span className="modern-header__menu-bar"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="modern-mobile-menu"
          onClick={() => setMenuOpen(false)}
        >
          <div className="modern-mobile-menu__content" onClick={(e) => e.stopPropagation()}>
            <nav className="modern-mobile-menu__nav">
              <Link
                href="/"
                className={`modern-mobile-menu__link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`modern-mobile-menu__link ${isActive('/about') ? 'active' : ''}`}
              >
                About
              </Link>
              <Link
                href="/listings"
                className={`modern-mobile-menu__link ${isActive('/listings') ? 'active' : ''}`}
              >
                Listings
              </Link>
              <Link
                href="/services"
                className={`modern-mobile-menu__link ${isActive('/services') ? 'active' : ''}`}
              >
                Services
              </Link>

            </nav>

            <div className="modern-mobile-menu__footer">
              <Link href="/contact" className="btn btn--primary" style={{ width: '100%' }}>
                Get in touch
              </Link>
              <div className="modern-mobile-menu__social">
                <a href="#" aria-label="Instagram">Instagram</a>
                <a href="#" aria-label="Facebook">Facebook</a>
                <a href="#" aria-label="LinkedIn">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
