import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useInformacionesStore = defineStore("informacion", {
  state: () => ({
    informaciones: [],
    pagina_informaciones: null,
    loading: false,
    loading_base: false,
    loading_destacadas: false,
    noticias_destacadas: null,
    todas_noticias: null,
    noticias_base: null,
    error: null,
  }),
  actions: {
    async fetchInformaciones() {
      this.loading = false;
      try {
        const response = await api.get("/api/noticias/informaciones/");
        this.informaciones = response.data;
      } catch (error) {
        console.error("Error al cargar los informaciones:", error);
      } finally {
        this.loading = true;
      }
    },
    async fetchNoticiasDestacadas() {
      this.loading_destacadas = false;
      try {
        const response = await api.get(
          "/api/noticias/noticias/noticias_destacadas/"
        );
        this.noticias_destacadas = response.data;
      } catch (error) {
        console.error("Error al cargar las noticias destacadas:", error);
      } finally {
        this.loading_destacadas = true;
      }
    },
    async fetchNoticiasBase() {
      this.loading_base = false;
      try {
        const response = await api.get("/api/noticias/noticias/noticias_base/");
        this.noticias_base = response.data;
      } catch (error) {
        console.error("Error al cargar las noticias base:", error);
      } finally {
        this.loading_base = true;
      }
    },
    async fetchTodasNoticias() {
      this.loading = false;
      try {
        const response = await api.get(
          "/api/noticias/noticias/todas_noticias/"
        );
        this.todas_noticias = response.data;
      } catch (error) {
        console.error("Error al cargar todas las noticias activas:", error);
      } finally {
        this.loading = true;
      }
    },
    async setCategoriaInformacion(categoria) {
      this.loading = false;
      this.pagina_informaciones = categoria;
      this.loading = true;
    },
  },
});
