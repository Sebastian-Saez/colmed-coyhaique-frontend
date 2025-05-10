import type { CapacitorConfig } from '@capacitor/cli';
// import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
// dotenv.config();

const config: CapacitorConfig = {
  appId: 'org.colmed.aysen.app',
  appName: 'ColmedAysén',
  webDir: 'www',
  ios: {
    // buildFlags: (process.env.IOS_BUILD_FLAGS || '').split(' ')
  },
  // server: {
  //   hostname: 'app.colmedaysen.cl',    
  //   androidScheme: 'https',
  //   iosScheme: 'https'
  // }
};

export default config;
