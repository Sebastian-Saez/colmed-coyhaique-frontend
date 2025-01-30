import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useMedicoStore = defineStore("medico", {
  state: () => ({
    medicos: [],
    cuotas: null,
    loading: false,
    loading_medico: false,
    loading_registroSuper: false,
    error: null,
    afiliaciones: [],
    registros_procesados_sr: null,
    resultado_proceso_sr: false,
    certificado_medico_superintendencia: null,
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
    async procesar_registros_super(formData) {
      this.registros_procesados_sr = null;
      this.resultado_proceso_sr = false;
      try {
        const response = await api.post(
          "/api/medicos/procesar-registros-sr/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.registros_procesados_sr = response.data.message;
        this.resultado_proceso_sr = true;
      } catch (error) {
        console.error(
          "Error al procesar registros Sistema de Recaudación:",
          error.message
        );
        this.registros_procesados_sr = error.response.data.error;
        this.resultado_proceso_sr = true;
      } finally {
        console.log("fin de procesamiento registros sistema de recaudación");
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
    async okRegistrosSuper() {
      this.registros_procesados_sr = null;
      this.resultado_proceso_sr = false;
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
      this.loading_medico = false;
      try {
        const response = await api.get(
          "/api/medicos/medicos/afiliaciones/?medico=" + medico
        );
        this.afiliaciones = response.data;
      } catch (error) {
        console.error("Error al cargar las afiliaciones:", error);
      } finally {
        this.loading_medico = true;
      }
    },
    async fetchRegistroSuperintendencia(registro) {
      this.certificado_medico_superintendencia = null;
      this.loading_registroSuper = false;
      try {
        const response = await api.get(
          "/api/medicos/superintendencia/certificado_medico/?registro=" +
            registro
        );

        this.certificado_medico_superintendencia = response.data;
      } catch (error) {
        console.error(
          "Error al cargar registro superintendencia del médico:",
          error
        );
      } finally {
        this.loading_registroSuper = true;
      }
    },
    async fetchEspecialidades() {
      this.loading_especialidades = null;
      try {
      } catch (error) {
      } finally {
        this.loading_especialidades = true;
      }
    },
    async fetchOrdenesProfesionales() {},
    limpiarDetalleMedico() {
      this.afiliaciones = [];
      this.certificado_medico_superintendencia = null;
    },
    limpiarAfiliaciones() {
      this.afiliaciones = [];
    },
    limpiarMedicos() {
      this.medicos = [];
    },
  },
});
