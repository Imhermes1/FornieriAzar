'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Header is "scrolled" (solid) if it's more than 50px from top
      // AND not over the footer
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    // Use IntersectionObserver to detect when footer is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOverFooter(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of footer is visible
    );

    const footer = document.querySelector('footer');
    if (footer) observer.observe(footer);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (footer) observer.unobserve(footer);
    };
  }, []);

  // Header is transparent if at the very top OR over the footer
  const isTransparent = !scrolled || isOverFooter;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPropertyDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu when navigating
  useEffect(() => {
    setMenuOpen(false);
    setPropertyDropdownOpen(false);
  }, [pathname]);

  const isActive = (path) => pathname === path;
  const isPropertyActive = () => pathname.startsWith('/buy') || pathname.startsWith('/rent') || pathname.startsWith('/property');

  return (
    <>
      <header className={`modern-header ${!isTransparent ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <div className="modern-header__container">
          {/* Logo */}
          <Link href="/" className="modern-header__logo">
            <Image
              src="/images/FnA.svg"
              alt="Fornieri & Azar"
              width={240}
              height={60}
              priority
              className="modern-header__logo-img"
            />
            {/* Hidden on desktop, shown if we want to switch to text */}
            <span className="modern-header__logo-text-large">
              Fornieri <span>&</span> Azar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="modern-header__nav" aria-label="Main navigation">
            <Link
              href="/"
              className={`modern-header__link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>

            {/* Property Dropdown */}
            <div className="modern-header__dropdown" ref={dropdownRef}>
              <button
                className={`modern-header__link modern-header__dropdown-trigger ${isPropertyActive() ? 'active' : ''}`}
                onClick={() => setPropertyDropdownOpen(!propertyDropdownOpen)}
                aria-expanded={propertyDropdownOpen}
              >
                Property
                <svg
                  className={`modern-header__dropdown-arrow ${propertyDropdownOpen ? 'open' : ''}`}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                >
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {propertyDropdownOpen && (
                <div className="modern-header__dropdown-menu">
                  <Link href="/buy" className="modern-header__dropdown-item">
                    Buy
                  </Link>
                  <Link href="/buy?status=sold" className="modern-header__dropdown-item">
                    Sold
                  </Link>
                  <Link href="/buy?type=projects" className="modern-header__dropdown-item">
                    Projects
                  </Link>
                  <Link href="/buy?filter=auctions" className="modern-header__dropdown-item">
                    Upcoming Auctions
                  </Link>
                  <Link href="/buy?filter=inspections" className="modern-header__dropdown-item">
                    Inspections
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/sell"
              className={`modern-header__link ${isActive('/sell') ? 'active' : ''}`}
            >
              Sell With Us
            </Link>

            {/* Hamburger Toggle - Now next to Sell With Us on Desktop */}
            <button
              className={`modern-header__menu-toggle ${menuOpen ? 'active' : ''}`}
              type="button"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="modern-header__menu-bar"></span>
              <span className="modern-header__menu-bar"></span>
              <span className="modern-header__menu-bar"></span>
            </button>

          </nav>

        </div>
      </header>

      {/* Full Menu Overlay */}
      <div
        className={`modern-full-menu ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className="modern-full-menu__content" onClick={(e) => e.stopPropagation()}>
          <div className="modern-full-menu__header">
            <Link href="/" className="modern-full-menu__logo" onClick={() => setMenuOpen(false)}>
              Fornieri <span>&</span> Azar
            </Link>
            <button className="modern-full-menu__close" onClick={() => setMenuOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="modern-full-menu__grid">
            {/* Services Column */}
            <div className="modern-full-menu__col">
              <p className="modern-full-menu__label">SERVICES</p>
              <div className="modern-full-menu__links">
                <Link href="/services#sales" onClick={() => setMenuOpen(false)}>Sales Strategy</Link>
                <Link href="/services#advocacy" onClick={() => setMenuOpen(false)}>Advocacy</Link>
                <Link href="/services#projects" onClick={() => setMenuOpen(false)}>Projects</Link>
                <Link href="/services#rentals" onClick={() => setMenuOpen(false)}>Rentals</Link>
              </div>
            </div>

            {/* Discover Column */}
            <div className="modern-full-menu__col">
              <p className="modern-full-menu__label">DISCOVER</p>
              <div className="modern-full-menu__links">
                <Link href="/about" onClick={() => setMenuOpen(false)}>Our story</Link>
                <Link href="/team" onClick={() => setMenuOpen(false)}>Meet the team</Link>
                <Link href="/buy" onClick={() => setMenuOpen(false)}>Current listings</Link>
                <Link href="/sell" onClick={() => setMenuOpen(false)}>Sell With Us</Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)}>Get in touch</Link>
              </div>
            </div>

            {/* Resources Column */}
            <div className="modern-full-menu__col">
              <p className="modern-full-menu__label">RESOURCES</p>
              <div className="modern-full-menu__links">
                <Link href="/contact?subject=media" onClick={() => setMenuOpen(false)}>Media enquiries</Link>
                <Link href="/contact?subject=careers" onClick={() => setMenuOpen(false)}>Join our team</Link>
                <Link href="/privacy" onClick={() => setMenuOpen(false)}>Privacy</Link>
              </div>
            </div>

            {/* Contact / Footer Info */}
            <div className="modern-full-menu__col modern-full-menu__col--contact">
              <p className="modern-full-menu__label">CONTACT</p>
              <div className="modern-full-menu__contact-info">
                <a href="tel:0423633740">0423 633 740</a>
                <a href="mailto:team@fornieriazar.com.au">team@fornieriazar.com.au</a>
                <p>Suite 5028, 165 Waverley Road,<br />Malvern East VIC 3145</p>
              </div>
              <div className="modern-full-menu__social">
                <a href="https://www.instagram.com/fornieri.azar/?hl=en" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.youtube.com/@LukeFornieri" target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href="https://www.linkedin.com/in/lukefornieri/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
