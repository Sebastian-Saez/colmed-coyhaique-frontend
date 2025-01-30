<template>
  <q-layout view="lHh Lpr lFf">
    <q-card class="q-pa-md bg-grey-1" style="border-radius: 20px">
      <div class="row items-center justify-between q-pb-md">
        <div class="text-h4 text-bold text-primary col">
          Todos las Publicidades médicas
        </div>
        <q-btn
          no-caps
          color="primary"
          label="Agregar una nueva Publicidad médica"
          icon="add"
          class="text-white q-px-sm"
          rounded
          dense
          @click="agregarPublicidad"
        />
        <q-btn
          color="red-9"
          icon-right="help_center"
          label="Ayuda"
          no-caps
          class="q-ml-md q-px-md"
          dense
          rounded
          flat
          href="https://drive.google.com/drive/u/1/folders/1seGksRE-DznOeatM8p7vPz9gRBFSa90u"
          target="_blank"
        />
      </div>

      <q-separator spaced />
      <q-inner-loading :showing="!loading">
        <q-spinner-dots color="primary" size="2em"
      /></q-inner-loading>

      <div v-if="loading" class="row q-col-gutter-md">
        <div
          v-for="(publicidad_medica, index) in publicidades"
          :key="index"
          class="col-12 col-md-4"
        >
          <!-- style="linear-gradient(to right, #2B86C5 0%, #2B86C5 100%)" -->
          <q-card class="bg-grey-3" bordered>
            <q-card-section class="bg-cyan-9 text-white">
              <!-- <div class="text-h6">Título: {{ publicidad_medica.titulo }}</div>
              <q-separator spaced /> -->
              <!-- <div class="text-caption">Link: {{ publicidad_medica.link }}</div> -->

              <div class="row no-wrap text-white">
                <div class="text-subtitle1 text-weight-bold">Título:</div>
                <div class="text-subtitle1 q-ml-md">
                  {{ publicidad_medica.titulo }}
                </div>
              </div>
              <q-separator spaced />
              <div class="row no-wrap text-white">
                <div class="text-subtitle2 text-weight-bold">Link:</div>
                <div class="text-caption q-ml-md">
                  {{ publicidad_medica.link }}
                </div>
              </div>
              <div class="row no-wrap text-white">
                <div class="text-subtitle2 text-weight-bold">
                  Estado de la publicidad:
                </div>
                <div class="text-subtitle2 q-ml-md">
                  {{ estadoPublicidad(publicidad_medica.activo) }}
                </div>
              </div>
              <!-- <div class="text-h6">
                Estado de la publicidad:
                <div class="text-overli">
                  {{ estadoPublicidad(publicidad_medica.activo) }}
                </div>
              </div> -->
            </q-card-section>
            <q-separator inset />
            <q-card-actions align="around">
              <q-btn
                no-caps
                color="primary"
                label="Ver Publicidad Médica"
                class="text-white"
                @click="verPublicidad(publicidad_medica)"
              />
              <q-btn
                no-caps
                color="red-14"
                label="Editar Publicidad Médica"
                class="text-white"
                @click="editarPublicidad(publicidad_medica)"
              />
            </q-card-actions>
          </q-card>
          <q-separator class="q-mt-lg" v-if="!isLargeScreen" />
        </div>
      </div>
    </q-card>

    <q-dialog persistent v-model="accionPublicidad">
      <AdminPublicidadMedica @cancelarPopup="cancelar" />
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/authStore";
import { useInformacionesStore } from "src/stores/informaciones";
import { usePublicidadStore } from "src/stores/publicidadMedica";
import { useMedicoStore } from "src/stores/medicos";
import AdminNoticia from "src/components/AdminNoticia.vue";
import AdminPublicidadMedica from "src/components/AdminPublicidadMedica.vue";

const router = useRouter();
const $q = useQuasar();
const isLargeScreen = computed(() => {
  return $q.screen.gt.md;
});

const accionPublicidad = ref(false);
const userStore = useUserStore();
const medicoStore = useMedicoStore();
const informacionStore = useInformacionesStore();
const publicidadStore = usePublicidadStore();
const loading = computed(() => publicidadStore.loading);
const eventos = computed(() => informacionStore.eventos_base);
const publicidades = computed(() => publicidadStore.publicidades);

// Recuperar el perfil del usuario
const userProfile = computed(() => userStore.user);
const perfiles = computed(() => userStore.profiles);
const perfilActual = computed(() => userStore.opcion_profile);

const estadoPublicidad = (estado) => {
  if (estado) {
    return "Publicidad activa";
  } else {
    return "Publicidad desactivada";
  }
};
// Logout
const logout = () => {
  userStore.logout();
  router.push("/login");
};

const cancelar = async () => {
  accionPublicidad.value = false;
  publicidadStore.limpiarPublicidad();
  publicidadStore.fetchTodasPublicidades();
};

const verPublicidad = (publicidad_medica) => {
  //   publicidadStore.publicidad_medica = publicidad_medica;
  publicidadStore.setPublicidad(publicidad_medica);
  accionPublicidad.value = true;
};

const editarPublicidad = (publicidad_medica) => {
  //   publicidadStore.publicidad_medica = publicidad_medica;
  //   publicidadStore.editar_noticia = true;
  publicidadStore.setPublicidad(publicidad_medica);
  publicidadStore.setModificarPublicidad(publicidad_medica);
  accionPublicidad.value = true;
};

const agregarPublicidad = () => {
  publicidadStore.crear_publicidad = true;
  accionPublicidad.value = true;
};

const changeProfile = async (val) => {
  userStore.changeProfile(val.tipo_perfil);

  switch (val.tipo_perfil) {
    case "admin_colmed":
      await medicoStore.fetchMedicos();
      router.push("/medicos");
      break;
    case "admin_noticias":
      await publicidadStore.fetchTodasNoticias();
      router.push("/admin-noticias");
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
  await publicidadStore.fetchTodasPublicidades();
});
</script>
