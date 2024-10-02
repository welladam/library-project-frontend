import { getBooks } from '@api/book'
import { Container, TitleText } from '@components'
import { BookItemCard } from '@components/molecules'
import { BookProps } from '@components/molecules/BookItemCard'
import { useBooks } from '@context/useBooks'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, Image, ScrollView, TouchableOpacity } from 'react-native'

const HomeScreen = () => {
  const navigation = useNavigation<any>()
  const { books, updateBooks } = useBooks()
  const booksToRead = books.filter((book: any) => !book.status).length

  useEffect(() => {
    async function fetchBooks() {
      const result = await getBooks()
      updateBooks(result)
    }
    fetchBooks()
  }, [])

  return (
    <ScrollView className="bg-white">
      <Container className="gap-8">
        <Image source={require('@assets/homeBanner.png')} />
        <View className="flex gap-6">
          <View className="gap-2">
            <TitleText>library</TitleText>
            <BookItemCard
              title={`you have ${booksToRead} book${booksToRead > 1 ? 's' : ''} to read`}
              description="more books more knowledge!"
              image={require('@assets/booksLibrary.png')}
              seeMoreButtonPress={() => navigation.navigate('BooksTab')}
            />
          </View>
          <TitleText>latest books added</TitleText>
          <ScrollView
            contentContainerClassName="gap-4"
            horizontal
            showsHorizontalScrollIndicator={false}>
            {books
              .reverse()
              .slice(0, 5)
              .map((book: BookProps, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('BookDetails', { book })}>
                    <Image source={{ uri: book.imageUrl }} className="h-48 w-36 rounded-xl" />
                  </TouchableOpacity>
                )
              })}
          </ScrollView>
        </View>
      </Container>
    </ScrollView>
  )
}

export default HomeScreen
