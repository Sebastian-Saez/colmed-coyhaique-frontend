<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <!-- Header con logo y perfil de usuario -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- Logo a la izquierda -->
        <q-btn flat @click="goHome">
          <img
            src="~assets/LogoCOLMEDAYSEN_letras_blancas.png"
            alt="Colegio Médico Logo"
            style="width: 204px; height: 82px"
          />
        </q-btn>
        <!-- Datos del usuario a la derecha -->
        <div class="q-mr-md q-ml-auto row items-center">
          Usuario:
          <span class="q-ml-xs text-bold">{{ userProfile?.email }}</span>

          <!-- Separator vertical -->
          <q-separator vertical inset class="q-mx-md" />

          Tipo perfil:
          <span class="q-ml-xs text-bold" v-if="formattedProfile">
            {{ formattedProfile }}
          </span>
        </div>

        <!-- Botón para cerrar sesión -->
        <q-btn flat @click="logout" icon="logout" label="Cerrar sesión" />
      </q-toolbar>
    </q-header>

    <!-- Page Container -->
    <q-page-container>
      <!-- Contenido Principal -->
      <q-page class="q-pa-md">
        <!-- Spinner de carga -->
        <div v-if="!loading" class="text-center q-my-lg">
          <q-spinner-dots size="50px" color="primary" />
          <p class="q-mt-md">Cargando datos...</p>
        </div>

        <!-- Tabla de Médicos -->
        <div v-else>
          <q-card flat class="q-pa-sm bg-white">
            <q-splitter
              v-model="splitterModel"
              unit="px"
              style="height: calc(100vh - 56px)"
            >
              <template v-slot:before>
                <div class="q-pa-md" :style="{ width: '280px' }">
                  <div class="row items-center justify-between q-mb">
                    <div class="text-h6">Filtros</div>
                  </div>
                  <!-- Filtro por Entidad -->
                  <q-select
                    v-model="selectedEntidad"
                    :options="entidadOptions"
                    label="Entidad"
                    outlined
                    dense
                    class="q-mb-md"
                  />

                  <!-- Filtro por Estado de Pago (multiple) -->
                  <q-select
                    v-model="selectedEstadosPago"
                    :options="estadoPagoOptions"
                    label="Estados de Pago"
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
                        <q-card bordered flat>
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
          <q-card style="min-width: 800px">
            <q-card-section>
              <div class="text-h4">Detalles del Médico</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
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
                    header-class="text-primary"
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
import { useUserStore } from "src/stores/authStore";
import { useMedicoStore } from "src/stores/medicos";

const router = useRouter();
const userStore = useUserStore();
const medicoStore = useMedicoStore();

const medicos = computed(() => medicoStore.medicos);
const afiliaciones = computed(() => medicoStore.afiliaciones);
const filter = ref("");
const loading = computed(() => medicoStore.loading);

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

// Variables reactivas para almacenar las selecciones
const selectedEntidad = ref(null);
const selectedEstadosPago = ref([]);
const selectedEstadoAfiliacion = ref(null);

// Recuperar el perfil del usuario
const userProfile = ref(userStore.profile);

// Función para formatear el perfil a mostrar (sin cambios)
const formattedProfile = computed(() => {
  const perfil = userStore.profile?.perfil;
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

watch(selectedEntidad, async (newValue) => {
  medicoStore.limpiarMedicos();
  if (newValue && newValue.value) {
    if (newValue.value === "Todos los médicos") {
      await medicoStore.fetchMedicos();
    } else if (newValue.value === "Colmed") {
      await medicoStore.fetchMedicosConAfiliacion();
    } else if (newValue.value === "No Colegiado") {
      await medicoStore.fetchMedicosSinAfiliacion();
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

    // Llama a la acción del store con los estados de pago seleccionados
    await medicoStore.fetchMedicosEstadosPago(estadosPagoValues);
  } else {
    // Actualiza 'selectedEstadosPago' con los nuevos valores seleccionados
    selectedEstadosPago.value = newValues;

    if (newValues.length === 0) {
      // Si no hay estados seleccionados, obtén todos los médicos con afiliación
      await medicoStore.fetchMedicosConAfiliacion();
    } else {
      // Extrae los valores de los estados de pago seleccionados
      const estadosPagoValues = newValues.map((estado) => estado.value);

      // Llama a la acción del store con los estados de pago seleccionados
      await medicoStore.fetchMedicosEstadosPago(estadosPagoValues);
    }
  }
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
