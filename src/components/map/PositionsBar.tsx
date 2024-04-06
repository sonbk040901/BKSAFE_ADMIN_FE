import { Divider, Icon } from "@rneui/themed";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLOR } from "../../constants/color";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  addAdress,
  removeLocation,
  replaceLocation,
  selectBooking,
} from "../../states/slice/booking";
import Card from "../Card";
import AddressAutocomplete from "./AddressAutocomplete";

interface PostionsBarProps {
  style?: StyleProp<ViewStyle>;
}

export default function PostionsBar({ style }: PostionsBarProps) {
  // const { locations, addAddress, replaceLocation, removeLocation, viewOnly } =
  //   useMapContext();
  const { locations, id } = useAppSelector(selectBooking);
  const dispatch = useAppDispatch();
  const viewOnly = Boolean(id);
  const data = locations.map((l) => l.address);
  const [modifyIndex, setModifyIndex] = useState<number | null>();
  const modalVisible = modifyIndex !== undefined;
  const modalValue =
    modifyIndex !== undefined && modifyIndex !== null
      ? data[modifyIndex]
      : undefined;

  const handleSelect = (_: unknown, v: number) => {
    if (viewOnly) return;
    setModifyIndex(v);
  };
  const handleChangeText = (address: string) => {
    if (modifyIndex === undefined) {
      return;
    }
    setModifyIndex(undefined);
    if (modifyIndex !== null) {
      dispatch(replaceLocation({ address, index: modifyIndex }));
      return;
    }
    dispatch(addAdress(address));
  };
  if (data.length === 0) return null;
  return (
    <Card
      radius={10}
      shadow={false}
      style={[styles.container, style]}
    >
      <AddressAutocomplete
        key={modifyIndex}
        visible={modalVisible}
        value={modalValue}
        onChangeText={handleChangeText}
        onRequestClose={() => setModifyIndex(undefined)}
      />
      {Array(data.length * 2 - 1)
        .fill(0)
        .map((_, i) => {
          if (i === 0)
            return (
              <Position
                key={i}
                label={data[0]}
                value={0}
                icon={<Circle />}
                onSelect={handleSelect}
              />
            );
          if (i % 2 === 0)
            return (
              <Position
                key={i}
                label={data[i / 2]}
                value={i / 2}
                icon={<Triangle />}
                endIcon={
                  !viewOnly && (
                    <TouchableOpacity
                      onPress={() => dispatch(removeLocation(i / 2))}
                    >
                      <Icon
                        name="cancel"
                        size={20}
                        color={COLOR.secondary}
                      />
                    </TouchableOpacity>
                  )
                }
                onSelect={handleSelect}
              />
            );
          return <CustomDivider key={i} />;
        })}
      <TouchableOpacity
        style={{
          position: "absolute",
          left: 0,
          bottom: -43,
          backgroundColor: "white",
          borderRadius: 999,
          borderWidth: 0.5,
          borderColor: "#e0e0e0",
          padding: 1.5,
          paddingRight: 7,
          display: viewOnly ? "none" : "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => setModifyIndex(null)}
      >
        <Icon
          name="add-circle"
          size={30}
          color={COLOR.secondary}
        />
        <Text style={{ fontWeight: "400", color: COLOR.secondary }}>Thêm điểm đến</Text>
      </TouchableOpacity>
    </Card>
  );
}
const Position = ({
  label,
  value,
  icon,
  endIcon,
  onSelect,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  endIcon?: React.ReactNode;
  onSelect?: (label: string, value: number) => void;
}) => {
  return (
    <View style={styles.item}>
      {icon}
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => onSelect?.(label, value)}
      >
        <Text
          numberOfLines={1}
          style={{ fontWeight: "500" }}
        >
          {label}
        </Text>
      </TouchableOpacity>
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
  container: {
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
  },
  item: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
