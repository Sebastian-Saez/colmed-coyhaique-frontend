<template>
  <q-card
    flat
    class="q-mb-md q-pt-xs custom-header text-primary q-mr-xl"
    style="border-radius: 20px"
  >
    <q-separator
      color="primary"
      class=""
      :class="isLargeScreen ? '' : 'q-mr-xs'"
    />
    <q-toolbar class="custom-header2">
      <q-toolbar-title>
        <q-btn align="left" flat padding="xs" @click="goHome">
          <q-img
            src="~assets/CR-Region-de-Aysen_horizontal.png"
            class="logo-img q-ml-xs"
          />
        </q-btn>
      </q-toolbar-title>
      <!-- Menú para pantallas pequeñas -->
      <template v-if="!isLargeScreen">
        <q-btn
          flat
          size="xl"
          :icon="menuVisible ? 'close' : 'menu'"
          @click="menuVisible = !menuVisible"
          class="q-ml-xl"
        >
          <!-- Opciones de Menú -->
          <q-menu
            fit
            transition-show="fade"
            transition-hide="slide-up"
            class="menu-full-width"
            :offset="[0, 20]"
            persistent
          >
            <q-list bordered class="rounded-borders">
              <!-- Quienes Somos -->
              <q-expansion-item
                dense-toggle
                expand-separator
                label="Quiénes Somos"
                header-class="bg-light-blue-10 text-white"
                expand-icon-class="text-white"
                class="text-weight-regular text-center"
              >
                <q-list>
                  <q-item
                    v-for="val in lista_quienes_somos"
                    :key="val.clave"
                    clickable
                    @click="onItemClickQuienesSomos(val)"
                  >
                    <q-item-section>
                      <div class="text-overline">
                        {{ val.nombre }}
                      </div></q-item-section
                    >
                  </q-item>
                </q-list>
              </q-expansion-item>
              <q-expansion-item
                dense-toggle
                expand-separator
                label="Servicios"
                header-class="bg-light-blue-10 text-white"
                expand-icon-class="text-white"
                class="text-weight-regular text-center"
              >
                <q-list>
                  <q-item
                    v-for="val in lista_servicios"
                    :key="val.clave"
                    clickable
                    @click="onItemClickServicios(val)"
                  >
                    <q-item-section>
                      <div class="text-overline">
                        {{ val.nombre }}
                      </div></q-item-section
                    >
                  </q-item>
                </q-list>
              </q-expansion-item>

              <!-- Informaciones -->
              <q-expansion-item
                dense-toggle
                expand-separator
                label="Informaciones"
                header-class="bg-light-blue-10 text-white"
                expand-icon-class="text-white"
                class="text-weight-regular text-center"
              >
                <q-list>
                  <q-item
                    v-for="val in lista_informaciones"
                    :key="val.clave"
                    clickable
                    @click="onItemClickInformaciones(val)"
                  >
                    <q-item-section>
                      <div class="text-overline">
                        {{ val.nombre }}
                      </div></q-item-section
                    >
                  </q-item>
                </q-list>
              </q-expansion-item>

              <!-- Contacto -->
              <q-expansion-item
                dense-toggle
                expand-separator
                label="Contacto"
                header-class="bg-light-blue-10 text-white"
                expand-icon-class="text-white"
                class="text-weight-regular text-center"
              >
                <q-list>
                  <q-item
                    v-for="val in lista_contactos"
                    :key="val.clave"
                    clickable
                    @click="onItemClickContactos(val)"
                  >
                    <q-item-section>
                      <div class="text-overline">
                        {{ val.label }}: {{ val.nombre
                        }}<q-icon class="q-pl-md" :name="val.icono_accion" />
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-popup-proxy
                    v-if="!isLargeScreen"
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
                </q-list>
              </q-expansion-item>
              <q-card flat>
                <q-separator spaced />
                <q-card-actions vertical>
                  <q-btn
                    icon-right="keyboard_arrow_right"
                    label="Mi Gestión"
                    class="text-subtitle2"
                    no-caps
                    rounded
                    color="primary"
                    @click="irALogin"
                  />
                  <q-separator spaced />
                  <q-btn
                    icon-right="keyboard_arrow_right"
                    label="Mi Colmed"
                    class="text-subtitle2"
                    no-caps
                    rounded
                    color="red"
                    @click="goMiColmed"
                  />
                </q-card-actions>
              </q-card>
            </q-list>
          </q-menu>
        </q-btn>
      </template>
      <!-- Menú para pantallas grandes -->
      <template v-else>
        <div class="q-gutter-xs q-pl-xl row items-right">
          <!-- <div class="q-pl-xs">
            <q-btn
              flat
              label="Quiénes Somos"
              no-caps
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.quienesSomos = true"
              @mouseleave="startCloseTimer('quienesSomos')"
              @click="
                dropdownVisible.quienesSomos = !dropdownVisible.quienesSomos
              "
            ></q-btn>
            <q-popup-proxy
              ref="popupQuienesSomos"
              v-model="dropdownVisible.quienesSomos"
              class="custom-popup-style"
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
          </div> -->

          <!--Sección de Servicios-->
          <!-- <div class="q-pl-xs">
            <q-btn
              flat
              label="Servicios"
              no-caps
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.servicios = true"
              @mouseleave="startCloseTimer('servicios')"
              @click="dropdownVisible.servicios = !dropdownVisible.servicios"
            ></q-btn>
            <q-popup-proxy
              ref="popupServicios"
              v-model="dropdownVisible.servicios"
              class="custom-popup-style"
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
                  v-for="val in lista_servicios"
                  :key="val.clave"
                  clickable
                  @click="onItemClickServicios(val)"
                >
                  <q-item-section>
                    <q-item-label caption class="text-bold">{{
                      val.nombre
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-popup-proxy>
          </div> -->

          <!-- Sección Informaciones-->
          <!-- <div class="q-pl-xs">
            <q-btn
              flat
              label="Informaciones"
              no-caps
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.informaciones = true"
              @mouseleave="startCloseTimer('informaciones')"
              @click="
                dropdownVisible.informaciones = !dropdownVisible.informaciones
              "
            ></q-btn>
            <q-popup-proxy
              ref="popupInformaciones"
              v-model="dropdownVisible.informaciones"
              class="custom-popup-style"
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
                  v-for="val in lista_informaciones"
                  :key="val.clave"
                  v-close-popup
                  clickable
                  @click="
                    selectInformacion = val;
                    onItemClickInformaciones(val);
                  "
                >
                  <q-item-section>
                    <q-item-label caption class="text-bold">{{
                      val.nombre
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-popup-proxy>
          </div> -->
          <!-- Sección Links-->
          <!-- <div class="q-pl-xs">
            <q-btn
              flat
              label="Links de interés"
              no-caps
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.links = true"
              @mouseleave="startCloseTimer('links')"
              @click="dropdownVisible.links = !dropdownVisible.links"
            ></q-btn>
            <q-popup-proxy
              ref="popupLinks"
              v-model="dropdownVisible.links"
              class="custom-popup-style"
              transition-show="flip-down"
              transition-hide="flip-up"
              persistent
              fit
              anchor="bottom left"
              self="top left"
              @mouseenter="clearCloseTimer('links')"
              @mouseleave="startCloseTimer('links')"
            >
              <q-list dense>
                <q-item
                  clickable
                  @click="onItemLinksInteres(val)"
                  v-for="val in links_interes"
                  :key="val.clave"
                >
                  <q-item-section>
                    <q-item-label caption class="text-bold">{{
                      val.nombre
                    }}</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
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
          </div> -->
          <div class="q-pl-xs">
            <!-- <q-btn
              outline
              rounded
              style="color: #4caf50"
              no-caps
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.quienesSomos = true"
              @mouseleave="startCloseTimer('quienesSomos')"
              @click="
                dropdownVisible.quienesSomos = !dropdownVisible.quienesSomos
              "
            > -->
            <q-btn
              rounded
              color="blue-13
"
              text-color="white"
              no-caps
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.quienesSomos = true"
              @mouseleave="startCloseTimer('quienesSomos')"
              @click="
                dropdownVisible.quienesSomos = !dropdownVisible.quienesSomos
              "
            >
              <div class="text-weight-medium text-white text-subtitle1">
                Quiénes Somos
              </div>
            </q-btn>
            <!-- ref="menuQuienesSomos" -->
            <!-- :anchor="menuQuienesSomos" -->
            <q-menu
              v-model="dropdownVisible.quienesSomos"
              @mouseenter="clearCloseTimer('quienesSomos')"
              @mouseleave="startCloseTimer('quienesSomos')"
              transition-show="flip-down"
              transition-hide="flip-up"
              :offset="[-25, 10]"
              style="border-radius: 20px"
              class="bg-blue-1"
            >
              <q-list dense>
                <q-item
                  clickable
                  @click="onItemClickQuienesSomos(val)"
                  v-for="val in lista_quienes_somos"
                  :key="val.clave"
                >
                  <q-item-section>
                    <q-item-label
                      class="text-weight-medium text-primary text-caption q-mx-lg"
                      >{{ val.nombre }}</q-item-label
                    >
                  </q-item-section>
                  <!-- <q-item-section avatar>
                    <q-avatar
                      icon="arrow_forward"
                      flat
                      size="md"
                      text-color="red"
                    />
                  </q-item-section> -->
                </q-item>
              </q-list>
            </q-menu>
          </div>
          <div class="q-pl-xs">
            <!-- <q-btn
              outline
              rounded
              no-caps
              style="color: #1a237e"
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.servicios = true"
              @mouseleave="startCloseTimer('servicios')"
              @click="dropdownVisible.servicios = !dropdownVisible.servicios"
            > -->
            <q-btn
              rounded
              no-caps
              color="light-green-14
"
              text-color="white"
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.servicios = true"
              @mouseleave="startCloseTimer('servicios')"
              @click="dropdownVisible.servicios = !dropdownVisible.servicios"
            >
              <div class="text-weight-medium text-white text-subtitle1">
                Servicios
              </div></q-btn
            >
            <!-- ref="menuServicios" -->
            <!-- :anchor="menuServicios" -->
            <q-menu
              v-model="dropdownVisible.servicios"
              @mouseenter="clearCloseTimer('servicios')"
              @mouseleave="startCloseTimer('servicios')"
              transition-show="flip-down"
              transition-hide="flip-up"
              :offset="[-25, 10]"
              style="border-radius: 20px"
              class="bg-light-green-1"
            >
              <q-list dense>
                <q-item
                  clickable
                  @click="onItemClickServicios(val)"
                  v-for="val in lista_servicios"
                  :key="val.clave"
                >
                  <q-item-section>
                    <q-item-label
                      class="text-weight-medium text-primary text-caption q-mx-lg"
                      >{{ val.nombre }}</q-item-label
                    >
                  </q-item-section>
                  <!-- <q-item-section avatar>
                    <q-avatar
                      icon="arrow_forward"
                      flat
                      size="md"
                      text-color="red"
                    />
                  </q-item-section> -->
                </q-item>
              </q-list>
            </q-menu>
          </div>
          <div class="q-pl-xs">
            <!-- <q-btn
              outline
              rounded
              no-caps
              style="color: #c62828"
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.informaciones = true"
              @mouseleave="startCloseTimer('informaciones')"
              @click="
                dropdownVisible.informaciones = !dropdownVisible.informaciones
              "
            > -->
            <q-btn
              rounded
              no-caps
              color="deep-orange-13
"
              text-color="white"
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.informaciones = true"
              @mouseleave="startCloseTimer('informaciones')"
              @click="
                dropdownVisible.informaciones = !dropdownVisible.informaciones
              "
            >
              <div class="text-weight-medium text-white text-subtitle1">
                Informaciones
              </div>
            </q-btn>
            <!-- ref="menuInformaciones" -->
            <!-- :anchor="menuInformaciones" -->
            <q-menu
              v-model="dropdownVisible.informaciones"
              @mouseenter="clearCloseTimer('informaciones')"
              @mouseleave="startCloseTimer('informaciones')"
              transition-show="flip-down"
              transition-hide="flip-up"
              :offset="[-25, 10]"
              style="border-radius: 20px"
              class="bg-deep-orange-1"
            >
              <q-list dense>
                <q-item
                  clickable
                  @click="onItemClickInformaciones(val)"
                  v-for="val in lista_informaciones"
                  :key="val.clave"
                >
                  <q-item-section>
                    <q-item-label
                      class="text-weight-medium text-primary text-caption q-mx-lg"
                      >{{ val.nombre }}</q-item-label
                    >
                  </q-item-section>
                  <!-- <q-item-section avatar>
                    <q-avatar
                      icon="arrow_forward"
                      flat
                      size="md"
                      text-color="red"
                    />
                  </q-item-section> -->
                </q-item>
              </q-list>
            </q-menu>
          </div>
          <div class="q-pl-xs">
            <!-- <q-btn
              outline
              rounded
              no-caps
              style="color: #ff6f20"
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.links = true"
              @mouseleave="startCloseTimer('links')"
              @click="dropdownVisible.links = !dropdownVisible.links"
            > -->
            <q-btn
              rounded
              no-caps
              color="orange-14"
              text-color="white"
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.links = true"
              @mouseleave="startCloseTimer('links')"
              @click="dropdownVisible.links = !dropdownVisible.links"
            >
              <div class="text-weight-medium text-white text-subtitle1">
                Links de interés
              </div>
            </q-btn>
            <!-- ref="menuLinks" -->
            <!-- :anchor="menuLinks" -->
            <q-menu
              v-model="dropdownVisible.links"
              @mouseenter="clearCloseTimer('links')"
              @mouseleave="startCloseTimer('links')"
              transition-show="flip-down"
              transition-hide="flip-up"
              :offset="[-25, 10]"
              style="border-radius: 20px"
              class="bg-orange-1"
            >
              <q-list dense>
                <q-item
                  clickable
                  @click="onItemLinksInteres(val)"
                  v-for="val in links_interes"
                  :key="val.clave"
                >
                  <q-item-section>
                    <q-item-label
                      class="text-weight-medium text-primary text-caption q-mx-xs"
                      >{{ val.nombre }}</q-item-label
                    >
                  </q-item-section>
                  <q-item-section avatar>
                    <q-avatar
                      icon="arrow_forward"
                      flat
                      size="md"
                      text-color="red"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
          <!-- Sección Contacto-->
          <div class="q-px-xs">
            <!-- <q-btn
              outline
              rounded
              no-caps
              style="color: #00796b"
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.contactos = true"
              @mouseleave="startCloseTimer('contactos')"
              @click="dropdownVisible.contactos = !dropdownVisible.contactos"
              > -->
            <q-btn
              rounded
              no-caps
              color="yellow-9"
              text-color="white"
              icon-right="arrow_drop_down"
              @mouseenter="dropdownVisible.contactos = true"
              @mouseleave="startCloseTimer('contactos')"
              @click="dropdownVisible.contactos = !dropdownVisible.contactos"
            >
              <div class="text-weight-medium text-white text-subtitle1">
                Contacto
              </div></q-btn
            >
            <q-menu
              v-model="dropdownVisible.contactos"
              transition-show="flip-down"
              transition-hide="flip-up"
              :offset="[-25, 10]"
              style="border-radius: 20px"
              class="bg-yellow-1"
              @mouseenter="clearCloseTimer('contactos')"
              @mouseleave="startCloseTimer('contactos')"
            >
              <q-list dense>
                <q-item
                  v-for="val in lista_contactos"
                  :key="val.clave"
                  v-close-popup
                  clickable
                  @click="onItemClickContactos(val)"
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
                    <q-item-label class="text-primary text-caption">{{
                      val.nombre
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>

            <q-popup-proxy
              v-if="isLargeScreen"
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

          <div class="">
            <!-- <q-btn
              label="Mi gestión"
              color="primary"
              class="text-weight-regular"
              no-caps
              outline
              rounded
              @click="irALogin"
            /> -->
            <q-btn
              outline
              label="Mi Colmed"
              class="text-weight-bold"
              no-caps
              rounded
              color="red"
              @click="goMiColmed"
            />
          </div>
        </div>
      </template>
    </q-toolbar>
  </q-card>

  <!-- Pantallas pequeñas -->
</template>
<script setup>
defineOptions({
  name: "ToolbarSection",
});

import { ref, reactive, computed } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

import { useSomosStore } from "src/stores/quienesSomos";
import { useServicioStore } from "src/stores/servicios";
import { useInformacionesStore } from "src/stores/informaciones";
import { copyToClipboard } from "quasar";

defineProps({
  isLargeScreen: {
    type: Boolean,
    required: true,
  },
});

// Responsive tracking
const $q = useQuasar();
// const isLargeScreen = computed(() => $q.screen.gt.md);
const menuVisible = ref(false);
const menuServicios = ref(null);
const menuInformaciones = ref(null);
const menuLinks = ref(null);
const menuQuienesSomos = ref(null);

const contacto_colmed_aysen = ref({
  numero_telefono: "67-2232833",
  direccion_colmed_aysen: "Pdte. Montt Nº 69, Coyhaique",
  correo_colmed_aysen: "reg.coyhaique@colegiomedico.cl",
});

const dropdownVisible = ref({
  quienesSomos: false,
  servicios: false,
  informaciones: false,
  links: false,
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

const links_interes = ref([
  {
    clave: "colmed",
    valor: "https://www.colegiomedico.cl/",
    nombre: "Colegio Médico de Chile",
  },
  {
    clave: "falmed",
    valor: "https://www.falmed.cl/",
    nombre: "Fundación de Asistencia Legal de Colegio Médico",
  },
  {
    clave: "fsg",
    valor: "https://www.colegiomedico.cl/fsg/",
    nombre: "Fondo Solidaridad Gremial",
  },
  {
    clave: "club",
    valor: "https://www.clubmedico.cl/",
    nombre: "Club Médico",
  },
]);

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
  // {
  //   clave: "transparencia",
  //   nombre: "Transparencia",
  // },
  // {
  //   clave: "colmed",
  //   nombre: "Colegio Médico de Chile",
  // },
  // {
  //   clave:"links",
  //   nombre: "Links de interés"
  // }
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
];

const lista_contactos = reactive([
  {
    clave: "telefono",
    nombre: contacto_colmed_aysen.value.numero_telefono,
    label: "Teléfono",
    icono: "call",
    tooltipText: "¡Teléfono copiado al portapapeles!",
    icono_accion: "content_copy",
  },
  {
    clave: "direccion",
    nombre: contacto_colmed_aysen.value.direccion_colmed_aysen,
    label: "Dirección",
    icono: "pin_drop",
    tooltipText: "¡Dirección copiada al portapapeles!",
    icono_accion: "content_copy",
  },
  {
    clave: "correo",
    nombre: contacto_colmed_aysen.value.correo_colmed_aysen,
    label: "Correo",
    icono: "contact_mail",
    icono_accion: "email",
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
  menuVisible.value = false;
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

const onItemLinksInteres = (val) => {
  menuVisible.value = false;
  dropdownVisible.value.links = false;
  switch (val.clave) {
    case "colmed":
    case "fsg":
    case "falmed":
    case "club":
      window.open(val.valor, "_blank", "noopener,noreferrer");
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

<style lang="scss">
.custom-header {
  .logo-img {
    width: 100px;
    height: auto;
    @media only screen and (min-width: 640px) {
      width: 190px;
      height: 90px;
    }
    @media only screen and (min-width: 768px) {
      width: 190px;
    }
  }
}
.menu-full-width {
  min-width: 110vw; /* Ocupa todo el ancho de la pantalla */

  right: 0 !important; /* Asegura que se alinee al borde derecho */
  max-width: 110vw; /* Evita que exceda el ancho */
}
</style>
