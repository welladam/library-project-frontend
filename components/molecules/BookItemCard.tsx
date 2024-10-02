import { BodyText, Button, TitleText } from '@components/atoms'
import React from 'react'
import { View, ImageSourcePropType, Image, TouchableOpacity } from 'react-native'

export interface BookProps {
  id: number
  title: string
  author: string
  genre: string
  year: number
  imageUrl: string
  status: boolean
  description: string
  createdAt?: string
}

interface BookItemCardProps {
  book?: BookProps
  title?: string
  description?: string
  image?: ImageSourcePropType
  seeMoreButtonPress?: () => void
  onBookCardPress?: (book: BookProps) => void
}

interface BookContentProps {
  book: BookProps
}

interface DefaultContentProps {
  title?: string
  description?: string
}

const BookContent = ({ book }: BookContentProps) => {
  return (
    <View className="flex w-full">
      <TitleText className="line-clamp-1 overflow-ellipsis">{book.title}</TitleText>
      <BodyText className="text-secondary line-clamp-1 overflow-ellipsis">
        by {book.author} - {book.year}
      </BodyText>
      <BodyText className="text-secondary line-clamp-1 overflow-ellipsis">{book.genre}</BodyText>
      <BodyText className="text-jelly line-clamp-2 overflow-ellipsis">{book.description}</BodyText>
      {book.status && (
        <BodyText className="text-primary font-body-semi mt-4 text-right">already read!</BodyText>
      )}
    </View>
  )
}

const DefaultContent = ({ title, description }: DefaultContentProps) => {
  return (
    <View className="flex gap-2">
      <BodyText className="font-body-semi">{title}</BodyText>
      <BodyText className="text-jelly text-xl">{description}</BodyText>
    </View>
  )
}

const BookItemCard = ({
  book,
  title,
  description,
  image,
  seeMoreButtonPress,
  onBookCardPress,
}: BookItemCardProps) => {
  return (
    <TouchableOpacity
      disabled={!book}
      onPress={() => book && onBookCardPress && onBookCardPress(book)}>
      <View className="min-h-40 flex-row gap-4 rounded-2xl border border-gray-200 bg-gray-100 p-4">
        {(book || image) && (
          <Image
            source={book ? { uri: book.imageUrl } : image}
            className={`${book && 'h-44 w-32'} rounded-lg`}
          />
        )}
        <View className="flex-1 flex-col justify-between">
          {book ? (
            <BookContent book={book} />
          ) : (
            <DefaultContent title={title} description={description} />
          )}
          {seeMoreButtonPress && (
            <Button
              className="w-auto self-end"
              label="see more"
              borderType="borderStyle"
              onPress={seeMoreButtonPress}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default BookItemCard
