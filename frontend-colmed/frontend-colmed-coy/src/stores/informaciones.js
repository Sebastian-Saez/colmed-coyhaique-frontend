import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useInformacionesStore = defineStore("informacion", {
  state: () => ({
    informaciones: [],
    pagina_informaciones: null,
    loading: false,
    loading_base: false,
    loading_eventos_base: false,
    loading_destacadas: false,
    noticias_destacadas: null,
    todas_noticias: null,
    noticias_base: null,
    eventos_base: null,
    eventos_eventos_base: null,
    error: null,
    error_base: null,
    error_eventos_base: null,
    error_destacadas: null,
    //opciones para editar o crear noticia
    editar_noticia: false,
    crear_noticia: false,
    noticia: null,
    noticia_app: null,
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
    async setModificarNoticia(noticia) {
      this.loading = false;
      this.editar_noticia = true;
      this.noticia = noticia;
      this.loading = true;
    },
    async setCrearNoticia() {
      this.loading = false;
      this.crear_noticia = noticia;
      this.loading = true;
    },
    limpiarNoticia() {
      this.noticia ? null : this.noticia;
      this.crear_noticia ? false : this.crear_noticia;
      this.editar_noticia ? false : this.editar_noticia;

      // this.editar_noticia = false;
      // this.crear_noticia = false;
      // this.noticia = null;
    },
    async noticiaApp(noticia) {
      this.noticia_app = noticia;
    },
    async postNoticia(noticia) {
      this.loading = false;
      try {
        const response = await api.post(
          "/api/noticias/noticia-create-update/",
          noticia
        );

        this.fetchTodasNoticias();
      } catch (error) {
        console.error("Error al cargar todas las noticias activas:");
        this.error =
          "No se pudo cargar las noticias. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading = true;
      }
    },
  },
});
