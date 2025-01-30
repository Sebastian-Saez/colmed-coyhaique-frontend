<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-btn flat @click="goHome">
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
          <!-- <div class="text-subtitle1 text-weight-medium">
              {{ userProfile.first_name + " " + userProfile.last_name }}
            </div> -->
          <!-- <div class="text-subtitle2 text-weight-medium">
              {{ userProfile.name_google }}
            </div> -->

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

    <q-page-container class="q-pt-md">
      <q-card
        class="q-pa-md bg-light-blue-10"
        :class="isLargeScreen ? 'q-ml-lg q-mr-xl' : 'q-mx-lg'"
        style="border-radius: 20px"
      >
        <q-tabs
          v-model="tab"
          class="text-blue-1"
          active-color="white"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="detalle_eventos" label="Eventos de la página" />
          <q-tab
            name="detalle_publicidad"
            label="Publicidades médicas de la página"
          />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated class="bg-grey-2">
          <q-tab-panel name="detalle_eventos">
            <AdminEventosPage />
          </q-tab-panel>
        </q-tab-panels>
        <q-tab-panels v-model="tab" animated class="bg-grey-2">
          <q-tab-panel name="detalle_publicidad">
            <AdminPublicidadesMedicasPage />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/authStore";
import { useInformacionesStore } from "src/stores/informaciones";
import { useMedicoStore } from "src/stores/medicos";
import { useEventosStore } from "src/stores/eventos";
import { usePublicidadStore } from "src/stores/publicidadMedica";
import AdminNoticia from "src/components/AdminNoticia.vue";
import AdminEventosPage from "./AdminEventosPage.vue";
import AdminPublicidadesMedicasPage from "./AdminPublicidadesMedicasPage.vue";

const router = useRouter();
const $q = useQuasar();
const isLargeScreen = computed(() => {
  return $q.screen.gt.md;
});

const accionEvento = ref(false);
const userStore = useUserStore();
const medicoStore = useMedicoStore();

const tab = ref("detalle_eventos");
const eventoStore = useEventosStore();
const publicidadStore = usePublicidadStore();
const informacionStore = useInformacionesStore();
const loading = computed(() => eventoStore.loading);
const eventos = computed(() => eventoStore.eventos_base);
const publicidades = computed(() => publicidadStore.publicidades);

// Recuperar el perfil del usuario
const userProfile = computed(() => userStore.user);
const perfiles = computed(() => userStore.profiles);
const perfilActual = computed(() => userStore.opcion_profile);

// Logout
const logout = () => {
  userStore.logout();
  router.push("/login");
};

const cancelar = () => {
  accionEvento.value = false;
};

const verNoticia = (noticia) => {
  informacionStore.noticia = noticia;
  accionEvento.value = true;
};

const editarNoticia = (noticia) => {
  informacionStore.noticia = noticia;
  informacionStore.editar_noticia = true;
  accionEvento.value = true;
};

const agregarNoticia = () => {
  informacionStore.crear_noticia = true;
  accionEvento.value = true;
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

// Redirigir a home
const goHome = () => {
  router.push("/home");
};

onMounted(async () => {
  if (!userProfile.value) {
    console.warn("Usuario no autenticado. Redirigiendo a login...");
    router.push("/login");
  }
  await informacionStore.fetchTodasNoticias();
});
</script>
