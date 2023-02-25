import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login/Login.vue')
    },
    {
      path: '/register',
      name: 'Registro',
      component: () => import('../views/Login/Register.vue')
    },
    {
      path: '/feed',
      name: 'Feed',
      component: () => import('../views/Login/Feed.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/about',
      name: 'Nosotros',
      component: () => import('../views/About.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/newEspacio',
      name: 'Nuevo Espacio',
      component: () => import('../views/Alquiler/newEspacio.vue'),
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/editEspacio/:id',
      name: 'Editar Espacio',
      component: () => import('../views/Alquiler/editEspacio.vue'),
      meta: {
        requiresAuth: true
      },
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if ( getAuth().currentUser ){
      next();
    } else {
      alert("no tienes acceso")
      next('/login')
    }
  } else {
    next();
  }

});

export default router
