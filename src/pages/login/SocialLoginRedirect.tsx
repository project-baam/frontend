import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import axios from "axios";
import { useEffect } from "react";
import { View } from "react-native";
import { SignUpStackParamList } from "../../navigations/SignUpStackNavigation";
import useAuthStore from "../../store/UserAuthStore";
import useUserStore from "../../store/UserStore";

type SocialLoginRedirectProps = StackScreenProps<SignUpStackParamList, "SocialLoginRedirect">;

export default function SocialLoginRedirect({ navigation, route }: SocialLoginRedirectProps) {
  const provider = route.params.provider;
  const code = route.params.code;

  const { setAccessToken } = useUserStore((state) => state);
  const { setRefreshToken, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const requestBody = {
      code,
      provider
    };

    // 기 가입 이력 여부에 따른 스크린 이동
    async function checkUserStatusAndNavigate() {
      const response = await axios.post("https://b-site.site/authentication", requestBody, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const status = response.data.user.status;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      if (status === "active") {
        // 기 가입 회원

        // 기기에 jwt 토큰 저장
        AsyncStorage.setItem("accessToken", accessToken);
        AsyncStorage.setItem("refreshToken", refreshToken);

        // 스크린 이동
        setIsAuthenticated(true);
        navigation.reset({
          index: 0,
          routes: [{ name: "BottomTab" }]
        });
      } else {
        // 처음 가입
        navigation.navigate("SelectSchool");
      }
    }

    checkUserStatusAndNavigate();
  }, []);

  return <View></View>;
}
