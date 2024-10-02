import { getBooks } from '@api/book'
import { Button, Container, Input, TitleText } from '@components'
import BookItemCard, { BookProps } from '@components/molecules/BookItemCard'
import { useBooks } from '@context/useBooks'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'

type ParamList = {
  params: {
    forceRefresh: boolean
  }
}

const BooksScreen = () => {
  const route = useRoute<RouteProp<ParamList>>()
  const navigation = useNavigation<any>()
  const { books, updateBooks } = useBooks()
  const [booksFiltered, setBooksFiltered] = useState<BookProps[]>([])
  const [searchField, setSearchField] = useState('')
  const [alreadyReadCheckbox, setAlreadyReadCheckbox] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const fetchBooks = async () => {
    setIsLoading(true)
    const result = await getBooks()
    updateBooks(result)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchBooks()
  }, [route.params?.forceRefresh])

  const onRefresh = useCallback(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    const currentBooksFiltered = books
      .filter(
        (book) =>
          book.author.includes(searchField.toLowerCase()) ||
          book.title.includes(searchField.toLowerCase())
      )
      .filter((book) => (alreadyReadCheckbox ? book.status === true : true))
      .sort((a, b) => {
        return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      })
    setBooksFiltered(currentBooksFiltered)
  }, [books, searchField, alreadyReadCheckbox])

  return (
    <Container className="relative flex gap-4">
      <Button
        className="absolute bottom-6 right-6 z-20"
        label="add book"
        onPress={() => navigation.navigate('AddBook')}
      />
      <Input
        placeholder="search..."
        icon={require('@assets/search.png')}
        onChangeText={setSearchField}
      />
      <View className="w-full flex-1 items-start">
        <Button
          label="already read"
          type="checkbox"
          isChecked={alreadyReadCheckbox}
          borderType="borderStyle"
          onPress={() => setAlreadyReadCheckbox(!alreadyReadCheckbox)}
        />
        <TitleText className="mb-2 mt-4">books</TitleText>
        <ScrollView
          className="h-full w-full"
          contentContainerClassName="gap-5"
          showsVerticalScrollIndicator={false}
          contentInset={{ bottom: 100 }}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}>
          {booksFiltered.map((book: BookProps, index: number) => {
            return (
              <BookItemCard
                key={index}
                book={book}
                onBookCardPress={(book) => navigation.navigate('BookDetails', { book })}
              />
            )
          })}
        </ScrollView>
      </View>
    </Container>
  )
}

export default BooksScreen
