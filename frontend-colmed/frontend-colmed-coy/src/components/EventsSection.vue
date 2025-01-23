<template>
  <!-- Próximos Eventos (Events Carousel) -->
  <q-card
    flat
    class="q-pa-md bg-terciary"
    :class="isLargeScreen ? 'q-mx-xl q-pa-md' : 'q-pa-lg'"
    style="border-radius: 30px"
  >
    <q-card-section style="border-radius: 20px 20px 0px 0px" class="bg-primary"
      ><div class="text-h3 text-bold text-white">
        Próximos Eventos
      </div></q-card-section
    >

    <div v-if="!loading_eventos_base" class="text-center q-my-lg">
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
        <template v-if="evento.imagen">
          <q-img
            :ratio="4 / 3"
            :src="evento.imagen"
            alt="Evento"
            class="rounded-borders q-mt-md"
            loading="lazy"
            spinner-color="primary"
          />
        </template>
        <div class="text-h4 text-bold text-primary q-mt-md">
          {{ evento.title }}
        </div>
        <div class="text-subtitle1 q-mt-md">
          {{ evento.description }}
        </div>
        <q-btn
          flat
          no-caps
          label="Leer"
          icon-right="arrow_forward"
          class="text-primary q-mt-md"
        />
      </div>
    </div>
    <div class="mt-8 text-center">
      <q-btn
        label="Ir a Eventos"
        class="bg-primary text-white q-mt-md"
        @click="irAEventos"
        rounded
        no-caps
      />
    </div>
  </q-card>
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

const informacionStore = useInformacionesStore();
const eventosStore = useEventosStore();
const calendarStore = useCalendarStore();
//const eventos_base = computed(() => eventosStore.eventos_base);
//const loading_base = computed(() => eventosStore.loading_base);
const loading_base = ref(true);
const calendarioColmed = ref(
  '<iframe src="https://calendar.google.com/calendar/embed?src=c_78d2b5bff047ec1a63adb88d03dc3129cad5e15379487fe9a2bb544dbf11ea20%40group.calendar.google.com&ctz=America%2FSantiago" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>"'
);

const eventosBase = computed(() => informacionStore.eventos_base);
const loading_eventos_base = computed(
  () => informacionStore.loading_eventos_base
);
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

const irAEventos = async () => {
  await calendarStore.fetchWeeklyEvents();
  informacionStore.setCategoriaInformacion("eventos");
  router.push("/informaciones");
};
</script>
