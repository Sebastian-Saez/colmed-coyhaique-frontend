import type { CapacitorConfig } from '@capacitor/cli';
// import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
// dotenv.config();


// LOGS PARA DEBUG EN APPFLOW
console.log('[CAPACITOR_CONFIG_TS] Inicio de capacitor.config.ts');
const rawBuildFlags = process.env.IOS_BUILD_FLAGS;
console.log(`[CAPACITOR_CONFIG_TS] Valor RAW de process.env.IOS_BUILD_FLAGS: "${rawBuildFlags}"`);

const buildFlagsArray = (rawBuildFlags || '').split(' ');
console.log('[CAPACITOR_CONFIG_TS] Array buildFlag procesado:', buildFlagsArray);
// FIN DE LOGS PARA DEBUG

const config: CapacitorConfig = {
  appId: 'org.colmed.aysen.app',
  appName: 'ColmedAysén',
  webDir: 'www',
  ios: {
    buildFlag: (process.env.IOS_BUILD_FLAGS || '').split(' ')
  },
  // server: {
  //   hostname: 'app.colmedaysen.cl',    
  //   androidScheme: 'https',
  //   iosScheme: 'https'
  // }
};

export default config;
