<template>
  <q-layout view="lHh Lpr lFf" class="bg-page">
    <div class="q-pa-md">
      <div
        class="q-mt-xs justify-center"
        :class="isLargeScreen ? 'q-mx-xl q-px-xl' : ''"
      >
        <!-- <ToolbarSection :isLargeScreen="isLargeScreen" /> -->
        <ToolbarSection :screenSize="screenSize" />
        <q-card
          class="q-pa-md bg-grey-1"
          :class="isLargeScreen ? 'q-ml-lg q-mr-xl' : 'q-mx-lg'"
          style="border-radius: 20px"
        >
          <div class="text-h4 text-weight-bold text-primary">Quienes somos</div>
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
                active-color="white"
                indicator-color="red-11"
                active-class="bg-blue-13"
              >
                <q-tab
                  name="mision"
                  label="Misión y Visión"
                  no-caps
                  :class="
                    tab === 'mision' ? 'text-white' : 'bg-blue-1 text-primary'
                  "
                  class="q-mb-xs q-mr-md tab-button"
                />
                <q-tab
                  name="normativa"
                  label="Normativa"
                  no-caps
                  :class="
                    tab === 'normativa'
                      ? 'text-white'
                      : 'bg-blue-1 text-primary'
                  "
                  class="q-mb-xs q-mr-md tab-button"
                />
                <q-tab
                  name="directiva"
                  label="Directiva"
                  no-caps
                  :class="
                    tab === 'directiva'
                      ? 'text-white'
                      : 'bg-blue-1 text-primary'
                  "
                  class="q-mb-xs q-mr-md tab-button"
                />
                <!-- <q-tab name="transparencia" label="Transparencia" /> -->
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
                <q-tab-panel name="mision">
                  <div class="text-h4 text-primary text-weight-medium q-mb-md">
                    Misión
                  </div>
                  <div
                    class="text-subtitle1 text-weight-light text-primary q-pb-md"
                  >
                    {{ mision }}
                  </div>
                  <q-separator />
                  <div
                    class="text-h4 text-primary text-weight-medium q-mb-md q-pt-md"
                  >
                    Visión
                  </div>
                  <div class="text-subtitle1 text-weight-light text-primary">
                    {{ vision }}
                  </div>
                </q-tab-panel>

                <q-tab-panel name="normativa">
                  <div class="text-h4 text-primary text-weight-medium q-mb-md">
                    Normativa
                  </div>
                  <q-separator spaced />

                  <q-list>
                    <q-expansion-item
                      v-for="(item, index) in lista_normativas"
                      :key="index"
                      :label="item.titulo"
                      :default-opened="index === 0"
                      header-class="bg-blue-9 text-white"
                      expand-icon-class="text-white"
                    >
                      <q-card>
                        <q-card-section>
                          <div
                            class="text-body2 text-weight-light text-primary text-justify"
                          >
                            {{ item.contenido }}
                          </div>
                        </q-card-section>
                        <q-card-actions>
                          <q-btn
                            :label="item.titulo"
                            :href="item.link"
                            target="_blank"
                            icon-right="arrow_forward"
                            text-color="red"
                            no-caps
                            outline
                            rounded
                          />
                        </q-card-actions>
                      </q-card>
                      <q-separator spaced inset />
                    </q-expansion-item>
                  </q-list>
                </q-tab-panel>

                <q-tab-panel name="directiva">
                  <q-card flat class="bg-grey-1">
                    <q-item-section>
                      <q-item-label
                        ><div class="text-h4 text-primary text-weight-medium">
                          Directiva
                        </div></q-item-label
                      >
                    </q-item-section>
                    <q-separator spaced />
                    <q-card-section>
                      <q-list padding>
                        <q-item
                          v-for="(actor, index) in directiva"
                          :key="index"
                        >
                          <q-item-section avatar v-if="isLargeScreen">
                            <div
                              class="text-subtitle1 text-weight-regular text-primary"
                            >
                              {{ actor.cargo }}:
                            </div>
                          </q-item-section>
                          <q-item-section v-if="isLargeScreen"
                            ><div
                              class="text-subtitle1 text-weight-light text-primary"
                            >
                              {{ actor.persona }}
                            </div></q-item-section
                          >
                          <q-item-section v-else>
                            <q-item-label
                              class="text-subtitle1 text-weight-regular text-primary"
                              >{{ actor.cargo }}:</q-item-label
                            >
                            <q-item-label
                              class="text-subtitle1 text-weight-light text-primary"
                            >
                              {{ actor.persona }}
                            </q-item-label>
                            <q-separator />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card-section>
                  </q-card>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-card>
      </div>
    </div>
    <!-- <FooterSection :isLargeScreen="isLargeScreen" /> -->
    <FooterSection :screenSize="screenSize" />
  </q-layout>
</template>
<script setup>
import ToolbarSection from "components/ToolbarSection.vue";
import FooterSection from "src/components/FooterSection.vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useSomosStore } from "src/stores/quienesSomos";
import { computed, ref } from "vue";

defineOptions({
  name: "QuienesSomos",
});

const somosStore = useSomosStore();
// Responsive tracking
const $q = useQuasar();
const isLargeScreen = computed(() => {
  return $q.screen.gt.md;
});
const screenSize = computed(() => {
  if ($q.screen.lt.sm) return "xs"; // Teléfonos pequeños
  if ($q.screen.sm && !$q.screen.md) return "sm"; // Teléfonos grandes
  if ($q.screen.md && !$q.screen.lg) return "md"; // Tablets o pantallas de 13"
  if ($q.screen.lg && !$q.screen.xl) return "lg"; // Pantallas grandes
  return "xl"; // Pantallas extra grandes
});

const computedLimits = computed(() => {
  return isLargeScreen.value ? [15, 30] : [28, 28];
});
const splitterModel = ref(isLargeScreen.value ? 15 : 28);
const categoriaSomos = computed(() => somosStore.pagina_quienes_somos);

// const tab = ref(categoriaSomos.value || "mision");
// const tab = computed(() => categoriaSomos.value || "mision");
const tab = computed({
  get() {
    return somosStore.pagina_quienes_somos || "mision";
  },
  set(value) {
    somosStore.pagina_quienes_somos = value;
  },
});

// const splitterModel = ref(28);
const directiva = ref([
  {
    cargo: "Presidenta",
    persona: "Dra. Alejandra Paz Born Estrada",
  },
  {
    cargo: "Vicepresidente",
    persona: "Dr. Andrés Bujes Marlez",
  },
  {
    cargo: "Secretaria",
    persona: "Dra. María Lía Paccot",
  },
  {
    cargo: "Tesorera",
    persona: "Dra. Daniela Soto Ojeda",
  },
  {
    cargo: "Consejero",
    persona: "Dr. José Francisco Chacano Quijanes",
  },
]);

const normativa =
  "Aprobados por Acuerdos números 1.300, de 1981, y 15, de 1982, del Consejo General; modificados por la Asamblea Extraordinaria de Socios celebrada el día 15 de agosto de 1992, y por Acuerdos Nº 83, de 1993, y Nº 115, de 1994, del Honorable Consejo General; por la Asamblea Extraordinaria celebrada el día 12 de enero de 1996; por la Asamblea General Extraordinaria efectuada el día 8 de agosto de 1998, y Acuerdo Nº 89, adoptado en Sesión Ordinaria Nº 38, del H. Consejo General, de fecha1° de octubre de1998; por la Asamblea General Extraordinaria efectuada el día 26 de julio de 2002; por la Asamblea General Extraordinaria celebrada el día 24 de abril de 2004; por la Asamblea General Extraordinaria celebrada el día 22 de abril de 2006; por la Asamblea General Extraordinaria celebrada el día 23 de abril de 2007; por la Asamblea General Extraordinaria celebrada el día 21 de abril de 2012; por la Asamblea General Extraordinaria celebrada el día 27 de junio de 2014; por la Asamblea General Extraordinaria celebrada el día 23 de abril de 2015; por la Asamblea General Extraordinaria celebrada el día 21 de abril de 2016 y por la Asamblea General Extraordinaria celebrada el día 16 de junio de 2018";
const mision =
  "Liderar el cumplimiento de la misión del Colegio Médico de Chile, entre los médicos de Santiago, con la finalidad de procurar la excelencia en el ejercicio de la profesión médica, preocupándonos especialmente por su desarrollo profesional, laboral, personal, familiar, ético y social.";
const vision =
  "Ser reconocidos por liderar y promover la excelencia en el ejercicio del trabajo médico en Santiago, preocupándonos de la calidad de la atención en un entorno adecuado de trabajo, con la colaboración y apoyo de entidades e instituciones públicas y privadas vinculadas a la Salud, participando activamente en la elaboración de acciones de mejoramiento e innovación.";

const lista_normativas = [
  {
    titulo: "Estatutos del Colegio Médico de Chile (A.G.)",
    contenido:
      "Aprobados por Acuerdos números 1.300, de 1981, y 15, de 1982, del Consejo General; modificados por la Asamblea Extraordinaria de Socios celebrada el día 15 de agosto de 1992, y por Acuerdos N° 83, de 1993, y N° 115, de 1994, del Honorable Consejo General; por la Asamblea Extraordinaria celebrada el día 12 de enero de 1996; por la Asamblea General Extraordinaria efectuada el día 8 de agosto de 1998, y Acuerdo N° 89, adoptado en Sesión Ordinaria N° 38, del H. Consejo General, de fecha 1° de octubre de 1998; por la Asamblea General Extraordinaria efectuada el día 26 de julio de 2002; por la Asamblea General Extraordinaria celebrada el día 24 de abril de 2004; por la Asamblea General Extraordinaria celebrada el día 22 de abril de 2006; por la Asamblea General Extraordinaria celebrada el día 23 de abril de 2007; por la Asamblea General Extraordinaria celebrada el día 21 de abril de 2012; por la Asamblea General Extraordinaria celebrada el día 27 de junio de 2014; por la Asamblea General Extraordinaria celebrada el día 23 de abril de 2015; por la Asamblea General Extraordinaria celebrada el día 21 de abril de 2016; por la Asamblea General Extraordinaria celebrada el día 16 de junio de 2018; por la Asamblea General Extraordinaria celebrada el día 6 de abril de 2019; por la Asamblea General Extraordinaria celebrada el día 4 de septiembre de 2021; por la Asamblea General Extraordinaria celebrada el día 25 de febrero de 2022; por la Asamblea General Extraordinaria celebrada el día 1° de octubre de 2022, y por la Asamblea General Extraordinaria celebrada el día 22 de abril de 2023.",
    link: "https://www.colegiomedico.cl/wp-content/uploads/2024/02/Estatutos_Colmed_2023.pdf",
  },
  {
    titulo: "Reglamento de capítulos médicos",
    contenido:
      "El Reglamento de Capítulos Médicos regula la creación, organización y funcionamiento de los Capítulos Médicos, que son las organizaciones de base de los médicos/as afiliados a un Consejo Regional del Colegio Médico de Chile (A.G.). Estos Capítulos se conforman en los establecimientos de trabajo o por intereses gremiales comunes, bajo la dependencia y directrices de los Consejos Regionales. El reglamento ha sido modificado por el H. Consejo Nacional en la Sesión N° 27 del 13 de marzo de 2020 (Acuerdos N° 238 al N° 259).",
    link: "https://www.colegiomedico.cl/wp-content/uploads/2020/04/Reglamento_Capitulos_Medicos_2020.pdf",
  },
  {
    titulo: "Reglamento de elecciones del Colegio Médico de Chile (A.G.)",
    contenido:
      "Aprobado y modificado por Acuerdos números 373 y 380, de fecha 1° de diciembre de 1992 y 22 de diciembre de 1992, respectivamente; Acuerdo Nº 327, adoptado en Sesión de 12 de marzo de 1996, del H. Consejo General; Acuerdo Nº 249, adoptado en Sesión Ordinaria Nº 45 de H. Consejo General, del 17 de junio 1999; Acuerdo Nº 134, adoptado en Sesión Ordinaria Nº 38 de H. Consejo General, de 27 de agosto de 2004; Acuerdo Nº 163, adoptado en Sesión Ordinaria Nº 21 de H. Consejo General, de 27 de julio de 2007; Acuerdo N° 211, adoptado en Sesión Ordinaria N° 27 de H. Consejo General, de 18 de marzo de 2011; Acuerdo N° 207, adoptado en Sesión Ordinaria N° 27 de H. Consejo General, de 21 de marzo de 2014; Acuerdo N° 311, adoptado en Sesión Ordinaria N° 21 de H. Consejo General, de 26 de agosto de 2016; Acuerdo N° 319, adoptado en Sesión Ordinaria N° 22 de H. Consejo General, de 30 de septiembre de 2016; Acuerdo N° 334, adoptado en Sesión Ordinaria N° 23 de H. Consejo General, de 21 de octubre de 2016; Acuerdos N°175 y 176, adoptados en Sesión Ordinaria N° 21 y 22 de H. Consejo Nacional, de 9 de agosto y 6 de septiembre de 2019, y Acuerdo N° 258, adoptado en Sesión Extraordinaria de H. Consejo Nacional de 30 de agosto de 2023.",
    link: "https://www.colegiomedico.cl/wp-content/uploads/2023/09/Reglamento-Elecciones2023.pdf",
  },
  {
    titulo: "Reglamento de Afiliación y cuotas sociales",
    contenido:
      "Aprobado en Sesión Nº 15 de H. Consejo General, de 25 de septiembre de 1984, por acuerdo Nº 49, y modificado en Sesión Nº 48 de H. Consejo General, de 25 de julio de 1989, por acuerdo Nº 191; en Sesión Nº 14, de 16 de noviembre de 1993, por Acuerdo Nº 100; en Sesión Nº 11, de 27 de julio de 2006, por acuerdo Nº 100; en Sesión Nº 17, de 26 de enero de 2007, por acuerdo Nº 143; en Sesión Nº 22, de 17 de agosto de 2007, por Acuerdo Nº 172; en Sesión Nº 27, de 23 de noviembre de 2007, por Acuerdo Nº 204; en Sesión N° 4 de 18 de noviembre de 2011, por Acuerdo N° 39, y en Sesión N° 9 de 29 de junio de 2012, por Acuerdo N° 69.",
    link: "https://www.colegiomedico.cl/wp-content/uploads/2024/04/Reg_Afiliacion_29.06.12.pdf",
  },
  {
    titulo: "Reglamento de sala de los Consejos Regionales",
    contenido:
      "Aprobado por Acuerdo N° 34 de Sesión Ordinaria N° 4 de H. Consejo General, celebrada el viernes 24 de octubre de 2014.",
    link: "https://www.colegiomedico.cl/wp-content/uploads/2024/01/Reglamento_Sala_Consejos_Regionales_2014-1-1.doc",
  },
  {
    titulo: "Reglamento de sala del H. Consejo General",
    contenido:
      "Aprobado en la Sesión Nº 94, de 02.05.73 por Acuerdo Nº 47; modificado en la 45° Sesión Ordinaria de Consejo General por Acuerdo Nº 249, de 1999; en la 41º Sesión Ordinaria de Consejo General, de 25 de noviembre de 2004, por Acuerdo Nº 161; en Sesión Ordinaria de Consejo General Nº 2, de 26 de septiembre de 2008, por Acuerdo Nº 28; en Sesión Ordinaria de Consejo General N° 3, de 29 de septiembre de 2017, por Acuerdo N° 39, y en Sesión Ordinaria de Consejo Nacional N° 2, de 12 de marzo de 2021.",
    link: "https://www.colegiomedico.cl/wp-content/uploads/2021/04/Reglamento_Sala_HCN_2021_Vigente.doc",
  },
  {
    titulo: "Estatutos de la agrupación de Médicos Generales de zona",
    contenido:
      "Aprobado en Sesión N° 21 de H. Consejo General, de fecha 30 de agosto de 2013, mediante Acuerdo N° 160; modificado en sesión N° 027, acuerdos N° 261 Y N° 266 a 274, de 13 de marzo de 2020. ",
    link: "https://www.colegiomedico.cl/wp-content/uploads/2022/02/Estatutos-Agrupacion-MGZ-H.C.G.-13.03.2020.pdf",
  },
  {
    titulo: "Reglamento Condecoración",
    contenido:
      "El Colegio Médico de Chile crea la “CONDECORACION DE HONOR  DE LA ORDEN MEDICA CHILENA”, para ser otorgada a un médico chileno que se haya distinguido de una manera especial a través de su vida profesional.",
    link: "https://www.colegiomedico.cl/wp-content/uploads/2024/01/Reglamen.Condecoracion-H.2007.doc",
  },
  {
    titulo: "Estatutos Presupuestos",
    contenido:
      "NORMAS SOBRE ELABORACIÓN DE PRESUPUESTO COLEGIO MÉDICO DE CHILE: .- De acuerdo con lo dispuesto en el numeral 7° del artículo 9° de los Estatutos del Colegio Médico de Chile, es atribución del H. Consejo General  elaborar anualmente el Presupuesto de Entradas y Gastos del Consejo General, de los Departamentos y de los Consejos Regionales, y el Balance del Colegio Médico, para la aprobación de la Asamblea General de socios. Por su parte, el numeral 5° del artículo 34 de los mencionados Estatutos, señala que es materia de Asamblea General Ordinaria aprobar el Presupuesto de Entradas y Gastos que le someta a su consideración el Consejo General relativos al período en que se celebra la Asamblea y dictar las instrucciones generales para la elaboración del Presupuesto del año siguiente.",
    link: "https://www.colegiomedico.cl/wp-content/uploads/2024/01/Reglamento_Presupuestos.doc",
  },
  {
    titulo: "Estatutos APS",
    contenido:
      "ESTATUTOS DE LA AGRUPACIÓN NACIONAL DE MÉDICOS DE ATENCIÓN PRIMARIA DEL COLEGIO MÉDICO DE CHILE (A.G.). Aprobado por Acuerdo N° 35 de Sesión Ordinaria N° 4 de H. Consejo General, celebrada el viernes 24 de octubre de 2014.",
    link: "https://www.colegiomedico.cl/wp-content/uploads/2024/01/Estatutos_APS_2014-1.pdf",
  },
  {
    titulo: "Reglamento Departamentos",
    contenido:
      "Aprobado por Acuerdo N° 38 de la Sesión Ordinaria N° 10 del H. Consejo General, celebrada el martes 3 de agosto de 1982. Este Acuerdo refunde el Reglamento Base (Acuerdo N° 710 de 23 de noviembre de 1976) con los Reglamentos especiales de los diferentes Departamentos. El texto actual fue aprobado mediante Acuerdo N° 27, adoptado en Sesión Ordinaria N° 2, de 2 de septiembre de 2011; modificado mediante Acuerdo N° 111, adoptado en Sesión Ordinaria N° 15, de 14 de diciembre de 2012; modificado mediante Acuerdo N° 44, adoptado en Sesión Ordinaria N° 5, de 21 de noviembre de 2014, y por Acuerdo N° 221, adoptado en Sesión Ordinaria N° 13, de 25 de septiembre de 2015.",
    link: "https://www.colegiomedico.cl/wp-content/uploads/2021/01/Reglamento_Departamentos_2015.pdf",
  },
  {
    titulo: "Estatutos Agrupación Nacional de Médicas y Médicos Mayores",
    contenido:
      "Aprobados en Sesión Ordinaria de H. Consejo Nacional N° 3, de 12 de abril de 2024, mediante Acuerdo N° 35.",
    link: "https://www.colegiomedico.cl/wp-content/uploads/2024/06/Estatutos_AMM_12.04.24.pdf",
  },
  // Agrega más elementos según sea necesario
];
</script>

<style lang="scss">
.tab-button {
  border-radius: 50px 0px 0px 50px;
}
</style>
