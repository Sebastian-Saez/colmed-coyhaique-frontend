<template>
  <div class="q-pa-xs q-gutter-sm" style="height: 600px">
    <q-card
      class="q-pa-md bg-grey-1"
      :class="isLargeScreen ? 'q-ml-lg q-mr-xl' : 'q-mx-lg'"
      style="border-radius: 20px; height: 600px"
    >
      <div class="text-h4 text-weight-bold text-primary">Quienes somos</div>
      <q-separator spaced />

      <q-inner-loading
        v-if="loading"
        :showing="loading"
        :label="'Cargando Quienes Somos '+seccion+'...'"
        label-class="text-secondary"
        label-style="font-size: 1.1em"
      />
      <div v-else>
        <q-splitter
          v-model="splitterModel"
          style="height: 400px"
          :limits="computedLimits"
        >
          <!-- Menú de pestañas -->
          <template #before>
            <q-tabs
              v-model="tab"
              vertical
              active-color="white"
              indicator-color="red-11"
              active-class="bg-blue-13"
            >
              <q-tab
                name="mision"
                label="Misión y Visión"
                no-caps
                :class="tab === 'mision' ? 'text-white' : 'bg-blue-1 text-primary'"
                class="q-mb-xs q-mr-md tab-button"
              />
              <q-tab
                name="normativa"
                label="Normativa"
                no-caps
                :class="tab === 'normativa' ? 'text-white' : 'bg-blue-1 text-primary'"
                class="q-mb-xs q-mr-md tab-button"
              />
              <q-tab
                name="directiva"
                label="Directiva"
                no-caps
                :class="tab === 'directiva' ? 'text-white' : 'bg-blue-1 text-primary'"
                class="q-mb-xs q-mr-md tab-button"
              />
              <q-tab
                name="departamento"
                label="Departamentos"
                no-caps
                :class="tab === 'departamento' ? 'text-white' : 'bg-blue-1 text-primary'"
                class="q-mb-xs q-mr-md tab-button"
              />
              <q-tab
                name="agrupacion_regional"
                label="Agrupación regional"
                no-caps
                :class="tab === 'agrupacion_regional' ? 'text-white' : 'bg-blue-1 text-primary'"
                class="q-mb-xs q-mr-md tab-button"
              />
              <q-tab
                name="capitulos"
                label="Capítulos"
                no-caps
                :class="tab === 'capitulos' ? 'text-white' : 'bg-blue-1 text-primary'"
                class="q-mb-xs q-mr-md tab-button"
              />
              <q-tab
                name="tribunal_etica"
                label="Tribunal de ética"
                no-caps
                :class="tab === 'tribunal_etica' ? 'text-white' : 'bg-blue-1 text-primary'"
                class="q-mb-xs q-mr-md tab-button"
              />
            </q-tabs>
          </template>

          <!-- Paneles de contenido -->
          <template #after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="slide-up"
              transition-next="slide-up"
              class="bg-grey-1 q-pa-sm"
            >
              <!-- Panel Misión y Visión -->
              <q-tab-panel name="mision">
                <q-card flat class="q-pa-sm bg-grey-2">
                  
                  <div class="text-h4 text-primary text-weight-medium q-mb-md">
                    Misión
                  </div>
                  <q-input
                    v-model="mision_vision.mision"
                    filledn
                    type="textarea"
                    autogrow
                    class="text-subtitle1 text-weight-light text-primary q-pb-md"
                  />
                  <div class="text-h4 text-primary text-weight-medium q-mb-md q-pt-md">
                    Visión
                  </div>
                  <q-input
                    v-model="mision_vision.vision"
                    filled
                    type="textarea"
                    autogrow
                    class="text-subtitle1 text-weight-light text-primary q-pb-md"
                  />
                  <q-card-actions align="left">
                    <q-btn
                    label="Guardar cambios en 'Misión y Visión'"
                    color="primary"
                    rounded
                    no-caps
                    class="q-ml-md"
                    @click="saveMisionVision"
                  />
                  </q-card-actions>

                </q-card>
              </q-tab-panel>

              <!-- Panel Normativa: editor dinámico de normativas -->
              <q-tab-panel name="normativa">
                <q-card flat class="q-pa-sm bg-grey-2">
                  <div class="text-h4 text-primary text-weight-medium q-mb-md">
                    Normativa
                  </div>
                  
                  <div
                    v-for="(item, index) in normativas"
                    :key="index"
                    class="q-pa-sm q-mb-md"
                    style="border: 1px solid #ccc; border-radius: 8px;"
                  >
                    <q-input
                      v-model="normativas[index].titulo"
                      filled
                      label="Título"
                      class="q-mb-sm"
                    />
                    <q-input
                      v-model="normativas[index].contenido"
                      filled
                      type="textarea"
                      label="Contenido"
                      autogrow
                      class="text-body2 text-weight-light text-primary text-justify"
                    />
                    <q-input
                      v-model="normativas[index].link"
                      filled
                      label="Link"
                      class="q-mb-sm"
                    />
                    <q-btn
                      label="Eliminar"
                      color="negative"
                      flat
                      @click="removeNormativa(index)"
                    />
                  </div>
                  <q-card-actions align="around">
                    <q-btn
                      label="Guardar cambios en 'Normativa'"
                      no-caps
                      rounded
                      color="primary"
                      @click="saveNormativa"
                    />
                    <q-btn
                      label="Agregar normativa"
                      color="primary"
                      flat
                      rounded
                      no-caps
                      @click="addNormativa"
                    />
                  </q-card-actions>

                </q-card>
              </q-tab-panel>

              <!-- Panel Directiva -->
              <q-tab-panel name="directiva">
                <q-card flat class="q-pa-sm bg-grey-2">
                  <div class="text-h4 text-primary text-weight-medium q-mb-md">
                    Directiva
                  </div>
                  <q-list>
                    <q-item v-for="(actor, index) in directiva" :key="index">
                      <q-item-section>
                        <q-input
                          v-model="directiva[index].cargo"
                          filled
                          label="Cargo"
                          dense
                          class="text-subtitle1 text-weight-regular text-primary"
                        />
                        <q-input
                          v-model="directiva[index].persona"
                          filled
                          label="Nombre"
                          dense
                          class="text-subtitle1 text-weight-light text-primary"
                        />
                        <q-btn
                          label="Eliminar"
                          color="negative"
                          flat
                          @click="removeDirectiva(index)"
                        />
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <q-card-actions align="around">
                    <q-btn
                      label="Guardar cambios en 'Directiva'"
                      color="primary"
                      no-caps
                      rounded
                      class="q-ml-md"
                      @click="saveDirectiva"
                    />
                   <q-btn
                      label="Agregar cargo Directiva"
                      color="primary"
                      flat
                      rounded
                      no-caps
                      @click="addDirectiva"
                    />
                  </q-card-actions>                
                </q-card>
              </q-tab-panel>
              <q-tab-panel name="departamento">
                <q-card flat class="q-pa-sm bg-grey-2">
                  <div class="text-h4 text-primary q-mb-md text-weight-medium">
                    Departamentos Colegio Médico Aysén
                  </div>

                  <div
                    v-for="(departamento, idx) in departamentos"
                    :key="idx"
                    style="border-radius: 8px;"
                  >
                    <q-input
                        v-model="departamento.titulo"
                        filled
                        label="Titulo departamento"
                        class="text-h5 text-primary q-mb-xs"
                    />
                    <q-input
                      v-model="departamento.descripcion_general"
                      filled
                      type="textarea"
                      label="Descripción general"
                      class="text-subtitle1 text-weight-light text-primary text-justify"
                    />
                    <q-btn
                      label="Eliminar departamento"
                      color="negative"
                      flat
                      @click="removeDepartamento(idx)"
                    />
                    <q-separator spaced/>
                  </div>

                
                
                    <q-card-actions align="around">
                      <q-btn
                        label="Guardar cambios en 'Departamentos'"
                        no-caps
                        rounded
                        color="primary"
                        @click="saveDepartamento"
                      />
                      <q-btn
                        label="Agregar departamento"
                        color="primary"
                        flat
                        rounded
                        no-caps
                        @click="addDepartamento"
                      />
                    </q-card-actions>
                </q-card>
              </q-tab-panel>
              <q-tab-panel name="agrupacion_regional">
                <q-card flat class="q-pa-sm bg-grey-2">
                  <div class="text-h4 text-primary q-mb-md text-weight-medium">
                    Agrupaciones regionales
                  </div>

                  <div
                    v-for="(agrupacion, index) in agrupaciones_regionales"
                    :key="index"
                    class="q-pa-sm q-mb-md"
                    style="border: 1px solid #ccc; border-radius: 8px;"
                  >
                    <q-input
                      v-model="agrupaciones_regionales[index].titulo"
                      filled
                      label="Título"
                      class="q-mb-sm"
                    />
                    <q-input
                      v-model="agrupaciones_regionales[index].descripcion"
                      filled
                      type="textarea"
                      label="Contenido o descripción"
                      autogrow
                      class="text-body2 text-weight-light text-primary text-justify"
                    />                    
                    <q-btn
                      label="Eliminar"
                      color="negative"
                      flat
                      @click="removeAgrupacion(index)"
                    />
                  </div>

                  <q-card-actions align="around">
                    <q-btn
                      label="Guardar cambios en 'Agrupaciones Regionales'"
                      no-caps
                      rounded
                      color="primary"
                      @click="saveAgrupacionRegional"
                    />
                    <q-btn
                      label="Agregar nueva Agrupación regional"
                      color="primary"
                      flat
                      rounded
                      no-caps
                      @click="addAgrupacionRegional"
                    />
                  </q-card-actions>

                </q-card>                
              </q-tab-panel>

              <q-tab-panel name="capitulos">
                <q-card flat class="q-pa-sm bg-grey-2">
                  <div class="text-h4 text-primary text-weight-medium q-mb-md">
                    Capítulos
                  </div>
                  <div
                    v-for="(item, index) in capitulos"
                    :key="index"
                    class="q-pa-sm q-mb-md"
                    style="border: 1px solid #ccc; border-radius: 8px;"
                  >
                    <q-input
                      v-model="item.titulo"
                      filled
                      label="Título"
                      class="q-mb-sm"
                    />
                    <q-input
                      v-model="item.contenido"
                      filled
                      type="textarea"
                      label="Contenido"
                      autogrow
                      class="text-body2 text-weight-light text-primary text-justify"
                    />
                    <q-input
                      v-model="item.link"
                      filled
                      label="Link"
                      class="q-mb-sm"
                    />
                    <q-btn
                      label="Eliminar Capítulo"
                      color="negative"
                      flat
                      @click="removeCapitulo(index)"
                    />
                  </div>
                  <q-card-actions align="around">
                    <q-btn
                      label="Guardar cambios en 'Capítulos'"
                      no-caps
                      rounded
                      color="primary"
                      @click="saveCapitulos"
                    />
                    <q-btn
                      label="Agregar Capítulo"
                      color="primary"
                      flat
                      rounded
                      no-caps
                      @click="addCapitulo"
                    />
                  </q-card-actions>

                </q-card>
              </q-tab-panel>
              <q-tab-panel name="tribunal_etica">
                <q-card flat class="q-pa-sm bg-grey-2">
                  <div class="text-h4 text-primary text-weight-medium q-mb-md">
                    Tribunal de ética
                  </div>
                  <q-input
                    v-model="tribunal_etica.descripcion"
                    filled
                    type="textarea"
                    autogrow
                    class="text-subtitle1 text-weight-light text-primary q-pb-md"
                  />
                  <q-separator spaced/>
                  <div class="text-h5 text-primary text-weight-medium q-mb-md">
                    Directiva
                  </div>
                  <q-list>
                    <q-item v-for="(actor, index) in tribunal_etica.directiva" :key="index">
                      <q-card
                        class="bg-blue-grey-1"
                        style="width:200%"
                        flat
                      >
                      <q-item-section>
                        <q-input
                          v-model="tribunal_etica.directiva[index].cargo"
                          filled
                          label="Cargo"
                          dense
                          class="text-subtitle1 text-weight-regular text-primary"
                        />
                        <q-input
                          v-model="tribunal_etica.directiva[index].persona"
                          filled
                          label="Nombre"
                          dense
                          class="text-subtitle1 text-weight-light text-primary"
                        />

                      </q-item-section>
                      <q-card-actions align="center">
                        <q-btn
                          flat
                          small
                          color="negative"
                          label="Eliminar Cargo"
                          @click="removeDirectivaTribunalEtica(index)"
                        />
                      </q-card-actions>
                      </q-card>

                    </q-item>
                  </q-list>
                  <q-card-actions align="around" class="bg-grey-2 q-mt-md">
                    <q-btn
                      label="Guardar cambios en 'Tribunal de ética'"
                      color="primary"
                      no-caps
                      rounded
                      @click="saveTribunalEtica"
                    />

                    <q-btn
                      label="Agregar nuevo cargo a la Directiva de Tribunal de ética"
                      color="primary"
                      flat
                      no-caps
                      rounded
                      @click="addDirectivaTribunalEtica"
                    />
                  </q-card-actions> 
                  </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
      
    </q-card>

    <q-dialog v-model="exportDataDialog" persistent backdrop-filter="blur(4px)">
      <q-card>
        <q-card-section class="items-center text-h6">
          Generando archivo ...
        </q-card-section>
        <q-card-section class="items-center">
          <q-spinner color="primary" size="3em" :thickness="10" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { useSomosStore } from "src/stores/quienesSomos";
  import { useUserStore } from "src/stores/authStore";
  import { useRouter } from "vue-router";
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";

  // Configuración responsive
  const $q = useQuasar();
  const isLargeScreen = computed(() => $q.screen.gt.md);
  const computedLimits = computed(() => (isLargeScreen.value ? [15, 30] : [28, 28]));
  const splitterModel = ref(isLargeScreen.value ? 15 : 28);

  const router = useRouter();

  // Gestión de pestañas a través del store
  const somosStore = useSomosStore();
  const userStore = useUserStore();  

  const userProfile = computed(() => userStore.user);
  const mision_vision = computed(() => somosStore.mision_vision || {});
  const normativas = computed(() => somosStore.normativas || []);
  const directiva = computed(() => somosStore.directiva || []);
  const departamentos = computed(() => somosStore.departamentos || []);
  const agrupaciones_regionales = computed(() => somosStore.agrupaciones_regionales || []);
  const capitulos = computed(() => somosStore.capitulos || []);
  const tribunal_etica = computed(() => somosStore.tribunal_etica || {});
  const loading = computed(() => somosStore.loading || false);

  const tab = computed({
    get() {
      return somosStore.pagina_quienes_somos || "mision";
    },
    set(value) {
      somosStore.pagina_quienes_somos = value;
    },
  });

  const seccion = ref();
  
  // Datos editables para Misión y Visión
  const mision = ref(
    "Liderar el cumplimiento de la misión del Colegio Médico de Chile, entre los médicos de Santiago, con la finalidad de procurar la excelencia en el ejercicio de la profesión médica, preocupándonos especialmente por su desarrollo profesional, laboral, personal, familiar, ético y social."
  );
  const vision = ref(
    "Ser reconocidos por liderar y promover la excelencia en el ejercicio del trabajo médico en Santiago, preocupándonos de la calidad de la atención en un entorno adecuado de trabajo, con la colaboración y apoyo de entidades e instituciones públicas y privadas vinculadas a la Salud, participando activamente en la elaboración de acciones de mejoramiento e innovación."
  );

// Normativa: array de objetos editables
  const normativaItems = ref([
    {
      titulo: "Estatutos del Colegio Médico de Chile (A.G.)",
      contenido:
        "Aprobados por Acuerdos números 1.300, de 1981, y 15, de 1982, del Consejo General; modificados por la Asamblea Extraordinaria de Socios celebrada el día 15 de agosto de 1992, y por Acuerdos Nº 83, de 1993, y Nº 115, de 1994, del Honorable Consejo General; por la Asamblea Extraordinaria celebrada el día 12 de enero de 1996; por la Asamblea General Extraordinaria efectuada el día 8 de agosto de 1998, y Acuerdo Nº 89, adoptado en Sesión Ordinaria Nº 38, del H. Consejo General, de fecha 1° de octubre de 1998; por la Asamblea General Extraordinaria efectuada el día 26 de julio de 2002; por la Asamblea General Extraordinaria celebrada el día 24 de abril de 2004; por la Asamblea General Extraordinaria celebrada el día 22 de abril de 2006; por la Asamblea General Extraordinaria celebrada el día 23 de abril de 2007; por la Asamblea General Extraordinaria celebrada el día 21 de abril de 2012; por la Asamblea General Extraordinaria celebrada el día 27 de junio de 2014; por la Asamblea General Extraordinaria celebrada el día 23 de abril de 2015; por la Asamblea General Extraordinaria celebrada el día 21 de abril de 2016; por la Asamblea General Extraordinaria celebrada el día 16 de junio de 2018",
      link: "https://www.colegiomedico.cl/wp-content/uploads/2024/02/Estatutos_Colmed_2023.pdf"
    },
    {
      titulo: "Reglamento de capítulos médicos",
      contenido:
        "El Reglamento de Capítulos Médicos regula la creación, organización y funcionamiento de los Capítulos Médicos, que son las organizaciones de base de los médicos/as afiliados a un Consejo Regional del Colegio Médico de Chile (A.G.). Estos Capítulos se conforman en los establecimientos de trabajo o por intereses gremiales comunes, bajo la dependencia y directrices de los Consejos Regionales. El reglamento ha sido modificado por el H. Consejo Nacional en la Sesión N° 27 del 13 de marzo de 2020 (Acuerdos N° 238 al N° 259).",
      link: "https://www.colegiomedico.cl/wp-content/uploads/2020/04/Reglamento_Capitulos_Medicos_2020.pdf"
    }
  ]);

  const capitulos_prev = ref([
  ]);

  const departamentos_prev = ref([

  ]);

  const agrupaciones_regionales_prev = ref([

  ]);

  const addNormativa = () => {
    normativas.value.push({
      titulo: "",
      contenido: "",
      link: ""
    });
  };

  const removeNormativa = (index) => {
    normativas.value.splice(index, 1);
  };

  const addDirectiva = () => {
    directiva.value.push({
      cargo: "",
      persona: ""
    });
  };

  const removeDirectiva = (index) => {
    directiva.value.splice(index, 1);
  };

  const addCapitulo = () => {
    capitulos.value.push({
      titulo: "",
      contenido: "",
      link: ""
    });
  };
  
  const addDepartamento = () => {
    departamentos.value.push({
      titulo: "",
      descripcion_general: ""    
    });
  };
  
  const addAgrupacionRegional = () => {
    agrupaciones_regionales.value.push({
      titulo: "",
      descripcion: ""    
    });
  };
  
  
  const removeCapitulo = (index) => {
    capitulos.value.splice(index, 1);
  };
  
  const removeDepartamento = (index) => {
    departamentos.value.splice(index, 1);
  };
  
  const removeAgrupacion = (index) => {
    agrupaciones_regionales.value.splice(index, 1);
  };
  
  const saveNormativa = async () => {
    await somosStore.saveNormativas(normativas.value);
  };
  
  const saveCapitulos = async () => {
    await somosStore.saveCapitulos(capitulos.value)
  };
  
  const saveDepartamento = async () => {
    await somosStore.saveDepartamentos(departamentos.value);
  };
  
  const saveAgrupacionRegional = async () => {
    await somosStore.saveAgrupacionesRegionales(agrupaciones_regionales.value);
  };

  // Datos para Directiva
  const directiva_prev = ref([
    { cargo: "Presidenta", persona: "Dra. Alejandra Paz Born Estrada" },
    { cargo: "Vicepresidente", persona: "Dr. Andrés Bujes Marlez" },
    { cargo: "Secretaria", persona: "Dra. María Lía Paccot" },
    { cargo: "Tesorera", persona: "Dra. Daniela Soto Ojeda" },
    { cargo: "Consejero", persona: "Dr. José Francisco Chacano Quijanes" }
  ]);

  const directiva_tribunal_etica = ref([
    { cargo: "Presidenta", persona: "Dra. Alejandra Paz Born Estrada" },
    { cargo: "Vicepresidente", persona: "Dr. Andrés Bujes Marlez" },
    { cargo: "Secretaria", persona: "Dra. María Lía Paccot" },
    { cargo: "Tesorera", persona: "Dra. Daniela Soto Ojeda" },
    { cargo: "Consejero", persona: "Dr. José Francisco Chacano Quijanes" }
  ]);

  const addDirectivaTribunalEtica = () => {
    if (!Array.isArray(tribunal_etica.value.directiva)) {
      tribunal_etica.value.directiva = []
    }

    tribunal_etica.value.directiva.push({
      cargo: "",
      persona: ""    
    });
  };

  const removeDirectivaTribunalEtica = (index) => {
    tribunal_etica.value.directiva.splice(index, 1);
  };

  const saveTribunalEtica = async () => {
    await somosStore.saveTribunalEtica(tribunal_etica.value);
  };

  const saveMisionVision = async () => {
    await somosStore.saveMisionVision(mision_vision.value);
    // Aquí se debe llamar a la API o actualizar el store para guardar la misión y visión
  };

  const saveDirectiva = async () => {
    await somosStore.saveDirectiva(directiva.value)
  };

  const exportDataDialog = ref(false);

  dayjs.extend(customParseFormat);


  onMounted(async () => {
   // Verificar el estado de la conexión a internet
    if (!userProfile.value) {
      console.warn("Usuario no autenticado. Redirigiendo a login...");
      router.push("/login");
    }
    seccion.value = " - Misión y Visión"
    await somosStore.fetchMisionVision();

    seccion.value = " - Normativa"
    await somosStore.fetchNormativa();

    seccion.value = " - Directiva"
    await somosStore.fetchDirectiva();

    seccion.value = " - Departamentos"
    await somosStore.fetchDepartamentos();

    seccion.value = " - Agrupación Regional"
    await somosStore.fetchAgrupacionRegional();

    seccion.value = " - Capítulos"
    await somosStore.fetchCapitulos();

    seccion.value = " - Tribuna de Ética"
    await somosStore.fetchTribunalEtica();
  });
</script>

<style lang="sass">
.tab-button
  border-radius: 50px 0px 0px 50px
</style>
