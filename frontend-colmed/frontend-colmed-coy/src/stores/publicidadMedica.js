import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const usePublicidadStore = defineStore("publicidadMedica", {
  state: () => ({
    publicidades: [],
    pagina_informaciones: null,
    loading: false,
    loading_base: false,
    loading_destacadas: false,
    eventos_destacadas: null,
    todas_publicidades: null,
    publicidades_base: null,
    error: null,
    error_base: null,
    error_destacadas: null,
    //opciones para editar o crear un evento
    editar_publicidad: false,
    crear_publicidad: false,
    publicidad_medica: null,
    evento_app: null,
  }),
  actions: {
    async fetchPublicidadesBase() {
      this.loading_base = false;
      try {
        const response = await api.get(
          "/api/colmed/publicidades/publicidades_base/"
        );
        this.publicidades_base = response.data;
      } catch (error) {
        console.error("Error al cargar las publicidades base:");
        this.error_base =
          "No se pudo cargar las publicidades. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading_base = true;
      }
    },
    async fetchTodasPublicidades() {
      this.loading = false;
      try {
        const response = await api.get(
          "/api/colmed/publicidades/todas_publicidades/"
        );
        this.publicidades = response.data;
      } catch (error) {
        console.error("Error al cargar todas las publicidades activas:");
        this.error =
          "No se pudo cargar las publicidades. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading = true;
      }
    },
    async setModificarPublicidad(publicidad_medica) {
      this.loading = false;
      this.editar_publicidad = true;
      this.publicidad_medica = publicidad_medica;
      this.loading = true;
    },
    async setPublicidad(publicidad_medica) {
      this.loading = false;
      this.publicidad_medica = publicidad_medica;
      this.loading = true;
    },
    limpiarPublicidad() {
      this.editar_publicidad = false;
      this.crear_publicidad = false;
      this.publicidad_medica = null;
    },
    async setCrearPublicidadMedica() {
      this.loading = false;
      this.crear_publicidad = publicidad_medica;
      this.loading = true;
    },
    async postPublicidadMedica(publicidad_medica) {
      this.loading = false;
      try {
        const response = await api.post(
          "/api/colmed/publicidad-create-update/",
          publicidad_medica
        );
        this.fetchTodasPublicidades();
      } catch (error) {
        console.error("Error al cargar todos las publicidad_medica");
        this.error =
          "No se pudo cargar las publicidad_medicas. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading = true;
      }
    },
  },
});
