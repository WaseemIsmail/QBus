import axios from "axios";
import COLORS from "../constants/colors";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import MyApiManager from "../ApiManager";
import { useFocusEffect } from "@react-navigation/native";

const TicketScreen = () => {
  const route = useRoute();
  const id = route.params?.id;

  const [tickets, setTickets] = useState();
  const apiManager = MyApiManager.getInstance();

  const getTickets = async (id) => {
    try {
      const response = await apiManager.instance.get(`/api/user/${id}/tickets`);
      if (response.status === 200) {
        setTickets(response.data);
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
      getTickets(id);
    }, [apiManager, id])
  );

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    const formattedDate = new Date(dateString).toLocaleString(
      undefined,
      options
    );

    return formattedDate;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View
        style={{
          height: "22%",
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

      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 800,
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            Ticket History
          </Text>
        </View>
        <ScrollView
          style={{
            top: 40,
            marginBottom: 80,
          }}
        >
          {tickets?.map((t, key) => (
            <View
              style={{
                marginBottom: 25,
                flex: 1,
                backgroundColor: "#f0f0f0",
                paddingTop: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                elevation: 10,
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {t.pickup} - {t.dropOff} ({t.routeNumber})
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Fare : Rs.{t.ticketPrice}.00
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Distance : {t.distance}
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {formatDate(t.createdAt)}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default TicketScreen;
