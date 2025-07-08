import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useLinksInteresStore = defineStore("interes", {
  state: () => ({
    links_interes: null,
    links_publicos: null,
    links_privados: null,
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
    async fetchLinksInteresPublicos() {
      this.loading = true;
      try {
        const response = await api.get("/api/colmed/links/links_publicos/");
        this.links_publicos = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error al cargar los links de interés públicos");
        this.error =
          "No se pudo cargar los links de interés. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading = false;
      }
    },
    async fetchLinksInteresPrivados() {
      this.loading = true;
      try {
        const response = await api.get("/api/colmed/links/links_privados/");
        this.links_privados = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error al cargar los links de interés privados");
        this.error =
          "No se pudo cargar los links de interés. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading = false;
      }
    },
    async saveLinksInteres(links) {
      this.loading = true;
      try{
        await api.post("/api/toolbar/toolbar-create-update/links_web/", links);
      }catch (error){
        console.error("Error al guardar links");
      }finally {
        this.fetchLinksInteresPublicos();
        this.fetchLinksInteresPrivados();
        this.loading = false;
      }

    }
},
});