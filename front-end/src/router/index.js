import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Container from '../views/Container.vue'
import SignUp from '../views/SignUp.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
},
{
    path: '/container',
    name: 'Container',
    component: Container
},
{
    path: '/signup',
    name: 'SignUp',
    component: SignUp
},
{
    path: '/about',
    name: 'About',
    component: About
}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router