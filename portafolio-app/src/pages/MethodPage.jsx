import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import methodsData from '../data/methods.js';
import TabsPanel from '../components/shared/TabsPanel.jsx';
import StepperPanel from '../components/shared/StepperPanel.jsx';
import FundamentalsTab from '../components/shared/FundamentalsTab.jsx';
import ChartRouter from '../components/charts/ChartRouter.jsx';
import MethodIcon from '../components/shared/MethodIcon.jsx';
import DijkstraStepGraph from '../components/shared/DijkstraStepGraph.jsx';
import './MethodPage.css';

const MethodPage = () => {
  const { slug } = useParams();
  const method = methodsData.find(m => m.slug === slug);

  if (!method) return <Navigate to="/" replace />;

  const [selectedExerciseIdx, setSelectedExerciseIdx] = useState(0);
  const [redesActiveStep, setRedesActiveStep] = useState(0);

  // Reset active step when slug or exercise changes
  React.useEffect(() => {
    setRedesActiveStep(0);
  }, [slug, selectedExerciseIdx]);

  const hasMultipleExercises = !!method.exercises;
  const activeExercise = hasMultipleExercises 
    ? method.exercises[selectedExerciseIdx] 
    : method.exercise;

  const tabs = [
    {
      icon: 'BookOpen',
      label: 'Fundamentos',
      content: <FundamentalsTab method={method} />
    },
    {
      icon: 'Calculator',
      label: 'Ejercicio Paso a Paso',
      content: (
        <div className="exercise-tab">
          <div className="exercise-tab__header">
            <div className="exercise-tab__badge" style={{ '--mc': method.colorHex }}>
              Ejercicio Práctico
            </div>
            <h2 className="exercise-tab__title">{activeExercise.title}</h2>
            <p className="exercise-tab__context">{activeExercise.context}</p>
          </div>
          
          {method.slug === 'redes' ? (
            <div className="redes-stepper-layout">
              <StepperPanel 
                steps={activeExercise.steps} 
                color={method.colorHex} 
                activeStep={redesActiveStep}
                onStepChange={setRedesActiveStep}
              />
              <DijkstraStepGraph activeStep={redesActiveStep} color={method.colorHex} />
            </div>
          ) : (
            <StepperPanel steps={activeExercise.steps} color={method.colorHex} />
          )}

          {/* Result callout */}
          <div className="exercise-tab__result" style={{ '--mc': method.colorHex }}>
            <div className="exercise-tab__result-icon">
              <MethodIcon name="Trophy" size={28} color={method.colorHex} />
            </div>
            <div>
              <div className="exercise-tab__result-label">Resultado Óptimo</div>
              <div className="exercise-tab__result-value">{activeExercise.result}</div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: 'BarChart3',
      label: 'Visualización',
      content: <ChartRouter method={method} activeExercise={activeExercise} />
    }
  ];

  return (
    <div className="method-page" style={{ '--mc': method.colorHex }}>
      {/* Header */}
      <div className="method-hero">
        <div className="method-hero__bg" />
        <div className="container method-hero__content">
          <Link to="/" className="method-hero__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
            Volver al Inicio
          </Link>
          <div className="method-hero__meta">
            <span className="method-hero__num">Método 0{method.id}</span>
          </div>
          <div className="method-hero__icon">
            <MethodIcon name={method.iconName} size={54} />
          </div>
          <h1 className="method-hero__title">{method.title}</h1>
          <p className="method-hero__tagline">{method.tagline}</p>

          {/* Download individual PDF */}
          <a
            href={`${import.meta.env.BASE_URL}${method.pdfFile.startsWith('/') ? method.pdfFile.substring(1) : method.pdfFile}`}
            download
            className="method-hero__download"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Descargar PDF de este Método
          </a>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="container method-tabs">
        {hasMultipleExercises && (
          <div className="exercise-selector">
            <span className="exercise-selector__label">Seleccionar Problema:</span>
            <div className="exercise-selector__tabs">
              {method.exercises.map((ex, i) => (
                <button
                  key={ex.id}
                  className={`exercise-selector__tab ${i === selectedExerciseIdx ? 'active' : ''}`}
                  onClick={() => setSelectedExerciseIdx(i)}
                >
                  {ex.title.split(':')[0]}
                </button>
              ))}
            </div>
          </div>
        )}
        <TabsPanel tabs={tabs} />
      </div>

      {/* Navigation between methods */}
      <div className="method-nav container">
        {methodsData.find(m => m.id === method.id - 1) && (
          <Link
            to={`/metodo/${methodsData.find(m => m.id === method.id - 1).slug}`}
            className="method-nav__btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6"/>
            </svg>
            <MethodIcon name={methodsData.find(m => m.id === method.id - 1).iconName} size={16} />
            {methodsData.find(m => m.id === method.id - 1).shortTitle}
          </Link>
        )}
        <Link to="/" className="method-nav__home">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <MethodIcon name="Home" size={14} /> Inicio
          </span>
        </Link>
        {methodsData.find(m => m.id === method.id + 1) && (
          <Link
            to={`/metodo/${methodsData.find(m => m.id === method.id + 1).slug}`}
            className="method-nav__btn method-nav__btn--right"
          >
            <MethodIcon name={methodsData.find(m => m.id === method.id + 1).iconName} size={16} />
            {methodsData.find(m => m.id === method.id + 1).shortTitle}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6"/>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MethodPage;
