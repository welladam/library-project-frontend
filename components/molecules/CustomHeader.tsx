import { BodyText } from '@components/atoms'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'

interface CustomHeaderProps {
  title: string
  showBackButton?: boolean
  backgroundColor?: string
}

const CustomHeader = ({
  title,
  showBackButton = true,
  backgroundColor = 'bg-white',
}: CustomHeaderProps) => {
  const navigation = useNavigation()
  return (
    <View className={`flex-row items-center justify-between px-4 py-2 ${backgroundColor}`}>
      {showBackButton ? (
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Image source={require('@assets/arrowLeft.png')} className="h-6 w-6" />
        </TouchableOpacity>
      ) : (
        <View className="h-10 w-4" />
      )}
      <BodyText className="!text-2xl">{title}</BodyText>
      {showBackButton ? <View className="w-6" /> : <View />}
    </View>
  )
}

export default CustomHeader
