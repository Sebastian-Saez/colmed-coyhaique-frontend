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
    async saveConvenios(convenios) {
      this.loading = true;
      try{
        const convenios_list = [
          ...(Array.isArray(convenios.nacionales) ? convenios.nacionales : []),
          ...(Array.isArray(convenios.regionales) ? convenios.regionales : [])
        ]

        const convenios_config = [
          {todos_convenios_link : convenios.todos_convenios_link}
        ]

        await api.post("/api/toolbar/toolbar-create-update/convenios/", convenios_list);
        await api.post("/api/toolbar/toolbar-create-update/convenios_config/", convenios_config);
      }catch (error){
        console.error("Error al guardar los convenios");
      }finally {
        this.fetchConvenios();
        this.loading = false;
      }

    }
    
  },
});
