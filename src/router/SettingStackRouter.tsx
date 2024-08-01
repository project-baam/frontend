import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, Pressable, Text } from "react-native";
import { SettingStackParamList } from "../navigations/SettingStackNavigation";
import ProfileEditScreen from "../pages/setting/ProfileEditScreen";
import ProfileScreen from "../pages/setting/ProfileScreen";
import SchoolSearchScreen from "../pages/setting/SchoolSearchScreen";
import SettingHomeScreen from "../pages/setting/SettingHomeScreen";
import TermsOfServiceScreen from "../pages/setting/TermsOfServiceScreen";
import { Theme } from "../styles/theme";

const Stack = createNativeStackNavigator<SettingStackParamList>();

const SettingStackRouter = () => {
  const navigation = useNavigation<NavigationProp<SettingStackParamList>>();

  const navigateToProfileEditScreen = (school?: string) => {
    navigation.navigate("ProfileEditScreen", { school });
  };

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
            <Pressable onPress={() => navigateToProfileEditScreen()}>
              <Text>수정</Text>
            </Pressable>
          )
        }}
      />
      <Stack.Screen name="SchoolSearchScreen" component={SchoolSearchScreen} options={{ headerTitle: "학교 검색" }} />
      <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} options={{ headerTitle: "내 정보 수정" }} />
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
