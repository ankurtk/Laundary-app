import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ActivityIndicator } from "react-native";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("hello", authUser);
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("user Cred", userCredential);
      const user = userCredential.user;
      console.log("UserDetails", user);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text style={{ marginRight: 10 }}>Loading</Text>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Text
              style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}
            >
              SignIn
            </Text>
            <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
              Sign In to your account
            </Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="black"
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="black"
                style={{
                  fontSize: email ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "grey",
                  width: 300,
                  marginVertical: 10,
                  marginLeft: 13,
                }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="key-outline" size={24} color="black" />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholderTextColor="black"
                style={{
                  fontSize: password ? 18 : 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "grey",
                  width: 300,
                  marginVertical: 20,
                  marginLeft: 13,
                }}
              />
            </View>

            <Pressable
              onPress={login}
              style={{
                width: 200,
                backgroundColor: "#318CE7",
                padding: 15,
                borderRadius: 7,
                marginTop: 50,
                marginHorizontal: "auto",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "white",
                  fontWeight: "700",
                }}
              >
                Login
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={{ marginTop: 20 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 17,
                  color: "grey",
                  fontWeight: "500",
                }}
              >
                {" "}
                Don't have a account? Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
});
