import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Agenda } from "./agenda";

export type CalendarStackParamList = {
  CalendarHomeScreen: undefined;
  CalendarAddScreen: { item?: Agenda };
};

export type CalendarAddScreenNavigationProp = NativeStackNavigationProp<CalendarStackParamList, "CalendarAddScreen">;

export type CalendarAddScreenRouteProp = RouteProp<CalendarStackParamList, "CalendarAddScreen">;

export type SettingStackParamList = {
  SettingHomeScreen: undefined;
  TermsOfServiceScreen: undefined;
  ProfileScreen: undefined;
};

export type SettingHomeScreenNavigationProp = NativeStackNavigationProp<SettingStackParamList, "SettingHomeScreen">;

export type SettingHomeScreenRouteProp = RouteProp<SettingStackParamList, "SettingHomeScreen">;
