import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null); // State to hold the user object

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // Update the user state once the authentication state is initialized
      setUser(authUser);
    });

    return unsubscribe; // Clean up the listener on component unmount
  }, []);

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
    <SafeAreaView style={styles.container}>
      {user ? ( // If user is authenticated, show the profile information
        <>
          <Pressable style={{ marginVertical: 10 }}>
            <Text> Welcome {user.email}</Text>
          </Pressable>

          <Pressable onPress={signOutUser}>
            <Text>Sign Out</Text>
          </Pressable>
        </>
      ) : (
        // If user is not authenticated, show a fallback UI
        <>
          <Text>Please log in to view your profile</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text>Login</Text>
          </Pressable>
        </>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
