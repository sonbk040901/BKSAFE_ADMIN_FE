import { Button, Divider, Image, Switch } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Animated from "react-native-reanimated";
import { ggMapApi } from "../api";
import { API_KEY, AutoCompleteResultType } from "../api/ggmap";
import useBookingAction from "../api/hook/useBookingAction";
import useCurrentBooking from "../api/hook/useCurrentBooking";
import Badge from "../components/common/Badge";
import { COLOR, IMAGE } from "../constants";
import useLocation from "../hook/useLocation";
import { emit } from "../socket";
import { AppNavigationProp } from "../types/navigation";
interface CurrentBookingProps {
  navigation: AppNavigationProp;
}

const CurrentBooking = ({}: CurrentBookingProps) => {
  const { booking, refetch } = useCurrentBooking();
  const [checked, setChecked] = useState(true);
  const { mutateAsync: bookingAction } = useBookingAction({});
  const { location, startLocation, stopLocation, setLocation } = useLocation();
  const [nextLocation, setNextLocation] =
    useState<AutoCompleteResultType["predictions"][number]>();
  const mapRef = useRef<MapView>(null);
  const { locations, user, price, status } = booking ?? {};
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
    if (checked) startLocation();
    return () => {
      if (checked) stopLocation();
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
            apikey={API_KEY}
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
      <View style={{ height: 400, paddingTop: 10 }}>
        <View style={{ padding: 15 }}>
          <Text style={{ color: COLOR.secondary }}>Hành khách</Text>
          <Text style={{ fontWeight: "500", fontSize: 18 }}>
            {user?.fullName}
          </Text>
        </View>
        <Divider
          width={1}
          style={{ opacity: 0.3, backgroundColor: COLOR.secondaryBackground }}
        />
        <View style={{ padding: 15 }}>
          <Text style={{ color: COLOR.secondary }}>Điểm đến tiếp theo</Text>
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
        <View style={{ padding: 15, flexDirection: "row", gap: 10 }}>
          <Badge
            bg={"#ffffffff"}
            title={`${price ? price.toLocaleString("vi-VN") : ""}đ`}
          />
          <Badge
            bg={"#dcdcdcff"}
            title={"Tiền mặt"}
          />
          <Badge
            bg={"#ffe75d"}
            title={"Khuyến mãi"}
          />
        </View>
        <Divider
          width={1}
          style={{ opacity: 0.3, backgroundColor: COLOR.secondaryBackground }}
        />
        <View style={{ padding: 15, flexDirection: "row" }}>
          <Button
            containerStyle={{ flex: 1 }}
            type="clear"
          >
            Nhắn tin
          </Button>
          <Button
            containerStyle={{ flex: 1 }}
            type="clear"
          >
            Gọi điện
          </Button>
        </View>
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
                bookingAction({ id: booking.id, action: "complete" }).then(
                  () => {
                    refetch();
                  },
                );
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
