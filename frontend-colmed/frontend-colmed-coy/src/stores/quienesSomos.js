import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useSomosStore = defineStore("somos", {
  state: () => ({
    mision_vision: null,
    normativa: null,
    directiva: false,
    transparencia: false,
    pagina_quienes_somos: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchDirectiva() {
      // Limpiar el token antes de iniciar sesión
      this.loading = false;
      try {
        const response = await api.get("/api/medicos/directiva/");
        // Guardar el token en el estado y en el localStorage
        this.directiva = response.data;
      } catch (error) {
        console.error("Error al cargar la Directiva:", error);
      } finally {
        this.loading = true;
      }
    },
    async setCategoriaSomos(categoria) {
      this.loading = false;
      this.pagina_quienes_somos = categoria;
      this.loading = true;
    },
  },
});
