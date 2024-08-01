import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useProfileStore } from "../../store/store";
import { Theme } from "../../styles/theme";

interface ProfileScreenProps {}

const ProfileInfoItem = ({ label, value }: { label: string; value: string }) => (
  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
    <Text style={styles.labelText}>{label}</Text>
    <Text style={styles.valueText}>{value}</Text>
  </View>
);

function ProfileScreen({}: ProfileScreenProps) {
  const { name, school, grade, class: classValue } = useProfileStore();

  const profileInfo = [
    { label: "이름", value: name },
    { label: "학교", value: school },
    { label: "학년 반", value: `${grade} ${classValue}` }
  ];

  return (
    <View style={{ backgroundColor: Theme.colors.White, flex: 1, paddingHorizontal: 16, paddingTop: 32, gap: 24 }}>
      <Pressable style={{ alignItems: "center" }}>
        <Image source={require("../../assets/images/default_photo.png")} style={{ width: 80, height: 80 }} />
      </Pressable>
      <View style={styles.textContainer}>
        {profileInfo.map((info, index) => (
          <ProfileInfoItem key={index} label={info.label} value={info.value} />
        ))}
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  textContainer: {
    gap: 44
  },
  labelText: {
    fontSize: 18,
    fontWeight: "600",
    color: Theme.colors.Gray700
  },
  valueText: {
    fontSize: 16,
    color: Theme.colors.Gray800
  }
});
