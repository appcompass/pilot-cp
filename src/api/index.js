import axios from 'axios'
import store from '../store'
import swal from 'sweetalert'

const http = axios.create({
  // timeout: 6000 // some operations may take longer than 6 seconds. Especially when dealing with client specific environments.
})

http.interceptors.response.use(response => {
  if (response.headers['Authorization']) {
    store.dispatch('TOKEN', response.headers['authorization'])
  }
  return response
}, (error) => {
  switch (error.response.status) {
    case 401:
      swal('Unauthorized', 'In order to perform this operation you must be logged in.', 'error')
      break
  }
  return Promise.reject(error)
})

const api = {
  get: (path, params) => http.get(path, params),
  post: (path, params) => http.post(path, params),
  put: (path, params) => http.put(path, params),
  destroy: (path, params) => http.delete(path, {params: params}),
  search: (path, filters) => http.get(path, {params: filters}),
  http
}

export default api
