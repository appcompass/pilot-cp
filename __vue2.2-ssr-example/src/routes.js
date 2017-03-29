import Vue from 'vue'
import VueRouter from 'vue-router'

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Foo },
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})


export default router
