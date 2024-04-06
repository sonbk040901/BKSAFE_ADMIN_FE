import { Button, Icon, Text } from "@rneui/themed";
import React, { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { COLOR } from "../../constants/color";
import { STYLE } from "../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../states";
import {
  cancelBooking,
  createBooking,
  selectBooking,
} from "../../states/slice/booking";

interface FooterProps extends ComponentProps<typeof Animated.View> {
  onCancel?: () => void;
}

function Footer(props: FooterProps) {
  // const { status, price, createBooking, cancelBooking } = useMapContext();
  const { status, price, id } = useAppSelector(selectBooking);
  const dispatch = useAppDispatch();
  const { style: customStyle, onCancel } = props;
  const isVisible = !status || status === "PENDING";
  if (!isVisible) return null;
  const disable = !price || status === "PENDING";
  const handleCreateBooking = () => {
    if (!id) return;
    dispatch(cancelBooking(id));
    onCancel?.();
  };
  return (
    <Animated.View
      {...props}
      style={[customStyle, styles.container, STYLE.shadow]}
    >
      <Button
        buttonStyle={{
          backgroundColor: COLOR.primaryBackground,
          borderBottomWidth: 0.5,
          flexDirection: "row",
          paddingVertical: 7,
          paddingHorizontal: 10,
          alignItems: "center",
          gap: 10,
          borderRadius: 0,
        }}
        containerStyle={{
          width: "100%",
          borderRadius: 0,
        }}
      >
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: "#a0c0ff",
            borderRadius: 20,
          }}
        ></View>
        <Text style={{ flex: 1, fontWeight: "bold", fontSize: 18 }}>
          Tìm tài xế lái xe hơi
        </Text>
        <Icon
          name="more-vertical"
          type="feather"
          size={20}
          color={COLOR.secondary}
        />
      </Button>
      <View style={styles.tool}>
        <Button
          radius="lg"
          size="md"
          type="outline"
          buttonStyle={styles.toolBtn}
        >
          Thanh toán
        </Button>
        <Button
          radius="lg"
          size="md"
          type="outline"
          buttonStyle={styles.toolBtn}
        >
          Ưu đãi
        </Button>
        <Button
          radius="lg"
          size="md"
          type="outline"
          buttonStyle={styles.toolBtn}
        >
          Ghi chú
        </Button>
      </View>

      <View style={{ width: "90%", flexDirection: "row", gap: 10 }}>
        {status && (
          <Button
            containerStyle={{ borderRadius: 20 }}
            buttonStyle={{ backgroundColor: COLOR.warningBackground }}
            titleStyle={{
              fontSize: 16,
              paddingVertical: 3,
              paddingHorizontal: 5,
              color: COLOR.warning,
            }}
            icon={{
              name: "trash",
              size: 20,
              color: COLOR.warning,
              type: "feather",
            }}
            iconRight
            onPress={handleCreateBooking}
          >
            Hủy
          </Button>
        )}
        <Button
          radius="lg"
          size="md"
          containerStyle={{ flex: 1, borderRadius: 20 }}
          disabledStyle={styles.disable}
          disabledTitleStyle={{ color: "white" }}
          disabled={disable}
          onPress={() => dispatch(createBooking())}
          titleStyle={{ fontSize: 16, paddingVertical: 3 }}
          icon={
            price !== undefined && {
              name: "chevron-right",
              size: 20,
              color: "white",
              type: "feather",
            }
          }
          iconRight
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 10,
              paddingVertical: 3,
            }}
          >
            <Text
              style={{
                color: "white",
                flex: 1,
                fontSize: 16,
                fontWeight: "bold",
              }}
              numberOfLines={1}
            >
              {status === "PENDING"
                ? "Đang tìm tài xế "
                : "Tìm tài xế lái xe hơi"}
            </Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              {price ? `${price.toLocaleString()}đ` : ""}
            </Text>
          </View>
        </Button>
      </View>
    </Animated.View>
  );
}
// interface PendingFooterProps extends ComponentProps<typeof Animated.View> {
//   onCancel?: () => void;
// }

// function PendingFooter(props: PendingFooterProps) {
//   const { onCancel } = props;
//   return (
//     <Animated.View {...props}>
//       <Button
//         title="Chi tiết"
//         radius="md"
//         buttonStyle={{
//           backgroundColor: COLOR.secondaryBackground,
//           paddingHorizontal: 20,
//         }}
//         titleStyle={{ color: "white" }}
//         onPress={onCancel}
//       />
//       <Button></Button>
//     </Animated.View>
//   );
// }
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "absolute",
    paddingBottom: 10,
    paddingTop: 0,
    gap: 12,
    bottom: 0,
    left: 0,
    zIndex: 999,
    alignItems: "center",
    width: "100%",
  },
  tool: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "white",
    width: "100%",
  },
  toolBtn: {
    paddingHorizontal: 17,
  },
  disable: {
    opacity: 0.7,
    backgroundColor: COLOR.primary,
  },
  pendingContainer: {},
});
export default Footer;
