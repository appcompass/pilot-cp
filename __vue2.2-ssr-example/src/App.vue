<template>
  <div class="my-app">
    <h1>{{name}} uomo talpa</h1>
    <h2>age: {{age}} <button @click="plus">+1</button></h2>
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
    <router-view></router-view>
    <my-cmp :name="name"></my-cmp>
  </div>
</template>

<script>
import MyCmp from './MyCmp.vue'

export default {
  components: {
    MyCmp,
  },
  data() {
    return {
      name: 'Federico',
      age: 38,
    }
  },
  fetch (url) {
    console.log(url)
  },
  created() {
    console.log('created > ' + this.age);
    ++this.age;
  },
  methods: {
    plus() {
      console.log('adderino')
      this.age++;
    },
  },
};
</script>

<style>

</style>
