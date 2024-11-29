<template>
  <q-card
    style="width: 500px; max-width: 80vw; border-radius: 20px"
    class="q-pa-xs bg-grey-1"
  >
    <div class="text-h4 text-weight-bold text-center text-primary q-pt-lg">
      Modificar contraseña
    </div>
    <div class="text-subtitle-1 text-primary q-mb-xs text-center">
      Ingrese contraseña actual y luego la nueva contraseña.
    </div>
    <q-separator spaced />
    <q-card-section vertical align="right">
      <div class="text-overline text-primary text-left">Correo</div>
      <q-input
        filled
        square
        v-model="email"
        type="email"
        required
        :rules="[(val) => !!val || 'Email es requerido']"
      >
      </q-input>
      <div class="text-overline text-primary text-left">Contraseña actual</div>
      <q-input
        filled
        square
        v-model="password_actual"
        type="password"
        required
        @blur="validarActual"
        :error="!!errorActual"
        :error-message="errorActual"
      />

      <q-spinner color="primary" size="3em" v-if="loading" />
      <div class="text-overline text-primary text-left">Nueva contraseña</div>
      <q-input
        filled
        v-model="new_password_1"
        type="password"
        required
        :rules="[
          (val) => !!val || 'Este campo es requerido',
          (val) =>
            val !== password_actual ||
            'La nueva contraseña no puede ser igual a la contraseña actual.',
        ]"
        :disable="loading || errorActual !== ''"
      />
      <div class="text-overline text-primary text-left">
        Repita la nueva contraseña
      </div>
      <q-input
        filled
        square
        v-model="new_password_2"
        type="password"
        required
        @blur="validarNueva"
        :error="!!errorNueva"
        :error-message="errorNueva"
        :disable="loading"
      />
      <div v-if="updateError !== ''" class="text-center text-red text-caption">
        {{ updateError }}
      </div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        no-caps
        rounded
        class="bg-primary text-white btn-fixed-width"
        flat
        label="Modificar contraseña"
        @click="updatePassword"
        :disable="
          errorNueva !== '' ||
          email == '' ||
          password_actual == '' ||
          new_password_1 == '' ||
          new_password_2 == ''
        "
      />
      <q-btn
        v-close-popup
        no-caps
        rounded
        class="bg-red-8 text-white btn-fixed-width"
        flat
        label="Cancelar"
      />
    </q-card-actions>

    <q-inner-loading :showing="loading_update">
      <q-spinner-dots color="primary" size="2em"
    /></q-inner-loading>
    <q-dialog v-model="confirm" persistent>
      <q-card flat>
        <q-card-section class="row items-center">
          <q-avatar icon="check" color="grey-1" text-color="primary" />
          <span class="q-ml-sm">Contraseña modificada con éxito.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Ok" color="primary" @click="onConfirmOk" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>
<script setup>
import { ref } from "vue";

import { useUserStore } from "src/stores/authStore";
const emit = defineEmits(["passwordChanged"]);
const email = ref("");
const password_actual = ref("");
const errorActual = ref("");
const errorNueva = ref("");
const new_password_1 = ref("");
const new_password_2 = ref("");
const loading = ref(false);
const loading_update = ref(false);
const userStore = useUserStore();
const updateError = ref("");
const confirm = ref(false);

const onConfirmOk = () => {
  // Limpiar los campos del formulario
  email.value = "";
  password_actual.value = "";
  new_password_1.value = "";
  new_password_2.value = "";
  errorActual.value = "";
  errorNueva.value = "";
  updateError.value = "";
  // Cerrar el diálogo de confirmación
  confirm.value = false;
  // Emitir el evento al componente padre
  emit("passwordChanged");
};

const validarNueva = () => {
  // loading.value = true;
  errorNueva.value = "";

  if (!new_password_1.value) {
    errorNueva.value = "La nueva contraseña es requerida.";
    return false;
  }

  if (!new_password_2.value) {
    errorNueva.value = "El campo es requerido.";
    return false;
  }
  if (new_password_2.value !== new_password_1.value) {
    errorNueva.value = "Contraseña no coincide.";
    return false;
  }

  return true;
};

const updatePassword = async () => {
  loading_update.value = true;
  loading.value = false;
  updateError.value = "";
  const isActualValid = await validarActual();
  const isNuevaValid = validarNueva();

  if (!isActualValid || !isNuevaValid) {
    loading_update.value = false;
    return;
  }

  if (password_actual.value == new_password_1.value) {
    loading_update.value = false;
    errorActual.value = "Nueva contraseña es igual a la anterior.";
    return false;
  }

  try {
    await userStore.updatePassword(
      email.value,
      password_actual.value,
      new_password_1.value
    );
    loading_update.value = false;
    confirm.value = true;
    // Validación exitosa

    return true;
  } catch (error) {
    loading_update.value = false;
    const status = error.response?.status;

    if (status === 400 || status === 401) {
      updateError.value = "Email y/o contraseña inválida.";
    } else {
      updateError.value = "Error al validar la contraseña.";
    }
    return false;
  }
};
const validarActual = async () => {
  loading.value = true;
  errorActual.value = ""; // Limpiar mensajes de error previos

  if (!password_actual.value) {
    loading.value = false;
    errorActual.value = "La contraseña actual es requerida.";
    return false;
  }

  if (!email.value) {
    loading.value = false;
    errorActual.value = "El correo electrónico es requerido.";
    return false;
  }

  try {
    await userStore.fetchProfile(email.value, password_actual.value);
    loading.value = false;
    // Validación exitosa
    return true;
  } catch (error) {
    loading.value = false;
    const status = error.response?.status;

    if (status === 400 || status === 401) {
      errorActual.value = "Contraseña inválida.";
    } else {
      errorActual.value = "Error al validar la contraseña.";
    }
    return false;
  }
};
</script>
