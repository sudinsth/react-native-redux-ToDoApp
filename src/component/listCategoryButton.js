import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors } from "../constants/color";

export const CategoryButton = ({ pressHandler, clicked, btnNames }) => {
  const buttonNames = [btnNames.All, btnNames.Completed, btnNames.Remaining];

  return (
    <View style={styles.container}>
      <View style={styles.groupButton}>
        {buttonNames.map((buttonLabel, index) => {
          return (
            <TouchableOpacity
              onPress={() => pressHandler(buttonLabel, index)}
              key={index}
              style={[
                buttonLabel === clicked ? styles.buttonActive : styles.button,
              ]}
            >
              <Text
                style={
                  buttonLabel === clicked
                    ? styles.textActive
                    : styles.textInactive
                }
              >
                {buttonLabel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // flex: 1,
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    elevation: 5,
  },
  groupButton: {
    padding: 10,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    // elevation: 5,
  },
  buttonActive: {
    flex: 1,
    height: 40,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    elevation: 5,
  },
  textActive: {
    color: "white",
    fontSize: 17,
  },
  textInactive: {
    color: "black",
    fontSize: 16,
  },
});
