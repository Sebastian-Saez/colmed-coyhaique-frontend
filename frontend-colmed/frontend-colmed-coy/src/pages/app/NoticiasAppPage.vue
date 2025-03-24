<template>
  <q-page class="q-pa-md bg-cyan-1">
    
    <q-inner-loading
      :showing="loading"
      label="Cargando noticias..."
      label-class="text-primary"
      label-style="font-size: 1.1em"
    />

    <div v-if="!loading">
      <q-card flat class="bg-cyan-1">
        <q-card-section>
          <div
            class="text-h3 text-primary text-center text-weight-bolder"
            style="letter-spacing: 10px"
          >
            Noticias
          </div>
          <q-separator inset />
          <q-card
            v-if="!loading && todas_noticias.length === 0"
            class="bg-blue-2 q-mx-sm q-mt-xs"
            style="border-radius: 20px;"
          >
            <div class="text-center q-pa-sm text-primary text-weight-light
              ">No hay noticias disponibles.</div>
          </q-card>
        </q-card-section>
        <q-carousel
          v-if="todas_noticias.length >=1"
          v-model="slideRegionales"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          infinite
          :autoplay="10000"
          arrows
          control-color="primary"
          class="text-white rounded bg-cyan-1 q-pt-xs"
          height="650px"
        >
          <q-carousel-slide
            v-for="(item, index) in todas_noticias"
            :key="index"
            :name="index"
          >
            <q-card
              bordered
              class="bg-amber-1 q-pb-xl"
              style="border-radius: 20px"
              @click="goToNoticia(item)"
            >
              <q-card-section
                style="border-radius: 20px 20px 0px 0px"
                class="bg-amber-14"
              >
                <div class="text-h5 text-weight-medium">
                  {{ item.titulo }}
                </div>
              </q-card-section>
  
              <q-card-section>
                <q-img
                  v-if="item.imagen"
                  :src="item.imagen"
                  loading="lazy"
                  spinner-color="primary"
                  :ratio="4 / 4"
                />
                <q-img
                  v-else
                  src="https://placehold.co/300x200"
                  loading="lazy"
                  spinner-color="primary"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-primary q-px-sm text-justify">
                  {{ item.resumen_contenido }}
                </div>
              </q-card-section>
            </q-card>
            <!-- <q-btn flat @click="goToNoticia(item)">
            
          </q-btn> -->
          </q-carousel-slide>
        </q-carousel>
        
      </q-card>
    </div>
    
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useInformacionesStore } from "src/stores/informaciones";
const informacionStore = useInformacionesStore();
// Lógica, composables, etc.
const router = useRouter();
// Controla el slide activo en el carousel
const slideRegionales = ref(0);

//const todas_noticias = computed(() => informacionStore.todas_noticias_app || []);
const todas_noticias = computed(() => informacionStore.todas_noticias_app || []);
const loading = computed(() => informacionStore.loading_app);

const dialogOpen = ref(false);
const selectedItem = ref(null);

const goToNoticia = async (noticia) => {
  await informacionStore.noticiaApp(noticia);
  router.push({
    path: `/colmed/noticia-app/${noticia.id}`, // Asume que cada noticia tiene un 'id'
  });
};

onMounted(async () => {
  await informacionStore.fetchTodasNoticiasApp();
});
</script>

<style scoped>
/* Estilos específicos */
</style>
