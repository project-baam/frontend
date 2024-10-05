// Router.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import styled from "@emotion/native";
import FriendListScreen from "../pages/friends/FriendListScreen";
import CalendarStackRouter from "./CalendarStackRouter";
import MemoStackRouter from "./MemoStackRouter";
import SettingStackRouter from "./SettingStackRouter";
import { HomeIcon, PinIcon, FriendsIcon, CalendarIcon, SettingIcon } from "../assets/assets";
import { Image, StyleSheet, View } from "react-native";
import FriendProfile from "../pages/friends/FriendProfile";
import SignUpStackRouter from "./SignUpStackRouter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthStore from "../store/UserAuthStore";
import LoadingOverlay from "../components/common/ui/LoadingOverlay";
import HomeStackRouter from "./HomeStackRouter";
import axios from "axios";
import FriendsStackRouter from "./FriendsStackRouter";
import NotificationStackRouter from "./NotificationStackRouter";
import { registerDeviceToken } from "@/apis/notification/notification-device.apis";
import { getDeviceType, getOSType } from "@/utils/PushNotificationUtil";

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
      <Tab.Screen name="Home" component={HomeStackRouter} />
      <Tab.Screen name="Memo" component={MemoStackRouter} />
      <Tab.Screen name="Friends" component={FriendsStackRouter} />
      <Tab.Screen name="Calendar" component={CalendarStackRouter} />
      <Tab.Screen name="Setting" component={SettingStackRouter} options={{ unmountOnBlur: true }} />
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
  const { setToken, setIsAuthenticated, setRefreshToken } = useAuthStore();
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("refreshToken");

      if (storedToken) {
        axios
          .post(
            "https://b-site.site/authentication/refresh-tokens",
            {
              refreshToken: storedToken
            },
            {
              headers: {
                accept: "application/json",
                "Content-Type": "application/json"
              }
            }
          )
          .then((response) => {
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;
            AsyncStorage.setItem("refreshToken", refreshToken);
            AsyncStorage.setItem("accessToken", accessToken);

            setRefreshToken(refreshToken);
            setToken(accessToken);
            setIsAuthenticated(true);

            // 푸시 토큰 등록
            AsyncStorage.getItem("pushToken").then((pushToken: string | null) => {
              if (pushToken) {
                console.log("getDeviceType: ", getDeviceType());
                console.log("getOSType: ", getOSType());
                console.log("pushToken: ", pushToken);
                registerDeviceToken({
                  deviceToken: pushToken,
                  deviceType: getDeviceType(),
                  osType: getOSType()
                })
                  .then(() => console.log("Push token registered successfully"))
                  .catch((error) => console.error("Error registering push token:", error));
              }
            });
          })
          .catch((error) => {
            console.error(error);
          });
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
      {/* <Stack.Screen name="FriendProfile" component={FriendProfile} /> */}
      <Stack.Screen name="Notification" component={NotificationStackRouter} />
    </Stack.Navigator>
  );
}

export default Router;
