import { isRunningOnCapacitor } from "src/utils/platform";

const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/IndexPage.vue') }
  //   ]
  // },
  // {
  //   path: "/",
  //   component: isRunningOnCapacitor()
  //     ? () => import("layouts/HomeMobileLayout.vue")
  //     : () => import("src/pages/LoginPage.vue"),
  //   children: [
  //     {
  //       path: "detalle-afiliacion",
  //       component: () => import("pages/app/DetalleAfiliacionPage.vue"),
  //     },
  //   ],
  // },
  //Sección para la aplicación móvil
  {
    path: "/",
    component: isRunningOnCapacitor()
      ? () => import("layouts/LoginMobilePage.vue")
      : () => import("layouts/HomeLayout.vue"),
  },
  {
    path: "/home",
    component: isRunningOnCapacitor()
      ? () => import("layouts/HomeMobileLayout.vue")
      : () => import("layouts/HomeLayout.vue"),
  },

  {
    path: "/colmed",
    component: isRunningOnCapacitor()
      ? () => import("pages/app/ColmedAppMobile.vue")
      : () => import("layouts/HomeLayout.vue"),

    children: [
      {
        path: "",
        redirect: "detalle-afiliacion",
      },
      {
        path: "detalle-afiliacion",
        component: () => import("pages/app/DetalleAfiliacionPage.vue"),
      },
      {
        path: "credencial",
        component: () => import("pages/app/CredencialAppPage.vue"),
      },
      {
        path: "noticias-app",
        component: () => import("pages/app/NoticiasAppPage.vue"),
      },
      {
        path: "eventos-app",
        component: () => import("pages/app/EventosAppPage.vue"),
      },
      {
        path: "convenios-app",
        component: () => import("pages/app/ConveniosAppPage.vue"),
      },
      {
        path: "afiliacion-app",
        component: () => import("pages/app/AfiliacionAppPage.vue"),
      },
      {
        path: "noticia-app/:id",
        component: () => import("pages/app/NoticiaAppPage.vue"),
        props: true,
      },
      // 1) LOGIN CON ICM
      {
        path: "login-icm",
        component: () => import("src/pages/app/LoginMobileICMPage.vue"),
      },
      // 2) REGISTRO CON ICM
      {
        path: "register-icm",
        component: () => import("src/pages/app/RegistroUsuarioICMPage.vue"),
      },
      // 3) SOLICITAR RESETEO DE CONTRASEÑA
      {
        path: "request-pass-reset",
        component: () => import("src/pages/app/ResetPassPage.vue"),
      },
      // 4) CONFIRMAR RESETEO (NUEVA CONTRASEÑA)
      {
        path: "confirm-pass-reset",
        component: () => import("src/pages/app/ConfirmarNewPassPage.vue"),
      },
    ],
  },
  //Fin sección rutas para la aplicación móvil

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
    path: "/admin-eventos",
    component: () => import("src/pages/AdminSitioPage.vue"),
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
