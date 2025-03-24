<template>
  <q-page class="q-pa-md bg-cyan-1">
    <q-inner-loading :showing="loadingMedico" spinner-color="primary" spinner-size="50px" />
    <div v-if="!loadingMedico">
      <q-card flat class="bg-cyan-1">
        <q-card-section>
          <div
            class="text-h3 text-primary text-center text-weight-bolder"
            style="letter-spacing: 10px"
          >
            Detalle afiliación
          </div>
          <q-separator inset />
          <q-card
          v-if="!loadingMedico && !medico_app?.user"

          class="bg-blue-2 q-mx-sm q-mt-sm"
          style="border-radius: 20px;"
        >
          <div class="text-center q-pa-sm text-primary text-weight-light
            ">No hay información disponible.</div>
        </q-card>
        </q-card-section>
        <q-card-section
          class="text-white bg-green-14 text-center"
          style="border-radius: 20px 20px 0px 0px"
          v-if="medico_app?.user"
        >
          <div class="text-h4 text-weight-bold">
            {{ medico_app.user.first_name }} {{ medico_app.user.last_name }}
          </div>
  
          <div class="row no-wrap q-mx-xl">
            <!-- <div class="text-h6 q-mr-xs">Detalle de:</div> -->
            <div v-if="colmedAfiliacion" class="text-body1 text-weight-bold">
              Condición: {{ colmedAfiliacion.condicion_afiliado }}
            </div>
            <div v-else class="text-body1 text-weight-bold">
              Condición: no informada
            </div>
            <q-separator vertical spaced />
            <div class="text-body1 text-weight-bold">
              ICM: {{ medico_app.icm }}
            </div>
          </div>
        </q-card-section>
        <q-card-section
          class="bg-green-1"
          style="border-radius: 0px 0px 20px 20px"
        >
          <q-scroll-area style="height: 500px">
            <q-card
              v-if="medico_app && medico_app.afiliaciones.length === 0"
              class="bg-blue-2 q-mx-sm"
              style="border-radius: 20px;"
            >
              <div class="text-center q-pa-sm text-primary text-weight-light
                ">No hay información disponible.</div>
            </q-card>
            <q-item-section
              no-wrap
              class="bg-green-2"
              style="border-radius: 15px"
              v-if="medico_app && medico_app.afiliaciones.length >=1"
            >
              <q-expansion-item                
                v-for="afiliacion in medico_app.afiliaciones"
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
    </div>
   
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useInformacionesStore } from "src/stores/informaciones";
import { useMedicoStore } from "src/stores/medicos";
import { useUserStore } from "src/stores/authStore";

import dayjs from "dayjs";
const informacionStore = useInformacionesStore();
// Lógica, composables, etc.
const router = useRouter();
const medicoStore = useMedicoStore();
const medico_app = computed(() => medicoStore.medico_app || null);
const loadingMedico = computed(() => medicoStore.loading_medico_app || null);
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

const userAuthStore = useUserStore();

const colmedAfiliacion = computed(() => {
  return (
    medico_app.value.afiliaciones.find(
      (afiliacion) => afiliacion.entidad.sigla === "COLMED"
    ) || null
  );
});

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

onMounted(async () => {
  let usuarioVisitante = userAuthStore.profiles.filter(
      (usuario) => usuario.tipo_perfil == "visitante"
    );

  if (usuarioVisitante[0].tipo_perfil === "visitante") {
      await medicoStore.fetchMedicoApp(userAuthStore.user.id);      
  } 
});

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
