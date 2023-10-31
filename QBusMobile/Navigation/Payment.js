import COLORS from "../constants/colors";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import Button from "../components/Button";
import { useRoute } from "@react-navigation/native";
import MyApiManager from "../ApiManager";

const Payment = ({ navigation }) => {
  const route = useRoute();
  const id = route.params?.id;
  const amount = route.params?.amount;
  const [payType, setSelectedMethod] = useState(null);
  const [cardNo, setCardNo] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCVV] = useState("");

  const paymentMethods = [
    { id: 1, label: "Visa" },
    { id: 2, label: "Master" },
    { id: 3, label: "American Express" },
  ];

  const handleMethodSelection = (methodId) => {
    setSelectedMethod(methodId);
  };

  const apiManager = MyApiManager.getInstance();

  const topupAccount = async (balance) => {
    try {
      const response = await apiManager.instance.patch(
        `/api/user/topup/${id}`,
        {
          balance,
        }
      );
      if (response.status !== 200) {
        console.error(response.data.error);
      }
    } catch (err) {
      console.error("Api Failed:", err);
      if (err.response && err.response.status === 404) {
        console.error(err.response.data.error);
      }
    }
  };

  const handlePayment = async () => {
    try {
      const response = await apiManager.instance.post(`/api/payment/`, {
        payType: payType,
        cardNo: cardNo,
        expMonth: expMonth,
        expYear: expYear,
        cvv: cvv,
      });
      topupAccount(amount);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Signup failed:", error);
      if (error.response && error.response.status === 400) {
        console.error(error.response.data.error);
      }
    }
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
            Payment Confirmation
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
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                marginVertical: 8,
                right: 50,
              }}
            >
              Select Payment Method
            </Text>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => handleMethodSelection(method.id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: COLORS.black,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {payType === method.id && (
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: COLORS.black,
                      }}
                    />
                  )}
                </View>
                <Text style={{ marginLeft: 10 }}>{method.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "600",
                marginVertical: 8,
                right: 50,
              }}
            >
              Enter your card details
            </Text>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: -10,
                right: -3,
              }}
            >
              Card Number
            </Text>
            <View
              style={{
                width: "100%",
                height: 45,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                right: -3,
                marginVertical: 20,
              }}
            >
              <TextInput
                placeholder="XXXX-XXXX-XXXX-XXXX"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: 250,
                  right: 10,
                }}
                value={cardNo}
                onChangeText={(text) => setCardNo(text)}
              />
            </View>
          </View>
          <View flexDirection="row">
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: -10,
                  right: 10,
                }}
              >
                Exp Month
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 45,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  right: 10,
                  marginVertical: 20,
                }}
              >
                <TextInput
                  placeholderTextColor={COLORS.black}
                  keyboardType="numeric"
                  style={{
                    width: 100,
                    right: 15,
                  }}
                  value={expMonth}
                  onChangeText={(text) => setExpMonth(text)}
                />
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: -10,
                  left: 15,
                }}
              >
                Exp Year
              </Text>
              <View
                style={{
                  width: "100%",
                  height: 45,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  left: 15,
                  marginVertical: 20,
                }}
              >
                <TextInput
                  placeholderTextColor={COLORS.black}
                  keyboardType="numeric"
                  style={{
                    width: 100,
                    right: 15,
                  }}
                  value={expYear}
                  onChangeText={(text) => setExpYear(text)}
                />
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: -10,
                right: -3,
              }}
            >
              CVV
            </Text>
            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
                right: -3,
                marginVertical: 20,
              }}
            >
              <TextInput
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: 250,
                }}
                value={cvv}
                onChangeText={(text) => setCVV(text)}
              />
            </View>
          </View>
          <Button
            title="Proceed"
            filled
            style={{
              marginTop: -10,
              marginBottom: 4,
              width: 279,
            }}
            onPress={handlePayment}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Payment;
