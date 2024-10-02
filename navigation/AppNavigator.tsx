import {
  LoginScreen,
  SignUpScreen,
  HomeScreen,
  BooksScreen,
  ProfileScreen,
  AddBookScreen,
  BookDetailsScreen,
} from '@app/screens'
import { CustomHeader, CustomTabBar } from '@components/molecules'
import { useAuth } from '@context/useAuth'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TabRouteNames } from '@routeTypes'
import React from 'react'
import FlashMessage from 'react-native-flash-message'

const AuthStack = createNativeStackNavigator()
const MainStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ header: () => <CustomHeader title="" backgroundColor="bg-background" /> }}
      />
    </AuthStack.Navigator>
  )
}

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={TabStackNavigator}
        options={{ headerShown: false, contentStyle: { backgroundColor: 'white' } }}
      />
      <MainStack.Screen
        name="AddBook"
        component={AddBookScreen}
        options={{
          header: () => <CustomHeader title="add new book" backgroundColor="bg-background" />,
        }}
      />
      <MainStack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
        options={{ header: () => <CustomHeader title="" backgroundColor="bg-background" /> }}
      />
    </MainStack.Navigator>
  )
}

const TabStackNavigator = () => {
  const routeNames = { HomeTab: 'home', BooksTab: 'my books', ProfileTab: 'profile' }
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        header: (props) => (
          <CustomHeader
            title={routeNames[props.route.name as TabRouteNames]}
            showBackButton={false}
          />
        ),
      }}>
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="BooksTab" component={BooksScreen} />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          header: () => (
            <CustomHeader title="profile" backgroundColor="bg-background" showBackButton={false} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const AppNavigator = () => {
  const { isAuthenticated } = useAuth()

  return (
    <NavigationContainer independent>
      <FlashMessage duration={3000} />
      {isAuthenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

export default AppNavigator
