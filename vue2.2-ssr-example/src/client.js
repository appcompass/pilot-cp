// client-entry
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const VueApp = Vue.extend(App);
const app = new VueApp({
  el: '.my-app',
});
