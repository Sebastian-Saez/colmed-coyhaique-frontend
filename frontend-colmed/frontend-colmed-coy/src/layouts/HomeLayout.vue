<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <!-- Toolbar Section para pantallas pequeñas -->
    <!-- <ToolbarSection v-if="!isLargeScreen" :is-large-screen="isLargeScreen" /> -->

    <div class="q-pa-md">
      <div
        class="q-mt-xs justify-center"
        :class="isLargeScreen ? 'q-mx-xl q-px-xl' : ''"
      >
        <!-- Toolbar Section para pantallas grandes -->
        <ToolbarSection :isLargeScreen="isLargeScreen" />
        <!-- Principales Noticias (Image Carousel) -->
        <FeaturedNews :isLargeScreen="isLargeScreen" />
        <PublishSection :isLargeScreen="isLargeScreen" />
        <NewsSection :isLargeScreen="isLargeScreen" />
        <EventsSection :isLargeScreen="isLargeScreen" />
      </div>
    </div>

    <!-- Footer -->
    <!-- <q-card class="bg-footer-secondary text-white q-mt-lg q-pt-lg">
      <div class="q-pa-md flex justify-center">
        <div class="q-mx-xl q-px-xl" style="max-width: 1600px; width: 90%">
          <q-card class="q-mx-xl q-px-xs bg-footer-secondary" flat>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6 col-md-3">
                <div class="text-h5 text-bold text-white">
                  Colegio Médico Aysén
                </div>
                <q-list dense>
                  <q-item
                    clickable
                    @click="onItemClickQuienesSomos(val)"
                    v-for="val in filteredQuienesSomos"
                    :key="val.clave"
                  >
                    <q-item-section avatar v-if="val.clave !== 'colmed'">
                      <q-icon name="arrow_right" text-color="white" />
                    </q-item-section>
                    <q-item-section v-if="val.clave !== 'colmed'">
                      <q-item-label caption class="text-bold text-white">{{
                        val.nombre
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <div class="text-h5 text-bold text-white">Servicios</div>
                <q-list dense>
                  <q-item
                    clickable
                    @click="onItemClickServicios(val)"
                    v-for="val in lista_servicios"
                    :key="val.clave"
                  >
                    <q-item-section avatar v-if="val.clave !== 'colmed'">
                      <q-icon name="arrow_right" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-bold text-white">{{
                        val.nombre
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <div class="text-h5 text-bold text-white">
                  Mantente Informado
                </div>
                <q-list dense>
                  <q-item
                    clickable
                    @click="onItemClickInformaciones(val)"
                    v-for="val in lista_informaciones"
                    :key="val.clave"
                  >
                    <q-item-section avatar v-if="val.clave !== 'colmed'">
                      <q-icon name="arrow_right" text-color="white" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="text-bold text-white">{{
                        val.nombre
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col-12 col-sm-6 col-md-3">
                <div class="text-h5 text-bold text-white">Síguenos</div>
                <div class="flex space-x-2">
                  <q-btn
                    flat
                    round
                    icon="fab fa-facebook-f"
                    @click="goFacebook"
                  />
                  <q-btn
                    flat
                    round
                    icon="fab fa-twitter"
                    class="text-white"
                    @click="goX"
                  />
                  <q-btn
                    flat
                    round
                    icon="fab fa-instagram"
                    class="text-white"
                    @click="goInstagram"
                  />
                  <q-btn
                    flat
                    round
                    icon="mail"
                    class="text-white"
                    @click="goMailTo"
                  />
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>

      <div
        class="row justify-center items-center q-px-md q-pt-sm q-pb-xs bg-footer-main"
        style="max-width: 100%"
      >
        <div class="text-weight-light text-center">
          ©2024 Colegio Médico Aysén - Colegio Médico de Chile
        </div>
      </div>
    </q-card> -->
    <FooterSection :isLargeScreen="isLargeScreen" />
  </q-layout>
</template>

<script setup>
import ToolbarSection from "components/ToolbarSection.vue";
import FooterSection from "components/FooterSection.vue";
import FeaturedNews from "src/components/FeaturedNews.vue";
import PublishSection from "src/components/PublishSection.vue";
import NewsSection from "src/components/NewsSection.vue";
import EventsSection from "src/components/EventsSection.vue";
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useServicioStore } from "src/stores/servicios";
import { useInformacionesStore } from "src/stores/informaciones";
import { useEventosStore } from "src/stores/eventos";
import { usePublicidadStore } from "src/stores/publicidadMedica";
import { useSomosStore } from "src/stores/quienesSomos";
import { useCalendarStore } from "src/stores/calendar";
import { copyToClipboard } from "quasar";

// Responsive tracking
const $q = useQuasar();
const isLargeScreen = computed(() => {
  return $q.screen.gt.md;
});

const imageSlide = ref(1);
const newsSlide = ref(1);
const eventsSlide = ref(1);
const autoplay = ref(true);
const selectListaSomos = ref();
const selectServicio = ref();
const selectContacto = ref();
const numero_telefono = "67-2232833";
const direccion_colmed_aysen = "Pdte. Montt Nº 69, Coyhaique";
const correo_colmed_aysen = "reg.coyhaique@colegiomedico.cl";

const dropdownVisible = ref({
  quienesSomos: false,
  servicios: false,
  informaciones: false,
  contactos: false,
});
const closeTimers = {};

const messagePopup = ref({
  visible: false,
  message: "",
  target: null,
});

const router = useRouter();
const servicioStore = useServicioStore();
const informacionesStore = useInformacionesStore();
const eventoStore = useEventosStore();
const publicidadStore = usePublicidadStore();
const somosStore = useSomosStore();
const calendarStore = useCalendarStore();

const noticias_destacadas = computed(
  () => informacionesStore.noticias_destacadas
);
const noticias_base = computed(() => informacionesStore.noticias_base);
const loading_destacadas = computed(
  () => informacionesStore.loading_destacadas
);
const loading_base = computed(() => informacionesStore.loading_base);

onMounted(async () => {
  // await calendarStore.fetchWeeklyEvents();
  informacionesStore.fetchNoticiasDestacadas();
  informacionesStore.fetchNoticiasBase();
  eventoStore.fetchEventosBase();
  publicidadStore.fetchPublicidadesBase();
});

const lista_quienes_somos = [
  {
    clave: "mision",
    nombre: "Misión y Visión",
  },
  {
    clave: "normativa",
    nombre: "Normativa",
  },
  {
    clave: "directiva",
    nombre: "Directiva",
  },
  {
    clave: "transparencia",
    nombre: "Transparencia",
  },
  {
    clave: "colmed",
    nombre: "Colegio Médico de Chile",
  },
];

const lista_servicios = [
  {
    clave: "pagos",
    nombre: "Pago de cuotas",
  },
  {
    clave: "colegiarse",
    nombre: "Cómo Colegiarse",
  },
];

const lista_informaciones = [
  {
    clave: "noticias",
    nombre: "Todas las noticias",
  },
  {
    clave: "eventos",
    nombre: "Todos los eventos",
  },
];

const lista_contactos = reactive([
  {
    clave: "telefono",
    nombre: numero_telefono,
    label: "Teléfono",
    icono: "call",
    //tooltipVisible: null, // Controla la visibilidad del tooltip
    tooltipText: "¡Teléfono copiado al portapapeles!",
  },
  {
    clave: "direccion",
    nombre: direccion_colmed_aysen,
    label: "Dirección",
    icono: "pin_drop",
    //tooltipVisible: null,
    tooltipText: "¡Dirección copiada al portapapeles!",
  },
  {
    clave: "correo",
    nombre: correo_colmed_aysen,
    label: "Correo",
    icono: "contact_mail",
    //tooltipVisible: null,
    tooltipText: "",
  },
]);

const lista_principales_noticias = [
  {
    title: "Noticia destacada 21",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit cras magnis, facilisis magna enim est viverra at augue commodo ultricies, auctor conubia morbi ante euismod potenti libero consequat. A sagittis.",
    img: "https://cdn.quasar.dev/img/mountains.jpg",
  },
  {
    title: "Noticia destacada 2",
    description: "Descripción de la noticia destacada 2.",
    img: "https://cdn.quasar.dev/img/parallax1.jpg",
  },
  {
    title: "Noticia destacada 3",
    description: "Descripción de la noticia destacada 3.",
    img: "https://cdn.quasar.dev/img/parallax2.jpg",
  },
];

const lista_noticias = [
  {
    title: "Noticia 1",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    img: "https://placehold.co/300x200",
  },
  {
    title: "Noticia 3",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    img: "https://placehold.co/300x200",
  },
  {
    title: "Noticia 3",
    description:
      "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    img: "https://placehold.co/300x200",
  },
];

const lista_eventos = [
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

const goFacebook = () => {
  window.open(
    "https://web.facebook.com/Colegiomedicoaysen",
    "_blank",
    "noopener,noreferrer"
  );
};

const goX = () => {
  window.open("https://x.com/colmedcoyhaique", "_blank", "noopener,noreferrer");
};

const goInstagram = () => {
  window.open(
    "https://www.instagram.com/colmedaysen/",
    "_blank",
    "noopener,noreferrer"
  );
};

const goMailTo = () => {
  window.location.href = `mailto:reg.coyhaique@colegiomedico.cl`;
};

const goMiColmed = () => {
  window.open(
    "https://micolmed.colegiomedico.cl/",
    "_blank",
    "noopener,noreferrer"
  );
};

const filteredQuienesSomos = computed(() =>
  lista_quienes_somos.filter((item) => item.clave !== "colmed")
);

const clearCloseTimer = (dropdownName) => {
  if (closeTimers[dropdownName]) {
    clearTimeout(closeTimers[dropdownName]); // Cancela el temporizador
    closeTimers[dropdownName] = null; // Limpia la referencia
  }
};

const startCloseTimer = (dropdownName) => {
  clearCloseTimer(dropdownName);
  closeTimers[dropdownName] = setTimeout(() => {
    dropdownVisible.value[dropdownName] = false;
  }, 150); // Adjust the delay as needed
};

const onItemClickQuienesSomos = (val) => {
  dropdownVisible.value.quienesSomos = false;
  switch (val.clave) {
    case "mision":
    case "normativa":
    case "directiva":
    case "transparencia":
      somosStore.setCategoriaSomos(val.clave);
      router.push("/quienes-somos");
      break;
    case "colmed":
      window.open(
        "https://www.colegiomedico.cl/",
        "_blank",
        "noopener,noreferrer"
      );
      break;
    default:
      console.log("Error en valor : ", val);
  }
};

const onItemClickServicios = (val) => {
  dropdownVisible.value.servicios = false;
  switch (val.clave) {
    case "pagos":
    case "colegiarse":
      servicioStore.setCategoriaServicio(val.clave);
      router.push("/servicios");
      break;
    default:
      console.log("Error en valor : ", val);
  }
};

const onItemClickInformaciones = (val) => {
  dropdownVisible.value.informaciones = false;
  switch (val.clave) {
    case "noticias":
    case "eventos":
      informacionesStore.setCategoriaInformacion(val.clave);
      router.push("/informaciones");
      break;
    default:
      console.log("Error en valor : ", val);
  }
};

const irAEventos = () => {
  informacionesStore.setCategoriaInformacion("eventos");
  router.push("/informaciones");
};
const irANoticias = () => {
  informacionesStore.setCategoriaInformacion("noticias");
  router.push("/informaciones");
};
const onItemClickContactos = (val) => {
  dropdownVisible.value.contactos = false;
  switch (val.clave) {
    case "telefono":
    case "direccion":
      copyToClipboard(val.nombre).then(() => {
        console.log(`${val.label} copiado al portapapeles:`, val.nombre);
        // Mostrar tooltip
        // Mostrar popup cerca del elemento clickeado
        messagePopup.value.message = `${val.label} copiado al portapapeles!`;

        messagePopup.value.visible = true;
        // Ocultar popup después de 2 segundos
        setTimeout(() => {
          messagePopup.value.visible = false;
        }, 1800);
      });
      break;
    case "correo":
      window.location.href = `mailto:${val.nombre}`;
      break;
    default:
      console.log("Error en valor: ", val);
  }
};

const irALogin = () => {
  router.push("/login"); // Redirección a la página de login
};
</script>
