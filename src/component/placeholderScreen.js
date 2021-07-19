import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Foundation } from "@expo/vector-icons";

import { colors } from "../constants/color";

const PlaceholderScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.text}>No Tasks Yet</Text>
      </View>
      <Foundation
        name="clipboard-pencil"
        size={300}
        color={colors.orange_greyed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 80,
    marginLeft: 40,
  },
  text: {
    color: colors.white_greyed,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    marginRight: 20,
  },
  textView: {
    // alignSelf: 'center',
    marginRight: 20,
  },
});

export { PlaceholderScreen };
