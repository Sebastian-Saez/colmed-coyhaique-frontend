import { boot } from "quasar/wrappers";
import axios from "axios";
import { useRouter } from "vue-router";

// Crear una instancia de Axios con la URL base desde las variables de entorno
const api = axios.create({
  baseURL: process.env.VITE_APP_BACKEND_URL, // Usar la variable de entorno para la base URL
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
    const router = useRouter(); // Obtener el router para redirigir en caso necesario

    // Si el error es 401 y el token no es válido, intentar refrescar el token
    if (error.response) {
      if (
        error.response.status === 401 &&
        error.response.data.code === "token_not_valid"
      ) {
        const refreshToken = localStorage.getItem("refreshToken"); // Recuperar el refresh token

        // Si hay un refresh token guardado, intentar refrescar el token de acceso
        if (refreshToken) {
          try {
            // Hacer una solicitud para refrescar el token de acceso
            const response = await api.post("/api/colmed/token/refresh/", {
              refresh: refreshToken,
            });

            // Guardar el nuevo token de acceso en el localStorage
            const newAccessToken = response.data.access;
            localStorage.setItem("authToken", newAccessToken);

            // Actualizar el token en la cabecera de la solicitud original
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // Reintentar la solicitud original con el nuevo token
            return api(originalRequest);
          } catch (err) {
            console.error("Error al refrescar el token:", err);
            // Si falla el refresco, eliminar los tokens y redirigir a login
            localStorage.removeItem("authToken");
            localStorage.removeItem("refreshToken");
            router.push("/login");
          }
        } else {
          // Si no hay refresh token, redirigir a la página de login
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
