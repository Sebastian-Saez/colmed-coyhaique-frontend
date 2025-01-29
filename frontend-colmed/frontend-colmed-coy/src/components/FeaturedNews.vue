<template>
  <q-card class="q-mb-lg bg-destacado" flat>
    <div class="" :class="{ 'q-pl-xs q-pr-xs': !isLargeScreen }">
      <div v-if="!loading_destacadas" class="text-center q-my-lg">
        <q-spinner-dots size="50px" color="primary" />
        <p class="q-mt-md">Cargando datos...</p>
      </div>
      <q-banner v-else-if="error_destacadas" class="bg-negative text-white">
        {{ error_destacadas }}
      </q-banner>
      <q-carousel
        v-else
        v-model="imageSlide"
        animated
        offset="[5,10]"
        swipeable
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        control-color="secondary"
        control-type="flat"
        transition-prev="jump-right"
        transition-next="jump-left"
        :padding="isLargeScreen ? true : false"
        :height="carouselHeight"
        transition-duration="400"
        class="carousel-full-width"
        style="height: 650px"
      >
        <template
          v-if="!isLargeScreen"
          v-slot:navigation-icon="{ active, btnProps, onClick }"
        >
          <q-btn
            v-if="active"
            size="sm"
            :icon="btnProps.icon"
            color="primary"
            text-color="rojo-colmed"
            round
            dense
            @click="onClick"
          />
          <q-btn
            v-else
            size="xs"
            :icon="btnProps.icon"
            color="secondary"
            round
            outline
            dense
            @click="onClick"
          />
        </template>
        <q-carousel-slide
          v-for="(noticia, index) in noticias_destacadas"
          :key="index"
          :name="index + 1"
          class="column no-wrap bg-destacado"
        >
          <div
            class="row fit q-gutter-xs q-col-gutter no-wrap"
            :class="isLargeScreen ? 'justify-start items-center' : 'column'"
          >
            <div
              :class="isLargeScreen ? 'col-6 q-pa-md' : 'q-pa-md full-width'"
            >
              <div class="q-gutter-y-md column">
                <div
                  class="text-weight-bolder text-primary"
                  :class="isLargeScreen ? 'text-h3' : 'text-h4'"
                >
                  {{ noticia.titulo }}
                </div>
                <div
                  class="text-weight-medium text-primary q-mt-xs"
                  :class="isLargeScreen ? 'text-h5' : 'text-h6'"
                >
                  {{ noticia.resumen_contenido }}
                </div>
                <q-btn
                  outline
                  rounded
                  color="primary"
                  label="Más información"
                  class="q-mt-md"
                  no-caps
                  padding="md"
                  :style="{ width: isLargeScreen ? '50%' : '50%' }"
                />
                <!-- @click="goToNoticia(noticia)" -->
              </div>
            </div>

            <q-img
              v-if="noticia.imagen"
              class="rounded-borders"
              :class="
                isLargeScreen ? 'col-6 full-height' : 'full-width q-mt-md'
              "
              :src="noticia.imagen"
              :ratio="isLargeScreen ? null : 4 / 3"
              :style="{
                borderRadius: isLargeScreen
                  ? '0px 30px 30px 0px'
                  : '0px 0px 30px 30px',
                height: isLargeScreen ? '100%' : carouselHeight,
                objectFit: isLargeScreen ? 'cover' : 'contain',
              }"
            ></q-img>
            <q-img
              v-else
              class="rounded-borders col-6 full-height"
              :class="isLargeScreen ? '' : 'full-width q-mt-md'"
              src="https://placehold.co/300x200"
              alt="Noticia"
              :ratio="isLargeScreen ? null : 4 / 3"
              :style="{
                height: isLargeScreen ? '100%' : carouselHeight,
                objectFit: isLargeScreen ? 'cover' : 'contain',
              }"
            ></q-img>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-card>
  <q-separator class="q-mx-xl q-mb-lg" color="primary" inset />
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useInformacionesStore } from "src/stores/informaciones";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

defineProps({
  isLargeScreen: {
    type: Boolean,
    required: true,
  },
});

const $q = useQuasar();
// const isLargeScreen = computed(() => $q.screen.gt.md);
const router = useRouter();
const autoplay = ref(true);
const informacionesStore = useInformacionesStore();
const imageSlide = ref(1);
const noticias_destacadas = computed(
  () => informacionesStore.noticias_destacadas
);
// Altura fija del carrusel
const carouselHeight = "550px";

const loading_destacadas = computed(
  () => informacionesStore.loading_destacadas
);
const error_destacadas = computed(() => informacionesStore.error_destacadas);

const goToNoticia = (noticia) => {
  router.push({
    path: `/informaciones/noticia/${noticia.id}`, // Asume que cada noticia tiene un 'id'
    state: { noticia }, // Pasar la noticia completa como estado
  });
};
</script>

<style lang="scss">
.carousel-full-width {
  &.q-carousel {
    max-width: 100%; /* Ocupa el ancho completo */
    margin: 0 auto;
  }
}
</style>
