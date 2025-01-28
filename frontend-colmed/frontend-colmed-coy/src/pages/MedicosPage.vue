<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <!-- Header con logo y perfil de usuario -->
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-btn flat @click="goHome">
        <img
          src="~assets/LogoCOLMEDAYSEN_letras_blancas.png"
          alt="Colegio Médico Logo"
          style="width: 190px; height: 78px"
          class="q-mr-sm"
        />
      </q-btn>
      <q-separator dark vertical inset />
      <q-space />

      <q-card flat class="bg-primary">
        <q-card-section class="bg-primary text-white">
          <!-- <div class="text-subtitle1 text-weight-medium">
            {{ userProfile.first_name + " " + userProfile.last_name }}
          </div> -->
          <!-- <div class="text-subtitle2 text-weight-medium">
            {{ userProfile.name_google }}
          </div> -->

          <q-chip>
            <q-avatar>
              <img :src="userProfile.picture" />
            </q-avatar>
            {{ userProfile.name_google }}
          </q-chip>
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

    <!-- Page Container -->
    <q-page-container>
      <!-- Contenido Principal -->
      <q-page class="q-pa-md">
        <!-- Spinner de carga -->
        <!-- <div v-if="!loading" class="text-center q-my-lg">
          <q-spinner-dots size="50px" color="primary" />
          <p class="q-mt-md">Cargando datos...</p>
        </div> -->
        <!-- <q-inner-loading :showing="!loading">
          <div class="text-overline">Cargando datos...</div>
          <q-spinner-dots color="primary" size="2em"
        /></q-inner-loading> -->
        <div class="q-gutter-y-md">
          <q-card style="border-radius: 20px" class="bg-light-blue-10">
            <q-tabs
              v-model="tab"
              class="text-blue-1"
              active-color="white"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="detalle_medicos" label="Detalle médicos" />
              <q-tab
                name="superintendencia"
                label="Ingreso registros Sistema Recaudación"
              />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated class="bg-grey-2">
              <q-tab-panel name="detalle_medicos">
                <TablaMedicos />
              </q-tab-panel>

              <q-tab-panel name="superintendencia" class="flex flex-center">
                <q-card
                  class="text-primary"
                  style="max-width: 850px; border-radius: 20px"
                  flat
                >
                  <q-card-section class="bg-terciary">
                    <div class="text-h6">
                      Incluir registros obtenidos desde el Sistema de
                      Recaudación para actualizar información de médicos
                      colegiados
                    </div>

                    <div class="text-subtitle3">
                      El archivo adjunto se almacenará en directorio Drive de la
                      cuenta "ticsaysen@colegiomedico.cl". Los datos se
                      procesarán el próximo 20-01-2024.
                    </div>
                    <!-- <div class="text-caption">
                      Los certificados que adjunte serán almacenados en
                      directorio Drive de la cuenta
                      "ticsaysen@colegiomedico.cl"
                    </div> -->
                  </q-card-section>

                  <q-card-section>
                    <q-file
                      v-model="file_sr"
                      label="Seleccione archivo excel, descargado desde SR"
                      outlined
                      use-chips
                      accept=".xlsx, .xls"
                    />
                  </q-card-section>

                  <q-separator dark />

                  <q-card-actions align="center">
                    <!-- <q-btn
                      no-caps
                      class="bg-red-8 text-white btn-fixed-width"
                      rounded
                      @click="procesarRegistrosSuper"
                      disable
                      style="width: 40%"
                    >
                      Almacenar archivos</q-btn
                    > -->
                    <q-btn
                      no-caps
                      class="bg-red-8 text-white btn-fixed-width"
                      rounded
                      style="width: 40%"
                      @click="procesarRegistrosSuper"
                      :disable="certificados_super"
                    >
                      Procesar registros</q-btn
                    >
                  </q-card-actions>
                </q-card>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
        <!-- Tabla de Médicos -->
        <!-- <div v-if="loading">
          
        </div> -->
        <q-dialog
          v-model="certificados_super"
          persistent
          backdrop-filter="blur(4px)"
        >
          <q-card>
            <q-card-section class="items-center text-h6">
              Procesando archivo ...
            </q-card-section>

            <q-card-section class="items-center">
              <q-spinner color="primary" size="3em" :thickness="10" />
            </q-card-section>
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
import { useEventosStore } from "src/stores/eventos";
import TablaMedicos from "src/components/TablaMedicos.vue";

const router = useRouter();
const userStore = useUserStore();
const medicoStore = useMedicoStore();
const informacionStore = useInformacionesStore();
const eventoStore = useEventosStore();

const tab = ref("detalle_medicos");

// Recuperar el perfil del usuario
const userProfile = computed(() => userStore.user);
const perfiles = computed(() => userStore.profiles);
const perfilActual = computed(() => userStore.opcion_profile);

//Sección registroSuperintendencia.
const certificados_super = ref(false);
const file_sr = ref(null);
const loading_procesar = ref(false);
const certificados_procesados = ref(false);

const procesarRegistrosSuper = async () => {
  certificados_super.value = true;
  const formData = new FormData();
  formData.append("file", file_sr.value);

  await medicoStore.procesar_registros_super(formData);

  certificados_super.value = false;
};

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

const validarFecha = (val) => {
  const formato = "DD-MM-YYYY";
  return dayjs(val, formato, true).isValid();
};

onMounted(async () => {
  //await medicoStore.fetchMedicos();
  await medicoStore.filterDataMedicos({ afiliaciones: "colmed" });
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
    case "admin_eventos":
      await eventoStore.fetchEventosBase();
      router.push("/admin-eventos");
      break;
    case "admin_tic":
      router.push("/admin-tic");
      break;
    default:
      return null; // No mostrar nada para el perfil "visitante"
  }
};
</script>
