import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useMedicoStore = defineStore("medico", {
  state: () => ({
    medicos: [],
    cuotas: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMedicos() {
      // Limpiar el token antes de iniciar sesión
      this.loading = false;
      try {
        const response = await api.get("/api/medicos/medicos/");
        // Guardar el token en el estado y en el localStorage
        this.medicos = response.data;
      } catch (error) {
        console.error("Error al cargar los médicos:", error);
      } finally {
        this.loading = true;
      }
    },
  },
});
