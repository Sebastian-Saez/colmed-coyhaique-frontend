import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    profile: JSON.parse(localStorage.getItem("userProfile")) || null,
    token: localStorage.getItem("authToken") || null, // Inicializar el token desde el localStorage
    refresh: localStorage.getItem("refreshToken") || null, // Inicializar el token desde el localStorage
  }),
  actions: {
    async fetchProfile(email, password) {
      // Limpiar el token antes de iniciar sesión
      this.token = null;
      this.refresh = null;
      localStorage.removeItem("authToken");
      try {
        const response = await api.post("/api/colmed/login/", {
          email,
          password,
        });
        // Guardar el token en el estado y en el localStorage
        this.token = response.data.access;
        localStorage.setItem("authToken", this.token);

        this.refresh = response.data.refresh;
        localStorage.setItem("refreshToken", this.refresh);

        this.profile = response.data.user;
        localStorage.setItem("userProfile", JSON.stringify(this.profile));
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    },
    async loginWithGoogle() {
      window.location.href = `${process.env.VUE_APP_BACKEND_URL}/accounts/google/login/`;
    },
    logout() {
      // Eliminar token y perfil
      this.token = null;
      this.profile = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userProfile");
    },
  },
});
