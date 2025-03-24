<template>
  <q-layout
    view="lHh lpr lFf"
    class="bg-light-blue-11 q-pa-lg column items-center justify-center"
  >
  <q-banner v-if="!isOnline" inline-actions class="text-white bg-red">
    Sin conexión a internet
  </q-banner>
    <q-card class="bg-light-blue-11" flat>
      
      <img
        src="~assets/CR-Region-de-Aysen_vertical_white.png"
        alt="Colegio Médico Logo"
        class="q-pt-xs q-pl-xs q-pr-xs"
      />
      <!-- <q-card-section class="text-white">
        <div class="col items-center">
          <div class="text-h5 text-weight-bold text-center">COLEGIO MÉDICO</div>
          <q-separator
            color="red-14"
            size="5px"
            inset
            style="border-radius: 20px"
          />
          <div class="text-h5 text-weight-bold text-center">
            Región de Aysén
          </div>
        </div>
      </q-card-section> -->
      <q-separator
        color="red-9"
        size="3px"
        inset
        style="border-radius: 20px"
        class="q-mx-xl q-mb-xs"
      />
      
      <q-card-actions vertical align="center">
        <q-btn
          :disable="!isOnline"
          no-caps
          class="btn-fixed-width text-primary text-overline"
          color="grey-3"
          style="width: 270px"
          label="Continuar con Google"
          icon="fab fa-google"
          rounded
          @click="loginWithGoogle"
        />
        <q-btn
          :disable="!isOnline"
          rounded
          flat
          no-caps
          color="primary"
          style="width: 70%"
          @click="gotToLoginICM"
        >
          <div class="text-primary text-center text-caption">
            Ingresar con Icm
          </div>
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-dialog v-model="respuestaError">
      <q-card class="bg-red-1" style="border-radius:20px">
        <q-card-section>
          <div class="text-body1 text-red-9">{{mensajeErrorRegistro.detail}}</div>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
// import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { SocialLogin } from '@capgo/capacitor-social-login';
import { Network } from '@capacitor/network';
import { onMounted, ref } from "vue";
import { useUserStore } from "src/stores/authStore";
import { useMedicoStore } from "src/stores/medicos";
import { getPlatform } from "src/utils/platform";

// import tu lógica de Google Login si la tienes (vue3-google-login, etc.)

const router = useRouter();
const userAuthStore = useUserStore();
const medicoStore = useMedicoStore();
const loading = ref(false);
const isOnline = ref(true);

const respuestaError = ref(false);
const mensajeErrorRegistro = ref (null);

const loginWithGoogle = async () => {
  
  loading.value = true;
  // const result = await GoogleAuth.signIn();
  // const result = await SocialLogin.login({ provider: 'google' });
  const result = await SocialLogin.login({
      provider: 'google',
      options: {
        scopes: ['email', 'profile']
      }
    });

  try {
    // const result = await GoogleAuth.signIn();
    // // result contiene { email, familyName, givenName, idToken, ...}
    //const idToken = result.authentication.idToken;

    //Cambio con SOCIAL AUTENTICATION 
    const idToken = result.result.idToken;
    // Enviar este idToken al backend
    //await userAuthStore.loginWithGoogle(idToken);
    let response = await userAuthStore.loginWithGoogleMobile(idToken);
    
    

    let usuarioVisitante = userAuthStore.profiles.filter(
      (usuario) => usuario.tipo_perfil == "visitante"
    );
    await userAuthStore.mensajeNotificacionFirebase();

    

    if (usuarioVisitante[0].tipo_perfil === "visitante") {
      await medicoStore.fetchMedicoApp(userAuthStore.user.id);
      router.push("/home");
    } else console.log("Manejar esta situación");
    loading.value = false;
    // Manejar la sesión en la app
  } catch (error) {
    console.error("Google Login error:", error);
    respuestaError.value = true;
    mensajeErrorRegistro.value = error.response.data;
  }
};

const gotToLoginICM = async () => {
  await userAuthStore.mensajeNotificacionFirebase();
  router.push("/colmed/login-icm");
};

onMounted(async () => {

  // Consulta el estado actual
  const status = await Network.getStatus();
  isOnline.value = status.connected;

  // Suscribirse a cambios en el estado de la red
  Network.addListener('networkStatusChange', (status) => {
    isOnline.value = status.connected;
  });
  

  await SocialLogin.initialize({
    google: {
      webClientId: '91303446069-qajan20fs571iq3kkabn03n66d7el55f.apps.googleusercontent.com', // Use Web Client ID for all platforms
      iOSClientId: '91303446069-q4gclftcicnvcr0rmeilqjm8drndig9n.apps.googleusercontent.com', // for iOS
      mode: 'online' // replaces grantOfflineAccess
    }
  });
  // //Nueva verción para el login:
  // if (getPlatform() === 'android') {
  //   // En Android se usa el webClientId para Google
  //   SocialLogin.initialize({
  //       google: {
  //         webClientId: "91303446069-re419im523br8lua1nuht2c5g43r6rbv.apps.googleusercontent.com",
  //       }
  //     });
  // } else if (getPlatform() === 'ios') {
  //   SocialLogin.initialize({
  //       google: {
  //         iOSClientId: "91303446069-q4gclftcicnvcr0rmeilqjm8drndig9n.apps.googleusercontent.com",
  //         iOSServerClientId: "91303446069-qajan20fs571iq3kkabn03n66d7el55f.apps.googleusercontent.com"
  //       }
  //     });
  // }


  // GoogleAuth.initialize({
  //   androidClientId:
  //     "91303446069-re419im523br8lua1nuht2c5g43r6rbv.apps.googleusercontent.com",      
  //   // serverClientId:
  //   //   "91303446069-qajan20fs571iq3kkabn03n66d7el55f.apps.googleusercontent.com",
  //   // clientId:
  //   //   "91303446069-re419im523br8lua1nuht2c5g43r6rbv.apps.googleusercontent.com",

  //   scopes: ["profile", "email"],
  // });
  // Para iOS, a veces se necesita:
  // GoogleAuth.init(); // if you're using iOS
  // if (getPlatform() == "ios") {
  //   GoogleAuth.initialize();
  // }
});
</script>

<style scoped>
/* Estilos para tu pantalla de Login */
</style>
