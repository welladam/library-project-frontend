import React from 'react'
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import BodyText from './BodyText'

interface ButtonProps extends TouchableOpacityProps {
  label: string
  isLoading?: boolean
  type?: 'default' | 'checkbox'
  isChecked?: boolean
  borderType?: 'default' | 'borderStyle'
  className?: string
}

const Button = ({
  label,
  isLoading,
  borderType = 'default',
  type = 'default',
  isChecked,
  className,
  ...props
}: ButtonProps) => {
  const typeStyle =
    type === 'default'
      ? 'bg-primary shadow-custom'
      : isChecked
        ? 'bg-primary'
        : 'bg-white border border-primary'
  const typeTextStyle = type === 'checkbox' && !isChecked ? 'text-primary' : 'text-white'
  const borderTypeStyle =
    borderType === 'default' ? 'rounded-2xl px-6 py-2' : 'rounded-bl-3xl rounded-tr-3xl px-5 py-1'
  return (
    <TouchableOpacity
      disabled={isLoading}
      className={`${className} items-center justify-center ${typeStyle} ${borderTypeStyle}`}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <BodyText className={`font-body-semi ${typeTextStyle}`}>{label}</BodyText>
      )}
    </TouchableOpacity>
  )
}

export default Button
