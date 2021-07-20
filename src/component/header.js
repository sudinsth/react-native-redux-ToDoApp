import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "../constants/color";

export const Header = ({ navigation, showHeader }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      {!showHeader ? (
        <MaterialIcons
          name="menu"
          size={30}
          onPress={openMenu}
          style={styles.icon}
        />
      ) : (
        <View style={{ marginRight: 30 }} />
      )}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/adaptive-icon.png")}
          style={{ height: 35, width: 35, marginRight: 5 }}
        />
        <Text style={styles.title}>
          ToDo
          <Text style={{ color: colors.orange, fontFamily: "Poppins-Regular" }}>
            App
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    backgroundColor: colors.white,
    elevation: 5,
    flexDirection: "row",
  },
  title: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginRight: 35,
    fontFamily: "Poppins-Regular",
  },
  icon: {
    marginLeft: 15,
  },
});
