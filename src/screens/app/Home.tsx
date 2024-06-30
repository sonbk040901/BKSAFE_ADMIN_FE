import { Button, Switch, Text } from "@rneui/themed";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { driverApi } from "../../api";
import AppWrapper from "../../components/AppWrapper";
import Card from "../../components/Card";
import { useInitAppContext } from "../../hook/useInitApp";
import useLocation from "../../hook/useLocation";
import { emit, subcribe } from "../../socket";
import type { AppNavigationProp } from "../../types/navigation";
import Hotline from "../../components/home/Hotline";
interface HomeProps {
  navigation: AppNavigationProp;
}
const Home: FC<HomeProps> = ({ navigation }) => {
  const { data } = useInitAppContext();
  const [checked, setChecked] = useState(false);
  const [receiveBooking, setReceiveBooking] = useState(false);
  const { location, startLocation, stopLocation, setLocation } =
    useLocation("home");
  const handleToggleLocation = () => {
    if (checked) {
      stopLocation();
      setChecked(false);
      return;
    }
    startLocation();
    setChecked(true);
  };
  const handleToggleReceiveBooking = () => {
    setReceiveBooking((prev) => !prev);
  };
  useEffect(() => {
    if (!location) return;
    emit("driver/update-location", location);
  }, [location]);
  useEffect(() => {
    driverApi.updateStatus(receiveBooking ? "AVAILABLE" : "BUSY");
  }, [receiveBooking]);
  useEffect(() => {
    return subcribe("booking/suggest", () => navigation.push("BookingReceive"));
  }, [navigation]);
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Xin chào, {data?.fullName}!</Text>
          <View style={styles.cardContent}>
            <Text style={styles.text}>Bạn muốn kiếm thêm thu nhập?</Text>
            <Text style={styles.text}>Hãy sử dụng BKSafe dành cho tài xế!</Text>
          </View>
        </Card>
        <Card style={{ marginTop: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                Tài xế đang {receiveBooking ? "rảnh" : "bận"}
              </Text>
              <Text style={{ fontWeight: "500", fontSize: 20 }}>
                {receiveBooking ? "Sẵn sàng" : "Không"} nhận đặt tài xế
              </Text>
            </View>
            <Switch
              value={receiveBooking}
              onValueChange={handleToggleReceiveBooking}
            />
          </View>
          <View style={{ gap: 20 }}>
            <Button onPress={() => navigation.push("CurrentBooking")}>
              Xem chuyến đi hiện tại
            </Button>
          </View>
        </Card>
        <Card style={{ marginTop: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{checked ? "Tắt" : "Bật"} chia sẻ vị trí</Text>
            <Switch
              value={checked}
              onValueChange={handleToggleLocation}
            />
          </View>
          <MapView
            style={{ height: 200 }}
            camera={{
              center: {
                latitude: 21.007326,
                longitude: 105.847328,
              },
              pitch: 0,
              heading: 0,
              altitude: 0,
              zoom: 15,
            }}
          >
            <Marker
              draggable={!checked}
              onDragEnd={(e) => {
                setLocation({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                });
              }}
              coordinate={{
                latitude: location?.latitude ?? 21.007326,
                longitude: location?.longitude ?? 105.847328,
              }}
              title="Vị trí của bạn"
              description="Đây là vị trí hiện tại của bạn"
            />
          </MapView>
        </Card>
      </View>
      <Hotline />
    </AppWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  card: {
    alignItems: "center",
    gap: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  cardAction: {},
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 7,
    elevation: 5,
  },
});
