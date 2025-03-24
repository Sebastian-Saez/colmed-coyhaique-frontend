import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useContactoStore = defineStore("contacto", {
  state: () => ({
    contactos_publicos: null,
    contactos_privados: null,
    loading_publicos: null,
    loading_privados: null,
    error: null,
  }),
  actions: {
    async fetchContactosPublicos() {
      this.loading_publicos = true;
      try {
        const response = await api.get("/api/colmed/contactos/contactos_publicos/");
        this.contactos_publicos = response.data;
        this.loading_publicos = false;
      } catch (error) {
        console.error("Error al cargar los links de interés");
        this.error =
          "No se pudo cargar los links de interés. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading_publicos = false;
      }
    },
    async fetchContactosPrivados() {
      this.loading_privados = true;
      try {
        const response = await api.get("/api/colmed/contactos/contactos_privados/");
        this.contactos_privados = response.data;
        this.loading_privados = false;
      } catch (error) {
        console.error("Error al cargar los links de interés");
        this.error =
          "No se pudo cargar los links de interés. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading_privados = false;
      }
    },
},
});