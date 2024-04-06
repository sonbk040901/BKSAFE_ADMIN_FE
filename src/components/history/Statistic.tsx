import { Divider, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "../../constants/color";
import Card from "../Card";

interface StatisticProps {
  totalPrice: number;
  totalTravle: number;
}

const Statistic = (props: StatisticProps) => {
  const { totalPrice, totalTravle } = props;
  return (
    <Card style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Tổng thanh toán
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: COLOR.primary,
          }}
        >
          {totalPrice.toLocaleString()} VNĐ
        </Text>
      </View>
      <Divider
        color="#EBF0FA"
        width={1}
      />
      <View
        style={{
          paddingVertical: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 5 }}>
          <Icon
            name="car"
            type="font-awesome-5"
          />
          <Text style={{ fontSize: 20, fontWeight: "500", color: COLOR.secondary2 }}>
            {totalTravle} chuyến đi
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default Statistic;

const styles = StyleSheet.create({
  container: { paddingBottom: 0 },
});
