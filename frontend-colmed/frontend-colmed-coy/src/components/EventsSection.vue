<template>
  <!-- Próximos Eventos (Events Carousel) -->
  <q-card
    flat
    class="q-pa-md"
    :class="isLargeScreen ? 'q-mx-xl q-pa-md' : 'q-pa-lg'"
    style="border-radius: 30px"
  >
    <q-card-section style="border-radius: 20px 20px 0px 0px"
      ><div class="text-h3 text-bold text-primary">Próximos Eventos</div>
    </q-card-section>
    <q-separator inset />

    <div v-if="!loading_base" class="text-center q-my-lg">
      <q-spinner-dots size="50px" color="primary" />
      <p class="q-mt-md">Cargando datos...</p>
    </div>
    <q-banner v-else-if="error_base" class="bg-negative text-white">
      {{ error_base }}
    </q-banner>
    <div v-else class="row q-col-gutter-md">
      <div
        v-for="(evento, index) in eventosBase.slice(0, 3)"
        :key="index"
        class="col-12 col-md-4"
      >
        <q-card
          flat
          class="bg-grey-1 q-my-sm full-width hover-border"
          clickable
          bordered
          @click="verEvento(evento)"
        >
          <!-- Imagen del evento -->
          <q-img
            v-if="evento.imagen"
            :ratio="1"
            :src="evento.imagen"
            alt="Evento"
            class="rounded-borders"
            loading="lazy"
            fit="cover"
            spinner-color="primary"
          />
          <!-- Encabezado: título, descripción corta -->
          <q-card-section>
            <div class="text-h5 text-bold text-primary text-center">
              {{ evento.titulo }}
            </div>
            <q-separator spaced />
            <q-btn
              no-caps
              icon-right="arrow_forward"
              class="q-mt-xs"
              style="width: 100%"
              color="teal-10"
              outline
            >
              <div class="text-primary text-weight-medium text-subtitle1">
                Ver evento
              </div>
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="mt-8 text-center">
      <q-btn
        class="bg-primary text-white q-mt-md"
        @click="irAEventos"
        rounded
        no-caps
        style="width: 30%"
      >
        <div class="text-white text-weight-medium text-body1">
          Ver todos los eventos
        </div>
      </q-btn>
    </div>
  </q-card>
  <q-dialog v-model="showEventoDialog">
    <q-card
      bordered
      style="min-width: 550px; max-width: 90vw; border-radius: 20px"
      class="bg-white"
    >
      <q-img
        v-if="selectedEvento?.imagen"
        :src="selectedEvento.imagen"
        spinner-color="primary"
        class="rounded-borders"
      />

      <!-- <q-card-section>
        <div class="text-h4 text-bold text-primary">
          {{ selectedEvento?.title }}
        </div>
        <div class="text-subtitle1 q-pt-sm">
          {{ selectedEvento?.description }}
        </div>
      </q-card-section> -->
      <q-btn
        color="teal"
        no-caps
        style="width: 100%"
        @click="showEventoDialog = false"
      >
        <div class="text-white text-weight-medium text-h6">Cerrar</div>
      </q-btn>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { useEventosStore } from "src/stores/eventos";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useInformacionesStore } from "src/stores/informaciones";
import { useCalendarStore } from "src/stores/calendar";
defineProps({
  isLargeScreen: {
    type: Boolean,
    required: true,
  },
});

// Estado local
const showEventoDialog = ref(false);
const selectedEvento = ref(null);

const informacionStore = useInformacionesStore();
const eventosStore = useEventosStore();
const calendarStore = useCalendarStore();
//const eventos_base = computed(() => eventosStore.eventos_base);
//const loading_base = computed(() => eventosStore.loading_base);

const calendarioColmed = ref(
  '<iframe src="https://calendar.google.com/calendar/embed?src=c_78d2b5bff047ec1a63adb88d03dc3129cad5e15379487fe9a2bb544dbf11ea20%40group.calendar.google.com&ctz=America%2FSantiago" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>"'
);

const eventosBase = computed(() => eventosStore.eventos_base);
const loading_base = computed(() => eventosStore.loading_base);
const error_base = computed(() => eventosStore.error_base);
const router = useRouter();
const eventos_base = [
  {
    title: "Evento 1",
    description: "Descripción del evento 1",
    img: "https://cdn.quasar.dev/img/mountains.jpg",
  },
  {
    title: "Evento 2",
    description: "Descripción del evento 2",
    img: "https://cdn.quasar.dev/img/parallax1.jpg",
  },
  {
    title: "Evento 3",
    description: "Descripción del evento 3",
    img: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
];

const verEvento = (evento) => {
  selectedEvento.value = evento;
  showEventoDialog.value = true;
};

const irAEventos = async () => {
  await calendarStore.fetchWeeklyEvents();
  informacionStore.setCategoriaInformacion("eventos");
  router.push("/informaciones");
};
</script>
