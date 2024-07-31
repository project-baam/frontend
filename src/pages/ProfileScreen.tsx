import React from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "../styles/theme";

interface ProfileScreenProps {}

function ProfileScreen({}: ProfileScreenProps) {
  return <View style={{ backgroundColor: Theme.colors.White, flex: 1 }}></View>;
}

const styles = StyleSheet.create({});

export default ProfileScreen;
