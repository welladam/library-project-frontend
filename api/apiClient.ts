import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
})

export default apiClient
