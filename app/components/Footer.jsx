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
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="footer-logo" href="/" aria-label="Fornieri & Azar home">
            Fornieri & Azar
          </Link>
          <p>Level 18, 120 Collins Street, Melbourne VIC 3000</p>
          <a className="footer-contact" href="tel:+61390000000">+61 (03) 9000 0000</a>
          <a className="footer-contact" href="mailto:hello@fornieriandar.com.au">hello@fornieriandar.com.au</a>
        </div>
        <div className="footer-links">
          <div>
            <h3>Explore</h3>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/listings">Listings</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/team">Team</Link></li>
            </ul>
          </div>
          <div>
            <h3>Resources</h3>
            <ul>
              <li><Link href="/contact">Book consultation</Link></li>
              <li><a href="mailto:media@fornieriandar.com.au">Media enquiries</a></li>
              <li><a href="mailto:careers@fornieriandar.com.au">Careers</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© <span>{year}</span> Fornieri & Azar. All rights reserved.</p>
        <p>Estate Agent Licence 01234567 | REIV Accredited Agency</p>
      </div>
    </footer>
  );
}
