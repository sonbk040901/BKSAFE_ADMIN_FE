import { Button, Icon } from "@rneui/themed";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Dayjs } from "dayjs";

interface FilterProps {
  time: Dayjs;
}

const Filter = ({ time }: FilterProps) => {
  return (
    <View style={styles.container}>
      <Button
        title={time.format("DD/MM/YYYY")}
        icon={
          <Icon
            style={{ marginLeft: 5 }}
            name="calendar-month"
            type="material-community"
          />
        }
        type="outline"
        iconRight
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
