'use client';

import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div data-page="home">
      <Header />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <video className="hero-media" autoPlay muted loop playsInline poster="/images/main.jpg">
            <source src="/video/27-Cambridge-Drive-hero.mp4" type="video/mp4" />
            Your browser does not support the background video. Enjoy a still image instead.
          </video>
          <div className="hero-overlay"></div>
          <div className="hero-content reveal-on-scroll" data-delay="0">
            <h1 className="hero-title" id="hero-title">FORNIERI & AZAR</h1>
            <p className="hero-subheading">People. Purpose. Property.</p>
          </div>
        </section>

        <section className="intro" id="about">
          <div className="section-heading reveal-on-scroll" data-delay="0">
            <p> We believe trust is the cornerstone of a great result. We provide a sophisticated, personal service
              and an intelligent strategy tailored for you, acting as dedicated advisors to ensure your property
              journey is seamless and successful.</p>
          </div>
        </section>

        <section className="property-search">
          <div className="search-container">
            <select className="search-filter">
              <option>All</option>
              <option>For Sale</option>
              <option>For Rent</option>
              <option>Sold</option>
            </select>

            <input type="text" className="search-input" placeholder="Search properties" />

            <select className="search-filter">
              <option>Min Price</option>
              <option>$500,000</option>
              <option>$1,000,000</option>
              <option>$2,000,000</option>
              <option>$5,000,000</option>
              <option>$10,000,000+</option>
            </select>

            <select className="search-filter">
              <option>Max Price</option>
              <option>$1,000,000</option>
              <option>$2,000,000</option>
              <option>$5,000,000</option>
              <option>$10,000,000</option>
              <option>$20,000,000+</option>
            </select>

            <select className="search-filter">
              <option>Bed</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
              <option>5+</option>
            </select>

            <select className="search-filter">
              <option>Bath</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
              <option>5+</option>
            </select>

            <select className="search-filter">
              <option>Car</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
              <option>4+</option>
              <option>5+</option>
            </select>
          </div>
        </section>

        <section className="property-mosaic" id="properties">
          <div className="mosaic-grid">
            <article className="mosaic-item mosaic-item--large">
              <img src="/images/LowRes_2k_07.jpg" alt="27 Cambridge Drive, Brighton" loading="lazy" />
              <div className="mosaic-item__overlay">
                <h3>27 Cambridge Drive</h3>
                <p className="mosaic-item__suburb">Brighton</p>
              </div>
            </article>

            <article className="mosaic-item">
              <img src="/images/LowRes_2k_08.jpg" alt="88 Collins Street Residences" loading="lazy" />
              <div className="mosaic-item__overlay">
                <h3>88 Collins Street</h3>
                <p className="mosaic-item__suburb">Melbourne CBD</p>
              </div>
            </article>

            <article className="mosaic-item">
              <img src="/images/LowRes_2k_17.jpg" alt="Kensington Road Estate" loading="lazy" />
              <div className="mosaic-item__overlay">
                <h3>Kensington Road</h3>
                <p className="mosaic-item__suburb">Toorak</p>
              </div>
            </article>

            <article className="mosaic-item mosaic-item--wide">
              <img src="/images/LowRes_2k_18.jpg" alt="South Yarra Penthouse" loading="lazy" />
              <div className="mosaic-item__overlay">
                <h3>Chapel Street Residence</h3>
                <p className="mosaic-item__suburb">South Yarra</p>
              </div>
            </article>

            <article className="mosaic-item">
              <img src="/images/LowRes_2k_07.jpg" alt="Brighton Beach House" loading="lazy" />
              <div className="mosaic-item__overlay">
                <h3>Beach House</h3>
                <p className="mosaic-item__suburb">Brighton</p>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
