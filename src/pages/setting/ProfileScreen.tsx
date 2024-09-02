import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, View, ImageBackground, Image, Text } from "react-native";
import SubtractIcon from "../../assets/images/icon_subtract.svg";
import Switch from "../../components/common/Switch";
import { SettingStackParamList } from "../../navigations/SettingStackNavigation";
import { useProfileStore } from "../../store/store";
import useUserStore from "../../store/UserStore";
import { Theme } from "../../styles/theme";
import ProfileInfoItem from "./ProfileInfoItem";

interface ProfileScreenProps {}

function ProfileScreen({}: ProfileScreenProps) {
  const { fullName, schoolName, grade, className, profileImage, backgroundImage } = useUserStore();
  const navigation = useNavigation<NavigationProp<SettingStackParamList>>();

  const profileInfo = [
    { label: "이름", value: fullName },
    { label: "학교", value: schoolName },
    { label: "학년 반", value: `${grade}학년 ${className}반` }
  ];

  const handleImagePress = () => {
    navigation.navigate("ImagePickerScreen");
  };

  return (
    <Container>
      <View>
        <ImageBackground
          source={profileImage ? { uri: profileImage } : { uri: "https://picsum.photos/400/400" }}
          imageStyle={{ borderRadius: 16, height: 220, marginTop: 8, marginBottom: 20 }}
          style={{}}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 230
          }}
        >
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
          <Text
            style={{
              position: "absolute",
              left: 35,
              top: 160,
              fontSize: 16,
              lineHeight: 20,
              fontWeight: "500",
              fontFamily: "Esamanru OTF",
              color: "#fff",
              textAlign: "left"
            }}
          >
            {schoolName}
          </Text>
          <Text
            style={{
              position: "absolute",
              left: 35,
              top: 184,
              fontSize: 16,
              lineHeight: 20,
              fontWeight: "500",
              fontFamily: "Esamanru OTF",
              color: "#fff",
              textAlign: "left"
            }}
          >
            {grade}학년 {className}반
          </Text>
        </View>
      </View>
      <TextContainer>
        {profileInfo.map((info, index) => (
          <ProfileInfoItem key={index} label={info.label} value={info.value} />
        ))}
        <AlertContainer>
          <AlertInnerContainer>
            <AlertText>계정 공개 여부</AlertText>
            <AlertDescription>나의 반 정보와 시간표를 모두에게 공개합니다</AlertDescription>
          </AlertInnerContainer>
          <Switch isSwitchOn={true} onToggle={() => {}} />
        </AlertContainer>
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
const AlertInnerContainer = styled.View`
  gap: 8px;
`;

const AlertText = styled.Text`
  font-size: 16px;
  font-weight: 400;
`;
const AlertDescription = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: #7c7c7c;
`;
const AlertContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
`;
