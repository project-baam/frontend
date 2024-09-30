import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as S from "./styles";
import { AnimatedLogoImage, AppleImg, KakaoImg } from "../../assets/assets";
import { StackScreenProps } from "@react-navigation/stack";
import { SignUpStackParamList } from "../../navigations/SignUpStackNavigation";
import LottieView from "lottie-react-native";
import appleAuth from "@invertase/react-native-apple-authentication";
import useAuthStore from "@/store/UserAuthStore";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import LoadingOverlay from "@/components/common/ui/LoadingOverlay";

type LoginPageProps = StackScreenProps<SignUpStackParamList, "LoginPage">;

export default function LoginPage({ navigation }: LoginPageProps) {
  let user: any = null;

  const [credentialStateForUser, updateCredentialStateForUser] = useState<any>(-1);

  async function fetchAndUpdateCredentialState(updateCredentialStateForUser: any) {
    if (user === null) {
      updateCredentialStateForUser("N/A");
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(user);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        updateCredentialStateForUser("AUTHORIZED");
      } else {
        updateCredentialStateForUser(credentialState);
      }
    }
  }

  useEffect(() => {
    if (!appleAuth.isSupported) return;

    fetchAndUpdateCredentialState(updateCredentialStateForUser).catch((error) =>
      updateCredentialStateForUser(`Error: ${error.code}`)
    );
  }, []);

  useEffect(() => {
    if (!appleAuth.isSupported) return;

    return appleAuth.onCredentialRevoked(async () => {
      console.warn("Credential Revoked");
      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch((error) =>
        updateCredentialStateForUser(`Error: ${error.code}`)
      );
    });
  }, []);

  if (!appleAuth.isSupported) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text>Apple Authentication is not supported on this device.</Text>
      </View>
    );
  }

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

  async function handleSignInApple(updateCredentialStateForUser: any) {
    console.warn("Beginning Apple Authentication");

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
      });

      console.log("appleAuthRequestResponse", appleAuthRequestResponse);

      const { user: newUser, email, nonce, identityToken, realUserStatus /* etc */ } = appleAuthRequestResponse;

      user = newUser;

      fetchAndUpdateCredentialState(updateCredentialStateForUser).catch((error) =>
        updateCredentialStateForUser(`Error: ${error.code}`)
      );

      if (identityToken) {
        navigation.navigate("SocialLoginRedirect", { code: identityToken, provider: "apple" });
      } else {
        // no token - failed sign-in?
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.warn(`Apple Authentication Completed, ${user}, ${email}`);
    } catch (error: any) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn("User canceled Apple Sign in.");
      } else {
        console.error(error);
      }
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
        <Pressable
          onPress={() => {
            handleSignInApple(updateCredentialStateForUser);
          }}
        >
          <S.SecondaryButtonContainer>
            <Image source={AppleImg} style={{ width: 20, height: 24 }} />
            <S.SecondaryButtonText>애플로 로그인</S.SecondaryButtonText>
          </S.SecondaryButtonContainer>
        </Pressable>
      </S.ButtonContainer>
    </S.RootContainer>
  );
}

const styles = StyleSheet.create({
  appleButton: {
    width: 200,
    height: 60,
    margin: 10
  },
  header: {
    margin: 10,
    marginTop: 30,
    fontSize: 18,
    fontWeight: "600"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "pink"
  },
  horizontal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  }
});
