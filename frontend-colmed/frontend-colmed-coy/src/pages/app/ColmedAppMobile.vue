<template>
  <q-layout view="lHh lpr lFf">
    <!-- Toolbar superior (Header) -->
    <q-header
      class="bg-blue-10 text-white"
      style="border-radius: 0px 0px 20px 20px"
    >
      <q-toolbar>
        <q-btn flat icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title align="center"
          ><div class="col items-center">
            <div class="text-caption text-weight-bold text-center">
              C O L ME D
            </div>
            <q-separator color="red-14" size="3px" />
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
        <!-- <q-avatar size="xl">
          <img src="~assets/LogoCOLMEDAYSEN_2.png" alt="Colegio Médico Logo" />
        </q-avatar> -->
      </q-toolbar>
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
        <q-item clickable v-ripple @click="goTo('home')">
          <q-item-section class="text-h6 text-primary"
            >Volver a Home</q-item-section
          >
        </q-item>
        <!-- <q-item clickable v-ripple @click="goTo('convenios-app')">
          <q-item-section>Convenios</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="goTo('convenios-app')">
          <q-item-section>Convenios</q-item-section>
        </q-item> -->
        <!-- etc. -->
        <q-separator inset />
        <q-expansion-item
          group="somegroup"
          icon="contacts"
          label="Contactos de interés"
          header-class="text-h6 text-secondary"
        >
          <q-card class="bg-teal-2">
            <q-card-section>
              <div class="text-secondary text-body1 text-weight-bold">
                Mónica Guerra V.
              </div>
              <div class="text-secondary text-caption text-weight-bold">
                Encargada Administrativa - Presidencia
              </div>
              <q-separator inset spaced />

              <q-list>
                <q-item clickable tag="a" :href="'tel:+56999999999'">
                  <q-item-section avatar>
                    <q-icon color="primary" name="phone" />
                  </q-item-section>
                  <q-item-section>+569 99999999</q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  tag="a"
                  :href="'mailto:mguerra@colegiomedico.cl'"
                >
                  <q-item-section avatar>
                    <q-icon color="primary" name="mail" />
                  </q-item-section>
                  <q-item-section>mguerra@colegiomedico.cl</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
          <q-separator color="teal-4" size="2px" />
          <q-card class="bg-teal-2">
            <q-card-section>
              <div class="text-secondary text-body1 text-weight-bold">
                Catalina Oyarzún Martinez
              </div>
              <div class="text-secondary text-caption text-weight-bold">
                Abogada Colegio Médico Región de Aysén
              </div>
              <q-separator inset spaced />
              <q-list>
                <q-item clickable tag="a" :href="'tel:+5688888888'">
                  <q-item-section avatar>
                    <q-icon color="primary" name="phone" />
                  </q-item-section>
                  <q-item-section>+569 88888888</q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  tag="a"
                  :href="'mailto:coyarzun@colegiomedico.cl'"
                >
                  <q-item-section avatar>
                    <q-icon color="primary" name="mail" />
                  </q-item-section>
                  <q-item-section>coyarzun@colegiomedico.cl</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator inset />
        <q-expansion-item
          group="somegroup"
          icon="menu_open"
          label="Links de interés"
          header-class=" text-h6 text-secondary"
          dense
        >
          <q-card class="bg-teal-2">
            <q-card-section>
              <div class="text-secondary text-body1 text-weight-bold">
                Colegio Médico
              </div>
              <div class="text-secondary text-caption text-weight-bold">
                Región de Aysén
              </div>
              <q-separator inset />
              <q-card-actions>
                <q-btn
                  href="https://www.colmedaysen.cl"
                  no-caps
                  flat
                  target="_blank"
                  outline
                  rounded
                  color="primary"
                  style="width: 250px"
                >
                  <div class="row items-center no-wrap">
                    <div class="text-center text-body1">www.colmedaysen.cl</div>
                  </div>
                </q-btn>
              </q-card-actions>
            </q-card-section>
          </q-card>
          <q-separator color="teal-4" size="2px" />
          <q-card class="bg-teal-2">
            <q-card-section>
              <div class="text-secondary text-body1 text-weight-bold">
                Colegio Médico Chile
              </div>

              <q-separator inset />
              <q-card-actions>
                <q-btn
                  href="https://www.colegiomedico.cl"
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
                      www.colegiomedico.cl
                    </div>
                  </div>
                </q-btn>
              </q-card-actions>
              <!-- <q-list>
                <q-item clickable v-ripple @click="goTo('home')">
                  <q-item-section class="text-body1 text-primary"
                    >www.colegiomedico.cl</q-item-section
                  >
                </q-item>
              </q-list> -->
            </q-card-section>
          </q-card>
          <q-separator color="teal-4" size="2px" />
          <q-card class="bg-teal-2">
            <q-card-section>
              <div class="text-secondary text-body1 text-weight-bold">
                FALMED
              </div>
              <div class="text-secondary text-caption text-weight-bold">
                Fundación de Asistencia Legal por mandato del Colegio Médico de
                Chile
              </div>
              <q-separator inset />
              <q-card-actions>
                <q-btn
                  href="https://www.falmed.cl"
                  no-caps
                  flat
                  target="_blank"
                  outline
                  rounded
                  color="primary"
                  style="width: 250px"
                >
                  <div class="row items-center no-wrap">
                    <div class="text-center text-body1">www.falmed.cl</div>
                  </div>
                </q-btn>
              </q-card-actions>
              <!-- <q-list>
                <q-item clickable v-ripple @click="goTo('home')">
                  <q-item-section class="text-body1 text-primary"
                    >www.falmed.cl</q-item-section
                  >
                </q-item>
              </q-list> -->
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <!-- Contenedor de páginas hijas -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer / Toolbar inferior (opcional) -->
    <q-footer class="text-center bg-cyan-1">
      <q-btn-toggle
        v-model="currentTab"
        toggle-color="green-3"
        :options="allOptions"
      >
        <!-- <template v-slot:home>
          <div class="q-gutter-xs">
            <q-icon center name="home" size="xs" class="" />
            <div class="text-caption text-capitalize text-center text-white">
              Inicio
            </div>
          </div>
        </template> -->
        <template v-slot:convenios-app>
          <div class="q-gutter-xs text-primary text-weight-bold">
            <q-icon center name="handshake" size="xs" class="" />
            <div class="text-caption text-capitalize text-center">
              Convenios
            </div>
          </div>
        </template>
        <template v-slot:noticias-app>
          <div class="q-gutter-xs text-primary text-weight-bold">
            <q-icon center name="newspaper" size="xs" class="" />
            <div class="text-caption text-capitalize text-center">Noticias</div>
          </div>
        </template>

        <template v-slot:afiliacion-app>
          <div class="q-gutter-xs text-primary text-weight-bold">
            <q-icon center name="person" size="xs" class="" />
            <div class="text-caption text-capitalize text-center">
              Afiliación
            </div>
          </div>
        </template>
        <template v-slot:eventos-app>
          <div class="q-gutter-xs text-primary text-weight-bold">
            <q-icon center name="event" size="xs" class="" />
            <div class="text-caption text-capitalize text-center">Eventos</div>
          </div>
        </template>
        <template v-slot:credencial>
          <div class="q-gutter-xs text-primary text-weight-bold">
            <q-icon center name="qr_code_2" size="xs" class="" />
            <div class="text-caption text-capitalize text-center">
              Credencial
            </div>
          </div>
        </template>
      </q-btn-toggle>
      <!-- <q-tabs
        v-model="currentTab"
        no-caps
        active-color="primary"
        indicator-color="amber-4"
        class="text-white"
        align="center"
        dense
        :breakpoint="0"
      >
        <q-tab name="convenios-app" label="Convenios" icon="mail" />
        <q-tab name="noticias-app" label="Noticias" icon="mail" />
        <q-tab icon="home" name="colmed" />
        <q-tab name="afiliacion-app" label="Afiliación" icon="mail" />
        <q-tab name="eventos-app" label="Eventos" icon="mail" />
        <q-tab name="credencial" label="Credencial" icon="mail" />
      </q-tabs> -->
    </q-footer>
  </q-layout>
</template>

<script setup>
import { computed } from "vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const drawer = ref(false);
const router = useRouter();
const route = useRoute();
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
    router.push(val == "colmed" ? `/home` : `/colmed/${val}`);
  },
});

const filteredOptions = computed(() => {
  return allOptions.filter((opt) => opt.value !== currentTab.value);
});

function goHome() {
  router.push("/home");
}
</script>

<style scoped>
/* Estilos de tu pantalla “marco” de Colmed */
</style>
