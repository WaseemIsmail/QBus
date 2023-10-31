import Button from "../components/Button";
import COLORS from "../constants/colors";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { View, Text, Alert, TextInput, Image } from "react-native";
import MyApiManager from "../ApiManager";
import { useFocusEffect } from "@react-navigation/native";

export default function TopupScreen({ navigation }) {
  const route = useRoute();
  const id = route.params?.id;

  const [balance, setBalance] = useState(0);
  const [topup, setTopup] = useState(0);

  const getBalance = async (id) => {
    try {
      const apiManager = MyApiManager.getInstance();
      const response = await apiManager.instance.get(`/api/user/balance/${id}`);

      if (response.status === 200) {
        setBalance(response.data.balance);
      } else {
        console.error(response.data.error);
      }
    } catch (err) {
      console.error("Api Failed:", err);
      if (err.response) {
        console.error(err.response.data.error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getBalance(id);
    }, [id])
  );

  const confirmAlert = (amount) => {
    Alert.alert(
      "Confirmation",
      `Are you sure you want to topup Rs.${amount}.00?`,
      [
        {
          text: "Yes",
          onPress: () =>
            navigation.navigate("Payment", { id: id, amount: amount }),
        },
        {
          text: "No",
          onPress: () => {
            console.log("No");
          },
        },
      ]
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          height: "40%",
          backgroundColor: "#3d73d4",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Image
          style={{
            position: "relative",
            bottom: -10,
            right: 10,
            width: "110%",
            height: "100%",
            opacity: 0.5,
          }}
          source={require("../assets/world-mapbackground-removebg-preview.png")}
        />
      </View>

      <View style={{ flex: 1, marginHorizontal: 30 }}>
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 900,
              marginVertical: 30,
              marginHorizontal: 10,
              color: COLORS.black,
            }}
          >
            Top-up Your Account
          </Text>
        </View>
        <View
          style={{
            marginBottom: 30,
            marginTop: 20,
            margin: 20,
            paddingTop: 10,
            paddingLeft: 5,
            borderRadius: 40,
            width: "105%",
            height: "80%",
            backgroundColor: "#f0f0f0",
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: { width: 0, height: 4 },

            marginHorizontal: -10,
          }}
        >
          <Text
            style={{
              marginTop: 20,
              fontSize: 20,
              fontWeight: 500,
              marginVertical: 8,
            }}
          >
            Account Balance
          </Text>
          <View
            style={{
              width: "60%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
              top: 10,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: 700,
                left: -20,
              }}
            >
              {`Rs. ${balance}.00`}
            </Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                marginVertical: 20,
                right: 90,
                top: 15,
              }}
            >
              Quick Top-up
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              title="100.00"
              onPress={() => confirmAlert(100)}
              style={{
                marginTop: 5,
                marginRight: 10,
                borderColor: COLORS.black,
                borderWidth: 2,
                height: 50,
                width: 80,
                borderRadius: 20,
              }}
            />
            <Button
              title="500.00"
              onPress={() => confirmAlert(500)}
              style={{
                marginTop: 5,
                marginRight: 10,
                borderColor: COLORS.black,
                borderWidth: 2,
                height: 50,
                width: 80,
                borderRadius: 20,
              }}
            />
            <Button
              title="1000.00"
              onPress={() => confirmAlert(1000)}
              style={{
                marginTop: 5,
                marginRight: 10,
                borderColor: COLORS.black,

                borderWidth: 2,
                height: 50,
                width: 80,
                borderRadius: 20,
              }}
            />
          </View>

          <View style={{ marginBottom: 12, marginVertical: 25 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                marginVertical: 8,
                right: 5,
              }}
            >
              Custom Top-up
            </Text>

            <View
              style={{
                marginVertical: 20,
                width: 290,
                height: 50,
                borderColor: COLORS.black,
                borderWidth: 2,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 20,
              }}
            >
              <TextInput
                placeholder="Enter your amount"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "100%",
                  left: -1,
                }}
                onChangeText={(text) => {
                  const numericValue = text.replace(/[^0-9]/g, "");
                  if (numericValue === "" || numericValue.startsWith("-")) {
                    setTopup("0");
                  } else {
                    setTopup(numericValue);
                  }
                }}
              />
            </View>
          </View>

          <Button
            title="Proceed"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
              width: 300,
            }}
            onPress={() => confirmAlert(topup)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
