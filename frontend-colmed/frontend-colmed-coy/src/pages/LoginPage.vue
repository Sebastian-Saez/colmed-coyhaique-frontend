<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat @click="goHome">
          <img
            src="~assets/LogoCOLMEDAYSEN_letras_blancas.png"
            alt="Colegio Médico Logo"
            style="width: 204px; height: 82px"
          />
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Main Content -->
    <div
      class="flex justify-center items-center q-pa-md q-mt-lg"
      style="min-height: 90vh"
    >
      <q-card
        flat
        class="q-pa-md q-px-xl q-py-lg bg-white"
        style="max-width: 500px"
      >
        <q-form @submit="onSubmit" class="text-primary">
          <div class="q-mb-lg text-center">
            <h4 class="text-bold text-lg">Iniciar Sesión</h4>
            <p class="text-body2 text-description">
              Por favor, ingrese sus credenciales para continuar
            </p>
          </div>

          <q-input
            filled
            v-model="email"
            label="Correo Electrónico"
            type="email"
            class="q-mb-md"
            required
          />
          <q-input
            filled
            v-model="password"
            label="Contraseña"
            type="password"
            class="q-mb-md"
            required
          />
          <div class="text-center">
            <q-btn
              type="submit"
              label="Iniciar Sesión"
              class="bg-primary text-white q-px-lg q-py-sm rounded-full"
            />
          </div>
        </q-form>
        <!-- <div class="text-center q-mt-md">
          <q-btn
            @click="loginWithGoogle"
            label="Iniciar sesión con Google"
            color="red"
            flat
          >
            <q-icon name="fab fa-google" />
          </q-btn>
        </div> -->
      </q-card>
    </div>

    <!-- Footer -->
    <q-footer class="bg-primary text-white q-pa-md">
      <div class="text-center">
        <p class="text-xs">
          ©2024 Colegio Médico Aysén - Colegio Médico de Chile
        </p>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/authStore";
import { useMedicoStore } from "src/stores/medicos";

const email = ref("");
const password = ref("");

const router = useRouter();
const userStore = useUserStore();
const medicoStore = useMedicoStore();

const onSubmit = async () => {
  try {
    await userStore.fetchProfile(email.value, password.value);

    // Redirigir según el perfil
    if (userStore.profile.perfil === "admin_colmed") {
      medicoStore.fetchMedicos();
      router.push("/medicos");
    } else if (userStore.profile.perfil === "admin_noticias") {
      router.push("/admin-noticias");
    } else if (userStore.profile.perfil === "admin_tec") {
      router.push("/beneficios");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};

const goHome = () => {
  router.push("/");
};

const loginWithGoogle = () => {
  console.log("Iniciar sesión con Google", useUserStore);
  userStore.loginWithGoogle();
};
</script>
