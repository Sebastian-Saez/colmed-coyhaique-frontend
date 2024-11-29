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
    <div class="q-pa-sm fixed-center">
      <q-card
        class="q-pa-sm bg-grey-1"
        style="border-radius: 20px; width: 400px; height: 480px"
      >
        <div class="text-h4 text-weight-bold text-center text-primary q-pt-xl">
          Iniciar sesión
        </div>
        <div class="text-subtitle-1 text-primary q-mb-xs text-center">
          Por favor, ingrese sus credenciales para continuar
        </div>
        <q-separator spaced />
        <q-card-section vertical align="right">
          <div class="text-overline text-primary¿ text-left">Correo</div>
          <q-input filled v-model="email" type="email" class="q-mb-md" required>
            <template v-slot:prepend> <q-icon name="mail" /> </template
          ></q-input>
          <div class="text-overline text-primary text-left">Contraseña</div>
          <q-input
            filled
            square
            v-model="password"
            type="password"
            required
            label="Contraseña"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <div
            v-if="loginError !== ''"
            class="text-center text-red text-caption"
          >
            {{ loginError }}
          </div>
        </q-card-section>
        <q-card-actions vertical align="center">
          <q-btn
            label="Iniciar sesión"
            class="bg-primary text-white btn-fixed-width"
            no-caps
            rounded
            @click="onSubmit"
          />
          <q-btn
            flat
            rounded
            no-caps
            color="red-14"
            class="q-pt-md btn-fixed-width"
            @click="modificarContraseña = true"
            >Modificar contraseña</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>

    <!-- Main Content -->
    <!-- <div
      class="flex justify-center items-center q-pa-md q-mt-lg"
      style="min-height: 90vh"
    >
      <q-card
        flat
        class="q-pa-md q-px-xl q-py-lg bg-white"
        style="max-width: 500px"
      >
        <q-form @submit="onSubmit" class="text-primary">
          <div class="q-mb-xs text-center">
            <h4 class="text-bold text-lg">Iniciar sesión</h4>
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
            required
          />
          <div
            v-if="loginError !== ''"
            class="text-center text-red text-caption"
          >
            {{ loginError }}
          </div>
          <div class="text-center">
            <q-btn
              type="submit"
              label="Iniciar sesión"
              class="bg-primary text-white q-mt-md"
              no-caps
              rounded
            />
          </div>
        </q-form>
      </q-card>
    </div> -->

    <!-- Footer -->
    <q-footer class="bg-primary text-white q-pa-md">
      <div class="text-center">
        <div class="text-weight-light text-center">
          ©2024 Colegio Médico Aysén - Colegio Médico de Chile
        </div>
      </div>
    </q-footer>

    <q-dialog v-model="modificarContraseña">
      <UpdatePass @passwordChanged="onPasswordChanged" />
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/authStore";
import { useMedicoStore } from "src/stores/medicos";
import UpdatePass from "src/components/UpdatePass.vue";

const email = ref("");
const password = ref("");
const modificarContraseña = ref(false);
const router = useRouter();
const userStore = useUserStore();
const medicoStore = useMedicoStore();
const loginError = ref("");

const onPasswordChanged = () => {
  modificarContraseña.value = false;
};

const onSubmit = async () => {
  try {
    await userStore.fetchProfile(email.value, password.value);

    // Redirigir según el perfil
    if (userStore.profiles[0].tipo_perfil === "admin_colmed") {
      medicoStore.fetchMedicos();
      router.push("/medicos");
    } else if (userStore.profile.tipo_perfil === "admin_noticias") {
      router.push("/admin-noticias");
    } else if (userStore.profile.tipo_perfil === "admin_tec") {
      router.push("/beneficios");
    }
  } catch (error) {
    // Manejo mejorado de errores
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const status = error.response.status;

      if (status === 400) {
        // Solicitud incorrecta
        loginError.value =
          "Solicitud inválida. Por favor, verifique los datos ingresados.";
      } else if (status === 401) {
        // No autorizado - credenciales inválidas
        loginError.value =
          "Credenciales inválidas. Por favor, inténtelo nuevamente.";
      } else if (status === 403) {
        // Prohibido - sin permisos
        loginError.value =
          "No tiene permisos para acceder. Contacte al administrador.";
      } else if (status === 500) {
        // Error interno del servidor
        loginError.value =
          "Error del servidor. Por favor, inténtelo más tarde.";
      } else {
        // Otros errores
        loginError.value =
          "Error al iniciar sesión. Por favor, inténtelo de nuevo.";
      }
    } else if (error.request) {
      // La solicitud fue hecha pero no hubo respuesta
      loginError.value =
        "No se pudo conectar con el servidor. Verifique su conexión a internet.";
    } else {
      // Algo sucedió al configurar la solicitud
      loginError.value =
        "Ocurrió un error inesperado. Por favor, inténtelo de nuevo.";
    }

    // Registro en consola optimizado
    if (process.env.NODE_ENV === "development") {
      // En desarrollo, registrar información adicional
      console.error("Error al iniciar sesión:", error.message);
    } else {
      // En producción, registrar solo mensajes esenciales
      console.error("Error al iniciar sesión:", error.status);
    }
  }
};

const updatePass = ref();
const goHome = () => {
  router.push("/");
};

const loginWithGoogle = () => {
  console.log("Iniciar sesión con Google", useUserStore);
  userStore.loginWithGoogle();
};
</script>
<style lang="sass" scoped>
.btn-fixed-width
  width: 200px
</style>
