import axios from 'axios';

const baseURLEnv = process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : 'https://api.viniciusfernandes.site'
console.log('=>baseURLEnv --->', baseURLEnv, process.env.NODE_ENV);

export const api = axios.create({
  baseURL: baseURLEnv,
})
