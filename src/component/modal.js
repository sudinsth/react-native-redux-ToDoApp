import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { colors } from "../constants/color";

export const CustModal = (props) => {
  return (
    <View>
      <Modal
        visible={props.visible}
        animationType={props.animationType}
        transparent={props.transparent}
      >
        <TouchableOpacity
          style={styles.addTaskModal}
          onPress={() => props.pressHandler(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>{props.children}</View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addTaskModal: {
    flex: 1,
    backgroundColor: "#000000AA",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingBottom: 5,
    paddingTop: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
