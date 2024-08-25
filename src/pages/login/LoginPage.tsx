import { Image, Pressable, Text } from "react-native";
import * as S from "./styles";
import { AppleImg, KakaoImg } from "../../assets/assets";
import { StackScreenProps } from "@react-navigation/stack";
import { SignUpStackParamList } from "../../navigations/SignUpStackNavigation";
import { LogoImg } from "../../assets/assets";

type LoginPageProps = StackScreenProps<SignUpStackParamList, "LoginPage">;

export default function LoginPage({ navigation }: LoginPageProps) {
  return (
    <S.RootContainer>
      <S.StyledText>BAAM에 온 걸 환영해!</S.StyledText>
      <S.ImageContainer>
        <Image source={LogoImg} style={{ width: 240, height: 240 }} />
      </S.ImageContainer>
      <S.ButtonContainer>
        <Pressable
          onPress={() => {
            navigation.navigate("KakaoLoginPage");
          }}
        >
          <S.PrimaryButtonContainer>
            <Image source={KakaoImg} style={{ width: 29, height: 24 }} />
            <S.PrimaryButtonText>카카오로 로그인하기</S.PrimaryButtonText>
          </S.PrimaryButtonContainer>
        </Pressable>
        <S.SecondaryButtonContainer>
          <Image source={AppleImg} style={{ width: 20, height: 24 }} />
          <S.SecondaryButtonText>애플로 로그인하기</S.SecondaryButtonText>
        </S.SecondaryButtonContainer>
      </S.ButtonContainer>
    </S.RootContainer>
  );
}
