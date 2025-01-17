<template>
  <q-page class="q-pa-md bg-cyan-1">
    <q-card flat class="bg-cyan-1">
      <q-card-section>
        <div
          class="text-h3 text-primary text-center text-weight-bolder"
          style="letter-spacing: 10px"
        >
          Mis datos
        </div>
        <q-separator inset />
      </q-card-section>
      <q-card-section
        class="text-white bg-red-7 text-center"
        style="border-radius: 20px 20px 0px 0px"
      >
        <div class="text-h4 text-weight-bold">Charlotte Mile</div>
        <div class="text-h5 text-weight-bold">RUT: 11111111-X</div>
      </q-card-section>
      <q-card-section
        class="bg-red-1 text-primary"
        style="border-radius: 0px 0px 20px 20px"
      >
        <q-item>
          <q-item-section>
            <q-item-label class="text-semibold text-h6">
              Fecha de nacimiento:
            </q-item-label>
            <q-item-label class="text-h6 text-weight-light">{{
              formatDate(medico.fecha_nacimiento)
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-semibold text-h6">
              Fecha de título:
            </q-item-label>
            <q-item-label class="text-h6 text-weight-light">{{
              formatDate(medico.fecha_titulo)
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-semibold text-h6">
              Dirección:
            </q-item-label>
            <q-item-label class="text-h6 text-weight-light">{{
              medico.direccion
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-semibold text-h6"> Comuna: </q-item-label>
            <q-item-label class="text-h6 text-weight-light">{{
              medico.comuna
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-semibold text-h6">
              Correo electrónico:
            </q-item-label>
            <q-item-label class="text-h6 text-weight-light">{{
              medico.user.email
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-semibold text-h6">
              Teléfono:
            </q-item-label>
            <q-item-label class="text-h6 text-weight-light">{{
              medico.contacto
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-card-actions align="center">
          <q-btn
            no-caps
            rounded
            style="width: 200px"
            color="primary"
            @click="$router.back()"
          >
            <div class="text-body1">Volver</div></q-btn
          >
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useInformacionesStore } from "src/stores/informaciones";
import dayjs from "dayjs";
const informacionStore = useInformacionesStore();
// Lógica, composables, etc.
const router = useRouter();
// Controla el slide activo en el carousel
const slideRegionales = ref(0);

const medico = {
  id: 8,
  user: {
    id: 1874,
    username: "charlottemile@email.com",
    email: "charlottemile@email.com",
    first_name: "Charlotte",
    last_name: "Mile",
    perfiles: [],
  },
  plaza: null,
  rut: "12645462-7",
  icm: 21665,
  contacto: "63528992",
  direccion: "21 DE MAYO 447         2 PISO               ",
  comuna: "  COYHAIQUE",
  condicion_vital: "VIVO",
  fecha_nacimiento: "1973-09-30",
  fecha_titulo: "1999-01-08",
  directiva: null,
  registro_superintendencia: {
    id: 2,
    ordenes_profesionales: [
      {
        id: 3,
        institucion_certificadora: {
          id: 3,
          nombre: "Universidad Pontificia Bolivariana",
          fecha_modificacion: "2024-12-23T13:20:33.040910Z",
        },
        nombre: "Médico Cirujano:",
        descripcion:
          "Posee título de Médico Cirujano (Médico Cirujano) otorgado por Universidad Pontificia Bolivariana,colombia,2006, reconocido por el Ministerio de Relaciones Exteriores el 27/12/2013",
        fecha_certificacion: "2013-12-27",
      },
    ],
    especialidades: [
      {
        id: 1,
        institucion_certificadora: {
          id: 4,
          nombre:
            "Corporacion Nacional Autónoma de Certificación de Especialidades Médicas (CONACEM)",
          fecha_modificacion: "2024-12-23T13:20:33.048364Z",
        },
        nombre: "Geriatría:",
        descripcion:
          "Posee certificado de especialista en Geriatría otorgado por la Corporacion Nacional Autónoma de Certificación de Especialidades Médicas (CONACEM), emitido con fecha 23/02/2017.",
        fecha_certificacion: "2017-02-23",
      },
      {
        id: 2,
        institucion_certificadora: {
          id: 5,
          nombre: "Pontificia Universidad Católica de Chile",
          fecha_modificacion: "2024-12-23T13:20:33.060605Z",
        },
        nombre: "Medicina Paliativa y de Manejo del Dolor:",
        descripcion:
          "Posee título de especialista en Medicina Paliativa y de Manejo del Dolor (especialidad Medicina Paliativa) otorgado por la Pontificia Universidad Católica de Chile, emitido con fecha 07/08/2020.",
        fecha_certificacion: "2020-08-07",
      },
    ],
    numero_registro: "285235",
    fecha_registro: "2014-05-27",
    fecha_nacimiento: "1982-10-19",
    nacionalidad: "Extranjera",
    fecha_modificacion: "2024-12-23T14:14:57.946081Z",
  },
};

const formatDate = (dateString) => {
  // Si está vacío o es "No informado", devuélvelo tal cual
  if (!dateString || dateString === "No informado") {
    return "No informado";
  }
  return dayjs(dateString).format("DD-MM-YYYY");
};
</script>

<style scoped>
/* Estilos específicos */
.text-wrap {
  /* Permite que las palabras largas se partan en varias líneas */
  white-space: pre-wrap; /* o normal */
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
