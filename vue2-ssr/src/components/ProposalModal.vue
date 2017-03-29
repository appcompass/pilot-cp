<template>
  <div id="proposal-popup" class="popup popup-proposal mfp-hide" v-if="form">
  	<h1>Request a Proposal</h1>
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
      <div class="form-footer">
        <div class="row">
          <div class="small-8 columns">
            <p class="required-notice"> Before submitting the RFP you must complete all * fields above. </p>
          </div>
          <div class="small-4 columns small-text-right">
            <button class="btn-blue">Send
              <span class="icon-arrow"></span>
            </button>
          </div>
        </div>
      </div>
    </form>
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
      collection: {},
      Components
    }
  },
  mounted () {
    axios.get('/api/web-forms/rfp-modal')
      .then(response => {
        this.form.init(response.data)
        setTimeout(() => {
          FormsJquery.init()
        }, 400)
      })
  },
  methods: {
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
    set (data) {
      this.form.set(data)
    },
    submit () {
      axios.post('/api/web-forms/rfp-modal', this.form.collection)
        .then(response => {
        })
        .catch((error) => {
        	if (error.response.status === 422) {
        		this.form.fails(error.response.data)
        	}
        })
    }
  }
}
</script>
