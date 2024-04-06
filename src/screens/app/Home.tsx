import { Button, Text } from "@rneui/themed";
import React, { FC, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useRecentsBooking } from "../../api/hook";
import AppWrapper from "../../components/AppWrapper";
import Card from "../../components/Card";
import TravelCard from "../../components/home/TravelCard";
import { COLOR } from "../../constants/color";
import type { AppNavigationProp } from "../../types/navigation";
import { bookingSocket } from "../../socket";
import { useAppDispatch } from "../../states";
import { patchBooking } from "../../states/slice/booking";
import { Booking } from "../../api";
interface HomeProps {
  navigation: AppNavigationProp;
}
const Home: FC<HomeProps> = ({ navigation }) => {
  const { data, refetch, status } = useRecentsBooking();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", refetch);
    return unsubscribe;
  }, [navigation, refetch]);
  useEffect(() => {
    if (status !== "success") return;
    const unsubscribe = bookingSocket.listenCurrentBooking(refetch);
    return unsubscribe;
  }, [refetch, status]);
  const handleSelectBooking = (data?: Nullable<Booking>) => () => {
    const booking = data ?? undefined;
    dispatch(patchBooking(booking));
    navigation.push("Map");
  };
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Xin chào, Lê Đức Sơn!</Text>
          <View style={styles.cardContent}>
            <Text style={styles.text}>Bạn muốn có một chuyến đi an toàn?</Text>
            <Text style={styles.text}>Hãy sử dụng BKSafe!</Text>
          </View>
          <Text style={styles.cardAction}>
            <Button
              title={
                data?.current
                  ? "Xem chuyến đi hiện tại"
                  : "Thuê tài xế ngay bây giờ"
              }
              radius="md"
              buttonStyle={{ backgroundColor: COLOR.primary }}
              onPress={handleSelectBooking(data?.current)}
              icon={{
                name: "chevron-right",
                size: 20,
                color: "white",
                type: "feather",
              }}
              iconRight
            />
          </Text>
        </Card>
        <ScrollView
          style={{
            flex: 1,
            width: "100%",
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={status === "loading"}
              onRefresh={refetch}
            />
          }
        >
          {data && (
            <View
              style={{ alignItems: "center", gap: 20, paddingVertical: 20 }}
            >
              <TravelCard
                title="Chuyến đi hiện tại"
                data={data.current}
                onPress={handleSelectBooking(data.current)}
              />
              {data.recent && (
                <TravelCard
                  title="Chuyến đi trước"
                  data={data.recent}
                  onPress={handleSelectBooking(data.recent)}
                />
              )}
            </View>
          )}
        </ScrollView>
      </View>
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
