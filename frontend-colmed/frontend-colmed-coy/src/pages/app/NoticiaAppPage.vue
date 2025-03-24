<template>
  <q-page class="q-pa-md bg-cyan-1">
    <q-card
            v-if="!noticia"
            class="bg-blue-2 q-mx-sm q-mt-xs"
            style="border-radius: 20px;"
          >
            <div class="text-center q-pa-sm text-primary text-weight-light
              ">No hay información disponible.</div>
          </q-card>
    <q-card flat class="bg-cyan-1" v-if="noticia">
      <q-card-section
        style="border-radius: 20px 20px 0px 0px"
        class="bg-amber-14"
      >
        <div class="text-h5 text-weight-medium text-white">
          {{ noticia.titulo }}
        </div>
      </q-card-section>
      <q-scroll-area style="height: 600px" class="bg-amber-1">
        <q-card-section>
          <q-img
            v-if="noticia.imagen"
            :src="noticia.imagen"
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
          <div class="text-h6 text-primary q-px-md text-justify">
            {{ noticia.contenido }}
          </div>
        </q-card-section>
      </q-scroll-area>

      <q-card-actions align="center" class="bg-amber-1">
        <q-btn
          rounded
          style="width: 100px"
          no-caps
          label="Volver"
          color="primary"
          @click="$router.back()"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";
import { useInformacionesStore } from "src/stores/informaciones";
import { useRouter } from "vue-router";

const router = useRouter();
const informacionStore = useInformacionesStore();

const noticia = computed(() => informacionStore.noticia_app || null);
</script>

<style scoped>
/* Estilos específicos */
</style>
