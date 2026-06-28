import React, { useState } from 'react';
import MathFormatter from './MathFormatter.jsx';
import './StepperPanel.css';

const StepperPanel = ({ steps, color, activeStep: controlledActiveStep, onStepChange }) => {
  const [localActiveStep, setLocalActiveStep] = useState(0);

  const activeStep = controlledActiveStep !== undefined ? controlledActiveStep : localActiveStep;

  const setActiveStep = (step) => {
    if (onStepChange) onStepChange(step);
    setLocalActiveStep(step);
  };

  const goNext = () => setActiveStep(Math.min(activeStep + 1, steps.length - 1));
  const goPrev = () => setActiveStep(Math.max(activeStep - 1, 0));

  return (
    <div className="stepper" style={{ '--step-color': color }}>
      {/* Progress bar */}
      <div className="stepper__progress-bar">
        <div
          className="stepper__progress-fill"
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="stepper__indicators">
        {steps.map((_, i) => (
          <button
            key={i}
            className={`stepper__dot ${i === activeStep ? 'active' : ''} ${i < activeStep ? 'completed' : ''}`}
            onClick={() => setActiveStep(i)}
            title={steps[i].title}
          >
            {i < activeStep ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            ) : (
              <span>{i + 1}</span>
            )}
          </button>
        ))}
      </div>

      {/* Current step content */}
      <div className="stepper__card glass-card" key={activeStep}>
        <div className="stepper__card-header">
          <div className="stepper__step-badge">
            Paso {activeStep + 1} de {steps.length}
          </div>
          <h3 className="stepper__title">{steps[activeStep].title}</h3>
        </div>

        <p className="stepper__description">{steps[activeStep].description}</p>

        {steps[activeStep].detail && (
          <div className="stepper__detail">
            <div className="stepper__detail-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
              </svg>
              Detalle del Cálculo
            </div>
            <div className="stepper__detail-code">
              <MathFormatter text={steps[activeStep].detail} color={color} />
            </div>
          </div>
        )}

        {steps[activeStep].table && (
          <div className="stepper__table-section">
            <div className="stepper__detail-label" style={{ marginBottom: '0.75rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
              </svg>
              Matriz / Tabla de Datos
            </div>
            <div className="stepper__table-wrap">
              <table className="stepper__table">
                <thead>
                  <tr>
                    {steps[activeStep].table[0].map((headerCell, idx) => (
                      <th key={idx}>
                        <MathFormatter text={headerCell} color={color} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {steps[activeStep].table.slice(1).map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((cell, cellIdx) => {
                        const isHighlight = cell.includes('(') || cell.includes('✓') || cell.includes('Elegid') || cell.includes('ÓPTIMO') || cell.includes('Largo Plazo');
                        return (
                          <td 
                            key={cellIdx} 
                            className={isHighlight ? 'stepper__cell--highlight' : ''}
                            style={isHighlight ? { '--cell-color': color } : {}}
                          >
                            <MathFormatter text={cell} color={color} />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="stepper__nav">
        <button
          className="stepper__nav-btn"
          onClick={goPrev}
          disabled={activeStep === 0}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
          Anterior
        </button>

        <span className="stepper__counter">
          {activeStep + 1} / {steps.length}
        </span>

        <button
          className="stepper__nav-btn stepper__nav-btn--next"
          onClick={goNext}
          disabled={activeStep === steps.length - 1}
        >
          Siguiente
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StepperPanel;
