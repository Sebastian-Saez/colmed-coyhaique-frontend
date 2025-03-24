<template>
  <q-page class="q-pa-md bg-cyan-1">
    <!-- Inner loading se muestra mientras loading_evento sea true -->
    <q-inner-loading
      :showing="loading_evento"
      label="Cargando eventos..."
      label-class="text-primary"
      label-style="font-size: 1.1em"
    />

    <!-- Mostrar contenido sólo si no está cargando -->
    <div v-if="!loading_evento">
      <q-card flat class="bg-cyan-1">
        <q-card-section>
          <div
            class="text-h3 text-primary text-center text-weight-bolder"
            style="letter-spacing: 10px"
          >
            Eventos
          </div>
        </q-card-section>
        <q-separator inset />
        <q-item>
          <q-item-section class="text-h5 text-primary text-weight-bold q-ml-xs">
            Eventos para público general
          </q-item-section>
        </q-item>
        <q-carousel
          v-if="eventosPublicos.length >=1"
          v-model="slideEventosGenerales"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          infinite
          :autoplay="10000"
          control-color="primary"
          class="text-white rounded bg-cyan-1 q-mb-lg"
        >
          <q-carousel-slide
            v-for="(item, index) in eventosPublicos"
            :key="index"
            :name="index"
          >
            <q-card
              bordered
              class="bg-orange-1 q-pb-md"
              style="border-radius: 20px"
              clickable
              @click="verEvento(item)"
            >
              <q-card-section
                style="border-radius: 20px 20px 0px 0px"
                class="bg-orange-12"
              >
                <div class="text-h5 text-weight-medium text-center">
                  {{ item.titulo }}
                </div>
              </q-card-section>
              <q-card-section>
                <q-img
                  v-if="item.imagen"
                  :src="item.imagen"
                  loading="lazy"
                  spinner-color="primary"
                  :ratio="1"
                />
                <q-img
                  v-else
                  src="https://placehold.co/300x200"
                  loading="lazy"
                  spinner-color="primary"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-primary q-px-xs text-justify">
                  {{ item.descripcion }}
                </div>
              </q-card-section>
            </q-card>
          </q-carousel-slide>
        </q-carousel>
        <!-- Banners fijos para mensajes cuando no existan eventos -->
        <q-card
          v-if="!loading_evento && eventosPublicos.length === 0"
          class="bg-blue-2 q-mx-sm"
          style="border-radius: 20px;"
        >
          <div class="text-center q-pa-sm text-primary text-weight-light
            ">No hay eventos públicos disponibles.</div>
        </q-card>
        <q-separator inset spaced />
        <q-item>
          <q-item-section class="text-h5 text-primary text-weight-bold q-ml-xs">
            Eventos para Colegiados
          </q-item-section>
        </q-item>
        <q-carousel
          v-if="eventosColegiados.length >=1"
          v-model="slideEventosColegiados"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          infinite
          :autoplay="10000"
          control-color="primary"
          class="text-white rounded bg-cyan-1"
        >
          <q-carousel-slide
            v-for="(item, index) in eventosColegiados"
            :key="index"
            :name="index"
          >
            <q-card
              bordered
              class="bg-orange-1 q-pb-md"
              style="border-radius: 20px"
              clickable
              @click="verEvento(item)"
            >
              <q-card-section
                style="border-radius: 20px 20px 0px 0px"
                class="bg-orange-14"
              >
                <div class="text-h5 text-weight-medium text-center">
                  {{ item.titulo }}
                </div>
              </q-card-section>
              <q-card-section>
                <q-img
                  v-if="item.imagen"
                  :src="item.imagen"
                  loading="lazy"
                  spinner-color="primary"
                  :ratio="1"
                />
                <q-img
                  v-else
                  src="https://placehold.co/300x200"
                  loading="lazy"
                  spinner-color="primary"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-primary q-px-xs text-justify">
                  {{ item.descripcion }}
                </div>
              </q-card-section>
            </q-card>
          </q-carousel-slide>
        </q-carousel>
      </q-card>
      
      <!-- Diálogo para ver detalles del evento -->
      <q-dialog v-model="showEventoDialog">
        <q-card
          bordered
          style="min-width: 400px; max-width: 90vw; border-radius: 20px"
          class="bg-white"
        >
          <q-img
            v-if="selectedEvento?.imagen"
            :src="selectedEvento.imagen"
            spinner-color="primary"
            class="rounded-borders"
            :ratio="1"
          />
          <q-btn
            color="teal"
            no-caps
            style="width: 100%"
            @click="showEventoDialog = false"
          >
            <div class="text-white text-weight-medium text-h6">Cerrar</div>
          </q-btn>
        </q-card>
      </q-dialog>
    </div>

    <q-card
      v-if="!loading_evento && eventosColegiados.length === 0"
      class="bg-blue-2 q-mx-sm"
          style="border-radius: 20px;"
        >
          <div class="text-center q-pa-sm text-primary text-weight-light">
        No hay eventos para colegiados disponibles.
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useEventosStore } from "src/stores/eventos";

const slideEventosGenerales = ref(0);
const slideEventosColegiados = ref(0);
const eventoStore = useEventosStore();

// Si eventoStore.eventos_base_app es null, se devuelve un arreglo vacío para evitar errores.
const eventosPublicos = computed(() =>
  eventoStore.eventos_base_app ? eventoStore.eventos_base_app.filter(evento => evento.privado === false) : []
);

const eventosColegiados = computed(() =>
  eventoStore.eventos_base_app ? eventoStore.eventos_base_app.filter(evento => evento.privado === true) : []
);

// Indicador de carga basado en la variable del store
const loading_evento = computed(() => {
  return eventoStore.loading_base_app || !eventoStore.eventos_base_app;
});

const showEventoDialog = ref(false);
const selectedEvento = ref(null);

const verEvento = (evento) => {
  selectedEvento.value = evento;
  showEventoDialog.value = true;
};

onMounted(async () => {
  await eventoStore.fetchEventosBaseApp();
});
</script>

<style scoped>
/* Estilos específicos */
</style>
