<template>
  <q-page class="q-pa-md bg-cyan-1">
    <q-card flat class="bg-cyan-1">
      <q-card-section>
        <div
          class="text-h3 text-primary text-center text-weight-bolder"
          style="letter-spacing: 10px"
        >
          Detalle afiliación
        </div>
        <q-separator inset />
      </q-card-section>
      <q-card-section
        class="text-white bg-green-14 text-center"
        style="border-radius: 20px 20px 0px 0px"
      >
        <div class="text-h4 text-weight-bold">Charlotte Mile</div>

        <div class="row no-wrap q-mx-xl">
          <!-- <div class="text-h6 q-mr-xs">Detalle de:</div> -->
          <div class="text-body1 text-weight-bold">Condición: Afiliado</div>
          <q-separator vertical spaced />
          <div class="text-body1 text-weight-bold">ICM: 11111</div>
        </div>
      </q-card-section>
      <q-card-section
        class="bg-green-1"
        style="border-radius: 0px 0px 20px 20px"
      >
        <q-scroll-area style="height: 500px">
          <q-item-section
            no-wrap
            class="bg-green-2"
            style="border-radius: 15px"
          >
            <q-expansion-item
              v-for="afiliacion in afiliaciones"
              :key="afiliacion.id"
              group="somegroup"
              :default-opened="afiliacion.entidad.sigla === 'COLMED'"
              style="width: 345px"
              class="text-primary"
            >
              <template v-slot:header>
                <q-item-section class="text-weight-medium text-wrap text-h6">
                  {{ afiliacion.entidad.nombre_entidad }}
                </q-item-section>
              </template>
              <q-separator spaced inset />
              <q-card>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold text-h6">
                      Condición:
                    </q-item-label>
                    <q-item-label class="text-h6 text-weight-light">{{
                      afiliacion.condicion_afiliado
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold text-h6">
                      Fecha inscripción:
                    </q-item-label>
                    <q-item-label class="text-h6 text-weight-light">{{
                      formatDate(afiliacion.fecha_inscripcion)
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold text-h6">
                      Estamento:
                    </q-item-label>
                    <q-item-label class="text-h6 text-weight-light"
                      >{{ afiliacion.estamento.nombre_estamento }} - Cod:
                      {{ afiliacion.estamento.codigo_estamento }}</q-item-label
                    >
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold text-h6">
                      Estado pago:
                    </q-item-label>
                    <q-item-label class="text-h6 text-weight-light">{{
                      afiliacion.estado_pago
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold text-h6">
                      Última cuota:
                    </q-item-label>
                    <q-item-label class="text-h6 text-weight-light"
                      >{{ afiliacion.mes_ucp }} /
                      {{ afiliacion.anio_ucp }}</q-item-label
                    >
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold text-h6">
                      Nº última cuota:
                    </q-item-label>
                    <q-item-label class="text-h6 text-weight-light">{{
                      afiliacion.num_ultima_cuota
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold text-h6">
                      Tipo de cuota:
                    </q-item-label>
                    <q-item-label class="text-h6 text-weight-light">{{
                      afiliacion.tipo_cuota
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-semibold text-h6">
                      Lugar de descuento:
                    </q-item-label>
                    <q-item-label class="text-h6 text-weight-light">{{
                      afiliacion.lugar_descuento.nombre_lugar
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-card>
            </q-expansion-item>
            <q-separator inset spaced />
            <q-card-actions align="around">
              <q-btn
                style="width: 120px"
                no-caps
                rounded
                color="primary"
                @click="$router.back()"
              >
                <div class="text-body1">Volver</div></q-btn
              >
              <q-btn
                style="width: 120px"
                no-caps
                rounded
                color="red-7"
                @click="goMisDatos()"
              >
                <div class="text-body1">Mis datos</div></q-btn
              >
            </q-card-actions>
          </q-item-section>
        </q-scroll-area>
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

const afiliaciones = [
  {
    id: 25,
    entidad: {
      id: 1,
      nombre_entidad: "Colegio Médico",
      sigla: "COLMED",
    },
    estamento: {
      id: 1,
      nombre_estamento: "COLEGIO",
      descripcion_estamento: null,
      codigo_estamento: "209",
    },
    lugar_descuento: {
      id: 5,
      nombre_lugar: "CONS. REG. COYHAIQUE",
    },
    estado_pago: "MOROSO",
    tipo_cuota: "Entera39",
    condicion_afiliado: "DESAFILIADO",
    anio_ucp: 2019,
    mes_ucp: 9,
    num_ultima_cuota: 17,
    fecha_inscripcion: "2016-06-10",
    medico: 22,
  },
  {
    id: 26,
    entidad: {
      id: 5,
      nombre_entidad: "Fondo Solidaridad Gremial",
      sigla: "FSG",
    },
    estamento: {
      id: 2,
      nombre_estamento: "FSG",
      descripcion_estamento: null,
      codigo_estamento: "210",
    },
    lugar_descuento: {
      id: 1,
      nombre_lugar: "Sin lugar de descuento",
    },
    estado_pago: "MOROSO",
    tipo_cuota: "Entera+9",
    condicion_afiliado: "AFILIADO",
    anio_ucp: 2019,
    mes_ucp: 9,
    num_ultima_cuota: 9,
    fecha_inscripcion: "2016-06-10",
    medico: 22,
  },
  {
    id: 27,
    entidad: {
      id: 2,
      nombre_entidad:
        "Fundación de Asistencia Legal del Colegio Médico de Chile",
      sigla: "FALMED",
    },
    estamento: {
      id: 4,
      nombre_estamento: "FALMED",
      descripcion_estamento: null,
      codigo_estamento: "212",
    },
    lugar_descuento: {
      id: 1,
      nombre_lugar: "Sin lugar de descuento",
    },
    estado_pago: "MOROSO",
    tipo_cuota: "ENTERA",
    condicion_afiliado: "DESAFILIADO",
    anio_ucp: 2019,
    mes_ucp: 2,
    num_ultima_cuota: 33,
    fecha_inscripcion: "2016-06-15",
    medico: 22,
  },
];

const formatDate = (dateString) => {
  // Si está vacío o es "No informado", devuélvelo tal cual
  if (!dateString || dateString === "No informado") {
    return "No informado";
  }
  return dayjs(dateString).format("DD-MM-YYYY");
};

function goMisDatos() {
  router.push("/colmed/detalle-afiliacion");
}
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
