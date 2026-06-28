import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine, Cell
} from 'recharts';
import './Charts.css';

const MonteCarloChart = ({ method, activeExercise }) => {
  const color = method.colorHex;
  const { distribution, expectedValue, simulatedEvents, simulatedMean } = activeExercise.data;

  // Determine metadata based on exercise ID
  const getExerciseMeta = (id) => {
    switch (id) {
      case 'colas':
        return {
          unit: 'minutos',
          shortUnit: 'min',
          domainMax: 70,
          valueName: 'Tiempo',
          cycleName: 'Inspección',
          refLabel: 'E(X)=34.5 min',
          meanLabel: 'X̄=33.0 min',
          recAction: 'Se recomienda planificar turnos con flexibilidad para picos de 60 min.'
        };
      case 'marchamos':
        return {
          unit: 'marchamos',
          shortUnit: 'u',
          domainMax: 220,
          valueName: 'Demanda',
          cycleName: 'Día',
          refLabel: 'E(X)=117.5 u',
          meanLabel: 'X̄=115.0 u',
          recAction: 'Se recomienda mantener un stock de seguridad para evitar quiebres de inventario.'
        };
      case 'mantenimiento':
        return {
          unit: 'días útiles',
          shortUnit: 'días',
          domainMax: 50,
          valueName: 'Vida Útil',
          cycleName: 'Ciclo',
          refLabel: 'E(X)=21 días',
          meanLabel: 'X̄=21.0 días',
          recAction: 'Se recomienda programar mantenimiento preventivo estricto cada 10-15 días.'
        };
      default:
        return {
          unit: 'unidades',
          shortUnit: 'u',
          domainMax: 60,
          valueName: 'Valor',
          cycleName: 'Ciclo',
          refLabel: `E(X)=${expectedValue}`,
          meanLabel: `X̄=${simulatedMean}`,
          recAction: 'Recomendación en base a simulación.'
        };
    }
  };

  const meta = getExerciseMeta(activeExercise.id);

  // 1. Chart 1: Distribution comparison (Theoretical vs Simulated)
  const distData = distribution.map(d => {
    const matchedEvents = simulatedEvents.filter(r => r.value === d.value);
    const simulatedFreqPercent = (matchedEvents.length / simulatedEvents.length) * 100;
    return {
      name: d.label,
      'Prob. Teórica (%)': d.probability * 100,
      'Frecuencia Relativa Simulada (%)': simulatedFreqPercent,
    };
  });

  // 2. Chart 2: Simulation timeline
  const timelineData = simulatedEvents.map(r => ({
    cycle: `${meta.cycleName} ${r.event}`,
    rn: r.rn,
    valor: r.value
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <div className="chart-tooltip__title">{label}</div>
          {payload.map((p, i) => (
            <div key={i} className="chart-tooltip__row" style={{ color: p.color }}>
              {p.name}: {Number(p.value).toFixed(1)}%
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-wrap">
      {/* Chart 1: Distribution comparison */}
      <div>
        <h4 className="chart-subtitle">Distribución de Probabilidad: Teórica vs. Simulada</h4>
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <BarChart data={distData} margin={{ top: 10, right: 30, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 11 }} />
              <YAxis stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#8892b0', fontSize: '11px' }} />
              <Bar dataKey="Prob. Teórica (%)" fill={color} fillOpacity={0.7} radius={[4,4,0,0]} />
              <Bar dataKey="Frecuencia Relativa Simulada (%)" fill="#a855f7" fillOpacity={0.7} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Simulation timeline */}
      <div style={{ marginTop: '2.5rem' }}>
        <h4 className="chart-subtitle">Historial de Simulación ({timelineData.length} iteraciones)</h4>
        <div style={{ width: '100%', height: 240 }}>
          <ResponsiveContainer>
            <BarChart data={timelineData} margin={{ top: 10, right: 30, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="cycle" stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 10 }} />
              <YAxis stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 11 }} domain={[0, meta.domainMax]} />
              <Tooltip
                formatter={(v, n, p) => [`${v} ${meta.unit} (Aleatorio: ${p.payload.rn})`, meta.valueName]}
                contentStyle={{ background: '#0d1424', border: `1px solid ${color}`, borderRadius: '8px', color: '#f0f4ff' }}
              />
              <ReferenceLine y={expectedValue} stroke="#4a5568" strokeDasharray="5 5" label={{ value: meta.refLabel, fill: '#8892b0', fontSize: 10, position: 'top' }} />
              <ReferenceLine y={simulatedMean} stroke={color} strokeDasharray="4 4" label={{ value: meta.meanLabel, fill: color, fontSize: 10, position: 'top' }} />
              <Bar dataKey="valor" radius={[4,4,0,0]} name={meta.valueName}>
                {timelineData.map((entry, i) => {
                  // highlight high values in pink, low in blue, typical in method accent color
                  const isHigh = entry.valor === Math.max(...distribution.map(d=>d.value));
                  const isLow = entry.valor === Math.min(...distribution.map(d=>d.value));
                  return (
                    <Cell 
                      key={i} 
                      fill={isHigh ? '#ec4899' : isLow ? '#3b82f6' : color} 
                      fillOpacity={0.8} 
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison table */}
      <div className="chart-table-wrap" style={{ marginTop: '2rem' }}>
        <table className="chart-table">
          <thead>
            <tr>
              <th>{meta.cycleName}</th>
              <th>N° Aleatorio (RN)</th>
              <th>Rango Correspondiente</th>
              <th>Resultado Simulado</th>
            </tr>
          </thead>
          <tbody>
            {simulatedEvents.map((r, i) => {
              const isHigh = r.value === Math.max(...distribution.map(d=>d.value));
              const isLow = r.value === Math.min(...distribution.map(d=>d.value));
              return (
                <tr key={i}>
                  <td style={{ color: 'var(--text-secondary)' }}>{meta.cycleName} {r.event}</td>
                  <td style={{ color: color, fontWeight: '600' }}>{r.rn}</td>
                  <td style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>{r.range}</td>
                  <td style={{ color: isHigh ? '#ec4899' : isLow ? '#3b82f6' : color, fontWeight: '600' }}>
                    {r.value} {meta.shortUnit}
                  </td>
                </tr>
              );
            })}
            <tr style={{ background: `${color}10`, fontWeight: '700' }}>
              <td colSpan="3" style={{ color }}>Promedio Simulado (X̄)</td>
              <td style={{ color }}>{simulatedMean} {meta.unit}</td>
            </tr>
            <tr>
              <td colSpan="3" style={{ color: 'var(--text-muted)' }}>Valor Esperado Teórico E(X)</td>
              <td style={{ color: 'var(--text-muted)' }}>{expectedValue} {meta.unit}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="chart-result-banner" style={{ borderColor: color, color, marginTop: '1.5rem' }}>
        🎲 E(X) Teórico = {expectedValue} | X̄ Simulado = <strong>{simulatedMean}</strong> {meta.unit}
        <br />
        <span style={{ fontSize: '0.85rem', color: '#f0f4ff', display: 'block', marginTop: '0.25rem' }}>
          💡 {meta.recAction}
        </span>
      </div>
    </div>
  );
};

export default MonteCarloChart;
