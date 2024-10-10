import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Router from "./src/router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEVICE_PUSH_TOKEN_KEY } from "./src/constants/async-storage-keys";

// 백그라운드 메시지 핸들러
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("[+] Background message handled: ", remoteMessage);
});

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  // 알림 권한 요청
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  requestUserPermission();

  useEffect(() => {
    getDevicePushToken();
    return subscribe;
  }, []);

  const getDevicePushToken = async () => {
    const token = await messaging().getToken();
    console.log("[+] Device Push Token: ", token);
    if (token) {
      await AsyncStorage.setItem(DEVICE_PUSH_TOKEN_KEY, token);
    }
  };

  /**
   * FCM 메시지를 앱이 foreground 상태일 경우 메시지를 수신
   */
  const subscribe = messaging().onMessage(async (remoteMessage) => {
    console.log("[+] Remote Message ", JSON.stringify(remoteMessage));
  });

  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

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
