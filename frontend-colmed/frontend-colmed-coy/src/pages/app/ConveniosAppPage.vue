<template>
  <q-page class="q-pa-md bg-cyan-1">
    <q-inner-loading
      :showing="loading"
      label="Cargando convenios..."
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
            Convenios
          </div>
        </q-card-section>
        <q-item>
          <q-item-section class="text-h5 text-primary text-weight-bold"
            >Regionales</q-item-section
          >
        </q-item>
        <q-card
          v-if="!loading && convenios.regionales.length === 0"
          class="bg-blue-2 q-mx-sm"
              style="border-radius: 20px;"
            >
              <div class="text-center q-pa-sm text-primary text-weight-light">
              No hay convenios regionales disponibles.
          </div>
      </q-card>
        <q-card-section>
          <q-separator inset />
          
          <div v-if="convenios.regionales.length>=1">
            
            <q-carousel
              v-model="slideRegionales"
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable
              animated
              infinite
              :autoplay="10000"
              navigation
              class="text-white rounded bg-cyan-1"
              height="455px"
            >
              <q-carousel-slide
                v-for="(item, index) in convenios.regionales"
                :key="index"
                :name="index"
                class="text-center q-pa-sm"
              >
                <q-card
                  bordered
                  class="bg-pink-1"
                  style="border-radius: 20px; width: 335px; height: 445px"
                >
                  <q-card-section
                    style="border-radius: 20px 20px 0px 0px"
                    class="bg-pink-8"
                  >
                    <div class="text-h5 text-weight-medium">{{ item.titulo }}</div>
                  </q-card-section>
                  <q-card-section>
                    <div
                      class="text-h6 text-secondary text-weight-medium text-left"
                      style="white-space: pre-wrap"
                    >
                      {{ item.descripcion }}
                    </div>
                  </q-card-section>
                  <q-card-actions align="center" class="absolute-bottom q-mb-md">
                  </q-card-actions>
                </q-card>
              </q-carousel-slide>
            </q-carousel>
          </div>
          
          
<!--  ---------------------------------------------------------------------  -->
          <q-item>
            <q-item-section class="text-h5 text-primary text-weight-bold"
              >Nacionales</q-item-section
            >
            <q-item-section side
              ><q-btn
                outline
                rounded
                color="primary"
                size="sm"
                label="Ver todos los convenios"
                :href="convenios.todos_convenios_link"
                target="_blank"
            /></q-item-section>
          </q-item>
          <q-card
            v-if="!loading && convenios.nacionales.length === 0"
            class="bg-blue-2 q-mx-sm"
            style="border-radius: 20px;"
          >
            <div class="text-center q-pa-sm text-primary text-weight-light">
              No hay convenios nacionales disponibles.
            </div>
          </q-card>

          <div v-if="convenios.nacionales.length>=1">
            
            <q-carousel
              v-model="slideNacionales"
              transition-prev="fade"
              transition-next="fade"
              swipeable
              animated
              infinite
              :autoplay="10000"
              navigation
              height="220px"
              class="text-white rounded bg-cyan-1"
            >
              <q-carousel-slide
                v-for="(item, index) in convenios.nacionales"
                :key="index"
                :name="index"
                class="text-center q-pa-sm"
              >
                <q-card
                  bordered
                  class="bg-pink-1"
                  style="border-radius: 20px; width: 335px; height: 200px"
                >
                  <q-card-section
                    style="border-radius: 20px 20px 0px 0px"
                    class="bg-pink-8"
                  >
                    <div class="text-h5 text-weight-medium">{{ item.titulo }}</div>
                  </q-card-section>
                  <q-card-actions align="center">
                    <q-btn
                      :href="item.ref"
                      no-caps
                      target="_blank"
                      outline
                      rounded
                      color="primary"
                      class="q-mt-md"
                      style="width: 250px"
                    >
                      <div class="row items-center no-wrap">
                        <div class="text-center text-body1">
                          Revisa en detalle los<br />convenios en '{{
                            item.titulo
                          }}'
                        </div>
                      </div>
                    </q-btn>
                  </q-card-actions>
                </q-card>
              </q-carousel-slide>
            </q-carousel>
          </div>

          
        </q-card-section>
        <!-- <q-card-actions>
          <q-btn label="Volver" color="primary" @click="$router.back()" />
        </q-card-actions> -->
      </q-card>
    </div>
    
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useConveniosStore } from "src/stores/convenios";
// Lógica, composables, etc.
const tab = ref("nacionales");
// Controla el slide activo en el carousel
const slideRegionales = ref(0);
const slideNacionales = ref(0);
 

const conveniosStore = useConveniosStore();
const convenios = computed(() => conveniosStore.convenios);
const loading = computed(() => {
  return conveniosStore.loading || !conveniosStore.convenios;
});

onMounted(async () => {
  await conveniosStore.fetchConvenios();
});

</script>

<style scoped>
/* Estilos específicos */
</style>
