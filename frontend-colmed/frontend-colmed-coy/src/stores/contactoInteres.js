import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useContactoStore = defineStore("contacto", {
  state: () => ({
    contactos_publicos: null,
    contactos_privados: null,
    todos_contactos: null,
    contacto_soporte: null,
    loading_publicos: null,
    loading_privados: null,
    loading: null,
    error: null,
  }),
  actions: {
    async fetchContactoSoporte() {
      this.loading = true;
      try {
        const response = await api.get("/api/colmed/contactos/contacto_soporte/");
        this.contacto_soporte = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error al cargar los Contactos de soporte");
        this.error =
          "No se pudo cargar los links de Contactos. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading = false;
      }
    },
    async fetchContactosPublicos() {
      this.loading_publicos = true;
      try {
        const response = await api.get("/api/colmed/contactos/contactos_publicos/");
        this.contactos_publicos = response.data;
        this.loading_publicos = false;
      } catch (error) {
        console.error("Error al cargar los Contactos de interés");
        this.error =
          "No se pudo cargar los links de Contactos. Por favor, intenta de nuevo más tarde.";
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
        console.error("Error al cargar los Contactos de interés");
        this.error =
          "No se pudo cargar los links de Contactos. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading_privados = false;
      }
    },
    async fetchContactos() {      
      this.loading = true;
      try {
        const response = await api.get("/api/colmed/contactos/todos_los_contactos/");
        this.todos_contactos = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error al cargar los Contactos de interés");
        this.error =
          "No se pudo cargar los Contactos de interés. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading = false;
      }
    },
    async saveContactosInteres(contactos) {
      this.loading = true;
      try{
        await api.post("/api/toolbar/toolbar-create-update/contactos/", contactos);
      }catch (error){
        console.error("Error al guardar los contactos");
      }finally {
        this.fetchContactos();
        this.loading = false;
      }

    }
},
});