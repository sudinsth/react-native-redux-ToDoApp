import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { colors } from "../constants/color";

import { useSelector } from "react-redux";
import { auth } from "firebase";

const userAvatar = {
  defaultUser: require("../../assets/Images/default_user.png"),
  userPin1: require("../../assets/Images/user_1.png"),
  userPin2: require("../../assets/Images/user_2.png"),
  userPin3: require("../../assets/Images/user_3.png"),
  userPin4: require("../../assets/Images/user_4.png"),
  userPin5: require("../../assets/Images/user_5.png"),
};

export const DrawerContent = (props) => {
  const [userModal, setUserModal] = useState(false);
  const [avatarPin, setAvatarPin] = useState(userAvatar.defaultUser);
  const [userImage, setUserImage] = useState([
    { id: 1, name: userAvatar.defaultUser },
    { id: 2, name: userAvatar.userPin1 },
    { id: 3, name: userAvatar.userPin2 },
    { id: 4, name: userAvatar.userPin3 },
    { id: 5, name: userAvatar.userPin4 },
    { id: 6, name: userAvatar.userPin5 },
  ]);
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
              <TouchableOpacity onPress={() => setUserModal(true)}>
                <Image source={avatarPin} style={{ height: 75, width: 75 }} />
              </TouchableOpacity>
            </View>

            <Modal visible={userModal} animationType="fade" transparent={true}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#000000AA",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    paddingVertical: 20,
                  }}
                >
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: colors.orange,
                      marginBottom: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        margin: 10,
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      Select a User Pin
                    </Text>
                  </View>

                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={userImage}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setAvatarPin(item.name);
                          setUserModal(false);
                        }}
                      >
                        <Image
                          key={item.id}
                          source={item.name}
                          style={{ height: 75, width: 75 }}
                        />
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                  />
                  <View>
                    <TouchableOpacity
                      onPress={() => setUserModal(false)}
                      style={{
                        borderRadius: 5,
                        padding: 10,
                        margin: 10,
                        marginTop: 20,
                        backgroundColor: "white",
                        elevation: 15,
                        borderBottomColor: colors.orange,
                        borderBottomWidth: 1,
                      }}
                    >
                      <Text style={{ textAlign: "center", fontSize: 16 }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

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
              paddingVertical: 5,
              paddingLeft: 4,
              marginVertical: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                marginRight: 10,
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
                marginLeft: 10,
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
              // label={`All Tasks (${list.length})`}
              label="Home"
              onPress={() => {
                props.navigation.navigate("All Tasks");
              }}
            />
            {/* <DrawerItem
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
            /> */}
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
