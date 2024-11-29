import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useEventosStore = defineStore("evento", {
  state: () => ({
    eventos: [],
    pagina_informaciones: null,
    loading: false,
    loading_base: false,
    loading_destacadas: false,
    eventos_destacadas: null,
    todas_eventos: null,
    eventos_base: null,
    error: null,
    error_base: null,
    error_destacadas: null,
  }),
  actions: {
    async fetchInformaciones() {
      this.loading = false;
      try {
        const response = await api.get("/api/noticias/informaciones/");
        this.informaciones = response.data;
      } catch (error) {
        console.error("Error al cargar los informaciones:");
        this.error = error;
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
        console.error("Error al cargar las noticias destacadas:");
        this.error_destacadas =
          "No se pudo cargar las informaciones. Por favor, intenta de nuevo más tarde.";
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
        console.error("Error al cargar las noticias base:");
        this.error_base =
          "No se pudo cargar las noticias. Por favor, intenta de nuevo más tarde.";
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
        console.error("Error al cargar todas las noticias activas:");
        this.error =
          "No se pudo cargar las noticias. Por favor, intenta de nuevo más tarde.";
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
