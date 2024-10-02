import AsyncStorage from '@react-native-async-storage/async-storage'

import apiClient from './apiClient'

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password })
    await AsyncStorage.setItem('token', response.data.token)
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user))
    return response.data
  } catch (error: any) {
    throw error
  }
}

export const signUp = async (email: string, password: string, name: string) => {
  try {
    const response = await apiClient.post('/auth/register', { email, password, name })
    return response.data
  } catch (error: any) {
    throw error
  }
}
