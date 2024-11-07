<template>
  <!-- Toolbar -->

  <q-card flat class="q-mb-lg q-pa-lg custom-header text-primary">
    <q-separator color="primary" inset />
    <q-toolbar>
      <q-toolbar-title>
        <q-btn flat @click="goHome">
          <q-img src="~assets/LogoCOLMEDAYSEN_blanco.png" class="logo-img" />
        </q-btn>

        <!-- <img
              src="~assets/LogoCOLMEDAYSEN_blanco.png"
              alt="Colegio Médico Logo"
              style="width: 204px; height: 82px"
            /> -->
      </q-toolbar-title>

      <!--Sección Quienes Somos-->
      <div class="q-pl-xs">
        <q-btn
          flat
          label="Quiénes Somos"
          no-caps
          @mouseenter="dropdownVisible.quienesSomos = true"
          @mouseleave="startCloseTimer('quienesSomos')"
          @click="dropdownVisible.quienesSomos = !dropdownVisible.quienesSomos"
          icon-right="arrow_drop_down"
        ></q-btn>
        <q-popup-proxy
          class="custom-popup-style"
          ref="popupQuienesSomos"
          v-model="dropdownVisible.quienesSomos"
          transition-show="flip-down"
          transition-hide="flip-up"
          persistent
          fit
          anchor="bottom left"
          self="top left"
          @mouseenter="clearCloseTimer('quienesSomos')"
          @mouseleave="startCloseTimer('quienesSomos')"
        >
          <q-list dense>
            <q-item
              clickable
              @click="onItemClickQuienesSomos(val)"
              v-for="val in lista_quienes_somos"
              :key="val.clave"
            >
              <q-item-section>
                <q-item-label caption class="text-bold">{{
                  val.nombre
                }}</q-item-label>
              </q-item-section>
              <q-item-section avatar v-if="val.clave == 'colmed'">
                <q-avatar
                  icon="arrow_forward"
                  flat
                  size="md"
                  text-color="red"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-popup-proxy>
      </div>

      <!--Sección de Servicios-->
      <div class="q-pl-xs">
        <q-btn
          flat
          label="Servicios"
          no-caps
          @mouseenter="dropdownVisible.servicios = true"
          @mouseleave="startCloseTimer('servicios')"
          @click="dropdownVisible.servicios = !dropdownVisible.servicios"
          icon-right="arrow_drop_down"
        ></q-btn>
        <q-popup-proxy
          class="custom-popup-style"
          ref="popupServicios"
          v-model="dropdownVisible.servicios"
          transition-show="flip-down"
          transition-hide="flip-up"
          persistent
          fit
          anchor="bottom left"
          self="top left"
          @mouseenter="clearCloseTimer('servicios')"
          @mouseleave="startCloseTimer('servicios')"
        >
          <q-list dense>
            <q-item
              clickable
              @click="onItemClickServicios(val)"
              v-for="val in lista_servicios"
              :key="val.clave"
            >
              <q-item-section>
                <q-item-label caption class="text-bold">{{
                  val.nombre
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-popup-proxy>
      </div>

      <!-- Sección Informaciones-->
      <div class="q-pl-xs">
        <q-btn
          flat
          label="Informaciones"
          no-caps
          @mouseenter="dropdownVisible.informaciones = true"
          @mouseleave="startCloseTimer('informaciones')"
          @click="
            dropdownVisible.informaciones = !dropdownVisible.informaciones
          "
          icon-right="arrow_drop_down"
        ></q-btn>
        <q-popup-proxy
          class="custom-popup-style"
          ref="popupInformaciones"
          v-model="dropdownVisible.informaciones"
          transition-show="flip-down"
          transition-hide="flip-up"
          persistent
          fit
          anchor="bottom left"
          self="top left"
          @mouseenter="clearCloseTimer('informaciones')"
          @mouseleave="startCloseTimer('informaciones')"
        >
          <q-list dense>
            <q-item
              clickable
              v-close-popup
              @click="
                selectInformacion = val;
                onItemClickInformaciones(val);
              "
              v-for="val in lista_informaciones"
              :key="val.clave"
            >
              <q-item-section>
                <q-item-label caption class="text-bold">{{
                  val.nombre
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-popup-proxy>
      </div>

      <!-- Sección Contacto-->
      <div class="q-pl-xs">
        <q-btn
          flat
          label="Contacto"
          no-caps
          @mouseenter="dropdownVisible.contactos = true"
          @mouseleave="startCloseTimer('contactos')"
          @click="dropdownVisible.contactos = !dropdownVisible.contactos"
          icon-right="arrow_drop_down"
        ></q-btn>
        <q-popup-proxy
          ref="popupContactos"
          v-model="dropdownVisible.contactos"
          transition-show="flip-down"
          transition-hide="flip-up"
          persistent
          fit
          anchor="bottom left"
          self="top left"
          @mouseenter="clearCloseTimer('contactos')"
          @mouseleave="startCloseTimer('contactos')"
        >
          <q-list dense>
            <q-item
              clickable
              v-close-popup
              @click="onItemClickContactos(val)"
              v-for="val in lista_contactos"
              :key="val.clave"
            >
              <q-item-section avatar>
                <q-avatar
                  :icon="val.icono"
                  flat
                  size="md"
                  text-color="primary"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>{{ val.label }}</q-item-label>
                <q-item-label caption class="text-bold">{{
                  val.nombre
                }}</q-item-label>
              </q-item-section>
              <!-- Tooltip -->
            </q-item>

            <!-- <q-tooltip
                  v-model="tooltipVisible"
                  transition-show="jump-down"
                  transition-hide="jump-up"
                >
                  {{ val.tooltipText }}
                </q-tooltip> -->
          </q-list>
        </q-popup-proxy>

        <q-popup-proxy
          v-model="messagePopup.visible"
          transition-show="scale"
          transition-hide="scale"
          anchor="bottom middle"
          self="top middle"
        >
          <div class="q-pa-sm text-white bg-grey rounded-borders">
            {{ messagePopup.message }}
          </div>
        </q-popup-proxy>
      </div>

      <div class="q-gutter-sm">
        <q-btn
          label="Mi gestión"
          color="primary"
          outline
          rounded
          @click="irALogin"
        />
        <q-btn
          label="Mi Colmed"
          rounded
          outline
          color="red"
          @click="goMiColmed"
        />
      </div>
    </q-toolbar>
  </q-card>
</template>
<script setup>
defineOptions({
  name: "ToolbarSection",
});

import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useSomosStore } from "src/stores/quienesSomos";
import { useServicioStore } from "src/stores/servicios";
import { useInformacionesStore } from "src/stores/informaciones";
import { copyToClipboard } from "quasar";

const contacto_colmed_aysen = ref({
  numero_telefono: "67-2232833",
  direccion_colmed_aysen: "Pdte. Montt Nº 69, Coyhaique",
  correo_colmed_aysen: "reg.coyhaique@colegiomedico.cl",
});

const dropdownVisible = ref({
  quienesSomos: false,
  servicios: false,
  informaciones: false,
  contactos: false,
});
const closeTimers = {};

const messagePopup = ref({
  visible: false,
  message: "",
  target: null,
});

const router = useRouter();
const servicioStore = useServicioStore();
const somosStore = useSomosStore();
const informacionStore = useInformacionesStore();

// Redirigir a home
const goHome = () => {
  router.push("/home");
};

const clearCloseTimer = (dropdownName) => {
  if (closeTimers[dropdownName]) {
    clearTimeout(closeTimers[dropdownName]); // Cancela el temporizador
    closeTimers[dropdownName] = null; // Limpia la referencia
  }
};

const startCloseTimer = (dropdownName) => {
  clearCloseTimer(dropdownName);
  closeTimers[dropdownName] = setTimeout(() => {
    dropdownVisible.value[dropdownName] = false;
  }, 150); // Adjust the delay as needed
};

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
  {
    clave: "transparencia",
    nombre: "Transparencia",
  },
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
];

const lista_contactos = reactive([
  {
    clave: "telefono",
    nombre: contacto_colmed_aysen.value.numero_telefono,
    label: "Teléfono",
    icono: "call",
    tooltipText: "¡Teléfono copiado al portapapeles!",
  },
  {
    clave: "direccion",
    nombre: contacto_colmed_aysen.value.direccion_colmed_aysen,
    label: "Dirección",
    icono: "pin_drop",
    tooltipText: "¡Dirección copiada al portapapeles!",
  },
  {
    clave: "correo",
    nombre: contacto_colmed_aysen.value.correo_colmed_aysen,
    label: "Correo",
    icono: "contact_mail",
    tooltipText: "",
  },
]);

const goMiColmed = () => {
  window.open(
    "https://micolmed.colegiomedico.cl/",
    "_blank",
    "noopener,noreferrer"
  );
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
      informacionStore.setCategoriaInformacion(val.clave);
      router.push("/informaciones");
      break;
    default:
      console.log("Error en valor : ", val);
  }
};
const onItemClickContactos = (val) => {
  dropdownVisible.value.contactos = false;
  switch (val.clave) {
    case "telefono":
    case "direccion":
      copyToClipboard(val.nombre).then(() => {
        console.log(`${val.label} copiado al portapapeles:`, val.nombre);
        // Mostrar tooltip
        // Mostrar popup cerca del elemento clickeado
        messagePopup.value.message = `${val.label} copiado al portapapeles!`;

        messagePopup.value.visible = true;
        // Ocultar popup después de 2 segundos
        setTimeout(() => {
          messagePopup.value.visible = false;
        }, 1800);
      });
      break;
    case "correo":
      window.location.href = `mailto:${val.nombre}`;
      break;
    default:
      console.log("Error en valor: ", val);
  }
};

const irALogin = () => {
  router.push("/login"); // Redirección a la página de login
};
</script>
