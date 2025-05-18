const fs = require('fs');
const path = require('path');

// __dirname en este script apunta a la carpeta 'src-capacitor/scripts'
const scriptsDir = __dirname;

console.log('📦 Ejecutando script de copia de GoogleService-Info.plist...');
console.log('Script directory:', scriptsDir);

// Calcular la ruta a la raíz del proyecto Quasar (dos niveles arriba de 'src-capacitor/scripts')
// scriptsDir -> '.../src-capacitor/scripts'
// path.resolve(scriptsDir, '..') -> '.../src-capacitor/'
// path.resolve(scriptsDir, '..', '..') -> '.../frontend-colmed-coy/' (La raíz del proyecto Quasar)
const projectRoot = path.resolve(scriptsDir, '..', '..');
console.log('Project root:', projectRoot);


// Ruta fuente del archivo plist dentro de src-capacitor/config/
// Calculada a partir de la raíz del proyecto Quasar
const srcPath = path.resolve(projectRoot, 'src-capacitor', 'config', 'GoogleService-Info.plist');

// Ruta de destino dentro del proyecto iOS generado por Capacitor
// Calculada a partir de la raíz del proyecto Quasar
const destPath = path.resolve(projectRoot, 'src-capacitor', 'ios', 'App', 'App', 'GoogleService-Info.plist');

console.log('Source path:', srcPath);
console.log('Destination path:', destPath);


// Verificar si el archivo fuente existe
if (!fs.existsSync(srcPath)) {
    console.error('❌ Error: El archivo GoogleService-Info.plist no se encontró en la ruta esperada:', srcPath);
    process.exit(1); // Salir con un código de error para que el build falle
}

try {
  // Asegurar que el directorio de destino exista (src-capacitor/ios/App/App/)
    const destDir = path.dirname(destPath);

  // Comprobamos si el directorio de destino existe antes de intentar crearlo
    if (!fs.existsSync(destDir)) {
        console.log('📁 Directorio de destino no encontrado, creando:', destDir);
        fs.mkdirSync(destDir, { recursive: true });
    } else {
        console.log('📁 Directorio de destino ya existe:', destDir);
    }

    // Copiar el archivo
    fs.copyFileSync(srcPath, destPath);
    console.log('✅ GoogleService-Info.plist copiado correctamente a:', destPath);
} catch (err) {
    console.error('❌ Error al copiar GoogleService-Info.plist:', err.message);
    process.exit(1); // Salir con un código de error
}