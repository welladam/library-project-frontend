import React from 'react'
import { View, TextInput, Image, TextInputProps, ImageSourcePropType } from 'react-native'

interface InputProps extends TextInputProps {
  icon?: ImageSourcePropType
  multiline?: boolean
}

const Input = ({ icon, multiline, ...props }: InputProps) => {
  return (
    <View
      className={`border-secondary mb-4 flex-row items-center gap-3 rounded-2xl border bg-white p-3 ${multiline && 'h-32'}`}>
      {icon && <Image source={icon} className="h-6 w-6" />}
      <TextInput
        className="font-body placeholder:text-tenne/40 w-full !text-xl !leading-6"
        multiline={multiline}
        {...props}
      />
    </View>
  )
}

export default Input
