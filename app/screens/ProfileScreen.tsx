import { BodyText, TitleText } from '@components'
import { useBooks } from '@context/useBooks'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native'

interface UserProps {
  name: string
  email: string
}

const ProfileScreen = () => {
  const { books } = useBooks()
  const [user, setUser] = useState<UserProps | null>(null)
  const booksUserRead = books.filter((book) => book.status).length

  useEffect(() => {
    async function getUser() {
      const currentUser = await AsyncStorage.getItem('user')
      setUser(JSON.parse(currentUser || ''))
    }

    getUser()
  }, [])

  return (
    <View className="bg-background flex h-full overflow-hidden">
      <View className="absolute top-48 z-10 h-full w-[912px] self-center rounded-tl-full rounded-tr-full bg-white" />
      <Image
        source={require('@assets/avatarPlaceholder.png')}
        className="border-secondary z-20 mb-4 mt-16 h-52 w-52 self-center rounded-full border"
      />
      <View className="z-20 mb-10 flex w-full items-center">
        <BodyText>{user?.name}</BodyText>
        <BodyText>{user?.email}</BodyText>
        <View className="flex flex-row gap-8 p-6">
          <View className="my-3 flex items-center">
            <TitleText>{booksUserRead}</TitleText>
            <BodyText className="text-secondary">books you read</BodyText>
          </View>
          <View className="bg-secondary h-full w-[1px]" />
          <View className="my-3 flex items-center">
            <TitleText>{books.length}</TitleText>
            <BodyText className="text-secondary">books in library</BodyText>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ProfileScreen
