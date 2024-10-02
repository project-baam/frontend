import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Router from "./src/router/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const {
        notification: {
          request: {
            content: { data }
          }
        }
      } = response;
    });

    return () => subscription.remove();
  }, []);

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
