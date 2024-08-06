// Router.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import styled from "@emotion/native";
import ChatScreen from "../pages/ChatScreen";
import CalendarStackRouter from "./CalendarStackRouter";
import SettingStackRouter from "./SettingStackRouter";
import { HomeIcon, PinIcon, FriendsIcon, CalendarIcon, SettingIcon } from "../assets/assets";
import { Image, StyleSheet, View } from "react-native";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}
const CustomTabBar = ({ state, descriptors, navigation }: CustomTabBarProps) => {
  return (
    <TabBarContainer>
      {state.routes.map((route: any, index: number) => {
        // const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIconSource = () => {
          switch (route.name) {
            case "Home":
              return isFocused
                ? HomeIcon // 아이콘의 활성화된 상태
                : HomeIcon; // 아이콘의 비활성화된 상태
            case "Pin":
              return isFocused ? PinIcon : PinIcon;
            case "Friends":
              return isFocused ? FriendsIcon : FriendsIcon;
            case "Calendar":
              return isFocused ? CalendarIcon : CalendarIcon;
            case "Setting":
              return isFocused ? SettingIcon : SettingIcon;
            default:
              return null;
          }
        };

        return (
          <View key={route.key} style={styles.tabButton} onTouchEnd={onPress}>
            <Image source={getIconSource()} style={[styles.icon, isFocused && styles.iconFocused]} />
          </View>
        );
      })}
    </TabBarContainer>
  );
};

export const MyTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="Home" component={ChatScreen} />
      <Tab.Screen name="Pin" component={ChatScreen} />
      <Tab.Screen name="Friends" component={ChatScreen} />
      <Tab.Screen name="Calendar" component={CalendarStackRouter} />
      <Tab.Screen name="Setting" component={SettingStackRouter} />
    </Tab.Navigator>
  );
};
const TabBarContainer = styled(View)`
  flex-direction: row;
  width: 328px;
  height: 56px;
  background-color: #333;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;
const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: "center"
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: "white" // 비활성화된 아이콘의 색상
  },
  iconFocused: {
    tintColor: "#fff" // 활성화된 아이콘의 색상
  }
});
const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={MyTabs} />
      <Stack.Screen name="SettingScreen" component={SettingStackRouter} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="CalendarScreen" component={CalendarStackRouter} />
    </Stack.Navigator>
  );
};

export default Router;
