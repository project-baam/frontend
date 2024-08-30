import { StackScreenProps } from "@react-navigation/stack";
import { View } from "react-native";
import { useEffect } from "react";
import { SignUpStackParamList } from "../../navigations/SignUpStackNavigation";
import useUserStore from "../../store/UserStore";

type KakaoLoginRedirectProps = StackScreenProps<SignUpStackParamList, "KakaoLoginRedirect">;

export default function KakaoLoginRedirect({ navigation, route }: KakaoLoginRedirectProps) {
  const code = route.params.token;

  const { setAccessToken } = useUserStore((state) => state);

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
      .then((data) => setAccessToken(data.accessToken))
      .catch((error) => {
        console.error("Failed to handle kakao login:", error);
      });
    navigation.navigate("SelectSchool");
  }, [code]);

  return <View></View>;
}
