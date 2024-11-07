<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <div class="q-pa-md flex justify-center">
      <div class="q-mx-xl q-px-xl" style="max-width: 1600px; width: 90%">
        <ToolbarSection />
        <q-card
          class="q-mx-xl q-pa-md bg-white"
          v-if="tabInformacion == 'noticias'"
        >
          <div class="text-h3 text-bold text-primary">Todas las noticias</div>
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
              <div class="text-body1 q-mt-md">
                {{ noticia.resumen_contenido }}
              </div>
              <q-btn
                flat
                no-caps
                label="Leer"
                icon-right="arrow_forward"
                class="text-primary q-mt-md"
                @click="goToNoticia(noticia)"
              />
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
  </q-layout>
</template>
<script setup>
import ToolbarSection from "components/ToolbarSection.vue";
import { useRouter } from "vue-router";
import { useInformacionesStore } from "src/stores/informaciones";
import { computed, ref, onMounted } from "vue";

defineOptions({
  name: "InformacionesPage",
});

const informacionStore = useInformacionesStore();
const router = useRouter();

const categoriaInformacion = computed(
  () => informacionStore.pagina_informaciones
);
const tabInformacion = ref(categoriaInformacion);
const todas_noticias = computed(() => informacionStore.todas_noticias);
const loading = computed(() => informacionStore.loading);

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
