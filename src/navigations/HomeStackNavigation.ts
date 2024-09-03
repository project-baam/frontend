import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type HomeStackParamList = {
  HomeScreen: undefined;
  AddTimeTableScreen: undefined;
  AddTimeTableDetailScreen: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, "HomeScreen">;
export type AddTimeTableScreenRouteProp = RouteProp<HomeStackParamList, "AddTimeTableScreen">;
