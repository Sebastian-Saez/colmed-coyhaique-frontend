<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <!-- Header con logo y perfil de usuario -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-btn flat @click="goHome">
        <img
          src="~assets/LogoCOLMEDAYSEN_letras_blancas.png"
          alt="Colegio Médico Logo"
          style="width: 204px; height: 82px"
          class="q-mr-sm"
        />
      </q-btn>
      <q-separator dark vertical inset />
      <q-space />

      <q-card flat class="bg-primary">
        <q-card-section class="bg-primary text-white">
          <div class="text-subtitle1 text-weight-medium">
            {{ userProfile.first_name + " " + userProfile.last_name }}
          </div>
          <div class="text-overline text-weight-medium">
            Tipo perfil: {{ perfilActual }}
          </div>
        </q-card-section>
      </q-card>
      <q-separator dark vertical inset />
      <q-btn-dropdown
        no-caps
        stretch
        flat
        icon="switch_account"
        label="Cambiar perfil"
      >
        <q-list>
          <q-item
            v-for="val in perfiles"
            :key="val.clave"
            clickable
            @click="changeProfile(val)"
          >
            <q-item-section>
              <div class="text-overline">
                {{ val.tipo_perfil }}
              </div></q-item-section
            >
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-separator dark vertical />
      <q-btn stretch flat no-caps @click="logout" icon="logout">
        <q-tooltip> Cerrar sesión </q-tooltip>
      </q-btn>
      <!-- <q-separator dark vertical inset />
      <q-btn
        no-caps
        stretch
        flat
        @click="logout"
        icon="logout"
        label="Cerrar sesión"
      /> -->
    </q-toolbar>
    <!-- <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        
        <q-btn flat @click="goHome">
          <img
            src="~assets/LogoCOLMEDAYSEN_letras_blancas.png"
            alt="Colegio Médico Logo"
            style="width: 204px; height: 82px"
          />
        </q-btn>
        
        <div class="q-mr-md q-ml-auto row items-center">
          Usuario:
          <span class="q-ml-xs text-bold">{{
            userProfile.first_name + " " + userProfile.last_name
          }}</span>

          
          <q-separator vertical inset class="q-mx-md" />

          Tipo perfil:
          <span class="q-ml-xs text-bold">
            {{ formattedProfile }}
          </span>
        </div>
        <q-btn no-caps flat icon="switch_account" label="Cambiar perfil" />
        
        <q-btn
          no-caps
          flat
          @click="logout"
          icon="logout"
          label="Cerrar sesión"
        />
      </q-toolbar>
    </q-header> -->

    <!-- Page Container -->
    <q-page-container>
      <!-- Contenido Principal -->
      <q-page class="q-pa-md">
        <!-- Spinner de carga -->
        <!-- <div v-if="!loading" class="text-center q-my-lg">
          <q-spinner-dots size="50px" color="primary" />
          <p class="q-mt-md">Cargando datos...</p>
        </div> -->
        <q-inner-loading :showing="!loading">
          <div class="text-overline">Cargando datos...</div>
          <q-spinner-dots color="primary" size="2em"
        /></q-inner-loading>

        <!-- Tabla de Médicos -->
        <div v-if="loading">
          <q-card flat class="q-pa-sm bg-grey-2">
            <q-splitter
              v-model="splitterModel"
              unit="px"
              style="height: calc(100vh - 56px)"
              :limits="[280, 280]"
            >
              <template v-slot:before>
                <div class="q-pa-md" :style="{ width: '280px' }">
                  <div class="row items-center justify-between q-mb">
                    <div class="text-h6">Filtros</div>
                  </div>
                  <q-separator />
                  <!-- Filtro por Entidad -->
                  <div class="q-pt-sm text-subtitle1">Entidad:</div>
                  <q-select
                    v-model="selectedEntidad"
                    :options="entidadOptions"
                    outlined
                    dense
                    class="q-mb-md"
                  />

                  <!-- Filtro por Estado de Pago (multiple) -->
                  <div class="text-subtitle1">Estado de pago:</div>
                  <q-select
                    v-model="selectedEstadosPago"
                    :options="estadoPagoOptions"
                    outlined
                    dense
                    use-chips
                    multiple
                    class="q-mb-md"
                    :disable="
                      !(selectedEntidad && selectedEntidad.value === 'Colmed')
                    "
                    option-value="value"
                    option-label="label"
                    @update:model-value="onEstadosPagoChange"
                  />

                  <!-- Filtro por Estado de Afiliación (multiple) -->
                  <!-- <q-select
                    v-model="selectedEstadoAfiliacion"
                    :options="estadoAfiliacionOptions"
                    :disable="
                      !(selectedEntidad && selectedEntidad.value === 'Colmed')
                    "
                    label="Estados de Afiliación"
                    outlined
                    dense
                    use-chips
                    multiple
                    class="q-mb-md"
                  /> -->
                  <div class="text-subtitle1">Fecha de nacimiento:</div>
                  <div class="row q-gutter-md q-mb-md">
                    <div class="col">
                      <q-input
                        dense
                        label="Desde"
                        v-model="startDateBirthdate"
                        mask="##-##-####"
                        @update:modelValue="onStartDateBirthChange"
                        bottom-slots
                        :error="!errorStartDateBirth.valor"
                      >
                        <template v-slot:error>
                          {{ errorStartDateBirth.mensaje }}
                        </template>
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="startDateBirthdate"
                                mask="DD-MM-YYYY"
                                @update:modelValue="onStartDateBirthChange"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Ok"
                                    color="primary"
                                    flat
                                    @click="filterData"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>

                    <div class="col">
                      <q-input
                        dense
                        label="Hasta"
                        v-model="endDateBirthdate"
                        mask="##-##-####"
                        @update:modelValue="onEndDateBirthChange"
                        bottom-slots
                        :error="!errorEndDateBirth.valor"
                      >
                        <template v-slot:error>
                          {{ errorEndDateBirth.mensaje }}
                        </template>
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="endDateBirthdate"
                                @update:modelValue="onEndDateBirthChange"
                                mask="DD-MM-YYYY"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Ok"
                                    color="primary"
                                    flat
                                    @click="filterData"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="text-subtitle1">Fecha de título:</div>
                  <div class="row q-gutter-md q-mb-md">
                    <div class="col">
                      <q-input
                        dense
                        label="Desde"
                        v-model="startDateTitle"
                        mask="##-##-####"
                        @update:modelValue="onStartDateTitleChange"
                        bottom-slots
                        :error="!errorStartDateTitle.valor"
                      >
                        <template v-slot:error>
                          {{ errorStartDateTitle.mensaje }}
                        </template>
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="startDateTitle"
                                @update:modelValue="onStartDateTitleChange"
                                mask="DD-MM-YYYY"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Ok"
                                    color="primary"
                                    flat
                                    @click="filterData"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>

                    <div class="col">
                      <q-input
                        dense
                        label="Hasta"
                        v-model="endDateTitle"
                        mask="##-##-####"
                        @update:modelValue="onEndDateTitleChange"
                        bottom-slots
                        :error="!errorEndDateTitle.valor"
                      >
                        <template v-slot:error>
                          {{ errorEndDateTitle.mensaje }}
                        </template>
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="endDateTitle"
                                mask="DD-MM-YYYY"
                                @update:modelValue="onEndDateTitleChange"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Ok"
                                    color="primary"
                                    flat
                                    @click="filterData"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="row justify-end">
                    <!-- <q-btn
                      color="primary "
                      label="Filtrar"
                      no-caps
                      @click="filterData"
                    /> -->
                    <q-btn
                      v-if="
                        selectedEntidad ||
                        selectedEstadosPago.length ||
                        startDateBirthdate ||
                        startDateTitle ||
                        endDateBirthdate ||
                        endDateTitle
                      "
                      class="q-ml-sm"
                      color="warning"
                      label="Limpiar filtros"
                      no-caps
                      @click="clearFilter"
                    />
                  </div>
                </div>
              </template>

              <template v-slot:after>
                <div class="q-pa-sm">
                  <q-table
                    :rows="medicos"
                    :columns="columns"
                    row-key="rut"
                    :filter="filter"
                    v-model:pagination="pagination"
                    :rows-per-page-options="[6, 18, 60]"
                    grid
                    title="Lista de médicos"
                  >
                    <template v-slot:top-right>
                      <!-- Input de búsqueda alineado a la derecha -->
                      <q-input
                        v-model="filter"
                        debounce="300"
                        placeholder="Buscar..."
                        outlined
                        dense
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                    <template v-slot:item="props">
                      <div
                        class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-4 grid-style-transition"
                      >
                        <q-card
                          bordered
                          flat
                          style="border-radius: 5%"
                          class="bg-grey-3"
                        >
                          <q-list dense>
                            <q-item
                              v-for="col in props.cols.filter(
                                (col) => col.name !== 'acciones'
                              )"
                              :key="col.name"
                            >
                              <q-item-section class="flex flex-column">
                                <q-item-label caption class="text-bold"
                                  >{{ col.label }}:</q-item-label
                                >
                                <q-item-label>{{ col.value }}</q-item-label>
                              </q-item-section>
                            </q-item>
                            <!-- Mostrar botón "Ver detalle" para la columna "acciones" -->
                            <q-item
                              v-if="
                                props.cols.some(
                                  (col) => col.name === 'acciones'
                                )
                              "
                            >
                              <q-item-section>
                                <q-btn
                                  label="Ver detalle"
                                  color="primary"
                                  flat
                                  icon="info"
                                  no-caps
                                  @click="openDetailsDialog(props.row)"
                                />
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card>
                      </div>
                    </template>
                  </q-table>
                </div>
              </template>
            </q-splitter>
          </q-card>
        </div>
        <q-dialog v-model="detailsDialog" persistent>
          <q-card style="min-width: 800px; border-radius: 20px">
            <q-card-section>
              <div class="text-h4">Detalles del Médico</div>
            </q-card-section>

            <q-separator />

            <q-card-section class="text-primary bg-grey-2">
              <div>
                <p>
                  <strong>Nombre:</strong> {{ selectedMedico.user.first_name }}
                  {{ selectedMedico.user.last_name }}
                </p>
                <p><strong>RUT:</strong> {{ selectedMedico.rut }}</p>
                <p><strong>ICM:</strong> {{ selectedMedico.icm }}</p>
                <p>
                  <strong>Fecha de Nacimiento:</strong>
                  {{ selectedMedico.fecha_nacimiento }}
                </p>
                <p>
                  <strong>Fecha de Título:</strong>
                  {{ selectedMedico.fecha_titulo }}
                </p>
                <p>
                  <strong>Condición Vital:</strong>
                  {{ selectedMedico.condicion_vital }}
                </p>
                <p>
                  <strong>Dirección:</strong> {{ selectedMedico.direccion }}
                </p>
                <p><strong>Comuna:</strong> {{ selectedMedico.comuna }}</p>
                <!-- Agrega más campos según sea necesario -->
                <q-separator />
                <div class="text-h5">Detalle Colegio Médico</div>
                <q-list bordered v-if="afiliaciones.length">
                  <q-expansion-item
                    v-for="afiliacion in afiliaciones"
                    :key="afiliacion.id"
                    group="somegroup"
                    :label="afiliacion.entidad.nombre_entidad"
                    :default-opened="afiliacion.entidad.sigla === 'COLMED'"
                    header-class="bg-light-blue-10 text-white"
                  >
                    <q-card>
                      <q-card-section>
                        <p>
                          <strong>Condición:</strong>
                          {{ afiliacion.condicion_afiliado }}
                        </p>
                        <p>
                          <strong>Fecha inscripción:</strong>
                          {{ afiliacion.fecha_inscripcion }}
                        </p>
                        <p>
                          <strong>Estamento:</strong>
                          {{ afiliacion.estamento.nombre_estamento }} - Cod:
                          {{ afiliacion.estamento.codigo_estamento }}
                        </p>
                        <p>
                          <strong>Estado pago:</strong>
                          {{ afiliacion.estado_pago }}
                        </p>
                        <p>
                          <strong>Última cuota:</strong>
                          {{ afiliacion.mes_ucp }} / {{ afiliacion.anio_ucp }}
                        </p>
                        <p>
                          <strong>Nº última cuota:</strong>
                          {{ afiliacion.num_ultima_cuota }}
                        </p>
                        <p>
                          <strong>Tipo de cuota:</strong>
                          {{ afiliacion.tipo_cuota }}
                        </p>
                        <p>
                          <strong>Lugar de descuento:</strong>
                          {{ afiliacion.lugar_descuento.nombre_lugar }}
                        </p>
                      </q-card-section>
                      <q-separator />
                    </q-card>
                  </q-expansion-item>
                </q-list>
                <div v-else class="text-h6">No Colegiado</div>
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cerrar" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useUserStore } from "src/stores/authStore";
import { useMedicoStore } from "src/stores/medicos";
import { useInformacionesStore } from "src/stores/informaciones";

const router = useRouter();
const userStore = useUserStore();
const medicoStore = useMedicoStore();
const informacionStore = useInformacionesStore();
const splitterModel = ref(280);

const medicos = computed(() => medicoStore.medicos);
const afiliaciones = computed(() => medicoStore.afiliaciones);
const filter = ref("");
const loading = computed(() => medicoStore.loading);

// Recuperar el perfil del usuario
const userProfile = computed(() => userStore.user);
const perfiles = computed(() => userStore.profiles);
const perfilActual = computed(() => userStore.opcion_profile);

// Función para formatear el perfil a mostrar (sin cambios)
const formattedProfile = computed(() => {
  const perfil = perfiles.value[0].tipo_perfil;
  switch (perfil) {
    case "admin_colmed":
      return "Administrador Colmed";
    case "admin_noticias":
      return "Administrador Noticias";
    case "admin_tic":
      return "Gestor Informático";
    default:
      return null; // No mostrar nada para el perfil "visitante"
  }
});

dayjs.extend(customParseFormat);

const pagination = ref({
  page: 1,
  rowsPerPage: 6,
});

// Variables para el diálogo de detalles
const detailsDialog = ref(false);
const selectedMedico = ref(null);

// Opciones para los filtros
const entidadOptions = [
  { label: "Todos los médicos", value: "Todos los médicos" },
  { label: "Colmed", value: "Colmed" },
  { label: "No Colegiado", value: "No Colegiado" },
];

const estadoPagoOptions = [
  { label: "Todos", value: "todos" },
  { label: "Al día", value: "al_dia" },
  { label: "Moroso", value: "moroso" },
  { label: "Moroso12", value: "moroso12" },
  { label: "Liberado", value: "liberado" },
  { label: "Casado con Médico", value: "casado_medico" },
  { label: "Falmed Senior Liberado", value: "falmed_senior_liberado" },
  { label: "Liberado por Rescate", value: "liberado_rescate" },
  { label: "Liberado Directorio Falmed", value: "liberado_directorio_falmed" },
  { label: "Recién Inscrito", value: "recien_inscrito" },
  { label: "Proceso a Desafiliar", value: "proceso_a_desafiliar" },
];

const estadoAfiliacionOptions = [
  { label: "Todos", value: "todos" },
  { label: "Afiliado", value: "afiliado" },
  { label: "Afiliado Pendiente", value: "afiliado_pendiente" },
  { label: "Condecoración de Honor", value: "condecoracion_honor" },
  { label: "Desafiliado", value: "desafiliado" },
  { label: "Renunciado", value: "renunciado" },
  { label: "Expulsado", value: "expulsado" },
  { label: "Inscripción Rechazada", value: "inscripcion_rechazada" },
  { label: "No Inscrito", value: "no_inscrito" },
  { label: "Reaf. Pend. Aprob. Mesa", value: "reaf_pend_aprob_mesa" },
  {
    label: "Ren. Pend. Aprb. Smrio. Ético",
    value: "reaf_pend_aprob_smrio_etico",
  },
  { label: "Reafiliación Rechazada", value: "reafiliacion_rechazada" },
  { label: "Reinscrito", value: "reinscrito" },
];

// Variables reactivas para almacenar las selecciones y filtros
const selectedEntidad = ref(null);
const selectedEstadosPago = ref([]);
const selectedEstadoAfiliacion = ref(null);
const startDateBirthdate = ref(null);
const endDateBirthdate = ref(null);
const startDateTitle = ref(null);
const endDateTitle = ref(null);

const errorStartDateBirth = ref({
  valor: true,
  mensaje: "",
});
const errorEndDateBirth = ref({
  valor: true,
  mensaje: "",
});
const errorStartDateTitle = ref({
  valor: true,
  mensaje: "",
});
const errorEndDateTitle = ref({
  valor: true,
  mensaje: "",
});

const filtros = {
  fecha_nacimiento_inicio: startDateBirthdate.value,
  fecha_nacimiento_fin: endDateBirthdate.value,
  fecha_titulo_inicio: startDateTitle.value,
  fecha_titulo_fin: endDateTitle.value,
  afiliaciones: [],
  estados: selectedEstadosPago.value,
};

const filterData = async () => {
  filtros.fecha_nacimiento_inicio = startDateBirthdate.value;
  filtros.fecha_nacimiento_fin = endDateBirthdate.value;

  await medicoStore.filterDataMedicos(filtros);
};

watch(selectedEntidad, async (newValue) => {
  medicoStore.limpiarMedicos();
  if (newValue && newValue.value) {
    if (newValue.value === "Todos los médicos") {
      //await medicoStore.fetchMedicos();
      filtros.afiliaciones = null;
      await filterData();
    } else if (newValue.value === "Colmed") {
      filtros.afiliaciones = "colmed";
      //await medicoStore.fetchMedicosConAfiliacion();
      await filterData();
    } else if (newValue.value === "No Colegiado") {
      filtros.afiliaciones = "no_colegiado";
      await filterData();
      //await medicoStore.fetchMedicosSinAfiliacion();
    }
  }
});

// watch(selectedEstadosPago, async (newValues) => {
//   const includesTodos = newValues.some((estado) => estado.value === "todos");

//   // If 'Todos' is selected or no states are selected, you might fetch all medicos or handle accordingly
//   if (includesTodos || newValues.length === 0) {
//     // Fetch all medicos or reset
//     await medicoStore.fetchMedicosConAfiliacion();
//   } else {
//     // Extract the values from the selected options
//     const estadosPagoValues = newValues.map((estado) => estado.value);
//     // Call the store action with the selected payment states
//     await medicoStore.fetchMedicosEstadosPago(estadosPagoValues);
//   }
// });

const clearFilter = async () => {
  startDateBirthdate.value = null;
  startDateTitle.value = null;
  endDateBirthdate.value = null;
  endDateTitle.value = null;
  selectedEntidad.value = null;
  selectedEstadosPago.value = [];
  await medicoStore.fetchMedicos();
};

const onEndDateBirthChange = (newValue) => {
  const fechaValida = validarFecha(newValue);
  if (!fechaValida) {
    errorEndDateBirth.value.valor = false;
    errorEndDateBirth.value.mensaje = "Ingrese una fecha válida";
    return; // Salimos de la función porque no tiene sentido seguir validando
  }

  // Luego, comparamos las fechas
  if (newValue < startDateBirthdate.value) {
    errorEndDateBirth.value.valor = false;
    errorEndDateBirth.value.mensaje =
      "Fecha 'Hasta' no puede ser menor a la fecha 'Desde'";
    return; // Salimos de la función porque ya encontramos un error
  }

  // Si todas las validaciones pasan, no hay error
  errorEndDateBirth.value.valor = true;
  errorEndDateBirth.value.mensaje = "";
  errorStartDateBirth.value.valor = true;
  errorStartDateBirth.value.mensaje = "";
};

const onStartDateBirthChange = (newValue) => {
  const fechaValida = validarFecha(newValue);
  if (!fechaValida) {
    errorStartDateBirth.value.valor = false;
    errorStartDateBirth.value.mensaje = "Ingrese una fecha válida";
    return; // Salimos de la función porque no tiene sentido seguir validando
  }

  // Luego, comparamos las fechas
  if (newValue > endDateBirthdate.value) {
    errorStartDateBirth.value.valor = false;
    errorStartDateBirth.value.mensaje =
      "Fecha 'Desde' no puede ser mayor a la fecha 'Hasta'";
    return; // Salimos de la función porque ya encontramos un error
  }

  // Si todas las validaciones pasan, no hay error
  errorStartDateBirth.value.valor = true;
  errorStartDateBirth.value.mensaje = "";
  errorEndDateBirth.value.valor = true;
  errorEndDateBirth.value.mensaje = "";
  console.log("Fecha válida y menor o igual a la fecha final");
};

const onStartDateTitleChange = (newValue) => {
  const fechaValida = validarFecha(newValue);
  if (!fechaValida) {
    errorStartDateTitle.value.valor = false;
    errorStartDateTitle.value.mensaje = "Ingrese una fecha válida";
    return; // Salimos de la función porque no tiene sentido seguir validando
  }

  // Luego, comparamos las fechas
  if (newValue > endDateTitle.value) {
    errorStartDateTitle.value.valor = false;
    errorStartDateTitle.value.mensaje =
      "Fecha 'Desde' no puede ser mayor a la fecha 'Hasta'";
    return; // Salimos de la función porque ya encontramos un error
  }

  // Si todas las validaciones pasan, no hay error
  errorStartDateTitle.value.valor = true;
  errorStartDateTitle.value.mensaje = "";
  errorEndDateTitle.value.valor = true;
  errorEndDateTitle.value.mensaje = "";
  console.log("Fecha válida y menor o igual a la fecha final");
};

const onEndDateTitleChange = (newValue) => {
  const fechaValida = validarFecha(newValue);
  if (!fechaValida) {
    errorEndDateTitle.value.valor = false;
    errorEndDateTitle.value.mensaje = "Ingrese una fecha válida";
    return; // Salimos de la función porque no tiene sentido seguir validando
  }

  // Luego, comparamos las fechas
  if (newValue < startDateTitle.value) {
    errorEndDateTitle.value.valor = false;
    errorEndDateTitle.value.mensaje =
      "Fecha 'Desde' no puede ser mayor a la fecha 'Hasta'";
    return; // Salimos de la función porque ya encontramos un error
  }

  // Si todas las validaciones pasan, no hay error
  errorEndDateTitle.value.valor = true;
  errorEndDateTitle.value.mensaje = "";
  errorStartDateTitle.value.valor = true;
  errorStartDateTitle.value.mensaje = "";
  console.log("Fecha válida y mayor o igual a la fecha inicial");
};

const onEstadosPagoChange = async (newValues) => {
  const includesTodos = newValues.some((estado) => estado.value === "todos");

  if (includesTodos) {
    // Excluye 'Todos' de los estados de pago y selecciona los demás
    selectedEstadosPago.value = estadoPagoOptions.filter(
      (estado) => estado.value !== "todos"
    );

    // Extrae los valores de los estados de pago seleccionados
    const estadosPagoValues = selectedEstadosPago.value.map(
      (estado) => estado.value
    );
    filtros.estados = estadosPagoValues;
    // Llama a la acción del store con los estados de pago seleccionados
    //await medicoStore.fetchMedicosEstadosPago(estadosPagoValues);
    await filterData();
  } else {
    // Actualiza 'selectedEstadosPago' con los nuevos valores seleccionados
    selectedEstadosPago.value = newValues;

    if (newValues.length === 0) {
      // Si no hay estados seleccionados, obtén todos los médicos con afiliación
      filtros.afiliaciones = "colmed";
      await filterData();
      // await medicoStore.fetchMedicosConAfiliacion();
    } else {
      // Extrae los valores de los estados de pago seleccionados
      const estadosPagoValues = newValues.map((estado) => estado.value);
      filtros.estados = estadosPagoValues;
      await filterData();
      // Llama a la acción del store con los estados de pago seleccionados
      //await medicoStore.fetchMedicosEstadosPago(estadosPagoValues);
    }
  }
};

const validarFecha = (val) => {
  const formato = "DD-MM-YYYY";
  return dayjs(val, formato, true).isValid();
};

// Columnas de la tabla (sin cambios)
const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.user.first_name + " " + row.user.last_name,
    sortable: true,
  },
  { name: "rut", align: "left", label: "RUT", field: "rut", sortable: true },
  {
    name: "telefono",
    align: "left",
    label: "Teléfono",
    field: "contacto",
    format: (val) => (val == "nan" ? "No informado" : val),
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: (row) => (row.user.email ? row.user.email : "No informado"),
    sortable: true,
  },
  {
    name: "icm",
    align: "left",
    label: "ICM",
    field: "icm",
    format: (val) => (val ? val : "No informado"),
    sortable: true,
  },
  {
    name: "registro",
    align: "left",
    label: "Registro Superintendencia",
    field: "registro_superintendencia",
    format: (val) => (val ? val : "No informado"),
    sortable: true,
  },
  {
    name: "plaza",
    align: "left",
    label: "Plaza",
    field: "plaza",
    format: (val) =>
      val ? val.nombre + " - Cod: " + val.codigo : "No informado",
    sortable: true,
  },
  {
    name: "acciones",
    label: "Acción",
    align: "center",
    field: "action",
  },
];

onMounted(async () => {
  await medicoStore.fetchMedicos();
});

// Logout
const logout = () => {
  userStore.logout();
  router.push("/login");
};

// Redirigir a home
const goHome = () => {
  router.push("/home");
};

const changeProfile = async (val) => {
  userStore.changeProfile(val.tipo_perfil);

  switch (val.tipo_perfil) {
    case "admin_colmed":
      await medicoStore.fetchMedicos();
      router.push("/medicos");
      break;
    case "admin_noticias":
      await informacionStore.fetchTodasNoticias();
      router.push("/admin-noticias");
      break;
    case "admin_tic":
      router.push("/admin-tic");
      break;
    default:
      return null; // No mostrar nada para el perfil "visitante"
  }
};

//Método para abrir el diálogo y asignar el médico seleccionado
const openDetailsDialog = async (medico) => {
  await medicoStore.fetchAfiliaciones(medico.id);
  selectedMedico.value = medico;

  if (selectedMedico.value.comuna == "nan" || !selectedMedico.value.comuna)
    selectedMedico.value.comuna = "No informado";
  else selectedMedico.value.comuna = selectedMedico.value.comuna.trim();

  if (
    selectedMedico.value.direccion &&
    (selectedMedico.value.direccion !== "No informado" ||
      selectedMedico.value.direccion !== "nan")
  )
    selectedMedico.value.direccion = selectedMedico.value.direccion.trim();

  if (selectedMedico.value.condicionVital == "nan") {
    selectedMedico.value.condicionVital = "No informado";
  }

  if (selectedMedico.value.user.contacto == "nan") {
    selectedMedico.value.user.contacto = "No informado";
  }

  if (selectedMedico.value.plaza) {
    selectedMedico.value.plaza =
      selectedMedico.value.plaza.nombre +
      " - Cod: " +
      selectedMedico.value.plaza.codigo;
  }

  if (!selectedMedico.value.fecha_nacimiento) {
    selectedMedico.value.fecha_nacimiento = "No informado";
  }

  if (!selectedMedico.value.fecha_titulo) {
    selectedMedico.value.fecha_titulo = "No informado";
  }

  if (!selectedMedico.value.icm) {
    selectedMedico.value.icm = "No informado";
  }

  if (!selectedMedico.value.user.email) {
    selectedMedico.value.user.email = "No informado";
  }

  detailsDialog.value = true;
};
</script>
