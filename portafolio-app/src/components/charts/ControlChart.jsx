import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Legend
} from 'recharts';
import './Charts.css';

const ControlChart = ({ method }) => {
  const color = method.colorHex;
  const { subgroups, grandMean, LCSx, LCIx, meanRange, LCSR, LCIR, sigma, Cp, Cpk, LSE, LIE } = method.exercise.data;
  const [view, setView] = useState('means'); // 'means' | 'ranges'

  const meansData = subgroups.map(sg => ({
    subgroup: `M${sg.id}`,
    mean: sg.mean,
    LCS: LCSx,
    LC: grandMean,
    LCI: LCIx,
    outOfControl: sg.mean > LCSx || sg.mean < LCIx,
  }));

  const rangesData = subgroups.map(sg => ({
    subgroup: `M${sg.id}`,
    range: sg.range,
    LCS: LCSR,
    LC: meanRange,
    LCI: LCIR,
    outOfControl: sg.range > LCSR,
  }));

  const data = view === 'means' ? meansData : rangesData;
  const yKey = view === 'means' ? 'mean' : 'range';
  const lcs = view === 'means' ? LCSx : LCSR;
  const lci = view === 'means' ? LCIx : LCIR;
  const lc = view === 'means' ? grandMean : meanRange;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      const entry = payload[0]?.payload;
      return (
        <div className="chart-tooltip">
          <div className="chart-tooltip__title">{label}</div>
          {payload.map((p, i) => (
            p.dataKey === yKey &&
            <div key={i} style={{ color: entry.outOfControl ? '#f87171' : color }}>
              {view === 'means' ? 'x̄' : 'R'} = {Number(p.value).toFixed(3)} kg
              {entry.outOfControl && ' ⚠ Fuera de control'}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-wrap">
      {/* Toggle */}
      <div className="chart-legend-bar">
        <button
          className={`chart-toggle-btn ${view === 'means' ? 'active' : ''}`}
          style={{ borderColor: view === 'means' ? color : 'var(--border-subtle)', color: view === 'means' ? color : 'var(--text-muted)' }}
          onClick={() => setView('means')}
        >
          📊 Gráfica de Medias (X̄)
        </button>
        <button
          className={`chart-toggle-btn ${view === 'ranges' ? 'active' : ''}`}
          style={{ borderColor: view === 'ranges' ? color : 'var(--border-subtle)', color: view === 'ranges' ? color : 'var(--text-muted)' }}
          onClick={() => setView('ranges')}
        >
          📉 Gráfica de Rangos (R)
        </button>
      </div>

      <h4 className="chart-subtitle">
        {view === 'means'
          ? `Gráfica de Control de Medias (X̄) — Empacadora de Banano Matina`
          : `Gráfica de Control de Rangos (R) — Empacadora de Banano Matina`}
      </h4>

      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 15, right: 30, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="subgroup" stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 11 }}
              label={{ value: 'Subgrupo (hora)', position: 'insideBottom', offset: -5, fill: '#8892b0', fontSize: 10 }} />
            <YAxis stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 11 }}
              domain={view === 'means' ? [19.3, 20.6] : [0, 1.4]}
              tickFormatter={v => v.toFixed(2)} />
            <Tooltip content={<CustomTooltip />} />
            {/* Límites de control */}
            <ReferenceLine y={lcs} stroke="#f87171" strokeWidth={1.5} strokeDasharray="6 3"
              label={{ value: `LCS=${lcs.toFixed(3)}`, position: 'right', fill: '#f87171', fontSize: 10 }} />
            <ReferenceLine y={lc} stroke={color} strokeWidth={1.5}
              label={{ value: `LC=${lc.toFixed(3)}`, position: 'right', fill: color, fontSize: 10 }} />
            {lci > 0 && (
              <ReferenceLine y={lci} stroke="#f87171" strokeWidth={1.5} strokeDasharray="6 3"
                label={{ value: `LCI=${lci.toFixed(3)}`, position: 'right', fill: '#f87171', fontSize: 10 }} />
            )}
            {/* Spec limits (only on means chart) */}
            {view === 'means' && (
              <>
                <ReferenceLine y={LSE} stroke="#f59e0b" strokeWidth={1} strokeDasharray="3 6"
                  label={{ value: `LSE=${LSE}`, position: 'right', fill: '#f59e0b', fontSize: 9 }} />
                <ReferenceLine y={LIE} stroke="#f59e0b" strokeWidth={1} strokeDasharray="3 6"
                  label={{ value: `LIE=${LIE}`, position: 'right', fill: '#f59e0b', fontSize: 9 }} />
              </>
            )}
            <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                return (
                  <circle key={cx} cx={cx} cy={cy} r={5}
                    fill={payload.outOfControl ? '#f87171' : color}
                    stroke="none" />
                );
              }}
              activeDot={{ r: 7 }} name={view === 'means' ? 'x̄' : 'R'} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Data table */}
      <div className="chart-table-wrap" style={{ marginTop: '1.5rem' }}>
        <table className="chart-table">
          <thead>
            <tr>
              <th>Subgrupo</th>
              <th>x̄ (Media)</th>
              <th>R (Rango)</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {subgroups.map(sg => (
              <tr key={sg.id}
                style={{ background: (sg.mean > LCSx || sg.mean < LCIx || sg.range > LCSR) ? 'rgba(248,113,113,0.08)' : 'transparent' }}>
                <td style={{ color: 'var(--text-secondary)' }}>Muestra {sg.id}</td>
                <td style={{
                  color: (sg.mean > LCSx || sg.mean < LCIx) ? '#f87171' : color,
                  fontWeight: '600'
                }}>{sg.mean.toFixed(2)} kg</td>
                <td style={{ color: sg.range > LCSR ? '#f87171' : 'var(--text-secondary)' }}>
                  {sg.range.toFixed(2)} kg
                </td>
                <td>
                  <span style={{
                    color: (sg.mean > LCSx || sg.mean < LCIx) ? '#f87171' : '#10b981',
                    fontSize: '0.8rem'
                  }}>
                    {(sg.mean > LCSx || sg.mean < LCIx) ? '⚠ Fuera' : '✓ OK'}
                  </span>
                </td>
              </tr>
            ))}
            <tr style={{ background: `${color}10`, fontWeight: '700' }}>
              <td style={{ color }}>Promedio Global</td>
              <td style={{ color }}>{grandMean.toFixed(2)} kg</td>
              <td style={{ color }}>{meanRange.toFixed(2)} kg</td>
              <td style={{ color }}>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cp/Cpk */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
        {[
          { label: 'Cp (Capacidad)', value: method.exercise.data.Cp.toFixed(2), target: '≥ 1.33', ok: method.exercise.data.Cp >= 1.33 },
          { label: 'Cpk (Centrado)', value: method.exercise.data.Cpk.toFixed(2), target: 'Busca = Cp', ok: method.exercise.data.Cpk >= 1.0 },
        ].map((m, i) => (
          <div key={i} style={{
            padding: '1.25rem',
            background: `${m.ok ? color : '#f87171'}15`,
            border: `1px solid ${m.ok ? color : '#f87171'}40`,
            borderRadius: 'var(--radius-md)',
            textAlign: 'center'
          }}>
            <div style={{ fontFamily: 'Outfit', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{m.label}</div>
            <div style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: '800', color: m.ok ? color : '#f87171' }}>{m.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Meta: {m.target}</div>
          </div>
        ))}
      </div>

      <div className="chart-result-banner" style={{ borderColor: color, color }}>
        📊 Proceso BAJO CONTROL | Cp=<strong>{method.exercise.data.Cp.toFixed(2)}</strong> (capaz ✓) | Cpk=<strong>{method.exercise.data.Cpk.toFixed(2)}</strong> → Ajustar centrado
      </div>
    </div>
  );
};

export default ControlChart;
