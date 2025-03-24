// src/boot/firebase.js

export let notificationsGranted = false;

// Este helper detecta si estamos en una app nativa con Capacitor
function isCapacitorNative () {
  return !!(window?.Capacitor?.isNativePlatform);
}

// Lógica para solicitar permisos de notificaciones
async function requestNotificationPermission () {
  try {
    // Import dinámico de PushNotifications solo si estamos en Capacitor
    const { PushNotifications } = await import('@capacitor/push-notifications');

    const permissionResult = await PushNotifications.requestPermissions();
    if (permissionResult.receive === 'granted') {
      console.log("Permiso de notificaciones concedido");
      notificationsGranted = true;
    } else {
      console.warn("Permiso de notificaciones denegado");
      notificationsGranted = false;
    }
  } catch (error) {
    console.error("Error al solicitar permisos de notificaciones:", error);
    notificationsGranted = false;
  }
}

async function updateNotificationPermission() {
  try {
    const { PushNotifications } = await import('@capacitor/push-notifications');
    const permissions = await PushNotifications.checkPermissions();

    if (permissions.receive === 'granted') {
      notificationsGranted = true;
      console.log("Permiso de notificaciones activado (updateNotificationPermission)");
    } else {
      notificationsGranted = false;
      console.warn("Permiso de notificaciones sigue denegado (updateNotificationPermission)");
    }
  } catch (error) {
    console.error("Error al verificar permisos:", error);
    notificationsGranted = false;
  }
}

// Función para inicializar listeners cuando estamos en Capacitor
async function initCapacitorListeners() {
  // Import dinámico de App
  const { App } = await import('@capacitor/app');

  // Escuchar cuando la app pasa a primer plano
  App.addListener('appStateChange', (state) => {
    if (state.isActive) {
      console.log("La app ha vuelto a primer plano, verificando permisos...");
      updateNotificationPermission();
    }
  });
}

// ---- EJECUCIÓN ----
if (isCapacitorNative()) {
  // Solo en entorno nativo Capacitor
  requestNotificationPermission();
  initCapacitorListeners();
} else {
  console.log("Entorno web: No se requiere Capacitor");
  notificationsGranted = false;
}

// Puedes exportar updateNotificationPermission si lo usas en otros lugares
export { updateNotificationPermission };



// import { PushNotifications } from '@capacitor/push-notifications';
// import { App } from '@capacitor/app';


// export let notificationsGranted = false;

// const requestNotificationPermission = async () => {
//   try {
//     // Solicita permisos
//     const permissionResult = await PushNotifications.requestPermissions();
//     if (permissionResult.receive === 'granted') {
//       console.log("Permiso de notificaciones concedido");
//       notificationsGranted = true;
      
//     } else {
//       console.warn("Permiso de notificaciones denegado");
//       notificationsGranted = false;
//     }
//   } catch (error) {
//     console.error("Error al solicitar permisos de notificaciones:", error);
//     notificationsGranted = false;
//   }
// };

// requestNotificationPermission();


// // Función para actualizar el estado de permisos
// export async function updateNotificationPermission() {
//   try {
//     const permissions = await PushNotifications.checkPermissions();
//     if (permissions.receive === 'granted') {
//       notificationsGranted = true;
//       console.log("Permiso de notificaciones activado (updateNotificationPermission)");
//     } else {
//       notificationsGranted = false;
//       console.warn("Permiso de notificaciones sigue denegado (updateNotificationPermission)");
//     }
//   } catch (error) {
//     console.error("Error al verificar permisos:", error);
//     notificationsGranted = false;
//   }
// }

// // Escuchar cuando la app cambia su estado (por ejemplo, cuando vuelve a primer plano)
// App.addListener('appStateChange', (state) => {
//   if (state.isActive) {
//     console.log("La app ha vuelto a primer plano, verificando permisos...");
//     updateNotificationPermission();
//   }
// });