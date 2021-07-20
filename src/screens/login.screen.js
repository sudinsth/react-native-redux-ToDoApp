import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from "react-native";

import { auth, firestore } from "firebase";

import { colors } from "../constants/color";
import LabelInput from "../component/LabelInput";

const login = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Logged In!");
    });
};

const createAccount = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      console.log("Creating user...");
      firestore().collection("users").doc(user.uid).set({});
    });
};

export const LoginScreen = () => {
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: "",
  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [rePasswordField, setRePasswordField] = useState({
    text: "",
    errorMessage: "",
  });
  const [isCreateMode, setIsCreateMode] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: "grey" }}>
          {/* Image Background */}
          <Image
            style={{ flex: 1, width: null, marginTop: -500 }}
            source={require("../../assets/Images/todoBackground.jpg")}
          />
        </View>
        <Text style={styles.titleText}>
          {" "}
          ToDo
          <Text style={{ color: colors.orange }}>APP</Text>
        </Text>

        <View style={styles.bottomView}>
          <Text style={styles.loginText}>
            {isCreateMode ? "Create An Account" : "Welcome Back!!"}
          </Text>
          <View style={styles.inputView}>
            {/* icon */}
            {/* <TextInput 
                            style={styles.input}
                            placeholder='Username'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            value={emailField.text}
                            onChangeText={(text) => setEmailField({text: text})}
                        />
                        <View style={{backgroundColor: 'red'}}>

                        <Text style={{fontSize: 24}}>{emailField.text} Hello</Text>
                        </View> */}

            <LabelInput
              placeholder="Email"
              errorMessage={emailField.errorMessage}
              text={emailField.text}
              onChangeText={(text) => {
                setEmailField({
                  text: text,
                });
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCompleteType="email"
            />
          </View>
          <View style={styles.inputView}>
            {/* Icon */}
            {/* <TextInput 
                            style={styles.input}
                            placeholder='Password'
                            secureTextEntry={true}
                            autoCapitalize='none'
                        /> */}
            <LabelInput
              placeholder="Password"
              errorMessage={passwordField.errorMessage}
              text={passwordField.text}
              onChangeText={(text) => {
                setPasswordField({
                  text: text,
                });
              }}
              autoCapitalize="none"
              autoCompleteType="password"
              secureTextEntry={true}
            />
          </View>
          {isCreateMode ? (
            <View style={styles.inputView}>
              <LabelInput
                placeholder="Re-Enter Password"
                errorMessage={rePasswordField.errorMessage}
                text={rePasswordField.text}
                onChangeText={(text) => {
                  setRePasswordField({
                    text: text,
                  });
                }}
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </View>
          ) : null}
          <Text style={styles.fpText}>
            {isCreateMode ? null : "Forgot Password?"}
          </Text>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() =>
              isCreateMode
                ? createAccount(emailField.text, passwordField.text)
                : login(emailField.text, passwordField.text)
            }
          >
            <Text style={styles.loginButtonText}>
              {isCreateMode ? "Create Account" : "Login"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsCreateMode(!isCreateMode);
            }}
          >
            {isCreateMode ? (
              <Text style={styles.registerText}>
                Already Have an Account?
                <Text style={{ color: colors.orange, fontSize: 17 }}>
                  {" "}
                  LOGIN
                </Text>
              </Text>
            ) : (
              <Text style={styles.registerText}>
                Don't Have an account?
                <Text style={{ color: colors.orange, fontSize: 17 }}>
                  {" "}
                  REGISTER
                </Text>
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    position: "absolute",
    top: Dimensions.get("screen").height * 0.1,
    alignSelf: "center",
    color: colors.white,
    fontSize: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
  },
  bottomView: {
    backgroundColor: "#fff",
    opacity: 0.95,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
  },
  inputView: {
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f1f3f6",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: colors.orange,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 18,
  },
  registerText: {
    alignSelf: "center",
    marginTop: 12,
    fontSize: 16,
  },
  fpText: {
    marginTop: 10,
    alignSelf: "flex-end",
    fontSize: 16,
    color: colors.orange,
  },
});
