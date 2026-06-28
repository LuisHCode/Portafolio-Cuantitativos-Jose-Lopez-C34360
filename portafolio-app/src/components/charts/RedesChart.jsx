import React, { useState } from 'react';
import './Charts.css';
import MethodIcon from '../shared/MethodIcon.jsx';

// Grafo para el ejercicio de Dijkstra
const NODES = [
  { id: 'A', label: 'A\nMoín', x: 60,  y: 200 },
  { id: 'B', label: 'B\nSiquirres', x: 200, y: 100 },
  { id: 'C', label: 'C\nTurrialba', x: 200, y: 300 },
  { id: 'D', label: 'D\nCartago', x: 340, y: 101 },
  { id: 'E', label: 'E\nParaíso', x: 341, y: 301 },
  { id: 'F', label: 'F\nSan José', x: 480, y: 200 },
];

const EDGES = [
  { from: 'A', to: 'B', weight: 60 },
  { from: 'A', to: 'C', weight: 90 },
  { from: 'B', to: 'C', weight: 50 },
  { from: 'B', to: 'D', weight: 40 },
  { from: 'C', to: 'E', weight: 35 },
  { from: 'D', to: 'E', weight: 30 },
  { from: 'D', to: 'F', weight: 55 },
  { from: 'E', to: 'F', weight: 45 },
];

// Ruta más corta: A→B→D→F = 60+40+55=155
const SHORTEST_PATH = ['A', 'B', 'D', 'F'];
const SHORTEST_EDGES = [
  { from: 'A', to: 'B' },
  { from: 'B', to: 'D' },
  { from: 'D', to: 'F' },
];

const RedesChart = ({ method }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [showPath, setShowPath] = useState(true);
  const color = method.colorHex;

  const getNode = (id) => NODES.find(n => n.id === id);
  const isOnPath = (fromId, toId) =>
    SHORTEST_EDGES.some(e => e.from === fromId && e.to === toId);

  return (
    <div className="chart-wrap">
      <div className="chart-legend-bar">
        <span className="chart-legend-item">
          <span className="dot" style={{ background: color }} />
          Ruta más corta (A→B→D→F = 155 km)
        </span>
        <span className="chart-legend-item">
          <span className="dot" style={{ background: 'rgba(255,255,255,0.2)' }} />
          Rutas alternativas
        </span>
        <button
          className="chart-toggle-btn"
          onClick={() => setShowPath(p => !p)}
          style={{ borderColor: color, color }}
        >
          {showPath ? '👁 Ocultar ruta' : '👁 Mostrar ruta'}
        </button>
      </div>

      <div className="chart-svg-wrap">
        <svg viewBox="0 0 540 400" preserveAspectRatio="xMidYMid meet" className="chart-svg">
          <defs>
            <marker id="arrow-r-opt" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill={color} />
            </marker>
            <marker id="arrow-r-def" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="rgba(255,255,255,0.25)" />
            </marker>
            <filter id="glow-r">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Arcos */}
          {EDGES.map((edge, i) => {
            const from = getNode(edge.from);
            const to = getNode(edge.to);
            const isPath = showPath && isOnPath(edge.from, edge.to);
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const ux = dx / len; const uy = dy / len;
            const x1 = from.x + ux * 26;
            const y1 = from.y + uy * 26;
            const x2 = to.x - ux * 30;
            const y2 = to.y - uy * 30;
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;

            return (
              <g key={i}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isPath ? color : 'rgba(255,255,255,0.18)'}
                  strokeWidth={isPath ? 3 : 1.5}
                  markerEnd={isPath ? 'url(#arrow-r-opt)' : 'url(#arrow-r-def)'}
                  style={{ filter: isPath ? 'url(#glow-r)' : 'none', transition: 'all 0.3s' }}
                />
                {/* Weight label */}
                <rect x={mx - 15} y={my - 10} width="30" height="18" rx="4"
                  fill="rgba(8,12,20,0.85)" stroke={isPath ? color : 'rgba(255,255,255,0.1)'} strokeWidth="1"/>
                <text x={mx} y={my + 4} textAnchor="middle" fontSize="10"
                  fill={isPath ? color : '#8892b0'} fontFamily="Outfit" fontWeight={isPath ? '700' : '400'}>
                  {edge.weight}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((node) => {
            const isPath = showPath && SHORTEST_PATH.includes(node.id);
            const isHovered = hoveredNode === node.id;
            const isOrigin = node.id === 'A';
            const isDest = node.id === 'F';
            return (
              <g key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}>
                <circle cx={node.x} cy={node.y} r={isHovered ? 28 : 24}
                  fill={
                    isOrigin ? 'rgba(0,212,255,0.2)' :
                    isDest ? 'rgba(16,185,129,0.2)' :
                    isPath ? `${color}20` : 'rgba(255,255,255,0.05)'
                  }
                  stroke={
                    isOrigin ? '#00d4ff' :
                    isDest ? '#10b981' :
                    isPath ? color : 'rgba(255,255,255,0.2)'
                  }
                  strokeWidth={isPath ? 2.5 : 1.5}
                  style={{ transition: 'all 0.2s', filter: isPath ? 'url(#glow-r)' : 'none' }}
                />
                <text x={node.x} y={node.y - 4} textAnchor="middle" fontSize="13" fontWeight="800"
                  fill={isOrigin ? '#00d4ff' : isDest ? '#10b981' : isPath ? color : 'rgba(255,255,255,0.7)'}
                  fontFamily="Outfit">
                  {node.id}
                </text>
                <text x={node.x} y={node.y + 9} textAnchor="middle" fontSize="8.5"
                  fill="rgba(255,255,255,0.45)" fontFamily="Outfit">
                  {node.label.split('\n')[1]}
                </text>
                {/* Dijkstra labels */}
                {isOrigin && (
                  <text x={node.x} y={node.y - 32} textAnchor="middle" fontSize="9"
                    fill="#00d4ff" fontFamily="Outfit">d=0</text>
                )}
                {node.id === 'B' && showPath && (
                  <text x={node.x} y={node.y - 32} textAnchor="middle" fontSize="9"
                    fill={color} fontFamily="Outfit">d=60</text>
                )}
                {node.id === 'C' && showPath && (
                  <text x={node.x} y={node.y + 42} textAnchor="middle" fontSize="9"
                    fill="rgba(255,255,255,0.5)" fontFamily="Outfit">d=90</text>
                )}
                {node.id === 'D' && showPath && (
                  <text x={node.x} y={node.y - 32} textAnchor="middle" fontSize="9"
                    fill={color} fontFamily="Outfit">d=100</text>
                )}
                {node.id === 'E' && showPath && (
                  <text x={node.x} y={node.y + 42} textAnchor="middle" fontSize="9"
                    fill="rgba(255,255,255,0.5)" fontFamily="Outfit">d=125</text>
                )}
                {isDest && showPath && (
                  <text x={node.x} y={node.y - 32} textAnchor="middle" fontSize="9"
                    fill="#10b981" fontFamily="Outfit">d=155 ★</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Distance table */}
      <div className="chart-table-wrap">
        <table className="chart-table">
          <thead>
            <tr>
              <th>Nodo</th>
              <th>Distancia Final</th>
              <th>Ruta</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'A', dist: 0,   route: '—',           onPath: true },
              { id: 'B', dist: 60,  route: 'A→B',         onPath: true },
              { id: 'C', dist: 90,  route: 'A→C',         onPath: false },
              { id: 'D', dist: 100, route: 'A→B→D',       onPath: true },
              { id: 'E', dist: 125, route: 'A→B→C→E',     onPath: false },
              { id: 'F', dist: 155, route: 'A→B→D→F ★',  onPath: true },
            ].map(row => (
              <tr key={row.id} style={{ background: row.onPath ? `${color}10` : 'transparent' }}>
                <td style={{ color: row.onPath ? color : 'var(--text-secondary)', fontWeight: row.onPath ? '700' : '400' }}>{row.id}</td>
                <td style={{ color: row.onPath ? color : 'var(--text-muted)' }}>{row.dist} km</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{row.route}</td>
                <td>
                  <span style={{ color: row.onPath ? color : 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {row.onPath ? '✓ Ruta óptima' : 'Alternativa'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="chart-result-banner" style={{ borderColor: color, color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
        <MethodIcon name="Trophy" size={16} color={color} />
        <span>Ruta más corta: A → B → D → F con <strong>155 km</strong> de distancia total</span>
      </div>
    </div>
  );
};

export default RedesChart;
