import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, Pressable } from "react-native";
import RightArrow from "../assets/images/btn_right.svg";
import ProfileScreen from "../pages/ProfileScreen";
import SettingHomeScreen from "../pages/SettingHomeScreen";
import TermsOfServiceScreen from "../pages/TermsOfServiceScreen";
import { Theme } from "../styles/theme";
import { SettingStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<SettingStackParamList>();

const SettingStackRouter = () => {
  const navigation = useNavigation<NavigationProp<SettingStackParamList>>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.colors.White
        },
        headerTitleStyle: {
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
      <Stack.Screen name="SettingHomeScreen" component={SettingHomeScreen} options={{ headerTitle: "설정" }} />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerTitle: "내 프로필",
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("SettingHomeScreen")}>
              <RightArrow />
            </Pressable>
          )
        }}
      />
      <Stack.Screen
        name="TermsOfServiceScreen"
        component={TermsOfServiceScreen}
        options={{ headerTitle: "개인정보 처리 방침" }}
      />
    </Stack.Navigator>
  );
};

export default SettingStackRouter;

const CustomImage = styled(Image)`
  width: 32px;
  height: 32px;
`;
