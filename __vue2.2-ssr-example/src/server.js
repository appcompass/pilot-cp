// server-entry
import { app, router } from './app'
// import Vue from 'vue';
// import App from './App.vue';
// import router from './routes'

// const app = new Vue(App);

// the default export should be a function
// which will receive the context of the render call
export default context => {
  router.push(context.url)
  return new Promise((resolve, reject) => {
    // app.fetchServerData(context).then(() => {resolve(app)});
    resolve(app);
  });
};
