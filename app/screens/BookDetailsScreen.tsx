import { updateStatusBook } from '@api/book'
import { BodyText, Button, TitleText } from '@components'
import { BookProps } from '@components/molecules/BookItemCard'
import { handleApiErrors } from '@helpers/handleApiErrors'
import { RouteProp, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Image, ScrollView } from 'react-native'

type ParamList = {
  params: {
    book: BookProps
  }
}

const BookDetailsScreen = () => {
  const route = useRoute<RouteProp<ParamList>>()
  const { id, title, author, year, genre, description, status, imageUrl } = route.params.book
  const [currentStatus, setCurrentStatus] = useState(status)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateStatusPress = async () => {
    try {
      setIsLoading(true)
      const newStatus = !currentStatus
      await updateStatusBook(id, newStatus)
      setCurrentStatus(newStatus)
    } catch (error) {
      handleApiErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="bg-background flex h-full overflow-hidden">
      <View className="absolute top-48 z-10 h-full w-[912px] self-center rounded-tl-full rounded-tr-full bg-white" />
      <Image
        source={{ uri: imageUrl }}
        className="z-20 mb-4 mt-6 h-80 w-60 self-center rounded-3xl"
      />
      <View className="z-20 mb-10 w-full items-center">
        {currentStatus ? (
          <BodyText className="font-body-semi text-primary !text-xl">already read!</BodyText>
        ) : (
          <Button
            label="yeah, I finished!"
            isLoading={isLoading}
            onPress={handleUpdateStatusPress}
          />
        )}
      </View>
      <ScrollView className="relative z-20 flex h-full w-full gap-1 p-4">
        <View className="flex-1 items-start">
          <TitleText className="text-3xl">{title}</TitleText>
          <BodyText className="text-secondary !text-base">
            by {author} - {year}
          </BodyText>
          <View className="border-primary mb-6 mt-2 items-center justify-center rounded-bl-3xl rounded-tr-3xl border bg-white px-5 py-1">
            <BodyText className="text-primary !font-body-semi !text-lg">{genre}</BodyText>
          </View>
          <BodyText>{description}</BodyText>
        </View>
      </ScrollView>
    </View>
  )
}

export default BookDetailsScreen
