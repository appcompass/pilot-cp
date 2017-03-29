<template>
  <div id="app">
     <img src="./assets/logo.png">
     <ul>
       <li><router-link to="/" exact>Home</router-link></li>
       <li><router-link to="/topics">Topics</router-link></li>
       <li><router-link to="/counter">Counter</router-link></li>
       <li><router-link to="/about">About</router-link></li>
     </ul>
     <router-view class="view"></router-view>
  </div>
</template>

<script>
import { Boolean, Radio, Secret, String, TextField, Checkboxes } from './components/Components'
import container from './components/container'
import SiteHeader from './components/SiteHeader'
import $ from 'jQuery'

export default {
  name: 'App',
  components: { Boolean, Radio, Secret, String, TextField, Checkboxes, container, SiteHeader }
}
</script>

<style>
  body {
    font-family: Helvetica, sans-serif;
  }
  .router-link-active{
    color: red ;
  }
</style>
