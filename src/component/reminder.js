import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../constants/color";
import moment from "moment";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const ReminderTab = ({ notify }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [text, setText] = useState("Pick a Date");

  // Notification
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {});
    }

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
    isMounted = false;
  }, []);

  const scheduleNotification3Second = async (sec, repeatSec, repeat) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "REMINDER!!!! 📬",
        body: `Task TODO: ${notify}`,
      },
      trigger: {
        seconds: sec * repeatSec,
        repeats: repeat,
      },
    });
  };

  const cancelScheduleNotification = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      // alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShow(Platform.OS === "ios");
    setDate(currentTime);

    let tempDate = new Date(currentTime);
    let fTime =
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();

    setText(fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <TouchableOpacity
            onPress={() => showMode("time")}
            style={styles.remindMe}
          >
            <Ionicons name="notifications" size={24} color={colors.orange} />
            <View style={styles.scheduleView}>
              <Text style={styles.remindText}> Remind Me! {/*at {text}*/}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remindMe}
            onPress={async () => {
              await scheduleNotification3Second(3, 1, false);
            }}
          >
            <View style={styles.scheduleView}>
              <Text style={styles.scheduleText}>In the next 3 seconds</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remindMe}
            onPress={async () => {
              await scheduleNotification3Second(60, 5, false);
            }}
          >
            <View style={styles.scheduleView}>
              <Text style={styles.scheduleText}>In the next 5 minutes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remindMe}
            onPress={async () => {
              // await schedulePushNotification(5);
              await scheduleNotification3Second(60, 5, true);
            }}
          >
            <View style={styles.scheduleView}>
              <Text style={styles.scheduleText}>In every 5 minutes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remindMe}
            onPress={async () => {
              await cancelScheduleNotification();
            }}
          >
            <View style={styles.cancelReminders}>
              <Text style={styles.cancelText}>Cancel All Reminders</Text>
            </View>
          </TouchableOpacity>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 5,
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    elevation: 25,
  },
  remindMe: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.orange,
    padding: 12,
    borderRadius: 5,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  remindText: {
    fontFamily: "Poppins-Regular",
  },
  scheduleView: {
    flex: 1,
    marginLeft: 10,
  },
  scheduleText: {
    textAlign: "center",
  },
  cancelReminders: {
    flex: 1,
    marginLeft: 10,
  },
  cancelText: {
    textAlign: "center",
  },
});
