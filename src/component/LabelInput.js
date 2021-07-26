import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import { colors } from "../constants/color";

export default ({
  placeholder,
  errorMessage,
  inputStyle,
  text,
  onChangeText,
  ...inputProps
}) => {
  return (
    <View style={{ flex: 1 }}>
      {errorMessage ? (
        <View>
          <Text style={{ color: colors.red }}>
            {errorMessage && `*${errorMessage}`}
          </Text>
        </View>
      ) : null}
      <View>
        <TextInput
          placeholder={placeholder}
          style={[styles.input, inputStyle]}
          defaultvalue={text}
          onChangeText={onChangeText}
          {...inputProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 16,
    color: "#333",
    padding: 10,
    borderColor: "grey",
    borderBottomWidth: 1,
  },
});
