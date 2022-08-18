import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import HomeView from '../views/HomeView.vue'
import OpenerView from '../views/OpenerView.vue'
import ProfilView from '../views/ProfilView.vue'
import BourseView from '../views/BourseView.vue'
import ResultView from '../views/ResultView.vue'
import PlayersView from '../views/PlayersView.vue'
import PlayersDetailsView from '../views/PlayerDetailsView.vue'
import EchangeView from '../views/EchangeView.vue'
import CatalogueView from '../views/CatalogueView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/my-profil',
    name: 'my-profil',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    },
    component: ProfilView
  },
  {
    path: '/players',
    name: 'players',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    },
    component: PlayersView
  },
  {
    path: '/player/:username',
    name: 'player',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    },
    component: PlayersDetailsView
  },
  {
    path: '/opener',
    name: 'opener',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    },
    component: OpenerView
  },
  {
    path: '/echange',
    name: 'echange',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    },
    component: EchangeView
  },

  {
    path: '/result/:id',
    name: 'result',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    },
    component: ResultView
  },
  {
    path: '/bourse',
    name: 'bourse',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    },
    component: BourseView
  },
  {
    path: '/catalogue',
    name: 'catalogue',
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    },
    component: CatalogueView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
