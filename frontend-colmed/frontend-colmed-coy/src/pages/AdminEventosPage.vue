<template>
  <q-layout view="lHh Lpr lFf">
    <q-card class="q-pa-md bg-grey-1" style="border-radius: 20px">
      <div class="row items-center justify-between q-pb-md">
        <div class="text-h4 text-bold text-primary col">Todos los Eventos</div>
        <q-btn
          no-caps
          color="primary"
          label="Agregar un nuevo Evento"
          icon="add"
          class="text-white q-px-sm"
          rounded
          dense
          @click="agregarEvento"
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
          href="https://drive.google.com/drive/u/1/folders/1lc3p3m5kUF9AOIAbDx8vOaQ3s9oksmJY"
          target="_blank"
        />
      </div>

      <q-separator spaced />
      <q-inner-loading :showing="!loading">
        <q-spinner-dots color="primary" size="2em"
      /></q-inner-loading>
      <div v-if="loading" class="row q-col-gutter-md">
        <div
          v-for="(evento, index) in eventos"
          :key="index"
          class="col-12 col-md-4"
        >
          <!-- style="linear-gradient(to right, #2B86C5 0%, #2B86C5 100%)" -->
          <q-card flat class="bg-grey-3">
            <q-img
              :ratio="isLargeScreen ? 4 / 3 : 2 / 1"
              :src="evento.imagen"
              alt="Evento"
              class="rounded-borders"
              loading="lazy"
              spinner-color="primary"
              v-if="evento.imagen"
            >
              <!-- <div class="absolute-bottom text-h6">
              Title
            </div> -->
              <!-- <div class="absolute-bottom text-h5 text-bold text-primary q-mt-md">
              {{ noticia.titulo }}
            </div> -->
              <div class="absolute-bottom text-h5 text-bold text-white">
                {{ evento.titulo }}
              </div>
            </q-img>

            <q-img
              v-else
              :ratio="isLargeScreen ? 4 / 3 : 2 / 1"
              src="https://placehold.co/500x500"
              alt="Evento"
              class="rounded-md"
            />
            <!-- <q-card-section>
            <div class="text-body2 q-mt-xs text-weight-medium">
              {{ evento.resumen_contenido }}
            </div>
          </q-card-section> -->
            <q-separator inset />
            <q-card-actions align="around">
              <q-btn
                no-caps
                color="primary"
                label="Ver Evento"
                class="text-white"
                @click="verEvento(evento)"
              />
              <q-btn
                no-caps
                color="red-14"
                label="Editar Evento"
                class="text-white"
                @click="editarEvento(evento)"
              />
            </q-card-actions>
          </q-card>
          <q-separator class="q-mt-lg" v-if="!isLargeScreen" />
        </div>
      </div>
    </q-card>

    <q-dialog persistent v-model="accionEvento">
      <AdminEvento @cancelarPopup="cancelar" />
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { event, useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/authStore";
import { useInformacionesStore } from "src/stores/informaciones";
import { useMedicoStore } from "src/stores/medicos";
import { useEventosStore } from "src/stores/eventos";
import AdminEvento from "src/components/AdminEvento.vue";

const router = useRouter();
const $q = useQuasar();
const isLargeScreen = computed(() => {
  return $q.screen.gt.md;
});

const accionEvento = ref(false);
const userStore = useUserStore();
const medicoStore = useMedicoStore();
const eventoStore = useEventosStore();
const loading = computed(() => eventoStore.loading_base);
const eventos = computed(() => eventoStore.eventos_base);

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
  accionEvento.value = false;
  eventoStore.limpiarEvento();
  eventoStore.fetchEventosBase();
};

const verEvento = (evento) => {
  // eventoStore.evento = evento;
  eventoStore.setEvento(evento);
  accionEvento.value = true;
};

const editarEvento = (evento) => {
  // eventoStore.setEvento(evento);
  // eventoStore.evento = evento;
  // eventoStore.editar_evento = true;
  eventoStore.setModificarEvento(evento);
  accionEvento.value = true;
};

const agregarEvento = () => {
  eventoStore.setCrearEvento();
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
      await eventoStore.fetchTodasNoticias();
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
  await eventoStore.fetchEventosBase();
});
</script>
