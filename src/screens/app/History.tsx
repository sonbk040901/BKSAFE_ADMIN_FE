import dayjs from "dayjs";
import React, { useMemo, useState, type FC } from "react";
import { StyleSheet, View } from "react-native";
import { Booking, PagingAndSortResponse, bookingApi } from "../../api";
import { useFetch } from "../../api/hook";
import AppWrapper from "../../components/AppWrapper";
import Card from "../../components/Card";
import Filter from "../../components/history/Filter";
import Items from "../../components/history/Items";
import Statistic from "../../components/history/Statistic";
import type { AuthNavigationProp } from "../../types/navigation";
import { FindAllBookingDTO } from "../../api/booking";
const initialData: PagingAndSortResponse<Booking> = {
  data: [],
  skip: 0,
  take: 10,
  total: 0,
  order: "desc",
  sort: "id",
};

interface HistoryProps {
  navigation: AuthNavigationProp;
}
const History: FC<HistoryProps> = ({ navigation }) => {
  const [filter, setFilter] = useState<FindAllBookingDTO>({});
  const {
    data: { data: bookings },
    isLoading,
    refetch,
  } = useFetch(
    {
      fetchFn: () => bookingApi.getAll(filter),
      initialData,
    },
    [filter],
  );
  const statistic = useMemo(() => {
    return {
      totalPrice: bookings.reduce((a, b) => a + b.price, 0),
      totalTravle: bookings.length,
      completedTravle: bookings.filter((item) => item.status === "COMPLETED")
        .length,
      canceledTravle: bookings.filter((item) => item.status === "CANCELLED")
        .length,
    };
  }, [bookings]);
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Statistic {...statistic} />
        <Card style={{ height: 550, flex: 1 }}>
          <Filter
            time={filter.time ? dayjs(filter.time) : dayjs()}
            onChange={(time, status) => {
              setFilter({ ...filter, time: time.format("YYYY-MM-DD"), status });
            }}
          />
          <Items
            loading={isLoading}
            navigation={navigation}
            data={bookings}
            onRequestRefresh={refetch}
          />
        </Card>
      </View>
    </AppWrapper>
  );
};
export default History;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: 20,
    paddingBottom: 20,
  },
});
