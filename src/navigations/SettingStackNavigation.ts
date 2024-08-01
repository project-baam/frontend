import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type SettingStackParamList = {
  SettingHomeScreen: undefined;
  TermsOfServiceScreen: undefined;
  ProfileScreen: undefined;
  ProfileEditScreen: { school?: string };
  SchoolSearchScreen: undefined;
};

export type SettingHomeScreenNavigationProp = NativeStackNavigationProp<SettingStackParamList, "SettingHomeScreen">;
export type SettingHomeScreenRouteProp = RouteProp<SettingStackParamList, "SettingHomeScreen">;
export type ProfileEditScreenRouteProp = RouteProp<SettingStackParamList, "ProfileEditScreen">;
export type SchoolSearchScreenRouteProp = RouteProp<SettingStackParamList, "SchoolSearchScreen">;
