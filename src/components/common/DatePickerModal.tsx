import { Button, Dialog } from "@rneui/themed";
import dayjs from "dayjs";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import { COLOR } from "../../constants";
import { useDatePicker } from "./DatePickerContext";

const DatePickerModal = () => {
  const [date, setDate] = useState(dayjs());
  const { isVisible, hideDatePicker, setSelectedDate } = useDatePicker();
  const handleConfirm = () => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <Dialog
      isVisible={isVisible}
      onBackdropPress={hideDatePicker}
    >
      <View style={styles.modalContent}>
        <DateTimePicker
          value={date}
          mode="date"
          locale="vi"
          selectedItemColor={COLOR.primary}
          onValueChange={(v) => {
            if (!v) return;
            setDate(dayjs(v));
          }}
        />
        <View style={styles.buttonContainer}>
          <Button
            type="clear"
            onPress={hideDatePicker}
          >
            Hủy
          </Button>
          <Button
            type="solid"
            onPress={handleConfirm}
          >
            Xác nhận
          </Button>
        </View>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: COLOR.primary,
    fontSize: 16,
  },
});

export default DatePickerModal;
