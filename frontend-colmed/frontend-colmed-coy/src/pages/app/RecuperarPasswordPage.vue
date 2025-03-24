<template>
  <q-form @submit.prevent="onSubmit" class="q-pa-md">
    <q-input v-model="identifier" label="Tu email o ICM" type="text" required />
    <q-btn label="Recuperar Contraseña" type="submit" color="primary" />
  </q-form>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "src/stores/authStore";

const identifier = ref("");
const userStore = useUserStore();

const onSubmit = async () => {
  try {
    const resp = await userStore.requestPasswordReset(identifier.value);
    // Mensaje de éxito al usuario
    
  } catch (error) {
    console.error("Error al solicitar reset:", error);
  }
};
</script>
