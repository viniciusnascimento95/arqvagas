import axios from 'axios'

export const api = axios.create({
  baseURL: `${process.env.BASE_URL_API}:${process.env.NEXT_PUBLIC_PORT_API}`,
})
