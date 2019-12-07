import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Cases from './views/Cases.vue'
import Mapper from './views/Mapper.vue'
import Stations from './views/Stations.vue'
import Reports from './components/Reports.vue'
import Picker from './views/Picker.vue'
import CrimeRegister from './views/CrimeRegister.vue'
import Signup from './components/auth/Signup.vue'
import Login from './components/auth/Login.vue'
import Admin from './views/Admin.vue'
import Team from './views/Team.vue'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/register',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/mapper',
      name: 'Mapper',
      component: Mapper,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/stations',
      name: 'Stations',
      component: Stations,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/picker',
      name: 'Picker',
      component: Picker,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/crimeRegister',
      name: 'CrimeRegister',
      component: CrimeRegister,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cases',
      name: 'cases',
      component: Cases,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },

    //Admin
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        requiresAuth: true
      }
    },
    {
    path: '/team',
    name: 'Team',
    component: Team,
    meta: {
      requiresAuth: true
    }
  },

  ]
})

router.beforeEach((to, from, next) => {
  next()
  //check requirements for accesing route
 if (to.matched.some(rec => rec.meta.requiresAuth)){
    //check Auth state
    let user = firebase.auth().currentUser
    if (user){
      //proceed to route
      next()
    } else {
      //redirect
      next({name: 'Login'})
    }
  } else {
    next()
  }
})

export default router
