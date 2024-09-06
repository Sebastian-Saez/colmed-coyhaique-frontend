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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
