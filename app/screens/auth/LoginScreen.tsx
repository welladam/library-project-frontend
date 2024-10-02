import { login } from '@api/auth'
import { BodyText, Button, Input } from '@components/atoms'
import { useAuth } from '@context/useAuth'
import { handleApiErrors } from '@helpers/handleApiErrors'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const LoginScreen = () => {
  const navigation = useNavigation<any>()
  const { userLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSingUpPress = () => {
    navigation.navigate('SignUp')
  }

  const handleLoginPress = async () => {
    try {
      setIsLoading(true)
      await login(email, password)
      userLogin()
    } catch (error: any) {
      handleApiErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="bg-background flex h-screen p-10">
      <Text className="mb-14 text-2xl font-bold">welcome!</Text>
      <Input
        icon={require('@assets/email.png')}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        icon={require('@assets/lock.png')}
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View className="mt-32">
        <Button label="log in" onPress={handleLoginPress} isLoading={isLoading} />
        <View className="mt-2 flex-row justify-center">
          <BodyText className="text-tenne">don't have an account? </BodyText>
          <TouchableOpacity onPress={handleSingUpPress}>
            <BodyText className="font-body-semi text-white">sign up</BodyText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen
