const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/IndexPage.vue') }
  //   ]
  // },
  {
    path: "/home",
    component: () => import("layouts/HomeLayout.vue"),
  },
  {
    path: "/login",
    component: () => import("src/pages/LoginPage.vue"),
  },
  {
    path: "/",
    component: () => import("src/pages/LoginPage.vue"),
  },
  {
    path: "/medicos",
    component: () => import("src/pages/MedicosPage.vue"),
  },
  {
    path: "/admin-noticias",
    component: () => import("src/pages/AdminNoticiasPage.vue"),
  },
  {
    path: "/servicios",
    component: () => import("src/pages/ServiciosPage.vue"),
  },
  {
    path: "/quienes-somos",
    component: () => import("src/pages/QuienesSomos.vue"),
  },
  {
    path: "/informaciones",
    component: () => import("src/pages/InformacionesPage.vue"),
  },
  {
    path: "/informaciones/noticia/:id",
    component: () => import("src/pages/NoticiaPage.vue"),
    props: true,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
