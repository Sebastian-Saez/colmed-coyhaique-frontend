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
          <q-card flat class="q-pa-md bg-white">
            <div class="text-h6 text-primary">Listado de Médicos</div>
            <q-table
              :rows="medicos"
              :columns="columns"
              row-key="rut"
              :filter="filter"
              v-model:pagination="pagination"
              :rows-per-page-options="[10, 20, 50]"
              grid
              class="q-mt-md"
            >
              <template v-slot:top-right>
                <!-- Input de búsqueda en la esquina superior derecha -->
                <q-input
                  v-model="filter"
                  debounce="300"
                  placeholder="Buscar..."
                  outlined
                  dense
                />
              </template>
            </q-table>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/authStore";
import { useMedicoStore } from "src/stores/medicos";

const router = useRouter();
const userStore = useUserStore();
const medicoStore = useMedicoStore();

const medicos = computed(() => medicoStore.medicos);
const filter = ref("");
const loading = computed(() => medicoStore.loading);

// Función para formatear el perfil a mostrar
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

// Columnas de la tabla
const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.user.first_name + " " + row.user.last_name,

    sortable: true,
  },
  {
    name: "telefono",
    align: "left",
    label: "Teléfono",
    field: "contacto",
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "Email",
    field: (row) => row.user.email,
    sortable: true,
  },
  {
    name: "morosidad",
    align: "left",
    label: "Estado Morosidad",
    field: "moroso",
    format: (val) => (val ? "Moroso" : "Al día"),
    sortable: true,
  },
  {
    name: "registro",
    align: "left",
    label: "Registro Superintendencia",
    field: "registro_superintendencia",
    sortable: true,
  },
  { name: "rut", align: "left", label: "RUT", field: "rut", sortable: true },
];

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: medicos.value.length, // Número total de filas
});

// Recuperar el perfil del usuario
const userProfile = ref(userStore.profile);

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
</script>
