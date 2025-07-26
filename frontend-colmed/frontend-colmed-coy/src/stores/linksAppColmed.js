import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useLinkAppColmedStore = defineStore("linkColmed", {
  state: () => ({
    android: null,
    apple: null,    
    loading_apple: null,
    loading_android: null,
    error: null,
  }),
  actions: {
    async fetchLinkApple() {
      this.loading_apple = true;
      try {
        const response = await api.get("/api/colmed/links_app/link_apple/");
        this.apple = response.data;
        this.loading_apple = false;
      } catch (error) {
        console.error("Error al cargar link de aplicación para Apple");
        this.error =
          "No se pudo cargar link de aplicación para Apple. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading_apple = false;
      }
    },
    async fetchLinkAndroid() {
      this.loading_android = true;
      try {
        const response = await api.get("/api/colmed/links_app/link_android/");
        this.android = response.data;
        this.loading_android = false;
      } catch (error) {
        console.error("Error al cargar link de aplicación para Android");
        this.error =
          "No se pudo cargar link de aplicación para Android. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading_android = false;
      }
    },
},
});