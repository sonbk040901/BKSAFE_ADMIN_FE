// import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useCallback, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { BookingStatus } from "../../api";
import { COLOR } from "../../constants/color";
// import { AppNavigationProp } from "../../types/navigation";

export interface ItemProps {
  id: string | number;
  // type?: "done" | "userCancel" | "adminCancel";
  status: BookingStatus;
  createdAt: string | Date;
  price: number;
  onPress?: () => void;
}

const Item = (props: ItemProps) => {
  const { status, price, createdAt, onPress } = props;
  const swipeRef = useRef<Swipeable>(null);
  // const navigation = useNavigation<AppNavigationProp>();
  const renderRightActions = useCallback(() => {
    return (
      <RectButton
        style={{
          backgroundColor: COLOR.primaryBackground,
          paddingHorizontal: 15,
          paddingVertical: 10,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          marginLeft: 10,
        }}
        onPress={() => {
          // navigation.push("Map", { type: "new" });
          swipeRef.current?.close();
        }}
      >
        <Text style={{ color: COLOR.primary, fontWeight: "bold" }}>
          Chi tiết
        </Text>
      </RectButton>
    );
  }, []);
  return (
    <View
      style={{
        marginVertical: 5,
        borderBottomColor: "#EBF0FA",
        borderBottomWidth: 0.75,
      }}
    >
      <Swipeable
        ref={swipeRef}
        renderRightActions={renderRightActions}
      >
        <RectButton
          rippleColor={COLOR.primaryBackground}
          style={styles.container}
          onPress={onPress}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={[
                styles.type,
                status === "REJECTED"
                  ? styles.redType
                  : status === "CANCELLED"
                  ? styles.warnType
                  : undefined,
              ]}
            />
            <Text style={{ fontWeight: "500" }}>
              {dayjs(createdAt).format("DD/MM/YYYY, hh:mm A")}
            </Text>
          </View>
          <Text style={{ fontWeight: "bold", color: COLOR.primary }}>
            {price.toLocaleString()} VNĐ
          </Text>
        </RectButton>
      </Swipeable>
    </View>
  );
};
export default Item;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  type: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: COLOR.primary,
  },
  redType: {
    backgroundColor: COLOR.error,
  },
  warnType: {
    backgroundColor: COLOR.warning,
  },
});
