import { Button, Switch, Text } from "@rneui/themed";
import React, { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { bookingApi, driverApi } from "../../api";
import AppWrapper from "../../components/AppWrapper";
import Card from "../../components/Card";
import UserDetailModal from "../../components/common/UserDetailModal";
import Hotline from "../../components/home/Hotline";
import { useInitAppContext } from "../../hook/useInitApp";
import useLocation from "../../hook/useLocation";
import { emit, subcribe } from "../../socket";
import type { AppNavigationProp } from "../../types/navigation";
import { showNativeAlert } from "../../utils/alert";
import { COLOR } from "../../constants";
import Icon from "../../components/common/Icon";
interface HomeProps {
  navigation: AppNavigationProp;
}
const Home: FC<HomeProps> = ({ navigation }) => {
  const { data } = useInitAppContext();
  const [checked, setChecked] = useState(false);
  const { location, startLocation, stopLocation, setLocation } =
    useLocation("home");
  const mapRef = useRef<MapView>(null);
  const handleToggleReceiveBooking = () => {
    setChecked((prev) => !prev);
  };
  const handleNavigateCurrent = async () => {
    const isExist = await bookingApi.checkCurrentBooking();
    if (!isExist) {
      showNativeAlert("Không có chuyến đi nào");
      return;
    }
    navigation.push("CurrentBooking");
  };
  useEffect(() => {
    if (!location) return;
    emit("driver/update-location", location);
  }, [location]);
  useEffect(() => {
    driverApi.updateStatus(checked ? "AVAILABLE" : "BUSY");
    if (!checked) return;
    startLocation();
    return () => {
      stopLocation();
    };
  }, [checked, startLocation, stopLocation]);
  useEffect(() => {
    if (!location) return;
    return subcribe("booking/suggest", () => {
      stopLocation();
      navigation.push("BookingReceive", { currentLocation: location });
    });
  }, [location, navigation, stopLocation]);
  useEffect(() => {
    if (!location) return;
    mapRef.current?.animateCamera({
      center: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  }, [location]);
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>
            Xin chào, tài xế {data?.fullName}!
          </Text>
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
                Tài xế đang {checked ? "rảnh" : "bận"}
              </Text>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 20,
                  color: checked ? COLOR.success : COLOR.error,
                }}
              >
                {checked ? "Sẵn sàng" : "Không"} nhận đặt tài xế
              </Text>
            </View>
            <Switch
              value={checked}
              onValueChange={handleToggleReceiveBooking}
            />
          </View>
          <View style={{ gap: 20 }}>
            <Button onPress={handleNavigateCurrent}>
              Xem chuyến đi hiện tại
            </Button>
          </View>
        </Card>
        <Card style={{ marginTop: 15 }}>
          <MapView
            ref={mapRef}
            style={{ height: 200 }}
            camera={{
              center: {
                latitude: 21.007326,
                longitude: 105.847328,
              },
              pitch: 0,
              heading: 0,
              altitude: 0,
              zoom: 13,
            }}
          >
            <Marker
              draggable
              onDragStart={() => {
                stopLocation();
              }}
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
            >
              <Icon
                type="image"
                name="driverPin"
                size={30}
              />
            </Marker>
          </MapView>
        </Card>
      </View>
      <UserDetailModal />
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
