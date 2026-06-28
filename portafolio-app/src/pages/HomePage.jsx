import React from 'react';
import { Link } from 'react-router-dom';
import methodsData from '../data/methods.js';
import './HomePage.css';
import MethodIcon from '../components/shared/MethodIcon.jsx';

const HeroSection = () => (
  <section className="hero">
    <div className="hero__bg-effects">
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />
      <div className="hero__grid-overlay" />
    </div>
    <div className="container hero__content">
      <div className="hero__badge animate-fade-up">
        <span className="hero__badge-dot" />
        Portafolio Digital · Sétimo Semestre UCR
      </div>
      <h1 className="hero__title animate-fade-up delay-1">
        Métodos
        <span className="hero__title-gradient"> Cuantitativos</span>
      </h1>
      <p className="hero__subtitle animate-fade-up delay-2">
        Análisis matemático aplicado a la toma de decisiones gerenciales. Seis métodos de optimización, simulación y control estadístico con visualizaciones interactivas y ejercicios resueltos paso a paso.
      </p>
      <div className="hero__author animate-fade-up delay-3">
        <div className="hero__author-avatar">JL</div>
        <div>
          <div className="hero__author-name">José Luis López Hernández</div>
          <div className="hero__author-sub">C34360 · Junio 2026</div>
        </div>
      </div>
      <div className="hero__actions animate-fade-up delay-4">
        <a href="#metodos" className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6,9 12,15 18,9"/>
          </svg>
          Explorar Métodos
        </a>
        <a
          href="/docs/Portafolio_Cuantitativos Jose Luis Lopez.pdf"
          download
          className="btn-outline"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Descargar PDF Completo
        </a>
      </div>

      {/* Stats */}
      <div className="hero__stats animate-fade-up delay-5">
        {[
          { num: '6', label: 'Métodos' },
          { num: '6', label: 'Ejercicios Resueltos' },
          { num: '35', label: 'Páginas de Análisis' },
          { num: '∞', label: 'Visualizaciones' },
        ].map((stat, i) => (
          <div key={i} className="hero__stat">
            <span className="hero__stat-num">{stat.num}</span>
            <span className="hero__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Scroll hint */}
    <div className="hero__scroll-hint">
      <div className="hero__scroll-mouse">
        <div className="hero__scroll-wheel" />
      </div>
    </div>
  </section>
);

const MethodCard = ({ method, index }) => (
  <Link
    to={`/metodo/${method.slug}`}
    className={`method-card animate-fade-up delay-${index + 1}`}
    style={{ '--card-color': method.colorHex }}
  >
    <div className="method-card__glow" />
    <div className="method-card__number">0{method.id}</div>
    <div className="method-card__icon"><MethodIcon name={method.iconName} size={32} /></div>
    <h3 className="method-card__title">{method.title}</h3>
    <p className="method-card__tagline">{method.tagline}</p>
    <div className="method-card__footer">
      <span className="method-card__tag">Ver Método</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12,5 19,12 12,19"/>
      </svg>
    </div>
    <div className="method-card__border" />
  </Link>
);

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />

      <section id="metodos" className="section bento-section">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-cyan">Los 6 Métodos</div>
            <h2 className="section-title">Selecciona un Método</h2>
            <p className="section-desc">
              Cada método incluye explicación teórica, fórmulas, resolución paso a paso del ejercicio práctico y visualizaciones gráficas interactivas.
            </p>
          </div>
          <div className="bento-grid">
            {methodsData.map((method, index) => (
              <MethodCard key={method.id} method={method} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA PDF */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card glass-card">
            <div className="cta-card__icon animate-float">📄</div>
            <h2 className="cta-card__title">Portafolio Completo</h2>
            <p className="cta-card__desc">
              Descarga el documento PDF con todos los métodos, fórmulas y ejercicios resueltos en un solo archivo de referencia completo.
            </p>
            <a
              href="/docs/Portafolio_Cuantitativos Jose Luis Lopez.pdf"
              download
              className="btn-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar Portafolio PDF
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
