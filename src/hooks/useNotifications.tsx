import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { deactivateDeviceToken, registerDeviceToken } from "@/apis/notification/notification.apis";
import { registerForPushNotificationsAsync } from "@/apis/notification/notification.utils";
import { getDeviceType, getOSType } from "@/utils/DeviceUtils";

export const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    const tokenListener = Notifications.addPushTokenListener((token) => {
      setExpoPushToken(token.data);
      updateDeviceToken(token.data);
    });

    return () => {
      tokenListener.remove();
    };
  }, []);

  const updateDeviceToken = async (token: string) => {
    try {
      await registerDeviceToken({
        deviceToken: token,
        deviceType: getDeviceType(),
        osType: getOSType()
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deactivateToken = async () => {
    if (expoPushToken) {
      try {
        await deactivateDeviceToken(expoPushToken);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { expoPushToken, deactivateToken };
};
