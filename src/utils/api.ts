import { useUserStore } from '@/@core/stores/userStore'
import axios from 'axios'
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

export const $api = axios.create({
  baseURL,
})

$api.interceptors.request.use(
  config => {
    const accessToken = useUserStore().accessToken
    if (accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  error => {
    return Promise.reject(error)
  },
)
