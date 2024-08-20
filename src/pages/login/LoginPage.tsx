import { Image, Text, View } from "react-native";
import * as S from "./styles";
import { AppleImg, KakaoImg } from "../../assets/assets";

export default function LoginPage() {
  return (
    <S.RootContainer>
      <S.StyledText>BAAM에 온 걸 환영해!</S.StyledText>
      <S.ImageContainer>
        <Text>이미지 영역</Text>
      </S.ImageContainer>
      <S.ButtonContainer>
        <S.PrimaryButtonContainer>
          <Image source={KakaoImg} style={{ width: 29, height: 24 }} />
          <S.PrimaryButtonText>카카오로 로그인하기</S.PrimaryButtonText>
        </S.PrimaryButtonContainer>
        <S.SecondaryButtonContainer>
          <Image source={AppleImg} style={{ width: 20, height: 24 }} />
          <S.SecondaryButtonText>애플로 로그인하기</S.SecondaryButtonText>
        </S.SecondaryButtonContainer>
      </S.ButtonContainer>
    </S.RootContainer>
  );
}
