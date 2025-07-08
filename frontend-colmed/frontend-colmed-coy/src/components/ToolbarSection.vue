<template>
  <q-card
    flat
    class="q-mb-md q-pt-xs custom-header text-primary q-mr-xl"
    style="border-radius: 20px"
  >
    <!-- <q-separator
      color="primary"
      class=""
      :class="isLargeScreen ? '' : 'q-mr-xs'"
    /> -->

    <q-separator
      color="primary"
      :class="
        screenSize == 'xs' || screenSize == 'sm' || screenSize == 'md'
          ? 'q-ml-xl'
          : 'q-mr-xs'
      "
      :inset="
        screenSize !== 'xs' && screenSize !== 'sm' && screenSize !== 'md'
          ? true
          : false
      "
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
      <!-- <template v-if="!isLargeScreen"> -->
      <template v-if="screenSize == 'xs' || screenSize == 'sm'">
        <q-btn
          flat
          size="xl"
          :icon="menuVisible ? 'close' : 'menu'"
          class="q-ml-xl"
          @click="menuVisible = !menuVisible"
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
                <q-list dense>
  <!-- Cuando hay datos -->
                  <template v-if="lista_contactos.length">
                    <q-item
                      v-for="item in lista_contactos"
                      :key="item.id"
                      v-close-popup
                      clickable
                      @click="onItemClickContactos(item)"
                    >
                      <q-item-section avatar>
                        <q-avatar :icon="item.icono" flat size="md" text-color="primary" />
                      </q-item-section>
                    
                      <q-item-section>
                        <!-- text-overline quedaba chico; caption = 0.75rem -->
                        <q-item-label caption>{{ item.label }}</q-item-label>
                        <q-item-label class="text-primary text-caption">
                          {{ item.nombre }}
                          <q-icon class="q-pl-xs" :name="item.icono_accion" />
                        </q-item-label>
                      </q-item-section>
                      <q-separator spaced  size="3m"/>
                    </q-item>
                  </template>
                
                  <!-- Cuando la API no devuelve contactos -->
                  <q-item v-else>
                    <q-item-section>
                      <q-item-label caption>No hay contactos públicos</q-item-label>
                    </q-item-section>
                  </q-item>
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
              color="blue-13"
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
              transition-show="flip-down"
              transition-hide="flip-up"
              :offset="[-25, 10]"
              style="border-radius: 20px"
              class="bg-blue-1"
              @mouseenter="clearCloseTimer('quienesSomos')"
              @mouseleave="startCloseTimer('quienesSomos')"
            >
              <q-list dense>
                <q-item
                  v-for="val in lista_quienes_somos"
                  :key="val.clave"
                  clickable
                  @click="onItemClickQuienesSomos(val)"
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
              color="light-green-14"
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
              transition-show="flip-down"
              transition-hide="flip-up"
              :offset="[-25, 10]"
              style="border-radius: 20px"
              class="bg-light-green-1"
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
              color="deep-orange-13"
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
              transition-show="flip-down"
              transition-hide="flip-up"
              :offset="[-25, 10]"
              style="border-radius: 20px"
              class="bg-deep-orange-1"
              @mouseenter="clearCloseTimer('informaciones')"
              @mouseleave="startCloseTimer('informaciones')"
            >
              <q-list dense>
                <q-item
                  v-for="val in lista_informaciones"
                  :key="val.clave"
                  clickable
                  @click="onItemClickInformaciones(val)"
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
              transition-show="flip-down"
              transition-hide="flip-up"
              :offset="[-25, 10]"
              style="border-radius: 20px"
              class="bg-orange-1"
              @mouseenter="clearCloseTimer('links')"
              @mouseleave="startCloseTimer('links')"
            >
              <q-list dense>
                <q-item
                  v-for="val in links_publicos"
                  :key="val.clave"
                  clickable
                  @click="onItemLinksInteres(val)"
                >
                  <q-item-section>
                    <q-item-label
                      class="text-weight-medium text-primary text-caption q-mx-xs"
                      >{{ val.descripcion }}</q-item-label
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

            <!-- v-if="isLargeScreen" -->
            <q-popup-proxy
              v-if="screenSize !== 'xs' && screenSize !== 'sm'"
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

import { ref, reactive, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

import { useSomosStore } from "src/stores/quienesSomos";
import { useServicioStore } from "src/stores/servicios";
import { useInformacionesStore } from "src/stores/informaciones";
import { useLinksInteresStore } from "src/stores/interes";
import { useContactoStore } from "src/stores/contactoInteres";
import { copyToClipboard } from "quasar";

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

const toolbarClass = computed(() => {
  switch (props.screenSize) {
    case "xs":
      return "bg-primary text-white";
    case "sm":
      return "bg-secondary text-white";
    case "md":
      return "bg-accent text-dark";
    case "lg":
      return "bg-indigo-8 text-white";
    default:
      return "bg-deep-purple-7 text-white";
  }
});

// Responsive tracking
const $q = useQuasar();
// const isLargeScreen = computed(() => $q.screen.gt.md);
const menuVisible = ref(false);
const menuServicios = ref(null);
const menuInformaciones = ref(null);
const menuLinks = ref(null);
const menuQuienesSomos = ref(null);

const contactoStore = useContactoStore();
const linksStore = useLinksInteresStore();


const links_publicos = computed(() => linksStore.links_publicos || []);
const contactos_interes = computed (() => contactoStore.todos_contactos || []);

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


const mision_vision = computed(() => somosStore.mision_vision || {});
const normativas = computed(() => somosStore.normativas || []);
const directiva = computed(() => somosStore.directiva || []);
const departamentos = computed(() => somosStore.departamentos || []);
const agrupaciones_regionales = computed(() => somosStore.agrupaciones_regionales || []);
const capitulos = computed(() => somosStore.capitulos || []);
const tribunal_etica = computed(() => somosStore.tribunal_etica || {});




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

  const filteredContacts = computed(() => ({
      publico: contactos_interes.value.filter(c => c.privado === false),
      privado: contactos_interes.value.filter(c => c.privado === true)
  }));

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

// const lista_quienes_somos = [
//   {
//     clave: "mision",
//     nombre: "Misión y Visión",
//   },
//   {
//     clave: "normativa",
//     nombre: "Normativa",
//   },
//   {
//     clave: "directiva",
//     nombre: "Directiva",
//   },
// ];

const lista_quienes_somos = computed(() => {
  const out = [];

  if (mision_vision.value && Object.keys(mision_vision.value).length) {
    out.push({ clave: 'mision', nombre: 'Misión y Visión' })
  }

  if (Array.isArray(normativas.value) && normativas.value.length) {
    out.push({ clave: 'normativa', nombre: 'Normativa' })
  }

  if (Array.isArray(directiva.value) && directiva.value.length) {
    out.push({ clave: 'directiva', nombre: 'Directiva' })
  }

  if (Array.isArray(departamentos.value) && departamentos.value.length) {
    out.push({ clave: 'departamentos', nombre: 'Departamentos' })
  }

  if (Array.isArray(agrupaciones_regionales.value) && agrupaciones_regionales.value.length) {
    out.push({ clave: 'agrupaciones_regionales', nombre: 'Agrupaciones Regionales' })
  }

  if (Array.isArray(capitulos.value) && capitulos.value.length) {
    out.push({ clave: 'capitulos', nombre: 'Capítulos' })
  }

  const te = tribunal_etica.value
  const tieneTE =
    te &&
    ( (te.descripcion && te.descripcion.trim().length) ||
      (Array.isArray(te.directiva) && te.directiva.length) )

  if (tieneTE) {
    out.push({ clave: 'tribunal_etica', nombre: 'Tribunal de Ética' })
  }

  return out
})

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
    clave: "convenios",
    nombre: "Todos los convenios",
  },
  {
    clave: "noticias",
    nombre: "Todas las noticias",
  },
  {
    clave: "eventos",
    nombre: "Todos los eventos",
  },
];

const lista_contactos = computed(() => {
  const contactos = filteredContacts.value.publico ?? []

  /* aplanamos cada contacto en 1-3 ítems (teléfono, dirección, email) */
  return contactos.flatMap((c, idx) => {
    const items = []

    if (c.telefono) {
      items.push({
        id: `tel-${idx}`,
        clave: 'telefono',
        nombre: c.telefono,
        label: `${c.nombre} · Teléfono`,
        icono: 'call',
        icono_accion: 'content_copy',
        tooltipText: '¡Teléfono copiado al portapapeles!',
      })
    }

    if (c.direccion) {
      items.push({
        id: `dir-${idx}`,
        clave: 'direccion',
        nombre: c.direccion,
        label: `${c.nombre} · Dirección`,
        icono: 'pin_drop',
        icono_accion: 'content_copy',
        tooltipText: '¡Dirección copiada al portapapeles!',
      })
    }

    if (c.email) {
      items.push({
        id: `mail-${idx}`,
        clave: 'correo',
        nombre: c.email,
        label: `${c.nombre} · Correo`,
        icono: 'contact_mail',
        icono_accion: 'email',          // abrir mail
        tooltipText: '',
      })
    }
    return items
  })
})


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
    case "departamentos":
    case "agrupaciones_regionales":
    case "capitulos":
    case "tribunal_etica":
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
  window.open(val.url, "_blank", "noopener,noreferrer");
  // switch (val.clave) {
  //   case "colmed":
  //   case "fsg":
  //   case "falmed":
  //   case "club":
  //     window.open(val.url, "_blank", "noopener,noreferrer");
  //     break;
  //   default:
  //     console.log("Error en valor : ", val);
  // }
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

  onMounted(async () => {
    await contactoStore.fetchContactos();
    await linksStore.fetchLinksInteresPublicos();

    await somosStore.fetchMisionVision();

    await somosStore.fetchNormativa();

    await somosStore.fetchDirectiva();

    await somosStore.fetchDepartamentos();

    await somosStore.fetchAgrupacionRegional();

    await somosStore.fetchCapitulos();

    await somosStore.fetchTribunalEtica();
  });

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
