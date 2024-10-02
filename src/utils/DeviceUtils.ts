import * as Device from "expo-device";
import { Platform, Dimensions } from "react-native";
import { DeviceType, OSType } from "@/apis/notification/notification.types";

export const getDeviceType = (): DeviceType => {
  const { width, height } = Dimensions.get("window");
  const aspectRatio = height / width;

  if (Device.deviceType === Device.DeviceType.PHONE) {
    return DeviceType.PHONE;
  } else if (Device.deviceType === Device.DeviceType.TABLET) {
    return DeviceType.TABLET;
  } else if (aspectRatio > 1.6) {
    // 일반적인 폰의 종횡비는 1.6 이상
    return DeviceType.PHONE;
  } else {
    // 태블릿이나 기타 디바이스로 간주
    return DeviceType.TABLET;
  }
};

export const getOSType = (): OSType => {
  if (Platform.OS === "ios") return OSType.IOS;
  if (Platform.OS === "android") return OSType.ANDROID;
  return OSType.OTHER;
};
