import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist');
const cachePath = path.resolve('node_modules/.cache/gh-pages');
const srcDocsPath = path.resolve('Documentacion PDF');
const destDocsPath = path.resolve('public/docs');

console.log('🧹 Limpiando caché y carpetas temporales...');
if (fs.existsSync(cachePath)) {
  fs.rmSync(cachePath, { recursive: true, force: true });
}

// Copiar automáticamente los PDF a public/docs antes del build
console.log('📂 Transfiriendo archivos PDF a la carpeta pública de distribución...');
if (fs.existsSync(srcDocsPath)) {
  if (!fs.existsSync(destDocsPath)) {
    fs.mkdirSync(destDocsPath, { recursive: true });
  }
  
  const files = fs.readdirSync(srcDocsPath);
  files.forEach(file => {
    if (file.toLowerCase().endsWith('.pdf')) {
      const srcFile = path.join(srcDocsPath, file);
      const destFile = path.join(destDocsPath, file);
      fs.copyFileSync(srcFile, destFile);
      console.log(`   ✓ Copiado: ${file}`);
    }
  });
} else {
  console.warn('⚠️ Advertencia: No se encontró la carpeta "Documentacion PDF" en la raíz del proyecto.');
}

// 1. Ejecutar compilación
console.log('📦 Compilando aplicación...');
execSync('npm run build', { stdio: 'inherit' });

// 2. Entrar a dist y hacer el deploy manual con Git nativo
console.log('🚀 Iniciando despliegue en rama gh-pages...');
try {
  // Limpiar cualquier residuo de git anterior dentro de dist
  const distGit = path.join(distPath, '.git');
  if (fs.existsSync(distGit)) {
    fs.rmSync(distGit, { recursive: true, force: true });
  }

  // Comandos de Git nativo ignorando variables GIT_DIR de entorno heredadas
  const gitOpts = { 
    cwd: distPath, 
    stdio: 'inherit',
    env: {
      ...process.env,
      GIT_DIR: undefined,
      GIT_WORK_TREE: undefined
    }
  };

  execSync('git init', gitOpts);
  execSync('git add -A', gitOpts);
  execSync('git commit -m "Deploy to GitHub Pages"', { ...gitOpts, stdio: 'ignore' });
  
  // Agregar tu remoto de GitHub de forma segura
  execSync('git remote add origin https://github.com/LuisHCode/Portafolio-Cuantitativos-Jose-Lopez-C34360.git', gitOpts);
  
  // Subida forzada a la rama gh-pages
  console.log('📤 Subiendo archivos a GitHub...');
  execSync('git push -f origin master:gh-pages', gitOpts);
  
  console.log('✅ ¡Despliegue completado con éxito!');
} catch (error) {
  console.error('❌ Error durante el despliegue:', error.message);
  process.exit(1);
}
