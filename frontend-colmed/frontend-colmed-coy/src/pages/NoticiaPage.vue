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
          <q-card-section horizontal>
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
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn
              flat
              color="primary"
              label="Volver"
              @click="volverInformaciones"
            />
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
import { computed, ref, onMounted } from "vue";
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

// Aseguramos que todas_noticias esté cargada
const loading = computed(() => informacionStore.loading);

const noticia = computed(() => {
  return informacionStore.todas_noticias.find(
    (n) => n.id === parseInt(noticiaId)
  );
});

const volverInformaciones = () => {
  router.push("/informaciones");
};

onMounted(async () => {
  if (!informacionStore.todas_noticias.length) {
    await informacionStore.fetchTodasNoticias();
  }
});
</script>
