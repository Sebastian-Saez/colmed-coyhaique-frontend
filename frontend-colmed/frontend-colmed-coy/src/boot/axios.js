import { boot } from "quasar/wrappers";
import axios from "axios";
import { useRouter } from "vue-router";
// Importar el router globalmente

// Crear una instancia de Axios con la URL base desde las variables de entorno
const api = axios.create({
  baseURL: process.env.VITE_APP_BACKEND_URL, // Usar la variable de entorno para la base URL
  //baseURL: "http://localhost:8001/",
  withCredentials: true, // ¡importante!
});

// Interceptor para incluir el token en cada solicitud si está presente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Recuperar el token de acceso del localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar la expiración de tokens y el refresco automático
api.interceptors.response.use(
  (response) => response, // Retornar la respuesta si es exitosa
  async (error) => {
    const originalRequest = error.config; // Guardar la solicitud original
    // const router = useRouter(); // Obtener el router para redirigir en caso necesario

    // Si el error es 401 y el token no es válido, intentar refrescar el token
    if (error.response) {
      if (error.response.status === 401) {
        if (
          error.response.data.detail ==
          "User not authorized or not registered in the system"
        ) {
          console.error("Usuario no registrado en el sistema...");
          return Promise.reject(error.response.data.detail);
        }

        originalRequest._retry = true;
        try {
          // Llamada al endpoint de refresh (usa cookies, no parámetros)
          await api.post("/api/token/refresh/");
          // Si fue exitoso, el backend setea la nueva cookie access_token
          // Reintentamos la petición original
          return api(originalRequest);
        } catch (err) {
          console.error("Error al refrescar el token:", err);
          // Si falla, redirigir a login o hacer logout
          // router.push("/login");
          router.push("/login");
        }
      }
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      // Algo ocurrió al configurar la solicitud
      console.error("Error al configurar la solicitud:", error.message);
    }

    // Rechazar la promesa si no se puede refrescar el token o si hay otro tipo de error
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // Hacer que Axios y la instancia configurada estén disponibles globalmente
  app.config.globalProperties.$axios = axios; // Si se requiere acceder a la instancia de Axios sin configuración
  app.config.globalProperties.$api = api; // Acceder a la instancia configurada con $api en componentes Vue
});

export { api };
