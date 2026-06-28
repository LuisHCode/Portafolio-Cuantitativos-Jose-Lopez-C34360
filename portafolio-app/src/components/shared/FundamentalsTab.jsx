import React from 'react';
import LatexFormula from './LatexFormula.jsx';
import MethodIcon from './MethodIcon.jsx';
import './FundamentalsTab.css';

const FormulaBlock = ({ formula, color }) => (
  <div className="formula-block" style={{ '--fc': color }}>
    {/* Nombre de la fórmula */}
    <div className="formula-block__name">{formula.name}</div>

    {/* Expresión LaTeX renderizada */}
    <div className="formula-block__latex">
      <LatexFormula formula={formula.latex} display={true} color={color} />
    </div>

    {/* Variables */}
    {formula.variables && formula.variables.length > 0 && (
      <div className="formula-block__vars">
        <div className="formula-block__vars-label">Variables:</div>
        {formula.variables.map((v, i) => (
          <div key={i} className="formula-block__var">
            {/* Símbolo en LaTeX inline */}
            <span className="formula-block__var-sym">
              <LatexFormula formula={v.symbol} display={false} color={color} />
            </span>
            <span className="formula-block__var-desc">{v.desc}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const FundamentalsTab = ({ method }) => {
  return (
    <div className="fundamentals" style={{ '--mc': method.colorHex }}>

      {/* Info grid */}
      <div className="fundamentals__grid">
        <div className="fundamentals__card glass-card">
          <div className="fundamentals__card-icon">
            <MethodIcon name="Target" size={24} color={method.colorHex} />
          </div>
          <h4 className="fundamentals__card-title">¿Para qué es?</h4>
          <p className="fundamentals__card-text">{method.forWhat}</p>
        </div>
        <div className="fundamentals__card glass-card">
          <div className="fundamentals__card-icon">
            <MethodIcon name="Trophy" size={24} color={method.colorHex} />
          </div>
          <h4 className="fundamentals__card-title">Su Objetivo</h4>
          <p className="fundamentals__card-text">{method.objective}</p>
        </div>
      </div>

      {/* Technical aspects */}
      <div className="fundamentals__section">
        <h3 className="fundamentals__section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="fundamentals__section-icon">
            <MethodIcon name="Settings" size={18} color={method.colorHex} />
          </span>
          Aspectos Técnicos a Tener en Cuenta
        </h3>
        <ul className="fundamentals__list">
          {method.technicalAspects.map((aspect, i) => (
            <li key={i} className="fundamentals__list-item">
              <span className="fundamentals__list-bullet" />
              <span>{aspect}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* How it works */}
      <div className="fundamentals__section">
        <h3 className="fundamentals__section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="fundamentals__section-icon">
            <MethodIcon name="RefreshCw" size={18} color={method.colorHex} />
          </span>
          ¿Cómo Funciona?
        </h3>
        <div className="fundamentals__how-text">
          {method.howItWorks}
        </div>
      </div>

      {/* Formulas */}
      <div className="fundamentals__section">
        <h3 className="fundamentals__section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="fundamentals__section-icon">
            <MethodIcon name="HelpCircle" size={18} color={method.colorHex} />
          </span>
          Fórmulas
        </h3>
        <div className="fundamentals__formulas">
          {method.formulas.map((formula, i) => (
            <FormulaBlock key={i} formula={formula} color={method.colorHex} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default FundamentalsTab;
