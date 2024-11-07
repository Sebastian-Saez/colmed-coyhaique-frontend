<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <div class="q-pa-md flex justify-center">
      <div class="q-mx-xl q-px-xl" style="max-width: 1600px; width: 90%">
        <ToolbarSection />
        <q-card class="q-mx-xl q-pa-md bg-white">
          <div class="text-h3 text-bold text-primary">Quienes somos</div>
          <q-splitter v-model="splitterModel" style="height: 550px">
            <template v-slot:before>
              <q-tabs v-model="tab" vertical class="text-teal">
                <q-tab name="mision" label="Misión y Visión" />
                <q-tab name="normativa" label="Normativa" />
                <q-tab name="directiva" label="Directiva" />
                <q-tab name="transparencia" label="Transparencia" />
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
                <q-tab-panel name="mision">
                  <div class="text-h4 text-primary q-mb-md">Misión</div>
                  <div
                    class="text-subtitle1 text-weight-light text-primary q-pb-md"
                  >
                    {{ mision }}
                  </div>
                  <q-separator />
                  <div class="text-h4 text-primary q-mb-md q-pt-md">Visión</div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    {{ vision }}
                  </div>
                </q-tab-panel>

                <q-tab-panel name="normativa">
                  <div class="text-h4 text-primary q-mb-md">Normativa</div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    {{ normativa }}
                  </div>
                </q-tab-panel>

                <q-tab-panel name="directiva">
                  <div class="text-h4 text-primary q-mb-md">Directiva</div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    Presidenta: Dra. Alejandra Paz Born Estrada
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    Vicepresidente: Dr. Andrés Bujes Marlez
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    Secretaria: Dra. María Lía Paccot
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    Tesorera: Dra. Daniela Soto Ojeda
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    Consejero: Dr. José Francisco Chacano Quijanes
                  </div>
                </q-tab-panel>

                <q-tab-panel name="transparencia">
                  <div class="text-h4 text-primary q-mb-md">Transparencia</div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    Remuneraciones CRS (esto es un ejemplo) Honorarios
                    percibidos por los dirigentes del Consejo Regional Santiago
                    El Consejo Regional Santiago del Colegio Médico de Chile
                    (A.G.) está compuesto por nueve Consejeros Regionales y seis
                    Consejeros Generales, todos escogidos por sus bases. Los
                    consejeros regionales tienen voz y voto en la Administración
                    del Colegio Médico Santiago. De ellos, cuatro componen la
                    Mesa Directiva. Los honorarios mensuales cancelados a la
                    Mesa Directiva son los siguientes:
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
import { useSomosStore } from "src/stores/quienesSomos";
import { computed, ref } from "vue";

defineOptions({
  name: "QuienesSomos",
});

const somosStore = useSomosStore();

const categoriaSomos = computed(() => somosStore.pagina_quienes_somos);
const tabSomos = ref(categoriaSomos.value || "mision");
const tab = ref(categoriaSomos.value || "mision");
const splitterModel = ref(20);
const normativa =
  "Aprobados por Acuerdos números 1.300, de 1981, y 15, de 1982, del Consejo General; modificados por la Asamblea Extraordinaria de Socios celebrada el día 15 de agosto de 1992, y por Acuerdos Nº 83, de 1993, y Nº 115, de 1994, del Honorable Consejo General; por la Asamblea Extraordinaria celebrada el día 12 de enero de 1996; por la Asamblea General Extraordinaria efectuada el día 8 de agosto de 1998, y Acuerdo Nº 89, adoptado en Sesión Ordinaria Nº 38, del H. Consejo General, de fecha1° de octubre de1998; por la Asamblea General Extraordinaria efectuada el día 26 de julio de 2002; por la Asamblea General Extraordinaria celebrada el día 24 de abril de 2004; por la Asamblea General Extraordinaria celebrada el día 22 de abril de 2006; por la Asamblea General Extraordinaria celebrada el día 23 de abril de 2007; por la Asamblea General Extraordinaria celebrada el día 21 de abril de 2012; por la Asamblea General Extraordinaria celebrada el día 27 de junio de 2014; por la Asamblea General Extraordinaria celebrada el día 23 de abril de 2015; por la Asamblea General Extraordinaria celebrada el día 21 de abril de 2016 y por la Asamblea General Extraordinaria celebrada el día 16 de junio de 2018";
const mision =
  "Liderar el cumplimiento de la misión del Colegio Médico de Chile, entre los médicos de Santiago, con la finalidad de procurar la excelencia en el ejercicio de la profesión médica, preocupándonos especialmente por su desarrollo profesional, laboral, personal, familiar, ético y social.";
const vision =
  "Ser reconocidos por liderar y promover la excelencia en el ejercicio del trabajo médico en Santiago, preocupándonos de la calidad de la atención en un entorno adecuado de trabajo, con la colaboración y apoyo de entidades e instituciones públicas y privadas vinculadas a la Salud, participando activamente en la elaboración de acciones de mejoramiento e innovación.";
</script>
