import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
  InteractionManager,
  ActivityIndicator,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { colors } from "../constants/color";

import { useSelector } from "react-redux";
import { auth, firestore } from "firebase";

const userAvatar = {
  defaultUser: require("../../assets/Images/default_user.png"),
  userPin1: require("../../assets/Images/user_1.png"),
  userPin2: require("../../assets/Images/user_2.png"),
  userPin3: require("../../assets/Images/user_3.png"),
  userPin4: require("../../assets/Images/user_4.png"),
  userPin5: require("../../assets/Images/user_5.png"),
};

export const DrawerContent = (props) => {
  const [isReady, setIsReady] = useState(false);
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

  if (list != null) {
    list.forEach((object) => {
      object.finished === true ? trueCount++ : falseCount++;
    });
  }

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return <ActivityIndicator color="orange" />;
  }
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userSection}>
          <View>
            <View style={styles.userAvatarPin}>
              <TouchableOpacity onPress={() => setUserModal(true)}>
                <Image source={avatarPin} style={{ height: 75, width: 75 }} />
              </TouchableOpacity>
            </View>

            <Modal visible={userModal} animationType="fade" transparent={true}>
              <View style={styles.userAvatarModal}>
                <View style={styles.userModalView}>
                  <View style={styles.userPinTextView}>
                    <Text style={styles.userPinText}>Select a User Pin</Text>
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
                  <TouchableOpacity
                    onPress={() => setUserModal(false)}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <View style={styles.userEmailTitle}>
              <Text style={styles.userEmailText}>
                {auth().currentUser.email}
              </Text>
            </View>
          </View>

          <View style={styles.taskCount}>
            <View
              style={{
                flex: 1,
                marginRight: 10,
              }}
            >
              <Text style={styles.taskCountText}>
                {trueCount}{" "}
                <View>
                  <Text>Completed</Text>
                </View>
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.taskCountText}>
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
              <Text style={styles.taskCountText}>
                {list.length}{" "}
                <View>
                  <Text>Total Tasks</Text>
                </View>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.drawerContent}>
          <View style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5 name="tasks" color={colors.orange} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("All Tasks");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <AntDesign name="staro" color={colors.orange} size={size} />
              )}
              label="Important Tasks"
              onPress={() => {
                props.navigation.navigate("Important Tasks");
              }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 28,
  },
  userAvatarPin: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: "center",
    height: 85,
    width: 85,
    padding: 4,
  },
  userAvatarModal: {
    flex: 1,
    backgroundColor: "#000000AA",
    justifyContent: "flex-end",
  },
  userModalView: {
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  userPinTextView: {
    borderBottomWidth: 1,
    borderBottomColor: colors.orange,
    marginBottom: 20,
  },
  userPinText: {
    fontSize: 20,
    margin: 10,
    fontFamily: "Poppins-Regular",
  },
  userSection: {
    marginLeft: 10,
    marginBottom: 15,
  },
  userEmailTitle: {
    margin: 10,
    justifyContent: "center",
  },
  userEmailText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
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

  cancelButton: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    marginTop: 20,
    backgroundColor: "white",
    elevation: 15,
    borderBottomColor: colors.orange,
    borderBottomWidth: 1,
  },
  cancelText: {
    textAlign: "center",
    fontSize: 16,
  },
  taskCount: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
  taskCountText: {
    fontFamily: "Poppins-Regular",
    fontSize: 20,
    textAlign: "center",
  },
});
