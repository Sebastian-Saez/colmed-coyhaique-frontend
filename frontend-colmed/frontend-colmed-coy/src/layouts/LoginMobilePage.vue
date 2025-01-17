<template>
  <q-layout view="lHh lpr lFf" class="bg-light-blue-11">
    <q-card class="fixed-center bg-light-blue-11" flat>
      <img
        src="~assets/LogoCOLMEDAYSEN_2.png"
        alt="Colegio Médico Logo"
        class="q-pa-lg"
      />
      <q-card-section class="text-white">
        <div class="col items-center">
          <div class="text-h4 text-weight-bold text-center">COLMED</div>
          <q-separator color="red-14" size="5px" inset />
          <div class="text-h5 text-weight-bold text-center">
            Región de Aysén
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn
          @click="loginWithGoogle"
          align="around"
          no-caps
          class="btn-fixed-width text-primary text-overline"
          color="grey-3"
          style="width: 270px"
          label="Continuar con Google"
          icon="mail"
          rounded
        />
        <!-- <q-btn
          rounded
          color="grey-6"
          label="Ingresar con Google"
          
        /> -->
      </q-card-section>
    </q-card>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
// import tu lógica de Google Login si la tienes (vue3-google-login, etc.)

const router = useRouter();

function loginWithGoogle() {
  // Aquí tu lógica de OAuth con Google
  // Si login OK, navegas a /home
  router.push("/home");
}
</script>

<style scoped>
/* Estilos para tu pantalla de Login */
</style>
