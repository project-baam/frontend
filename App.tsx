import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Router from "./src/router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import messaging from "@react-native-firebase/messaging";

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
    getFcmToken();
    subscribe();
    return () => {
      subscribe();
    };
  }, []);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log("[+] FCM Token :: ", fcmToken);
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
