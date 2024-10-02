import { View } from 'react-native'

interface ContainerProps {
  className?: string
  children: React.ReactNode
}

const Container = ({ children, className }: ContainerProps) => {
  return <View className={`flex h-full w-full bg-white p-4 ${className}`}>{children}</View>
}

export default Container
