import BooksTabBarMask from '@assets/backgroundTabBarBooks.svg'
import HomeTabBarMask from '@assets/backgroundTabBarHome.svg'
import ProfileTabBarMask from '@assets/backgroundTabBarProfile.svg'
import { TabRouteNames } from '@routeTypes'
import { ReactNode } from 'react'
import { TouchableOpacity, View, Image, ImageSourcePropType } from 'react-native'

const routesIcons: Record<
  TabRouteNames,
  { icon: ImageSourcePropType; iconFocused: ImageSourcePropType; background: ReactNode }
> = {
  HomeTab: {
    icon: require('@assets/homeIcon.png'),
    iconFocused: require('@assets/homeIconFocused.png'),
    background: <HomeTabBarMask />,
  },
  BooksTab: {
    icon: require('@assets/saveIcon.png'),
    iconFocused: require('@assets/saveIconFocused.png'),
    background: <BooksTabBarMask />,
  },
  ProfileTab: {
    icon: require('@assets/userIcon.png'),
    iconFocused: require('@assets/userIconFocused.png'),
    background: <ProfileTabBarMask />,
  },
}

const CustomTabBar = ({ state, navigation }: any) => {
  const focusedRoute = state.routes[state.index].name
  return (
    <View className="mb-4 bg-white">
      <View className="shadow-custom absolute bottom-0 left-4 w-full">
        {routesIcons[focusedRoute as TabRouteNames].background}
      </View>

      <View className="h-16 flex-row items-center justify-center gap-8 bg-transparent">
        {state.routes.map((route: any, index: number) => {
          const routeIcon = routesIcons[route.name as TabRouteNames]
          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              className="w-20 items-center justify-center">
              <Image
                source={isFocused ? routeIcon.iconFocused : routeIcon.icon}
                className="h-8 w-8"
              />
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default CustomTabBar
