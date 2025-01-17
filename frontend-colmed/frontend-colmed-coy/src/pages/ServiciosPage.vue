<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <div class="q-pa-md">
      <div
        class="q-mt-xs justify-center"
        :class="isLargeScreen ? 'q-mx-xl q-px-xl' : ''"
      >
        <ToolbarSection :isLargeScreen="isLargeScreen" />
        <q-card
          class="q-pa-md bg-grey-1"
          :class="isLargeScreen ? 'q-ml-lg q-mr-xl' : 'q-mx-lg'"
          style="border-radius: 20px"
        >
          <div class="text-h4 text-bold text-primary">Servicios</div>
          <q-separator spaced />
          <q-splitter
            v-model="splitterModel"
            style="height: 400px"
            :limits="computedLimits"
          >
            <template v-slot:before>
              <q-tabs
                v-model="tab"
                vertical
                active-color="grey-2"
                indicator-color="secondary"
                active-bg-color="red-14"
              >
                <q-tab
                  no-caps
                  class="text-white bg-red-2 q-mb-xs q-mr-md tab-button"
                  name="pagos"
                  label="Información de pagos"
                />
                <q-tab
                  no-caps
                  class="text-white bg-red-2 q-mb-xs q-mr-md tab-button"
                  name="colegiarse"
                  label="Colegiarse"
                />
                <q-tab
                  no-caps
                  class="text-white bg-red-2 q-mb-xs q-mr-md tab-button"
                  name="casa_medico"
                  label="Casa del médico"
                />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="slide-up"
                transition-next="slide-up"
                class="bg-grey-1"
              >
                <q-tab-panel name="pagos">
                  <div class="text-h4 text-primary q-mb-md">
                    Cuota del Colegio Médico de Chile
                  </div>
                  <div class="text-h6 text-primary q-mb-md">
                    Conoce el pago de tus cuotas
                  </div>
                  <div
                    class="text-subtitle1 text-weight-light text-primary q-pb-md"
                  >
                    La cuota social del Colegio Médico de Chile se distribuye
                    para el Consejo Nacional y los Consejos Regionales. El
                    dinero recaudado se ocupa para la ejecución de toda la
                    actividad gremial que desarrolla la Mesa Directiva Nacional,
                    los nueve departamentos, las tres agrupaciones, los médicos
                    mayores, las viudas de médicos y las cuatro comisiones.
                    Además, del trabajo de los 20 Regionales, distribuidos a lo
                    largo del país.
                  </div>
                  <div
                    class="text-subtitle1 text-weight-light text-primary q-pb-md"
                  >
                    A continuación entregamos un desglose según el tramo en el
                    que te encuentras.
                  </div>
                  <q-card flat class="q-mb-xl">
                    <div class="text-h5 text-primary">Tipos de cuotas</div>
                    <q-list bordered>
                      <q-item
                        v-for="(item, index) in lista_cuotas"
                        :key="index"
                      >
                        <q-card flat>
                          <div class="text-h6 text-overline text-primary">
                            {{ item.tipo_cuota }}
                          </div>
                          <div
                            class="text-subtitle1 text-weight-light text-primary"
                          >
                            {{ item.descripcion }}
                          </div>
                        </q-card>
                      </q-item>
                      <q-item-section class="q-pl-md">
                        <div class="text-h6 text-caption text-primary">
                          (*) Para nuevos colegiados. Aprobadas en Asamblea
                          General de Puerto Chacabuco, junio 2018.
                        </div>
                      </q-item-section>
                    </q-list>
                  </q-card>
                  <q-card flat class="q-mt-xl q-mb-xl">
                    <div class="text-h5 text-primary">Valores de cuotas</div>
                    <q-separator />
                    <q-table
                      :rows="rows"
                      :columns="columns"
                      row-key="name"
                      hide-bottom
                      separator="cell"
                      class="custom-table q-mt-md"
                    />
                  </q-card>
                  <q-separator spaced />
                  <q-card flat class="q-mt-xl">
                    <div class="text-h5 text-primary">
                      Detalle cuota Fondo Solidaridad Gremial
                    </div>
                    <q-separator />
                    <q-table
                      :rows="rows_fsg"
                      :columns="columns_fsg"
                      row-key="name"
                      hide-bottom
                      separator="cell"
                      class="custom-table q-mt-md"
                    />
                  </q-card>
                  <q-separator spaced />
                  <q-card flat class="q-mt-xl">
                    <div class="text-h5 text-primary">
                      Detalles para reafiliación
                    </div>
                    <q-separator />
                    <div class="text-subtitle1 text-weight-light text-primary">
                      Quien hubiera sido desafiliado por renuncia podrá
                      reincorporarse por una sola vez y ésta deberá aprobarse en
                      el Consejo Regional correspondiente y en la Mesa Directiva
                      Nacional por la mayoría de los miembros en ejercicio.
                      Quien hubiera perdido su calidad de afiliado por no
                      cancelar las cuotas sociales durante doce meses
                      consecutivos, sólo podrá reafiliarse por dos veces. Si
                      quisiera reincorporarse por tercera vez a la Orden, deberá
                      ser autorizado por la Mesa Directiva Nacional, por la
                      mayoría absoluta de sus miembros en ejercicio.
                    </div>
                    <q-table
                      :rows="rows_reafiliacion"
                      :columns="columns_reafiliacion"
                      row-key="name"
                      hide-bottom
                      separator="cell"
                      class="custom-table q-mt-md"
                    />
                  </q-card>
                </q-tab-panel>

                <q-tab-panel name="colegiarse">
                  <div class="text-h4 text-primary q-mb-md">
                    Cómo Colegiarse
                  </div>
                  <div class="text-h6 text-primary q-mb-md">
                    ¿Quiénes pueden colegiarse?
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    Quienes cuenten con su correspondiente título de médico o
                    médica cirujano y estén inscritos en el registro de
                    prestadores individuales de la Superintendencia de Salud; y
                    no cuenten con sanciones éticas.
                  </div>
                  <div
                    class="text-subtitle1 text-weight-light text-primary q-pb-md"
                  >
                    Pueden colegiarse médicos titulados en Chile o en el
                    extranjero. Estos últimos, deben contar también con el
                    reconocimiento o validación de su título en Chile de acuerdo
                    a la vía que corresponda.
                  </div>
                  <q-separator />
                  <div class="text-h6 text-primary q-mb-md q-pt-md">
                    ¿Cómo colegiarse?
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    El trámite de colegiatura se realiza de manera online,
                    ingresando a
                    <q-btn
                      label="Inscripción Colegio Médico"
                      no-caps
                      href="https://inscripcioncolmed.colegiomedico.cl"
                      target="_blank"
                      outline
                      rounded
                      icon-right="arrow_forward"
                    />
                  </div>
                  <div
                    class="text-h6 text-overline text-primary q-mb-md q-pt-md"
                  >
                    INFORMACIÓN PREVIA A INGRESO A FORMULARIO DE INSCRIPCIÓN A
                    COLMED
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    Antes de comenzar su registro en línea en el Colegio Médico,
                    le invitamos a conocer los documentos que serán solicitados
                    durante el proceso, de manera que pueda tenerlos todos
                    previamente y así completar de manera más fácil, rápida y
                    eficiente la solicitud. Estos deberán ser subidos en formato
                    JPG , PNG o PDF y no deben exceder los 5MB de peso.
                  </div>
                  <div
                    class="text-h6 text-overline text-primary q-mb-md q-pt-md"
                  >
                    MÉDICOS TITULADOS EN CHILE DEBERÁN ADJUNTAR:
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    1. Certificado de título de médico cirujano o Certificado de
                    inscripción en el Registro Nacional de Prestadores
                    Individuales de la Superintendencia de Salud.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    2. Cédula de identidad por ambos lados.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    3. Foto Personal tipo foto perfil.
                  </div>
                  <div
                    class="text-h6 text-overline text-primary q-mb-md q-pt-md"
                  >
                    MÉDICOS TITULADOS EN EL EXTRANJERO DEBERÁN ADJUNTAR:
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    1. Título de Médico o Médico Cirujano del país de origen
                    correspondiente a la Universidad o al Estado que lo otorgó.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    2. Reconocimiento o validación del título en Chile:
                  </div>
                  <div
                    class="text-subtitle2 text-weight-light text-primary q-ml-md"
                  >
                    - Certificado de Revalidación de la Universidad de Chile,
                    Eunacom o Conacem.- Certificado de reconocimiento del
                    Ministerio de Relaciones Exteriores de Chile, para quienes
                    provengan de Brasil, Colombia, Uruguay.
                  </div>
                  <div
                    class="text-subtitle2 text-weight-light text-primary q-ml-md"
                  >
                    - Certificado de reconocimiento del Ministerio de Educación
                    de Chile, si proviene de Argentina, Ecuador o España.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    3. Certificado de inscripción en el Registro Nacional de
                    Prestadores Individuales de la Superintendencia de Salud.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    4. Cédula de identidad vigente por ambos lados, con
                    residencia definitiva o temporaria. Si la cédula de
                    identidad estuviese vencida, deben además adjuntar Solicitud
                    de Permanencia Definitiva.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    5. Foto Personal tipo foto perfil.
                  </div>

                  <div
                    class="text-h6 text-overline text-primary q-mb-md q-pt-md"
                  >
                    IMPORTANTE
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    La inscripción en el Colegio Médico de Chile y en sus
                    instituciones asociadas (FALMED y Club Médico de Santiago)
                    se produce al ser aprobada por la Mesa Directiva Nacional y
                    otorgado el número de colegiado, le llegará un correo
                    informativo al final confirmando su inscripción.
                  </div>
                  <div
                    class="text-subtitle1 text-weight-light text-primary q-pb-md"
                  >
                    Para cualquier duda respecto a la documentación, le
                    recomendamos contactarnos a inscripciones@colegiomedico.cl
                  </div>
                  <!------------------------------------------------->
                  <q-separator />
                  <div class="text-h6 text-primary q-mb-md q-pt-md">
                    ¿Qué hace el Colegio Médico?
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - Es la organización médica del país, que agrupa a más de 28
                    mil profesionales, con presencia en todo Chile.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - Vela por el buen ejercicio profesional, con apego a los
                    más altos estándares éticos.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - Se preocupa de los derechos y las condiciones laborales de
                    los médicos y médicas, en un entorno que cada vez es más
                    complejo y exigente.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - Es la voz de los médicos y médicas en los debates de las
                    políticas sanitarias del país y de temas relevantes para la
                    sociedad.
                  </div>
                  <div
                    class="text-subtitle1 text-weight-light text-primary q-pb-md"
                  >
                    - Constituye una red de apoyo para los colegas a lo largo
                    del país, con servicios y beneficios especializados a través
                    de nuestro Fondo de Solidaridad Gremial, Fundación de
                    Asistencia Legal y distintos clubes de campo a lo largo del
                    país, para el merecido relajo y vida sana.
                  </div>
                  <q-separator />
                  <div class="text-h6 text-primary q-mb-md q-pt-md">
                    ¿Por qué colegiarse?
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - Para contar con la protección y defensa de nuestros
                    derechos como trabajadores, tanto en el ámbito público como
                    privado.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - Para ser parte de la toma de decisiones que nos afectan
                    como profesionales y contribuyen a mejorar la salud pública
                    de Chile.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - Para fortalecer la diversidad de este Colegio Profesional
                    que reúne distintas miradas.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - Para participar en nuestras distintas instancias de
                    trabajo que abordan relevantes temas para la salud del país
                    y la sociedad: trabajo médico, formación, ética, derechos
                    humanos, políticas públicas, género, salud mental,
                    migración, entre otros.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - Para relevar el contrato social y los roles tan relevantes
                    que nos ha otorgado la sociedad.
                  </div>
                  <div
                    class="text-subtitle1 text-weight-light text-primary q-pb-md"
                  >
                    - Para ser parte de una red de apoyo y beneficios para los
                    médicos y sus familias, a través de nuestro Fondo de
                    Solidaridad Gremial; y de asesoría en temas legales, a
                    través de nuestra Fundación de Asistencia Legal (FALMED).
                  </div>

                  <q-separator />
                  <div class="text-h6 text-primary q-pt-md">
                    Deberes y derechos asociados
                  </div>
                  <div class="text-h6 text-overline text-primary">Deberes</div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - Respetar los reglamentos internos del Colegio Médico de
                    Chile (A.G.), con especial énfasis en lo referido a los
                    Estatutos Sociales y el Código de Ética, así́ como de los
                    Acuerdos que adopten los Órganos Directivos, tales como los
                    Consejos Regionales, el Consejo Nacional y la Mesa Directiva
                    Nacional.
                  </div>
                  <div class="text-h6 text-overline text-primary">Derechos</div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - A participar en la definición de los lineamientos
                    fundamentales de la Institución.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - A requerir y obtener el apoyo gremial del Colegio Médico
                    de Chile (A.G.) en situaciones propias de la actividad
                    profesional.
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    - A recibir los beneficios que el Colegio Médico de Chile
                    (A.G.) contempla para sus asociados y familias, tales como
                    los previstos por el Fondo de Solidaridad Gremial, previo
                    cumplimiento de los requisitos específicos fijados para
                    ello.
                  </div>
                </q-tab-panel>
                <q-tab-panel name="casa_medico">
                  <div class="text-h4 text-primary q-mb-md">
                    Nuestra Casa del Médico
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    Nuestra sede regional cuenta con habitaciones para
                    colegiados, ubicada en Manuel Montt #69, media cuadra de la
                    Plaza de Armas, Coyhaique.
                  </div>
                  <q-separator spaced />
                  <q-card flat>
                    <q-card-section>
                      <div class="text-h6 text-primary">Habitación 1</div>
                      <div
                        class="text-subtitle1 text-weight-light text-primary q-mb-xs"
                      >
                        Dos camas de plaza y media. Valor de $25.000 por
                        persona.
                      </div>
                      <div class="text-h6 text-primary">Habitación 2</div>
                      <div
                        class="text-subtitle1 text-weight-light text-primary q-mb-xs"
                      >
                        Cama matrimonial. Valor de $35.000.
                      </div>
                      <div class="text-h6 text-primary">Habitación 3</div>
                      <div
                        class="text-subtitle1 text-weight-light text-primary"
                      >
                        Cama de plaza y media. Valor de $25.000.
                      </div>
                    </q-card-section>

                    <q-separator />
                    <q-card-section>
                      <div class="text-h6 text-caption text-primary">
                        - Cocina, living-comedor compartido
                      </div>
                      <div class="text-h6 text-caption text-primary">
                        - Baño compartido
                      </div>
                      <div class="text-h6 text-caption text-primary">
                        - No incluye desayuno
                      </div>
                    </q-card-section>
                  </q-card>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card>
      </div>
    </div>
    <FooterSection :isLargeScreen="isLargeScreen" />
  </q-layout>
</template>
<script setup>
import ToolbarSection from "components/ToolbarSection.vue";
import FooterSection from "src/components/FooterSection.vue";
import { useQuasar } from "quasar";
import { useServicioStore } from "src/stores/servicios";
import { computed, ref } from "vue";

defineOptions({
  name: "ServiciosPage",
});

const $q = useQuasar();
const isLargeScreen = computed(() => {
  return $q.screen.gt.md;
});
const servicioStore = useServicioStore();

const categoriaServicio = computed(() => servicioStore.pagina_servicio);
// const tab = computed(() => categoriaServicio.value || "pagos");
const tab = computed({
  get() {
    return servicioStore.pagina_servicio || "pagos";
  },
  set(value) {
    servicioStore.pagina_servicio = value;
  },
});
const computedLimits = computed(() => {
  return isLargeScreen.value ? [15, 30] : [31, 31];
});
const splitterModel = ref(isLargeScreen.value ? 15 : 31);
// const splitterModel = ref(20);
const lista_cuotas = [
  {
    tipo_cuota: "CUOTA ENTERA",
    descripcion:
      "Médicos de más de 9 años, paga el 100% de los componentes de la cuota ordinaria, especial y regional.",
  },
  {
    tipo_cuota: "CUOTA JOVEN",
    descripcion:
      "Médicos de entre 0 y 8, 11 meses y 29 días, paga el 50% de los componentes de la cuota ordinaria, especial y regional.",
  },
  {
    tipo_cuota: "CUOTA APS",
    descripcion:
      "Médicos que cumplidos los 9 años, trabajen un mínimo de 33 horas en APS o equivalente, sin consideración al tipo de contrato, paga el 75% de los componentes de la cuota ordinaria, especial y regional.",
  },
];

const columns = [
  {
    name: "name",
    required: true,
    label: "Tipo de Cuota",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "cuota",
    align: "center",
    label: "Cuota",
    field: "cuota",
    sortable: true,
  },
  { name: "fsg", label: "FSG", field: "fsg", sortable: true, align: "center" },
  {
    name: "cuota_fsg",
    label: "Cuota + FSG",
    field: "cuota_fsg",
    align: "center",
  },
  { name: "falmed", label: "Falmed", field: "falmed", align: "center" },
];

const rows = [
  {
    name: "Cuota entera (+ 9 años)",
    cuota: "$52.104",
    fsg: "$24.148",
    cuota_fsg: "$76.252",
    falmed: "$30.320",
  },
  {
    name: "Cuota entera (3 - 9 años)",
    cuota: "$48.418",
    fsg: "$19.711",
    cuota_fsg: "$68.129",
    falmed: "$30.320",
  },
  {
    name: "Cuota Media Joven",
    cuota: "$26.052",
    fsg: "$12.074",
    cuota_fsg: "$38.126",
    falmed: "$15.160",
  },
  {
    name: "Cuota APS",
    cuota: "$39.078",
    fsg: "$18.111",
    cuota_fsg: "$57.189",
    falmed: "$15.160",
  },
];

const columns_fsg = [
  {
    name: "name",
    required: true,
    label: "Tipo de Cuota",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "cuota",
    align: "center",
    label: "Cuota",
    field: "cuota",
    sortable: true,
  },
];

const rows_fsg = [
  {
    name: "Cuota Entera (+ 9 años)",
    cuota: "$24.148",
  },
  {
    name: "Cuota Entera (3 - 9 años)",
    cuota: "$19.711",
  },
  {
    name: "Cuota Media Joven",
    cuota: "$12.074",
  },
  {
    name: "Media por edad",
    cuota: "$12.074",
  },
  {
    name: "APS",
    cuota: "$15.160",
  },
];

const columns_reafiliacion = [
  {
    name: "name",
    required: true,
    label: "Años desafiliados",
    align: "left",
    field: (row) => row.name,
  },
  {
    name: "cuota",
    align: "center",
    label: "Valor reafiliación",
    field: "cuota",
  },
];

const rows_reafiliacion = [
  {
    name: "1",
    cuota: "$74.352",
  },
  {
    name: "2",
    cuota: "$89.222",
  },
  {
    name: "3",
    cuota: "$104.092",
  },
  {
    name: "4",
    cuota: "$118.963",
  },
  {
    name: "5",
    cuota: "$133.833",
  },
  {
    name: "6 o más",
    cuota: "$148.703",
  },
];
</script>

<style lang="sass">
.custom-table
  .q-table__top
    background-color: #204664
    color: white

  thead tr:first-child th
    background-color: #204664
    color: white
    font-size: 16px

.tab-button
  border-radius: 50px 0px 0px 50px
</style>
<!-- font-display:bold -->
