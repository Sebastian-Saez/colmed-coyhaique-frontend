<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
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

    <q-page-container class="q-pt-md">
      <q-card
        class="q-pa-md bg-grey-1"
        :class="isLargeScreen ? 'q-ml-lg q-mr-xl' : 'q-mx-lg'"
        style="border-radius: 20px"
      >
        <div class="row items-center justify-between q-pb-md">
          <div class="text-h4 text-bold text-primary">Todas las noticias</div>
          <q-btn
            no-caps
            color="primary"
            label="Agregar una noticia"
            icon="add"
            class="text-white"
            rounded
            @click="agregarNoticia"
          />
        </div>

        <q-separator spaced />
        <q-inner-loading :showing="!loading">
          <q-spinner-dots color="primary" size="2em"
        /></q-inner-loading>
        <div v-if="loading" class="row q-col-gutter-md">
          <div
            v-for="(noticia, index) in todas_noticias"
            :key="index"
            class="col-12 col-md-4"
          >
            <!-- style="linear-gradient(to right, #2B86C5 0%, #2B86C5 100%)" -->
            <q-card flat class="bg-grey-3">
              <q-img
                :ratio="isLargeScreen ? 4 / 3 : 2 / 1"
                :src="noticia.imagen"
                alt="Noticia"
                class="rounded-borders"
                loading="lazy"
                spinner-color="primary"
                v-if="noticia.imagen"
              >
                <!-- <div class="absolute-bottom text-h6">
                  Title
                </div> -->
                <!-- <div class="absolute-bottom text-h5 text-bold text-primary q-mt-md">
                  {{ noticia.titulo }}
                </div> -->
                <div class="absolute-bottom text-h5 text-bold text-white">
                  {{ noticia.titulo }}
                </div>
              </q-img>
              <div
                class="q-mt-md"
                style="
                  position: relative;
                  padding-bottom: 63%;
                  height: 0;
                  overflow: hidden;
                "
                v-else-if="noticia.link && noticia.link.link"
              >
                <div v-html="noticia.link.link"></div>
                <!-- <iframe
                  :src="noticia.link.link"
                  style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                    overflow: hidden;
                  "
                  frameborder="0"
                  allowfullscreen
                ></iframe> -->
              </div>
              <q-img
                v-else
                :ratio="isLargeScreen ? 4 / 3 : 2 / 1"
                src="https://placehold.co/500x500"
                alt="Noticia"
                class="rounded-md"
              />
              <q-card-section>
                <div class="text-body2 q-mt-xs text-weight-medium">
                  {{ noticia.resumen_contenido }}
                </div>
              </q-card-section>
              <q-separator inset />
              <q-card-actions align="around">
                <q-btn
                  no-caps
                  color="primary"
                  label="Ver noticia"
                  class="text-white"
                  @click="verNoticia(noticia)"
                />
                <q-btn
                  no-caps
                  color="red-14"
                  label="Editar noticia"
                  class="text-white"
                  @click="editarNoticia(noticia)"
                />
              </q-card-actions>
            </q-card>
            <q-separator class="q-mt-lg" v-if="!isLargeScreen" />
          </div>
        </div>
      </q-card>
    </q-page-container>
    <q-dialog persistent v-model="accionNoticia">
      <AdminNoticia @cancelarPopup="cancelar" />
    </q-dialog>
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
import AdminNoticia from "src/components/AdminNoticia.vue";

const router = useRouter();
const $q = useQuasar();
const isLargeScreen = computed(() => {
  return $q.screen.gt.md;
});

const accionNoticia = ref(false);
const userStore = useUserStore();
const medicoStore = useMedicoStore();
const eventoStore = useEventosStore();
const informacionStore = useInformacionesStore();
const loading = computed(() => informacionStore.loading);
const todas_noticias = computed(() => informacionStore.todas_noticias);

// Recuperar el perfil del usuario
const userProfile = computed(() => userStore.user);
const perfiles = computed(() => userStore.profiles);
const perfilActual = computed(() => userStore.opcion_profile);

// Logout
const logout = () => {
  userStore.logout();
  router.push("/login");
};

const cancelar = async () => {
  accionNoticia.value = false;
  informacionStore.limpiarNoticia();
  informacionStore.fetchTodasNoticias();
};

const verNoticia = (noticia) => {
  informacionStore.noticia = noticia;
  accionNoticia.value = true;
};

const editarNoticia = (noticia) => {
  // informacionStore.noticia = noticia;
  // informacionStore.editar_noticia = true;
  informacionStore.setModificarNoticia(noticia);
  accionNoticia.value = true;
};

const agregarNoticia = () => {
  informacionStore.crear_noticia = true;
  accionNoticia.value = true;
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
  await informacionStore.fetchTodasNoticias();
});
</script>
