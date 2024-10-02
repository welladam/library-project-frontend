import React from 'react'
import { Text } from 'react-native'

interface TitleTextProps {
  children: React.ReactNode
  className?: string
}

const TitleText = ({ children, className }: TitleTextProps) => {
  return <Text className={`font-heading text-2xl ${className}`}>{children}</Text>
}

export default TitleText
