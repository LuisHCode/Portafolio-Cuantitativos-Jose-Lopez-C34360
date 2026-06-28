import React from 'react';
import { Link } from 'react-router-dom';
import methodsData from '../../data/methods.js';
import './Footer.css';
import MethodIcon from '../shared/MethodIcon.jsx';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon"><MethodIcon name="Sparkles" size={18} /></span>
              <div>
                <div className="footer__logo-title">Métodos Cuantitativos</div>
                <div className="footer__logo-sub">Portafolio Digital</div>
              </div>
            </div>
            <p className="footer__desc">
              Portafolio académico de análisis cuantitativo desarrollado como parte del curso de Métodos Cuantitativos en la Universidad de Costa Rica.
            </p>
            <a
              href={`${import.meta.env.BASE_URL}docs/Portafolio_Cuantitativos Jose Luis Lopez.pdf`}
              download
              className="btn-primary footer__download"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar Portafolio Completo (PDF)
            </a>
          </div>

          {/* Methods Links */}
          <div className="footer__links">
            <h4 className="footer__links-title">Métodos</h4>
            {methodsData.map((method) => (
              <Link
                key={method.id}
                to={`/metodo/${method.slug}`}
                className="footer__link"
                style={{ '--method-color': method.colorHex }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <MethodIcon name={method.iconName} size={14} color={method.colorHex} />
                </span>
                <span>{method.title}</span>
              </Link>
            ))}
          </div>

          {/* Info */}
          <div className="footer__info">
            <h4 className="footer__links-title">Información</h4>
            <div className="footer__info-item">
              <span className="footer__info-label">Estudiante</span>
              <span className="footer__info-value">José Luis López Hernández</span>
            </div>
            <div className="footer__info-item">
              <span className="footer__info-label">Carnet</span>
              <span className="footer__info-value">C34360</span>
            </div>
            <div className="footer__info-item">
              <span className="footer__info-label">Curso</span>
              <span className="footer__info-value">Métodos Cuantitativos</span>
            </div>
            <div className="footer__info-item">
              <span className="footer__info-label">Universidad</span>
              <span className="footer__info-value">Universidad de Costa Rica</span>
            </div>
            <div className="footer__info-item">
              <span className="footer__info-label">Fecha</span>
              <span className="footer__info-value">Junio 2026</span>
            </div>
          </div>
        </div>

        <div className="divider-glow" />

        <div className="footer__bottom">
          <p className="footer__copy">
            © 2026 José Luis López Hernández · C34360 · Universidad de Costa Rica
          </p>
          <div className="footer__badges">
            <span className="badge badge-cyan">Sétimo Semestre</span>
            <span className="badge badge-purple">Métodos Cuantitativos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
