import { Image, Pressable, Text } from "react-native";
import * as S from "./styles";
import { AnimatedLogoImage, AppleImg, KakaoImg } from "../../assets/assets";
import { StackScreenProps } from "@react-navigation/stack";
import { SignUpStackParamList } from "../../navigations/SignUpStackNavigation";
import { LogoImg } from "../../assets/assets";
import LottieView from "lottie-react-native";

type LoginPageProps = StackScreenProps<SignUpStackParamList, "LoginPage">;

export default function LoginPage({ navigation }: LoginPageProps) {
  return (
    <S.RootContainer>
      <S.ImageContainer>
        {/* <Image source={LogoImg} style={{ width: 240, height: 240 }} /> */}
        <LottieView source={AnimatedLogoImage} autoPlay loop style={{ width: 360, height: 800 }} />
      </S.ImageContainer>
      <S.TextContainer>
        <S.Title>너는 어떤 수업 듣고 있어?</S.Title>
        <S.SubTitle>내 시간표 관리부터</S.SubTitle>
        <S.SubTitle>친구들 수업 확인까지 동시에!</S.SubTitle>
      </S.TextContainer>
      <S.ButtonContainer>
        <Pressable
          onPress={() => {
            navigation.navigate("KakaoLoginPage");
          }}
        >
          <S.PrimaryButtonContainer>
            <Image source={KakaoImg} style={{ width: 29, height: 24 }} />
            <S.PrimaryButtonText>카카오로 로그인</S.PrimaryButtonText>
          </S.PrimaryButtonContainer>
        </Pressable>
        <S.SecondaryButtonContainer>
          <Image source={AppleImg} style={{ width: 20, height: 24 }} />
          <S.SecondaryButtonText>애플로 로그인</S.SecondaryButtonText>
        </S.SecondaryButtonContainer>
      </S.ButtonContainer>
    </S.RootContainer>
  );
}
