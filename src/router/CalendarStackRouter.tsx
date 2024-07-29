import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, Pressable } from "react-native";
import CalendarAddScreen from "../pages/CalendarAddScreen";
import CalendarHomeScreen from "../pages/CalendarHomeScreen";
import { Theme } from "../styles/theme";
import { CalendarStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<CalendarStackParamList>();

const CalendarStackRouter = () => {
  const navigation = useNavigation<NavigationProp<CalendarStackParamList>>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.Gray100
        },
        headerTitleStyle: {
          fontFamily: "YourCustomFont",
          fontSize: 18,
          fontWeight: "500"
        },
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <CustomImage source={require("../assets/images/btn_left.png")} />
          </Pressable>
        )
      }}
    >
      <Stack.Screen name="CalendarHomeScreen" component={CalendarHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="CalendarAddScreen"
        component={CalendarAddScreen}
        options={{
          headerTitle: "일정 추가"
        }}
      />
    </Stack.Navigator>
  );
};

export default CalendarStackRouter;

const CustomImage = styled(Image)`
  width: 32px;
  height: 32px;
`;
