'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="site-footer" aria-label="Footer">
      {/* Quick Action Cards */}
      <div className="footer-actions">
        <div className="footer-action-card">
          <div className="footer-action-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="footer-action-card__content">
            <h3>Thinking of selling?</h3>
            <p>Find out what your home might be worth in today's market.</p>
          </div>
          <Link href="/contact" className="footer-action-card__btn">
            Get a free appraisal
          </Link>
        </div>

        <div className="footer-action-card">
          <div className="footer-action-card__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="footer-action-card__content">
            <h3>Looking to buy?</h3>
            <p>Browse our current properties for sale and rent.</p>
          </div>
          <Link href="/listings" className="footer-action-card__btn">
            See what's available
          </Link>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link className="footer-logo" href="/" aria-label="Fornieri & Azar home">
              <span className="footer-logo-text">Fornieri & Azar</span>
            </Link>
            <p className="footer-tagline">Your trusted boutique real estate agency in Melbourne</p>

            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <span className="footer-contact-label">Office</span>
                <p>PO Box Suite 5028<br/>165 Waverley Road<br/>Malvern East VIC 3145</p>
                <span className="footer-contact-label" style={{marginTop: '16px'}}>Contact</span>
                <a href="tel:+61423633740" className="footer-contact-link">0423 633 740</a>
                <a href="mailto:team@fornieriazar.com.au" className="footer-contact-link">team@fornieriazar.com.au</a>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="footer-nav-group">
            <div className="footer-nav-column">
              <h3>Services</h3>
              <ul>
                <li><Link href="/services#sales">Property sales</Link></li>
                <li><Link href="/services#buying">Buyer advocacy</Link></li>
                <li><Link href="/services#rental">Rental management</Link></li>
                <li><Link href="/services#appraisal">Appraisals</Link></li>
              </ul>
            </div>

            <div className="footer-nav-column">
              <h3>Discover</h3>
              <ul>
                <li><Link href="/about">Our story</Link></li>
                <li><Link href="/team">Meet the team</Link></li>
                <li><Link href="/listings">Current listings</Link></li>
                <li><Link href="/contact">Get in touch</Link></li>
              </ul>
            </div>

            <div className="footer-nav-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="mailto:media@fornieriazar.com.au">Media enquiries</a></li>
                <li><a href="mailto:careers@fornieriazar.com.au">Join our team</a></li>
                <li><a href="https://lukef.craft.me/ttdMVAVS4zLBVo" target="_blank" rel="noopener noreferrer">Privacy policy</a></li>
                <li><a href="https://lukef.craft.me/bWZKGNZ3oeEmZF" target="_blank" rel="noopener noreferrer">Terms and conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">© {year} Fornieri & Azar. All rights reserved.</p>
          <div className="footer-legal">
            <span>Estate Agent Licence 095096L</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
