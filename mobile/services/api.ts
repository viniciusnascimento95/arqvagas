import axios from 'axios'

export const api = axios.create({
  // baseURL: 'https://api.viniciusfernandes.site',
    baseURL: 'http://localhost:3333',
})
