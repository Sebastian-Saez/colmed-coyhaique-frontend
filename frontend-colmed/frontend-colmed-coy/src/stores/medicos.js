import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useMedicoStore = defineStore("medico", {
  state: () => ({
    medicos: [],
    cuotas: null,
    loading: false,
    error: null,
    afiliaciones: [],
  }),
  actions: {
    async fetchMedicos() {
      // Limpiar el token antes de iniciar sesión
      this.loading = false;
      try {
        const response = await api.get("/api/medicos/medicos/");
        // Guardar el token en el estado y en el localStorage
        this.medicos = response.data;
      } catch (error) {
        console.error("Error al cargar los médicos:", error);
      } finally {
        this.loading = true;
      }
    },
    async filterDataMedicos(filtros) {
      // Limpiar el token antes de iniciar sesión
      this.loading = false;
      try {
        const response = await api.post(
          "/api/medicos/medicos/filtro_data_medicos/",
          filtros
        );
        // Guardar el token en el estado y en el localStorage
        this.medicos = response.data;
      } catch (error) {
        console.error("Error al cargar los médicos:", error);
      } finally {
        this.loading = true;
      }
    },
    async fetchMedicosConAfiliacion() {
      // Limpiar el token antes de iniciar sesión
      this.loading = false;
      try {
        const response = await api.get("/api/medicos/medicos/con_afiliacion/");
        this.medicos = response.data;
      } catch (error) {
        console.error("Error al cargar los médicos:", error);
      } finally {
        this.loading = true;
      }
    },
    async fetchMedicosSinAfiliacion() {
      // Limpiar el token antes de iniciar sesión
      this.loading = false;
      try {
        const response = await api.get("/api/medicos/medicos/sin_afiliacion/");
        // Guardar el token en el estado y en el localStorage
        this.medicos = response.data;
      } catch (error) {
        console.error("Error al cargar los médicos:", error);
      } finally {
        this.loading = true;
      }
    },
    async fetchMedicosEstadosPago(estadosPago) {
      // Limpiar el token antes de iniciar sesión
      this.loading = false;
      try {
        const response = await api.post(
          "/api/medicos/medicos/por_estados_pago/",
          { estados: estadosPago }
        );
        // Guardar el token en el estado y en el localStorage
        this.medicos = response.data;
      } catch (error) {
        console.error("Error al cargar los médicos:", error);
      } finally {
        this.loading = true;
      }
    },
    async fetchMedicosEstadosAfiliacion() {
      // Limpiar el token antes de iniciar sesión
      this.loading = false;
      try {
        const response = await api.get("/api/medicos/medicos/sin_afiliacion");
        // Guardar el token en el estado y en el localStorage
        this.medicos = response.data;
      } catch (error) {
        console.error("Error al cargar los médicos:", error);
      } finally {
        this.loading = true;
      }
    },
    async fetchAfiliaciones(medico) {
      // Limpiar el token antes de iniciar sesión
      this.loading = false;
      try {
        const response = await api.get(
          "/api/medicos/medicos/afiliaciones/?medico=" + medico
        );
        this.afiliaciones = response.data;
      } catch (error) {
        console.error("Error al cargar las afiliaciones:", error);
      } finally {
        this.loading = true;
      }
    },
    limpiarAfiliaciones() {
      this.afiliaciones = [];
    },
    limpiarMedicos() {
      this.medicos = [];
    },
  },
});
