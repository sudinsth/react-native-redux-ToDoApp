import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { colors } from "../constants/color";
import { CustModal } from "../component/modal";
import { userAvatar } from "../constants/userAvatar";

import { useSelector } from "react-redux";
import { auth } from "firebase";

export const DrawerContent = (props) => {
  const [userModal, setUserModal] = useState(false);
  const modalPressHandler = (action) => {
    setUserModal(action);
  };
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

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userSection}>
          <TouchableOpacity
            style={styles.userAvatarPin}
            onPress={() => modalPressHandler(true)}
          >
            <Image source={avatarPin} style={styles.avatarPin} />
          </TouchableOpacity>

          <CustModal
            visible={userModal}
            animationType="fade"
            transparent={true}
            pressHandler={modalPressHandler}
          >
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
              onPress={() => modalPressHandler(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </CustModal>

          <View style={styles.userEmailTitle}>
            <Text style={styles.userEmailText}>{auth().currentUser.email}</Text>
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
    marginTop: StatusBar.currentHeight,
  },
  userSection: {
    marginHorizontal: 10,
    marginBottom: 15,
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
  avatarPin: {
    height: 70,
    width: 65,
    alignSelf: "center",
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
  userEmailTitle: {
    margin: 10,
    justifyContent: "center",
  },
  userEmailText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  drawerContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.orange,
    marginHorizontal: 10,
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
  bottomDrawerSection: {
    borderTopColor: colors.orange,
    borderTopWidth: 1,
    backgroundColor: colors.grey,
    marginBottom: 15,
  },
});
