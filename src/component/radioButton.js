import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../constants/color";

export const RadioButton = (props) => {
  return (
    <View style={[styles.unselected, props.style]}>
      {props.selected ? <View style={styles.selectedIcon} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  unselected: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedIcon: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.orange_greyed,
  },
});
