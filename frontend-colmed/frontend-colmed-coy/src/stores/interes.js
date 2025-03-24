import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useLinksInteresStore = defineStore("interes", {
  state: () => ({
    links_interes: null,
    loading: null,
    error: null,
  }),
  actions: {
    async fetchLinksInteres() {
      this.loading = true;
      try {
        const response = await api.get("/api/colmed/links/todos_links/");
        this.links_interes = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error al cargar los links de interés");
        this.error =
          "No se pudo cargar los links de interés. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading = false;
      }
    },
},
});