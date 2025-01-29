<template>
  <q-card
    style="width: 800px; max-width: 80vw; border-radius: 20px"
    class="q-pa-xs bg-grey-1"
  >
    <div class="text-h4 text-weight-bold text-center text-primary q-pt-lg">
      {{ tituloPublicidadMedica }}
    </div>
    <div
      class="text-subtitle-1 text-primary q-mb-xs text-center"
      v-if="editar_publicidad"
    >
      Todos los campos son requeridos.
    </div>

    <q-separator spaced />
    <q-card-section>
      <div class="text-h6 text-weight-medium text-primary text-left">
        Título de la Publicidad Médica
      </div>

      <q-input
        filled
        square
        v-model="modelPublicidadMedica.titulo"
        type="text"
        required
        :rules="[(val) => !!val || 'Título de la publicidad es requerido']"
        :clearable="editar_publicidad"
        :readonly="!editar_publicidad && publicidad_medica ? true : false"
      >
      </q-input>
      <q-separator spaced />
      <div class="text-h6 text-weight-medium text-primary text-left">
        Descripción de la Publicidad médica
      </div>
      <q-input
        filled
        square
        v-model="modelPublicidadMedica.descripcion"
        type="text"
        required
        autogrow
        clearable
        :rules="[(val) => !!val || 'Descripcion de la publicidad es requerido']"
        :readonly="!editar_publicidad && publicidad_medica ? true : false"
      />
      <q-separator spaced />
      <div class="text-h6 text-weight-medium text-primary text-left">
        Link de la Publicidad médica de interés
      </div>
      <q-input
        filled
        square
        v-model="modelPublicidadMedica.link"
        type="text"
        required
        autogrow
        clearable
        :rules="[
          (val) =>
            !!val ||
            'Link de interés relacionado a Publicidad médica es requerido',
        ]"
        :readonly="!editar_publicidad && publicidad_medica ? true : false"
      />

      <q-separator spaced />

      <q-separator spaced />
      <div class="text-h6 text-weight-medium text-primary text-left">
        ¿Publicidad activa?
      </div>
      <div class="text-caption text-primary text-left">
        Si la publicidad médica está activa, estará disponible en sitio web;
        caso contrario, permanecerá oculta.
      </div>
      <q-toggle
        :label="
          modelPublicidadMedica.activo
            ? 'Publicidad activa'
            : 'Publicidad desactivada'
        "
        color="red-14"
        :false-value="false"
        :true-value="true"
        v-model="modelPublicidadMedica.activo"
        :disable="!editar_publicidad && publicidad_medica ? true : false"
      />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        no-caps
        rounded
        class="bg-primary text-white btn-fixed-width"
        flat
        v-if="editar_publicidad || crear_publicidad"
        label="Guardar Publicidad médica"
        @click="guardarPublicidadMedica"
        :disable="loading_publicidad_medica"
      />
      <q-btn
        v-if="!editar_publicidad && publicidad_medica"
        no-caps
        rounded
        class="bg-warning text-white btn-fixed-width"
        flat
        label="Editar Publicidad médica"
        @click="editarPublicidad"
        :disable="loading_publicidad_medica"
      />
      <q-btn
        @click="onConfirmOk"
        no-caps
        rounded
        class="bg-red-8 text-white btn-fixed-width"
        flat
        :label="editar_publicidad || crear_publicidad ? 'Cancelar' : 'Volver'"
      />
    </q-card-actions>

    <q-inner-loading :showing="loading_publicidad_medica">
      <q-spinner-dots color="primary" size="2em"
    /></q-inner-loading>
    <q-dialog v-model="confirm" persistent>
      <q-card flat>
        <q-card-section class="row items-center">
          <q-avatar icon="check" color="grey-1" text-color="primary" />
          <span class="q-ml-sm">{{ mensaje }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Ok" color="primary" @click="onConfirmOk" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>
<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "src/stores/authStore";
import { useInformacionesStore } from "src/stores/informaciones";
import { usePublicidadStore } from "src/stores/publicidadMedica";
import { useQuasar } from "quasar";

const emit = defineEmits(["cancelarPopup"]);

const $q = useQuasar();
const userStore = useUserStore();
const publicidadStore = usePublicidadStore();
const userProfile = computed(() => userStore.profiles);
const user = computed(() => userStore.user);
const editar_publicidad = computed(() => publicidadStore.editar_publicidad);
const crear_publicidad = computed(() => publicidadStore.crear_publicidad);
const publicidad_medica = computed(() => publicidadStore.publicidad_medica);
const loading_publicidad_medica = ref(false);
const mensaje = ref("");
const errorImagen = ref("");
const modelPublicidadMedica = ref(
  publicidad_medica.value
    ? {
        autor: publicidad_medica.value.autor.id,
        titulo: publicidad_medica.value.titulo,
        descripcion: publicidad_medica.value.descripcion,

        link: publicidad_medica.value.link,
        activo: publicidad_medica.value.activo,
      }
    : {
        titulo: "",
        descripcion: "",
        link: null,
        activo: true,
      }
);

const confirm = ref(false);

const editarPublicidad = () => {
  publicidadStore.setModificarPublicidad(publicidad_medica.value);
};

const guardarPublicidadMedica = async () => {
  loading_publicidad_medica.value = true;
  // Crear una instancia de FormData
  const formData = new FormData();

  if (publicidad_medica.value) {
    formData.append("id", publicidad_medica.value.id);
  }

  formData.append("titulo", modelPublicidadMedica.value.titulo);
  formData.append("descripcion", modelPublicidadMedica.value.descripcion);
  formData.append("link", modelPublicidadMedica.value.link);
  formData.append("activo", modelPublicidadMedica.value.activo ? true : false);

  if (crear_publicidad.value) {
    formData.append("autor", user.value.id);
  } else {
    formData.append("autor", publicidad_medica.value.autor);
  }

  try {
    await publicidadStore.postPublicidadMedica(formData);
    loading_publicidad_medica.value = false;
    confirm.value = true;
    if (editar_publicidad.value) {
      mensaje.value = "Publicidad médica editada con éxito.";
    } else {
      mensaje.value = "Publicidad médica creada con éxito.";
    }
  } catch (error) {
    loading_publicidad_medica.value = false;
    const status = error.response?.status;
  }
};

const onConfirmOk = () => {
  // Limpiar los campos del formulario

  modelPublicidadMedica.titulo = "";
  modelPublicidadMedica.descripcion = "";
  modelPublicidadMedica.link = null;
  modelPublicidadMedica.activo = true;
  modelPublicidadMedica.autor = "";
  // Cerrar el diálogo de confirmación
  confirm.value = false;
  // Emitir el evento al componente padre
  emit("cancelarPopup");
};

const tituloPublicidadMedica = computed(() => {
  if (publicidad_medica.value) {
    if (editar_publicidad.value) {
      return "Editar Publicidad médica.";
    } else {
      return "Detalles de Publicidad médica.";
    }
  } else {
    return "Crear Publicidad médica.";
  }
});
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>
