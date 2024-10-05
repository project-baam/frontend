import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Platform, StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Router from "./src/router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
const queryClient = new QueryClient();
import * as Notifications from "expo-notifications";


// Expo Push Token 및 알림 권한 요청
export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "web") {
    console.log("Push notifications are not supported in web browsers");
    return null;
  }

  //   // Android 설정
  //   if (Platform.OS === "android") {
  //     await Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX
  //     });
  //   }

  let token;
  // const { status: existingStatus } = await Notifications.getPermissionsAsync();
  // let finalStatus = existingStatus;

  // if (existingStatus !== "granted") {
  //   const { status } = await Notifications.requestPermissionsAsync();
  //   finalStatus = status;
  // }

  // if (finalStatus !== "granted") {
  //   alert("푸시 알림 권한이 필요합니다.");
  //   return null;
  // }

  // try {
  //   token = (
  //     await Notifications.getExpoPushTokenAsync({
  //       projectId: "b24257a9-ac52-41e8-8902-e040723d4e63"
  //     })
  //   ).data;
  //   console.log("Expo Push Token:", token);
  // } catch (error) {
  //   console.error("Failed to get push token:", error);
  // }



  token = "hahaha";
  return token;
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          console.log("tokennnnnnnnnn: :", token);
          return AsyncStorage.setItem("pushToken", token);
        }
      })
      .then(() => {
        console.log("Push token saved successfully");
      })
      .catch((error) => console.error("Failed to get or save push token:", error));

    // const notificationListener = Notifications.addNotificationReceivedListener(notification => {
    //   console.log("Notification received:", notification);
    // });

    // const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log("Notification response:", response);
    // });

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener);
    //   Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={[backgroundStyle, styles.rootContainer]}>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </SafeAreaView>
    </QueryClientProvider>
  );
}
export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  }
});
