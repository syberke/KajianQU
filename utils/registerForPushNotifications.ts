import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export async function registerForPushNotifications() {

  if (!Device.isDevice) {
    console.log("Gunakan device fisik");
    return null;
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {

    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;

  }

  if (finalStatus !== "granted") {

    console.log("Permission ditolak");
    return null;

  }

  const token =
    (await Notifications.getExpoPushTokenAsync()).data;

  return token;
}