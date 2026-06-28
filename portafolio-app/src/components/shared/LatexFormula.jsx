import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import './LatexFormula.css';

/**
 * LatexFormula – renderiza expresiones LaTeX directamente usando KaTeX npm package.
 * Esto evita el uso de react-katex y previene errores de resolución de dependencias.
 */
const LatexFormula = ({ formula, display = true, color, className = '' }) => {
  if (!formula) return null;

  const html = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode: display,
        throwOnError: true
      });
    } catch (error) {
      console.error('KaTeX Parsing Error:', error.message);
      return `<span class="latex-formula__error" title="${error.message}">⚠ ${error.message} (Fórmula: ${formula})</span>`;
    }
  }, [formula, display]);

  const style = color ? { '--latex-color': color } : {};

  return (
    <div
      className={`latex-formula ${display ? 'latex-formula--block' : 'latex-formula--inline'} ${className}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default LatexFormula;
