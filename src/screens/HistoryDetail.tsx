import { Button, Icon } from "@rneui/themed";
import React, { ComponentProps, type FC } from "react";
import { Text, View } from "react-native";
import { bookingApi } from "../api";
import { useFetch } from "../api/hook";
import Card from "../components/Card";
import Badge from "../components/common/Badge";
import PositionList from "../components/history/PositionList";
import UserInfo from "../components/home/UserInfo";
import { COLOR } from "../constants/color";
import {
  DetailHistoryRouteProp,
  RootNavigationProp,
} from "../types/navigation";
import timeDiff from "../utils/timeDiff";
interface HistoryDetailProps {
  navigation: RootNavigationProp;
  route: DetailHistoryRouteProp;
}

const HistoryDetail: FC<HistoryDetailProps> = ({ navigation, route }) => {
  const { bookingId } = route.params;
  const { data } = useFetch({
    fetchFn: () => bookingApi.getOne(bookingId),
  });
  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const { user, locations } = data;
  const infos: {
    title: string;
    value: React.ReactNode;
    render?: () => JSX.Element;
  }[] = [
    {
      title: "Ghi chú",
      value: data.note || "Không có",
    },
    {
      title: "Giá tiền",
      value: data.price.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      }),
    },
    {
      title: "Thời gian đặt",
      value: data.createdAt,
      render: () => {
        const [, formated] = timeDiff(data.createdAt);
        return (
          <Text style={{ color: COLOR.dark, fontWeight: "600" }}>
            {formated}
          </Text>
        );
      },
    },
    {
      title: "Thời gian bắt đầu",
      value: data.startTime,
      render: () => {
        if (!data.startTime) {
          return (
            <Text style={{ color: COLOR.dark, fontWeight: "600" }}>
              Chưa bắt đầu
            </Text>
          );
        }
        const [, formated] = timeDiff(data.startTime);
        return (
          <Text style={{ color: COLOR.dark, fontWeight: "600" }}>
            {formated}
          </Text>
        );
      },
    },
    {
      title: "Thời gian kết thúc",
      value: data.endTime,
      render: () => {
        if (!data.endTime) {
          return (
            <Text style={{ color: COLOR.dark, fontWeight: "600" }}>
              Chưa kết thúc
            </Text>
          );
        }
        const [, formated] = timeDiff(data.endTime);
        return (
          <Text style={{ color: COLOR.dark, fontWeight: "600" }}>
            {formated}
          </Text>
        );
      },
    },
    {
      title: "Trạng thái",
      value: data.status,
      render: () => {
        const status = data.status;
        const mapping: Record<
          typeof status,
          { label: string; color: ComponentProps<typeof Badge>["type"] }
        > = {
          COMPLETED: { label: "Hoàn thành", color: "success" },
          CANCELLED: { label: "Đã hủy", color: "volcano" },
          PENDING: { label: "Đang chờ", color: "warning" },
          TIMEOUT: { label: "Hết hạn", color: "magenta" },
          DRIVING: { label: "Đang diễn ra", color: "purple" },
          REJECTED: { label: "Bị từ chối", color: "danger" },
          ACCEPTED: { label: "Đang tìm tài xế", color: "primary" },
          RECEIVED: { label: "Tài xế đang đến", color: "cyan" },
        };
        const { label: lable, color } = mapping[status];
        return (
          <Badge
            icon=""
            value={lable}
            type={color}
          />
        );
      },
    },
    {
      title: "Đánh giá",
      value: data.rating,
      render: () => {
        if (!data.rating) {
          return (
            <Text style={{ color: COLOR.dark, fontWeight: "600" }}>
              Chưa đánh giá
            </Text>
          );
        }
        return (
          <View
            style={{ flexDirection: "row", gap: 4, alignItems: "baseline" }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: COLOR.warning,
              }}
            >
              {+data.rating.toFixed(2)}
            </Text>
            <Icon
              name="star"
              type="feather"
              size={16}
              color={COLOR.warning}
            />
          </View>
        );
      },
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          height: 100,
          backgroundColor: COLOR.primaryBackground,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 40,
        }}
      >
        <View
          style={{
            position: "absolute",
            left: 7,
            top: 48,
            height: "100%",
          }}
        >
          <Button
            icon={{
              name: "arrow-back-outline",
              type: "ionicon",
              color: COLOR.primary,
              size: 30,
            }}
            type="clear"
            raised
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 25,
            color: COLOR.primary,
            // textTransform: "uppercase",
          }}
        >
          Chi tiết chuyến đi
        </Text>
      </View>
      <View style={{ paddingVertical: 10, gap: 10, alignItems: "center" }}>
        <Card
          radius={5}
          style={{ width: "95%" }}
        >
          <Text
            style={{
              fontWeight: "500",
              color: COLOR.secondary,
              marginBottom: 10,
            }}
          >
            Thông tin người đặt
          </Text>
          <UserInfo userProps={user ?? undefined} />
        </Card>
        <PositionList
          style={{
            width: "95%",
            gap: 10,
          }}
          data={locations.map((l) => l.address)}
        />
        <Card
          radius={5}
          style={{ width: "95%" }}
        >
          <Text
            style={{
              fontWeight: "500",
              color: COLOR.secondary,
              marginBottom: 10,
            }}
          >
            Thông tin chi tiết
          </Text>
          <View style={{ gap: 6 }}>
            {infos.map(({ title, value, render }) => (
              <View
                key={title}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: COLOR.secondary, fontWeight: "500" }}>
                  {title}:
                </Text>
                {!render ? (
                  <Text style={{ color: COLOR.dark, fontWeight: "600" }}>
                    {value}
                  </Text>
                ) : (
                  render()
                )}
              </View>
            ))}
          </View>
        </Card>
      </View>
    </View>
  );
};

export default HistoryDetail;
