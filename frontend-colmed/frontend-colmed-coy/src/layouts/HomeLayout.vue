<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <div class="q-pa-md flex justify-center">
      <div class="q-mx-xl q-px-xl" style="max-width: 1600px; width: 90%">
        <!-- Toolbar -->
        <ToolbarSection />

        <!-- Principales Noticias (Image Carousel) -->
        <q-card class="q-mb-lg q-pa bg-page" flat>
          <div class="q-pa-md">
            <div v-if="!loading_destacadas" class="text-center q-my-lg">
              <q-spinner-dots size="50px" color="primary" />
              <p class="q-mt-md">Cargando datos...</p>
            </div>

            <q-carousel
              v-else
              animated
              v-model="imageSlide"
              navigation
              infinite
              :autoplay="autoplay"
              arrows
              control-color="primary"
              control-type="flat"
              transition-prev="jump-right"
              transition-next="jump-left"
              padding
              height="400px"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
              transition-duration="400"
            >
              <q-carousel-slide
                v-for="(noticia, index) in noticias_destacadas"
                :key="index"
                :name="index + 1"
                class="column no-wrap bg-page"
              >
                <div
                  class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
                >
                  <div class="col-6 q-pa-md">
                    <div class="q-gutter-y-md column">
                      <!-- style="max-width: 300px"-->
                      <div class="text-h3 text-bold text-primary">
                        {{ noticia.titulo }}
                      </div>
                      <div class="text-h6 text-primary">
                        {{ noticia.resumen_contenido }}
                      </div>
                      <q-btn
                        outline
                        rounded
                        color="primary"
                        label="Más información"
                        style="width: 50%"
                        no-caps
                      />
                    </div>
                  </div>

                  <!-- <div class="col-6">
                    <h3 class="text-lg text-bold text-primary">
                      {{ noticia.title }}
                    </h3>
                    <p class="text-body1 text-description">
                      {{ noticia.description }}
                    </p>
                    <q-btn
                      outline
                      rounded
                      color="primary"
                      label="Más información"
                    />
                  </div> -->
                  <q-img
                    v-if="noticia.imagen"
                    class="rounded-borders col-6 full-height"
                    :src="noticia.imagen"
                  />
                  <q-img
                    v-else
                    class="rounded-borders col-6 full-height"
                    src="https://placehold.co/300x200"
                    alt="Noticia"
                  />
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-card>
        <q-separator class="q-mx-xl q-mb-lg" color="primary" inset />
        <!-- Noticias (News Carousel) flat-->

        <!-- <q-card class="q-mx-xl q-pa-md bg-white">
          <div class="text-h3 text-bold text-primary">Noticias</div>
          <div v-if="!loading_base" class="text-center q-my-lg">
            <q-spinner-dots size="50px" color="primary" />
            <p class="q-mt-md">Cargando datos...</p>
          </div>
          <div v-else class="row q-col-gutter-md">
            <div
              v-for="(noticia, index) in lista_noticias"
              :key="index"
              class="col-12 col-md-4"
            >
              <q-img
                :ratio="4 / 3"
                :src="noticia.img"
                alt="Noticia"
                class="rounded-md q-mt-md"
              />
              <div class="text-h4 text-bold text-primary q-mt-md">
                {{ noticia.title }}
              </div>
              <div class="text-subtitle1 q-mt-md">
                {{ noticia.description }}
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
          <div class="text-center">
            <q-btn
              label="Ver todas las noticias"
              class="bg-primary text-white q-mt-md"
              no-caps
              rounded
            />
          </div>
        </q-card> -->
        <q-card class="q-mx-xl q-pa-md bg-white">
          <div class="text-h3 text-bold text-primary">Noticias</div>
          <div v-if="!loading_base" class="text-center q-my-lg">
            <q-spinner-dots size="50px" color="primary" />
            <p class="q-mt-md">Cargando datos...</p>
          </div>
          <div v-else class="row q-col-gutter-md">
            <div
              v-for="(noticia, index) in noticias_base.slice(0, 3)"
              :key="index"
              class="col-12 col-md-4"
            >
              <template v-if="noticia.imagen">
                <q-img
                  :ratio="4 / 3"
                  :src="noticia.imagen"
                  alt="Noticia"
                  class="rounded-borders q-mt-md"
                  loading="lazy"
                  spinner-color="primary"
                />
              </template>
              <template v-else-if="noticia.link.link">
                <div
                  class="q-mt-md"
                  style="
                    position: relative;
                    padding-bottom: 75%;
                    height: 0;
                    overflow: hidden;
                  "
                >
                  <iframe
                    :src="`https://www.facebook.com/plugins/video.php?href=${noticia.link.link}&show_text=0&width=560`"
                    style="
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 120%;
                      border: none;
                      overflow: hidden;
                    "
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                  ></iframe>
                </div>
              </template>
              <template v-else>
                <q-img
                  :ratio="4 / 3"
                  src="https://placehold.co/300x200"
                  alt="Noticia"
                  class="rounded-md q-mt-md"
                />
              </template>

              <div class="text-h5 text-bold text-primary q-mt-md">
                {{ noticia.titulo }}
              </div>
              <div class="text-body1 q-mt-md">
                {{ noticia.resumen_contenido }}
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
          <div class="text-center">
            <q-btn
              label="Ver todas las noticias"
              class="bg-primary text-white q-mt-md"
              no-caps
              rounded
              @click="irANoticias"
            />
          </div>
        </q-card>

        <q-separator class="q-mx-xl q-mb-lg q-mt-lg" color="primary" inset />
        <!-- Próximos Eventos (Events Carousel) -->
        <q-card class="q-mx-xl q-pa-md bg-white">
          <div class="text-h3 text-bold text-primary">Próximos Eventos</div>
          <div class="row q-col-gutter-md">
            <div
              v-for="(evento, index) in lista_eventos"
              :key="index"
              class="col-12 col-md-4"
            >
              <q-img
                :ratio="4 / 3"
                :src="evento.img"
                alt="Evento"
                class="rounded-md q-mt-md"
              />
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
      </div>
    </div>

    <!-- Footer -->
    <q-card class="bg-footer-secondary text-white q-mt-lg q-pt-lg">
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
    </q-card>
  </q-layout>
</template>

<script setup>
import ToolbarSection from "components/ToolbarSection.vue";
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useServicioStore } from "src/stores/servicios";
import { useInformacionesStore } from "src/stores/informaciones";
import { useSomosStore } from "src/stores/quienesSomos";
import { copyToClipboard } from "quasar";

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
const somosStore = useSomosStore();

const noticias_destacadas = computed(
  () => informacionesStore.noticias_destacadas
);
const noticias_base = computed(() => informacionesStore.noticias_base);
const loading_destacadas = computed(
  () => informacionesStore.loading_destacadas
);
const loading_base = computed(() => informacionesStore.loading_base);

onMounted(async () => {
  informacionesStore.fetchNoticiasDestacadas();
  informacionesStore.fetchNoticiasBase();
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
  console.log("Val.tooltipVisible2", val.tooltipVisible);
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

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
