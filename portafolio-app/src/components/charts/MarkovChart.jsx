import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine
} from 'recharts';
import './Charts.css';

// Calcular períodos sucesivos de la cadena de Markov
const P = [
  [0.70, 0.20, 0.10],
  [0.15, 0.65, 0.20],
  [0.10, 0.25, 0.65],
];

const multiplyVectorMatrix = (vec, mat) =>
  mat[0].map((_, col) => vec.reduce((sum, v, row) => sum + v * mat[row][col], 0));

const generatePeriods = (initial, periods) => {
  const results = [{ period: 0, Kölbi: initial[0], Liberty: initial[1], Claro: initial[2] }];
  let current = initial;
  for (let i = 1; i <= periods; i++) {
    current = multiplyVectorMatrix(current, P);
    results.push({
      period: i,
      Kölbi: Number((current[0] * 100).toFixed(2)),
      Liberty: Number((current[1] * 100).toFixed(2)),
      Claro: Number((current[2] * 100).toFixed(2)),
    });
  }
  return results;
};

const STATES = ['Kölbi', 'Liberty', 'Claro'];
const STATE_COLORS = ['#00d4ff', '#ec4899', '#10b981'];
const STEADY_STATE = [38.46, 30.77, 30.77];

const MarkovChart = ({ method }) => {
  const color = method.colorHex;
  const initial = [0.50, 0.30, 0.20];
  const [periods, setPeriods] = useState(15);

  const data = generatePeriods(initial, periods);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <div className="chart-tooltip__title">Período {label}</div>
          {payload.map((p, i) => (
            <div key={i} className="chart-tooltip__row" style={{ color: p.color }}>
              {p.name}: {Number(p.value).toFixed(2)}%
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
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Períodos a simular:
        </span>
        <input
          type="range" min="5" max="30" value={periods}
          onChange={e => setPeriods(Number(e.target.value))}
          className="chart-slider"
          style={{ accentColor: color }}
        />
        <span style={{ color, fontWeight: '700', fontFamily: 'Outfit', minWidth: '30px' }}>{periods}</span>
      </div>

      {/* Convergence chart */}
      <h4 className="chart-subtitle">Convergencia al Estado Estable por Período</h4>
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="period" stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 11 }}
              label={{ value: 'Período (meses)', position: 'insideBottom', offset: -5, fill: '#8892b0', fontSize: 11 }}/>
            <YAxis stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 11 }}
              tickFormatter={v => `${v}%`} domain={[0, 60]}
              label={{ value: '% Participación de Mercado', angle: -90, position: 'insideLeft', fill: '#8892b0', fontSize: 11, offset: 10 }}/>
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#8892b0', fontSize: '12px' }} />
            {/* Steady state reference lines */}
            {STATES.map((s, i) => (
              <ReferenceLine key={s} y={STEADY_STATE[i]} stroke={STATE_COLORS[i]} strokeDasharray="5 5" strokeOpacity={0.4}
                label={{ value: `π${s[0]}=${STEADY_STATE[i]}%`, fill: STATE_COLORS[i], fontSize: 9, position: 'right' }} />
            ))}
            {STATES.map((s, i) => (
              <Line key={s} type="monotone" dataKey={s}
                stroke={STATE_COLORS[i]} strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, fill: STATE_COLORS[i] }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Transition Matrix */}
      <div style={{ marginTop: '2rem' }}>
        <h4 className="chart-subtitle">Matriz de Transición P</h4>
        <div className="chart-table-wrap">
          <table className="chart-table">
            <thead>
              <tr>
                <th>Desde\Hacia</th>
                {STATES.map((s, i) => (
                  <th key={s} style={{ color: STATE_COLORS[i] }}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STATES.map((fromState, i) => (
                <tr key={fromState}>
                  <td style={{ color: STATE_COLORS[i], fontWeight: '700' }}>{fromState}</td>
                  {P[i].map((prob, j) => (
                    <td key={j} style={{
                      color: i === j ? color : 'var(--text-secondary)',
                      fontWeight: i === j ? '700' : '400'
                    }}>
                      {(prob * 100).toFixed(0)}%
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* State vector evolution table */}
      <div style={{ marginTop: '1.5rem' }}>
        <h4 className="chart-subtitle">Evolución del Vector de Estado (Primeros 5 períodos)</h4>
        <div className="chart-table-wrap">
          <table className="chart-table">
            <thead>
              <tr>
                <th>Período</th>
                {STATES.map((s, i) => <th key={s} style={{ color: STATE_COLORS[i] }}>{s}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 6).map((row) => (
                <tr key={row.period}>
                  <td style={{ color: 'var(--text-muted)' }}>π({row.period})</td>
                  <td style={{ color: STATE_COLORS[0] }}>{Number(row.Kölbi).toFixed(2)}%</td>
                  <td style={{ color: STATE_COLORS[1] }}>{Number(row.Liberty).toFixed(2)}%</td>
                  <td style={{ color: STATE_COLORS[2] }}>{Number(row.Claro).toFixed(2)}%</td>
                </tr>
              ))}
              <tr style={{ background: `${color}10`, fontWeight: '700' }}>
                <td style={{ color }}>π estable</td>
                {STEADY_STATE.map((v, i) => (
                  <td key={i} style={{ color: STATE_COLORS[i] }}>{v}%</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="chart-result-banner" style={{ borderColor: color, color }}>
        🔄 Estado Estable: Kölbi <strong>38.46%</strong> | Liberty <strong>30.77%</strong> | Claro <strong>30.77%</strong>
      </div>
    </div>
  );
};

export default MarkovChart;
