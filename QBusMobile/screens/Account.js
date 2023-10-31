import axios from "axios";
import Button from "../components/Button";
import COLORS from "../constants/colors";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MyApiManager from "../ApiManager";

const Account = ({ navigation }) => {
  const route = useRoute();
  const id = route.params?.id;
  const [isChecked, setIsChecked] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("Male");
  const [nic, setNic] = useState("");

  const handleRegister = async () => {
    try {
      if (!firstname || !lastname || !gender || !nic) {
        console.error("Error: All fields must be filled.");
        return;
      }

      const apiManager = new MyApiManager();
      const response = await apiManager.instance.patch(
        `/api/user/profile/${id}`,
        {
          firstname,
          lastname,
          gender,
          nic,
          isRegistered: true,
        }
      );

      if (response.status === 200) {
        navigation.navigate("Home", { id });
      } else {
        console.error("Registration failed. Unexpected response:", response);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      navigation.navigate("Login");

      if (error.response && error.response.status === 400) {
        console.error("Server error:", error.response.data.error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Register as Local Passenger
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            First Name
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
            }}
          >
            <TextInput
              placeholder="First Name"
              placeholderTextColor={COLORS.black}
              style={{
                width: "100%",
              }}
              value={firstname}
              onChangeText={(text) => setFirstname(text)}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Last Name
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
            }}
          >
            <TextInput
              placeholder="Last Name"
              placeholderTextColor={COLORS.black}
              style={{
                width: "100%",
              }}
              value={lastname}
              onChangeText={(text) => setLastname(text)}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Gender
          </Text>
          <View
            style={{
              borderColor: COLORS.black,
              borderWidth: 1,
              height: 50,
              borderRadius: 8,
            }}
          >
            <Picker
              style={{
                borderWidth: 2,
                borderColor: COLORS.black,
                borderRadius: 5,
              }}
              selectedValue={gender}
              onValueChange={(itemValue) => {
                setGender(itemValue);
              }}
            >
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Male" value="Male" />
            </Picker>
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            NIC Number
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="NIC"
              placeholderTextColor={COLORS.black}
              style={{
                width: "80%",
              }}
              value={nic}
              onChangeText={(text) => setNic(text)}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text>I accept the terms and conditions</Text>
        </View>

        <Button
          title="Register"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          onPress={handleRegister}
        />
      </View>
    </SafeAreaView>
  );
};
export default Account;
