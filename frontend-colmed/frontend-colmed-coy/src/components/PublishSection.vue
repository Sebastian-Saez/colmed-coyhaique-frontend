<template>
  <q-card class="q-mb-lg bg-destacado" flat>
    <div :class="{ 'q-pl-xs q-pr-xs': !isLargeScreen }">
      <!-- Spinner de carga -->
      <div v-if="!loading_publicidades" class="text-center q-my-lg">
        <q-spinner-dots size="50px" color="primary" />
        <p class="q-mt-md">Cargando datos...</p>
      </div>

      <!-- Banner de error -->
      <q-banner v-else-if="error_base" class="bg-negative text-white">
        {{ error_base }}
      </q-banner>

      <!-- QCarousel -->

      <q-carousel
        v-else
        v-model="slide"
        swipeable
        animated
        control-color="primary"
        arrows
        infinite
        :autoplay="autoplay"
        transition-prev="slide-right"
        transition-next="slide-left"
        height="100px"
        transition-duration="600"
        class="bg-terciary rounded-borders"
      >
        <!-- Acá iteramos con la función getChunks(array,2) -->
        <q-carousel-slide
          v-for="(chunk, index) in chunkedPublicidades"
          :key="index"
          :name="index + 1"
          class="column no-wrap"
        >
          <!-- <div>{{ chunk }} ????</div> -->
          <div class="row fit no-wrap justify-center items-center">
            <q-card
              v-for="(pub, pubIndex) in chunk"
              :key="pubIndex"
              class="q-mx-auto"
              clickable
              tag="a"
              :href="pub.link"
              target="_blank"
              style="width: 350px; max-width: 90%; border-radius: 15px"
            >
              <q-card-section class="bg-cyan-9 text-white">
                <div class="text-h6 text-center">
                  {{ pub.titulo }} <q-icon class="q-pl-xs" name="open_in_new" />
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- <div class="row fit no-wrap justify-center items-center">
            <q-card
              v-for="(pub, pubIndex) in chunk"
              :key="pubIndex"
              class="q-mx-auto"
              clickable
              tag="a"
              :href="pub.link"
              target="_blank"
              style="width: 300px; max-width: 90%; border-radius: 15px"
            >
              <q-card-section class="bg-cyan-9 text-white">
                <div class="text-h6">{{ pub.titulo }}</div>
              </q-card-section>
            </q-card>
          </div> -->
        </q-carousel-slide>
      </q-carousel>
    </div>
  </q-card>
  <q-separator class="q-mx-xl q-mb-lg" color="primary" inset />
</template>

<script setup>
import { computed, ref } from "vue";
import { usePublicidadStore } from "src/stores/publicidadMedica";

defineProps({
  isLargeScreen: {
    type: Boolean,
    required: true,
  },
});

// Estado del carrusel
const slide = ref(1);
const autoplay = ref(true);

// Store de publicidades médicas
const publicidadStore = usePublicidadStore();
// const loading_publicidades = ref(false);
const loading_publicidades = computed(() => publicidadStore.loading_base);
const error_base = computed(() => publicidadStore.error_base);
const publicidadesMedicas = computed(() => publicidadStore.publicidades_base);

// Función para dividir la lista en chunks de 2 elementos, con manejo especial para impar
function getChunks(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}

// chunkedPublicidades de 2 en 2
const chunkedPublicidades = computed(() => {
  return getChunks(publicidadesMedicas.value, 2);
});
</script>

<style lang="scss">
.bg-destacado {
  /* Estilos personalizados */
}

.rounded-borders {
  border-radius: 10px;
}
</style>
