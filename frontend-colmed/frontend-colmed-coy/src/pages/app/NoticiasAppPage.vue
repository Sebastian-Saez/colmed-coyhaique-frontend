<template>
  <q-page class="q-pa-md bg-cyan-1">
    <q-card flat class="bg-cyan-1">
      <q-card-section>
        <div
          class="text-h3 text-primary text-center text-weight-bolder"
          style="letter-spacing: 10px"
        >
          Noticias
        </div>
        <q-separator inset />
      </q-card-section>
      <q-carousel
        v-model="slideRegionales"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        infinite
        :autoplay="10000"
        arrows
        control-color="primary"
        class="text-white rounded bg-cyan-1"
        height="650px"
      >
        <q-carousel-slide
          v-for="(item, index) in noticias"
          :key="index"
          :name="index"
        >
          <q-card
            bordered
            class="bg-amber-1 q-pb-xl"
            style="border-radius: 20px"
            @click="goToNoticia(item)"
          >
            <q-card-section
              style="border-radius: 20px 20px 0px 0px"
              class="bg-amber-14"
            >
              <div class="text-h5 text-weight-medium">
                {{ item.titulo }}
              </div>
            </q-card-section>

            <q-card-section>
              <q-img
                v-if="item.imagen"
                :src="item.imagen"
                loading="lazy"
                spinner-color="primary"
                :ratio="4 / 4"
              />
              <q-img
                v-else
                src="https://placehold.co/300x200"
                loading="lazy"
                spinner-color="primary"
              />
            </q-card-section>
            <q-card-section>
              <div class="text-subtitle2 text-primary q-px-md text-justify">
                {{ item.resumen_contenido }}
              </div>
            </q-card-section>
          </q-card>
          <!-- <q-btn flat @click="goToNoticia(item)">
          
        </q-btn> -->
        </q-carousel-slide>
      </q-carousel>
      <q-card-section> </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useInformacionesStore } from "src/stores/informaciones";
const informacionStore = useInformacionesStore();
// Lógica, composables, etc.
const router = useRouter();
// Controla el slide activo en el carousel
const slideRegionales = ref(0);

const noticias = ref([
  {
    id: 12,
    autor: null,
    titulo: "Noticia de FB",
    contenido: "contenido de noticia",
    resumen_contenido: "resumen de la noticia",
    destacada: false,
    fecha_modificacion: "2024-11-29T06:45:16.665996Z",
    imagen: null,
    video: null,
    link: {
      link: '<iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2FMetaforDevelopers%2Fvideos%2F487754943902976%2F&show_text=false&width=560&t=0" width="560" height="314" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>',
    },
    activo: true,
  },
  {
    id: 9,
    autor: {
      id: 1,
      username: "admin",
      email: "admin@admin.cl",
      first_name: "Administrador",
      last_name: "TIC",
      perfiles: [
        {
          id: 2,
          tipo_perfil: "admin_colmed",
          activo: true,
          user: 1,
        },
        {
          id: 3,
          tipo_perfil: "admin_noticias",
          activo: true,
          user: 1,
        },
      ],
    },
    titulo: "Noticia de prueba",
    contenido: "COntenido de una noticias de prueba",
    resumen_contenido: "COntenido de una noticias de prueba",
    destacada: false,
    fecha_modificacion: "2024-11-07T13:55:35.856488Z",
    imagen: null,
    video: "",
    link: null,
    activo: true,
  },
  {
    id: 8,
    autor: null,
    titulo: "COMUNICADO DE COLMED AYSÉN",
    contenido:
      '"La crisis económica que hoy golpea a los recintos de salud del país aumenta año a año y suele hacerse visible en el último tercio del año. El gasto sobrepasa el presupuesto entregado por el MINSAL, lo que incrementa la deuda y deja sin recursos suficientes para finalizar el año 2024.\r\nLos recursos comprometidos por el Ministerio de Hacienda alcanzan solo para un tercio de lo que habitualmente requiere un hospital para compras de servicios, por lo que resultan insuficientes. El 30 de septiembre de 2024, el Subsecretario de Redes hizo un llamado a la austeridad, y la propia Ministra ha reconocido que los recursos no alcanzan para cubrir hasta el fin de año.\r\nLa austeridad, contención y eficiencia en el gasto que solicita la autoridad no pueden traducirse en la postergación de urgencias ni en el riesgo a la salud de nuestra población. Tampoco es viable mejorar la gestión de la demanda y aumentar las atenciones en salud sin un aumento en el presupuesto.\r\nLos equipos de salud no pueden asumir las consecuencias de esta falta de financiamiento, que se traduce en la postergación de\r\natenciones, exponiendo a nuestra población a situaciones de riesgo.\r\nEn la región de Aysén, a diferencia de otros Servicios de Salud del país, el déficit ha sido menor, lo que ha evitado suspensiones de atención o carencias de insumos imprescindibles. Hay recursos asegurados para completar el mes de noviembre.\r\nEl mes de diciembre debería ser cubierto por el decreto de cierre que se espera recibir del MINSAL.\r\nComo Colegio Medico de Aysén, nos sumamos al llamado al Ejecutivo para que instruya a las autoridades del Ministerio de Salud a enviar este decreto de cierre lo antes posible, y así garantizar la atención de salud a los habitantes de nuestra región. Nuestra población, dada su situación de aislamiento y su dependencia de un sistema único de salud, enfrenta una vulnerabilidad adicional que no esta presente en otras regiones; por ello, es fundamental contar con estos recursos para cerrar el año de manera adecuada.\r\nEs nuestro compromiso, como Colegio Médico, velar por una atención digna y de calidad. Por esta razón, hacemos un llamado urgente a la necesidad de una inyección de recursos."',
    resumen_contenido:
      "Como Colegio Médico nos sumamos al llamado al Ejecutivo para que instruya a las autoridades del @ministeriosalud a enviar el decreto de cierre lo antes posible.",
    destacada: true,
    fecha_modificacion: "2024-11-07T13:55:11.005261Z",
    imagen: "http://10.0.2.2:8001/media/noticias/declaracion_publica_1.jpg",
    video: "",
    link: null,
    activo: true,
  },
  {
    id: 7,
    autor: {
      id: 1,
      username: "admin",
      email: "admin@admin.cl",
      first_name: "Administrador",
      last_name: "TIC",
      perfiles: [
        {
          id: 2,
          tipo_perfil: "admin_colmed",
          activo: true,
          user: 1,
        },
        {
          id: 3,
          tipo_perfil: "admin_noticias",
          activo: true,
          user: 1,
        },
      ],
    },
    titulo: "Primer encuentro de médicos mayores editado",
    contenido:
      "El pasado 25 de octubre, se realizó en la sede del Colegio Médico Regional, el primer encuentro de médicos mayores. Quienes participaron manifestaron su alegría e interés por la conformación del capítulo, destacando la importancia de esta instancia para proponer iniciativas que beneficien y orienten a quienes se encuentran en esta etapa de la vida profesional.\r\nFue un encuentro exitoso, lleno de remembranzas, anécdotas y risas.",
    resumen_contenido:
      "El pasado 25 de octubre, se realizó en la sede del Colegio Médico Regional, el primer encuentro de médicos mayores.",
    destacada: false,
    fecha_modificacion: "2024-11-29T06:23:54.852488Z",
    imagen: "https://cdn.quasar.dev/img/parallax2.jpg",
    video: "",
    link: null,
    activo: true,
  },
  {
    id: 6,
    autor: {
      id: 1,
      username: "admin",
      email: "admin@admin.cl",
      first_name: "Administrador",
      last_name: "TIC",
      perfiles: [
        {
          id: 2,
          tipo_perfil: "admin_colmed",
          activo: true,
          user: 1,
        },
        {
          id: 3,
          tipo_perfil: "admin_noticias",
          activo: true,
          user: 1,
        },
      ],
    },
    titulo: "Movilízate con energía humana",
    contenido:
      "Invitamos a nuestros colegas, amigos y familias de Aysén unirnos a esta iniciativa que promueve la conciencia ecológica con el fin de reducir el impacto ambiental del transporte motorizado 🚙💨😵              Nuestra presidenta, Dra. Alejandra Born hace un llamado a todos; #movilízate con #energia #humana 💪🏼🚶🚶‍♀️🚲",
    resumen_contenido:
      "Invitamos a nuestros colegas, amigos y familias de #aysen unirnos a esta iniciativa que promueve la conciencia ecológica con el fin de reducir el impacto ambiental del transporte motorizado",
    destacada: false,
    fecha_modificacion: "2024-11-07T00:02:46.936741Z",
    imagen: null,
    video: "",
    link: {
      link: "https://web.facebook.com/Colegiomedicoaysen/videos/1565295320725211/",
    },
    activo: true,
  },
  {
    id: 5,
    autor: {
      id: 1,
      username: "admin",
      email: "admin@admin.cl",
      first_name: "Administrador",
      last_name: "TIC",
      perfiles: [
        {
          id: 2,
          tipo_perfil: "admin_colmed",
          activo: true,
          user: 1,
        },
        {
          id: 3,
          tipo_perfil: "admin_noticias",
          activo: true,
          user: 1,
        },
      ],
    },
    titulo: "¡Feliz Aniversario N•69!",
    contenido:
      "¡Feliz Aniversario N•69! \r\nQueridas y queridos Médicos Generales de Zona, en este día en que celebramos la creación de esta gran política en salud, les enviamos nuestra sinceras felicitaciones y agradecimiento por su genuina entrega en cada rincón de nuestra Región de Aysén ⚕️🤝\r\n@mgzaysen \r\n@mgzchileoficial",
    resumen_contenido:
      "Médicos Generales de Zona,  les enviamos nuestra sinceras felicitaciones y agradecimiento por su genuina entrega en cada rincón de nuestra Región de Aysén.",
    destacada: true,
    fecha_modificacion: "2024-11-06T18:28:13.004727Z",
    imagen: "http://10.0.2.2:8001/media/noticias/aniversario_69_4.jpg",
    video: "",
    link: null,
    activo: true,
  },
  {
    id: 4,
    autor: {
      id: 1,
      username: "admin",
      email: "admin@admin.cl",
      first_name: "Administrador",
      last_name: "TIC",
      perfiles: [
        {
          id: 2,
          tipo_perfil: "admin_colmed",
          activo: true,
          user: 1,
        },
        {
          id: 3,
          tipo_perfil: "admin_noticias",
          activo: true,
          user: 1,
        },
      ],
    },
    titulo: "Nuestra presidenta visitó a la Gobernadora de Aysén",
    contenido:
      "El día de ayer, nuestra pdta Dra. Alejandra Born @borninpatagonia, visitó y saludó protocolarmente a la Gobernadora de Aysén @andreamaciasgobernadora @gobierno.regional.aysen con quien tuvo una agradable conversación sobre temas gremiales y salud de la región de Aysén 🫶🏻\r\n@colmed_chile 💪🏼",
    resumen_contenido:
      "Nuestra pdta Dra. Alejandra Born @borninpatagonia, visitó y saludó protocolarmente a la Gobernadora de Aysén @andreamaciasgobernadora @gobierno.regional.aysen",
    destacada: false,
    fecha_modificacion: "2024-11-07T00:06:22.684018Z",
    imagen: "http://10.0.2.2:8001/media/noticias/reunion_gobernadora_5.jpg",
    video: "",
    link: null,
    activo: true,
  },
  {
    id: 3,
    autor: {
      id: 1,
      username: "admin",
      email: "admin@admin.cl",
      first_name: "Administrador",
      last_name: "TIC",
      perfiles: [
        {
          id: 2,
          tipo_perfil: "admin_colmed",
          activo: true,
          user: 1,
        },
        {
          id: 3,
          tipo_perfil: "admin_noticias",
          activo: true,
          user: 1,
        },
      ],
    },
    titulo: "Declaración Pública Colmed Aysén",
    contenido:
      "La Directiva del Colegio Médico de la Región de Aysén rechaza tajantemente cualquier acto o acción de acoso laboral en todas sus dimensiones.\r\nFrente a hechos que se denuncien en establecimientos públicos, estos obligatoriamente\r\ndeberán instruir los procesos administrativos correspondientes tal como indica la ley 18.834 y\r\nDFL 29.\r\nHacemos un llamado a las direcciones de los establecimientos de salud a colaborar plenamente\r\ncon el debido proceso para garantizar un entorno laboral preocupado de las personas que lo integran.\r\nReafirmamos nuestro compromiso con el bienestar de todos los trabajadores en salud.\r\n\r\nDirectiva Regional de Aysén\r\nColegio Médico de Chile\r\nColegio Médico de Aysén; Pdte. Montt N° 69 - Coyhaique;\r\ndirectivacolmedaysen@@colegiomedico.cl",
    resumen_contenido:
      "Declaración Pública Colmed Aysén, respecto a los acontecimientos ocurridos en los establecimientos de salud de la región.",
    destacada: true,
    fecha_modificacion: "2024-11-06T18:27:30.012373Z",
    imagen: "http://10.0.2.2:8001/media/noticias/declaracion_publica_6.jpg",
    video: "",
    link: null,
    activo: true,
  },
  {
    id: 2,
    autor: {
      id: 1,
      username: "admin",
      email: "admin@admin.cl",
      first_name: "Administrador",
      last_name: "TIC",
      perfiles: [
        {
          id: 2,
          tipo_perfil: "admin_colmed",
          activo: true,
          user: 1,
        },
        {
          id: 3,
          tipo_perfil: "admin_noticias",
          activo: true,
          user: 1,
        },
      ],
    },
    titulo:
      "Tesorera de Colmed Aysén, participa en la primera sesión del H. Consejo Nacional",
    contenido:
      "Dra. Daniela Soto Ojeda, Tesorera de Colmed Aysén, participa en la primera sesión del H. Consejo Nacional con la nueva Mesa Directiva Nacional de Colegio Médico Chile, periodo 2024-2027. \r\nInstancia en la que presentarán las nuevas directivas 👏",
    resumen_contenido:
      "Dra. Daniela Soto Ojeda, Tesorera de Colmed Aysén, participa en la primera sesión del H. Consejo Nacional con la nueva Mesa Directiva Nacional de @colmed_chile",
    destacada: false,
    fecha_modificacion: "2024-11-06T17:54:53.184749Z",
    imagen: "http://10.0.2.2:8001/media/noticias/tesorera_colmed_7.jpg",
    video: "",
    link: null,
    activo: true,
  },
]);

const dialogOpen = ref(false);
const selectedItem = ref(null);

const goToNoticia = async (noticia) => {
  await informacionStore.noticiaApp(noticia);
  router.push({
    path: `/colmed/noticia-app/${noticia.id}`, // Asume que cada noticia tiene un 'id'
  });
};
</script>

<style scoped>
/* Estilos específicos */
</style>
