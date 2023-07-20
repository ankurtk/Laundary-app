import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [DeliveryTime, setDeliveryTime] = useState([]);

  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "3",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];
  const navigation = useNavigation();
  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !DeliveryTime) {
      Alert.alert("Empty or Inavalid", "Please Select All the fields", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    if (selectedDate && selectedTime && DeliveryTime) {
      navigation.navigate("Cart", {
        pickUpDate: selectedDate,
        selectedTime: selectedTime,
        no_Of_days: DeliveryTime,
      });
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.input}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text>back</Text>
          </Pressable>
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
          >
            Enter address
          </Text>
          <TextInput
            style={{
              padding: 40,
              borderColor: "grey",
              borderWidth: 0.7,
              paddingVertical: 80,
              borderRadius: 9,
              margin: 10,
            }}
          />
        </View>
        <View style={{ margin: 2 }}>
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
          >
            Pick Up Date
          </Text>
          <HorizontalDatepicker
            mode="gregorian"
            startDate={new Date("2023-08-20")}
            endDate={new Date("2023-08-31")}
            initialSelectedDate={new Date("2023-08-22")}
            onSelectedDateChange={(date) => setSelectedDate(date)}
            selectedItemWidth={170}
            unselectedItemWidth={38}
            itemHeight={38}
            itemRadius={10}
            selectedItemTextStyle={styles.selectedItemTextStyle}
            unselectedItemTextStyle={styles.selectedItemTextStyle}
            selectedItemBackgroundColor="#222831"
            unselectedItemBackgroundColor="#ececec"
            flatListContainerStyle={styles.flatListContainerStyle}
          />
        </View>
        <View style={{ marginTop: 12 }}>
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
          >
            Select Time
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {times.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => setSelectedTime([item.time])}
                style={
                  selectedTime.includes(item.time)
                    ? {
                        margin: 10,
                        borderRadius: 7,
                        padding: 15,
                        borderColor: "red",
                        borderWidth: 0.7,
                      }
                    : {
                        margin: 10,
                        borderRadius: 7,
                        padding: 15,
                        borderColor: "grey",
                        borderWidth: 0.7,
                      }
                }
              >
                <Text>{item.time}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}
          >
            Delivery Date
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {deliveryTime.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => setDeliveryTime([item.name])}
                style={
                  DeliveryTime.includes(item.name)
                    ? {
                        margin: 10,
                        borderRadius: 7,
                        padding: 15,
                        borderColor: "red",
                        borderWidth: 0.7,
                      }
                    : {
                        margin: 10,
                        borderRadius: 7,
                        padding: 15,
                        borderColor: "grey",
                        borderWidth: 0.7,
                      }
                }
              >
                <Text>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
              {cart.length} items | ${total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

          <Pressable onPress={proceedToCart}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  input: {
    marginTop: (deviceHeight * 5) / 100,
  },
});
