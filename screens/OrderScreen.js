import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const OrderScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.conatiner}>
      <LottieView
        source={require("../assets/thumbs.json")}
        style={{
          height: 360,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your Order has been Placed
      </Text>

      <LottieView
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{
          height: 50,
          width: 200,
          marginVertical: 40,
          justifyContent: "center",
          borderRadius: 20,
          alignItems: "center",
          alignSelf: "center",
          borderWidth: 2,
          backgroundColor: "#004F98",
          borderColor: "transparent",
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            color: "white",
          }}
        >
          Continue Shopping
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 40,
  },
});
