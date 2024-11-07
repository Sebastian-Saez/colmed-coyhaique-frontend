<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <div class="q-pa-md flex justify-center">
      <div class="q-mx-xl q-px-xl" style="max-width: 1600px; width: 90%">
        <ToolbarSection />
        <q-card class="q-mx-xl q-pa-md bg-white">
          <div class="text-h3 text-bold text-primary">Servicios</div>
          <q-splitter v-model="splitterModel" style="height: 550px">
            <template v-slot:before>
              <q-tabs v-model="tab" vertical class="text-teal">
                <q-tab name="pagos" label="Información de pagos" />
                <q-tab name="colegiarse" label="Colegiarse" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="pagos">
                  <div class="text-h4 text-primary q-mb-md">Pagos</div>
                  <div class="text-h6 text-primary q-mb-md">
                    Conoce el pago de tus cuotas
                  </div>
                  <div
                    class="text-subtitle1 text-weight-light text-primary q-pb-md"
                  >
                    Como Colegio Médico Santiago (esto es un ejemplo), queremos
                    que el cobro de la cuota que pagas sea transparente y claro.
                    Por ello a continuación entregamos un desglose según el
                    tramo en el que te encuentras. Es importante señalar que la
                    categoría “Becado” corresponde a un tipo de cuota que
                    terminará en la medida que vayan finalizando su período de
                    beca quienes alcanzaron a ingresar en este tramo. En el caso
                    de la APS, este año se estableció el valor 2019, dejando en
                    valor antiguo sólo a los que ingresaron hasta diciembre de
                    2018.
                  </div>
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
                    ingresando a https://inscripcioncolmed.colegiomedico.cl
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
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>
<script setup>
import ToolbarSection from "components/ToolbarSection.vue";
import { useRouter } from "vue-router";
import { useServicioStore } from "src/stores/servicios";
import { computed, ref } from "vue";

defineOptions({
  name: "ServiciosPage",
});

const servicioStore = useServicioStore();

const categoriaServicio = computed(() => servicioStore.pagina_servicio);
const tabServicio = ref(categoriaServicio.value);
const tab = ref(categoriaServicio.value || "mision");
const splitterModel = ref(20);
</script>
