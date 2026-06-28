import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine
} from 'recharts';
import './Charts.css';

const ProgramacionMetasChart = ({ method, activeExercise }) => {
  const color = method.colorHex;
  const { priorities, solution, deviations } = activeExercise.data;

  // Prepare chart data comparing target vs actual
  // P1: Target 2200, Actual 2200 (deviation 0)
  // P2: Target 160, Actual 160 (deviation 0)
  // P3: Target 300, Actual 360 (excess 60)
  const chartData = [
    { name: 'P1: Ganancia ($)', Meta: 2200, Real: 2200, Desviacion: 0, unidad: '$' },
    { name: 'P2: Trabajo (Hrs)', Meta: 160, Real: 160, Desviacion: 0, unidad: 'hrs' },
    { name: 'P3: Energía (kWh)', Meta: 300, Real: 360, Desviacion: 60, unidad: 'kWh' }
  ];

  return (
    <div className="chart-wrap">
      <h4 className="chart-subtitle" style={{ marginBottom: '1.5rem' }}>
        Logro de Metas por Prioridad (La Espiga Dorada)
      </h4>

      {/* Grid of cards with goals status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {priorities.map((p, i) => {
          let statusText = 'CUMPLIDA';
          let statusClass = 'status-success';
          let deviationText = 'Sin desviación';
          
          if (i === 2 && deviations.d3_plus > 0) {
            statusText = 'EXCEDIDA';
            statusClass = 'status-warning';
            deviationText = `Exceso: +${deviations.d3_plus} kWh`;
          }

          return (
            <div key={i} className="glass-card" style={{ padding: '1.25rem', borderLeft: `4px solid ${i === 2 ? '#ec4899' : '#10b981'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: color }}>
                  Prioridad P{i+1}
                </span>
                <span className={`badge ${statusClass}`} style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px' }}>
                  {statusText}
                </span>
              </div>
              <h5 style={{ margin: '0.25rem 0', color: '#f0f4ff', fontSize: '0.9rem' }}>{p.label.split(' (')[0]}</h5>
              <div style={{ fontSize: '0.8rem', color: '#8892b0', fontFamily: 'monospace', margin: '0.5rem 0' }}>
                Ecuación: {p.formula}
              </div>
              <div style={{ fontSize: '0.82rem', color: i === 2 ? '#ec4899' : '#10b981', fontWeight: '600' }}>
                {deviationText}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recharts comparison bar chart */}
      <div style={{ width: '100%', height: 280, background: 'rgba(0, 0, 0, 0.2)', padding: '1rem', borderRadius: '8px' }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 11 }} />
            <YAxis stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: '#0d1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f0f4ff' }}
              formatter={(value, name, props) => [`${value} ${props.payload.unidad}`, name]}
            />
            <Legend wrapperStyle={{ color: '#8892b0', fontSize: '11px' }} />
            <Bar dataKey="Meta" fill="#3b82f6" fillOpacity={0.6} radius={[4, 4, 0, 0]} name="Meta Propuesta" />
            <Bar dataKey="Real" fill={color} fillOpacity={0.8} radius={[4, 4, 0, 0]} name="Logro Real" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-result-banner" style={{ borderColor: color, color, marginTop: '2rem' }}>
        🎯 Planificación Óptima de Producción:
        <strong> x = {solution.x} lotes de pan</strong> y <strong>y = {solution.y} lotes de repostería</strong> semanales.
      </div>
    </div>
  );
};

export default ProgramacionMetasChart;
