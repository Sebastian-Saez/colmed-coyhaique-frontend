import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    // profile: JSON.parse(localStorage.getItem("userProfile")) || null,
    profiles: JSON.parse(localStorage.getItem("userProfiles")) || [],
    token: null, // Inicializar el token desde el localStorage
    opcion_profile: localStorage.getItem("optionProfile") || null, // Inicializar el token desde el localStorage
    user: JSON.parse(localStorage.getItem("user")) || null, // Inicializar el user desde el localStorage
    refresh: null, // Inicializar el token desde el localStorage
    loading: false,
  }),
  actions: {
    async fetchProfile(email, password) {
      // Limpiar el token antes de iniciar sesión
      this.loading = true;
      this.token = null;
      this.refresh = null;
      this.profiles = [];
      this.user = null;
      this.opcion_profile = null;

      localStorage.removeItem("authToken");
      try {
        const response = await api.post("/api/colmed/login/", {
          email,
          password,
        });
        // Guardar el token en el estado y en el localStorage
        this.token = response.data.access;
        localStorage.setItem("authToken", this.token);

        this.user = response.data.user;
        localStorage.setItem("user", JSON.stringify(this.user));

        this.refresh = response.data.refresh;
        localStorage.setItem("refreshToken", this.refresh);

        // Guardar los perfiles en el estado y en el localStorage
        this.profiles = response.data.user.perfiles;
        localStorage.setItem("userProfiles", JSON.stringify(this.profiles));

        this.opcion_profile = this.profiles[0].tipo_perfil;
        localStorage.setItem("optionProfile", this.opcion_profile);
        this.loading = false;
        // localStorage.setItem("userProfile", JSON.stringify(this.profile));
      } catch (error) {
        // console.error("Error fetching profile:", error);
        this.loading = false;
        throw error;
      }
    },
    async loginWithGoogle(id_token) {
      // Limpiar el token antes de iniciar sesión
      this.loading = true;
      this.token = null;
      this.refresh = null;
      this.profiles = [];
      this.user = null;
      this.opcion_profile = null;
      try {
        const response = await api.post("/api/auth/google/", {
          id_token: id_token,
        });

        // Guardar el token en el estado y en el localStorage
        // this.token = response.data.access;
        // localStorage.setItem("authToken", this.token);

        this.user = response.data.user;
        localStorage.setItem("user", JSON.stringify(this.user));

        // this.refresh = response.data.refresh;
        // localStorage.setItem("refreshToken", this.refresh);

        // Guardar los perfiles en el estado y en el localStorage
        this.profiles = response.data.user.perfiles;
        localStorage.setItem("userProfiles", JSON.stringify(this.profiles));

        this.opcion_profile = this.profiles[0].tipo_perfil;
        localStorage.setItem("optionProfile", this.opcion_profile);
        this.loading = false;
      } catch (error) {
        console.error("Error en login con Google:", error);
        this.loading = false;
        throw error;
      }
    },
    async logout() {
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) return;

        await api.post("/api/auth/logout/", { refresh_token: refreshToken });

        // Limpiar almacenamiento local
        this.token = null;
        this.refresh = null;
        this.user = null;
        this.profiles = [];
        this.opcion_profile = null;

        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        localStorage.removeItem("userProfiles");
        localStorage.removeItem("optionProfile");

        // Redirigir a login
        this.router.push("/home");
      } catch (error) {
        console.error("Error en logout:", error);
      }
    },
    changeProfile(profile) {
      this.loading = true;
      this.opcion_profile = profile;
      this.loading = false;
    },
    async updatePassword(email, oldPassword, newPassword) {
      this.loading = true;
      try {
        // Configurar el encabezado de autorización si es necesario
        const headers = {};
        if (this.token) {
          headers.Authorization = `Bearer ${this.token}`;
        }

        // Realizar la solicitud al backend para actualizar la contraseña
        const response = await api.post(
          "/api/colmed/update-password/",
          {
            email,
            old_password: oldPassword,
            new_password: newPassword,
          },
          { headers }
        );

        // Actualizar el perfil y el token si es necesario
        // Aquí asumimos que el backend devuelve un nuevo token y perfil
        if (response.data.access) {
          this.token = response.data.access;
          localStorage.setItem("authToken", this.token);
        }

        if (response.data.refresh) {
          this.refresh = response.data.refresh;
          localStorage.setItem("refreshToken", this.refresh);
        }

        if (response.data.user) {
          this.profile = response.data.user;
          localStorage.setItem("userProfile", JSON.stringify(this.profile));
        }
        this.loading = false;
        return response.data;
      } catch (error) {
        // Manejo de errores
        this.loading = false;
        throw error;
      }
    },
  },
});
