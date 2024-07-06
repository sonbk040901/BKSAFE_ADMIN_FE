import { Button, Dialog, Icon } from "@rneui/themed";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { BookingStatus } from "../../api";
import DateTimePicker from "react-native-ui-datepicker";

interface FilterProps {
  time: Dayjs;
  status?: BookingStatus;
  onChange?: (time: Dayjs, status?: BookingStatus) => void;
}

const Filter = ({ time, status, onChange }: FilterProps) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <Button
        title={time.format("MM/YYYY")}
        icon={
          <Icon
            style={{ marginLeft: 5 }}
            name="calendar-month"
            type="material-community"
          />
        }
        type="outline"
        iconRight
        onPress={() => setOpen(true)}
      />
      <Button
        title={"Tất cả"}
        icon={
          <Icon
            name="chevron-down"
            type="feather"
            style={{ marginLeft: 5 }}
          />
        }
        iconRight
        type="outline"
        color="success"
      />

      <Dialog
        isVisible={open}
        onRequestClose={() => setOpen(false)}
        onDismiss={() => setOpen(false)}
        animationType="fade"
        statusBarTranslucent
        focusable
      >
        <View style={{ overflow: "scroll" }}>
          <DateTimePicker
            value={time}
            mode="date"
            onValueChange={(value) => {
              if (value) onChange?.(dayjs(value), status);
              setOpen(false);
            }}
          />
        </View>
      </Dialog>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
});
