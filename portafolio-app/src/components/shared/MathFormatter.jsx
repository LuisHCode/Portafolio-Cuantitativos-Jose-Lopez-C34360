import React from 'react';
import LatexFormula from './LatexFormula.jsx';

/**
 * Procesa un texto y busca patrones para convertirlos a LaTeX dinámicamente.
 * Soporta expresiones explícitas entre $...$ y también detecta patrones comunes como:
 * - Fórmulas que contengan =, <=, >=, +, -, *, /, subíndices, letras griegas, etc.
 */
export const renderMathAndText = (text, color) => {
  if (!text) return '';

  // 1. Si el texto tiene delimitadores $, lo dividimos y renderizamos
  if (text.includes('$')) {
    const parts = text.split(/(\$[^\$]+\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        const latex = part.slice(1, -1);
        return <LatexFormula key={index} formula={latex} display={false} color={color} />;
      }
      return part;
    });
  }

  // 2. Si no tiene $, hacemos un parseo básico por líneas para detectar si toda la línea
  // o parte de ella parece una ecuación (por ejemplo: contiene "Z =", "x₁", "LCS_x̄", "x̄̄ =", "x̄ =", etc.)
  const lines = text.split('\n');
  return lines.map((line, lineIndex) => {
    // Si la línea parece ser enteramente o mayormente una fórmula matemática
    const isFormula = /^[a-zA-Z0-9_+\-*\/=()\s,:.≤≥→−×₡$πσ∞_̄ū¹²³⁴\u2200-\u22FF]+$/.test(line) && 
                      (line.includes('=') || line.includes('≤') || line.includes('≥') || line.includes('→') || line.includes('σ') || line.includes('π'));

    if (isFormula && !line.includes('|') && line.length < 120) {
      // Convertir caracteres especiales a LaTeX
      let latex = line
        .replace(/₡/g, '\\text{₡}')
        .replace(/x₁/g, 'x_1')
        .replace(/x₂/g, 'x_2')
        .replace(/x_j/g, 'x_j')
        .replace(/x_i/g, 'x_i')
        .replace(/x_k/g, 'x_k')
        .replace(/LCS_x̄/g, 'LCS_{\\bar{x}}')
        .replace(/LCI_x̄/g, 'LCI_{\\bar{x}}')
        .replace(/LCS_R/g, 'LCS_R')
        .replace(/LCI_R/g, 'LCI_R')
        .replace(/x̄̄/g, '\\bar{\\bar{x}}')
        .replace(/x̄/g, '\\bar{x}')
        .replace(/R̄/g, '\\bar{R}')
        .replace(/≤/g, '\\leq ')
        .replace(/≥/g, '\\geq ')
        .replace(/→/g, '\\rightarrow ')
        .replace(/−/g, '-')
        .replace(/×/g, '\\times ')
        .replace(/π/g, '\\pi ')
        .replace(/σ/g, '\\sigma ')
        .replace(/∞/g, '\\infty ')
        .replace(/%/g, '\\%');

      return (
        <div key={lineIndex} style={{ margin: '0.4rem 0' }}>
          <LatexFormula formula={latex} display={true} color={color} />
        </div>
      );
    }

    // Si es texto normal, podemos buscar variables individuales y darles formato inline
    const words = line.split(/(\s+)/);
    const formattedLine = words.map((word, wordIndex) => {
      // Detectar variables individuales como x₁, x₂, Z, x̄, R̄, π, σ
      const isGreekOrVar = /^(x₁|x₂|Z|x̄|x̄̄|R̄|π|σ|Cp|Cpk)$/.test(word.trim());
      if (isGreekOrVar) {
        let latex = word.trim()
          .replace(/x₁/g, 'x_1')
          .replace(/x₂/g, 'x_2')
          .replace(/x̄̄/g, '\\bar{\\bar{x}}')
          .replace(/x̄/g, '\\bar{x}')
          .replace(/R̄/g, '\\bar{R}')
          .replace(/π/g, '\\pi ')
          .replace(/σ/g, '\\sigma ');
        return <LatexFormula key={wordIndex} formula={latex} display={false} color={color} />;
      }
      return word;
    });

    return (
      <div key={lineIndex} style={{ minHeight: '1.2em' }}>
        {formattedLine}
      </div>
    );
  });
};

const MathFormatter = ({ text, color, className = '' }) => {
  return (
    <div className={`math-formatter ${className}`}>
      {renderMathAndText(text, color)}
    </div>
  );
};

export default MathFormatter;
