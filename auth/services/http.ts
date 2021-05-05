import axios from 'axios'
import { parseCookies } from 'nookies'

const cookies = parseCookies()

export const http = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['auth.token']}`
  }
})