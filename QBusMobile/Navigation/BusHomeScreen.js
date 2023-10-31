import { BarCodeScanner } from "expo-barcode-scanner";
import COLORS from "../constants/colors";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, Alert } from "react-native";
import MyApiManager from "../ApiManager";
import { SelectList } from "react-native-dropdown-select-list";

const BusHomeScreen = () => {
  const [id, setId] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [routes, setRoutes] = useState();
  const [selected, setSelected] = useState(null);
  const [scanCooldown, setScanCooldown] = useState(false);

  useEffect(() => {
    const getRoutes = async () => {
      try {
        const response = await MyApiManager.getInstance().instance.get(
          "/api/route/"
        );
        if (response.status === 200) {
          setRoutes(
            response.data.map((c) => {
              const [pickup, dropOff] = c.routeName.split("-");
              return {
                ...c,
                pickup,
                dropOff,
              };
            })
          );
        } else {
          console.error(response.data.error);
        }
      } catch (error) {
        console.error("Transaction API failed:", error);
        if (error.response) {
          console.error(error.response.data.error);
        }
      }
    };
    getRoutes();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const deductFee = async () => {
    try {
      await MyApiManager.getInstance().instance.patch(`/api/user/topup/${id}`, {
        balance: -selectedRoute.totalBusFare,
      });
    } catch (error) {
      console.error("Transaction API failed:", error);
      if (error.response) {
        console.error(error.response.data.error);
      }
    }
  };

  const createTicket = async () => {
    try {
      console.log(id);
      await MyApiManager.getInstance().instance.post("/api/ticket/", {
        ticketPrice: selectedRoute.totalBusFare,
        distance: selectedRoute.distance,
        routeNumber: selectedRoute.routeNumber,
        pickup: selectedRoute.pickup,
        dropOff: selectedRoute.dropOff,
        user: id,
      });
      alert("Success.");
      deductFee();
    } catch (error) {
      console.error("API failed:", error);
      if (error.response) {
        console.error(error.response.data.error);
      }
    }
  };

  const getBalance = async (id) => {
    try {
      const response = await MyApiManager.getInstance().instance.get(
        `/api/user/balance/${id}`
      );
      if (response.status === 200) {
        if (response.data.balance > 500) {
          createTicket();
        } else {
          Alert.alert(
            "Error",
            "Insufficient balance. Required minimum amount of Rs. 500.00.",
            [
              {
                text: "Ok",
                onPress: () => console.log("Insufficient balance"),
              },
            ]
          );
        }
      } else {
        console.error(response.data.error);
        return false;
      }
    } catch (err) {
      console.error("Api Failed:", err);
      if (err.response) {
        console.error(err.response.data.error);
      }
      return false;
    }
  };

  const handleBarCodeScanned = (data) => {
    if (!scanCooldown) {
      setScanned(true);
      setId(data.data);
      getBalance(data.data);
      setScanCooldown(true);
      setTimeout(() => {
        setScanCooldown(false);
        setScanned(false);
      }, 5000); // 3000ms = 3 seconds
    }
  };

  const routesSelection = routes?.map((item) => {
    return {
      key: item._id,
      value: item.routeName,
    };
  });

  const selectedRoute = routes?.find((item) => item._id === selected);

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={routesSelection}
          save="key"
          search={false}
        />
        {selected !== null &&
          (!scanned ? (
            <View style={styles.container}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          ) : (
            <Text
              style={{
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              Please Wait...
            </Text>
          ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});

export default BusHomeScreen;
