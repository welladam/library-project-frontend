import { signUp } from '@api/auth'
import { Button, Input } from '@components/atoms'
import { showSuccessMessage } from '@helpers/handleAlerts'
import { handleApiErrors } from '@helpers/handleApiErrors'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text } from 'react-native'

const SignUpScreen = () => {
  const navigation = useNavigation<any>()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUpPress = async () => {
    try {
      setIsLoading(true)
      await signUp(email, password, fullName)
      showSuccessMessage('Account created!', 'Your account has been created successfully!')
      navigation.goBack()
    } catch (error: any) {
      handleApiErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="bg-background flex h-screen p-10">
      <Text className="mb-14 text-2xl font-bold">create account</Text>
      <Input
        icon={require('@assets/user.png')}
        placeholder="full name"
        value={fullName}
        onChangeText={setFullName}
      />
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
        <Button label="sign up" onPress={handleSignUpPress} isLoading={isLoading} />
      </View>
    </View>
  )
}

export default SignUpScreen
