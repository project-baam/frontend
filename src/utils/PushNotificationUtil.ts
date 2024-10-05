import { Platform, Dimensions } from "react-native";
import { DeviceType, OSType } from "@/apis/notification/notification-device.enums";
// import * as Notifications from "expo-notifications";
// import { useEffect, useState } from "react";
// import { registerDeviceToken } from "@/apis/notification/notification-device.apis";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // 알림 수신 시 알림을 처리하는 방법 설정
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false
//   })
// });

export function getDeviceType(): DeviceType {
  const { width, height } = Dimensions.get("window");
  const aspectRatio = height / width;

  if (Platform.OS === "web") return DeviceType.OTHER;
  if (aspectRatio > 1.6) return DeviceType.PHONE;
  return DeviceType.TABLET;
}

export function getOSType(): OSType {
  if (Platform.OS === "ios") return OSType.IOS;
  if (Platform.OS === "android") return OSType.ANDROID;
  return OSType.OTHER;
}

// export default function useNotificationService() {
//   const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

//   useEffect(() => {
//     registerForPushNotificationsAsync()
//       .then((token) => {
//         if (token) {
//           console.log("tokennnnnnnnnn: :", token);
//           return AsyncStorage.setItem("pushToken", token);
//         }
//       })
//       .then(() => {
//         console.log("Push token saved successfully");
//       })
//       .catch((error) => console.error("Failed to get or save push token:", error));

//     // 백그라운드 또는 종료 상태에서 수신된 알림을 처리
//     const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
//       console.log("Notification clicked:", response);
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   return { expoPushToken };
// }

// // Expo Push Token 및 알림 권한 요청
// export async function registerForPushNotificationsAsync() {
//   if (Platform.OS === "web") {
//     console.log("Push notifications are not supported in web browsers");
//     return null;
//   }

//   let token;
//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   if (finalStatus !== "granted") {
//     alert("푸시 알림 권한이 필요합니다.");
//     return null;
//   }

//   try {
//     token = (
//       await Notifications.getExpoPushTokenAsync({
//         projectId: "b24257a9-ac52-41e8-8902-e040723d4e63"
//       })
//     ).data;
//     console.log("Expo Push Token:", token);
//   } catch (error) {
//     console.error("Failed to get push token:", error);
//   }

//   // Android 설정
//   if (Platform.OS === "android") {
//     await Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX
//     });
//   }

//   return token;
// }
