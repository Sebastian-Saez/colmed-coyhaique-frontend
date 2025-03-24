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
          Recupera tu contraseña
        </div>
        
      </q-card-section>
      <q-separator inset/>
      <q-card-section>
        <q-form
        @submit.prevent="onSubmit"
        style="width: 100%"
        
      >
        <q-input
          v-model="identifier"
          label="Ingresa tu Email o ICM"
          filled
          required
          hint="Escribe tu ICM sin dígito verificador o tu email de registro."
        />
        
        <q-card-actions vertical align="center" class="q-mt-md">
          <q-btn
            no-caps
            rounded
            label="Recuperar contraseña"
            type="submit"
            color="primary"
            style="width: 100%"
          >
          
        </q-btn>
        <div class="q-mt-xl">
          <q-tooltip v-model="error" class="bg-red-1 text-body2 text-red-14" :offset="[0, 0]">
          {{mensajeError}}
        </q-tooltip>
      </div>
        
        </q-card-actions>
      </q-form>
      </q-card-section>
      
    </q-card>

    <q-dialog v-model="respuestaOk" persistent>
      <q-card class="bg-blue-2" style="border-radius:20px">
        <q-card-section>
          <div class="text-h6 text-primary text-weight-bold">
            Link de recuperación de contraseña enviado a su email.
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
              OK
            </div>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="respuestaError">
      <q-card class="bg-red-1" style="border-radius:20px">
        <q-card-section>
          <div class="text-h6 text-red-9">Datos inválidos</div>
          <div class="text-h6 text-red-9 text-caption">{{mensajeErrorRecuperacion.detail}}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="enviando">
      <q-card class="bg-red-1" style="border-radius:20px">
        <q-card-section class="text-center">
          <q-spinner
            color="primary"
            size="3em"
            />
        </q-card-section>
      </q-card>
    </q-dialog>

   
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "src/stores/authStore";
import { useRouter } from "vue-router";


const router = useRouter();
const identifier = ref("");
const userStore = useUserStore();
const mensajeError = ref("");
const error = ref(false);
const icm = ref(null);


const respuestaError = ref(false);
const mensajeErrorRecuperacion = ref(null);
const respuestaOk = ref(false);
const enviando = ref(false);

function validData () {
  const trimmedValue = identifier.value.trim();

  if (trimmedValue.includes("@")) {    
    error.value = false;
    mensajeError.value = "";
    return true;
  } else if (/^\d+$/.test(trimmedValue)) {    
    icm.value = Number(trimmedValue);
    error.value = false;
    mensajeError.value = "";
    return true;
  } else {
    // No es email ni número válido, activamos error
    mensajeError.value = "Ingrese datos válidos."
    error.value = true;
    return false;
  }
}

const irALogin = () => {
  respuestaOk.value = false;
  router.push("/colmed/login-icm");
}

const onSubmit = async () => {
  
  if(validData()){
    try {
      enviando.value = true;
      // Simula una demora (por ejemplo, 2 segundos)
      //await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await userStore.requestPasswordReset(identifier.value);
    
      respuestaOk.value = true;
      // Aquí podrías mostrar un mensaje al usuario: "Si tu email/ICM existe, se te envió un correo..."
    } catch (error) {
      // Manejo de errores
      respuestaError.value = true;
      mensajeErrorRecuperacion.value = error.response.data;    
    } finally{
      enviando.value = false;
    }
  }
  
};
</script>
