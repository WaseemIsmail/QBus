import Button from "../components/Button";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Pressable, Image } from "react-native";

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <Image
        source={require("../assets/bus.png")}
        style={{
          height: 300,
          width: 300,
          borderRadius: 20,
          position: "absolute",
          top: 50,
          left: 50,
          alignItems: "center",
        }}
      />

      {/* content  */}

      <View
        style={{
          paddingHorizontal: 22,
          position: "absolute",
          top: 400,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: COLORS.black,
          }}
        >
          Unlcok Seamless Travel with
        </Text>
        <Text
          style={{
            fontSize: 46,
            fontWeight: 800,
            color: COLORS.black,
          }}
        >
          QBus!
        </Text>

        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
              fontWeight: "700",
              marginVertical: 4,
            }}
          >
            Scan, Pay, Ride - It's That Easy.
          </Text>
        </View>

        <Button
          title="Sign up"
          onPress={() => navigation.navigate("Signup")}
          style={{
            marginTop: 22,
            width: "100%",
            fontWeight: "bold",
          }}
        />

        <View
          style={{
            flexDirection: "row",
            marginTop: 12,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: COLORS.white,
            }}
          >
            Already have an account ?
          </Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.white,
                fontWeight: "bold",
                marginLeft: 4,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
