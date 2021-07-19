import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../constants/color";

export const ReminderTab = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [text, setText] = useState("Pick a Date");

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShow(Platform.OS === "ios");
    setDate(currentTime);

    let tempDate = new Date(currentTime);
    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();

    setText(fTime);

    console.log(fTime);
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
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.remindText}> Remind Me! at {text}</Text>
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
});
