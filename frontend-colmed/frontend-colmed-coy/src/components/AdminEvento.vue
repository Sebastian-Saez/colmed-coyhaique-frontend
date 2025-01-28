<template>
  <q-card
    style="width: 800px; max-width: 80vw; border-radius: 20px"
    class="q-pa-xs bg-grey-1"
  >
    <div class="text-h4 text-weight-bold text-center text-primary q-pt-lg">
      {{ tituloEvento }}
    </div>
    <div
      class="text-subtitle-1 text-primary q-mb-xs text-center"
      v-if="editar_evento"
    >
      Todos los campos son requeridos
    </div>

    <q-separator spaced />
    <q-card-section>
      <div class="text-h6 text-weight-medium text-primary text-left">
        Título del evento
      </div>

      <q-input
        filled
        square
        v-model="modelEvento.titulo"
        type="text"
        required
        :rules="[(val) => !!val || 'Título del evento es requerido']"
        :clearable="editar_evento"
        :readonly="!editar_evento && evento ? true : false"
        error-message="Título no más de 250 caracteres"
        :error="!isValid"
      >
      </q-input>
      <q-separator spaced />
      <div class="text-h6 text-weight-medium text-primary text-left">
        Descripción del evento
      </div>
      <q-input
        filled
        square
        v-model="modelEvento.descripcion"
        type="text"
        required
        autogrow
        clearable
        :rules="[(val) => !!val || 'Descripcion del evento es requerido']"
        :readonly="!editar_evento && evento ? true : false"
      />
      <q-separator spaced />

      <div class="text-h6 text-weight-medium text-primary text-left">
        Fecha de inicio del evento
      </div>
      <q-input
        filled
        dense
        v-model="modelEvento.fecha_inicio"
        mask="date"
        :rules="['date']"
        :disable="!editar_evento && evento ? true : false"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="modelEvento.fecha_inicio">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Ok" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-separator spaced />
      <div class="text-h6 text-weight-medium text-primary text-left">
        Fecha de termino del evento
      </div>
      <q-input
        filled
        v-model="modelEvento.fecha_fin"
        mask="date"
        dense
        :rules="['date']"
        :disable="!editar_evento && evento ? true : false"
      >
        <template v-slot:prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="modelEvento.fecha_fin">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Ok" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <!-- <q-input
        filled
        v-model="modelEvento.fecha_fin"
        type="text"
        required
        clearable
        :rules="[
          (val) =>
            (val.length > 10 && val.length <= 200) ||
            'Resuma la noticia en un mínimo de 10 caracteres y máximo 200 caracteres',
        ]"
        autogrow
        :readonly="!editar_evento && evento ? true : false"
      /> -->
      <q-separator spaced />

      <div class="text-h6 text-weight-medium text-primary text-left">
        Imagen del evento
      </div>
      <q-card class="my-card bg-grey-1" flat>
        <q-img
          v-if="imagenPrevia"
          :src="imagenPrevia"
          alt="Imagen del evento"
          spinner-color="primary"
          spinner-size="82px"
          class="q-ml-md"
          style="max-width: 93%"
        >
          <!-- <q-fab
            v-if="imagenPrevia"
            color="red-14"
            icon="keyboard_arrow_down"
            direction="down"
            vertical-actions-align="left"
            padding="xs"
            :disable="!editar_evento && evento ? true : false"
          >
            <q-fab-action
              color="primary"
              icon="delete"
              label="Eliminar imagen"
              @click="deleteImagen"
            />
          </q-fab> -->
        </q-img>

        <q-card-section>
          <q-file
            label="Seleccione un archivo nuevo."
            filled
            v-model="modelEvento.imagen"
            clearable
            accept="image/png, image/jpeg"
            max-file-size="500000"
            hint="Imagenes en formato jpg o png. No mayores a 500KB"
            @rejected="onRejected"
            @update:model-value="onFileChange"
            :error="!!errorImagen"
            :error-message="errorImagen"
            :readonly="!editar_evento && evento ? true : false"
          >
            <template v-slot:append>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </q-card-section>
      </q-card>

      <q-separator spaced />

      <!-- <div class="text-h6 text-weight-medium text-primary text-left">
        ¿Noticia activa?
      </div>
      <div class="text-caption text-primary text-left">
        Si la noticia está activa, estará disponible en sitio web; caso
        contrario, permanecerá oculta.
      </div>
      <q-toggle
        :label="modelEvento.activo ? 'Noticia activa' : 'Noticia desactivada'"
        color="red-14"
        :false-value="false"
        :true-value="true"
        v-model="modelEvento.activo"
        :disable="!editar_evento && noticia ? true : false"
      /> -->
    </q-card-section>
    Editar {{ editar_evento }}?? crear {{ crear_evento }}
    <q-card-actions align="right">
      <q-btn
        no-caps
        rounded
        class="bg-primary text-white btn-fixed-width"
        flat
        v-if="editar_evento || crear_evento"
        label="Guardar Evento"
        @click="guardarEvento"
        :disable="loading_evento"
      />
      <q-btn
        v-if="!editar_evento && evento"
        no-caps
        rounded
        class="bg-warning text-white btn-fixed-width"
        flat
        label="Editar Evento"
        @click="editarEvento"
        :disable="loading_evento"
      />
      <q-btn
        @click="onConfirmOk"
        no-caps
        rounded
        class="bg-red-8 text-white btn-fixed-width"
        flat
        :label="editar_evento || crear_evento ? 'Cancelar' : 'Volver'"
      />
    </q-card-actions>

    <q-inner-loading :showing="loading_evento">
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
import { useEventosStore } from "src/stores/eventos";
import { useQuasar } from "quasar";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
const emit = defineEmits(["cancelarPopup"]);

const $q = useQuasar();
dayjs.extend(customParseFormat);
const userStore = useUserStore();
const eventosStore = useEventosStore();
const user = computed(() => userStore.user);
const editar_evento = computed(() => eventosStore.editar_evento);
const crear_evento = computed(() => eventosStore.crear_evento);
const evento = computed(() => eventosStore.evento);
const loading_evento = ref(false);
const mensaje = ref("");
const errorImagen = ref("");
const modelEvento = ref(
  evento.value
    ? {
        autor: evento.value.autor.id,
        titulo: evento.value.titulo,
        descripcion: evento.value.descripcion,
        fecha_inicio: evento.value.fecha_inicio,
        fecha_fin: evento.value.fecha_fin,
        imagen: evento.value.imagen,

        // link: noticia.value.link,
        // activo: noticia.value.activo,
      }
    : {
        titulo: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        autor: "",
        imagen: null,
        // destacada: false,
        // link: null,
        // activo: true,
      }
);
const imagenPrevia = ref(evento.value ? evento.value.imagen : null);
const confirm = ref(false);

const formatDate = (dateString) => {
  // Si está vacío o es "No informado", devuélvelo tal cual
  if (!dateString || dateString === "No informado") {
    return "No informado";
  }
  return dayjs(dateString).format("DD-MM-YYYY");
};

const isValid = computed(() => modelEvento.value.titulo <= 250);

const formatDateToBackend = (dateString) => {
  // Si está vacío o es "No informado", devuélvelo tal cual
  if (!dateString || dateString === "No informado") {
    return "No informado";
  }
  return dayjs(dateString).format("YYYY-MM-DD");
};

const editarEvento = () => {
  eventosStore.setModificarEvento(evento);
};

const guardarEvento = async () => {
  loading_evento.value = true;
  // Crear una instancia de FormData
  const formData = new FormData();

  // Agregar los campos de la noticia al FormData
  if (evento.value) {
    formData.append("id", evento.value.id);
  }

  formData.append("titulo", modelEvento.value.titulo);
  formData.append("descripcion", modelEvento.value.descripcion);
  formData.append(
    "fecha_inicio",
    formatDateToBackend(modelEvento.value.fecha_inicio)
  );
  formData.append(
    "fecha_fin",
    formatDateToBackend(modelEvento.value.fecha_fin)
  );

  // formData.append("destacada", modelEvento.value.destacada ? true : false);
  // formData.append("activo", modelEvento.value.activo ? true : false);

  // formData.append("activo", modelEvento.value.activo ? true : false);

  // Agregar la imagen solo si existe
  // if (modelEvento.value.imagen) {
  //   formData.append("imagen", modelEvento.value.imagen);
  // }
  if (modelEvento.value.imagen instanceof File) {
    // El usuario subió un archivo nuevo
    formData.append("imagen", modelEvento.value.imagen);
  }

  if (crear_evento.value) {
    formData.append("autor", user.value.id);
  } else {
    formData.append("autor", evento.value.autor);
  }

  try {
    await eventosStore.postEvento(formData);
    loading_evento.value = false;
    confirm.value = true;
    if (editar_evento.value) {
      mensaje.value = "Evento editado con éxito.";
    } else {
      mensaje.value = "Evento creado con éxito.";
    }
  } catch (error) {
    loading_evento.value = false;
    const status = error.response?.status;
  }
};

const onConfirmOk = () => {
  // Limpiar los campos del formulario

  modelEvento.titulo = "";
  modelEvento.descripcion = "";
  modelEvento.fecha_inicio = "";
  modelEvento.fecha_fin = "";
  // modelEvento.destacada = false;
  modelEvento.autor = "";
  modelEvento.imagen = null;
  // modelEvento.link = null;
  // modelEvento.destacada = true;

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
    modelEvento.imagen = null;
    imagenPrevia.value = evento.value ? evento.value.imagen : null;
  }
};

const deleteImagen = () => {
  imagenPrevia.value = null;
  modelEvento.value.imagen = null;
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

const tituloEvento = computed(() => {
  if (evento.value) {
    if (editar_evento.value) {
      return "Editar evento.";
    } else {
      return "Detalles del evento.";
    }
  } else {
    return "Crear evento.";
  }
});
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>
