<template>
  <q-card
    style="width: 800px; max-width: 80vw; border-radius: 20px"
    class="q-pa-xs bg-grey-1"
  >
    <div class="text-h4 text-weight-bold text-center text-primary q-pt-lg">
      {{ tituloNoticia }}
    </div>
    <div
      class="text-subtitle-1 text-primary q-mb-xs text-center"
      v-if="editar_noticia"
    >
      Todos los campos son requeridos, exceptuando imagenes o videos (elegir
      sólo uno).
    </div>
    <!-- {{ noticia.destacada }} destacada <br />{{ noticia.activo }} <br />{{
      modelNoticia.destacada
    }} -->

    <q-separator spaced />
    <q-card-section>
      <div class="text-h6 text-weight-medium text-primary text-left">
        Título de la noticia
      </div>

      <q-input
        filled
        square
        v-model="modelNoticia.titulo"
        type="text"
        required
        :rules="[(val) => !!val || 'Título de la noticia es requerido']"
        :clearable="editar_noticia"
        :readonly="!editar_noticia && noticia ? true : false"
      >
      </q-input>
      <q-separator spaced />
      <div class="text-h6 text-weight-medium text-primary text-left">
        Contenido de la noticia
      </div>
      <q-input
        filled
        square
        v-model="modelNoticia.contenido"
        type="text"
        required
        autogrow
        clearable
        :rules="[(val) => !!val || 'Contenido de la noticia es requerido']"
        :readonly="!editar_noticia && noticia ? true : false"
      />
      <q-separator spaced />
      <div class="text-h6 text-weight-medium text-primary text-left">
        Resumen de la noticia
      </div>
      <q-input
        filled
        v-model="modelNoticia.resumen_contenido"
        type="text"
        required
        clearable
        :rules="[
          (val) =>
            (val.length > 10 && val.length <= 200) ||
            'Resuma la noticia en un mínimo de 10 caracteres y máximo 200 caracteres',
        ]"
        autogrow
        :readonly="!editar_noticia && noticia ? true : false"
      />
      <q-separator spaced />
      <div class="text-h6 text-weight-medium text-primary text-left">
        Noticia destacada
      </div>
      <div class="text-caption text-primary text-left">
        Implican noticias que se mostrarán con mayor relevancia.
      </div>
      <div class="column">
        <q-toggle
          :label="
            modelNoticia.destacada ? 'Noticia destacada' : ' No destacada'
          "
          color="red-14"
          :false-value="false"
          :true-value="true"
          v-model="modelNoticia.destacada"
          :disable="!editar_noticia && noticia ? true : false"
        />
      </div>
      <q-separator spaced />
      <div class="text-h6 text-weight-medium text-primary text-left">
        Imagen de la noticia
      </div>
      <q-card class="my-card bg-grey-1" flat>
        <q-img
          v-if="imagenPrevia"
          :src="imagenPrevia"
          alt="Imagen de la noticia"
          spinner-color="primary"
          spinner-size="82px"
          class="q-ml-md"
          style="max-width: 93%"
        >
          <q-fab
            v-if="imagenPrevia"
            color="red-14"
            icon="keyboard_arrow_down"
            direction="down"
            vertical-actions-align="left"
            padding="xs"
            :disable="!editar_noticia && noticia ? true : false"
          >
            <q-fab-action
              color="primary"
              icon="delete"
              label="Eliminar imagen"
              @click="deleteImagen"
            />
          </q-fab>
        </q-img>

        <q-card-section>
          <q-file
            label="Seleccione un archivo nuevo."
            filled
            v-model="modelNoticia.imagen"
            clearable
            accept="image/png, image/jpeg"
            max-file-size="500000"
            hint="Imagenes en formato jpg o png. No mayores a 500KB"
            @rejected="onRejected"
            @update:model-value="onFileChange"
            :error="!!errorImagen"
            :error-message="errorImagen"
            :disable="modelNoticia.link"
            :readonly="!editar_noticia && noticia ? true : false"
          >
            <template v-slot:append>
              <q-icon name="attach_file" />
            </template>
            <q-tooltip v-if="modelNoticia.link">
              Solo se permite imagen o video, no ambos.
            </q-tooltip>
          </q-file>
        </q-card-section>
      </q-card>

      <q-separator spaced />
      <div class="text-h6 text-weight-medium text-primary text-left">
        Video de la noticia
      </div>
      <div
        class="text-subtitle2 text-weight-light text-primary text-left q-pb-sm"
      >
        Si la noticia tiene un video en Facebook, por favor sigue la siguiente
        guía:
        <q-btn
          dense
          label="Publicación video de Facebook en un sitio web"
          href="https://web.facebook.com/help/1570724596499071?_rdc=1&_rdr"
          target="_blank"
          icon-right="arrow_forward"
          text-color="red"
          no-caps
          outline
          rounded
        />
      </div>

      <q-input
        filled
        v-model="modelNoticia.link"
        type="url"
        required
        autogrow
        :disable="modelNoticia.imagen && editar_noticia ? true : false"
        clearable
        :readonly="!editar_noticia && noticia ? true : false"
      >
        <q-tooltip v-if="modelNoticia.imagen">
          Solo se permite imagen o video, no ambos.
        </q-tooltip>
      </q-input>
      <q-separator spaced />
      <div class="text-h6 text-weight-medium text-primary text-left">
        ¿Noticia activa?
      </div>
      <div class="text-caption text-primary text-left">
        Si la noticia está activa, estará disponible en sitio web; caso
        contrario, permanecerá oculta.
      </div>
      <q-toggle
        :label="modelNoticia.activo ? 'Noticia activa' : 'Noticia desactivada'"
        color="red-14"
        :false-value="false"
        :true-value="true"
        v-model="modelNoticia.activo"
        :disable="!editar_noticia && noticia ? true : false"
      />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        no-caps
        rounded
        class="bg-primary text-white btn-fixed-width"
        flat
        v-if="editar_noticia || crear_noticia"
        label="Guardar noticia"
        @click="guardarNoticia"
        :disable="loading_noticia"
      />
      <q-btn
        v-if="!editar_noticia && noticia"
        no-caps
        rounded
        class="bg-warning text-white btn-fixed-width"
        flat
        label="Editar noticia"
        @click="editarNoticia"
        :disable="loading_noticia"
      />
      <q-btn
        @click="onConfirmOk"
        no-caps
        rounded
        class="bg-red-8 text-white btn-fixed-width"
        flat
        :label="editar_noticia || crear_noticia ? 'Cancelar' : 'Volver'"
      />
    </q-card-actions>

    <q-inner-loading :showing="loading_noticia">
      <q-spinner-dots color="primary" size="2em"
    /></q-inner-loading>
    <q-dialog
      v-model="confirm"
      persistent
      backdrop-filter="blur(4px) saturate(150%)"
    >
      <q-card flat class="bg-amber-1">
        <q-card-section class="row items-center">
          <q-avatar icon="check" color="cyan-8" text-color="white" />
          <span class="q-ml-sm text-weight-medium text-primary text-h6">{{
            mensaje
          }}</span>
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
import { useQuasar } from "quasar";

const emit = defineEmits(["cancelarPopup"]);

const $q = useQuasar();
const userStore = useUserStore();
const informacionStore = useInformacionesStore();
const userProfile = computed(() => userStore.profiles);
const user = computed(() => userStore.user);
const editar_noticia = computed(() => informacionStore.editar_noticia);
const crear_noticia = computed(() => informacionStore.crear_noticia);
const noticia = computed(() => informacionStore.noticia);
const loading_noticia = ref(false);
const mensaje = ref("");
const errorImagen = ref("");
const modelNoticia = ref(
  noticia.value
    ? {
        autor: noticia.value.autor.id,
        titulo: noticia.value.titulo,
        contenido: noticia.value.contenido,
        resumen_contenido: noticia.value.resumen_contenido,
        destacada: noticia.value.destacada,
        imagen: noticia.value.imagen,
        // video: null,
        link: noticia.value.link,
        activo: noticia.value.activo,
      }
    : {
        titulo: "",
        contenido: "",
        resumen_contenido: "",
        destacada: false,
        autor: "",
        imagen: null,
        // video: null,
        link: null,
        activo: true,
      }
);
const imagenPrevia = ref(noticia.value ? noticia.value.imagen : null);
const confirm = ref(false);

const editarNoticia = () => {
  informacionStore.setModificarNoticia(noticia.value);
};

const guardarNoticia = async () => {
  loading_noticia.value = true;
  // Crear una instancia de FormData
  const formData = new FormData();

  // Agregar los campos de la noticia al FormData
  if (noticia.value) {
    formData.append("id", noticia.value.id);
  }

  formData.append("titulo", modelNoticia.value.titulo);
  formData.append("contenido", modelNoticia.value.contenido);
  formData.append("resumen_contenido", modelNoticia.value.resumen_contenido);
  // formData.append("destacada", modelNoticia.value.destacada ? true : false);
  formData.append("destacada", modelNoticia.value.destacada ? true : false);
  formData.append("activo", modelNoticia.value.activo ? true : false);

  // formData.append("activo", modelNoticia.value.activo ? true : false);

  // Agregar la imagen solo si existe
  if (modelNoticia.value.imagen) {
    // formData.append("imagen", modelNoticia.value.imagen);
    if (modelNoticia.value.imagen instanceof File) {
      // El usuario subió un archivo nuevo
      formData.append("imagen", modelNoticia.value.imagen);
    }
  }

  if (modelNoticia.value.link) {
    formData.append("link", modelNoticia.value.link);
  }

  if (crear_noticia.value) {
    formData.append("autor", user.value.id);
  } else {
    formData.append("autor", noticia.value.autor);
  }

  try {
    await informacionStore.postNoticia(formData);
    loading_noticia.value = false;
    confirm.value = true;
    if (editar_noticia.value) {
      mensaje.value = "Noticia editada con éxito.";
    } else {
      mensaje.value = "Noticia creada con éxito.";
    }
  } catch (error) {
    loading_noticia.value = false;
    const status = error.response?.status;
  }
};

const onConfirmOk = () => {
  // Limpiar los campos del formulario

  modelNoticia.titulo = "";
  modelNoticia.contenido = "";
  modelNoticia.resumen_contenido = "";
  modelNoticia.destacada = false;
  modelNoticia.autor = "";
  modelNoticia.imagen = null;
  modelNoticia.link = null;
  modelNoticia.activo = true;

  // Cerrar el diálogo de confirmación
  confirm.value = false;
  // Emitir el evento al componente padre
  emit("cancelarPopup");
};

const onRejected = (rejectedEntries) => {
  let messages = [];
  errorImagen.value = "";
  rejectedEntries.forEach((entry) => {
    const failedProp = entry.failedPropValidation;
    const fileName = entry.file.name;

    if (failedProp === "max-file-size") {
      messages.push(
        `El archivo "${fileName}" supera el tamaño máximo permitido (500KB).`
      );
    } else if (failedProp === "accept") {
      messages.push(
        `El archivo "${fileName}" tiene un formato no válido. Solo se permiten imágenes JPG y PNG.`
      );
    } else {
      messages.push(`Error al cargar el archivo "${fileName}".`);
    }
  });

  errorImagen.value = messages.join(" ");
};

const onFileChange = (file) => {
  errorImagen.value = "";
  // Implementación actualizada
  errorImagen.value = "";

  //const file = modelI
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagenPrevia.value = e.target.result; // Actualiza la previsualización
    };
    reader.readAsDataURL(file);
  } else {
    // Si se limpia la selección, mostrar la imagen existente o ninguna
    modelNoticia.imagen = null;
    imagenPrevia.value = noticia.value ? noticia.value.imagen : null;
  }
};

const deleteImagen = () => {
  imagenPrevia.value = null;
  modelNoticia.value.imagen = null;
};

const obtenerNombreArchivo = (ruta) => {
  if (!ruta) return "";

  // Busca la posición de 'noticias/' en la ruta
  const indice = ruta.lastIndexOf("noticias/");
  if (indice !== -1) {
    // Extrae la parte después de 'noticias/'
    return ruta.substring(indice + "noticias/".length);
  } else {
    // Si 'noticias/' no se encuentra, devuelve el nombre del archivo
    return ruta.split("/").pop();
  }
};

const tituloNoticia = computed(() => {
  if (noticia.value) {
    if (editar_noticia.value) {
      return "Editar noticia";
    } else {
      return "Detalles de noticia";
    }
  } else {
    return "Crear noticia";
  }
});
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>
