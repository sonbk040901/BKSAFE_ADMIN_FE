import { Dialog, Divider } from "@rneui/themed";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import useBookings from "../../api/hook/useBookings";
import AppWrapper from "../../components/AppWrapper";
import Card from "../../components/Card";
import Filter from "../../components/history/Filter";
import Items from "../../components/history/Items";
import Statistic from "../../components/history/Statistic";
import type { AuthNavigationProp } from "../../types/navigation";

interface HistoryProps {
  navigation: AuthNavigationProp;
}
const History = ({}: HistoryProps) => {
  const [value, setValue] = useState(dayjs());
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState({});
  const { bookings, isLoading, refetch } = useBookings(filter);
  const statistic = useMemo(() => {
    return {
      totalPrice: bookings.reduce((a, b) => a + b.price, 0),
      totalTravle: bookings.length,
    };
  }, [bookings]);
  return (
    <AppWrapper>
      <View style={styles.container}>
        <Statistic {...statistic} />
        <Card style={{ height: 510 }}>
          <Filter time={value} />
          <Divider width={0.5} />
          <Items
            loading={isLoading}
            data={bookings}
            onRequestRefresh={refetch}
          />
        </Card>
      </View>
      <Dialog
        isVisible={open}
        onRequestClose={() => setOpen(false)}
        animationType="fade"
        statusBarTranslucent
      >
        <View style={{ overflow: "scroll" }}>
          <DateTimePicker
            value={value}
            mode="date"
            onValueChange={(value) => {
              setValue(dayjs(value));
              setOpen(false);
            }}
          />
        </View>
      </Dialog>
    </AppWrapper>
  );
};
export default History;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: 20,
  },
});
