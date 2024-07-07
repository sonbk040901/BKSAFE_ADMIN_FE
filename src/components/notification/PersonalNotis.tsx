import { Button } from "@rneui/themed";
import dayjs from "dayjs";
import * as React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { notificationApi } from "../../api";
import { useFetch } from "../../api/hook";
import { COLOR } from "../../constants/color";
import { IMAGE } from "../../constants/image";

const PersonalNotis = () => {
  const { data, isLoading, refetch } = useFetch({
    fetchFn: () => notificationApi.getAll(),
    initialData: [],
  });
  return (
    <FlatList
      refreshing={isLoading}
      onRefresh={refetch}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 5,
        paddingTop: 10,
      }}
      data={data}
      keyExtractor={(item) => item.id.toString() + item.type}
      contentContainerStyle={{ gap: 6, paddingBottom: 30 }}
      renderItem={({ item }) => {
        const { title, content, image, createdAt } = item;
        return (
          <View style={{ gap: 3 }}>
            <Text
              style={{
                textAlign: "right",
                color: COLOR.secondary,
                fontSize: 11,
                fontWeight: "500",
                paddingRight: 5,
              }}
            >
              {dayjs(createdAt).format("hh:mm DD/MM")}
            </Text>
            <Swipeable
              renderRightActions={
                item.type === "personal"
                  ? (_, __, swipeable) => {
                      const handleDelete = () => {
                        swipeable.close();
                      };
                      return (
                        <View
                          style={{
                            width: 80,
                            justifyContent: "center",
                            paddingLeft: 5,
                            paddingRight: 2,
                          }}
                        >
                          <Button
                            type="outline"
                            buttonStyle={{
                              backgroundColor: COLOR.errorBackground,
                              borderColor: COLOR.error,
                            }}
                            titleStyle={{ color: COLOR.error }}
                            onPress={handleDelete}
                          >
                            Xóa
                          </Button>
                        </View>
                      );
                    }
                  : undefined
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 5,
                  paddingVertical: 8,
                  overflow: "hidden",
                  borderRadius: 5,
                  gap: 5,
                  backgroundColor: "#a9d1ff21",
                  borderColor: COLOR.primaryBackground,
                  borderWidth: 0.3,
                }}
              >
                <View style={{ width: 50 }}>
                  <Image
                    source={image ? { uri: image } : IMAGE.cropLogo}
                    style={{
                      width: "100%",
                      height: 50,
                      objectFit: "contain",
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: COLOR.secondary2,
                      fontWeight: "600",
                      fontSize: 15,
                    }}
                  >
                    {title}
                  </Text>
                  <Text style={{ color: COLOR.secondary, fontSize: 13 }}>
                    {content}
                  </Text>
                </View>
              </View>
            </Swipeable>
          </View>
        );
      }}
    />
  );
};

export default PersonalNotis;
