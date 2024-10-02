import { BookProps } from '@components/molecules/BookItemCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react'

interface BooksContextProps {
  books: BookProps[]
  updateBooks: (newBooks: BookProps[]) => void
}

const BooksContext = createContext<BooksContextProps | null>(null)

interface BooksProviderProps {
  children: ReactNode
}

export const BooksProvider = ({ children }: BooksProviderProps) => {
  const [books, setBooks] = useState<BookProps[]>([])

  const loadBooks = async () => {
    const storedBooks = await AsyncStorage.getItem('books')
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks))
    }
  }

  const updateBooks = async (newBooks: BookProps[]) => {
    setBooks(newBooks)
    await AsyncStorage.setItem('books', JSON.stringify(newBooks))
  }

  useEffect(() => {
    loadBooks()
  }, [])

  return <BooksContext.Provider value={{ books, updateBooks }}>{children}</BooksContext.Provider>
}

export const useBooks = (): BooksContextProps => {
  const context = useContext(BooksContext)
  if (!context) {
    throw new Error('useBooks must be used within an BooksProvider')
  }
  return context
}
