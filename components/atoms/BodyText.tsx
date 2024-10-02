import React from 'react'
import { Text } from 'react-native'

interface BodyTextProps {
  children: React.ReactNode
  className?: string
}

const BodyText = ({ children, className }: BodyTextProps) => {
  return <Text className={`${className} font-body text-xl`}>{children}</Text>
}

export default BodyText
