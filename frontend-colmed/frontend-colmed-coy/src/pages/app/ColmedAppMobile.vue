<template>
  <q-layout view="lHh lpr lFf">
    <!-- Toolbar superior (Header) -->
    <q-header
      class="bg-blue-10 text-white"
      style="border-radius: 0px 0px 20px 20px"
    >
      <q-toolbar
        v-if="currentTab !== 'login-icm' && currentTab !== 'request-pass-reset' && currentTab !== 'register-icm' && currentTab !=='confirm-pass-reset'"
      >
        <q-btn flat icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title align="center"
          ><div class="col items-center">
            <div class="text-caption text-weight-bold text-center">
              COLEGIO MÉDICO
            </div>
            <q-separator color="red-8" size="3px" style="border-radius: 20px" />
            <div class="text-caption text-weight-bold text-center">
              Región de Aysén
            </div>
          </div></q-toolbar-title
        >
        <q-btn flat @click="goHome">
          <q-avatar size="xl">
            <img
              src="~assets/LogoCOLMEDAYSEN_2.png"
              alt="Colegio Médico Logo"
            />
          </q-avatar>
        </q-btn>
      </q-toolbar>
      
      <q-banner v-if="!isOnline" inline-actions  class="text-white bg-red q-mx-xl q-mb-sm text-center" style="border-radius:20px">
        Sin conexión a internet
      </q-banner>
    </q-header>

    <!-- Drawer lateral opcional -->
    <q-drawer
        v-model="drawer"
        side="left"
        overlay
        class="bg-light-blue-2"
        :width="350"
      >
        <q-list padding>
          <q-item v-ripple clickable @click="drawer = false">
            <q-item-section avatar>
              <q-icon name="home" class="text-primary" />
            </q-item-section>
            <q-item-section class="text-h6 text-primary">
              Volver al Home
            </q-item-section>
          </q-item>

          <q-separator inset />

          <!-- Sección de Contactos de Interés -->
          <q-expansion-item
            group="somegroup"
            icon="contacts"
            label="Contactos de interés"
            header-class="text-h6 text-secondary"
          >
            <q-inner-loading
              v-if="loading_contactos"
              :showing="loading_contactos"
              label="Cargando contactos..."
              label-class="text-secondary"
              label-style="font-size: 1.1em"
            />
            <div v-else>
              <q-card
                v-if="contactos.length === 0"
                class="bg-teal-1 q-pa-sm q-mb-sm q-mx-sm"
                style="border-radius: 10px"
              >
                <div class="text-center text-secondary">
                  No hay contactos disponibles.
                </div>
              </q-card>
              <q-card
                v-for="(contacto, index) in contactos"
                :key="index"
                class="bg-teal-1 q-mb-sm q-mx-sm"
                style="border-radius: 10px"
              >
                <q-card-section>
                  <div class="text-secondary text-body1 text-weight-bold">
                    {{ contacto.nombre }}
                  </div>
                  <div class="text-secondary text-caption text-weight-bold">
                    {{ contacto.cargo }}
                  </div>
                  <q-list>
                    <q-separator inset />
                    <q-item clickable tag="a" :href="'mailto:' + contacto.email">
                      <q-item-section avatar>
                        <q-icon color="primary" name="mail" />
                      </q-item-section>
                      <q-item-section class="text-primary">
                        {{ contacto.email }}
                      </q-item-section>
                    </q-item>
                    <q-item
                      v-if="contacto.telefono"
                      clickable
                      tag="a"
                      :href="'tel:' + contacto.telefono"
                    >
                      <q-item-section avatar>
                        <q-icon color="primary" name="phone" />
                      </q-item-section>
                      <q-item-section class="text-primary">
                        {{ contacto.telefono }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
          </q-expansion-item>

          <q-separator inset />

          <!-- Sección de Links de Interés -->
          <q-expansion-item
            group="somegroup"
            icon="open_in_new"
            label="Links de interés"
            header-class="text-h6 text-secondary"
            dense
          >
            <q-inner-loading
              v-if="loading_link"
              :showing="loading_link"
              label="Cargando links..."
              label-class="text-secondary"
              label-style="font-size: 1.1em"
            />
            <div v-else>
              <q-card
                v-if="links.length === 0"
                class="bg-teal-1 q-pa-sm q-mb-sm q-mx-sm"
                style="border-radius: 10px"
              >
                <div class="text-center text-secondary">
                  No hay links disponibles.
                </div>
              </q-card>
              <q-card
                v-for="(link, index) in links.slice(1)"
                :key="index"
                class="bg-teal-1 q-mb-sm q-mx-sm"
                style="border-radius: 10px"
              >
                <q-card-section>
                  <div class="text-secondary text-body1 text-weight-bold">
                    {{ link.titulo }}
                  </div>
                  <div class="text-secondary text-caption text-weight-bold">
                    {{ link.descripcion }}
                  </div>
                  <q-card-actions>
                    <q-btn
                      :href="link.url"
                      no-caps
                      flat
                      target="_blank"
                      outline
                      rounded
                      color="primary"
                      style="width: 250px"
                    >
                      <div class="row items-center no-wrap">
                        <div class="text-center text-body1">
                          {{ link.url }}
                        </div>
                      </div>
                    </q-btn>
                  </q-card-actions>
                </q-card-section>
              </q-card>
            </div>
          </q-expansion-item>

          <q-separator inset />
          <q-item v-ripple clickable @click="logout">
            <q-item-section avatar>
              <q-icon name="logout" class="text-primary" />
            </q-item-section>
            <q-item-section class="text-h6 text-primary">
              Salir
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
    <!-- Contenedor de páginas hijas -->
     <!-- v-if="!isOnline" -->
    
    <q-page-container>
      <router-view />
      
    </q-page-container>
    
    <!-- Footer / Toolbar inferior (opcional) -->
    <q-footer      
      v-if="currentTab !== 'login-icm' && currentTab !== 'request-pass-reset'
      && currentTab !== 'register-icm'
      && currentTab !== 'confirm-pass-reset'"
      class="text-center bg-cyan-1"
    >
        
      <q-btn-toggle
        v-model="currentTab"
        toggle-color="green-3"
        :options="allOptions"
      >
        <template #convenios-app>
          <div class="q-gutter-xs text-primary text-weight-bold">
            <q-icon center name="handshake" size="xs" class="" />
            <div class="text-caption text-capitalize text-center">
              Convenios
            </div>
          </div>
        </template>
        <template #noticias-app>
          <div class="q-gutter-xs text-primary text-weight-bold">
            <q-icon center name="newspaper" size="xs" class="" />
            <div class="text-caption text-capitalize text-center">Noticias</div>
          </div>
        </template>

        <template #afiliacion-app>
          <div class="q-gutter-xs text-primary text-weight-bold">
            <q-icon center name="person" size="xs" class="" />
            <div class="text-caption text-capitalize text-center">
              Afiliación
            </div>
          </div>
        </template>
        <template #eventos-app>
          <div class="q-gutter-xs text-primary text-weight-bold">
            <q-icon center name="event" size="xs" class="" />
            <div class="text-caption text-capitalize text-center">Eventos</div>
          </div>
        </template>
        <template #credencial>
          <div class="q-gutter-xs text-primary text-weight-bold">
            <q-icon center name="qr_code_2" size="xs" class="" />
            <div class="text-caption text-capitalize text-center">
              Credencial
            </div>
          </div>
        </template>
      </q-btn-toggle>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "src/stores/authStore";
import { useLinksInteresStore } from "src/stores/interes";
import { useContactoStore } from "src/stores/contactoInteres";
import { Network } from "@capacitor/network";


const drawer = ref(false);
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const linksStore = useLinksInteresStore();
const contactosStore = useContactoStore();

const links = computed(() => linksStore.links_interes || []);
const loading_link = computed(() => linksStore.loading || false);
//const loading_link = computed(() => true);

//const contactos = computed(() =>  []);
const contactos = computed(() => contactosStore.contactos_privados || []);
const loading_contactos = computed(() => contactosStore.loading_privados || false);


// Variable reactiva para el estado de la conexión a internet
const isOnline = ref(true);

function goTo(path) {
  drawer.value = false;
  // la ruta hija se montará en <router-view />
  router.push(`/${path}`);
}

const allOptions = [
  { value: "convenios-app", slot: "convenios-app" },
  { value: "noticias-app", slot: "noticias-app" },
  { value: "afiliacion-app", slot: "afiliacion-app" },
  { value: "eventos-app", slot: "eventos-app" },
  { value: "credencial", slot: "credencial" },
];

const currentTab = computed({
  get() {
    // Quita el prefijo '/colmed/', quedándote con 'afiliacion-app', 'credencial', etc.
    // route.path podría ser "/colmed/afiliacion-app" => "afiliacion-app"
    return route.path.replace("/colmed/", "");
  },
  set(val) {
    // Cuando cambie el tab, navega a la ruta correspondiente
    //router.push(val == "colmed" ? `/home` : `/colmed/${val}`);
    if (isOnline.value) {
      router.push(val == "colmed" ? `/home` : `/colmed/${val}`);
  }
    
  },
});

const filteredOptions = computed(() => {
  return allOptions.filter((opt) => opt.value !== currentTab.value);
});

function goHome() {
  if (isOnline.value) {
    router.push("/home");
  }
}


const logout = async () => {

  await userStore.logoutMobile();
  router.replace("/");
};

onMounted(async () => {
   // Verificar el estado de la conexión a internet
  const status = await Network.getStatus();
  isOnline.value = status.connected;
  
  // Suscribirse a cambios en el estado de la red
  Network.addListener("networkStatusChange", (status) => {
    isOnline.value = status.connected;
  });

  await linksStore.fetchLinksInteres();
  await contactosStore.fetchContactosPrivados();
});

</script>

<style scoped>
/* Estilos de tu pantalla “marco” de Colmed */
</style>
