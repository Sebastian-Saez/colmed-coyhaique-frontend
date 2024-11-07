import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useServicioStore = defineStore("servicio", {
  state: () => ({
    servicios: [],
    pagina_servicio: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchServicios() {
      // Limpiar el token antes de iniciar sesión
      this.loading = false;
      try {
        const response = await api.get("/api/servicios/servicios/");
        // Guardar el token en el estado y en el localStorage
        this.servicios = response.data;
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      } finally {
        this.loading = true;
      }
    },
    async setCategoriaServicio(categoria) {
      console.log("Categoria ", categoria);
      this.loading = false;
      this.pagina_servicio = categoria;
      this.loading = true;
    },
  },
});
