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
          Establece una nueva contraseña
        </div>
      </q-card-section>
      
      <q-separator inset/>
      
      <q-card-section>
        <q-form @submit.prevent="onSubmit" style="width: 100%">
          <q-input
            v-model="newPassword"
            label="Nueva contraseña"
            type="password"
            filled
            required
          />
          <q-input
            v-model="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            filled
            required
            class="q-mt-md"
          />
          <q-card-actions vertical align="center" class="q-mt-md">
            <q-btn
              no-caps
              rounded
              label="Restablecer contraseña"
              type="submit"
              color="primary"
              style="width: 100%"
            />
          </q-card-actions>
          <div class="q-mt-xl">
            <q-tooltip v-model="error" class="bg-red-1 text-body2 text-red-14" :offset="[0, 0]">
              {{ mensajeError }}
            </q-tooltip>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <q-dialog v-model="respuestaOk" persistent>
      <q-card class="bg-blue-2" style="border-radius:20px">
        <q-card-section>
          <div class="text-h5 text-primary text-weight-bold">
            Contraseña actualizada con éxito
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
            <div class="text-white text-center text-subtitle2">
              Ir al inicio de sesión
            </div>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="loading" persistent>
      <q-card class="q-pa-md flex flex-center">
        <q-spinner-dots size="50px" color="primary" />
        <div class="q-ml-md text-primary">Actualizando contraseña</div>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/authStore';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const newPassword = ref('');
const confirmPassword = ref('');
const mensajeError = ref('');
const error = ref(false);
const token = ref('');
const loading = ref(false);

const respuestaOk = ref(false);
const respuestaError = ref(false);
const mensajeErrorRegistro = ref (null);

// Extraer token del query parameter cuando se monta el componente
onMounted(() => {
  token.value = route.query.token;
  if (!token.value) {
    mensajeError.value = 'Token de reseteo no encontrado.';
    error.value = true;
  }
});

const irALogin = () => {
  respuestaOk.value = false;
  router.push("/colmed/login-icm");
}

const onSubmit = async () => {
  error.value = false;
  mensajeError.value = '';
  if (newPassword.value !== confirmPassword.value) {
    mensajeError.value = 'Las contraseñas no coinciden.';
    error.value = true;
    return;
  }
  if (!token.value) {
    mensajeError.value = 'Token no válido.';
    error.value = true;
    return;
  }
  try {
    loading.value = true;
    // Llamada al endpoint de confirmación de reseteo
    const response = await userStore.confirmPasswordReset(token.value, newPassword.value);
    
    respuestaOk.value = true;
    
  } catch (err) {
    console.error('Error al restablecer contraseña:', err);
    mensajeError.value = err.response.data.detail;
    error.value = true;
  }finally{
    loading.value = false;
  }
};
</script>
