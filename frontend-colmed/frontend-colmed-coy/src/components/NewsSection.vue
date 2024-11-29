<template>
  <!-- Noticias (News Carousel) flat-->
  <q-card
    class="q-pa-md bg-white"
    :class="isLargeScreen ? 'q-mx-xl q-pa-md' : 'q-pa-lg'"
    style="border-radius: 30px"
  >
    <div class="text-h3 text-bold text-primary">Noticias</div>
    <div v-if="!loading_base" class="text-center q-my-lg">
      <q-spinner-dots size="50px" color="primary" />
      <p class="q-mt-md">Cargando datos...</p>
    </div>
    <q-banner v-else-if="error_base" class="bg-negative text-white">
      {{ error_base }}
    </q-banner>
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
        />
        <q-separator spaced />
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
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useInformacionesStore } from "src/stores/informaciones";
import { useRouter } from "vue-router";

defineProps({
  isLargeScreen: {
    type: Boolean,
    required: true,
  },
});
const router = useRouter();
const informacionesStore = useInformacionesStore();
const noticias_base = computed(() => informacionesStore.noticias_base);
const loading_base = computed(() => informacionesStore.loading_base);

const error_base = computed(() => informacionesStore.error_base);

const irANoticias = () => {
  informacionesStore.setCategoriaInformacion("noticias");
  router.push("/informaciones");
};
</script>
