import { createBook } from '@api/book'
import { Input, Button, TitleText } from '@components/atoms'
import { showSuccessMessage } from '@helpers/handleAlerts'
import { handleApiErrors } from '@helpers/handleApiErrors'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import { Image, TouchableOpacity, View, ScrollView } from 'react-native'

interface TitleInputTextProps {
  title: string
  value: string
  onChangeText: React.Dispatch<React.SetStateAction<string>>
  multiline?: boolean
}

const TitleInputText = ({ title, value, onChangeText, multiline }: TitleInputTextProps) => {
  return (
    <View>
      <TitleText>{title}</TitleText>
      <Input value={value} onChangeText={onChangeText} multiline={multiline} />
    </View>
  )
}

const AddBookScreen = () => {
  const navigation = useNavigation<any>()

  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const [description, setDescription] = useState('')

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await createBook(title, author, genre, year, image, description)
      showSuccessMessage('Book created!', 'A new book has been successfully added!')
      navigation.navigate('BooksTab', { forceRefresh: true })
    } catch (error: any) {
      handleApiErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ScrollView className="bg-background flex h-full">
      <View className="absolute top-48 z-10 h-full w-[912px] self-center rounded-tl-full rounded-tr-full bg-white" />
      <TouchableOpacity onPress={handleImagePicker} className="z-20 my-6 h-80 w-60 self-center">
        {image ? (
          <Image source={{ uri: image }} className="h-full w-full rounded-3xl" />
        ) : (
          <View className="border-secondary h-full w-full items-center justify-center rounded-3xl border bg-white">
            <TitleText className="text-center">press to choose your cover</TitleText>
          </View>
        )}
      </TouchableOpacity>
      <View className="relative z-20 flex h-full w-full items-start justify-between gap-1 p-4">
        <View className="flex-1 items-center">
          <TitleInputText title="book title" value={title} onChangeText={setTitle} />
          <TitleInputText title="author name" value={author} onChangeText={setAuthor} />
          <TitleInputText title="book year" value={year} onChangeText={setYear} />
          <TitleInputText title="book genre" value={genre} onChangeText={setGenre} />
          <TitleInputText
            title="description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <Button label="let's add the book" onPress={handleSubmit} isLoading={isLoading} />
        </View>
      </View>
    </ScrollView>
  )
}

export default AddBookScreen
