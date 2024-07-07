import { Button, Divider, Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ggMapApi } from "../api";
import { AutoCompleteResultType } from "../api/ggmap";
import { useBookingReceive } from "../api/hook";
import useBookingAction from "../api/hook/useBookingAction";
import Badge from "../components/common/Badge";
import { COLOR, STYLE } from "../constants";
import { AppNavigationProp } from "../types/navigation";
interface BookingReceiveProps {
  navigation: AppNavigationProp;
}
const toKVND = (price: number) => {
  return parseInt((price / 1000).toFixed(0)).toLocaleString("vi-VN");
};

const BookingReceive: FC<BookingReceiveProps> = (props) => {
  const { navigation } = props;
  const { booking } = useBookingReceive();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [countdown, setCountdown] = useState(20);
  const [locations, setLocations] =
    useState<AutoCompleteResultType["predictions"]>();
  const { mutateAsync: bookingAction } = useBookingAction({});
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
      <View style={styles.top}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Icon
              name="cancel"
              size={30}
              color={COLOR.white}
              selectable
            />
          </TouchableOpacity>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.currency}>VND</Text>
          <Text style={[styles.price, STYLE.shadow]}>
            {toKVND(booking.price)} K
          </Text>
          <View style={styles.badges}>
            <Badge
              value="Tiền mặt"
              type="warning"
            />
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text>Ghi chú: bla bla</Text>
          </View>
        </View>
      </View>
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
            <Text style={styles.distance}>Cách bạn 0.03 km</Text>
            <Button type="clear">
              Xem trên bản đồ {""}
              <Icon
                name="map"
                size={20}
                color={COLOR.primary}
              />
            </Button>
          </View>
          <ScrollView
            style={{
              paddingTop: 20,
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
    fontSize: 60,
    fontWeight: "500",
  },
  badges: {
    flexDirection: "row",
    gap: 10,
  },
  bottom: {
    flex: 7,
    backgroundColor: COLOR.white,
    padding: 15,
    flexDirection: "column",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  distance: {
    color: COLOR.secondary,
    fontSize: 15,
    fontWeight: "500",
  },
  locationList: {
    flex: 1,
  },
  confirmBtn: {},
  countdown: {
    position: "absolute",
    right: 30,
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
