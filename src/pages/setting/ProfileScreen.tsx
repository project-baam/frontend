import styled from "@emotion/native";
import React, { useState } from "react";
import { Pressable, View, ImageBackground, Image, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-crop-picker";
import Switch from "../../components/common/Switch";
import { White } from "../../assets/assets";
import ProfileInfoItem from "./ProfileInfoItem";
import { VectorLeft, PencilImg } from "../../assets/assets";
import axios from "axios";
import useAuthStore from "../../store/UserAuthStore";
import { Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { StackScreenProps } from "@react-navigation/stack";
import { SettingStackParamList } from "../../navigations/SettingStackNavigation";
// fullName,schoolName,grade,className, isTimetablePublic,isClassPublic
type ProfileScreenProps = StackScreenProps<SettingStackParamList, "ProfileScreen">;

function ProfileScreen({ navigation, route }: ProfileScreenProps) {
  const [localProfileImage, setLocalProfileImage] = useState<string | null>(route.params.profileImageUrl || "");
  const [localBackgroundImage, setLocalBackgroundImage] = useState<string | null>(
    route.params.backgroundImageUrl || ""
  );
  const [isTT, setIsTT] = useState<boolean>(route.params.isTimetablePublic || false);
  const [isCP, setIsCP] = useState<boolean>(route.params.isClassPublic || false);
  const {
    fullName,
    schoolName,
    grade,
    className,
    schoolId,
    isTimetablePublic,
    isClassPublic,
    profileImageUrl,
    backgroundImageUrl
  } = route.params;
  const { token } = useAuthStore();
  const getPhotos = async (chooseType: string) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      includeBase64: true
    }).then((image) => {
      console.log("이미지", image);
      // const image_bytes = Buffer.from(image.path, "base64");
      if (chooseType === "profile") {
        setLocalProfileImage(image.path);
        updateUserProfileImages(image.path, undefined);
      } else {
        setLocalBackgroundImage(image.path);
        updateUserProfileImages(undefined, image.path);
      }
    });
  };
  const handleChoosePhoto = async (chooseType: string) => {
    try {
      const response = await launchImageLibrary({ mediaType: "photo" });
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.error("ImagePicker Error: ", response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        console.log("에셋 : ", response.assets);
        if (asset.uri) {
          console.log("Image URI: ", asset.uri);
          if (chooseType === "profile") {
            setLocalProfileImage(asset.uri);
            await updateUserProfileImages(asset.uri, undefined);
          } else {
            setLocalBackgroundImage(asset.uri);
            await updateUserProfileImages(undefined, asset.uri);
          }
        } else {
          console.error("Image URI is undefined");
        }
      } else {
        console.log("No image selected");
      }
    } catch (error) {
      console.error("Error choosing photo:", error);
    }
  };

  const profileInfo = [
    { label: "이름", value: fullName },
    { label: "학교", value: schoolName },
    { label: "학년 반", value: `${grade}학년 ${className}반` }
  ];

  const updateUserProfileImages = async (profileImage?: any, backgroundImage?: any) => {
    // console.log("update 진입", profileImage, "   ", backgroundImage);

    // 이미지를 Base64로 변환하는 함수
    // const convertToBase64 = async (uri: string) => {
    //   const newUri = uri.replace("file:", "");
    //   try {
    //     const base64Data = await RNFetchBlob.fs.readFile(newUri, "base64");
    //     return base64Data; // 변환된 Base64 문자열 반환
    //   } catch (error) {
    //     console.error("Error reading file: ", error);
    //   }
    // };

    // 이미지 파일 추가
    let payload: any = {};

    if (profileImage) {
      const base64ProfileImage = await profileImage;
      payload.profileImage = base64ProfileImage; // Base64 문자열 추가
    }

    if (backgroundImage) {
      const base64BackgroundImage = await backgroundImage;
      payload.backgroundImage = base64BackgroundImage; // Base64 문자열 추가
    }

    try {
      console.log("payload", payload);
      const response = await axios.patch("https://b-site.site/user", payload, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}` // 실제 토큰으로 교체
        }
      });

      console.log("Profile images updated successfully:", response.data);
    } catch (error: any) {
      console.error("Error updating profile images:", error.response ? error.response.data : error.message);
    }
  };
  const handleImagePress = () => {
    navigation.navigate("ImagePickerScreen");
  };
  const handleSave = () => {
    if (localProfileImage) {
      // setProfileImage(localProfileImage);
    }
    navigation.goBack();
  };

  const handleToggleTT = async () => {
    try {
      const param = {
        isTimetablePublic: isTT ? "false" : "true"
      };
      const url = "https://b-site.site/user";

      await axios.patch(
        url, // 쿼리 파라미터 포함된 URL
        param, // PATCH 요청 시 body가 필요 없으므로 빈 객체
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}` // 실제 토큰으로 교체
          }
        }
      );

      setIsTT(!isTT); // 알림 설정 상태 토글
    } catch (error: any) {
      console.error("Error alarm setting:", error.response ? error.response.data : error.message);
    }
  };

  const handleToggleCP = async () => {
    try {
      const param = {
        isClassPublic: isCP ? "false" : "true"
      };
      const url = "https://b-site.site/user";

      await axios.patch(
        url, // 쿼리 파라미터 포함된 URL
        param, // PATCH 요청 시 body가 필요 없으므로 빈 객체
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}` // 실제 토큰으로 교체
          }
        }
      );

      setIsCP(!isCP); // 알림 설정 상태 토글
    } catch (error: any) {
      console.error("Error alarm setting:", error.response ? error.response.data : error.message);
    }
  };
  return (
    <Container>
      <Header style={{ zIndex: 2 }}>
        <BackButton onPress={() => navigation.goBack()}>
          <BackIcon source={VectorLeft} />
        </BackButton>
        <Text
          style={{
            fontSize: 18,
            lineHeight: 26,
            fontWeight: "600",
            fontFamily: "Pretendard",
            color: "#262626",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 272,
            height: 28
          }}
        >
          내 프로필
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProfileEditScreen", {
              fullName: fullName,
              schoolId: schoolId,
              schoolName: schoolName,
              grade: grade,
              className: className
            })
          }
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 18,
              fontWeight: "500",
              fontFamily: "Pretendard",
              color: "#262626",
              textAlign: "right"
            }}
          >
            수정
          </Text>
        </TouchableOpacity>
      </Header>
      <View style={{ marginHorizontal: 16 }}>
        <ImageBackground
          source={localBackgroundImage ? { uri: localBackgroundImage } : White}
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
            onPress={() => getPhotos("profile")}
          >
            <ProfileImage
              source={localProfileImage ? { uri: localProfileImage } : require("../../assets/images/dummyprofile.png")}
            />
            <IconContainer>
              <Image source={PencilImg} style={{ width: 32, height: 32 }} />
            </IconContainer>
          </Pressable>
          <Text
            style={{
              position: "absolute",
              left: 20,
              top: 164,
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
              left: 20,
              top: 190,
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

          <TouchableOpacity
            onPress={() => getPhotos("background")}
            style={{ position: "absolute", right: 20, bottom: 20, zIndex: 1, borderRadius: 1000 }}
          >
            <Image source={PencilImg} style={{ width: 32, height: 32 }} />
          </TouchableOpacity>
        </View>

        <TextContainer>
          {profileInfo.map((info, index) => (
            <ProfileInfoItem key={index} label={info.label} value={info.value} />
          ))}
          <AlertContainer>
            <AlertInnerContainer>
              <AlertText>시간표 공개 여부</AlertText>
              <AlertDescription>나의 시간표를 모두에게 공개합니다</AlertDescription>
            </AlertInnerContainer>

            <Switch isSwitchOn={isTT} onToggle={handleToggleTT} />
          </AlertContainer>
          <AlertContainer>
            <AlertInnerContainer>
              <AlertText>학급정보 공개 여부</AlertText>
              <AlertDescription>나의 학급정보를 모두에게 공개합니다</AlertDescription>
            </AlertInnerContainer>

            <Switch isSwitchOn={isCP} onToggle={handleToggleCP} />
          </AlertContainer>
        </TextContainer>
      </View>
    </Container>
  );
}

export default ProfileScreen;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
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
  border-radius: 1000px;
`;

const TextContainer = styled.View`
  margin-top: 43px;
  gap: 40px;
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
const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 10px;
  padding-horizontal: 16px;
`;
const BackButton = styled(TouchableOpacity)`
  padding: 10px;
`;

const BackIcon = styled(Image)`
  width: 8.5px;
  height: 15px;
`;
