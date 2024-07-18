// Router.js
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import ChatScreen from "../pages/ChatScreen";

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default Router;
