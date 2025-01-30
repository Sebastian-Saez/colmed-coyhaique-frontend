<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <div class="q-pa-md">
      <div
        class="q-mt-xs justify-center"
        :class="isLargeScreen ? 'q-mx-xl q-px-xl' : ''"
      >
        <ToolbarSection :isLargeScreen="isLargeScreen" />
        <q-card
          class="q-pa-md bg-grey-2"
          flat
          bordered
          style="border-radius: 20px"
          v-if="noticia"
        >
          <q-splitter
            v-model="splitterModel"
            style="height: auto"
            :limits="[0, 100]"
            before-class="overflow-hidden"
            after-class="overflow-hidden"
            separator-class="bg-black"
          >
            <template v-slot:before>
              <q-card-section class="q-pt-xs">
                <div
                  class="text-h5 text-primary text-weight-medium q-mt-sm q-mb-xs"
                >
                  {{ noticia.titulo }}
                </div>
                <q-separator spaced />
                <div
                  class="text-subtitle1 text-weight-regular text-primary text-justify"
                >
                  {{ noticia.contenido }}
                </div>
              </q-card-section>
            </template>

            <template v-slot:after>
              <!-- <q-img
          src="https://cdn.quasar.dev/img/parallax1-inverted.jpg"
          :ratio="16/9"
        /> -->
              <q-img
                v-if="noticia.imagen"
                class="rounded-borders"
                :src="noticia.imagen"
                @load="ajustarSplitter(noticia.imagen)"
                ref="noticiaImagen"
              />
              <q-img
                v-else
                src="https://placehold.co/300x200"
                alt="Noticia"
                class="rounded-md q-mt-md"
                :ratio="16 / 9"
              />
            </template>
          </q-splitter>
          <!-- <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div
                class="text-h5 text-primary text-weight-medium q-mt-sm q-mb-xs"
              >
                {{ noticia.titulo }}
              </div>
              <q-separator spaced />
              <div
                class="text-subtitle1 text-weight-regular text-primary text-justify"
              >
                {{ noticia.contenido }}
              </div>
            </q-card-section>

            <q-card-section class="col-5">
              <q-img
                v-if="noticia.imagen"
                class="rounded-borders"
                :src="noticia.imagen"
              />
              <q-img
                v-else
                src="https://placehold.co/300x200"
                alt="Noticia"
                class="rounded-md q-mt-md"
              />
            </q-card-section>
          </q-card-section> -->

          <q-separator />

          <q-card-actions>
            <q-btn flat color="primary" label="Volver" @click="volver" />
          </q-card-actions>
        </q-card>

        <div v-else-if="loading">
          <q-spinner-dots size="50px" color="primary" />
          <p class="q-mt-md">Cargando noticia...</p>
        </div>
        <div v-else>
          <p>No se encontró la noticia solicitada.</p>
        </div>
      </div>
    </div>
    <FooterSection :isLargeScreen="isLargeScreen" />
  </q-layout>
</template>

<script setup>
import ToolbarSection from "components/ToolbarSection.vue";
import FooterSection from "src/components/FooterSection.vue";
import { useRouter, useRoute } from "vue-router";
import { useInformacionesStore } from "src/stores/informaciones";
import { computed, ref, onMounted, nextTick } from "vue";
import { useQuasar } from "quasar";

defineOptions({
  name: "InformacionesPage",
});

const $q = useQuasar();
const isLargeScreen = computed(() => {
  return $q.screen.gt.md;
});

const informacionStore = useInformacionesStore();
const route = useRoute();
const router = useRouter();
const categoriaInformacion = computed(
  () => informacionStore.pagina_informaciones
);
// Utiliza el ID de la ruta para encontrar la noticia en el store
const noticiaId = route.params.id;
const splitterModel = ref(50);
// Aseguramos que todas_noticias esté cargada
const loading = computed(() => informacionStore.loading);

// const noticia = computed(() => {
//   return informacionStore.todas_noticias.find(
//     (n) => n.id === parseInt(noticiaId)
//   );
// });
const noticia = ref(null);
const noticiaImagen = ref(null);

const volver = () => {
  router.go(-1);
};

// Ajustar splitter basado en la imagen
const ajustarSplitter = async () => {
  await nextTick(); // Asegura que la imagen está en el DOM antes de acceder a sus propiedades

  if (noticiaImagen.value?.$el) {
    const img = noticiaImagen.value.$el.querySelector("img"); // Accede a la imagen interna
    if (img) {
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      splitterModel.value = Math.max(30, Math.min(70, aspectRatio * 100)); // Ajusta entre 30% y 70%
    }
  }
};

onMounted(async () => {
  // if (!informacionStore.todas_noticias.length) {
  //   await informacionStore.fetchTodasNoticias();
  // }
  await informacionStore.fetchTodasNoticias();
  noticia.value = informacionStore.todas_noticias.find(
    (n) => n.id === parseInt(noticiaId)
  );
  if (noticia.value?.imagen) {
    ajustarSplitter(); // Ajustar el splitter basado en la imagen
  }
});
</script>
