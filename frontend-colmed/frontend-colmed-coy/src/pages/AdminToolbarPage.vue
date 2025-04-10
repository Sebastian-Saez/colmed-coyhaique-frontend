<template>
    <q-layout view="lHh Lpr lFf" class="bg-page">
      <!-- Header con logo y perfil de usuario -->
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-btn flat @click="goHome">
          <!-- src="~assets/LogoCOLMEDAYSEN_letras_blancas.png" -->
          <img
            src="~assets/CR-Region-de-Aysen_horizontal_white.png"
            alt="Colegio Médico Logo"
            style="width: 190px; height: 78px"
            class="q-mr-sm"
          />
        </q-btn>
        <q-separator dark vertical inset />
        <q-space />
  
        <q-card flat class="bg-primary">
          <q-card-section class="bg-primary text-white">
  
            <q-chip v-if="userProfile">
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
        <q-btn stretch flat no-caps icon="logout" @click="logout">
          <q-tooltip> Cerrar sesión </q-tooltip>
        </q-btn>
      </q-toolbar>
  
      <!-- Page Container -->
      <q-page-container>
        <!-- Contenido Principal -->
        <q-page class="q-pa-md">

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
                <q-tab name="quienes_somos" label="Quienes somos" />
                <q-tab
                  name="servicios"
                  label="Servicios"
                />
                <q-tab
                  name="informaciones"
                  label="Informaciones"
                />
                <q-tab
                  name="links_interes"
                  label="Links de Interés"
                />
                <q-tab
                  name="contactos"
                  label="Contacto"
                />
              </q-tabs>
              <q-separator />
              <q-tab-panels v-model="tab" animated class="bg-grey-2">
                <q-tab-panel name="quienes_somos">
                  <QuienesSomosToolbar />
                </q-tab-panel>
  
                <q-tab-panel name="servicios" class="flex flex-center">
                  <ServiciosToolbar/>
                </q-tab-panel>
                <q-tab-panel name="informaciones" class="flex flex-center">
                  <InformacionesConveniosToolbar/>
                </q-tab-panel>
                <q-tab-panel name="links_interes" class="flex flex-center">
                  <LinksInteresToolbar/>
                </q-tab-panel>
                <q-tab-panel name="contactos" class="flex flex-center">
                  <ContactosToolbar/>
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
  
          <q-dialog
            v-model="resultado_proceso_sr"
            persistent
            transition-show="scale"
            transition-hide="scale"
            backdrop-filter="blur(4px)"
          >
            <q-card class="bg-teal text-white" style="width: 200px">
              <q-card-section>
                <div class="text-h6">{{ registros_procesados_sr }}</div>
              </q-card-section>
  
              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="OK" @click="okRegistrosSuper" />
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
  import { useEventosStore } from "src/stores/eventos";
  import QuienesSomosToolbar from "src/components/QuienesSomosToolbar.vue";
  import ServiciosToolbar from "src/components/ServiciosToolbar.vue";
  import InformacionesConveniosToolbar from "src/components/InformacionesConveniosToolbar.vue";
  import ContactosToolbar from "src/components/ContactosToolbar.vue";
  import LinksInteresToolbar from "src/components/LinksInteresToolbar.vue";

  const router = useRouter();
  const userStore = useUserStore();
  const medicoStore = useMedicoStore();
  const informacionStore = useInformacionesStore();
  const eventoStore = useEventosStore();
  
  const tab = ref("quienes_somos");
  
  // Recuperar el perfil del usuario
  const userProfile = computed(() => userStore.user);
  const perfiles = computed(() => userStore.profiles);
  const perfilActual = computed(() => userStore.opcion_profile);
  const registros_procesados_sr = computed(
    () => medicoStore.registros_procesados_sr
  );
  const resultado_proceso_sr = computed(() => medicoStore.resultado_proceso_sr);
  
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
    file_sr.value = null;
  };
  
  const okRegistrosSuper = async () => {
    await medicoStore.okRegistrosSuper();
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
    if (!userProfile.value) {
      console.warn("Usuario no autenticado. Redirigiendo a login...");
      router.push("/login");
    }
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
  