import type { CapacitorConfig } from '@capacitor/cli';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();


const config: CapacitorConfig = {
  appId: 'org.colmed.aysen.app',
  appName: 'ColmedAysén',
  webDir: 'www',
  ios: {
    // Esta es la sección para iOS en capacitor.config.json/ts
    // bundleIdentifier: "com.colmed.aysen.app" // Define aquí el Bundle ID para iOS
  },
  server: {
    hostname: 'app.colmedaysen.cl',    
    androidScheme: 'https',
    iosScheme: 'https'
  //   url: "http://192.168.1.23:8080",
  //   cleartext: true
  // }
  }
};

export default config;
