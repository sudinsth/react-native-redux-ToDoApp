import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Octicons,
  Foundation,
  AntDesign,
} from "@expo/vector-icons";
import { colors } from "../constants/color";

import { useSelector } from "react-redux";
// import auth from "@react-native-firebase/auth";
import { auth } from "firebase";

export const DrawerContent = (props) => {
  const list = useSelector((state) => state.getTodo.list);
  let trueCount = 0;
  let falseCount = 0;

  list.forEach((object) => {
    object.finished === true ? trueCount++ : falseCount++;
  });

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userSection}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                backgroundColor: colors.white,
                borderColor: colors.orange,
                borderWidth: 1,
                borderRadius: 50,
                alignSelf: "flex-start",
                height: 85,
                width: 85,
                padding: 4,
              }}
            >
              <View
                style={{
                  height: 75,
                  width: 75,
                  borderRadius: 60,
                  backgroundColor: colors.orange_greyed,
                }}
              />
            </View>
            <View
              style={{
                margin: 10,
                marginLeft: 15,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "Poppins-Regular" }}>
                {auth().currentUser.email}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginVertical: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {trueCount}{" "}
                <View>
                  <Text>Completed</Text>
                </View>
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {falseCount}{" "}
                <View>
                  <Text>Remaining</Text>
                </View>
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {list.length}{" "}
                <View>
                  <Text>Total Tasks</Text>
                </View>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5 name="tasks" color={colors.orange} size={size} />
              )}
              label={`All Tasks (${list.length})`}
              onPress={() => {
                props.navigation.navigate("All Tasks");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Octicons name="tasklist" color={colors.orange} size={size} />
              )}
              label={`Completed (${trueCount})`}
              onPress={() => {
                props.navigation.navigate("Completed");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Foundation
                  name="clipboard-pencil"
                  color={colors.orange}
                  size={30}
                />
              )}
              label={`Not Completed (${falseCount})`}
              onPress={() => {
                props.navigation.navigate("Not Completed");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <AntDesign name="staro" color={colors.orange} size={22} />
              )}
              label="Important Tasks"
              onPress={() => {
                props.navigation.navigate("Important Tasks");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={colors.orange}
              size={size}
            />
          )}
          label="Log Out"
          onPress={() => {
            auth().signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
  },
  userSection: {
    marginLeft: 10,
    marginBottom: 15,
  },
  bottomDrawerSection: {
    borderTopColor: colors.orange,
    borderTopWidth: 1,
    backgroundColor: colors.grey,
    marginBottom: 15,
  },
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.orange,
  },
});
