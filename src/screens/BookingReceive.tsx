import { Button, Divider } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Animated from "react-native-reanimated";
import { ggMapApi } from "../api";
import { AutoCompleteResultType, getApiKey } from "../api/ggmap";
import { useBookingReceive } from "../api/hook";
import useBookingAction from "../api/hook/useBookingAction";
import Badge from "../components/common/Badge";
import { COLOR, IMAGE, STYLE } from "../constants";
import {
  AppNavigationProp,
  BookingReceiveRouteProp,
} from "../types/navigation";
interface BookingReceiveProps {
  navigation: AppNavigationProp;
  route: BookingReceiveRouteProp;
}
const BookingReceive: FC<BookingReceiveProps> = (props) => {
  const { navigation, route } = props;
  const { booking } = useBookingReceive();
  const { currentLocation } = route.params;
  const [distanceInfo, setDistanceInfo] = useState<{
    distance: number;
    duration: number;
  }>();
  const [countdown, setCountdown] = useState(20);
  const [locations, setLocations] =
    useState<AutoCompleteResultType["predictions"]>();
  const { mutateAsync: bookingAction } = useBookingAction({});
  const mapRef = useRef<MapView>(null);
  const handleBack = useCallback(() => {
    if (!booking) return;
    bookingAction({
      action: "reject",
      id: booking.id,
    }).finally(() => navigation.pop());
  }, [booking, bookingAction, navigation]);
  const handleAccept = useCallback(() => {
    if (booking)
      bookingAction({
        action: "accept",
        id: booking.id,
      }).finally(() => navigation.replace("CurrentBooking"));
  }, [booking, bookingAction, navigation]);
  useEffect(() => {
    if (!booking) return;
    const locations = booking.locations;
    Promise.all(
      locations.map(async (location) => {
        const result = await ggMapApi.autoComplete(location.address);
        return (
          result.predictions[0] ?? {
            description: location.address,
            structured_formatting: { main_text: location.address },
          }
        );
      }),
    ).then(setLocations);
  }, [booking]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          handleBack();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [handleBack]);
  useEffect(() => {
    const locations = booking?.locations;
    if (!locations || locations.length === 0) return;
    const sto = setTimeout(() => {
      mapRef.current?.fitToCoordinates(locations, {
        edgePadding: {
          top: 80 + 10 * locations.length,
          right: 30,
          bottom: 30,
          left: 30,
        },
        animated: true,
      });
    }, 300);
    return () => clearTimeout(sto);
  }, [booking?.locations]);
  if (!booking)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator
          color={COLOR.primary}
          size="large"
        />
      </View>
    );

  return (
    <LinearGradient
      colors={[COLOR.primary, "#ffffff", "#ffffff", "#429aff"]}
      start={{ x: 0.3, y: 0 }}
      style={styles.container}
    >
      <MapView
        ref={mapRef}
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
        style={{ height: 450 }}
      >
        <MapViewDirections
          apikey={getApiKey()}
          region="vn"
          language="vi"
          timePrecision="now"
          origin={booking.locations[0]}
          destination={booking.locations[booking.locations.length - 1]}
          strokeWidth={3}
          strokeColor={COLOR.primary}
          waypoints={booking.locations.slice(1, booking.locations.length - 1)}
          geodesic
          mode="DRIVING"
        />

        <Marker
          coordinate={currentLocation}
          title="Vị trí của bạn"
          description="Đây là vị trí hiện tại của bạn"
        >
          <Animated.Image
            source={IMAGE.driverPin}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </Marker>
        <MapViewDirections
          apikey={getApiKey()}
          region="vn"
          language="vi"
          timePrecision="now"
          origin={currentLocation}
          destination={booking.locations[0]}
          strokeWidth={3}
          strokeColor={COLOR.warning}
          geodesic
          mode="DRIVING"
          onReady={(res) => setDistanceInfo(res)}
        />

        {booking.locations?.map((p, i) => {
          const { address, ...location } = p;
          const source =
            i == 0
              ? IMAGE.userPin
              : i == booking.locations.length - 1
              ? IMAGE.homePin
              : IMAGE.downPin;
          const title =
            i == 0
              ? "Điểm đón"
              : i == booking.locations.length - 1
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
                style={{ width: 35, height: 35 }}
                resizeMode="contain"
              />
            </Marker>
          );
        })}
      </MapView>
      <LinearGradient
        colors={[
          "#95c6ff1a",
          "#ffffff",
          "#95c6ff1a",
          "#ffffff",
          "#95c6ff1a",
          "#ffffff",
        ]}
        start={{ x: 0, y: 0 }}
        style={[styles.bottom]}
      >
        <View style={styles.locationList}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.distance}>
              Cách bạn {distanceInfo?.distance.toFixed(2)} km (khoảng{" "}
              {distanceInfo?.duration.toFixed(0)} phút)
            </Text>
            {/* <Button type="clear">
              Xem trên bản đồ{" "}
              <Icon
                name="map"
                size={20}
                color={COLOR.primary}
              />
            </Button> */}
          </View>
          <ScrollView
            style={{
              paddingTop: 5,
              height: 200,
              overflow: "hidden",
            }}
          >
            {locations ? (
              locations.map((location, i) => {
                if (i === 0)
                  return (
                    <Position
                      key={i}
                      data={location}
                      icon={<Circle />}
                    />
                  );
                return (
                  <Position
                    key={i}
                    data={location}
                    isLast={i === locations.length - 1}
                    icon={<Triangle />}
                  />
                );
                // return <CustomDivider key={i} />;
              })
            ) : (
              <ActivityIndicator
                color={COLOR.primary}
                size="large"
              />
            )}
          </ScrollView>
        </View>
        <View style={{ marginBottom: 10, gap: 5 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={[styles.price, STYLE.shadow]}>
              Giá:{" "}
              {booking.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
            <Badge
              value="Tiền mặt"
              type="warning"
            />
          </View>
          <View style={{}}>
            <Text style={{ fontWeight: "500", color: COLOR.secondary }}>
              Ghi chú: {booking.note ? booking.note : "Không có"}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button
            containerStyle={{
              flex: 1,
              borderWidth: 0.4,
              borderColor: COLOR.error,
            }}
            buttonStyle={{ backgroundColor: COLOR.errorBackground }}
            titleStyle={{ color: COLOR.error }}
            size="lg"
            onPress={handleBack}
          >
            Từ chối
          </Button>
          <Button
            containerStyle={styles.confirmBtn}
            size="lg"
            onPress={handleAccept}
          >
            Chấp nhận
            <View style={styles.countdown}>
              <Text
                style={[
                  styles.countdownText,
                  {
                    color:
                      countdown < 10
                        ? countdown < 6
                          ? "#ff6060"
                          : "#ffb060"
                        : "white",
                  },
                ]}
              >
                {countdown}
              </Text>
            </View>
          </Button>
        </View>
      </LinearGradient>
    </LinearGradient>
  );
};

export default BookingReceive;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primary,
    flex: 1,
  },
  top: {
    flex: 4,
  },
  header: {
    flexDirection: "row-reverse",
    paddingLeft: 15,
    paddingTop: 30,
  },
  priceContainer: {
    padding: 25,
  },
  currency: {
    color: COLOR.dark,
    fontSize: 20,
    fontWeight: "500",
  },
  price: {
    color: COLOR.dark,
    fontSize: 25,
    fontWeight: "600",
  },
  badges: {
    flexDirection: "row",
    gap: 10,
  },
  bottom: {
    flex: 1,
    backgroundColor: COLOR.white,
    padding: 15,
    paddingTop: 10,
    flexDirection: "column",
  },
  distance: {
    color: COLOR.secondary,
    fontSize: 13,
    fontWeight: "500",
    paddingVertical: 2,
  },
  locationList: {
    flex: 1,
  },
  confirmBtn: {
    flex: 2,
    borderWidth: 0.4,
    borderColor: COLOR.primary,
  },
  countdown: {
    position: "absolute",
    right: 18,
    backgroundColor: "#bdbdbd3f",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  countdownText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  item: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
const Position = ({
  data,
  icon,
  isLast,
}: {
  data: AutoCompleteResultType["predictions"][number];
  icon: React.ReactNode;
  isLast?: boolean;
}) => {
  return (
    <View style={[]}>
      <View style={styles.item}>
        {icon}
        <Text style={sr.itemTitle}>{data.structured_formatting.main_text}</Text>
      </View>
      <View
        style={[
          styles.item,
          {
            alignItems: "stretch",
            maxHeight: 60,
            borderLeftWidth: 1.5,
            borderLeftColor: isLast ? "transparent" : COLOR.primary,
            marginLeft: 6,
            paddingLeft: 16,
          },
        ]}
      >
        <View style={{ flex: 1, gap: 10, paddingBottom: 10 }}>
          <Text
            numberOfLines={2}
            style={[sr.itemDescription]}
          >
            {data.description}
          </Text>
          {!isLast && <Divider />}
        </View>
      </View>
      {/* <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={[sr.itemDescription, { paddingLeft: 25 }]}>
          {data.description}
        </Text>
      </View> */}
    </View>
  );
};
const Circle = () => {
  return (
    <View
      style={{
        width: 13,
        height: 13,
        borderRadius: 999,
        backgroundColor: COLOR.primary,
      }}
    ></View>
  );
};
const Triangle = () => {
  return (
    <View
      style={{
        width: 13,
        height: 10,
        backgroundColor: COLOR.primary,
        borderTopWidth: 10,
        borderTopColor: COLOR.primary,
        borderRightColor: "white",
        borderRightWidth: 6.5,
        borderLeftWidth: 6.5,
        borderLeftColor: "white",
      }}
    ></View>
  );
};
const sr = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#f2f2f2",
    height: 50,
    borderRadius: 7,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  item: {
    marginVertical: 8,
    marginTop: 17,
    gap: 3,
  },
  itemTitle: { fontSize: 19, fontWeight: "700", color: COLOR.dark },
  itemDescription: { color: COLOR.secondary },
});
