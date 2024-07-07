import { useNavigation } from "@react-navigation/native";
import { Button, Divider, Image, Switch } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Animated from "react-native-reanimated";
import { ggMapApi } from "../api";
import { AutoCompleteResultType, getApiKey } from "../api/ggmap";
import useBookingAction from "../api/hook/useBookingAction";
import useCurrentBooking from "../api/hook/useCurrentBooking";
import Badge from "../components/common/Badge";
import UserInfo from "../components/home/UserInfo";
import { COLOR, IMAGE } from "../constants";
import useLocation from "../hook/useLocation";
import { emit } from "../socket";
import { AppNavigationProp } from "../types/navigation";
import { showAlert, showNativeAlert } from "../utils/alert";
interface CurrentBookingProps {
  navigation: AppNavigationProp;
}

const CurrentBooking = ({}: CurrentBookingProps) => {
  const navigation = useNavigation();
  const { booking, refetch, status: loadCurStatus } = useCurrentBooking();
  const [checked, setChecked] = useState(true);
  const { mutateAsync: bookingAction } = useBookingAction({});
  const { location, startLocation, stopLocation, setLocation } =
    useLocation("current-booking");
  const [nextLocation, setNextLocation] =
    useState<AutoCompleteResultType["predictions"][number]>();
  const mapRef = useRef<MapView>(null);
  const { locations, user, price, status } = booking ?? {};
  useEffect(() => {
    if (loadCurStatus === "error") {
      navigation.goBack();
      showNativeAlert("Không có chuyến đi nào hiện tại");
    }
  }, [booking, loadCurStatus, navigation]);
  useEffect(() => {
    if (!location) return;
    emit("driver/update-location", location);
  }, [location]);
  useEffect(() => {
    if (!locations || locations.length === 0) return;
    const sto = setTimeout(() => {
      mapRef.current?.fitToCoordinates(locations, {
        edgePadding: {
          top: 150 + 20 * locations.length,
          right: 50,
          bottom: 50,
          left: 50,
        },
        animated: true,
      });
    }, 300);
    return () => clearTimeout(sto);
  }, [locations]);
  useEffect(() => {
    const to = setTimeout(() => {
      startLocation().catch(() => {});
    }, 500);
    return () => {
      clearTimeout(to);
      stopLocation().catch(() => {});
    };
  }, [checked, startLocation, stopLocation]);
  useEffect(() => {
    if (!booking) return;
    const locations = booking.locations;
    const nextLocation = locations.find((l) => l.id === booking.nextLocationId);
    if (nextLocation) {
      ggMapApi.autoComplete(nextLocation.address).then((result) => {
        setNextLocation(result.predictions[0]);
      });
    }
  }, [booking]);
  if (!booking) return null;
  return (
    <View style={styles.container}>
      <View style={{ position: "absolute", top: 10, right: 10, zIndex: 999 }}>
        <Switch
          value={checked}
          onValueChange={setChecked}
        />
      </View>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        camera={{
          center: {
            latitude: 21.007326,
            longitude: 105.847328,
          },
          pitch: 0,
          heading: 0,
          altitude: 0,
          zoom: 12,
        }}
      >
        {locations && (
          <MapViewDirections
            apikey={getApiKey()}
            region="vn"
            language="vi"
            timePrecision="now"
            origin={locations[0]}
            destination={locations[locations.length - 1]}
            strokeWidth={3}
            strokeColor={COLOR.primary}
            waypoints={locations.slice(1, locations.length - 1)}
            geodesic
            mode="DRIVING"
            // onReady={({ distance }) => dispatch(setDistance(distance))}
          />
        )}

        {locations?.map((p, i) => {
          const { address, ...location } = p;
          const source =
            i == 0
              ? IMAGE.pin
              : i == locations.length - 1
              ? IMAGE.homePin
              : IMAGE.downPin;
          const title =
            i == 0
              ? "Điểm đón"
              : i == locations.length - 1
              ? "Điểm đến"
              : "Điểm dừng";
          return (
            <Marker
              key={address}
              coordinate={location}
              title={title}
            >
              <Animated.Image
                source={source}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Marker>
          );
        })}
        {location && (
          <Marker
            draggable={!checked}
            coordinate={location}
            image={IMAGE.driverPin}
            onDragEnd={(e) => {
              setLocation({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
          ></Marker>
        )}
      </MapView>
      <View
        style={{
          paddingVertical: 10,
          gap: 10,
          borderWidth: 0.5,
          borderColor: COLOR.secondaryBackground,
        }}
      >
        <View style={{ paddingHorizontal: 15 }}>
          <Text
            style={{
              fontWeight: "500",
              color: COLOR.secondary,
              marginBottom: 10,
            }}
          >
            Thông tin người đặt
          </Text>
          <UserInfo userProps={user ?? undefined} />
        </View>
        <Divider
          width={1}
          style={{ opacity: 0.3, backgroundColor: COLOR.secondaryBackground }}
        />
        <View style={{ paddingHorizontal: 15 }}>
          <Text
            style={{
              fontWeight: "500",
              color: COLOR.secondary,
              marginBottom: 10,
            }}
          >
            Điểm đến tiếp theo
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ paddingRight: 10 }}>
              <Image
                source={IMAGE.location}
                style={{ width: 26, height: 26 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "500", fontSize: 18 }}>
                {nextLocation?.structured_formatting.main_text}
              </Text>
              <Text style={{ color: COLOR.secondary, fontSize: 15 }}>
                {nextLocation?.description}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Badge
            type="primary"
            value={"Tiền mặt"}
            containerStyle={{ paddingVertical: 5, paddingHorizontal: 12 }}
            textStyle={{ fontSize: 20 }}
          />
          <Badge
            type="warning"
            value={`${
              price
                ? price.toLocaleString("vi", {
                    currency: "VND",
                    style: "currency",
                  })
                : ""
            }`}
            containerStyle={{ paddingVertical: 5, paddingHorizontal: 12 }}
            textStyle={{ fontSize: 20 }}
          />
        </View>
        <Divider
          width={1}
          style={{
            opacity: 0.3,
            backgroundColor: COLOR.secondaryBackground,
          }}
        />
        <View style={{ paddingHorizontal: 15 }}>
          <Button
            size="lg"
            onPress={() => {
              if (!booking?.id) return;
              if (status === "RECEIVED")
                bookingAction({ id: booking.id, action: "start" }).then(() => {
                  refetch();
                });
              else
                bookingAction({ id: booking.id, action: "complete" })
                  .then(() => {
                    navigation.goBack();
                  })
                  .catch(() => {
                    showAlert(
                      "Không thể hoàn thành chuyến đi",
                      "Bạn cách điểm đến quá xa!",
                    );
                  });
            }}
          >
            {status === "RECEIVED"
              ? "Bắt đầu chuyến đi"
              : "Hoàn thành chuyến đi"}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CurrentBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
