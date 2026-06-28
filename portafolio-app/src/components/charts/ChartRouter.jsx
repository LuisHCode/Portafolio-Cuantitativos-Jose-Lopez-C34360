import React from 'react';
import TransporteChart from './TransporteChart.jsx';
import ProgramacionChart from './ProgramacionChart.jsx';
import ProgramacionMetasChart from './ProgramacionMetasChart.jsx';
import ProgramacionNoLinealChart from './ProgramacionNoLinealChart.jsx';
import RedesChart from './RedesChart.jsx';
import MonteCarloChart from './MonteCarloChart.jsx';
import MarkovChart from './MarkovChart.jsx';
import ControlChart from './ControlChart.jsx';
import './ChartRouter.css';

const ChartRouter = ({ method, activeExercise }) => {
  const getProgramacionChart = () => {
    if (activeExercise?.id === 'metas') {
      return <ProgramacionMetasChart method={method} activeExercise={activeExercise} />;
    }
    if (activeExercise?.id === 'nolineal') {
      return <ProgramacionNoLinealChart method={method} activeExercise={activeExercise} />;
    }
    return <ProgramacionChart method={method} activeExercise={activeExercise} />;
  };

  const charts = {
    transporte: <TransporteChart method={method} />,
    programacion: getProgramacionChart(),
    redes: <RedesChart method={method} />,
    montecarlo: <MonteCarloChart method={method} activeExercise={activeExercise} />,
    markov: <MarkovChart method={method} />,
    control: <ControlChart method={method} />,
  };

  return (
    <div className="chart-container" style={{ '--mc': method.colorHex }}>
      <div className="chart-header">
        <div className="chart-header__badge">Visualización Interactiva</div>
        <h2 className="chart-header__title">Representación Gráfica</h2>
        <p className="chart-header__desc">
          Visualización del ejercicio práctico resuelto con los datos del portafolio.
        </p>
      </div>
      {charts[method.slug] || (
        <div className="chart-placeholder">
          <div className="chart-placeholder__icon">📊</div>
          <p>Gráfico disponible próximamente</p>
        </div>
      )}
    </div>
  );
};

export default ChartRouter;
