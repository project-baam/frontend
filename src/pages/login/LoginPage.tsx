import { Image, Pressable } from "react-native";
import * as S from "./styles";
import { AnimatedLogoImage, AppleImg, KakaoImg } from "../../assets/assets";
import { StackScreenProps } from "@react-navigation/stack";
import { SignUpStackParamList } from "../../navigations/SignUpStackNavigation";
import LottieView from "lottie-react-native";
import appleAuth from "@invertase/react-native-apple-authentication";
import useAuthStore from "@/store/UserAuthStore";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import LoadingOverlay from "@/components/common/ui/LoadingOverlay";

type LoginPageProps = StackScreenProps<SignUpStackParamList, "LoginPage">;

export default function LoginPage({ navigation }: LoginPageProps) {
  const { setRefreshToken, setToken, setIsAuthenticated } = useAuthStore();

  const [isTryingLogin, setIsTryingLogin] = useState(false);

  const fetchToken = async () => {
    const storedToken = await AsyncStorage.getItem("refreshToken");

    if (storedToken) {
      axios
        .post(
          "https://b-site.site/authentication/refresh-tokens",
          {
            refreshToken: storedToken
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json"
            }
          }
        )
        .then((response) => {
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;
          AsyncStorage.setItem("refreshToken", refreshToken);
          AsyncStorage.setItem("accessToken", accessToken);

          setRefreshToken(refreshToken);
          setToken(accessToken);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigation.navigate("KakaoLoginPage");
    }

    setTimeout(() => {
      setIsTryingLogin(false);
    }, 2500);
  };

  if (isTryingLogin) {
    return <LoadingOverlay />;
  }

  async function handleSignInApple() {
    console.log("click");
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL]
    });
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    console.log(credentialState);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
    }
  }

  return (
    <S.RootContainer>
      <S.ImageContainer>
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
            fetchToken();
          }}
        >
          <S.PrimaryButtonContainer>
            <Image source={KakaoImg} style={{ width: 29, height: 24 }} />
            <S.PrimaryButtonText>카카오로 로그인</S.PrimaryButtonText>
          </S.PrimaryButtonContainer>
        </Pressable>
        <Pressable onPress={handleSignInApple}>
          <S.SecondaryButtonContainer>
            <Image source={AppleImg} style={{ width: 20, height: 24 }} />
            <S.SecondaryButtonText>애플로 로그인</S.SecondaryButtonText>
          </S.SecondaryButtonContainer>
        </Pressable>
      </S.ButtonContainer>
    </S.RootContainer>
  );
}
