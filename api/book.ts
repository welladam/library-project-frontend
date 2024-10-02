import * as FileSystem from 'expo-file-system'

import apiClient from './apiClient'

export const createBook = async (
  title: string,
  author: string,
  genre: string,
  year: string,
  imageUri: string,
  description: string
) => {
  try {
    const imageResponse = await FileSystem.uploadAsync(
      process.env.EXPO_PUBLIC_IMAGE_API_URL || '',
      imageUri,
      {
        fieldName: 'file',
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          Authorization: process.env.EXPO_PUBLIC_IMAGE_API_KEY || '',
        },
      }
    )
    const imageUrl = JSON.parse(imageResponse.body).url
    const response = await apiClient.post('/books', {
      title,
      author,
      genre,
      year,
      imageUrl,
      description,
    })
    return response.data
  } catch (error: any) {
    throw error
  }
}

export const getBooks = async () => {
  try {
    const response = await apiClient.get('/books')
    return response.data
  } catch (error: any) {
    throw error
  }
}

export const updateStatusBook = async (id: number, status: boolean) => {
  try {
    const response = await apiClient.put(`/books/status/${id}`, { status })
    return response.data
  } catch (error: any) {
    throw error
  }
}
