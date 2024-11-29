<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <div class="q-pa-md">
      <div
        class="q-mt-xs justify-center"
        :class="isLargeScreen ? 'q-mx-xl q-px-xl' : ''"
      >
        <ToolbarSection :isLargeScreen="isLargeScreen" />
        <q-card
          class="q-pa-md bg-grey-1"
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
              <q-card flat class="bg-grey-2">
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
              </q-card>
              <q-separator class="q-mt-lg" v-if="!isLargeScreen" />
              <!-- <template v-if="noticia.imagen">
                <q-img
                  :ratio="4 / 3"
                  :src="noticia.imagen"
                  alt="Noticia"
                  class="rounded-borders q-mt-md"
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

              <div class="text-h5 text-bold text-primary q-mt-md">
                {{ noticia.titulo }}
              </div>
              <div class="text-subtitle1 q-mt-xs text-weight-light">
                {{ noticia.resumen_contenido }}
              </div>
              <q-btn
                flat
                no-caps
                label="Leer"
                icon-right="arrow_forward"
                class="text-primary q-mt-md"
                @click="goToNoticia(noticia)"
              /> -->
            </div>
          </div>
          <!-- <div class="text-center">
            <q-btn
              label="Ver todas las noticias"
              class="bg-primary text-white q-mt-md"
              no-caps
              rounded
            />
          </div> -->
        </q-card>
        <q-card
          class="q-mx-xl q-pa-md bg-white"
          v-else-if="tabInformacion == 'eventos'"
        >
          <div class="text-h3 text-bold text-primary">Todos los eventos</div>

          <q-card>
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
          </q-card>
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
        </q-card>
        <q-card class="q-mx-xl q-pa-md bg-white" v-else>
          <div class="text-h6 text-bold text-primary">Página en desarrollo</div>
        </q-card>
      </div>
    </div>
    <FooterSection :isLargeScreen="isLargeScreen" />
  </q-layout>
</template>
<script setup>
import ToolbarSection from "components/ToolbarSection.vue";
import FooterSection from "src/components/FooterSection.vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useInformacionesStore } from "src/stores/informaciones";
import { useCalendarStore } from "src/stores/calendar";
import { computed, ref, onMounted } from "vue";

defineOptions({
  name: "InformacionesPage",
});

const $q = useQuasar();
const isLargeScreen = computed(() => {
  return $q.screen.gt.md;
});

const informacionStore = useInformacionesStore();
const calendarStore = useCalendarStore();
const router = useRouter();

const categoriaInformacion = computed(
  () => informacionStore.pagina_informaciones
);
const tabInformacion = ref(categoriaInformacion);
const todas_noticias = computed(() => informacionStore.todas_noticias);
const loading = computed(() => informacionStore.loading);
const eventos = computed(() => calendarStore.events);
onMounted(async () => {
  informacionStore.fetchTodasNoticias();
});

const goToNoticia = (noticia) => {
  router.push({
    path: `/informaciones/noticia/${noticia.id}`, // Asume que cada noticia tiene un 'id'
    state: { noticia }, // Pasar la noticia completa como estado
  });
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
</style>
