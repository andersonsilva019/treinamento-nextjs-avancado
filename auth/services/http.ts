import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue = []

export const http = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['auth.token']}`
  }
})

http.interceptors.response.use(response => {
  return response
}, (error: AxiosError) => {
  if (error.response.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies()

      const { 'auth.refreshToken': refreshToken } = cookies
      const originalConfig = error.config

      if (!isRefreshing) {
        isRefreshing = true

        http.post('/refresh', {
          refreshToken
        }).then(response => {
          const { token } = response.data

          setCookie(undefined, 'auth.token', token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
          })

          setCookie(undefined, 'auth.refreshToken', response.data.refreshToken, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
          })

          http.defaults.headers['Authorization'] = `Bearer ${token}`

          failedRequestsQueue.forEach(request => request.onSuccess(token))
          failedRequestsQueue = []

        }).catch(err => {
          failedRequestsQueue.forEach(request => request.onFailure(err))
          failedRequestsQueue = []
        }).finally(() => {
          isRefreshing = false
        })
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`

            resolve(http(originalConfig))
          },
          onFailure: (err: AxiosError) => {
            reject(err)
          }
        })
      })
    } else {

    }
  }
})