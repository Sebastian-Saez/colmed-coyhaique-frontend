<template>
  <q-page class="q-pa-md bg-cyan-1">
    <q-card flat class="bg-cyan-1">
      <q-card-section>
        <div
          class="text-h3 text-primary text-center text-weight-bolder"
          style="letter-spacing: 10px"
        >
          Convenios
        </div>
      </q-card-section>

      <q-card-section>
        <q-separator inset />

        <q-item>
          <q-item-section class="text-h5 text-primary text-weight-bold"
            >Regionales</q-item-section
          >
        </q-item>
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
        <q-separator inset spaced />
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
          /></q-item-section>
        </q-item>
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
      </q-card-section>
      <!-- <q-card-actions>
        <q-btn label="Volver" color="primary" @click="$router.back()" />
      </q-card-actions> -->
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
// Lógica, composables, etc.
const tab = ref("nacionales");
// Controla el slide activo en el carousel
const slideRegionales = ref(0);
const slideNacionales = ref(0);
const convenios = ref({
  nacionales: [
    {
      titulo: "Inmobiliarias",
      ref: "https://www.colegiomedico.cl/convenios-inmobiliarias/",
    },
    {
      titulo: "Corretaje propiedades",
      ref: "https://www.colegiomedico.cl/corretaje-de-propiedades/",
    },
    {
      titulo: "Automotriz",
      ref: "https://www.colegiomedico.cl/automotriz/",
    },
    {
      titulo: "Hoteles",
      ref: "https://www.colegiomedico.cl/automotriz/",
    },
    {
      titulo: "Seguros",
      ref: "https://www.colegiomedico.cl/seguros/",
    },
    {
      titulo: "Tecnología",
      ref: "https://www.colegiomedico.cl/tecnologia/",
    },
  ],

  regionales: [
    {
      titulo: "Óptica Sottolichio",
      descripcion:
        "20% OFF\r\n\r\n\n- Aplica para todos los lentes y marcas.\r\n- Beneficio para miembros del Colmed y familia.\r\n- Y también para trabajadores de la institución.",
    },
    {
      titulo: "Ecovapor Autospa",
      descripcion:
        "Lavado de vehículo\r\n\r\n- Lavado de vehículos, tapices, motor y alfombras.\r\n- Vehículo pequeño: $20.000.\r\n- Vehículo mediano: $25.000.\r\n- Vehículo grande: $30.000.",
    },
    {
      titulo: "Rent a Car R&D",
      descripcion:
        "Estacionamiento Aeropuerto Balmaceda\r\n\r\n- Custodia de vehículos.\r\n- Acercamiento ida y vuelta al aeropuerto.\r\n- Custodia: $2.500 diarios.\r\n- Lavado Full y sanitización: $20.000.\r\n- Convenio anual: $45.000",
    },
  ],
});
</script>

<style scoped>
/* Estilos específicos */
</style>
