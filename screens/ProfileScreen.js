import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  return (
    <SafeAreaView style={styles.conatiner}>
      <Pressable style={{ marginVertical: 10 }}>
        <Text> Welcome {user.email}</Text>
      </Pressable>

      <Pressable onPress={signOutUser}>
        <Text>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
