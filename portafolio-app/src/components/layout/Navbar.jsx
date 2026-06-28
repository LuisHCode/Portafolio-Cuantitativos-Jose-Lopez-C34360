import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import methodsData from '../../data/methods.js';
import './Navbar.css';
import MethodIcon from '../shared/MethodIcon.jsx';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon"><MethodIcon name="Sparkles" size={18} /></span>
          <div className="navbar__logo-text">
            <span className="navbar__logo-title">Métodos</span>
            <span className="navbar__logo-sub">Cuantitativos</span>
          </div>
        </Link>

        {/* Nav Links Desktop */}
        <div className="navbar__links">
          {methodsData.map((method) => (
            <Link
              key={method.id}
              to={`/metodo/${method.slug}`}
              className={`navbar__link ${location.pathname === `/metodo/${method.slug}` ? 'navbar__link--active' : ''}`}
              style={{ '--method-color': method.colorHex }}
            >
              <span className="navbar__link-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <MethodIcon name={method.iconName} size={14} color={method.colorHex} />
              </span>
              <span className="navbar__link-label">{method.shortTitle}</span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="navbar__actions">
          <a
            href={`${import.meta.env.BASE_URL}docs/Portafolio_Cuantitativos Jose Luis Lopez.pdf`}
            download
            className="navbar__download"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            PDF
          </a>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          {methodsData.map((method) => (
            <Link
              key={method.id}
              to={`/metodo/${method.slug}`}
              className="navbar__mobile-link"
              style={{ '--method-color': method.colorHex }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <MethodIcon name={method.iconName} size={16} color={method.colorHex} />
              </span>
              <span>{method.title}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
