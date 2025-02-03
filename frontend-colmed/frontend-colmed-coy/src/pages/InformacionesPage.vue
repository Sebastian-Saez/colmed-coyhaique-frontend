<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <div class="q-pa-md">
      <div
        class="q-mt-xs justify-center"
        :class="isLargeScreen ? 'q-mx-xl q-px-xl' : ''"
      >
        <!-- <ToolbarSection :isLargeScreen="isLargeScreen" /> -->
        <ToolbarSection :screenSize="screenSize" />
        <q-card
          class="q-pa-md bg-grey-2"
          :class="isLargeScreen ? 'q-ml-lg q-mr-xl' : 'q-mx-lg'"
          v-if="tabInformacion == 'noticias'"
          style="border-radius: 20px"
        >
          <div class="text-h4 text-bold text-primary">Todas las noticias</div>
          <div v-if="!loading" class="text-center q-my-lg">
            <q-spinner-dots size="50px" color="primary" />
            <p class="q-mt-md">Cargando datos...</p>
          </div>
          <div v-else class="row q-col-gutter-md">
            <div
              v-for="(noticia, index) in todas_noticias"
              :key="index"
              class="col-12 col-md-4"
            >
              <!-- style="linear-gradient(to right, #2B86C5 0%, #2B86C5 100%)" -->
              <q-card
                class="bg-blue-grey-1 q-my-sm full-width hover-border"
                style="border-radius: 20px"
                bordered
              >
                <template v-if="noticia.imagen">
                  <q-img
                    :ratio="4 / 3"
                    :src="noticia.imagen"
                    alt="Noticia"
                    class="rounded-borders"
                    loading="lazy"
                    spinner-color="primary"
                  />
                </template>
                <template v-else-if="noticia.link && noticia.link.link">
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
                <q-card-section>
                  <div class="text-h6 text-bold text-primary text-center">
                    {{ noticia.resumen_contenido }}
                  </div>
                  <q-separator spaced />
                  <q-btn
                    no-caps
                    icon-right="arrow_forward"
                    class="q-mt-xs"
                    style="width: 100%"
                    color="cyan-10"
                    outline
                    @click="goToNoticia(noticia)"
                  >
                    <div class="text-primary text-weight-medium text-subtitle1">
                      Ver noticia
                    </div>
                  </q-btn>
                </q-card-section>
              </q-card>
              <!-- <q-card flat class="bg-grey-2">
                <q-img
                  :ratio="isLargeScreen ? 4 / 3 : 2 / 1"
                  :src="noticia.imagen"
                  alt="Noticia"
                  class="rounded-borders"
                  loading="lazy"
                  spinner-color="primary"
                  v-if="noticia.imagen"
                >
           
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
                  <iframe
                    :src="`https://www.facebook.com/plugins/video.php?href=${noticia.link.link}&show_text=0&width=560`"
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
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                  ></iframe>
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
                <q-card-actions>
                  <q-btn
                    flat
                    no-caps
                    label="Leer"
                    icon-right="arrow_forward"
                    class="text-primary q-mt-md"
                    @click="goToNoticia(noticia)"
                  />
                </q-card-actions>
              </q-card> -->
              <q-separator class="q-mt-lg" v-if="!isLargeScreen" />
            </div>
          </div>
        </q-card>
        <q-card
          class="q-pa-md bg-grey-2"
          v-else-if="tabInformacion == 'eventos'"
          :class="isLargeScreen ? 'q-ml-lg q-mr-xl' : 'q-mx-lg'"
          style="border-radius: 20px"
        >
          <div class="text-h4 text-bold text-primary">Todos los eventos</div>

          <!-- <q-card>
            <div class="calendar-container">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=c_78d2b5bff047ec1a63adb88d03dc3129cad5e15379487fe9a2bb544dbf11ea20%40group.calendar.google.com&ctz=America%2FSantiago"
                style="border: 0"
                width="800"
                height="600"
                frameborder="0"
                scrolling="no"
                mode="MONTH"
              ></iframe>
            </div>
          </q-card> -->
          <div class="row q-col-gutter-md">
            <div
              v-for="(evento, index) in todos_eventos"
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
              <!-- <q-img
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
              /> -->
            </div>
          </div>
        </q-card>
        <q-card
          class="q-pa-md bg-grey-2"
          v-else-if="tabInformacion == 'convenios'"
          :class="isLargeScreen ? 'q-ml-lg q-mr-xl' : 'q-mx-lg'"
          style="border-radius: 20px"
        >
          <div class="text-h4 text-bold text-primary">Todos los convenios</div>
          <q-separator spaced />
          <q-splitter
            v-model="splitterModel"
            style="height: 400px"
            :limits="computedLimits"
          >
            <template v-slot:before>
              <q-tabs
                v-model="tab"
                vertical
                active-color="white"
                indicator-color="red-11"
                active-class="bg-deep-orange-13"
              >
                <q-tab
                  name="regionales"
                  label="Convenios regionales"
                  no-caps
                  :class="
                    tab === 'regionales'
                      ? 'text-white'
                      : 'bg-deep-orange-1 text-primary'
                  "
                  class="q-mb-xs q-mr-md tab-button"
                />
                <q-tab
                  name="nacionales"
                  label="Convenios nacionales"
                  no-caps
                  :class="
                    tab === 'nacionales'
                      ? 'text-white'
                      : 'bg-deep-orange-1 text-primary'
                  "
                  class="q-mb-xs q-mr-md tab-button"
                />
              </q-tabs>
            </template>
            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="slide-up"
                transition-next="slide-up"
                class="bg-grey-1"
              >
                <q-tab-panel name="nacionales" class="bg-grey-2">
                  <div class="row q-col-gutter-md">
                    <div
                      v-for="(convenio, index) in convenios.nacionales"
                      :key="index"
                      class="col-12 col-md-4"
                    >
                      <q-card
                        class="bg-blue-grey-1 q-my-sm"
                        style="border-radius: 20px; height: 90%"
                        bordered
                      >
                        <q-card-section>
                          <div
                            class="text-h5 text-primary text-weight-medium text-center"
                          >
                            {{ convenio.titulo }}
                          </div>
                        </q-card-section>

                        <q-separator inset />

                        <q-card-actions align="center">
                          <q-btn
                            style="width: 90%"
                            no-caps
                            outline
                            rounded
                            label="Más información"
                            color="primary"
                            target="_blank"
                            :href="convenio.ref"
                          />
                          <!-- <div
                          class="text-body2 text-secondary text-weight-medium text-left"
                          style="white-space: pre-wrap"
                        >
                          {{ convenio.descripcion }}
                        </div> -->
                        </q-card-actions>
                      </q-card>
                    </div>
                  </div>
                  <q-separator class="q-mt-lg" />
                  <q-card class="q-mt-sm" flat>
                    <q-card-actions align="center" class="bg-grey-2">
                      <q-btn
                        no-caps
                        rounded
                        color="deep-orange-9"
                        outline
                        target="_blank"
                        href="https://www.colegiomedico.cl/convenios-colmed/"
                        icon-right="o"
                        ><div
                          class="text-primary text-h6 text-weight-regular q-px-lg"
                        >
                          Todos los convenios nacionales
                          <q-icon
                            class="q-pl-xs"
                            size="xs"
                            name="open_in_new"
                          /></div
                      ></q-btn>
                    </q-card-actions>
                  </q-card>
                </q-tab-panel>

                <q-tab-panel name="regionales" class="bg-grey-2">
                  <div class="row q-col-gutter-md">
                    <div
                      v-for="(convenio, index) in convenios.regionales"
                      :key="index"
                      class="col-12 col-md-4"
                    >
                      <q-card
                        class="bg-blue-grey-1 q-my-sm"
                        style="border-radius: 20px; height: 100%"
                        bordered
                      >
                        <q-card-section>
                          <div class="text-h5 text-primary text-weight-medium">
                            {{ convenio.titulo }}
                          </div>
                        </q-card-section>

                        <q-separator inset />

                        <q-card-section>
                          <div
                            class="text-body2 text-secondary text-weight-medium text-left"
                            style="white-space: pre-wrap"
                          >
                            {{ convenio.descripcion }}
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card>
        <q-card class="q-mx-xl q-pa-md bg-white" v-else>
          <div class="text-h6 text-bold text-primary">Página en desarrollo</div>
        </q-card>
      </div>
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
    </div>
    <!-- <FooterSection :isLargeScreen="isLargeScreen" /> -->
    <FooterSection :screenSize="screenSize" />
  </q-layout>
</template>
<script setup>
import ToolbarSection from "components/ToolbarSection.vue";
import FooterSection from "src/components/FooterSection.vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useInformacionesStore } from "src/stores/informaciones";
import { useCalendarStore } from "src/stores/calendar";
import { useEventosStore } from "src/stores/eventos";
import { computed, ref, onMounted } from "vue";

defineOptions({
  name: "InformacionesPage",
});

const $q = useQuasar();
const isLargeScreen = computed(() => {
  return $q.screen.gt.md;
});

const screenSize = computed(() => {
  if ($q.screen.lt.sm) return "xs"; // Teléfonos pequeños
  if ($q.screen.sm && !$q.screen.md) return "sm"; // Teléfonos grandes
  if ($q.screen.md && !$q.screen.lg) return "md"; // Tablets o pantallas de 13"
  if ($q.screen.lg && !$q.screen.xl) return "lg"; // Pantallas grandes
  return "xl"; // Pantallas extra grandes
});

const informacionStore = useInformacionesStore();
const eventosStore = useEventosStore();
const calendarStore = useCalendarStore();
const router = useRouter();

// Estado local
const showEventoDialog = ref(false);
const selectedEvento = ref(null);
// const splitterModel = ref(50);
const splitterModel = ref(isLargeScreen.value ? 15 : 28);
const imagenConvenio = ref(null);
const tab = ref("regionales");

const ajustarSplitter = async () => {
  await nextTick(); // Asegura que la imagen está en el DOM antes de acceder a sus propiedades

  if (imagenConvenio.value?.$el) {
    const img = imagenConvenio.value.$el.querySelector("img"); // Accede a la imagen interna
    if (img) {
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      splitterModel.value = Math.max(30, Math.min(70, aspectRatio * 100)); // Ajusta entre 30% y 70%
    }
  }
};

const slideRegionales = ref(0);
const convenios = ref({
  regionales: [
    {
      titulo: "Óptica Sottolichio",
      descripcion:
        "20% OFF\r\n\r\n- Aplica para todos los lentes y marcas.\r\n- Beneficio para miembros del Colmed y familia.\r\n- Y también para trabajadores de la institución.",
      imagen: "",
    },
    {
      titulo: "Ecovapor Autospa",
      descripcion:
        "Lavado de vehículo\r\n\r\n- Lavado de vehículos, tapices, motor y alfombras.\r\n- Vehículo pequeño: $20.000.\r\n- Vehículo mediano: $25.000.\r\n- Vehículo grande: $30.000.",
      imagen: "",
    },
    {
      titulo: "Rent a Car R&D",
      descripcion:
        "Estacionamiento Aeropuerto Balmaceda\r\n\r\n- Custodia de vehículos.\r\n- Acercamiento ida y vuelta al aeropuerto.\r\n- Custodia: $2.500 diarios.\r\n- Lavado Full y sanitización: $20.000.\r\n- Convenio anual: $45.000",
      imagen: "",
    },
  ],

  nacionales: [
    {
      titulo: "Inmobiliarias",
      ref: "https://www.colegiomedico.cl/convenios-inmobiliarias/",
    },
    {
      titulo: "Corretaje propiedades",
      ref: "https://www.colegiomedico.cl/corretaje-de-propiedades/",
    },
    {
      titulo: "Automotriz",
      ref: "https://www.colegiomedico.cl/automotriz/",
    },
  ],
});

const categoriaInformacion = computed(
  () => informacionStore.pagina_informaciones
);
const tabInformacion = ref(categoriaInformacion);
const todas_noticias = computed(() => informacionStore.todas_noticias);
const todos_eventos = computed(() => eventosStore.eventos_base);
const loading = computed(() => informacionStore.loading);
const eventos = computed(() => calendarStore.events);
const computedLimits = computed(() => {
  return isLargeScreen.value ? [15, 30] : [28, 28];
});

onMounted(async () => {
  const storedCategoria = localStorage.getItem("pagina_informaciones");
  if (storedCategoria) {
    informacionStore.setCategoriaInformacion(storedCategoria);
  }

  await informacionStore.fetchTodasNoticias();
  await eventosStore.fetchEventosBase();

  await informacionStore.fetchTodasNoticias();
  await eventosStore.fetchEventosBase();
  // if (categoriaInformacion.value) {
  //   console.log("Categoria ", categoriaInformacion.value);
  //   informacionStore.setCategoriaInformacion(categoriaInformacion.value);
  // }
});

const goToNoticia = (noticia) => {
  router.push({
    path: `/informaciones/noticia/${noticia.id}`, // Asume que cada noticia tiene un 'id'
    // state: { noticia }, // Pasar la noticia completa como estado
  });
};

const verEvento = (evento) => {
  selectedEvento.value = evento;
  showEventoDialog.value = true;
};

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
</script>
<style lang="scss">
.gradient-background {
  background: linear-gradient(-225deg, $light-blue-2 75%, $light-blue-10 100%);
}
.calendar-container {
  position: relative;
  padding-bottom: 75%; /* Adjust this value based on the aspect ratio */
  height: 0;
  overflow: hidden;
}

.calendar-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.tab-button {
  border-radius: 50px 0px 0px 50px;
}
</style>
