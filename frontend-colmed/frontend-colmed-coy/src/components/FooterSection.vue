<template>
  <q-card class="bg-primary text-white q-mt-lg q-pt-lg">
    <!-- <div class="justify-center" :class="isLargeScreen ? 'q-pa-md flex' : ''"> -->
    <div
      class="justify-center"
      :class="
        screenSize !== 'xs' && screenSize !== 'sm' && screenSize !== 'md'
          ? 'q-pa-md flex'
          : ''
      "
    >
      <!-- <div
        class=""
        :class="isLargeScreen ? 'q-mx-xl q-px-xl' : ''"
        style="max-width: 1600px; width: 90%"
      > -->
      <div
        class=""
        :class="
          screenSize !== 'xs' && screenSize !== 'sm' && screenSize !== 'md'
            ? 'q-mx-xl q-px-xl'
            : ''
        "
        style="max-width: 1600px; width: 90%"
      >
        <q-card class="bg-primary" flat>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6 col-md-3">
              <div class="text-subtitle1 text-weight-bolder text-white q-pl-lg">
                Colegio Médico Aysén
              </div>
              <q-list dense class="q-mr-xl">
                <q-item
                  v-for="val in filteredQuienesSomos"
                  v-ripple
                  :key="val.clave"
                  clickable
                  @click="onItemClickQuienesSomos(val)"
                >
                  <q-item-section v-if="val.clave !== 'colmed'" side>
                    <q-icon name="arrow_right" color="white" />
                  </q-item-section>
                  <q-item-section v-if="val.clave !== 'colmed'">
                    <q-item-label class="text-white text-overline">
                      {{ val.nombre }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <div class="text-subtitle1 text-weight-bolder text-white q-pl-lg">
                Servicios
              </div>
              <q-list dense>
                <q-item
                  v-for="val in lista_servicios"
                  :key="val.clave"
                  clickable
                  v-ripple
                  @click="onItemClickServicios(val)"
                >
                  <q-item-section v-if="val.clave !== 'colmed'" side>
                    <q-icon name="arrow_right" color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white text-overline">
                      {{ val.nombre }}</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <div class="text-subtitle1 text-weight-bolder text-white q-pl-lg">
                Mantente Informado
              </div>
              <q-list dense>
                <q-item
                  v-for="val in lista_informaciones"
                  :key="val.clave"
                  clickable
                  v-ripple
                  @click="onItemClickInformaciones(val)"
                >
                  <q-item-section v-if="val.clave !== 'colmed'" side>
                    <q-icon name="arrow_right" color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-white text-overline">{{
                      val.nombre
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <div class="text-subtitle1 text-weight-bolder text-white q-pl-sm">
                Síguenos
              </div>
              <div class="flex space-x-2">
                <q-btn
                  flat
                  round
                  icon="fab fa-facebook-f"
                  @click="goFacebook"
                  :size="
                    screenSize !== 'xs' &&
                    screenSize !== 'sm' &&
                    screenSize !== 'md'
                      ? 'md'
                      : 'lg'
                  "
                />
                <q-btn
                  flat
                  round
                  icon="fab fa-x-twitter"
                  class="text-white"
                  :size="
                    screenSize !== 'xs' &&
                    screenSize !== 'sm' &&
                    screenSize !== 'md'
                      ? 'md'
                      : 'lg'
                  "
                  @click="goX"
                />
                <q-btn
                  flat
                  round
                  icon="fab fa-instagram"
                  class="text-white"
                  :size="
                    screenSize !== 'xs' &&
                    screenSize !== 'sm' &&
                    screenSize !== 'md'
                      ? 'md'
                      : 'lg'
                  "
                  @click="goInstagram"
                />
                <q-btn
                  flat
                  round
                  icon="forward_to_inbox"
                  class="text-white"
                  :size="
                    screenSize !== 'xs' &&
                    screenSize !== 'sm' &&
                    screenSize !== 'md'
                      ? 'md'
                      : 'lg'
                  "
                  @click="goMailTo"
                />
              </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3">
              <q-btn
                label="Mi gestión"
                color="white"
                class="text-weight-regular q-ml-md"
                no-caps
                outline
                rounded
                @click="irALogin"
              />
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <div
      class="row justify-center items-center q-px-md q-pt-sm q-pb-xs bg-footer-main"
      style="max-width: 100%"
    >
      <div class="text-weight-light text-center">
        ©2024 Colegio Médico Aysén - Colegio Médico de Chile
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useServicioStore } from "src/stores/servicios";
import { useInformacionesStore } from "src/stores/informaciones";
import { useSomosStore } from "src/stores/quienesSomos";

// defineProps({
//   isLargeScreen: {
//     type: Boolean,
//     required: true,
//   },
// });
const props = defineProps({
  screenSize: {
    type: String,
    required: true,
  },
});
const router = useRouter();
const servicioStore = useServicioStore();
const informacionesStore = useInformacionesStore();
const somosStore = useSomosStore();

const lista_quienes_somos = [
  {
    clave: "mision",
    nombre: "Misión y Visión",
  },
  {
    clave: "normativa",
    nombre: "Normativa",
  },
  {
    clave: "directiva",
    nombre: "Directiva",
  },
  //   {
  //     clave: "transparencia",
  //     nombre: "Transparencia",
  //   },
  {
    clave: "colmed",
    nombre: "Colegio Médico de Chile",
  },
];

const lista_servicios = [
  {
    clave: "pagos",
    nombre: "Pago de cuotas",
  },
  {
    clave: "colegiarse",
    nombre: "Cómo Colegiarse",
  },
  {
    clave: "casa_medico",
    nombre: "Casa del médico",
  },
];

const lista_informaciones = [
  {
    clave: "noticias",
    nombre: "Todas las noticias",
  },
  {
    clave: "eventos",
    nombre: "Todos los eventos",
  },
  {
    clave: "convenios",
    nombre: "Todos los convenios",
  },
];

const dropdownVisible = ref({
  quienesSomos: false,
  servicios: false,
  informaciones: false,
  contactos: false,
});

const goFacebook = () => {
  window.open(
    "https://web.facebook.com/Colegiomedicoaysen",
    "_blank",
    "noopener,noreferrer"
  );
};

const goX = () => {
  window.open("https://x.com/colmedcoyhaique", "_blank", "noopener,noreferrer");
};

const goInstagram = () => {
  window.open(
    "https://www.instagram.com/colmedaysen/",
    "_blank",
    "noopener,noreferrer"
  );
};

const filteredQuienesSomos = computed(() =>
  lista_quienes_somos.filter((item) => item.clave !== "colmed")
);

const goMailTo = () => {
  window.location.href = `mailto:$reg.coyhaique@colegiomedico.cl`;
};

const onItemClickQuienesSomos = (val) => {
  dropdownVisible.value.quienesSomos = false;
  switch (val.clave) {
    case "mision":
    case "normativa":
    case "directiva":
    case "transparencia":
      somosStore.setCategoriaSomos(val.clave);
      router.push("/quienes-somos");
      break;
    case "colmed":
      window.open(
        "https://www.colegiomedico.cl/",
        "_blank",
        "noopener,noreferrer"
      );
      break;
    default:
      console.log("Error en valor : ", val);
  }
};

const onItemClickServicios = (val) => {
  dropdownVisible.value.servicios = false;
  switch (val.clave) {
    case "pagos":
    case "colegiarse":
    case "casa_medico":
      servicioStore.setCategoriaServicio(val.clave);
      router.push("/servicios");
      break;
    default:
      console.log("Error en valor : ", val);
  }
};
const onItemClickInformaciones = (val) => {
  dropdownVisible.value.informaciones = false;
  switch (val.clave) {
    case "noticias":
    case "eventos":
    case "convenios":
      informacionesStore.setCategoriaInformacion(val.clave);
      router.push("/informaciones");
      break;
    default:
      console.log("Error en valor : ", val);
  }
};

const irALogin = () => {
  router.push("/login"); // Redirección a la página de login
};
</script>
