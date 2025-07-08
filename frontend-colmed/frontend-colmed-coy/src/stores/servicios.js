import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useServicioStore = defineStore("servicio", {
  state: () => ({
    servicios: null,
    info_pagos: null,
    info_colegiarse: null,
    info_casa_medico: null,
    pagina_servicio: null,
    loading: null,
    loading_pagos: null,
    loading_casa: null,
    loading_colegiarse: null,
    error: null,
  }),
  actions: {
    async fetchServicios() {
      // Limpiar el token antes de iniciar sesión
      this.loading = true;
      try {
        const response = await api.get("/api/servicios/servicios/");
        // Guardar el token en el estado y en el localStorage
        this.servicios = response.data;
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchPagos(){
      this.loading = true;
      this.loading_pagos = true;
      try {
        const response = await api.get("/api/toolbar/toolbar/pagos/informacion_pagos/");
        // Guardar el token en el estado y en el localStorage
        this.info_pagos = response.data;
      } catch (error) {
        console.error("Error al cargar los pagos:", error);
      } finally {
        this.loading = false;
        this.loading_pagos = false;
      }
    },
    async fetchCasaMedico(){
      this.loading = true;
      this.loading_casa = true;
      try {
        const response = await api.get("/api/toolbar/toolbar/casa_medico/casa_medico/");
        // Guardar el token en el estado y en el localStorage
        this.info_casa_medico = response.data;
      } catch (error) {
        console.error("Error al cargar información de 'casa_medico':", error);
      } finally {
        this.loading = false;
        this.loading_casa = false;
      }
    },
    async fetchColegiarse(){
      this.loading = true;
      this.loading_colegiarse = true;
      try {
        const response = await api.get("/api/toolbar/toolbar/colegiarse/colegiarse/");
        // Guardar el token en el estado y en el localStorage
        this.info_colegiarse = response.data;
      } catch (error) {
        console.error("Error al cargar información de 'colegiarse':", error);
      } finally {
        this.loading = false;
        this.loading_colegiarse = false;
      }
    },
    async setCategoriaServicio(categoria) {
      this.loading = true;
      this.pagina_servicio = categoria;
      this.loading = false;
    },
    async saveInformacionPagos(pagos) {
      this.loading = true;
      try{
        await api.post("/api/toolbar/toolbar-create-update/pagos/", [pagos]);
      }catch (error){
        console.error("Error al guardar información de pagos");
      }finally {
        this.fetchPagos();
        this.loading = false;
      }

    },
    async saveInformacionColegiarse(colegiarse) {
      this.loading = true;
      try{
        await api.post("/api/toolbar/toolbar-create-update/colegiarse/", [colegiarse]);
      }catch (error){
        console.error("Error al guardar información de como colegiarse");
      }finally {
        this.fetchColegiarse();
        this.loading = false;
      }

    },
    async saveInformacionCasaMedico(casa_medico) {
      this.loading = true;
      try{
        await api.post("/api/toolbar/toolbar-create-update/casa_medico/", [casa_medico]);
      }catch (error){
        console.error("Error al guardar información de Casa del médico");
      }finally {
        this.fetchCasaMedico();
        this.loading = false;
      }

    },
  },
});
