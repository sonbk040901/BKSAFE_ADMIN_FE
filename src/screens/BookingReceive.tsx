import { Button, Divider, Icon } from "@rneui/themed";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ggMapApi } from "../api";
import { AutoCompleteResultType } from "../api/ggmap";
import { useBookingReceive } from "../api/hook";
import Badge from "../components/common/Badge";
import { COLOR, STYLE } from "../constants";
import {
  AppNavigationProp,
  BookingReceiveRouteProp,
} from "../types/navigation";
interface BookingReceiveProps {
  navigation: AppNavigationProp;
  route: BookingReceiveRouteProp;
}
const toKVND = (price: number) => {
  return parseInt((price / 1000).toFixed(0)).toLocaleString("vi-VN");
};

const BookingReceive: FC<BookingReceiveProps> = (props) => {
  const { navigation, route } = props;
  const { booking } = useBookingReceive({
    bookingId: route.params.bookingId,
  });
  const [locations, setLocations] =
    useState<AutoCompleteResultType["predictions"]>();
  const handleBack = () => {
    navigation.pop();
  };
  useEffect(() => {
    if (!booking) return;
    const locations = booking.locations;
    Promise.all(
      locations.map(async (location) => {
        const result = await ggMapApi.autoComplete(location.address);
        return result.predictions[0];
      }),
    ).then(setLocations);
    // ggMapApi.autoComplete();
  }, [booking]);
  if (!booking) return null;

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Icon
              name="cancel"
              size={30}
              color={COLOR.secondary}
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
              bg={"#dcdcdcff"}
              title={"Tiền mặt"}
            />
            <Badge
              bg={"#ffe75d"}
              title={"Khuyến mãi"}
            />
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text>Ghi chú: bla bla</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.locationList}>
          <Text style={styles.distance}>Cách bạn 0.03 km</Text>
          <View
            style={{
              paddingTop: 20,
            }}
          >
            {locations &&
              Array(locations.length * 2 - 1)
                .fill(0)
                .map((_, i) => {
                  if (i === 0)
                    return (
                      <Position
                        key={i}
                        data={locations[0]}
                        icon={<Circle />}
                      />
                    );
                  if (i % 2 === 0)
                    return (
                      <Position
                        key={i}
                        data={locations[i / 2]}
                        icon={<Triangle />}
                      />
                    );
                  return <CustomDivider key={i} />;
                })}
          </View>
        </View>
        <Button
          containerStyle={styles.confirmBtn}
          size="lg"
        >
          Chấp nhận
          <View style={styles.countdown}>
            <Text style={styles.countdownText}>10</Text>
          </View>
        </Button>
      </View>
    </View>
  );
};

export default BookingReceive;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primaryBackground,
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
    fontSize: 20,
    fontWeight: "500",
  },
  price: {
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
    backgroundColor: COLOR.secondaryBackground,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  countdownText: {
    color: "white",
    fontSize: 16,
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
}: {
  data: AutoCompleteResultType["predictions"][number];
  icon: React.ReactNode;
}) => {
  return (
    <View style={[]}>
      <View style={styles.item}>
        {icon}
        <Text style={sr.itemTitle}>{data.structured_formatting.main_text}</Text>
      </View>
      <Text style={[sr.itemDescription, { paddingLeft: 25 }]}>
        {data.description}
      </Text>
    </View>
  );
};
const CustomDivider = () => {
  return (
    <View style={styles.item}>
      <View style={{ width: 13, alignItems: "center" }}>
        <Line />
      </View>
      <View style={{ flex: 1 }}>
        <Divider />
      </View>
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
const Line = () => {
  return (
    <View
      style={{
        height: 30,
        // width: 1.5,
        borderRadius: 2,
        backgroundColor: COLOR.primary,
      }}
    />
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
  itemTitle: { fontSize: 18 },
  itemDescription: { color: "gray" },
});
