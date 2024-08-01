import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import SubtractIcon from "../../assets/images/icon_subtract.svg";
import { SettingStackParamList } from "../../navigations/SettingStackNavigation";
import { useProfileStore } from "../../store/store";
import { Theme } from "../../styles/theme";
import ProfileInfoItem from "./ProfileInfoItem";

interface ProfileScreenProps {}

function ProfileScreen({}: ProfileScreenProps) {
  const { name, school, grade, class: classValue, profileImage } = useProfileStore();
  const navigation = useNavigation<NavigationProp<SettingStackParamList>>();

  const profileInfo = [
    { label: "이름", value: name },
    { label: "학교", value: school },
    { label: "학년 반", value: `${grade} ${classValue}` }
  ];

  const handleImagePress = () => {
    navigation.navigate("ImagePickerScreen");
  };

  return (
    <Container>
      <ProfileImageContainer>
        <Pressable
          style={{ width: 80, height: 80, alignItems: "center", position: "relative" }}
          onPress={handleImagePress}
        >
          <ProfileImage
            source={profileImage ? { uri: profileImage } : require("../../assets/images/dummyprofile.png")}
          />
          <IconContainer>
            <SubtractIcon />
          </IconContainer>
        </Pressable>
      </ProfileImageContainer>
      <TextContainer>
        {profileInfo.map((info, index) => (
          <ProfileInfoItem key={index} label={info.label} value={info.value} />
        ))}
      </TextContainer>
    </Container>
  );
}

export default ProfileScreen;

const Container = styled.View`
  background-color: ${Theme.colors.White};
  flex: 1;
  padding: 0px 16px;
  padding-top: 32px;
  gap: 24px;
`;

const ProfileImageContainer = styled.View`
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const IconContainer = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: ${Theme.colors.White};
  border-radius: 9999px;
  border-width: 2px;
  border-color: ${Theme.colors.White};
`;

const TextContainer = styled.View`
  gap: 44px;
`;
