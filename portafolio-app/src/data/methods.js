// ============================================================
// DATA: Contenido completo de los 6 métodos cuantitativos
// Fuente: Portafolio Digital - José Luis López Hernández
// ============================================================

export const methodsData = [
  {
    id: 1,
    slug: 'transporte',
    title: 'Modelo de Transporte y Asignación',
    shortTitle: 'Transporte',
    iconName: 'Truck',
    color: 'var(--method-1)',
    colorHex: '#00d4ff',
    pdfFile: '/docs/Metodo de Transporte Jose Luis Lopez.pdf',
    tagline: 'Distribución óptima de recursos desde múltiples orígenes a múltiples destinos',
    objective: 'Maximizar ganancias, minimizar costos o generar un impacto social en la distribución de bienes.',
    forWhat: 'En temas de logística, organizar la distribución de mejor manera para recortar costos. El método resuelve el problema de encontrar la ruta de distribución óptima sin evaluar manualmente una a una las posibles rutas.',
    technicalAspects: [
      'La suma de la oferta y de la demanda debe coincidir (modelo balanceado).',
      'Si la oferta es mayor o menor que la demanda, se compensan con filas o columnas ficticias con costo cero.',
      'Se trabaja con una tabla (matriz) donde se cruzan los orígenes y los destinos.',
    ],
    howItWorks: 'El método principal se basa en una tabla (matriz) donde se cruzan los orígenes y los destinos. Para calcular las penalizaciones se utilizan métodos heurísticos como la Aproximación de Vogel, que resta los dos costos más bajos de cada fila/columna para identificar dónde es primordial empezar a enviar. Para verificación se usa el método de "Salto de Piedra en Piedra", que traza un circuito cerrado desde una celda vacía, haciendo saltos entre celdas con valores, alternando signos (+, −, +, −).',
    formulas: [
      {
        name: 'Función Objetivo (Minimizar Costo Total)',
        latex: 'C = \\sum_{i=1}^{m} \\sum_{j=1}^{n} c_{ij} \\cdot x_{ij}',
        variables: [
          { symbol: 'm', desc: 'Total de orígenes' },
          { symbol: 'n', desc: 'Total de destinos' },
          { symbol: 'c_{ij}', desc: 'Costo de transportar una unidad desde el origen i al destino j' },
          { symbol: 'x_{ij}', desc: 'Cantidad de unidades transportadas desde el origen i al destino j' },
        ]
      },
      {
        name: 'Restricciones de Oferta (Orígenes)',
        latex: '\\sum_{j=1}^{n} x_{ij} \\leq S_i \\quad \\forall i',
        variables: [
          { symbol: 'S_i', desc: 'Capacidad máxima del origen i' },
        ]
      },
      {
        name: 'Restricciones de Demanda (Destinos)',
        latex: '\\sum_{i=1}^{m} x_{ij} = D_j \\quad \\forall j',
        variables: [
          { symbol: 'D_j', desc: 'Demanda exacta del destino j' },
        ]
      },
      {
        name: 'No Negatividad',
        latex: 'x_{ij} \\geq 0',
        variables: []
      }
    ],
    exercise: {
      title: 'Ejercicio 1: Distribución de Computadoras',
      context: 'El gobierno necesita gestionar la distribución de computadoras a diferentes escuelas del país. Cuenta con tres bodegas de almacenamiento y debe abastecer a cuatro distribuidores locales.',
      data: {
        origins: ['Cartago', 'Limón', 'Alajuela'],
        destinations: ['Guanacaste', 'Limón Centro', 'Puntarenas', 'San José'],
        supply: [120, 80, 200],
        demand: [100, 85, 105, 110],
        profits: [
          [95, 80, 85, 60],
          [90, 75, 80, 55],
          [92, 78, 83, 58]
        ],
        opportunityCosts: [
          [0, 15, 10, 35],
          [5, 20, 15, 40],
          [3, 17, 12, 37]
        ]
      },
      steps: [
        {
          title: 'Paso 1: Matriz Original de Ganancias',
          description: 'Se presenta la tabla con los rendimientos (ganancias) de enviar una computadora desde cada origen a cada destino. El total de oferta y demanda coinciden en 400 unidades → modelo balanceado.',
          detail: 'Cartago: 120 | Limón: 80 | Alajuela: 200 → Total oferta: 400. Guanacaste: 100 | Limón Centro: 85 | Puntarenas: 105 | San José: 110 → Total demanda: 400.',
          table: [
            ['Origen \\ Destino', 'Guanacaste', 'Limón C.', 'Puntarenas', 'San José', 'Oferta'],
            ['Cartago', '₡95', '₡80', '₡85', '₡60', '120'],
            ['Limón', '₡90', '₡75', '₡80', '₡55', '80'],
            ['Alajuela', '₡92', '₡78', '₡83', '₡58', '200'],
            ['Demanda', '100', '85', '105', '110', '400']
          ]
        },
        {
          title: 'Paso 2: Conversión a Matriz de Costo de Oportunidad',
          description: 'Como Vogel está diseñado para minimizar costos y nuestro problema es de maximización, tomamos el valor más alto (95 en Cartago-Guanacaste) y le restamos cada valor de la matriz.',
          detail: 'Ejemplo: Limón-Puntarenas = 95 − 80 = 15. Resultado: Cartago [0,15,10,35] | Limón [5,20,15,40] | Alajuela [3,17,12,37]',
          table: [
            ['Origen \\ Destino', 'Guanacaste', 'Limón C.', 'Puntarenas', 'San José', 'Oferta'],
            ['Cartago', '0', '15', '10', '35', '120'],
            ['Limón', '5', '20', '15', '40', '80'],
            ['Alajuela', '3', '17', '12', '37', '200'],
            ['Demanda', '100', '85', '105', '110', '400']
          ]
        },
        {
          title: 'Paso 3: Vogel - Iteración #1 (Penalizaciones)',
          description: 'Se toman los dos costos más bajos de cada fila y columna y se restan. La penalización más alta es 10 (Cartago y Limón empatados). Se elige Cartago. Su celda más barata es Guanacaste (costo 0). Se asignan 100 unidades.',
          detail: 'Filas: Cartago(10), Limón(10), Alajuela(9). Columnas: Guanacaste(3), Limón C.(2), Puntarenas(2), S.José(2). → Asignación: Cartago→Guanacaste = 100. Oferta Cartago baja a 20.',
          table: [
            ['Origen \\ Destino', 'Guanacaste', 'Limón C.', 'Puntarenas', 'San José', 'Oferta', 'Penaliz. Fila'],
            ['Cartago', '0 (100)', '15', '10', '35', '20 (quedan)', '10 (Elegida)'],
            ['Limón', '5', '20', '15', '40', '80', '10'],
            ['Alajuela', '3', '17', '12', '37', '200', '9'],
            ['Demanda', '0 (cubierta)', '85', '105', '110', '', ''],
            ['Penaliz. Col.', '3', '2', '2', '2', '', '']
          ]
        },
        {
          title: 'Paso 4: Vogel - Iteración #2',
          description: 'Con Guanacaste cubierta, se recalculan penalizaciones. Nueva penalidad más alta = 5 (empate en las 3 filas). Se elige Cartago. Su costo más bajo disponible es Puntarenas (costo 10). Se asignan 20 (todo lo que queda de Cartago).',
          detail: 'Nuevas penalidades filas: Cartago(5), Limón(5), Alajuela(5). → Asignación: Cartago→Puntarenas = 20. Cartago cerrada, demanda Puntarenas baja a 85.',
          table: [
            ['Origen \\ Destino', 'Guanacaste', 'Limón C.', 'Puntarenas', 'San José', 'Oferta', 'Penaliz. Fila'],
            ['Cartago (Cerrada)', '-', '15', '10 (20)', '35', '0 (cerrada)', '5 (Elegida)'],
            ['Limón', '-', '20', '15', '40', '80', '5'],
            ['Alajuela', '-', '17', '12', '37', '200', '5'],
            ['Demanda', '-', '85', '85 (quedan)', '110', '', ''],
            ['Penaliz. Col.', '-', '2', '2', '2', '', '']
          ]
        },
        {
          title: 'Paso 5: Vogel - Iteración #3',
          description: 'Sin Guanacaste ni Cartago. La penalidad más alta es 5 (Limón y Alajuela). Se elige Limón. Su celda más barata es Puntarenas (costo 15). Puntarenas necesita 85 y Limón tiene 80. Se asignan los 80.',
          detail: '→ Asignación: Limón→Puntarenas = 80. Limón cerrada, demanda Puntarenas baja a 5.',
          table: [
            ['Origen \\ Destino', 'Limón C.', 'Puntarenas', 'San José', 'Oferta', 'Penaliz. Fila'],
            ['Limón (Cerrada)', '20', '15 (80)', '40', '0 (cerrada)', '5 (Elegida)'],
            ['Alajuela', '17', '12', '37', '200', '5'],
            ['Demanda', '85', '5 (quedan)', '110', '', ''],
            ['Penaliz. Col.', '3', '3', '3', '', '']
          ]
        },
        {
          title: 'Paso 6: Asignación Final Directa',
          description: 'Solo queda Alajuela (200 de oferta) con tres demandas: Limón C.(85), Puntarenas(5) y San José(110), que suman exactamente 200. Se reparten directamente.',
          detail: 'Alajuela→Limón Centro=85, Alajuela→Puntarenas=5, Alajuela→San José=110.',
          table: [
            ['Origen \\ Destino', 'Guanacaste', 'Limón C.', 'Puntarenas', 'San José', 'Oferta'],
            ['Cartago', '100', '-', '20', '-', '120'],
            ['Limón', '-', '-', '80', '-', '80'],
            ['Alajuela', '-', '85', '5', '110', '200'],
            ['Demanda', '100', '85', '105', '110', '400']
          ]
        },
        {
          title: 'Paso 7: Cálculo de la Ganancia Definitiva',
          description: 'Usando los valores de la matriz ORIGINAL de ganancias, se calcula Z multiplicando cada asignación por su ganancia unitaria.',
          detail: 'Z = (100\\times95)+(20\\times85)+(80\\times80)+(85\\times78)+(5\\times83)+(110\\times58) = 9500+1700+6400+6630+415+6380 = 31025',
          table: [
            ['Ruta (Origen → Destino)', 'Unidades Asignadas', 'Ganancia Unitaria', 'Ganancia Total'],
            ['Cartago → Guanacaste', '100', '₡95', '₡9,500'],
            ['Cartago → Puntarenas', '20', '₡85', '₡1,700'],
            ['Limón → Puntarenas', '80', '₡80', '₡6,400'],
            ['Alajuela → Limón C.', '85', '₡78', '₡6,630'],
            ['Alajuela → Puntarenas', '5', '₡83', '₡415'],
            ['Alajuela → San José', '110', '₡58', '₡6,380'],
            ['Total General', '400', '-', '₡31,025']
          ]
        },
        {
          title: 'Paso 8: Verificación - Salto de Piedra en Piedra',
          description: 'Se traza un circuito cerrado para las celdas vacías alternando signos (+,−,+,−). En maximización, un resultado > 0 indicaría una mejora posible. Ninguna celda evaluada dio positivo.',
          detail: 'Limón-Guanacaste: 90−95+85−80=0 (neutro). Alajuela-Guanacaste: 92−95+85−83=−1 (empeora). Conclusión: La solución de Vogel es el ÓPTIMO ABSOLUTO con ganancia de ₡31,025.'
        }
      ],
      result: 'Ganancia Óptima: Z = ₡31,025',
      solution: [
        { from: 'Cartago', to: 'Guanacaste', units: 100, gain: 95 },
        { from: 'Cartago', to: 'Puntarenas', units: 20, gain: 85 },
        { from: 'Limón', to: 'Puntarenas', units: 80, gain: 80 },
        { from: 'Alajuela', to: 'Limón Centro', units: 85, gain: 78 },
        { from: 'Alajuela', to: 'Puntarenas', units: 5, gain: 83 },
        { from: 'Alajuela', to: 'San José', units: 110, gain: 58 },
      ]
    }
  },
  {
    id: 2,
    slug: 'programacion',
    title: 'Programación (Entera, Metas y No Lineal)',
    shortTitle: 'Programación',
    iconName: 'Target',
    color: 'var(--method-2)',
    colorHex: '#7c3aed',
    pdfFile: '/docs/Metodo de Programacion Jose Luis Lopez.pdf',
    tagline: 'Tres herramientas para optimizar decisiones complejas con restricciones reales',
    objective: 'Encontrar la decisión perfecta para la empresa: ya sea maximizar ganancias, minimizar costos, o encontrar una solución de "satisfacción" que equilibre todos los intereses en juego.',
    forWhat: 'Cuando los recursos no se pueden fraccionar (enviar 3 o 4 camiones, no 3.5), cuando hay múltiples objetivos que compiten entre sí, o cuando los costos crecen exponencialmente en lugar de linealmente.',
    technicalAspects: [
      'Integralidad (Entera): los resultados deben ser números enteros (xj ∈ ℤ), no se permiten decimales.',
      'Variables de desviación (Metas): d⁻ = lo que faltó para llegar a la meta; d⁺ = lo que se excedió.',
      'Prioridad Lexicográfica (Metas): el modelo cumple primero la meta de máxima prioridad antes de las demás.',
      'Óptimo Local vs. Global (No Lineal): los gráficos tienen curvas; puede haber una "cima" local que parece la mejor pero existe una global más alta.',
      'Condiciones KKT (No Lineal): requisitos matemáticos de Karush-Kuhn-Tucker para verificar el punto óptimo.',
    ],
    howItWorks: 'Programación Entera: usa Branch & Bound (divide el problema en subproblemas) o el algoritmo de Gomory (añade restricciones para eliminar soluciones con decimales). Programación por Metas: ordena las metas por importancia y trabaja para cumplir la prioridad 1 antes de pasar a la 2, sin echar a perder lo logrado. Programación No Lineal: aplica derivadas parciales para encontrar los picos máximos; en la práctica se usa GRG Nonlinear en Excel Solver.',
    formulas: [
      {
        name: 'Programación Entera - Función Objetivo',
        latex: '\\text{Max/Min } Z = \\sum c_j \\cdot x_j, \\quad x_j \\geq 0,\\; x_j \\in \\mathbb{Z}',
        variables: [
          { symbol: 'c_j', desc: 'Costo o ganancia unitaria de la actividad j' },
          { symbol: 'x_j', desc: 'Variable de decisión (ej. cantidad de prendas)' },
        ]
      },
      {
        name: 'Programación por Metas - Función Objetivo',
        latex: '\\text{Min } Z = P_1(d_1^-) + P_2(d_2^- + d_2^+) + P_3(d_3^+)',
        variables: [
          { symbol: 'P_k', desc: 'Nivel de prioridad de la meta k (P₁ > P₂ > P₃)' },
          { symbol: 'd^-', desc: 'Variable de desviación por faltante (lo que faltó)' },
          { symbol: 'd^+', desc: 'Variable de desviación por exceso (lo que sobró)' },
        ]
      },
      {
        name: 'Programación No Lineal',
        latex: '\\text{Min/Max } f(x), \\quad \\text{ej: } Z = 40x + 60y - 0.2x^2 - 0.3y^2',
        variables: [
          { symbol: 'f(x)', desc: 'Función con términos no lineales (potencias, multiplicaciones entre variables)' },
        ]
      }
    ],
    exercises: [
      {
        id: 'entera',
        title: 'Parte A: Programación Entera (Taller Textil)',
        context: 'Un taller textil confecciona camisas (x₁) y pantalones (x₂). El objetivo es decidir cuántas unidades de cada prenda producir esta semana para maximizar su ganancia, sabiendo que las prendas no pueden venderse a medias (deben ser números enteros).',
        data: {
          variables: ['x₁ (Camisas)', 'x₂ (Pantalones)'],
          resources: [
            { name: 'Tela (metros)', perCamisa: 1, perPantalon: 2, disponible: 10 },
            { name: 'Tiempo (horas)', perCamisa: 2, perPantalon: 1, disponible: 11 },
            { name: 'Botones (cajas)', perCamisa: 1, perPantalon: 1, disponible: 9 },
            { name: 'Ganancia ($)', perCamisa: 60, perPantalon: 50, disponible: null },
          ]
        },
        steps: [
          {
            title: 'Paso 1: Modelado Matemático',
            description: 'Se definen las variables y se construye la función objetivo con sus restricciones.',
            detail: 'Max Z = 60x₁ + 50x₂\nRestricciones: x₁+2x₂≤10 (tela), 2x₁+x₂≤11 (tiempo), x₁+x₂≤9 (botones)\nIntegralidad: x₁,x₂ ≥ 0 y ∈ ℤ',
            table: [
              ['Prenda', 'Variable', 'Tela (metros)', 'Tiempo (horas)', 'Botones (cajas)', 'Ganancia ($)'],
              ['Camisas', 'x₁', '1', '2', '1', '$60'],
              ['Pantalones', 'x₂', '2', '1', '1', '$50'],
              ['Disponibilidad', '-', '10 m', '11 h', '9 cajas', '-']
            ]
          },
          {
            title: 'Paso 2: Resolución Gráfica',
            description: 'Se evalúan los vértices que delimitan la región factible. El vértice crítico es la intersección de la tela (x₁+2x₂=10) y el tiempo (2x₁+x₂=11).',
            detail: 'Del sistema: x₁=4, x₂=3 (no enteros exactos en el sistema original, se evalúa la región entera más cercana).'
          },
          {
            title: 'Paso 3: Evaluación de Puntos Enteros Clave',
            description: 'Se evalúan todos los vértices enteros de la región factible para encontrar el máximo.',
            detail: '(4,3): Z=60(4)+50(3)=240+150=390\n(5,2): Z=60(5)+50(2)=300+100=400 ✓\n(4,3) no supera el punto (5,2).',
            table: [
              ['Vértice Evaluado (x₁, x₂)', 'Cálculo de Ganancia Z = 60x₁ + 50x₂', 'Ganancia Total', '¿Es Factible?'],
              ['(0, 0)', '60(0) + 50(0) = $0', '$0', 'Sí ✓'],
              ['(5.5, 0)', '60(5.5) + 50(0) = $330', '$330', 'No entero ✗'],
              ['(0, 5)', '60(0) + 50(5) = $250', '$250', 'Sí ✓'],
              ['(4, 3) - Óptimo', '60(4) + 50(3) = $390', '$390', 'Sí (ÓPTIMO) ✓']
            ]
          },
          {
            title: 'Paso 4: Verificación de Factibilidad',
            description: 'Se verifica que el punto óptimo (4,3) cumpla TODAS las restricciones.',
            detail: 'Tela: 4+2(3)=10≤10 ✓\nTiempo: 2(4)+3=11≤11 ✓\nBotones: 4+3=7≤9 ✓',
            table: [
              ['Recurso Limitado', 'Fórmula Restricción', 'Consumo Evaluado en (4,3)', 'Límite Disponible', 'Estatus de Capacidad'],
              ['Tela (metros)', 'x₁ + 2x₂ ≤ 10', '4 + 2(3) = 10', '10 m', '100% Utilizado (Cuello de Botella) ✓'],
              ['Tiempo (horas)', '2x₁ + x₂ ≤ 11', '2(4) + 3 = 11', '11 h', '100% Utilizado (Cuello de Botella) ✓'],
              ['Botones (cajas)', 'x₁ + x₂ ≤ 9', '4 + 3 = 7', '9 cajas', '77% Utilizado (Sobran 2 cajas) ✓']
            ]
          },
          {
            title: 'Paso 5: Solución Óptima',
            description: 'El punto óptimo entero que maximiza la ganancia respetando todos los recursos es:',
            detail: 'x₁=4 camisas, x₂=3 pantalones → Z_máx = $390 por semana.'
          }
        ],
        result: 'Producir 4 camisas y 3 pantalones → Ganancia Máxima: $390',
        feasibleRegion: {
          constraints: [
            { a: 1, b: 2, c: 10, label: 'Tela' },
            { a: 2, b: 1, c: 11, label: 'Tiempo' },
            { a: 1, b: 1, c: 9, label: 'Botones' }
          ],
          optimalPoint: { x: 4, y: 3 },
          vertices: [
            { x: 0, y: 0, z: 0 },
            { x: 5.5, y: 0, z: 330 },
            { x: 0, y: 5, z: 250 },
            { x: 4, y: 3, z: 390 },
          ]
        }
      },
      {
        id: 'metas',
        title: 'Parte B: Programación por Metas (La Espiga Dorada)',
        context: 'La panadería produce pan artesanal (x) y repostería fina (y). La gerencia ha fijado tres metas ordenadas por prioridad: P1: ganar exactamente $2200, P2: asignar exactamente 160 horas de trabajo, P3: consumir máximo 300 kWh de energía.',
        data: {
          priorities: [
            { label: 'P1: Ganancia de $2200 (minimizar d1-)', goal: 2200, formula: '30x + 50y + d1- - d1+ = 2200' },
            { label: 'P2: Trabajo de 160 horas (minimizar d2- y d2+)', goal: 160, formula: '2x + 4y + d2- - d2+ = 160' },
            { label: 'P3: Energía de 300 kWh (minimizar d3+)', goal: 300, formula: '5x + 8y + d3- - d3+ = 300' }
          ],
          solution: { x: 40, y: 20 },
          deviations: { d1_minus: 0, d1_plus: 0, d2_minus: 0, d2_plus: 0, d3_minus: 0, d3_plus: 60 }
        },
        steps: [
          {
            title: 'Paso 1: Planteamiento de las Restricciones por Metas',
            description: 'Se introducen las variables de desviación (d⁻ y d⁺) para representar lo que falta o sobra para alcanzar cada meta.',
            detail: 'Meta 1 (Financiera): 30x + 50y + d₁⁻ − d₁⁺ = 2200\nMeta 2 (Laboral): 2x + 4y + d₂⁻ − d₂⁺ = 160\nMeta 3 (Ambiental): 5x + 8y + d₃⁻ − d₃⁺ = 300\nFunción Objetivo: Min Z = P₁(d₁⁻) + P₂(d₂⁻ + d₂⁺) + P₃(d₃⁺)',
            table: [
              ['Meta Propuesta', 'Prioridad', 'Fórmula con Desviaciones', 'Objetivo del Modelo'],
              ['1. Financiera (Ganancia)', 'P1', '30x + 50y + d₁⁻ − d₁⁺ = 2200', 'Ganar exactamente $2200 (Minimizar d₁⁻)'],
              ['2. Laboral (Horas)', 'P2', '2x + 4y + d₂⁻ − d₂⁺ = 160', 'Usar exactamente 160 horas (Minimizar d₂⁻ y d₂⁺)'],
              ['3. Ambiental (Consumo)', 'P3', '5x + 8y + d₃⁻ − d₃⁺ = 300', 'Consumo máx de 300 kWh (Minimizar d₃⁺)']
            ]
          },
          {
            title: 'Paso 2: Solución por Sustitución (Prioridades P1 y P2)',
            description: 'Forzamos a que las desviaciones indeseadas para P1 y P2 sean cero (d₁⁻ = 0, d₂⁻ = 0, d₂⁺ = 0) para resolver el sistema de ecuaciones 2x2.',
            detail: '30x + 50y = 2200 ⇒ 3x + 5y = 220\n2x + 4y = 160 ⇒ x + 2y = 80 ⇒ x = 80 − 2y\nSustituyendo: 3(80 − 2y) + 5y = 220 ⇒ 240 − y = 220 ⇒ y = 20\nCalculamos x: x = 80 − 2(20) = 40'
          },
          {
            title: 'Paso 3: Evaluación de la Prioridad 3 (Energía)',
            description: 'Al producir 40 lotes de pan (x) y 20 de repostería (y), evaluamos el consumo energético para ver si se cumple la meta de 300 kWh.',
            detail: 'Consumo real = 5(40) + 8(20) = 200 + 160 = 360 kWh.\nComo el consumo real (360) excede la meta (300), la desviación por exceso d₃⁺ = 60.'
          },
          {
            title: 'Paso 4: Conclusión del Modelo de Metas',
            description: 'La decisión de satisfacción es producir 40 de pan y 20 de repostería. Se cumplen plenamente P1 y P2, pero es inevitable exceder la meta ambiental P3 en 60 kWh.',
            detail: 'x = 40 lotes de pan artesanal\ny = 20 lotes de repostería fina\nMeta 1: Faltante d₁⁻ = 0 (Cumplida) ✓\nMeta 2: Desviación d₂ = 0 (Cumplida) ✓\nMeta 3: Exceso d₃⁺ = 60 kWh (Excedida en 60) ⚠',
            table: [
              ['Meta', 'Prioridad', 'Fórmula', 'Valor Logrado (Real)', 'Desviación Resultante', 'Estatus'],
              ['Financiera', 'P1', '30x + 50y', '$2,200', 'd₁⁻ = 0, d₁⁺ = 0', 'CUMPLIDA ✓'],
              ['Laboral', 'P2', '2x + 4y', '160 horas', 'd₂⁻ = 0, d₂⁺ = 0', 'CUMPLIDA ✓'],
              ['Ambiental', 'P3', '5x + 8y', '360 kWh', 'd₃⁺ = 60 (Exceso)', 'EXCEDIDA en 60 kWh ⚠']
            ]
          }
        ],
        result: 'Producir 40 de pan y 20 de repostería. Metas P1 y P2 CUMPLIDAS, P3 excedida en 60 kWh.'
      },
      {
        id: 'nolineal',
        title: 'Parte C: Programación No Lineal (Rendimientos Decrecientes)',
        context: 'Una fábrica produce productos A (x) y B (y), pero sus ingresos sufren de elasticidad de demanda (rendimientos decrecientes en forma de ecuaciones al cuadrado). El costo de producir A es $5 y el de B es $8. Ingreso de A: 40x − x², Ingreso de B: 50y − 2y². Restricciones: 2x + 3y ≤ 120 (Horas máquina), x + 2y ≤ 80 (Materia prima).',
        data: {
          objectiveFormula: 'Max Z = 35x - x^2 + 42y - 2y^2',
          optimalPoint: { x: 17.5, y: 10.5, z: 526.75 },
          constraints: [
            { name: 'Horas máquina', formula: '2x + 3y <= 120', usage: 66.5, limit: 120 },
            { name: 'Materia prima', formula: 'x + 2y <= 80', usage: 38.5, limit: 80 }
          ]
        },
        steps: [
          {
            title: 'Paso 1: Planteamiento de la Función de Beneficio',
            description: 'El beneficio neto Z(x, y) es el ingreso total menos los costos de producción ($5x para A y $8y para B).',
            detail: 'Z(x, y) = (40x − x² − 5x) + (50y − 2y² − 8y)\nAgrupando términos similares:\nMax Z(x, y) = 35x − x² + 42y − 2y²',
            table: [
              ['Producto', 'Ecuación Ingreso', 'Costo Unitario', 'Fórmula de Beneficio Neto'],
              ['Producto A', '40x - x²', '$5', '35x - x²'],
              ['Producto B', '50y - 2y²', '$8', '42y - 2y²'],
              ['Total Z', '-', '-', 'Z = 35x - x² + 42y - 2y²']
            ]
          },
          {
            title: 'Paso 2: Resolución mediante Derivadas Parciales',
            description: 'Para encontrar el máximo de la curva (óptimo local), calculamos la primera derivada parcial con respecto a cada variable e igualamos a cero.',
            detail: 'Para producto A (x): f\'(x) = 35 − 2x = 0 ⇒ x = 17.5\nPara producto B (y): f\'(y) = 42 − 4y = 0 ⇒ y = 10.5'
          },
          {
            title: 'Paso 3: Verificación de Factibilidad (Restricciones)',
            description: 'Se comprueba si el punto óptimo calculado (17.5, 10.5) respeta los límites de capacidad física de la planta.',
            detail: 'Horas máquina: 2(17.5) + 3(10.5) = 66.5 ≤ 120 ✓ (Cumple)\nMateria prima: 17.5 + 2(10.5) = 38.5 ≤ 80 ✓ (Cumple)\nComo no viola restricciones, el óptimo está dentro de la región factible.',
            table: [
              ['Recurso Limitado', 'Fórmula Restricción', 'Consumo en Óptimo (17.5, 10.5)', 'Capacidad Límite', 'Estatus'],
              ['Horas Máquina', '2x + 3y ≤ 120', '2(17.5) + 3(10.5) = 66.5', '120 h', 'CUMPLE ✓ (53.5 horas libres)'],
              ['Materia Prima', 'x + 2y ≤ 80', '17.5 + 2(10.5) = 38.5', '80 u', 'CUMPLE ✓ (41.5 unidades libres)']
            ]
          },
          {
            title: 'Paso 4: Conclusión y Beneficio Máximo',
            description: 'La producción óptima es de 17.5 de A y 10.5 de B. Exceder este límite generaría pérdidas por los rendimientos decrecientes.',
            detail: 'Beneficio Óptimo Z* = 35(17.5) − (17.5)² + 42(10.5) − 2(10.5)² = $526.75\nQuedan ociosos 53.5 horas máquina y 41.5 unidades de materia prima.'
          }
        ],
        result: 'Producir 17.5 de A y 10.5 de B → Beneficio Óptimo Máximo: $526.75'
      }
    ]
  },
  {
    id: 3,
    slug: 'redes',
    title: 'Técnicas de Optimización de Redes',
    shortTitle: 'Redes',
    iconName: 'Network',
    color: 'var(--method-3)',
    colorHex: '#10b981',
    pdfFile: '/docs/Metodo de Optimizacion Jose Luis Lopez.pdf',
    tagline: 'Árbol de expansión mínima, flujo máximo y ruta más corta mediante algoritmo de Dijkstra',
    objective: 'Tres misiones: conectar todos los puntos gastando lo mínimo (Árbol Expansión Mínima), maximizar el flujo de recursos entre dos puntos (Flujo Máximo), o encontrar el camino más eficiente de A a B (Ruta Más Corta).',
    forWhat: 'En logística, transporte o telecomunicaciones: mapas de rutas de entrega con cierres de vías, conectar sucursales con fibra óptica sin gastar de más, o determinar cuánto producto puede pasar por carreteras sin saturarlas.',
    technicalAspects: [
      'Red (G): el mapa completo con todos los nodos y arcos del sistema.',
      'Nodos (N): puntos geográficos clave (ciudades, intersecciones, puertos).',
      'Arcos (A): líneas que conectan nodos con un "peso" (distancia, tiempo, costo).',
      'Cuellos de botella: conexiones estrechas que limitan el flujo total en la red.',
    ],
    howItWorks: 'Árbol de Expansión Mínima: conecta todos los nodos eligiendo siempre los arcos más baratos, evitando crear ciclos cerrados. Flujo Máximo: analiza capacidades límite enviando la mayor cantidad posible hasta saturar los cuellos de botella. Ruta Más Corta (Dijkstra): empieza en el origen con etiqueta 0, revisa vecinos sumando distancias, elige siempre el camino acumulado más corto y lo vuelve "permanente" hasta llegar al destino.',
    formulas: [
      {
        name: 'Función Objetivo (Ruta Más Corta)',
        latex: '\\text{Min } Z = \\sum c_{ij} \\cdot x_{ij}',
        variables: [
          { symbol: 'c_{ij}', desc: 'Distancia/costo entre nodo i y nodo j' },
          { symbol: 'x_{ij}', desc: 'Variable binaria: 1 si se usa la ruta, 0 si no' },
        ]
      },
      {
        name: 'Restricción de Balance de Flujo',
        latex: '\\sum x_{ij} - \\sum x_{ki} = b_i \\quad \\begin{cases} +1 & \\text{nodo origen} \\\\ 0 & \\text{nodo intermedio} \\\\ -1 & \\text{nodo destino} \\end{cases}',
        variables: [
          { symbol: 'b_i', desc: 'Valor del nodo: +1 origen, 0 intermedio, -1 destino' },
        ]
      },
      {
        name: 'Restricción Binaria',
        latex: 'x_{ij} \\geq 0 \\quad \\text{y} \\quad x_{ij} \\in \\{0, 1\\}',
        variables: []
      }
    ],
    exercise: {
      title: 'Ejercicio 3: Ruta Más Corta (Algoritmo de Dijkstra)',
      context: 'Se debe encontrar la ruta más corta para transportar contenedores desde el origen (Puerto Moín) hasta el destino (San José), pasando por una red de ciudades con distancias conocidas.',
      nodes: [
        { id: 'A', label: 'Puerto Moín\n(Origen)', x: 80, y: 200 },
        { id: 'B', label: 'Siquirres', x: 230, y: 110 },
        { id: 'C', label: 'Turrialba', x: 230, y: 290 },
        { id: 'D', label: 'Cartago', x: 380, y: 110 },
        { id: 'E', label: 'Paraíso', x: 380, y: 290 },
        { id: 'F', label: 'San José\n(Destino)', x: 530, y: 200 },
      ],
      edges: [
        { from: 'A', to: 'B', weight: 60 },
        { from: 'A', to: 'C', weight: 90 },
        { from: 'B', to: 'C', weight: 50 },
        { from: 'B', to: 'D', weight: 40 },
        { from: 'C', to: 'E', weight: 35 },
        { from: 'D', to: 'E', weight: 30 },
        { from: 'D', to: 'F', weight: 55 },
        { from: 'E', to: 'F', weight: 45 },
      ],
      shortestPath: ['A', 'B', 'D', 'F'],
      shortestDistance: 155,
      steps: [
        {
          title: 'Paso 1: Inicialización',
          description: 'Al nodo origen (A) se le asigna distancia 0 y se marca como permanente. Todos los demás nodos tienen distancia ∞.',
          detail: 'Permanente: A(0). Provisional: B(∞), C(∞), D(∞), E(∞), F(∞).',
          table: [
            ['Nodo', 'Etiqueta de Distancia', 'Predecesor', 'Estado'],
            ['A (Origen)', '0', '-', 'PERMANENTE ✓'],
            ['B', '∞', '-', 'Provisional'],
            ['C', '∞', '-', 'Provisional'],
            ['D', '∞', '-', 'Provisional'],
            ['E', '∞', '-', 'Provisional'],
            ['F (Destino)', '∞', '-', 'Provisional']
          ]
        },
        {
          title: 'Paso 2: Explorar desde A',
          description: 'Se actualizan los vecinos del nodo A con sus distancias acumuladas.',
          detail: 'B = 0+60 = 60, C = 0+90 = 90. Menor distancia provisional: B(60) → se vuelve permanente.',
          table: [
            ['Nodo', 'Etiqueta de Distancia', 'Predecesor', 'Estado'],
            ['A', '0', '-', 'Permanente'],
            ['B', '60', 'A', 'PERMANENTE (Elegido menor) ✓'],
            ['C', '90', 'A', 'Provisional'],
            ['D', '∞', '-', 'Provisional'],
            ['E', '∞', '-', 'Provisional'],
            ['F', '∞', '-', 'Provisional']
          ]
        },
        {
          title: 'Paso 3: Explorar desde B(60)',
          description: 'Se actualizan los vecinos de B.',
          detail: 'C: min(90, 60+50=110) → queda en 90. D = 60+40 = 100. Menor provisional: C(90) → permanente.',
          table: [
            ['Nodo', 'Etiqueta de Distancia', 'Predecesor', 'Estado'],
            ['A', '0', '-', 'Permanente'],
            ['B', '60', 'A', 'Permanente'],
            ['C', '90', 'A', 'PERMANENTE (Elegido menor) ✓'],
            ['D', '100', 'B', 'Provisional'],
            ['E', '∞', '-', 'Provisional'],
            ['F', '∞', '-', 'Provisional']
          ]
        },
        {
          title: 'Paso 4: Explorar desde C(90)',
          description: 'Se actualizan los vecinos de C.',
          detail: 'E = 90+35 = 125. Menor provisional: D(100) → permanente.',
          table: [
            ['Nodo', 'Etiqueta de Distancia', 'Predecesor', 'Estado'],
            ['A', '0', '-', 'Permanente'],
            ['B', '60', 'A', 'Permanente'],
            ['C', '90', 'A', 'Permanente'],
            ['D', '100', 'B', 'PERMANENTE (Elegido menor) ✓'],
            ['E', '125', 'C', 'Provisional'],
            ['F', '∞', '-', 'Provisional']
          ]
        },
        {
          title: 'Paso 5: Explorar desde D(100)',
          description: 'Se actualizan los vecinos de D.',
          detail: 'E: min(125, 100+30=130) → queda en 125. F = 100+55 = 155. Menor provisional: E(125) → permanente.',
          table: [
            ['Nodo', 'Etiqueta de Distancia', 'Predecesor', 'Estado'],
            ['A', '0', '-', 'Permanente'],
            ['B', '60', 'A', 'Permanente'],
            ['C', '90', 'A', 'Permanente'],
            ['D', '100', 'B', 'Permanente'],
            ['E', '125', 'C', 'PERMANENTE (Elegido menor) ✓'],
            ['F', '155', 'D', 'Provisional']
          ]
        },
        {
          title: 'Paso 6: Explorar desde E(125)',
          description: 'Se actualiza el vecino F.',
          detail: 'F: min(155, 125+45=170) → queda en 155. Menor provisional: F(155) → permanente. DESTINO ALCANZADO.',
          table: [
            ['Nodo', 'Etiqueta de Distancia', 'Predecesor', 'Estado'],
            ['A', '0', '-', 'Permanente'],
            ['B', '60', 'A', 'Permanente'],
            ['C', '90', 'A', 'Permanente'],
            ['D', '100', 'B', 'Permanente'],
            ['E', '125', 'C', 'Permanente'],
            ['F', '155', 'D', 'PERMANENTE (Destino alcanzado) ✓']
          ]
        },
        {
          title: 'Paso 7: Resultado Final',
          description: 'La ruta más corta desde A hasta F con distancia total mínima es:',
          detail: 'Ruta: A → B → D → F con distancia = 60+40+55 = 155 km. (Alternativamente: A→B→C→E→F=60+50+35+45=190, o A→B→D→E→F=60+40+30+45=175). Óptimo: 155 km por A→B→D→F.',
          table: [
            ['Tramo', 'Distancia Parcial', 'Distancia Acumulada'],
            ['A → B (Moín → Siquirres)', '60 km', '60 km'],
            ['B → D (Siquirres → Cartago)', '40 km', '100 km'],
            ['D → F (Cartago → San José)', '55 km', '155 km'],
            ['Ruta Óptima', 'A → B → D → F', 'Total: 155 km']
          ]
        }
      ],
      result: 'Ruta más corta: A → B → D → F con 155 km de distancia total'
    }
  },
  {
    id: 4,
    slug: 'montecarlo',
    title: 'Simulación de Monte Carlo',
    shortTitle: 'Monte Carlo',
    iconName: 'Dices',
    color: 'var(--method-4)',
    colorHex: '#f59e0b',
    pdfFile: '/docs/Metodo de Monte Carlo Jose Luis Lopez.pdf',
    tagline: 'Imitación del comportamiento real mediante números aleatorios y datos históricos',
    objective: 'Optimizar procesos críticos (filas de espera, inventario, mantenimiento) aplicando modelos virtuales para probar escenarios y tomar decisiones gerenciales informadas, sin afectar ni detener la operación real.',
    forWhat: 'Cuando no puedes controlar ni predecir con exactitud factores del entorno (hora de llegada de camiones, demanda de contenedores, avería de grúas). Hacer pruebas en la vida real sería muy caro y riesgoso. La simulación crea un entorno virtual.',
    technicalAspects: [
      'Frecuencia (f) y Total (N): f es cuántas veces ocurrió algo históricamente; N es el total de observaciones.',
      'Probabilidad P(x): porcentaje de que un evento ocurra, basado en el historial.',
      'Probabilidad Acumulada F(x): suma progresiva de probabilidades hasta llegar a 1.00 (100%).',
      'Números Aleatorios (RN): números del 1 al 100 que representan la incertidumbre; cada número = un "evento" en el mundo virtual.',
    ],
    howItWorks: 'El método sigue 6 pasos: (1) Recolectar datos históricos. (2) Calcular probabilidades dividiendo frecuencias entre el total. (3) Construir probabilidades acumuladas. (4) Generar rangos de aleatorios proporcionales a cada probabilidad. (5) Simular generando RN y mapeando cada uno a su evento correspondiente. (6) Analizar: comparar el promedio simulado con el valor esperado teórico para tomar decisiones.',
    formulas: [
      {
        name: 'Cálculo de Probabilidad',
        latex: 'P(x) = \\frac{f}{N}',
        variables: [
          { symbol: 'f', desc: 'Frecuencia histórica del evento' },
          { symbol: 'N', desc: 'Total de observaciones realizadas' },
        ]
      },
      {
        name: 'Probabilidad Acumulada',
        latex: 'F(x) = \\sum P(x)',
        variables: [
          { symbol: 'F(x)', desc: 'Suma progresiva de probabilidades desde el primer evento hasta el actual' },
        ]
      },
      {
        name: 'Valor Esperado Teórico',
        latex: 'E(X) = \\sum X_i \\cdot P(X_i)',
        variables: [
          { symbol: 'X_i', desc: 'Valor del evento (ej. 5 minutos de espera, 20 contenedores de demanda)' },
          { symbol: 'P(X_i)', desc: 'Probabilidad de que ocurra ese evento' },
        ]
      },
      {
        name: 'Valor Simulado de Monte Carlo (Promedio Simulado)',
        latex: '\\bar{X} = \\frac{\\sum X_{simulados}}{N}',
        variables: [
          { symbol: 'X_{simulados}', desc: 'Suma de todos los resultados de la tabla de simulación' },
          { symbol: 'N', desc: 'Cantidad de ciclos o días simulados' },
        ]
      }
    ],
    exercises: [
      {
        id: 'colas',
        title: 'Parte A: Problema de Colas (Tiempos de Inspección)',
        context: 'Simulación del tiempo de inspección de contenedores en la Terminal de Aduanas de Limón, a partir de frecuencias históricas de 100 contenedores.',
        data: {
          distribution: [
            { value: 15, label: '15 min', frequency: 20, probability: 0.20, cumulative: 0.20, rnRange: '01-20' },
            { value: 30, label: '30 min', frequency: 40, probability: 0.40, cumulative: 0.60, rnRange: '21-60' },
            { value: 45, label: '45 min', frequency: 30, probability: 0.30, cumulative: 0.90, rnRange: '61-90' },
            { value: 60, label: '60 min', frequency: 10, probability: 0.10, cumulative: 1.00, rnRange: '91-100' }
          ],
          totalObservations: 100,
          simulationRNs: [25, 88, 12, 65, 92, 8, 45, 73, 19, 54],
          simulatedEvents: [
            { event: 1, rn: 25, value: 30, range: '21-60' },
            { event: 2, rn: 88, value: 45, range: '61-90' },
            { event: 3, rn: 12, value: 15, range: '01-20' },
            { event: 4, rn: 65, value: 45, range: '61-90' },
            { event: 5, rn: 92, value: 60, range: '91-100' },
            { event: 6, rn: 8, value: 15, range: '01-20' },
            { event: 7, rn: 45, value: 30, range: '21-60' },
            { event: 8, rn: 73, value: 45, range: '61-90' },
            { event: 9, rn: 19, value: 15, range: '01-20' },
            { event: 10, rn: 54, value: 30, range: '21-60' }
          ],
          expectedValue: 34.5,
          simulatedMean: 33.0
        },
        steps: [
          {
            title: 'Paso 1: Datos Históricos y Construcción de Rangos',
            description: 'Se registran las frecuencias de tiempos de inspección observadas en 100 contenedores y se calcula la acumulada y rangos.',
            detail: '15 min: 20 cont (Prob=0.20, Acum=0.20, Rango 01-20)\n30 min: 40 cont (Prob=0.40, Acum=0.60, Rango 21-60)\n45 min: 30 cont (Prob=0.30, Acum=0.90, Rango 61-90)\n60 min: 10 cont (Prob=0.10, Acum=1.00, Rango 91-100)',
            table: [
              ['Tiempo (x)', 'Frecuencia (f)', 'Probabilidad P(x)', 'Acumulada F(x)', 'Rango Asignado (01-100)'],
              ['15 min', '20', '0.20 (20%)', '0.20', '01 - 20'],
              ['30 min', '40', '0.40 (40%)', '0.60', '21 - 60'],
              ['45 min', '30', '0.30 (30%)', '0.90', '61 - 90'],
              ['60 min', '10', '0.10 (10%)', '1.00', '91 - 100']
            ]
          },
          {
            title: 'Paso 2: Valor Esperado Teórico',
            description: 'Se calcula la media teórica multiplicando cada tiempo por su probabilidad.',
            detail: 'E(X) = (15 × 0.20) + (30 × 0.40) + (45 × 0.30) + (60 × 0.10) = 34.5 minutos.',
            table: [
              ['Tiempo (x)', 'Probabilidad P(x)', 'Multiplicación (x * P(x))'],
              ['15 min', '0.20', '3.0 min'],
              ['30 min', '0.40', '12.0 min'],
              ['45 min', '0.30', '13.5 min'],
              ['60 min', '0.10', '6.0 min'],
              ['Valor Esperado E(X)', '-', 'Suma: 34.5 minutos']
            ]
          },
          {
            title: 'Paso 3: Ejecutar Simulación (10 Contenedores)',
            description: 'Se mapean los 10 números aleatorios provistos (25, 88, 12, 65, 92, 8, 45, 73, 19, 54) a sus respectivos rangos de la ruleta.',
            detail: 'RN25→30 | RN88→45 | RN12→15 | RN65→45 | RN92→60 | RN8→15 | RN45→30 | RN73→45 | RN19→15 | RN54→30. Tiempos totales simulados = 330 minutos.',
            table: [
              ['Contenedor', 'N° Aleatorio (RN)', 'Rango del Intervalo', 'Resultado Simulado'],
              ['1', '25', '21 - 60', '30 min'],
              ['2', '88', '61 - 90', '45 min'],
              ['3', '12', '01 - 20', '15 min'],
              ['4', '65', '61 - 90', '45 min'],
              ['5', '92', '91 - 100', '60 min'],
              ['6', '8', '01 - 20', '15 min'],
              ['7', '45', '21 - 60', '30 min'],
              ['8', '73', '61 - 90', '45 min'],
              ['9', '19', '01 - 20', '15 min'],
              ['10', '54', '21 - 60', '30 min']
            ]
          },
          {
            title: 'Paso 4: Consolidación y Conclusión',
            description: 'Se saca el promedio de la simulación y se compara con la media teórica.',
            detail: 'Promedio Simulado = 330 / 10 = 33 minutos.\nConclusión: El promedio simulado (33 min) es ligeramente inferior al teórico (34.5 min) ya que la alta cantidad de trámites rápidos (15 y 30 min) compensó el caso crítico de 60 min.'
          }
        ],
        result: 'E(X) Teórico = 34.5 min | X̄ Simulado = 33.0 min. Trámites rápidos compensaron el caso crítico.'
      },
      {
        id: 'marchamos',
        title: 'Parte B: Control de Recursos (Demanda de Marchamos)',
        context: 'Simulación de la demanda diaria de marchamos en la Terminal de Aduanas de Limón durante 10 días, a partir de frecuencias históricas de 100 días.',
        data: {
          distribution: [
            { value: 50, label: '50 u', frequency: 15, probability: 0.15, cumulative: 0.15, rnRange: '01-15' },
            { value: 100, label: '100 u', frequency: 45, probability: 0.45, cumulative: 0.60, rnRange: '16-60' },
            { value: 150, label: '150 u', frequency: 30, probability: 0.30, cumulative: 0.90, rnRange: '61-90' },
            { value: 200, label: '200 u', frequency: 10, probability: 0.10, cumulative: 1.00, rnRange: '91-100' }
          ],
          totalObservations: 100,
          simulationRNs: [50, 10, 85, 42, 95, 22, 67, 5, 33, 78],
          simulatedEvents: [
            { event: 1, rn: 50, value: 100, range: '16-60' },
            { event: 2, rn: 10, value: 50, range: '01-15' },
            { event: 3, rn: 85, value: 150, range: '61-90' },
            { event: 4, rn: 42, value: 100, range: '16-60' },
            { event: 5, rn: 95, value: 200, range: '91-100' },
            { event: 6, rn: 22, value: 100, range: '16-60' },
            { event: 7, rn: 67, value: 150, range: '61-90' },
            { event: 8, rn: 5, value: 50, range: '01-15' },
            { event: 9, rn: 33, value: 100, range: '16-60' },
            { event: 10, rn: 78, value: 150, range: '61-90' }
          ],
          expectedValue: 117.5,
          simulatedMean: 115.0
        },
        steps: [
          {
            title: 'Paso 1: Datos Históricos y Rangos de Demanda',
            description: 'Se registran las frecuencias históricas de la demanda de marchamos y se construye la acumulada y rangos.',
            detail: '50u: 15 d | 100u: 45 d | 150u: 30 d | 200u: 10 d. Probabilidad Acumulada: F(50)=0.15, F(100)=0.60, F(150)=0.90, F(200)=1.00.',
            table: [
              ['Demanda (x)', 'Frecuencia (días)', 'Probabilidad P(x)', 'Acumulada F(x)', 'Rango Asignado (01-100)'],
              ['50 u', '15', '0.15 (15%)', '0.15', '01 - 15'],
              ['100 u', '45', '0.45 (45%)', '0.60', '16 - 60'],
              ['150 u', '30', '0.30 (30%)', '0.90', '61 - 90'],
              ['200 u', '10', '0.10 (10%)', '1.00', '91 - 100']
            ]
          },
          {
            title: 'Paso 2: Generar Rangos de Aleatorios',
            description: 'Se asigna un rango numérico de la ruleta (01-100) para cada nivel de demanda y se calcula la media teórica.',
            detail: 'E(X) = (50 × 0.15) + (100 × 0.45) + (150 × 0.30) + (200 × 0.10) = 117.5 unidades/día.',
            table: [
              ['Demanda (x)', 'Probabilidad P(x)', 'Multiplicación (x * P(x))'],
              ['50 u', '0.15', '7.5 u'],
              ['100 u', '0.45', '45.0 u'],
              ['150 u', '0.30', '45.0 u'],
              ['200 u', '0.10', '20.0 u'],
              ['Valor Esperado E(X)', '-', 'Suma: 117.5 unidades']
            ]
          },
          {
            title: 'Paso 3: Ejecutar Simulación (10 Días)',
            description: 'Se evalúan 10 números aleatorios en la ruleta de rangos para saber la demanda diaria.',
            detail: 'RN50→100 | RN10→50 | RN85→150 | RN42→100 | RN95→200 | RN22→100 | RN67→150 | RN5→50 | RN33→100 | RN78→150. Demanda total = 1150 marchamos.',
            table: [
              ['Día', 'N° Aleatorio (RN)', 'Rango del Intervalo', 'Demanda Simulada'],
              ['Día 1', '50', '16 - 60', '100 u'],
              ['Día 2', '10', '01 - 15', '50 u'],
              ['Día 3', '85', '61 - 90', '150 u'],
              ['Día 4', '42', '16 - 60', '100 u'],
              ['Día 5', '95', '91 - 100', '200 u'],
              ['Día 6', '22', '16 - 60', '100 u'],
              ['Día 7', '67', '61 - 90', '150 u'],
              ['Día 8', '5', '01 - 15', '50 u'],
              ['Día 9', '33', '16 - 60', '100 u'],
              ['Día 10', '78', '61 - 90', '150 u']
            ]
          },
          {
            title: 'Paso 4: Análisis de Resultados e Inventario',
            description: 'Se calcula la media teórica y la simulada, evaluando el riesgo de desabastecimiento.',
            detail: 'E(X) = 117.5 unidades diarias. Promedio Simulado = 115.0 unidades.\nConclusión: Planificar con el promedio (118/día) habría causado escasez en 4 de los 10 días (días 3, 5, 7 y 10). Se requiere un stock de seguridad.'
          }
        ],
        result: 'E(X) Teórico = 117.5 u/día | X̄ Simulado = 115.0 u/día. Planificar con la media causaría escasez 4 de cada 10 días.'
      },
      {
        id: 'mantenimiento',
        title: 'Parte C: Política de Mantenimiento (Escáner de Rayos X)',
        context: 'Simulación del tiempo operativo (en días útiles) de un escáner de rayos X en la Terminal de Aduanas antes de fallar, a partir de frecuencias de 100 fallas.',
        data: {
          distribution: [
            { value: 10, label: '10 días', frequency: 30, probability: 0.30, cumulative: 0.30, rnRange: '01-30' },
            { value: 20, label: '20 días', frequency: 40, probability: 0.40, cumulative: 0.70, rnRange: '31-70' },
            { value: 30, label: '30 días', frequency: 20, probability: 0.20, cumulative: 0.90, rnRange: '71-90' },
            { value: 40, label: '40 días', frequency: 10, probability: 0.10, cumulative: 1.00, rnRange: '91-100' }
          ],
          totalObservations: 100,
          simulationRNs: [75, 18, 55, 32, 91, 4, 61, 89, 27, 49],
          simulatedEvents: [
            { event: 1, rn: 75, value: 30, range: '71-90' },
            { event: 2, rn: 18, value: 10, range: '01-30' },
            { event: 3, rn: 55, value: 20, range: '31-70' },
            { event: 4, rn: 32, value: 20, range: '31-70' },
            { event: 5, rn: 91, value: 40, range: '91-100' },
            { event: 6, rn: 4, value: 10, range: '01-30' },
            { event: 7, rn: 61, value: 20, range: '31-70' },
            { event: 8, rn: 89, value: 30, range: '71-90' },
            { event: 9, rn: 27, value: 10, range: '01-30' },
            { event: 10, rn: 49, value: 20, range: '31-70' }
          ],
          expectedValue: 21.0,
          simulatedMean: 21.0
        },
        steps: [
          {
            title: 'Paso 1: Recolección e Historial de Fallas',
            description: 'Se registran las frecuencias históricas de la vida útil del escáner en días de operación.',
            detail: '10 d: 30 fallas | 20 d: 40 fallas | 30 d: 20 fallas | 40 d: 10 fallas. Probabilidad Acumulada: F(10)=0.30, F(20)=0.70, F(30)=0.90, F(40)=1.00.',
            table: [
              ['Días Útiles (x)', 'Frecuencia (fallas)', 'Probabilidad P(x)', 'Acumulada F(x)', 'Rango Asignado (01-100)'],
              ['10 días', '30', '0.30 (30%)', '0.30', '01 - 30'],
              ['20 días', '40', '0.40 (40%)', '0.70', '31 - 70'],
              ['30 días', '20', '0.20 (20%)', '0.90', '71 - 90'],
              ['40 días', '10', '0.10 (10%)', '1.00', '91 - 100']
            ]
          },
          {
            title: 'Paso 2: Asignación de Rangos Aleatorios',
            description: 'Se asigna un rango numérico de la ruleta (01-100) para cada duración de vida útil y se calcula la media teórica.',
            detail: 'E(X) = (10 × 0.30) + (20 × 0.40) + (30 × 0.20) + (40 × 0.10) = 21 días útiles.',
            table: [
              ['Días Útiles (x)', 'Probabilidad P(x)', 'Multiplicación (x * P(x))'],
              ['10 días', '0.30', '3.0 días'],
              ['20 días', '0.40', '8.0 días'],
              ['30 días', '0.20', '6.0 días'],
              ['40 días', '0.10', '4.0 días'],
              ['Valor Esperado E(X)', '-', 'Suma: 21.0 días']
            ]
          },
          {
            title: 'Paso 3: Ejecución de 10 Ciclos Operativos',
            description: 'Se simulan 10 ciclos utilizando números aleatorios para determinar cuántos días duró la máquina antes de fallar.',
            detail: 'RN75→30 | RN18→10 | RN55→20 | RN32→20 | RN91→40 | RN4→10 | RN61→20 | RN89→30 | RN27→10 | RN49→20. Días operativos totales = 210 días.',
            table: [
              ['Ciclo de Falla', 'N° Aleatorio (RN)', 'Rango del Intervalo', 'Duración Simulada'],
              ['Ciclo 1', '75', '71 - 90', '30 días'],
              ['Ciclo 2', '18', '01 - 30', '10 días'],
              ['Ciclo 3', '55', '31 - 70', '20 días'],
              ['Ciclo 4', '32', '31 - 70', '20 días'],
              ['Ciclo 5', '91', '91 - 100', '40 días'],
              ['Ciclo 6', '4', '01 - 30', '10 días'],
              ['Ciclo 7', '61', '31 - 70', '20 días'],
              ['Ciclo 8', '89', '71 - 90', '30 días'],
              ['Ciclo 9', '27', '01 - 30', '10 días'],
              ['Ciclo 10', '49', '31 - 70', '20 días']
            ]
          },
          {
            title: 'Paso 4: Análisis y Conclusión de Mantenimiento',
            description: 'Se comparan las medias teórica y simulada y se diseña la política de mantenimiento preventivo.',
            detail: 'E(X) = 21 días. Promedio Simulado = 21 días.\nConclusión: Aunque el promedio es 21 días, la simulación revela que el 70% de las veces la máquina falla a los 20 días o antes. Programar mantenimiento cada 21 días causaría paros. Se recomienda programarlo preventivamente cada 10-15 días.'
          }
        ],
        result: 'E(X) Teórico = 21.0 días | X̄ Simulado = 21.0 días. El 70% de las veces la máquina fallará a los 20 días o antes.'
      }
    ]
  },
  {
    id: 5,
    slug: 'markov',
    title: 'Cadenas de Markov',
    shortTitle: 'Markov',
    iconName: 'RefreshCw',
    color: 'var(--method-5)',
    colorHex: '#ec4899',
    pdfFile: '/docs/Metodo de Markov Jose Luis Lopez.pdf',
    tagline: 'Pronósticos basados en probabilidades de transición entre estados del sistema',
    objective: 'Realizar pronósticos sobre cómo cambiará la participación de mercado o el comportamiento de un sistema a lo largo del tiempo. A largo plazo, encontrar el "equilibrio" donde los porcentajes se estabilizan y ya no cambian.',
    forWhat: 'Predecir qué marca de telefonía celular usarán los clientes el próximo año, o si una máquina fundamental de la fábrica estará operando o averiada la próxima semana. Es imposible saberlo con 100% de certeza, pero las cadenas de Markov calculan probabilidades futuras.',
    technicalAspects: [
      'Propiedad de Markov: para pronosticar el futuro solo importa el estado ACTUAL, no el historial completo.',
      'Estados: situaciones posibles del sistema (ej. ser cliente de Kölbi, Liberty o Claro).',
      'Probabilidades de transición: porcentaje de que un cliente pase de un estado a otro en un período.',
      'Matriz de Transición (P): tabla con todas las probabilidades de cambio. Cada fila debe sumar 1.0.',
      'Estado Estable: punto futuro donde los porcentajes ya no cambian aunque pasen más períodos.',
    ],
    howItWorks: '4 pasos: (1) Definir el vector inicial π(0) con cómo está distribuido el mercado hoy. (2) Construir la Matriz de Transición P analizando el comportamiento histórico de los clientes. (3) Multiplicar π(n)×P para pronosticar el período siguiente. (4) Para el estado estable, crear un sistema de ecuaciones π=π·P y añadir la condición π₁+π₂+π₃=1, luego despejar y sustituir.',
    formulas: [
      {
        name: 'Vector de Probabilidades en el período n',
        latex: '\\pi^{(n)} = [\\pi_1^{(n)},\\; \\pi_2^{(n)},\\; \\ldots,\\; \\pi_k^{(n)}]',
        variables: [
          { symbol: '\\pi', desc: 'Vector de probabilidades de estado' },
          { symbol: '(n)', desc: 'Período que se está analizando; (0) = inicio' },
        ]
      },
      {
        name: 'Pronóstico Período a Período',
        latex: '\\pi^{(n+1)} = \\pi^{(n)} \\cdot P',
        variables: [
          { symbol: '\\pi^{(n+1)}', desc: 'Pronóstico del siguiente período' },
          { symbol: 'P', desc: 'Matriz de probabilidad de transición' },
        ]
      },
      {
        name: 'Condición de Estado Estable',
        latex: '\\pi = \\pi \\cdot P \\quad \\text{y} \\quad \\sum_{i} \\pi_i = 1',
        variables: [
          { symbol: '\\pi', desc: 'Vector de estado estable (no cambia con el tiempo)' },
        ]
      }
    ],
    exercise: {
      title: 'Ejercicio 5: Participación de Mercado de Telefonía',
      context: 'Tres operadoras compiten en el mercado costarricense: Kölbi (K), Liberty (L) y Claro (C). Se analiza cómo migrarán los clientes entre operadoras mes a mes.',
      data: {
        states: ['Kölbi', 'Liberty', 'Claro'],
        initialVector: [0.50, 0.30, 0.20],
        transitionMatrix: [
          [0.70, 0.20, 0.10],
          [0.15, 0.65, 0.20],
          [0.10, 0.25, 0.65],
        ],
        steadyState: [0.3846, 0.3077, 0.3077],
        period1: [0.415, 0.2775, 0.3075],
        period2: [0.365, 0.289, 0.346],
      },
      steps: [
        {
          title: 'Paso 1: Vector Inicial de Estado π(0)',
          description: 'Se define cómo está distribuido el mercado de telefonía en el período 0 (hoy).',
          detail: 'π(0) = [0.50, 0.30, 0.20] → Kölbi 50%, Liberty 30%, Claro 20%',
          table: [
            ['Operadora', 'Kölbi (K)', 'Liberty (L)', 'Claro (C)'],
            ['Participación Inicial (π(0))', '0.50 (50%)', '0.30 (30%)', '0.20 (20%)']
          ]
        },
        {
          title: 'Paso 2: Construir la Matriz de Transición P',
          description: 'Cada celda indica la probabilidad de que un cliente pase de la operadora de la fila a la de la columna. Cada fila suma 1.0.',
          detail: 'K→K=0.70, K→L=0.20, K→C=0.10\nL→K=0.15, L→L=0.65, L→C=0.20\nC→K=0.10, C→L=0.25, C→C=0.65',
          table: [
            ['Desde \\ Hacia', 'Kölbi (K)', 'Liberty (L)', 'Claro (C)', 'Suma Fila'],
            ['Kölbi (K)', '0.70', '0.20', '0.10', '1.00 ✓'],
            ['Liberty (L)', '0.15', '0.65', '0.20', '1.00 ✓'],
            ['Claro (C)', '0.10', '0.25', '0.65', '1.00 ✓']
          ]
        },
        {
          title: 'Paso 3: Pronóstico Período 1 (π(1) = π(0) · P)',
          description: 'Se multiplica el vector inicial por la matriz de transición.',
          detail: 'K: 0.50(0.70)+0.30(0.15)+0.20(0.10)=0.35+0.045+0.02=0.415\nL: 0.50(0.20)+0.30(0.65)+0.20(0.25)=0.10+0.195+0.05=0.2775 (Redondeado a 0.277)\nC: 0.50(0.10)+0.30(0.20)+0.20(0.65)=0.05+0.06+0.13=0.3075 (Redondeado a 0.308)',
          table: [
            ['Operadora', 'Cálculo de Participación (π(1))', 'Participación Pronóstico Mes 1'],
            ['Kölbi (K)', '0.50(0.70) + 0.30(0.15) + 0.20(0.10) = 0.415', '41.50%'],
            ['Liberty (L)', '0.50(0.20) + 0.30(0.65) + 0.20(0.25) = 0.2775', '27.75%'],
            ['Claro (C)', '0.50(0.10) + 0.30(0.20) + 0.20(0.65) = 0.3075', '30.75%'],
            ['Total', '0.415 + 0.2775 + 0.3075 = 1.00', '100.00% ✓']
          ]
        },
        {
          title: 'Paso 4: Pronóstico Período 2 (π(2) = π(1) · P)',
          description: 'Se repite la multiplicación con el resultado del período 1.',
          detail: 'K≈0.365, L≈0.289, C≈0.346 (Los porcentajes se acercan gradualmente al equilibrio.)',
          table: [
            ['Operadora', 'Cálculo de Participación (π(2))', 'Participación Pronóstico Mes 2'],
            ['Kölbi (K)', '0.4150(0.70) + 0.2775(0.15) + 0.3075(0.10) ≈ 0.363', '36.30%'],
            ['Liberty (L)', '0.4150(0.20) + 0.2775(0.65) + 0.3075(0.25) ≈ 0.290', '29.00%'],
            ['Claro (C)', '0.4150(0.10) + 0.2775(0.20) + 0.3075(0.65) ≈ 0.347', '34.70%'],
            ['Total', '0.363 + 0.290 + 0.347 = 1.00', '100.00% ✓']
          ]
        },
        {
          title: 'Paso 5: Calcular Estado Estable',
          description: 'Se plantea el sistema π = π·P y se añade la restricción π_K + π_L + π_C = 1.',
          detail: 'Del sistema de ecuaciones:\n0.70πK + 0.15πL + 0.10πC = πK\n0.20πK + 0.65πL + 0.25πC = πL\nπK + πL + πC = 1\nSolución: πK ≈ 38.46%, πL ≈ 30.77%, πC ≈ 30.77%',
          table: [
            ['Operadora', 'Ecuación de Estado Estable', 'Participación a Largo Plazo (π)'],
            ['Kölbi (K)', '0.30π_K - 0.15π_L - 0.10π_C = 0', '38.46% (5/13)'],
            ['Liberty (L)', '-0.20π_K + 0.35π_L - 0.25π_C = 0', '30.77% (4/13)'],
            ['Claro (C)', 'π_K + π_L + π_C = 1', '30.77% (4/13)'],
            ['Estatus', '-', 'Total: 100.00% ✓ (Estabilizado)']
          ]
        }
      ],
      result: 'Estado Estable: Kölbi 38.46% | Liberty 30.77% | Claro 30.77%',
    }
  },
  {
    id: 6,
    slug: 'control',
    title: 'Control Estadístico de Procesos',
    shortTitle: 'Control Estadístico',
    iconName: 'Activity',
    color: 'var(--method-6)',
    colorHex: '#3b82f6',
    pdfFile: '/docs/Metodo de Control Estadistico Jose Luis Lopez.pdf',
    tagline: 'Vigilar la estabilidad de un proceso productivo con gráficas de control y límites estadísticos',
    objective: 'Usar datos matemáticos y gráficos visuales para vigilar si un proceso se mantiene estable. El objetivo mayor es asegurar la calidad total: cumplir estándares internacionales, reducir errores, satisfacer al cliente y darle a la gerencia información para decidir a tiempo.',
    forWhat: 'En una empacadora de banano, si no se revisa el peso hasta que el contenedor está en el barco, se pierde dinero (exceso = regalar producto, faltante = reclamos millonarios). El control estadístico detecta desviaciones MIENTRAS ocurren, no al final.',
    technicalAspects: [
      'Variabilidad: ningún proceso produce resultados idénticos siempre (es imposible).',
      'Causa Común: variación normal y aceptable del proceso.',
      'Causa Especial: algo anormal que altera el proceso y debe corregirse (ej. báscula dañada).',
      'Subgrupo (n): muestras pequeñas tomadas periódicamente en lugar de medir toda la producción.',
      'Variables vs Atributos: variables = se miden con número (peso, temperatura) → gráficas X̄-R. Atributos = se cuentan (unidades buenas/malas) → gráfica p.',
    ],
    howItWorks: '4 pasos: (1) Recolectar datos de subgrupos, calcular promedio x̄ y rango R de cada muestra. (2) Construir la gráfica con tres líneas: Línea Central (LC=promedio), Límite Superior (LCS) y Límite Inferior (LCI). (3) Graficar los puntos e interpretar patrones: puntos fuera de límites=crisis, 7+ puntos en un lado=desplazamiento, 5+ puntos en tendencia=desgaste. (4) Evaluar índices de capacidad Cp y Cpk.',
    formulas: [
      {
        name: 'Media del Subgrupo',
        latex: '\\bar{x} = \\frac{\\sum x_i}{n}',
        variables: [{ symbol: 'n', desc: 'Tamaño del subgrupo (ej. 5 cajas por muestra)' }]
      },
      {
        name: 'Rango del Subgrupo',
        latex: 'R = x_{max} - x_{min}',
        variables: []
      },
      {
        name: 'Gran Media y Rango Promedio (Líneas Centrales)',
        latex: '\\bar{\\bar{x}} = \\frac{\\sum \\bar{x}_i}{k} \\qquad \\bar{R} = \\frac{\\sum R_i}{k}',
        variables: [{ symbol: 'k', desc: 'Número total de subgrupos analizados' }]
      },
      {
        name: 'Límites de Control - Gráfica de Medias (X̄)',
        latex: 'LCS_{\\bar{x}} = \\bar{\\bar{x}} + A_2 \\cdot \\bar{R} \\qquad LCI_{\\bar{x}} = \\bar{\\bar{x}} - A_2 \\cdot \\bar{R}',
        variables: [{ symbol: 'A_2', desc: 'Constante estadística según tamaño del subgrupo n (para n=5: A₂=0.577)' }]
      },
      {
        name: 'Límites de Control - Gráfica de Rangos (R)',
        latex: 'LCS_R = D_4 \\cdot \\bar{R} \\qquad LCI_R = D_3 \\cdot \\bar{R}',
        variables: [
          { symbol: 'D_4', desc: 'Para n=5: D₄=2.114' },
          { symbol: 'D_3', desc: 'Para n=5: D₃=0' },
        ]
      },
      {
        name: 'Índice de Capacidad del Proceso (Cp)',
        latex: 'C_p = \\frac{LSE - LIE}{6\\sigma} \\qquad (\\sigma = \\bar{R}/d_2)',
        variables: [
          { symbol: 'LSE, LIE', desc: 'Límites de Especificación del cliente (superior e inferior)' },
          { symbol: 'd_2', desc: 'Para n=5: d₂=2.326' },
        ]
      },
      {
        name: 'Índice de Capacidad Centrado (Cpk)',
        latex: 'C_{pk} = \\min\\left(\\frac{LSE - \\bar{\\bar{x}}}{3\\sigma},\\; \\frac{\\bar{\\bar{x}} - LIE}{3\\sigma}\\right)',
        variables: [{ symbol: 'C_{pk} \\geq 1.33', desc: 'El proceso es capaz y está centrado en la meta' }]
      }
    ],
    exercise: {
      title: 'Ejercicio 6: Control de Peso - Empacadora de Banano Matina',
      context: 'Una empacadora de banano en Matina necesita controlar el peso de las cajas para cumplir los estándares internacionales. Se toman 10 subgrupos de n=5 cajas cada hora.',
      data: {
        subgroupSize: 5,
        A2: 0.577,
        D4: 2.114,
        D3: 0,
        d2: 2.326,
        LSE: 20.5,
        LIE: 18.5,
        subgroups: [
          { id: 1, values: [19.2, 20.1, 19.8, 20.3, 19.6], mean: 19.80, range: 1.10 },
          { id: 2, values: [20.0, 19.5, 20.2, 19.9, 20.4], mean: 20.00, range: 0.90 },
          { id: 3, values: [19.7, 20.0, 19.4, 20.1, 19.8], mean: 19.80, range: 0.70 },
          { id: 4, values: [20.3, 20.1, 19.9, 20.5, 20.2], mean: 20.20, range: 0.60 },
          { id: 5, values: [19.5, 19.8, 20.0, 19.7, 19.6], mean: 19.72, range: 0.50 },
          { id: 6, values: [20.4, 20.2, 20.6, 20.3, 20.5], mean: 20.40, range: 0.40 },
          { id: 7, values: [19.9, 20.1, 20.0, 19.8, 20.2], mean: 20.00, range: 0.40 },
          { id: 8, values: [19.6, 19.8, 19.5, 19.7, 19.9], mean: 19.70, range: 0.40 },
          { id: 9, values: [20.2, 20.0, 20.3, 20.1, 20.4], mean: 20.20, range: 0.40 },
          { id: 10, values: [19.8, 20.0, 19.7, 19.9, 20.1], mean: 19.90, range: 0.40 },
        ],
        grandMean: 19.97,
        meanRange: 0.58,
        LCSx: 20.305,
        LCIx: 19.635,
        LCSR: 1.226,
        LCIR: 0,
        sigma: 0.249,
        Cp: 1.34,
        Cpk: 0.71,
      },
      steps: [
        {
          title: 'Paso 1: Calcular Promedio (x̄) y Rango (R) por Subgrupo',
          description: 'Para cada uno de los 10 subgrupos (n=5 cajas), calculamos la media aritmética para medir la tendencia central y el rango (valor máximo menos valor mínimo) para medir la dispersión.',
          detail: 'Cálculo Detallado:\n' +
                  '• Subgrupo 1: x̄ = (19.2 + 20.1 + 19.8 + 20.3 + 19.6)/5 = 19.80 kg\n' +
                  '  R = 20.3 (Máx) - 19.2 (Mín) = 1.10 kg\n' +
                  '• Subgrupo 2: x̄ = (20.0 + 19.5 + 20.2 + 19.9 + 20.4)/5 = 20.00 kg\n' +
                  '  R = 20.4 (Máx) - 19.5 (Mín) = 0.90 kg\n' +
                  '• Subgrupo 3: x̄ = (19.7 + 20.0 + 19.4 + 20.1 + 19.8)/5 = 19.80 kg\n' +
                  '  R = 20.1 (Máx) - 19.4 (Mín) = 0.70 kg\n' +
                  '• Subgrupo 6 (Peso más alto): x̄ = (20.4 + 20.2 + 20.6 + 20.3 + 20.5)/5 = 20.40 kg\n' +
                  '  R = 20.6 (Máx) - 20.2 (Mín) = 0.40 kg\n' +
                  '• Subgrupo 10: x̄ = (19.8 + 20.0 + 19.7 + 19.9 + 20.1)/5 = 19.90 kg\n' +
                  '  R = 20.1 (Máx) - 19.7 (Mín) = 0.40 kg',
          table: [
            ['Subgrupo', 'Valores de las Cajas (kg)', 'Promedio Subgrupo (x̄)', 'Rango Subgrupo (R)'],
            ['Subgrupo 1', '19.2, 20.1, 19.8, 20.3, 19.6', '19.80 kg', '1.10 kg'],
            ['Subgrupo 2', '20.0, 19.5, 20.2, 19.9, 20.4', '20.00 kg', '0.90 kg'],
            ['Subgrupo 3', '19.7, 20.0, 19.4, 20.1, 19.8', '19.80 kg', '0.70 kg'],
            ['Subgrupo 4', '20.3, 20.1, 19.9, 20.5, 20.2', '20.20 kg', '0.60 kg'],
            ['Subgrupo 5', '19.5, 19.8, 20.0, 19.7, 19.6', '19.72 kg', '0.50 kg'],
            ['Subgrupo 6', '20.4, 20.2, 20.6, 20.3, 20.5', '20.40 kg', '0.40 kg'],
            ['Subgrupo 7', '19.9, 20.1, 20.0, 19.8, 20.2', '20.00 kg', '0.40 kg'],
            ['Subgrupo 8', '19.6, 19.8, 19.5, 19.7, 19.9', '19.70 kg', '0.40 kg'],
            ['Subgrupo 9', '20.2, 20.0, 20.3, 20.1, 20.4', '20.20 kg', '0.40 kg'],
            ['Subgrupo 10', '19.8, 20.0, 19.7, 19.9, 20.1', '19.90 kg', '0.40 kg']
          ]
        },
        {
          title: 'Paso 2: Calcular la Gran Media (x̄̄) y el Rango Promedio (R̄)',
          description: 'Promediamos los 10 valores de promedio de subgrupos y de rangos para establecer las Líneas Centrales (LC) de los gráficos.',
          detail: 'Gran Media (Línea Central de Promedios):\n' +
                  'x̄̄ = (19.80 + 20.00 + 19.80 + 20.20 + 19.72 + 20.40 + 20.00 + 19.70 + 20.20 + 19.90) / 10 = 19.97 kg\n\n' +
                  'Rango Promedio (Línea Central de Rangos):\n' +
                  'R̄ = (1.10 + 0.90 + 0.70 + 0.60 + 0.50 + 0.40 + 0.40 + 0.40 + 0.40 + 0.40) / 10 = 0.58 kg',
          table: [
            ['Parámetro de Control', 'Fórmula de Cálculo', 'Valor Promedio Calculado'],
            ['Gran Media (x̄̄)', 'Suma de Medias / 10', '19.97 kg (Línea Central X̄)'],
            ['Rango Promedio (R̄)', 'Suma de Rangos / 10', '0.58 kg (Línea Central R)']
          ]
        },
        {
          title: 'Paso 3: Determinar Límites de Control (Medias y Rangos)',
          description: 'Calculamos los límites estadísticos de control utilizando las constantes para n=5 (donde A₂=0.577, D₄=2.114, D₃=0).',
          detail: '1. Gráfica de Medias (X̄):\n' +
                  'LCS_x̄ = x̄̄ + A₂ * R̄ = 19.97 + 0.577 * 0.58 = 20.305 kg\n' +
                  'LCI_x̄ = x̄̄ - A₂ * R̄ = 19.97 - 0.577 * 0.58 = 19.635 kg\n\n' +
                  '2. Gráfica de Rangos (R):\n' +
                  'LCS_R = D₄ * R̄ = 2.114 * 0.58 = 1.226 kg\n' +
                  'LCI_R = D₃ * R̄ = 0.000 * 0.58 = 0.000 kg',
          table: [
            ['Gráfica de Control', 'Límite Control Inferior (LCI)', 'Línea Central (LC)', 'Límite Control Superior (LCS)'],
            ['Medias (X̄)', '19.635 kg', '19.970 kg', '20.305 kg'],
            ['Rangos (R)', '0.000 kg', '0.580 kg', '1.226 kg']
          ]
        },
        {
          title: 'Paso 4: Construir Gráfico y Evaluar Estabilidad del Proceso',
          description: 'Graficamos cronológicamente los puntos y evaluamos si existen anomalías o desviaciones fuera de los límites calculados.',
          detail: 'Evaluación Visual e Interpretación:\n' +
                  '• Límites Medias X̄: Todas las medias de los subgrupos están entre 19.635 kg y 20.305 kg. Ningún punto sale de los límites.\n' +
                  '• Límites Rangos R: Todos los rangos están por debajo del límite superior de 1.226 kg. La dispersión del proceso es aceptable.\n' +
                  '• Reglas de Estabilidad: No hay rachas de 7 puntos consecutivos a un solo lado, ni tendencias claras de desgaste en herramientas.\n' +
                  'Conclusión: El proceso está bajo Control Estadístico (estable).',
        },
        {
          title: 'Paso 5: Analizar Índices de Capacidad (Cp y Cpk)',
          description: 'Comparamos la variabilidad natural del proceso con los límites de especificación requeridos por el cliente (LIE=18.5 kg, LSE=20.5 kg).',
          detail: 'Desviación estándar estimada (σ):\n' +
                  'σ = R̄ / d₂ = 0.58 / 2.326 = 0.249 kg\n\n' +
                  'Índice de Capacidad Potencial (Cp):\n' +
                  'Cp = (LSE - LIE) / (6 * σ) = (20.5 - 18.5) / (6 * 0.249) = 1.34\n' +
                  'Interpretación: Cp = 1.34 (≥ 1.33). El proceso es potencialmente capaz de cumplir.\n\n' +
                  'Índice de Capacidad Real (Cpk):\n' +
                  'Cpk = mín[ (LSE - x̄̄) / (3 * σ), (x̄̄ - LIE) / (3 * σ) ]\n' +
                  'Cpk = mín[ (20.5 - 19.97) / (3 * 0.249), (19.97 - 18.5) / (3 * 0.249) ]\n' +
                  'Cpk = mín[ 0.53 / 0.747, 1.47 / 0.747 ] = mín[ 0.71, 1.97 ] = 0.71\n' +
                  'Interpretación: Como Cpk = 0.71 (< 1.00), el proceso no es capaz de cumplir en la práctica. Hay un grave problema de descentramiento hacia el límite superior; se producen cajas demasiado pesadas que regalan producto.',
          table: [
            ['Indicador Capacidad', 'Fórmula de Cálculo', 'Valor Obtenido', 'Mínimo Aceptable', 'Estado Gerencial'],
            ['Índice Cp', '(LSE - LIE) / 6σ', '1.34', '≥ 1.33', 'Potencialmente Capaz ✓'],
            ['Índice Cpk', 'mín[ (LSE-x̄̄)/3σ, (x̄̄-LIE)/3σ ]', '0.71', '≥ 1.33', 'Fuera de Especificación / Descentrado ⚠']
          ]
        }
      ],
      result: 'Proceso estable pero DESCENTRADO. Cp=1.34 (capaz) | Cpk=0.71 (incapaz) → Ajustar la media del proceso hacia el centro nominal (19.5 kg).',
    }
  }
];

export default methodsData;
