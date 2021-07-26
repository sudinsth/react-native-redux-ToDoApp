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
  ActivityIndicator,
} from "react-native";

import validator from "validator";

import { auth, firestore } from "firebase";

import { colors } from "../constants/color";
import LabelInput from "../component/LabelInput";

const validateFields = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  };

  return isValid;
};

export const LoginScreen = ({ navigation }) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const login = (email, password) => {
    setIsLoading(!isLoading);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Logged In!");
      })
      .catch(() => {
        console.log("No such user.");
        emailField.errorMessage = "Email or Password entered wrong.";
        setEmailField({ ...emailField });
      });
  };
  const createAccount = (email, password) => {
    setIsLoading(!isLoading);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log("Creating user...");
        firestore().collection("users").doc(user.uid).set({});
      });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: "grey" }}>
          {/* Image Background */}
          <Image
            style={{
              flex: 1,
              // marginTop: -500,
              position: "absolute",
            }}
            source={require("../../assets/Images/todoBackground.jpg")}
          />
          <View style={{}}>
            <Text style={styles.titleText}>
              {" "}
              ToDo
              <Text style={{ color: colors.orange }}>APP</Text>
            </Text>
          </View>
        </View>

        <View style={styles.bottomView}>
          <Text style={styles.loginText}>
            {isCreateMode ? "Create An Account" : "Welcome Back!!"}
          </Text>
          <View style={styles.inputView}>
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
          {/* <Text style={styles.fpText}>
            {isCreateMode ? null : "Forgot Password?"}
          </Text> */}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              let isAllValid = true;

              if (isCreateMode) {
                const isValid = validateFields(
                  emailField.text,
                  passwordField.text
                );
                if (!isValid.email) {
                  emailField.errorMessage = "Please enter a valid Email.";
                  setEmailField({ ...emailField });
                  isAllValid = false;
                }

                if (!isValid.password) {
                  passwordField.errorMessage =
                    "Password must be at least 8 letters long with a number, capital letter and symbol.";
                  setPasswordField({ ...passwordField });
                  isAllValid = false;
                }
                console.log(passwordField.text, passwordField.errorMessage);

                if (
                  isCreateMode &&
                  rePasswordField.text != passwordField.text
                ) {
                  rePasswordField.errorMessage = "Passwords do not match.";
                  setRePasswordField({ ...rePasswordField });
                  isAllValid = false;
                }
              }

              if (isAllValid) {
                isCreateMode
                  ? createAccount(emailField.text, passwordField.text)
                  : login(emailField.text, passwordField.text);
              }
            }}
          >
            <Text style={styles.loginButtonText}>
              {/* {!isLoading ? (isCreateMode ? "Create Account" : "Login") : null} */}

              {!isLoading ? (
                isCreateMode ? (
                  "Create Account"
                ) : (
                  "Login"
                )
              ) : emailField.errorMessage == null ? (
                <ActivityIndicator color="#fff" />
              ) : isCreateMode ? (
                "Create Account"
              ) : (
                "Login"
              )}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsCreateMode(!isCreateMode);
              setEmailField({ text: "", errorMessage: "" });
              setPasswordField({ text: "", errorMessage: "" });
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
    borderRadius: 10,
    backgroundColor: "#f1f3f6",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
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
    flexDirection: "row",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 17,
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
