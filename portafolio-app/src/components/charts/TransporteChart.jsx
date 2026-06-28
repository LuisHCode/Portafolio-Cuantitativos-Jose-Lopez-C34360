import React, { useState } from 'react';
import './Charts.css';
import MethodIcon from '../shared/MethodIcon.jsx';

// Posiciones fijas de nodos en el SVG
const NODES = {
  Cartago:       { x: 80,  y: 100 },
  Limón:         { x: 80,  y: 250 },
  Alajuela:      { x: 80,  y: 400 },
  Guanacaste:    { x: 480, y: 80  },
  'Limón Centro':{ x: 480, y: 200 },
  Puntarenas:    { x: 480, y: 320 },
  'San José':    { x: 480, y: 440 },
};

const SOLUTION = [
  { from: 'Cartago',  to: 'Guanacaste',   units: 100, gain: 95 },
  { from: 'Cartago',  to: 'Puntarenas',   units: 20,  gain: 85 },
  { from: 'Limón',    to: 'Puntarenas',   units: 80,  gain: 80 },
  { from: 'Alajuela', to: 'Limón Centro', units: 85,  gain: 78 },
  { from: 'Alajuela', to: 'Puntarenas',   units: 5,   gain: 83 },
  { from: 'Alajuela', to: 'San José',     units: 110, gain: 58 },
];

const SUPPLY = { Cartago: 120, 'Limón': 80, Alajuela: 200 };
const DEMAND = { Guanacaste: 100, 'Limón Centro': 85, Puntarenas: 105, 'San José': 110 };

const TransporteChart = ({ method }) => {
  const [hovered, setHovered] = useState(null);
  const color = method.colorHex;
  const maxUnits = 110;

  return (
    <div className="chart-wrap">
      <div className="chart-legend-bar">
        <span className="chart-legend-item">
          <span className="dot" style={{ background: color }} />
          Rutas de distribución (grosor ∝ unidades enviadas)
        </span>
        <span className="chart-legend-item">
          <span className="dot" style={{ background: '#4a5568' }} />
          Nodo de Origen / Destino
        </span>
      </div>

      <div className="chart-svg-wrap">
        <svg viewBox="0 0 560 520" preserveAspectRatio="xMidYMid meet" className="chart-svg">
          <defs>
            <marker id="arrow-t" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill={color} opacity="0.7" />
            </marker>
            <filter id="glow-t">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Separador central */}
          <line x1="280" y1="40" x2="280" y2="480" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="5,5"/>

          {/* Etiquetas de columna */}
          <text x="80" y="30" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Outfit">ORÍGENES</text>
          <text x="480" y="30" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="Outfit">DESTINOS</text>

          {/* Arcos de solución */}
          {SOLUTION.map((route, i) => {
            const from = NODES[route.from];
            const to = NODES[route.to];
            const strokeW = 1 + (route.units / maxUnits) * 7;
            const isHovered = hovered === i;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            return (
              <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                <line
                  x1={from.x + 32} y1={from.y}
                  x2={to.x - 42}   y2={to.y}
                  stroke={color}
                  strokeWidth={isHovered ? strokeW + 2 : strokeW}
                  strokeOpacity={isHovered ? 0.9 : 0.55}
                  markerEnd="url(#arrow-t)"
                  style={{ filter: isHovered ? `url(#glow-t)` : 'none', transition: 'all 0.2s' }}
                />
                {/* Label flotante */}
                {isHovered && (
                  <g>
                    <rect x={midX - 50} y={midY - 22} width="100" height="40" rx="6"
                      fill="rgba(8,12,20,0.9)" stroke={color} strokeWidth="1"/>
                    <text x={midX} y={midY - 5} textAnchor="middle" fill={color} fontSize="11" fontFamily="Outfit" fontWeight="700">
                      {route.units} unidades
                    </text>
                    <text x={midX} y={midY + 12} textAnchor="middle" fill="#8892b0" fontSize="10" fontFamily="Outfit">
                      Ganancia/u: ${route.gain}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Nodos Orígenes */}
          {Object.entries(SUPPLY).map(([name, supply]) => {
            const n = NODES[name];
            return (
              <g key={name}>
                <circle cx={n.x} cy={n.y} r="28" fill="rgba(0,212,255,0.12)"
                  stroke={color} strokeWidth="2"/>
                <circle cx={n.x} cy={n.y} r="24" fill="rgba(8,12,20,0.8)"/>
                <text x={n.x} y={n.y - 4} textAnchor="middle" fill={color} fontSize="11" fontFamily="Outfit" fontWeight="700">{name}</text>
                <text x={n.x} y={n.y + 12} textAnchor="middle" fill="#8892b0" fontSize="10" fontFamily="Outfit">S={supply}</text>
              </g>
            );
          })}

          {/* Nodos Destinos */}
          {Object.entries(DEMAND).map(([name, demand]) => {
            const n = NODES[name];
            return (
              <g key={name}>
                <circle cx={n.x} cy={n.y} r="30" fill="rgba(124,58,237,0.12)"
                  stroke="var(--neon-violet)" strokeWidth="2"/>
                <circle cx={n.x} cy={n.y} r="26" fill="rgba(8,12,20,0.8)"/>
                <text x={n.x} y={n.y - 5} textAnchor="middle" fill="#a855f7" fontSize="10" fontFamily="Outfit" fontWeight="700">{name}</text>
                <text x={n.x} y={n.y + 9} textAnchor="middle" fill="#8892b0" fontSize="10" fontFamily="Outfit">D={demand}</text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Stats */}
      <div className="chart-stats-row">
        {SOLUTION.map((r, i) => (
          <div key={i} className="chart-stat-chip"
            style={{ borderColor: hovered === i ? color : 'var(--border-subtle)' }}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <span className="chart-stat-chip__route">{r.from} → {r.to}</span>
            <span className="chart-stat-chip__units" style={{ color }}>{r.units} u.</span>
          </div>
        ))}
      </div>

      <div className="chart-result-banner" style={{ borderColor: color, color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
        <MethodIcon name="Trophy" size={16} color={color} />
        <span>Ganancia Total Óptima: <strong>Z = $31,025</strong></span>
      </div>
    </div>
  );
};

export default TransporteChart;
