import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useConveniosStore = defineStore("convenio", {
  state: () => ({
    convenios: null,
    loading: null,
    error: null,
  }),
  actions: {
    async fetchConvenios() {
      this.loading = true;
      try {
        const response = await api.get("/api/colmed/convenios/todos_convenios/");
        this.convenios = response.data;
        this.loading = false;
      } catch (error) {
        console.error("Error al cargar los convenios");
        this.error =
          "No se pudo cargar los convenios. Por favor, intenta de nuevo más tarde.";
      } finally {
        this.loading = false;
      }
    },
    // async fetchEventosBase() {
    //   this.loading_base = false;
    //   try {
    //     const response = await api.get("/api/colmed/eventos/eventos_base/");
    //     this.eventos_base = response.data;
    //     this.loading_base = true;
    //   } catch (error) {
    //     console.error("Error al cargar las eventos base:");
    //     this.error_base =
    //       "No se pudo cargar las eventos. Por favor, intenta de nuevo más tarde.";
    //   } finally {
    //     this.loading_base = true;
    //   }
    // },
    // async fetchNoticiasDestacadas() {
    //   this.loading_destacadas = false;
    //   try {
    //     const response = await api.get(
    //       "/api/noticias/noticias/noticias_destacadas/"
    //     );
    //     this.noticias_destacadas = response.data;
    //   } catch (error) {
    //     console.error("Error al cargar las noticias destacadas:");
    //     this.error_destacadas =
    //       "No se pudo cargar las informaciones. Por favor, intenta de nuevo más tarde.";
    //   } finally {
    //     this.loading_destacadas = true;
    //   }
    // },
    // async fetchNoticiasBase() {
    //   this.loading_base = false;
    //   try {
    //     const response = await api.get("/api/noticias/noticias/noticias_base/");
    //     this.noticias_base = response.data;
    //   } catch (error) {
    //     console.error("Error al cargar las noticias base:");
    //     this.error_base =
    //       "No se pudo cargar las noticias. Por favor, intenta de nuevo más tarde.";
    //   } finally {
    //     this.loading_base = true;
    //   }
    // },
    // async fetchTodasNoticias() {
    //   this.loading = false;
    //   try {
    //     const response = await api.get(
    //       "/api/noticias/noticias/todas_noticias/"
    //     );
    //     this.todas_noticias = response.data;
    //   } catch (error) {
    //     console.error("Error al cargar todas las noticias activas:");
    //     this.error =
    //       "No se pudo cargar las noticias. Por favor, intenta de nuevo más tarde.";
    //   } finally {
    //     this.loading = true;
    //   }
    // },
    // async setCategoriaInformacion(categoria) {
    //   this.loading = false;
    //   this.pagina_informaciones = categoria;
    //   this.loading = true;
    // },
    // async setModificarEvento(evento) {
    //   this.loading = false;
    //   this.editar_evento = true;
    //   this.evento = evento ?? null;
    //   this.loading = true;
    // },
    // async setEvento(evento) {
    //   this.loading = false;
    //   this.evento = evento ?? null;
    //   this.loading = true;
    // },
    // limpiarEvento() {
    //   this.editar_evento = false;
    //   this.crear_evento = false;

    //   this.evento = null;

    //   // this.editar_evento ? false : this.editar_evento;
    //   // this.crear_evento ? false : this.crear_evento;
    //   // this.evento ? null : this.evento;
    // },
    // async setCrearEvento() {
    //   this.loading = false;
    //   this.crear_evento = true;
    //   this.loading = true;
    // },
    // async postEvento(evento) {
    //   this.loading = false;
    //   try {
    //     await api.post("/api/colmed/evento-create-update/", evento);

    //     await this.fetchEventosBase();
    //   } catch (error) {
    //     console.error("Error al cargar todos los eventos");
    //     this.error =
    //       "No se pudo cargar los eventos. Por favor, intenta de nuevo más tarde.";
    //   } finally {
    //     this.loading = true;
    //   }
    // },
  },
});
