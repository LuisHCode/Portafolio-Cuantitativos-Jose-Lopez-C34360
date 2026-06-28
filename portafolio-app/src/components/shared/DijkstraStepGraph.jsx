import React from 'react';

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

const STEP_DATA = [
  // Paso 1: Inicialización
  {
    currentNode: 'A',
    optimalNodes: ['A'],
    optimalEdges: [],
    distances: { A: '0', B: '∞', C: '∞', D: '∞', E: '∞', F: '∞' }
  },
  // Paso 2: Explorar desde A
  {
    currentNode: 'A',
    optimalNodes: ['A', 'B'],
    optimalEdges: [{ from: 'A', to: 'B' }],
    distances: { A: '0', B: '60', C: '90', D: '∞', E: '∞', F: '∞' }
  },
  // Paso 3: Explorar desde B(60)
  {
    currentNode: 'B',
    optimalNodes: ['A', 'B', 'D'],
    optimalEdges: [{ from: 'A', to: 'B' }, { from: 'B', to: 'D' }],
    distances: { A: '0', B: '60', C: '90', D: '100', E: '∞', F: '∞' }
  },
  // Paso 4: Explorar desde C(90)
  {
    currentNode: 'C',
    optimalNodes: ['A', 'B', 'D'],
    optimalEdges: [{ from: 'A', to: 'B' }, { from: 'B', to: 'D' }],
    distances: { A: '0', B: '60', C: '90', D: '100', E: '125', F: '∞' }
  },
  // Paso 5: Explorar desde D(100)
  {
    currentNode: 'D',
    optimalNodes: ['A', 'B', 'D', 'F'],
    optimalEdges: [{ from: 'A', to: 'B' }, { from: 'B', to: 'D' }, { from: 'D', to: 'F' }],
    distances: { A: '0', B: '60', C: '90', D: '100', E: '125', F: '155' }
  },
  // Paso 6: Explorar desde E(125)
  {
    currentNode: 'E',
    optimalNodes: ['A', 'B', 'D', 'F'],
    optimalEdges: [{ from: 'A', to: 'B' }, { from: 'B', to: 'D' }, { from: 'D', to: 'F' }],
    distances: { A: '0', B: '60', C: '90', D: '100', E: '125', F: '155' }
  },
  // Paso 7: Resultado Final (Ruta Óptima)
  {
    currentNode: null,
    optimalNodes: ['A', 'B', 'D', 'F'],
    optimalEdges: [{ from: 'A', to: 'B' }, { from: 'B', to: 'D' }, { from: 'D', to: 'F' }],
    distances: { A: '0', B: '60', C: '90', D: '100', E: '125', F: '155' }
  }
];

const DijkstraStepGraph = ({ activeStep, color }) => {
  const step = STEP_DATA[activeStep] || STEP_DATA[0];

  const getNode = (id) => NODES.find(n => n.id === id);
  
  const isEdgeOptimal = (fromId, toId) =>
    step.optimalEdges.some(e => e.from === fromId && e.to === toId);

  return (
    <div className="dijkstra-step-graph glass-card" style={{ padding: '1rem', marginBottom: '1.25rem' }}>
      <div className="chart-legend-bar" style={{ marginBottom: '0.75rem', justifyContent: 'flex-start', gap: '1.25rem', fontSize: '0.78rem' }}>
        <span className="chart-legend-item">
          <span className="dot" style={{ background: color }} />
          Ruta Óptima Confirmada
        </span>
        <span className="chart-legend-item">
          <span className="dot" style={{ background: '#00d4ff' }} />
          Nodo en Evaluación
        </span>
        <span className="chart-legend-item">
          <span className="dot" style={{ background: 'rgba(255,255,255,0.1)' }} />
          Otros Nodos / Alternativas
        </span>
      </div>

      <div className="chart-svg-wrap" style={{ height: '240px', background: 'rgba(0,0,0,0.15)' }}>
        <svg viewBox="0 0 540 400" preserveAspectRatio="xMidYMid meet" className="chart-svg">
          <defs>
            <marker id="arrow-step-opt" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill={color} />
            </marker>
            <marker id="arrow-step-def" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="rgba(255,255,255,0.15)" />
            </marker>
            <filter id="glow-step">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-focus">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Arcos */}
          {EDGES.map((edge, i) => {
            const from = getNode(edge.from);
            const to = getNode(edge.to);
            const isPath = isEdgeOptimal(edge.from, edge.to);
            
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
                  stroke={isPath ? color : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isPath ? 3 : 1.2}
                  markerEnd={isPath ? 'url(#arrow-step-opt)' : 'url(#arrow-step-def)'}
                  style={{ filter: isPath ? 'url(#glow-step)' : 'none', transition: 'all 0.3s' }}
                />
                {/* Weight label */}
                <rect x={mx - 15} y={my - 10} width="30" height="18" rx="4"
                  fill="rgba(8,12,20,0.85)" stroke={isPath ? color : 'rgba(255,255,255,0.05)'} strokeWidth="1"/>
                <text x={mx} y={my + 4} textAnchor="middle" fontSize="10"
                  fill={isPath ? color : '#6e768e'} fontFamily="Outfit" fontWeight={isPath ? '700' : '400'}>
                  {edge.weight}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((node) => {
            const isOptimal = step.optimalNodes.includes(node.id);
            const isCurrent = step.currentNode === node.id;
            const dist = step.distances[node.id];
            
            return (
              <g key={node.id}>
                <circle cx={node.x} cy={node.y} r={24}
                  fill={
                    isCurrent ? 'rgba(0,212,255,0.15)' :
                    isOptimal ? `${color}15` : 'rgba(255,255,255,0.03)'
                  }
                  stroke={
                    isCurrent ? '#00d4ff' :
                    isOptimal ? color : 'rgba(255,255,255,0.15)'
                  }
                  strokeWidth={isCurrent || isOptimal ? 2.5 : 1.2}
                  style={{ 
                    transition: 'all 0.2s', 
                    filter: isCurrent ? 'url(#glow-focus)' : isOptimal ? 'url(#glow-step)' : 'none' 
                  }}
                />
                <text x={node.x} y={node.y - 4} textAnchor="middle" fontSize="13" fontWeight="800"
                  fill={isCurrent ? '#00d4ff' : isOptimal ? color : 'rgba(255,255,255,0.5)'}
                  fontFamily="Outfit">
                  {node.id}
                </text>
                <text x={node.x} y={node.y + 9} textAnchor="middle" fontSize="8.5"
                  fill="rgba(255,255,255,0.35)" fontFamily="Outfit">
                  {node.label.split('\n')[1]}
                </text>
                {/* Distance Label */}
                <text x={node.x} y={node.y - 32} textAnchor="middle" fontSize="9.5" fontWeight="700"
                  fill={isCurrent ? '#00d4ff' : isOptimal ? color : '#6e768e'} fontFamily="Outfit">
                  d={dist}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default DijkstraStepGraph;
