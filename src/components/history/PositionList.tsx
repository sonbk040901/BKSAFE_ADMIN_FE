import { Divider } from "@rneui/themed";
import React, { type FC } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { COLOR } from "../../constants/color";
import Card from "../Card";

interface PositionListProps {
  data: string[];
  style?: StyleProp<ViewStyle>;
}

const PositionList: FC<PositionListProps> = ({ data, style }) => {
  const length = data.length;
  return (
    <Card
      radius={5}
      shadow={true}
      style={[styles.container, style]}
    >
      <Text
        style={{
          fontWeight: "500",
          color: COLOR.secondary,
          marginBottom: 10,
        }}
      >
        Lộ trình chuyến đi
      </Text>
      {!!length &&
        Array(length * 2 - 1)
          .fill(0)
          .map((_, i) => {
            if (i === 0)
              return (
                <Position
                  key={i}
                  label={data[0]}
                  icon={<Circle />}
                />
              );
            if (i % 2 === 0)
              return (
                <Position
                  key={i}
                  label={data[i / 2]}
                  icon={<Triangle />}
                />
              );
            return <CustomDivider key={i} />;
          })}
    </Card>
  );
};

const Position = ({
  label,
  icon,
  endIcon,
}: {
  label: string;
  icon: React.ReactNode;
  endIcon?: React.ReactNode;
}) => {
  return (
    <View style={styles.item}>
      {icon}
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{ fontWeight: "500" }}
        >
          {label}
        </Text>
      </View>
      {endIcon}
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
        width: 1.5,
        borderRadius: 2,
        backgroundColor: COLOR.primary,
        flex: 1,
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
const styles = StyleSheet.create({
  container: {},
  item: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    height: 20,
  },
});

export default PositionList;
