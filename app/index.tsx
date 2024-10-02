import { AuthProvider } from '@context/useAuth'
import { BooksProvider } from '@context/useBooks'
import AppNavigator from '@navigation/AppNavigator'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import '../global.css'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [fontsLoaded] = useFonts({
    'ConcertOne-Regular': require('@assets/fonts/ConcertOne-Regular.ttf'),
    'Dosis-Regular': require('@assets/fonts/Dosis-Regular.ttf'),
    'Dosis-Bold': require('@assets/fonts/Dosis-Bold.ttf'),
    'Dosis-SemiBold': require('@assets/fonts/Dosis-SemiBold.ttf'),
  })

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync()
        setTimeout(async () => setAppIsReady(true), 2000)
      }
    }

    hideSplashScreen()
  }, [fontsLoaded])

  if (!appIsReady) {
    return <Image source={require('@assets/splashImage.png')} className="h-full w-full" />
  }

  return (
    <AuthProvider>
      <BooksProvider>
        <AppNavigator />
      </BooksProvider>
    </AuthProvider>
  )
}
