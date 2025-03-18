import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://api.viniciusfernandes.site:3333',
})
