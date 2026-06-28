import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Legend, Area, AreaChart
} from 'recharts';
import './Charts.css';
import MethodIcon from '../shared/MethodIcon.jsx';

// Región factible del taller textil
// Restricciones: x+2y≤10, 2x+y≤11, x+y≤9, x,y≥0
// Vértices de la región factible: (0,0), (5.5,0), (4,3), (0,5)
// Punto óptimo entero: (4,3) → Z=390

const ProgramacionChart = ({ method }) => {
  const color = method.colorHex;

  // Datos de la función objetivo evaluados en varios puntos de la frontera factible
  const evalPoints = [
    { x: 0,   y: 0,   z: 0,   label: '(0,0)' },
    { x: 1,   y: 0,   z: 60 },
    { x: 2,   y: 0,   z: 120 },
    { x: 3,   y: 0,   z: 180 },
    { x: 4,   y: 0,   z: 240 },
    { x: 5,   y: 0,   z: 300 },
    { x: 5.5, y: 0,   z: 330, label: '(5.5,0)' },
    { x: 5,   y: 1,   z: 350 },
    { x: 4,   y: 3,   z: 390, label: '★ Óptimo (4,3)' },
    { x: 3,   y: 3.5, z: 355 },
    { x: 2,   y: 4,   z: 320 },
    { x: 1,   y: 4.5, z: 285 },
    { x: 0,   y: 5,   z: 250, label: '(0,5)' },
  ];

  // Restricciones para graficar
  const constraintPoints = Array.from({ length: 12 }, (_, i) => {
    const x = i * 0.5;
    return {
      x,
      tela: Math.max(0, (10 - x) / 2),     // y = (10-x)/2
      tiempo: Math.max(0, (11 - 2 * x)),    // y = 11-2x
      botones: Math.max(0, 9 - x),          // y = 9-x
    };
  }).filter(p => p.x <= 6);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <div className="chart-tooltip__title">x₁ (Camisas) = {label}</div>
          {payload.map((p, i) => (
            <div key={i} className="chart-tooltip__row" style={{ color: p.color }}>
              {p.name}: {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-wrap">
      <div className="chart-legend-bar">
        <span className="chart-legend-item">
          <span className="dot" style={{ background: '#00d4ff' }} />Tela (x+2y≤10)
        </span>
        <span className="chart-legend-item">
          <span className="dot" style={{ background: '#10b981' }} />Tiempo (2x+y≤11)
        </span>
        <span className="chart-legend-item">
          <span className="dot" style={{ background: '#f59e0b' }} />Botones (x+y≤9)
        </span>
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={constraintPoints} margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="x" stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 11 }} label={{ value: 'x₁ Camisas', position: 'insideBottom', offset: -5, fill: '#8892b0', fontSize: 11 }}/>
            <YAxis stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 11 }} label={{ value: 'x₂ Pantalones', angle: -90, position: 'insideLeft', fill: '#8892b0', fontSize: 11 }}/>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#8892b0', fontSize: '12px' }} />
            <Line type="monotone" dataKey="tela"    stroke="#00d4ff" strokeWidth={2} dot={false} name="Tela"    />
            <Line type="monotone" dataKey="tiempo"  stroke="#10b981" strokeWidth={2} dot={false} name="Tiempo"  />
            <Line type="monotone" dataKey="botones" stroke="#f59e0b" strokeWidth={2} dot={false} name="Botones" />
            {/* Punto óptimo */}
            <ReferenceLine x={4} stroke={color} strokeDasharray="4 4" strokeOpacity={0.6}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Evaluación de vértices */}
      <div style={{ marginTop: '2rem' }}>
        <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.75rem', fontFamily: 'Outfit' }}>
          📍 Evaluación de la Función Objetivo Z = 60x₁ + 50x₂ en los vértices enteros:
        </h4>
        <div style={{ width: '100%', height: 200 }}>
          <ResponsiveContainer>
            <AreaChart data={evalPoints.filter(p => p.label)} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="label" stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 10 }} />
              <YAxis stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 10 }} />
              <Tooltip formatter={(v) => [`Z = $${v}`, 'Ganancia']} contentStyle={{ background: '#0d1424', border: `1px solid ${color}`, borderRadius: '8px', color: '#f0f4ff' }} />
              <defs>
                <linearGradient id="zGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="z" stroke={color} strokeWidth={2} fill="url(#zGrad)" name="Z" />
              <ReferenceLine y={390} stroke={color} strokeDasharray="4 4" label={{ value: 'Z=390 ★', fill: color, fontSize: 11 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-result-banner" style={{ borderColor: color, color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
        <MethodIcon name="Trophy" size={16} color={color} />
        <span>Solución Óptima: x₁=4 Camisas, x₂=3 Pantalones → <strong>Z_máx = $390</strong></span>
      </div>
    </div>
  );
};

export default ProgramacionChart;
