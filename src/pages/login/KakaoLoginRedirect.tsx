import { StackScreenProps } from "@react-navigation/stack";
import { View } from "react-native";
import { useEffect } from "react";
import { SignUpStackParamList } from "../../navigations/SignUpStackNavigation";
import useUserStore from "../../store/UserStore";
import useAuthStore from "../../store/UserAuthStore";

type KakaoLoginRedirectProps = StackScreenProps<SignUpStackParamList, "KakaoLoginRedirect">;

export default function KakaoLoginRedirect({ navigation, route }: KakaoLoginRedirectProps) {
  const code = route.params.code;

  const { setAccessToken } = useUserStore((state) => state);
  const { setToken, setRefreshToken } = useAuthStore();
  useEffect(() => {
    const requestBody = {
      code: code,
      provider: "kakao"
    };

    fetch(`https://b-site.site/authentication`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then((response) => response.json())
      .then((data) => {
        setRefreshToken(data.refreshToken);
        setAccessToken(data.accessToken);
        setToken(data.accessToken);
        navigation.navigate("SelectSchool");
      })
      .catch((error) => {
        console.error("Failed to handle kakao login:", error);
      });
  }, [code]);

  return <View></View>;
}
