// Router.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import styled from "@emotion/native";
import FriendListScreen from "../pages/friends/FriendListScreen";
import ChatScreen from "../pages/ChatScreen";
import CalendarStackRouter from "./CalendarStackRouter";
import SettingStackRouter from "./SettingStackRouter";
import { HomeIcon, PinIcon, FriendsIcon, CalendarIcon, SettingIcon } from "../assets/assets";
import { Image, StyleSheet, View } from "react-native";
import EditMemoScreen from "../pages/memo/EditMemoScreen";
import FriendProfile from "../pages/friends/FriendProfile";
import MemoScreen2 from "../pages/memo/MemoScreen2";
import HomeScreen from "../pages/HomeScreen";
import SignUpStackRouter from "./SignUpStackRouter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthStore from "../store/UserAuthStore";
import LoadingOverlay from "../components/common/ui/LoadingOverlay";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
interface CustomTabBarProps {
  state: any;
  navigation: any;
}

const CustomTabBar = ({ state, navigation }: CustomTabBarProps) => {
  return (
    <TabBarContainer>
      {state.routes.map((route: any, index: number) => {
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
            case "Memo":
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
          <TabButton key={route.key} onTouchEnd={onPress}>
            <Image source={getIconSource()} style={[styles.icon, isFocused && styles.iconFocused]} />
          </TabButton>
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Memo" component={MemoScreen2} />
      <Tab.Screen name="Friends" component={FriendListScreen} />
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
const TabButton = styled(View)`
  flex: 1;
  align-items: center;
`;
const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
    tintColor: "white" // 비활성화된 아이콘의 색상
  },
  iconFocused: {
    tintColor: "#fff" // 활성화된 아이콘의 색상
  }
});

function Router() {
  const { setToken, setIsAuthenticated } = useAuthStore();
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("accessToken");

      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        AsyncStorage.setItem("accessToken", storedToken);
      }

      setTimeout(() => {
        setIsTryingLogin(false);
      }, 2500);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay />;
  }

  return <Navigation />;
}

function Navigation() {
  const { isAuthenticated } = useAuthStore();

  return !isAuthenticated ? <AuthStack /> : <AuthenticatedStack />;
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={SignUpStackRouter} />
    </Stack.Navigator>
  );
}

export function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={MyTabs} />
      <Stack.Screen name="SettingScreen" component={SettingStackRouter} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="CalendarScreen" component={CalendarStackRouter} />
      <Stack.Screen name="EditMemoScreen" component={EditMemoScreen} />
      <Stack.Screen name="FriendProfile" component={FriendProfile} />
    </Stack.Navigator>
  );
}

export default Router;
