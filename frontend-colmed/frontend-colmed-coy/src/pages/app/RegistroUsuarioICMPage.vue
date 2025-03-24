<template>
  <q-page class="bg-light-blue-11 column items-center justify-center">
    <q-card class="bg-light-blue-11 q-mx-lg" flat>
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
          Regístrate en la App
        </div>
        <div class="text-subtitle1 text-primary text-center text-weight-regular">
          Podrás ver convenios, noticias, estado de afiliación, entre otros.
        </div>
      </q-card-section>
      <q-separator inset/>
      <q-card-section>
        <q-form style="width: 100%" @submit.prevent="onSubmit" >
          <q-input v-model="icm" label="ICM" filled class="q-mb-sm" type="number" :rules="[val => !!val || 'ICM es requerido.']" hint="Escribe tu ICM sin dígito verificador."/>
          <q-input v-model="email" label="Email" filled class="q-mb-sm" :rules="[val => !!val || 'Email es requerido.']"/>
          <q-input v-model="password" label="Contraseña" type="password" filled class="q-mb-sm" :rules="[val => !!val || 'Contraseña es requerido.']"/>
          <q-input
v-model="confirmPassword" label="Confirmar contraseña" type="password" filled class="q-mb-sm" :error-message="mensajeError"
          :error="!isValid" />
          
          <q-card-actions vertical class="q-mt-xs">
            <q-btn
              no-caps
              rounded
              label="Registrarse"
              type="submit"
              color="primary"
              class="q-mb-sm"
              :disable="confirmSubmit"
            >
            <q-tooltip v-if="confirmSubmit" class="bg-red-1 text-body2 text-red-14" :offset="[10, 10]">
              Todos los campos son requeridos.
            </q-tooltip>
          </q-btn>
          </q-card-actions>
          
        </q-form>
      </q-card-section>
      
    </q-card>
    <q-dialog v-model="respuestaOk" persistent>
      <q-card class="bg-blue-2" style="border-radius:20px">
        <q-card-section>
          <div class="text-h5 text-primary text-weight-bold">
            Usuario registrado con éxito
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn
            style="width: 40%;"
            no-caps
            rounded
            color="primary"
            @click="irALogin"
          >
            <div class="text-white text-center text-subtitle1">
              Ir al login
            </div>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="loading" persistent>
      <q-card class="q-pa-md flex flex-center">
        <q-spinner-dots size="50px" color="primary" />
        <div class="q-ml-md text-primary">Registrando usuario ICM: {{icm}}</div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="respuestaError">
      <q-card class="bg-red-1" style="border-radius:20px">
        <q-card-section>
          <div class="text-h6 text-red-9 text-caption">{{mensajeErrorRegistro.detail}}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/authStore";

const icm = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const userStore = useUserStore();
const mensajeError = ref("");
const respuestaOk = ref(false);
const respuestaError = ref(false);
const mensajeErrorRegistro = ref (null);
const router = useRouter();
const loading = ref(false);

const isValid = computed(() => {
  if (confirmPassword.value ){
    if (confirmPassword.value !== password.value){
      mensajeError.value = "Contraseñas no coinciden."
      return false;      
    } else if(confirmPassword.value == password.value){
      mensajeError.value = "";
    }  
  }
  return true;
});

const confirmSubmit = computed(() => {
  
  return confirmPassword.value && password.value && email.value && icm.value && mensajeError.value.length<1? false : true;
}); 

const irALogin = () => {
  respuestaOk.value = false;
  router.push("/colmed/login-icm");
}

const onSubmit = async () => {
  try {
    loading.value = true;
    // Simula una demora (por ejemplo, 2 segundos)
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const resp = await userStore.registerWithIcm(
      icm.value,
      email.value,
      password.value
    );
    
    respuestaOk.value = true;
    // router.push("/colmed/login-icm");
    
  } catch (error) {

    respuestaError.value = true;
    mensajeErrorRegistro.value = error.response.data;
  } finally{
    loading.value = false;
  }
};
</script>
