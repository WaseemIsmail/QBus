import Button from "../components/Button";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import MyApiManager from "../ApiManager";

const SelectionAcc = ({ navigation }) => {
  const route = useRoute();
  const id = route.params?.id;
  const apiManager = MyApiManager.getInstance();

  const handleRegister = async () => {
    try {
      const response = await apiManager.instance.patch(
        `/api/user/profile/${id}`,
        {
          isRegistered: true,
        }
      );
      navigation.navigate("Home", { id: id });
    } catch (error) {
      console.error("Registration failed:", error);
      navigation.navigate("Login");
      if (error.response && error.response.status === 400) {
        console.error(error.response.data.error);
      }
    }
  };
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ marginVertical: 22 }}>
        <Text
          style={{
            fontSize: 45,
            color: COLORS.blue,
            fontWeight: "700",
            marginVertical: 4,
            marginTop: 50,
            left: 30,
          }}
        >
          Choose Account
        </Text>
        <Image
          source={require("../assets/passenger.png")}
          style={{
            height: 400,
            width: 300,
            borderRadius: 20,
            position: "absolute",
            top: 80,
            left: 50,
            alignItems: "center",
            marginTop: 50,
          }}
        />

        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 400,
            width: "80%",
            left: 40,
            marginTop: 100,
          }}
        >
          <Button
            filled
            title="Local Passenger"
            style={{
              marginTop: 60,
              width: "80%",
              fontWeight: "bold",
              left: 40,
            }}
            onPress={() => navigation.navigate("Account", { id: id })}
          />

          <Button
            filled
            title="Foreign Passenger"
            style={{
              marginTop: 22,
              width: "80%",
              fontWeight: "bold",
              left: 40,
            }}
            onPress={handleRegister}
          />

          <Button
            filled
            title="Buses & Inspectors"
            style={{
              marginTop: 22,
              width: "80%",
              fontWeight: "bold",
              left: 40,
            }}
            onPress={() => navigation.navigate("BusHome")}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default SelectionAcc;
