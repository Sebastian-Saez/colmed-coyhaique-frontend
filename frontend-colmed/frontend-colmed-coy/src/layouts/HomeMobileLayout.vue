<template>
  <q-layout view="lHh lpr lFf" class="bg-light-blue-11">
    <!-- Encabezado o barra superior -->
    <!-- <q-header>
      <q-toolbar>
        <q-btn flat icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>ColmedCoy Móvil??</q-toolbar-title>
      </q-toolbar>
    </q-header> -->
    <!-- <q-toolbar class="text-white">
      <q-btn flat dense @click="drawer = !drawer" round icon="menu" size="xl" />
      <q-toolbar-title class="text-center"
        ><div class="text-caption text-weight-bold">C O L ME D</div>
        <q-separator color="red-14" size="3px" />
        <div class="text-caption text-weight-bold">
          Región de Aysén
        </div></q-toolbar-title
      >
      <q-avatar size="xl">
        <img src="~assets/LogoCOLMEDAYSEN_2.png" alt="Colegio Médico Logo" />
      </q-avatar>
    </q-toolbar> -->

    <q-card
      class="q-mx-xs bg-blue-10"
      flat
      bordered
      style="border-radius: 0px 0px 20px 20px"
    >
      <q-card-section>
        <div class="q-gutter-md row items-center text-white">
          <q-btn
            flat
            dense
            @click="drawer = !drawer"
            round
            icon="menu"
            size="xl"
          />
          <div class="col items-center">
            <div class="text-caption text-weight-bold text-center">
              C O L ME D
            </div>
            <q-separator color="red-14" size="3px" />
            <div class="text-caption text-weight-bold text-center">
              Región de Aysén
            </div>
          </div>
          <q-avatar size="xl">
            <img
              src="~assets/LogoCOLMEDAYSEN_2.png"
              alt="Colegio Médico Logo"
            />
          </q-avatar>
        </div>
      </q-card-section>
      <q-card-section align="center">
        <q-avatar size="150px">
          <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
        </q-avatar>
        <div class="text-h5 text-white text-weight-bold">Charlotte Mile</div>
        <div class="text-subtitle1 text-white">charlottemile@email.com</div>
      </q-card-section>
      <q-separator inset class="bg-white" />
      <q-card-section align="left">
        <div class="text-h5 text-white text-bold">ICM:</div>
        <div class="text-subtitle1 text-white">12345</div>
        <div class="text-h5 text-white text-bold">Estado afiliación:</div>
        <div class="text-subtitle1 text-white">Al día</div>
        <div class="text-h5 text-white text-bold">Tipo de cuota:</div>
        <div class="text-subtitle1 text-white">Media Joven</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          no-caps
          rounded
          class="bg-red-7 text-white"
          size="18px"
          align="around"
          @click="goTo('detalle-afiliacion')"
        >
          <div class="text-center text-weight-medium q-mx-xl">
            Detalle Afiliación
          </div>
        </q-btn>
      </q-card-actions>
    </q-card>
    <q-card flat class="q-mt-sm q-mx-xs bg-light-blue-11">
      <q-card-actions align="around">
        <q-btn
          icon="handshake"
          label="Convenios"
          no-caps
          size="20px"
          stack
          color="pink-8"
          padding="xl xs"
          rounded
          @click="goTo('convenios-app')"
        />
        <q-btn
          icon="person_search"
          label="Afiliación"
          no-caps
          size="20px"
          padding="xl xs"
          stack
          rounded
          color="green-14"
          @click="goTo('afiliacion-app')"
        />
        <q-btn
          icon="qr_code_2"
          label="Credencial"
          no-caps
          size="20px"
          padding="xl xs"
          stack
          rounded
          color="blue-9"
          @click="goTo('credencial')"
        />
      </q-card-actions>
    </q-card>
    <q-separator inset color="red-14" size="2px" />

    <q-card flat class="q-mt-sm bg-light-blue-11">
      <q-card-actions align="around">
        <q-btn
          size="xl"
          dense
          no-caps
          color="amber-14"
          rounded
          align="around"
          @click="goTo('noticias-app')"
        >
          <div class="row q-mx-sm">
            <q-icon left name="newspaper" size="md" class="q-pt-xs" />
            <div class="text-center text-weight-regular">Noticias</div>
          </div>
        </q-btn>
        <q-btn
          dense
          size="xl"
          no-caps
          rounded
          color="orange-14"
          align="around"
          @click="goTo('eventos-app')"
        >
          <div class="row q-mx-sm">
            <q-icon left name="event" size="md" class="q-pt-xs" />
            <div class="text-center text-weight-regular">Eventos</div>
          </div></q-btn
        >
      </q-card-actions>
    </q-card>
    <q-footer bordered class="bg-blue-10 text-primary">
      <div class="text-white text-center text-caption">
        2024 - COLMED AYSÉN V1.1
      </div>
      <!-- <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        class="text-grey-8"
        v-model="tab"
      >
        <q-tab name="images" label="Images" />
        <q-tab name="videos" label="Videos" />
        <q-tab name="articles" label="Articles" />
      </q-tabs> -->
    </q-footer>
    <!-- Drawer lateral (opcional) -->
    <!-- <q-drawer v-model="leftDrawerOpen" side="left" overlay>
      <q-list>
        
        <q-item clickable v-ripple to="/app/mis-datos">
          <q-item-section>Mis datos</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/app/configuraciones">
          <q-item-section>Configuraciones</q-item-section>
        </q-item>
      </q-list>
    </q-drawer> -->

    <!-- Contenido principal -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const drawer = ref(false);
const router = useRouter();

function goTo(path) {
  drawer.value = false;
  // la ruta hija se montará en <router-view />
  router.push(`/colmed/${path}`);
}
</script>

<style lang="scss">
// Estilos propios para la versión móvil (fuentes más grandes, colores distintos, etc.)
</style>
