import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ReferenceDot
} from 'recharts';
import './Charts.css';

const ProgramacionNoLinealChart = ({ method, activeExercise }) => {
  const color = method.colorHex;
  const { optimalPoint } = activeExercise.data;

  // Generate data points for Curve A: y = 35x - x^2 (peaks at 17.5)
  const curveAData = [];
  for (let x = 0; x <= 35; x += 2) {
    curveAData.push({
      x: x,
      Beneficio: 35 * x - x * x
    });
  }
  // Add exact peak point
  curveAData.push({ x: 17.5, Beneficio: 35 * 17.5 - 17.5 * 17.5 });
  curveAData.sort((a, b) => a.x - b.x);

  // Generate data points for Curve B: y = 42x - 2x^2 (peaks at 10.5)
  const curveBData = [];
  for (let x = 0; x <= 22; x += 1.5) {
    curveBData.push({
      x: x,
      Beneficio: 42 * x - 2 * x * x
    });
  }
  // Add exact peak point
  curveBData.push({ x: 10.5, Beneficio: 42 * 10.5 - 2 * 10.5 * 10.5 });
  curveBData.sort((a, b) => a.x - b.x);

  return (
    <div className="chart-wrap">
      <h4 className="chart-subtitle" style={{ marginBottom: '1.5rem' }}>
        Curvas de Beneficio Neto por Producto (Optimización Clásica)
      </h4>

      <p style={{ fontSize: '0.85rem', color: '#8892b0', marginBottom: '2rem', lineHeight: '1.6' }}>
        El gráfico ilustra el comportamiento no lineal de los beneficios para cada producto. Debido a la elasticidad de la demanda, producir más unidades no incrementa las ganancias indefinidamente; en su lugar, se llega a un <strong>pico máximo</strong> (óptimo local) donde la derivada es cero.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Producto A */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h5 style={{ color: color, marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
            Producto A: f(x) = 35x - x² (Óptimo: x = 17.5)
          </h5>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={curveAData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="x" stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 10 }} label={{ value: 'Cant. x', position: 'bottom', fill: '#8892b0', fontSize: 10 }} />
                <YAxis stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: '#0d1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f0f4ff' }}
                  formatter={(val) => [`$${Number(val).toFixed(2)}`, 'Beneficio A']}
                />
                <Line type="monotone" dataKey="Beneficio" stroke={color} strokeWidth={2} dot={false} />
                <ReferenceLine x={17.5} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                <ReferenceDot x={17.5} y={306.25} r={5} fill={color} stroke="#fff" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#8892b0', marginTop: '0.5rem', textAlign: 'center' }}>
            Pico máximo: <strong>x = 17.5</strong> → Beneficio A = <strong>$306.25</strong>
          </div>
        </div>

        {/* Producto B */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h5 style={{ color: '#a855f7', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
            Producto B: f(y) = 42y - 2y² (Óptimo: y = 10.5)
          </h5>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={curveBData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="x" stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 10 }} label={{ value: 'Cant. y', position: 'bottom', fill: '#8892b0', fontSize: 10 }} />
                <YAxis stroke="#4a5568" tick={{ fill: '#8892b0', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: '#0d1424', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#f0f4ff' }}
                  formatter={(val) => [`$${Number(val).toFixed(2)}`, 'Beneficio B']}
                />
                <Line type="monotone" dataKey="Beneficio" stroke="#a855f7" strokeWidth={2} dot={false} />
                <ReferenceLine x={10.5} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
                <ReferenceDot x={10.5} y={220.5} r={5} fill="#a855f7" stroke="#fff" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#8892b0', marginTop: '0.5rem', textAlign: 'center' }}>
            Pico máximo: <strong>y = 10.5</strong> → Beneficio B = <strong>$220.50</strong>
          </div>
        </div>
      </div>

      <div className="chart-result-banner" style={{ borderColor: color, color, marginTop: '2rem' }}>
        📈 Configuración Óptima Global:
        Producir <strong>x = {optimalPoint.x} de A</strong> y <strong>y = {optimalPoint.y} de B</strong> → Beneficio Máximo Total: <strong>${optimalPoint.z}</strong>
      </div>
    </div>
  );
};

export default ProgramacionNoLinealChart;
