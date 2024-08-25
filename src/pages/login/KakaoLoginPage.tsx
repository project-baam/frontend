import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { SignUpStackParamList } from "../../navigations/SignUpStackNavigation";

type KakaoLoginPageProps = StackScreenProps<SignUpStackParamList, "KakaoLoginPage">;

export default function KakaoLoginPage({ navigation }: KakaoLoginPageProps) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeigth = Dimensions.get("window").height;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{
          uri: "https://kauth.kakao.com/oauth/authorize?client_id=30bf4954316109d9e58b50bd515b9fd9&response_type=code&redirect_uri=https://b-site.site/authentication/kakao/callback"
        }}
        onNavigationStateChange={(navState) => {
          if (navState.title.includes("authentication/kakao/callback")) {
            navigation.navigate("KakaoLoginRedirect", {
              token: navState.url.split("code=")[1]
            });
          }
        }}
      ></WebView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
