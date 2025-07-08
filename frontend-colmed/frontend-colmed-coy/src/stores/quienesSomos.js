import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useSomosStore = defineStore("somos", {
  state: () => ({
    mision_vision: null,
    normativas: null,
    directiva: null,
    departamentos: null,
    agrupaciones_regionales: null,
    capitulos: null,
    tribunal_etica: null,
    transparencia: false,
    pagina_quienes_somos: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMisionVision(){
      this.loading = true;
      try {
        const response = await api.get("/api/toolbar/toolbar/misionvision/mision_vision/");
        // Guardar el token en el estado y en el localStorage
        this.mision_vision = response.data;
      } catch (error) {
        console.error("Error al cargar Misión y Visión:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchNormativa(){
      this.loading = true;
      try {
        const response = await api.get("/api/toolbar/toolbar/normativa/todas_normativas/");
        // Guardar el token en el estado y en el localStorage
        this.normativas = response.data;
      } catch (error) {
        console.error("Error al cargar Normativa:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchDirectiva() {
      this.loading = true;
      try {
        const response = await api.get("/api/toolbar/toolbar/directiva/directiva/");
        // Guardar el token en el estado y en el localStorage
        this.directiva = response.data;
      } catch (error) {
        console.error("Error al cargar la Directiva:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchDepartamentos() {
      this.loading = true;
      try {
        const response = await api.get("/api/toolbar/toolbar/departamentos/todos_departamentos/");
        // Guardar el token en el estado y en el localStorage
        this.departamentos = response.data;
      } catch (error) {
        console.error("Error al cargar la Directiva:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchAgrupacionRegional() {
      this.loading = true;
      try {
        const response = await api.get("/api/toolbar/toolbar/agrupaciones/todas_agrupaciones/");
        // Guardar el token en el estado y en el localStorage
        this.agrupaciones_regionales = response.data;
      } catch (error) {
        console.error("Error al cargar Agrupación Regional:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchCapitulos() {
      this.loading = true;
      try {
        const response = await api.get("/api/toolbar/toolbar/capitulos/todos_capitulos/");        
        this.capitulos = response.data;
      } catch (error) {
        console.error("Error al cargar Capitulos:", error);
      } finally {
        this.loading = false;
      }
    },
    async fetchTribunalEtica() {
      this.loading = true;
      try {
        const response = await api.get("/api/toolbar/toolbar/tribunal_etica/tribunal_etica/");        
        this.tribunal_etica = response.data;
      } catch (error) {
        console.error("Error al cargar Tribunal de Etica:", error);
      } finally {
        this.loading = false;
      }
    },
    async saveMisionVision(mision_vision) {
      this.loading = true;
      try{
        await api.post("/api/toolbar/toolbar-create-update/misionvision/", [mision_vision]);
      }catch (error){
        console.error("Error al guardar información de Misión y Visión");
      }finally {
        this.fetchMisionVision();
        this.loading = false;
      }
    },
    async saveNormativas(normativas) {
      this.loading = true;
      try{
        await api.post("/api/toolbar/toolbar-create-update/normativa/", normativas);
      }catch (error){
        console.error("Error al guardar información de Normativas");
      }finally {
        this.fetchNormativa();
        this.loading = false;
      }
    },
    async saveDirectiva(directiva) {
      this.loading = true;
      try{
        await api.post("/api/toolbar/toolbar-create-update/directiva/", directiva);
      }catch (error){
        console.error("Error al guardar información de la Directiva");
      }finally {
        this.fetchDirectiva();
        this.loading = false;
      }
    },
    async saveDepartamentos(departamentos) {
      this.loading = true;
      try{
        await api.post("/api/toolbar/toolbar-create-update/departamentos/", departamentos);
      }catch (error){
        console.error("Error al guardar información de los Departamentos");
      }finally {
        this.fetchDepartamentos();
        this.loading = false;
      }
    },
    async saveAgrupacionesRegionales(agrupaciones_regionales) {
      this.loading = true;
      try{
        await api.post("/api/toolbar/toolbar-create-update/agrupaciones/", agrupaciones_regionales);
      }catch (error){
        console.error("Error al guardar información de las Agrupaciones Regionales");
      }finally {
        this.fetchAgrupacionRegional();
        this.loading = false;
      }
    },
    async saveCapitulos(capitulos) {
      this.loading = true;
      try{
        await api.post("/api/toolbar/toolbar-create-update/capitulos/", capitulos);
      }catch (error){
        console.error("Error al guardar información de Capítulos");
      }finally {
        this.fetchCapitulos();
        this.loading = false;
      }
    },
    async saveTribunalEtica(tribunal_etica) {
      this.loading = true;
      try{
        await api.post("/api/toolbar/toolbar-create-update/tribunal_etica/", [tribunal_etica]);
      }catch (error){
        console.error("Error al guardar información del Tribunal de Ética");
      }finally {
        this.fetchTribunalEtica();
        this.loading = false;
      }
    },
    async setCategoriaSomos(categoria) {
      this.loading = false;
      this.pagina_quienes_somos = categoria;
      this.loading = true;
    },
  },
});
