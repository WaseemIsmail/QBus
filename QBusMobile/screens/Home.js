import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InfoScreen from "../Navigation/InfoScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import TicketScreen from "../Navigation/TicketScreen";
import TopupScreen from "../Navigation/TopupScreen";
import { useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function HomePage() {
  const route = useRoute();
  const id = route.params?.id;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={InfoScreen}
        initialParams={{ id }}
        options={{
          title: "Home page",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Topup"
        component={TopupScreen}
        initialParams={{ id }}
        options={{
          title: "Topup",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account-cash"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        initialParams={{ id }}
        options={{
          title: "Ticket",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="ticket" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
