<template>
    <div class="q-pa-xs q-gutter-sm">
        <q-card
        class="q-pa-md bg-grey-1"
        :class="isLargeScreen ? 'q-ml-lg q-mr-xl' : 'q-mx-lg'"
        style="border-radius: 20px; width:1200px"
      >
        <div class="text-h4 text-bold text-primary">Servicios</div>
        <q-separator spaced />
        <q-inner-loading
          v-if="loading"
          :showing="loading"
          :label="'Cargando Servicios '+seccion+'...'"
          label-class="text-secondary"
          label-style="font-size: 1.1em"
        />
        <div v-else>
          <q-splitter
          v-model="splitterModel"
          style="height: 400px"
          :limits="computedLimits"
        >
          <template #before>
            <q-tabs
              v-model="tab"
              vertical
              active-color="white"
              indicator-color="red-11"
              active-bg-color="light-green-14"
            >
              <q-tab
                no-caps
                :class="
                  tab === 'pagos'
                    ? 'text-white'
                    : 'bg-light-green-1 text-primary'
                "
                class="q-mb-xs q-mr-md tab-button"
                name="pagos"
                label="Información de pagos"
              />
              <q-tab
                no-caps
                :class="
                  tab === 'colegiarse'
                    ? 'text-white'
                    : 'bg-light-green-1 text-primary'
                "
                class="q-mb-xs q-mr-md tab-button"
                name="colegiarse"
                label="Colegiarse"
              />
              <q-tab
                no-caps
                :class="
                  tab === 'casa_medico'
                    ? 'text-white'
                    : 'bg-light-green-1 text-primary'
                "
                class="q-mb-xs q-mr-md tab-button"
                name="casa_medico"
                label="Casa del médico"
              />
            </q-tabs>
          </template>

          <template #after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="slide-up"
              transition-next="slide-up"
              class="bg-grey-1"
            >
              <q-tab-panel name="pagos">
                <div class="text-h4 text-primary q-mb-md text-weight-medium">
                  {{ pagos.titulo }}
                </div>
                <q-input
                  v-model="pagos.subtitulo"
                  filled
                  label="Subtítulo"
                  class="text-h5 text-primary"
                />
         
                <q-input
                  v-model="pagos.descripcion_general"
                  filled
                  type="textarea"
                  label="Descripción general"
                  class="text-subtitle1 text-weight-light text-primary q-pb-md text-justify"
                />
                <q-input
                  v-model="pagos.detalle_cuotas"
                  filled
                  type="textarea"
                  label="Detalle de cuotas"
                  
                  class="text-subtitle1 text-weight-light text-primary q-pb-md text-justify"
                />
        
                <q-card
                  flat
                  class="q-mt-md q-mb-xl bg-grey-1"
                  style="border-radius: 20px"
                >

                <!-- === INFO PAGOS === -->


                  <div class="text-h5 text-primary">Tipos de cuotas</div>


                  <div
                    v-for="(item, idx) in pagos.tipos_cuotas"
                    :key="idx"
                    class="q-pa-sm q-mb-sm bg-grey-2"
                    style="border-radius:8px"
                  >
                    <q-input
                      v-model="pagos.tipos_cuotas[idx].tipo_cuota"
                      filled
                      label="Nombre de cuota"
                      class="text-h6 text-overline text-primary"
                    />
                    <q-input
                      v-model="pagos.tipos_cuotas[idx].descripcion"
                      filled
                      type="textarea"
                      autogrow
                      label="Descripción de cuota"
                      class="text-subtitle1 text-weight-light text-primary text-justify"
                    />
                    <q-btn
                      flat
                      color="negative"
                      label="Eliminar tipo de cuota"
                      @click="removeTipoCuota(idx)"
                    />
                </div>

                <q-btn
                  flat
                  color="primary"
                  label="Agregar tipo de cuota"
                  @click="addTipoCuota"
                />
                 <!-- Notas dinámicas -->
                <div class="q-mt-lg">
                  <div class="text-body1 text-primary q-mb-xs">Notas:</div>
                  <div
                    v-for="(nota, i) in pagos.notas"
                    :key="i"
                    class="row items-center q-mb-xs "
                  >
                    <q-input
                      v-model="pagos.notas[i]"
                      filled
                      label="Nota"
                      class="col text-h6 text-caption text-primary"
                    />
                    <q-btn
                      icon="delete"
                      flat
                      color="negative"
                      @click="removeNota(i)"
                    />
                  </div>
                  <q-btn
                    flat
                    color="primary"
                    label="Agregar nota"
                    @click="addNota"
                  />
                </div>
            
                </q-card>
                <q-card
                  flat
                  class="q-mt-xl q-mb-xl bg-grey-1"
                  style="border-radius: 20px"
                >
                  <div class="text-h5 text-primary">Valores de cuotas</div>
                  
                  <q-separator />
                  <q-table
                    v-model:selected="selectedValoresCuotas"
                    :rows="pagos.valores_cuotas ?? []"
                    :columns="columns"
                    row-key="name"
                    flat
                    bordered
                    hide-bottom
                    separator="cell"
                    selection="multiple"
                    no-data-label="Sin información respecto a 'Valores de cuotas'"
                  >
                    <template #top>
                      <q-btn color="primary" :disable="loading" no-caps rounded label="Añadir nuevo Valor Cuota" @click="addRowValorCuota" />
                      <q-btn v-if="selectedValoresCuotas.length !== 0" class="q-ml-sm" color="primary" :disable="loading" no-caps rounded label="Eliminar cuota(s) seleccionada(s)" @click="removeRowValorCuota" />                  
                    </template>
                    <template #body="props">
                        <q-tr :props="props">
                          <q-td key="name" :props="props">
                            <q-checkbox v-model="props.selected" class="q-ml-sm" dense/>
                          </q-td>
                          <q-td key="name" :props="props">
                            {{props.row.name}}
                            <q-popup-edit v-slot="scope" v-model="props.row.name" buttons dense>
                              <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
                            </q-popup-edit>
                          </q-td>

                          <q-td key="cuota" :props="props" class="text-center">
                            {{ props.row.cuota }}
                            <q-popup-edit
                              v-slot="scope"
                              v-model="props.row.cuota"
                              buttons
                            >
                              <q-input
                                v-model="scope.value"
                                type="text"
                                dense
                                autofocus
                                @keyup.enter="scope.set"
                              />
                            </q-popup-edit>
                          </q-td>

                          <q-td key="fsg" :props="props" class="text-center">
                            {{ props.row.fsg }}
                            <q-popup-edit v-slot="scope" v-model="props.row.fsg" buttons>
                              <q-input v-model="scope.value" type="text" dense autofocus @keyup.enter="scope.set" />
                            </q-popup-edit>
                          </q-td>

                          <q-td key="cuota_fsg" :props="props" class="text-center">
                            {{ props.row.cuota_fsg  }}
                            <q-popup-edit v-slot="scope" v-model="props.row.cuota_fsg" buttons>
                              <q-input v-model="scope.value" type="text" dense autofocus @keyup.enter="scope.set" />
                            </q-popup-edit>
                          </q-td>

                          <q-td key="falmed" :props="props" class="text-center">
                            {{props.row.falmed}}
                            <q-popup-edit v-slot="scope" v-model="props.row.falmed" buttons>
                              <q-input v-model="scope.value" type="text" dense autofocus @keyup.enter="scope.set" />
                            </q-popup-edit>
                          </q-td>
                          
                        </q-tr>
                    </template>
                </q-table>

                </q-card>
                <q-separator spaced />
                <q-card
                  flat
                  class="q-mt-xl q-mb-xl bg-grey-1"
                  style="border-radius: 20px"
                >
                  <div class="text-h5 text-primary">
                    Detalle cuota Fondo Solidaridad Gremial
                  </div>
                  <q-separator />
                  <q-table
                    v-model:selected="selectedValoresFSG"
                    :rows="pagos.detalle_fsg ?? []"
                    :columns="columns_fsg"
                    row-key="name"
                    hide-bottom
                    selection="multiple"
                    separator="cell"
                    class="custom-table-servicios q-mt-md"
                    style="border-radius: 20px"
                  >
                    <template #top>
                      <q-btn color="primary" :disable="loading" no-caps rounded label="Añadir nueva Cuota FSG" @click="addRowFSG" />
                      <q-btn v-if="selectedValoresFSG.length !== 0" class="q-ml-sm" color="primary" :disable="loading" no-caps rounded label="Eliminar cuota(s) FSG" @click="removeRowFSG" />                  
                    </template>
                    <template #body="props">
                      <q-tr :props="props">
                        <q-td key="name" :props="props">
                            <q-checkbox v-model="props.selected" class="q-ml-sm" dense/>
                          </q-td>
                        <q-td key="name" :props="props">
                          {{props.row.name}}
                          <q-popup-edit v-slot="scope" v-model="props.row.name" buttons dense>
                            <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
                          </q-popup-edit>
                        </q-td>

                        <q-td key="cuota" :props="props">
                          {{props.row.cuota}}
                          <q-popup-edit v-slot="scope" v-model="props.row.cuota" buttons dense>
                            <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
                          </q-popup-edit>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </q-card>
                <q-separator spaced />
                <q-card
                  flat
                  class="q-mt-xl q-mb-xl bg-grey-1"
                  style="border-radius: 20px"
                >

                <q-input
                  v-model="pagos.reafiliacion_titulo"
                  filled
                  label="Título Reafiliación"
                  class="text-h5 text-primary"
                />
                <q-input
                v-model="pagos.reafiliacion_descripcion	"
                filled
                type="textarea"
                autogrow
                label="Descripción Reafiliación"
                class="text-subtitle1 text-weight-light text-primary text-justify"
              />

                  <q-table
                    v-model:selected="selectedValoresReafiliacion"
                    :rows="pagos.valores_reafiliacion ?? []"
                    :columns="columns_reafiliacion"
                    row-key="name"
                    hide-bottom
                    separator="cell"
                    selection="multiple"
                    class="custom-table-servicios q-mt-md"
                    style="border-radius: 20px"
                  >
                    <template #top>
                      <q-btn color="primary" :disable="loading" no-caps rounded label="Añadir nuevo Valor de Reafiliación" @click="addRowReafiliacion" />
                      <q-btn v-if="selectedValoresReafiliacion.length !== 0" class="q-ml-sm" color="primary" :disable="loading" no-caps rounded label="Eliminar Valor(es) de Reafiliación" @click="removeRowReafiliacion" />                  
                    </template>
                    <template #body="props">
                      <q-tr :props="props">
                        <q-td key="name" :props="props">
                            <q-checkbox v-model="props.selected" class="q-ml-sm" dense/>
                          </q-td>
                        <q-td key="name" :props="props">
                            {{props.row.name}}
                            <q-popup-edit v-slot="scope" v-model="props.row.name" buttons dense>
                              <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
                            </q-popup-edit>
                        </q-td>

                        <q-td key="cuota" :props="props">
                          {{props.row.cuota}}
                          <q-popup-edit v-slot="scope" v-model="props.row.cuota" buttons dense>
                            <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
                          </q-popup-edit>
                        </q-td>

                      </q-tr>
                    </template>
                  </q-table>
                </q-card>
                <div class="q-mt-lg">
                  <q-btn
                    label="Guardar cambios en 'Información de pagos'"
                    no-caps
                    rounded
                    color="primary"
                    unelevated
                    @click="saveInformacionPagos"
                  />
                </div>
              </q-tab-panel>

              <q-tab-panel name="colegiarse">
                <div class="text-h4 text-primary q-mb-md text-weight-medium">
                  Cómo Colegiarse
                </div>

                <q-input
                    v-model="colegiarse.quienesTitulo"
                    filled
                    label="Título"                    
                    class="q-mb-md text-h6 text-primary"
                  />
                <q-input
                    v-model="colegiarse.quienes"
                    filled
                    type="textarea"
                    label="Descripción"
                    
                    class="q-mb-md"
                  />
                  <q-separator spaced/>
               
                
                  <q-input
                  v-model="colegiarse.comoTitulo"
                  filled
                  label="Título: ¿Cómo colegiarse?"
                  class="q-mb-xs"
                />
                <q-input
                    v-model="colegiarse.procedimiento"
                    filled
                    type="textarea"
                    label="Procedimiento"
                    autogrow
                    class="q-mb-md"
                  />
                  <div class="q-mb-md">
                    <q-input
                      v-model="colegiarse.linkInscripcion"
                      filled
                      label="Link de Inscripción"
                      class="q-mb-sm"
                    />
                  </div>
                <q-separator spaced/>
                <q-input
                    v-model="colegiarse.infoPreviaTitulo"
                    filled
                    label="Título: Información previa a ingreso a formulario de inscripción a COLMED"
                    class="q-mb-xs"
                  />
                
                <q-input
                    v-model="colegiarse.documentos"
                    filled
                    type="textarea"
                    label="Documentos e información"
                    
                    class="q-mb-md"
                  />

                <q-separator spaced />
                <q-input
                  v-model="colegiarse.medicosChileTitulo"
                  filled
                  label="Título: Médicos titulados en Chile deberán adjuntar:"
                  class="q-mb-xs"
                />
                <q-input
                  v-model="colegiarse.medicosChileContenido"
                  filled
                  type="textarea"
                  label="Contenido"
                  autogrow
                  class="q-mb-md"
                />
                
                <q-separator spaced/>
                <!-- Sección: Médicos titulados en el extranjero -->

                <q-input
                    v-model="colegiarse.medicosExtranjeroTitulo"
                    filled
                    label="Título: Médicos titulados en el extranjero deberán adjuntar:"
                    class="q-mb-xs"
                  />
                  <q-input
                  v-model="colegiarse.medicosExtranjeroContenido"
                  filled
                  type="textarea"
                  label="Contenido"
                  
                  class="q-mb-md"
                />

                <div
                  class="text-h6 text-overline text-primary q-mb-xs q-pt-md"
                >
                  IMPORTANTE
                </div>
                <div
                  class="text-subtitle1 text-weight-light text-primary text-justify q-pr-md"
                >
                  La inscripción en el Colegio Médico de Chile y en sus
                  instituciones asociadas (FALMED y Club Médico de Santiago)
                  se produce al ser aprobada por la Mesa Directiva Nacional y
                  otorgado el número de colegiado, le llegará un correo
                  informativo al final confirmando su inscripción.
                </div>
                <div
                  class="text-subtitle1 text-weight-light text-primary q-pb-md"
                >
                  Para cualquier duda respecto a la documentación, le
                  recomendamos contactarnos a inscripciones@colegiomedico.cl
                </div>
                <!------------------------------------------------->
                <q-separator spaced />

                <!-- Sección: ¿Qué hace el Colegio Médico? -->

                <q-input
                v-model="colegiarse.queHaceTitulo"
                filled
                label="Título: ¿Qué hace el Colegio Médico?"
                class="q-mb-xs"
              />

              <q-input
                  v-model="colegiarse.queHaceContenido"
                  filled
                  type="textarea"
                  label="Contenido"
                  autogrow
                  class="q-mb-md"
                />


                <q-separator spaced />

                <!-- Sección: ¿Por qué colegiarse? -->
                <q-input
                    v-model="colegiarse.porqueTitulo"
                    filled
                    label="Título: ¿Por qué colegiarse?"
                    class="q-mb-xs"
                  />

                  <q-input
                  v-model="colegiarse.porqueContenido"
                  filled
                  type="textarea"
                  label="Contenido"
                  autogrow
                  class="q-mb-md"
                />

                <q-separator spaced/>
                <!-- Sección: Deberes y derechos asociados -->
                <q-input
                    v-model="colegiarse.deberesTitulo"
                    filled
                    label="Título: Deberes y derechos asociados"                    
                    class="q-mb-xs text-h6"
                  />
                  <div
                  class="text-h6 text-overline text-primary q-mb-xs q-pt-md"
                >
                  Deberes
                </div>
                  <q-input
                  v-model="colegiarse.deberesContenido"
                  filled
                  type="textarea"
                  label="Contenido"
                  autogrow
                  class="q-mb-md"
                />
                <div class="text-h6 text-overline text-primary">Derechos</div>
                <q-input
                  v-model="colegiarse.derechosContenido"
                  filled
                  type="textarea"
                  label="Contenido"
                  autogrow
                  class="q-mb-md"
                />

                <q-btn
                  label="Guardar cambios en 'Cómo Colegiarse'"
                  color="primary"
                  unelevated
                  rounded
                  no-caps
                  @click="saveInformacionColegiarse"
                />
                
              </q-tab-panel>


              <q-tab-panel name="casa_medico">
                <div class="text-h4 text-primary q-mb-md">
                  Nuestra Casa del Médico
                </div>
                <!-- <div class="text-subtitle1 text-weight-light text-primary">
                  Nuestra sede regional cuenta con habitaciones para
                  colegiados, ubicada en Manuel Montt #69, media cuadra de la
                  Plaza de Armas, Coyhaique.
                </div> -->
                <div class="text-subtitle1 text-weight-light text-primary q-pb-md">
                  <q-input
                    v-model="casa_medico.descripcion"
                    filled
                    label="Descripción general"
                    type="textarea"
                  />
                </div>
                <q-separator spaced />
                <q-card flat>
                  <q-card-section>
                    <div class="text-h5 text-primary q-mb-sm">Habitaciones</div>
                    <div
                      v-for="(habitacion, idx) in casa_medico.habitaciones"
                      :key="idx"
                      class="q-pa-sm q-mb-md"
                      style="border: 1px solid #ccc; border-radius: 8px;"
                    >
                      <q-input
                        v-model="casa_medico.habitaciones[idx].nombre"
                        filled
                        label="Nombre de la habitación"
                        class="q-mb-sm"
                      />
                      <q-input
                        v-model="casa_medico.habitaciones[idx].descripcion"
                        filled
                        type="textarea"
                        label="Descripción"
                        autogrow
                        class="q-mb-sm"
                      />
                      <q-btn
                        label="Eliminar habitación"
                        color="negative"
                        flat
                        @click="removeHabitacion(idx)"
                      />
                    </div>
                    
                    <q-btn
                      label="Agregar habitación"
                      flat
                      color="primary"
                      class="q-mt-xs"
                      @click="addHabitacion"
                    />
                    <q-separator spaced/>
                    <div class="text-h5 text-primary q-mb-sm">
                      Detalles adicionales
                    </div>
                    <q-input
                        v-model="casa_medico.detalles"
                        filled
                        label="Detalles"
                        autogrow=""
                        type="textarea"
                      />
                    
                  </q-card-section>

                  <q-separator />
                 
                  <q-btn
                    label="Guardar cambios en 'Casa del médico'"
                    no-caps
                    rounded
                    color="primary"
                    unelevated
                    class="q-mt-md"
                    @click="saveCasaMedico"
                  />
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
  import dayjs from "dayjs";
  import customParseFormat from "dayjs/plugin/customParseFormat";
  import { useUserStore } from "src/stores/authStore";
  import { useQuasar } from "quasar";
  import { useServicioStore } from "src/stores/servicios";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const userStore = useUserStore();
  const servicioStore = useServicioStore();
  // Responsive tracking
  const $q = useQuasar();
  const isLargeScreen = computed(() => {
    return $q.screen.gt.md;
  });

  const computedLimits = computed(() => {
    return isLargeScreen.value ? [15, 30] : [28, 28];
  });
  const splitterModel = ref(isLargeScreen.value ? 15 : 28);
  const userProfile = computed(() => userStore.user);
  const pagos = computed(() => servicioStore.info_pagos || {});
  const colegiarse = computed(() => servicioStore.info_colegiarse || {});
  const casa_medico = computed(() => servicioStore.info_casa_medico || {});
  const loading = computed(() => servicioStore.loading || false);

// const tab = ref(categoriaSomos.value || "mision");
// const tab = computed(() => categoriaSomos.value || "mision");
const tab = computed({
  get() {
    return servicioStore.pagina_servicio || "pagos";
  },
  set(value) {
    servicioStore.pagina_servicio = value;
  },
});

const seccion = ref("");

const informacion_reafiliacion = ref({
  titulo: "Detalles para reafiliación",
  descripcion:
    "Quien hubiera sido desafiliado por renuncia podrá reincorporarse por una sola vez y ésta deberá aprobarse en el Consejo Regional correspondiente y en la Mesa Directiva Nacional por la mayoría de los miembros en ejercicio. Quien hubiera perdido su calidad de afiliado por no cancelar las cuotas sociales durante doce meses consecutivos, sólo podrá reafiliarse por dos veces. Si quisiera reincorporarse por tercera vez a la Orden, deberá ser autorizado por la Mesa Directiva Nacional, por la mayoría absoluta de sus miembros en ejercicio.",
});

const informacion_de_pagos = ref({
  titulo: "Cuota del Colegio Médico de Chile",
  subtitulo: "Conoce el pago de tus cuotas",
  descripcion_general:
    "La cuota social del Colegio Médico de Chile se distribuye para el Consejo Nacional y los Consejos Regionales. El dinero recaudado se ocupa para la ejecución de toda la actividad gremial que desarrolla la Mesa Directiva Nacional, los nueve departamentos, las tres agrupaciones, los médicos mayores, las viudas de médicos y las cuatro comisiones. Además, del trabajo de los 20 Regionales, distribuidos a lo largo del país.",
  detalle_cuotas:
    "A continuación entregamos un desglose según el tramo en el que te encuentras.",
  notas: [
    "Para nuevos colegiados. Aprobadas en Asamblea General de Puerto Chacabuco, junio 2018.",
  ],
});

const lista_cuotas = ref([
  {
    tipo_cuota: "CUOTA ENTERA",
    descripcion:
      "Médicos de más de 9 años, paga el 100% de los componentes de la cuota ordinaria, especial y regional.",
  },
  {
    tipo_cuota: "CUOTA JOVEN",
    descripcion:
      "Médicos de entre 0 y 8, 11 meses y 29 días, paga el 50% de los componentes de la cuota ordinaria, especial y regional.",
  },
  {
    tipo_cuota: "CUOTA APS",
    descripcion:
      "Médicos que cumplidos los 9 años, trabajen un mínimo de 33 horas en APS o equivalente, sin consideración al tipo de contrato, paga el 75% de los componentes de la cuota ordinaria, especial y regional.",
  },
]);

const selectedValoresCuotas = ref([]);
const selectedValoresFSG = ref([]);
const selectedValoresReafiliacion = ref([]);

const columns = [
  {
    name: "name",
    required: true,
    label: "Tipo de Cuota",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "cuota",
    align: "center",
    label: "Cuota",
    field: "cuota",
    sortable: true,
  },
  { name: "fsg", label: "FSG", field: "fsg", sortable: true, align: "center" },
  {
    name: "cuota_fsg",
    label: "Cuota + FSG",
    field: "cuota_fsg",
    align: "center",
  },
  { name: "falmed", label: "Falmed", field: "falmed", align: "center" },
];

const rows = ref([
  {
    name: "Cuota entera (+ 9 años)",
    cuota: "$52.104",
    fsg: "$24.148",
    cuota_fsg: "$76.252",
    falmed: "$30.320",
  },
  {
    name: "Cuota entera (3 - 9 años)",
    cuota: "$48.418",
    fsg: "$19.711",
    cuota_fsg: "$68.129",
    falmed: "$30.320",
  },
  {
    name: "Cuota Media Joven",
    cuota: "$26.052",
    fsg: "$12.074",
    cuota_fsg: "$38.126",
    falmed: "$15.160",
  },
  {
    name: "Cuota APS",
    cuota: "$39.078",
    fsg: "$18.111",
    cuota_fsg: "$57.189",
    falmed: "$15.160",
  },
]);

const columns_fsg = [
  {
    name: "name",
    required: true,
    label: "Tipo de Cuota",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "cuota",
    align: "center",
    label: "Cuota",
    field: "cuota",
    sortable: true,
  },
];

const rows_fsg = ref([
  {
    name: "Cuota Entera (+ 9 años)",
    cuota: "$24.148",
  },
  {
    name: "Cuota Entera (3 - 9 años)",
    cuota: "$19.711",
  },
  {
    name: "Cuota Media Joven",
    cuota: "$12.074",
  },
  {
    name: "Media por edad",
    cuota: "$12.074",
  },
  {
    name: "APS",
    cuota: "$15.160",
  },
]);

const columns_reafiliacion = [
  {
    name: "name",
    required: true,
    label: "Años desafiliados",
    align: "left",
    field: (row) => row.name,
  },
  {
    name: "cuota",
    align: "center",
    label: "Valor reafiliación",
    field: "cuota",
  },
];

const rows_reafiliacion = ref([
  {
    name: "1",
    cuota: "$74.352",
  },
  {
    name: "2",
    cuota: "$89.222",
  },
  {
    name: "3",
    cuota: "$104.092",
  },
  {
    name: "4",
    cuota: "$118.963",
  },
  {
    name: "5",
    cuota: "$133.833",
  },
  {
    name: "6 o más",
    cuota: "$148.703",
  },
]);

  // Variables para el diálogo de detalles
  const exportDataDialog = ref(false);
  
  dayjs.extend(customParseFormat);
  
  const informacion_pagos = ref({
    titulo: "Cuota del Colegio Médico de Chile",
    subtitulo: "Conoce el pago de tus cuotas",
    descripcion_general:
      "La cuota social del Colegio Médico de Chile se distribuye para el Consejo Nacional y los Consejos Regionales. El dinero recaudado se ocupa para la ejecución de toda la actividad gremial que desarrolla la Mesa Directiva Nacional, los nueve departamentos, las tres agrupaciones, los médicos mayores, las viudas de médicos y las cuatro comisiones. Además, del trabajo de los 20 Regionales, distribuidos a lo largo del país.",
    detalle_cuotas:
      "A continuación entregamos un desglose según el tramo en el que te encuentras.",
    notas: [
      "Para nuevos colegiados. Aprobadas en Asamblea General de Puerto Chacabuco, junio 2018."
    ],
  });


    // Funciones para editar las notas
  const addNota = () => {
    if (!Array.isArray(pagos.value.notas)) {
      pagos.value.notas = []
    }
    pagos.value.notas.push("(*) ");
  };

  const removeNota = (index) => {
    pagos.value.notas.splice(index, 1);
  };
  const saveInformacionPagos = async () => {
    selectedValoresCuotas.value = [];
    selectedValoresFSG.value = [];
    selectedValoresReafiliacion.value = [];

    await servicioStore.saveInformacionPagos(pagos.value);
  };

  const addTipoCuota = () => {
    if (!Array.isArray(pagos.value.tipos_cuotas)) {
      pagos.value.tipos_cuotas = []
    }
    pagos.value.tipos_cuotas.push({ tipo_cuota: '', descripcion: '' });
  };
  const removeTipoCuota = (idx) => {
    pagos.value.tipos_cuotas.splice(idx, 1);
  };

  const addRowValorCuota = async () => {
    selectedValoresCuotas.value = [];
    if (!Array.isArray(pagos.value.valores_cuotas)){
      pagos.value.valores_cuotas = []
    }
    pagos.value.valores_cuotas.push({
      name: "",
      cuota: "",
      fsg: "",
      cuota_fsg: "",
      falmed: "",
    })
  };
  const removeRowValorCuota = () => {
    const valoresAEliminar = new Set(
        selectedValoresCuotas.value.map(obj => JSON.stringify(obj))
    );

    pagos.value.valores_cuotas = pagos.value.valores_cuotas.filter(cuota => 
      !valoresAEliminar.has(JSON.stringify(cuota))
    );
    selectedValoresCuotas.value = [];
  };
  
  const addRowFSG = async () => {
    selectedValoresFSG.value = [];
    if (!Array.isArray(pagos.value.detalle_fsg)){
      pagos.value.detalle_fsg = []
    }
    pagos.value.detalle_fsg.push({
      name: "",
      cuota: "",
    })
  };
  const removeRowFSG = () => {
    const valoresAEliminar = new Set(
        selectedValoresFSG.value.map(obj => JSON.stringify(obj))
    );

    pagos.value.detalle_fsg = pagos.value.detalle_fsg.filter(valorFSG => 
      !valoresAEliminar.has(JSON.stringify(valorFSG))
    );
    selectedValoresFSG.value = [];
  };

  const addRowReafiliacion = async () => {
    selectedValoresReafiliacion.value = [];
    if (!Array.isArray(pagos.value.valores_reafiliacion)){
      pagos.value.valores_reafiliacion = []
    }
    pagos.value.valores_reafiliacion.push({
      name: "",
      cuota: "",
    });
  };
  const removeRowReafiliacion = () => {
    const valoresAEliminar = new Set(
        selectedValoresReafiliacion.value.map(obj => JSON.stringify(obj))
    );

    pagos.value.valores_reafiliacion = pagos.value.valores_reafiliacion.filter(valorReafiliacion => 
      !valoresAEliminar.has(JSON.stringify(valorReafiliacion))
    );
    selectedValoresReafiliacion.value = [];
  };

  // const informacion_colegiarse = ref({
  //   quienes:
  //     "Quienes cuenten con su correspondiente título de médico o médica cirujano y estén inscritos en el registro de prestadores individuales de la Superintendencia de Salud; y no cuenten con sanciones éticas. Pueden colegiarse médicos titulados en Chile o en el extranjero. Estos últimos, deben contar también con el reconocimiento o validación de su título en Chile de acuerdo a la vía que corresponda.",
  //   como:
  //     "El trámite de colegiatura se realiza de manera online, ingresando a Inscripción Colegio Médico.",
  //   documentos:
  //     "Antes de comenzar su registro en línea, se recomienda contar con los siguientes documentos: Certificado de título, cédula de identidad, foto personal, y en el caso de médicos extranjeros, la validación o reconocimiento de título.",
  //   linkInscripcion: "https://inscripcioncolmed.colegiomedico.cl"
  // });

  const informacion_colegiarse = ref({
  quienes: "Quienes cuenten con su correspondiente título de médico o médica cirujano y estén inscritos en el registro de prestadores individuales de la Superintendencia de Salud; y no cuenten con sanciones éticas. Pueden colegiarse médicos titulados en Chile o en el extranjero. Estos últimos, deben contar también con el reconocimiento o validación de su título en Chile de acuerdo a la vía que corresponda.",
  quienesTitulo: "¿Quiénes pueden colegiarse?",
  como: "El trámite de colegiatura se realiza de manera online, ingresando a Inscripción Colegio Médico.",
  comoTitulo: "¿Cómo colegiarse?",
  documentos: "Antes de comenzar su registro en línea en el Colegio Médico, le invitamos a conocer los documentos que serán solicitados durante el proceso, de manera que pueda tenerlos todos previamente y así completar de manera más fácil, rápida y eficiente la solicitud. Estos deberán ser subidos en formato JPG , PNG o PDF y no deben exceder los 5MB de peso.",
  linkInscripcion: "https://inscripcioncolmed.colegiomedico.cl",
  // Nuevos campos para editar los títulos y contenidos de los apartados adicionales:
  infoPreviaTitulo: "INFORMACIÓN PREVIA A INGRESO A FORMULARIO DE INSCRIPCIÓN A COLMED",
  infoPreviaDescripcion: "Antes de comenzar su inscripción en línea, se recomienda contar con los documentos solicitados para facilitar el proceso.",
  medicosChileTitulo: "MÉDICOS TITULADOS EN CHILE DEBERÁN ADJUNTAR:",
  medicosChileContenido: "1. Certificado de título de médico cirujano o Certificado de inscripción en el Registro Nacional de Prestadores Individuales de la Superintendencia de Salud.\n2. Cédula de identidad por ambos lados.\n3. Foto personal tipo perfil.",
  medicosExtranjeroTitulo: "MÉDICOS TITULADOS EN EL EXTRANJERO DEBERÁN ADJUNTAR:",
  medicosExtranjeroContenido: "1. Título de Médico o Médico Cirujano del país de origen.\n2. Reconocimiento o validación del título en Chile (certificado de revalidación, Eunacom, Conacem, etc.).",
  queHaceTitulo: "¿Qué hace el Colegio Médico?",
  queHaceContenido: "- Es la organización médica del país, que agrupa a más de 28 mil profesionales, con presencia en todo Chile.\n- Vela por el buen ejercicio profesional, con altos estándares éticos.\n- Se preocupa por los derechos y condiciones laborales de los médicos.\n- Es la voz de los profesionales en los debates de políticas sanitarias.",
  porqueTitulo: "¿Por qué colegiarse?",
  porqueContenido: "- Para contar con protección y defensa de los derechos laborales tanto en el ámbito público como privado.\n- Para participar en la toma de decisiones que afectan la salud pública.\n- Para ser parte de una red de apoyo y beneficios.",
  deberesTitulo: "Deberes y derechos asociados",
  deberesContenido: "- Respetar los reglamentos internos, estatutos y el código de ética del Colegio Médico.\n- Derechos: Participar en la definición de lineamientos, obtener apoyo gremial y recibir beneficios establecidos.",
  derechosContenido: "- Deberes: Respetar los reglamentos internos, estatutos y el código de ética del Colegio Médico.\n- Derechos: Participar en la definición de lineamientos, obtener apoyo gremial y recibir beneficios establecidos."
});

 const saveInformacionColegiarse = async () => {
    await servicioStore.saveInformacionColegiarse(colegiarse.value);
  };

  // const casa_medico = ref({
  //   descripcion:
  //     "Nuestra sede regional cuenta con habitaciones para colegiados, ubicada en Manuel Montt #69, media cuadra de la Plaza de Armas, Coyhaique.",
  //   habitaciones: [
  //     {
  //       nombre: "Habitación 1",
  //       descripcion: "Dos camas de plaza y media. Valor de $25.000 por persona."
  //     },
  //     {
  //       nombre: "Habitación 2",
  //       descripcion: "Cama matrimonial. Valor de $35.000."
  //     },
  //     {
  //       nombre: "Habitación 3",
  //       descripcion: "Cama de plaza y media. Valor de $25.000."
  //     }
  //   ],
  //   // Detalles adicionales, por ejemplo: cocina, baño, etc.
  // detalles: [
  //   "Cocina, living-comedor compartido",
  //   "Baño compartido",
  //   "No incluye desayuno"
  // ]
  // });


  const addHabitacion = () => {

    if (!Array.isArray(casa_medico.value.habitaciones)) {
      casa_medico.value.habitaciones = []
    }
    casa_medico.value.habitaciones.push({
      nombre: "",
      descripcion: ""
    }); 
  };


  const removeHabitacion = (idx) => {
    casa_medico.value.habitaciones.splice(idx, 1);
  };

  const addDetalle = () => {    
    if (!Array.isArray(casa_medico.value.detalles)) {
      casa_medico.value.detalles = []
    }
    casa_medico.value.detalles.push("");
  };
  const removeDetalle = (index) => {
    casa_medico.value.detalles.splice(index, 1);
  };

  const saveCasaMedico = async () => {
    await servicioStore.saveInformacionCasaMedico(casa_medico.value);
  };

  onMounted(async () => {
   // Verificar el estado de la conexión a internet
    if (!userProfile.value) {
      console.warn("Usuario no autenticado. Redirigiendo a login...");
      router.push("/login");
    }
    seccion.value = " - Pagos"
    await servicioStore.fetchPagos();

    seccion.value = " - Cómo Colegiarse"
    await servicioStore.fetchColegiarse();

    seccion.value = " - Casa del Médico"
    
    await servicioStore.fetchCasaMedico();
  });

  </script>
  <style lang="sass">

  </style>
  