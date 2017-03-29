<template>
<div class="section-pad" v-if="data">
  <!-- <div class="row"> -->
  <div class="medium-8 medium-centered columns">
    <form @submit.prevent="submit">
      <div
        class="columns"
        :class="{
          'small-6': width(field.type, 6),
          'small-12': width(field.type, 12),
          row: index % 2 === 0 || width(field.type, 12)
        }"
        v-for="field, index in form.fields"
      >
        <span
          :is="Components[field.type]"
          :pointer="field.name"
          :data="form.get(field.name)"
          :label="field.label"
          :errors="form.errors"
          :source="field.source"
          :config="field.config"
          :help="field.help"
          @input="set"
        ></span>
      </div>
		  <div class="row">
		    <div class="small-12 columns text-right">
		        <button class="btn-blue">Send
		          <span class="icon-arrow"></span>
		        </button>
		    </div>
		  </div>
    </form>
  </div>
  <!-- </div> -->
</div>
</template>

<script>
import Form from './Form'
import axios from 'axios'
import * as Components from './Components'

export default {
  props: ['data'],
  data () {
  	return {
  		form: new Form(),
  		Components
  	}
  },
  mounted () {
	  axios.get('/api/web-forms/contact-us')
	    .then(response => {
	      this.form.init(response.data)
	      setTimeout(() => {
	        FormsJquery.init()
	      }, 400)
	    })
  },
  methods: {
  	submit () {
  	  axios.post('/api/web-forms/contact-us', this.form.collection)
  	    .then(response => {
  	    })
  	    .catch((error) => {
  	    	if (error.response.status === 422) {
  	    		this.form.fails(error.response.data)
  	    	}
  	    })
  	},
  	set (data) {
  	  this.form.set(data)
  	},
    width (type, width) {
      switch (type) {
        case 'Text':
          return width === 12
          break;
        case 'String':
          return width === 6
          break;
        default:
          return width === 12
      }
    },
  }
}
</script>
