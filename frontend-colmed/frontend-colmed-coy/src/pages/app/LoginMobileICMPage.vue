<template>
  <q-page class="bg-light-blue-11 column items-center justify-center">
    <q-card class="bg-light-blue-11 q-mx-lg" flat>
      <!-- <img
        src="~assets/CR-Region-de-Aysen_vertical_white.png"
        alt="Colegio Médico Logo"
        class="q-pa-xs"
      /> -->
      <div class="q-gutter-sm column items-center">
        <q-img
        src="~assets/CR-Region-de-Aysen_vertical_white.png"
        alt="Colegio Médico Logo"
        style="height: 140px; max-width: 140px"
        
      />
      </div>
      
      <q-separator
        color="red-8"
        size="2px"
        inset
        style="border-radius: 20px"
        class="q-mx-lg q-mb-md"
      />
      <q-card-section>
        <div class="text-h4 text-primary text-center text-weight-bold">
          Inicia sesión con tu ICM
        </div>
        
      </q-card-section>
      <q-separator inset/>
      <q-card-section>
        <q-form
        @submit.prevent="onSubmit"
        style="width: 100%"
        
      >
        <q-input v-model="icm" label="ICM" filled class="q-mb-sm" type="number" hint="Escribe tu ICM sin dígito verificador." :error-message="mensajeErrorIcm"
        :error="errorIcm"/>
        <q-separator inset spaced=""/>
        <q-input v-model="password" label="Contraseña" type="password" filled :error-message="mensajeErrorPass"
        :error="errorPass"/>

        <q-card-actions vertical class="q-mt-xs">
          <q-btn
            no-caps
            rounded
            label="Iniciar sesión"
            type="submit"
            color="primary"
            class="q-mb-xs"
          >
          
          </q-btn>
          <div class="q-mt-xl">
            <q-tooltip v-model="error" class="bg-red-1 text-body2 text-red-14" :offset="[0, -30]">
              {{mensajeError}}
            </q-tooltip>
          </div>
        
        </q-card-actions>
        <!-- <div class="q-mt-md q-ml-xl">
          <q-btn
            no-caps
            rounded
            label="Iniciar sesión"
            type="submit"
            color="primary"
            class="q-ml-xl"
          />
          <q-btn
            flat
            no-caps
            rounded
            type="submit"
            color="primary"
            class="q-ml-lg"
          >
            <div class="text-primary text-center text-caption">
              Recuperar contraseña
            </div>
          </q-btn>
        </div> -->
      </q-form>
      </q-card-section>
      
      <q-separator inset class="q-mx-lg"/>
      <q-card-actions vertical align="center">
        <q-btn
            no-caps
            rounded
            outline=""
            label="¿No tienes contraseña? Regístrate"
            type="submit"
            color="primary"
            class="q-mb-sm"
            @click="registroApp"
          />
          <q-btn
            flat
            no-caps
            rounded
            type="submit"
            color="primary"
            @click="recuperarContraseña"
          >
            <div class="text-primary text-center text-caption">
              Recuperar contraseña
            </div>
          </q-btn>
      </q-card-actions>
      
    </q-card>
    <q-dialog v-model="loading" persistent>
      <q-card class="q-pa-md flex flex-center">
        <q-spinner-dots size="50px" color="primary" />
        <div class="q-ml-md text-primary">Iniciando sesión...</div>
      </q-card>
    </q-dialog>
    <!-- <q-dialog >
      <q-card class="bg-red-1" style="border-radius:20px">
        <q-card-section>
          <div class="text-h6 text-red-9 text-caption">{{errorLogin.detail}}</div>
        </q-card-section>
      </q-card>
    </q-dialog> -->

  </q-page>
</template>

<script setup>
import { ref , computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/authStore";
import { useMedicoStore } from "src/stores/medicos";

const icm = ref(null);
const password = ref(null);
const mensajeError = ref("");
const error = ref(false);
const errorIcm = ref(false);
const mensajeErrorIcm = ref("");
const mensajeErrorPass = ref("");
const errorPass = ref(false);
const loading = ref(false); 

const userStore = useUserStore();
const medicoStore = useMedicoStore();
const router = useRouter();


const recuperarContraseña = () => {
  router.push("/colmed/request-pass-reset");
};
const registroApp = () => {
  router.push("/colmed/register-icm");
};


function isValidICM  () {
  return icm.value && icm.value.trim() !== ""  
};

function isValidPass  () {
  return password.value && password.value.trim() !== ""  
};

const onSubmit = async () => {

  if(!isValidICM ()) {
    errorIcm.value = true;
    mensajeErrorIcm.value = "ICM es requerido.";
    error.value = true;
  } else if(!isValidPass ()) {
    errorIcm.value = false;
    errorPass.value = true;
    mensajeErrorPass.value = "Contraseña es requerida."
    error.value = true;
  }else{
    errorPass.value = false;
    error.value = false;
  }

  

  if (error.value) {
    mensajeError.value = "Completa todos los campos.";    
    return;
  }else{  
    try {
      loading.value = true;

      // Simula una demora (por ejemplo, 2 segundos)
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      const resp = await userStore.loginWithIcm(icm.value, password.value);
    
      error.value = false;
      errorIcm.value = false;
      errorPass.value = false;
      
      let usuarioVisitante = userStore.profiles.filter(
        (usuario) => usuario.tipo_perfil == "visitante"
      );



    if (usuarioVisitante[0].tipo_perfil === "visitante") {
      await medicoStore.fetchMedicoApp(userStore.user.id);
      router.push("/home");
    } else {
      console.log("MAnejar esta situación");
    }

    // router.push("/home");
    // Redirige a la pantalla principal, etc.
    } catch (err) {    
      let detail = err.toString();
      errorIcm.value = true;
      errorPass.value = true;
      error.value = true;
      mensajeError.value = detail;    
      console.error("Error al iniciar sesión con ICM:", err);

      setTimeout(() => {
      // errorLogin.value.activo = false;
        error.value = false;
        mensajeError.value = "";
      }, 5000);
    } finally{
      loading.value = false;
    }
  }
  
};
</script>
