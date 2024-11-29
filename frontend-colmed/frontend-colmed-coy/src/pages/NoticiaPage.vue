<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <div class="q-pa-md flex justify-center">
      <div class="q-mx-xl q-px-xl" style="max-width: 1600px; width: 90%">
        <ToolbarSection />
        <q-card flat bordered v-if="noticia">
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-h5 text-primary q-mt-sm q-mb-xs">
                {{ noticia.titulo }}
              </div>
              <div class="text-subtitle1 text-weight-light text-primary">
                {{ noticia.contenido }}
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
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
    <FooterSection />
  </q-layout>
</template>

<script setup>
import ToolbarSection from "components/ToolbarSection.vue";
import FooterSection from "src/components/FooterSection.vue";
import { useRouter, useRoute } from "vue-router";
import { useInformacionesStore } from "src/stores/informaciones";
import { computed, ref, onMounted } from "vue";

defineOptions({
  name: "InformacionesPage",
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
