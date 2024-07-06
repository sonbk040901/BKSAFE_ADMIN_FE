import React, { type FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { COLOR } from "../../constants/color";

interface StatisticItemProps {
  count: number;
  title: string;
}

const StatisticItem: FC<StatisticItemProps> = (props) => {
  const { count, title } = props;
  return (
    <View style={styles.container}>
      <Text style={{ color: COLOR.dark, fontWeight: "700", fontSize: 15 }}>
        {count}
      </Text>
      <Text style={{ color: COLOR.secondary, fontWeight: "500", fontSize: 13 }}>
        {title}
      </Text>
    </View>
  );
};

export default StatisticItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});
