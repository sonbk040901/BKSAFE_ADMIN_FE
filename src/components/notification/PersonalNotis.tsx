import { Button } from "@rneui/themed";
import * as React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Noti } from "../../api";
import { COLOR } from "../../constants/color";
import { IMAGE } from "../../constants/image";
import timeDiff from "../../utils/timeDiff";

const data: Noti[] = [
  {
    id: 1,
    title: "Thông báo 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, alias voluptatibus dolores adipisci voluptatum quod id minus aliquam. Eius, inventore!",
    createdAt: "2024-06-10T19:03:03.313Z",
    updatedAt: "2024-06-10T19:03:03.313Z",
  },
  {
    id: 2,
    title: "Thông báo 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex reprehenderit vel quo quod totam doloribus aperiam excepturi odio odit exercitationem?",
    createdAt: "2024-06-10T19:03:03.313Z",
    updatedAt: "2024-06-10T19:03:03.313Z",
  },
  {
    id: 3,
    title: "Chào mừng bạn đến với UberDrive - Ứng dụng đặt tài xế hàng đầu!",
    content:
      "Chúng tôi rất vui mừng thông báo rằng UberDrive đã chính thức ra mắt và sẵn sàng phục vụ bạn! Với một trải nghiệm đặt tài xế dễ dàng, nhanh chóng và đáng tin cậy, UberDrive sẽ đưa bạn đến mọi nơi một cách an toàn và tiện lợi.",
    createdAt: "2024-06-10T19:03:03.313Z",
    updatedAt: "2024-06-10T19:03:03.313Z",
  },
  {
    id: 4,
    title: "Chào mừng bạn đến với UberDrive - Ứng dụng đặt tài xế hàng đầu!",
    content:
      "Chúng tôi rất vui mừng thông báo rằng UberDrive đã chính thức ra mắt và sẵn sàng phục vụ bạn! Với một trải nghiệm đặt tài xế dễ dàng, nhanh chóng và đáng tin cậy, UberDrive sẽ đưa bạn đến mọi nơi một cách an toàn và tiện lợi.",
    createdAt: "2024-06-10T19:03:03.313Z",
    updatedAt: "2024-06-10T19:03:03.313Z",
  },
  {
    id: 5,
    title: "Chào mừng bạn đến với UberDrive - Ứng dụng đặt tài xế hàng đầu!",
    content:
      "Chúng tôi rất vui mừng thông báo rằng UberDrive đã chính thức ra mắt và sẵn sàng phục vụ bạn! Với một trải nghiệm đặt tài xế dễ dàng, nhanh chóng và đáng tin cậy, UberDrive sẽ đưa bạn đến mọi nơi một cách an toàn và tiện lợi.",
    createdAt: "2024-06-10T19:03:03.313Z",
    updatedAt: "2024-06-10T19:03:03.313Z",
  },
  {
    id: 6,
    title: "Chào mừng bạn đến với UberDrive - Ứng dụng đặt tài xế hàng đầu!",
    content:
      "Chúng tôi rất vui mừng thông báo rằng UberDrive đã chính thức ra mắt và sẵn sàng phục vụ bạn! Với một trải nghiệm đặt tài xế dễ dàng, nhanh chóng và đáng tin cậy, UberDrive sẽ đưa bạn đến mọi nơi một cách an toàn và tiện lợi.",
    createdAt: "2024-06-10T19:03:03.313Z",
    updatedAt: "2024-06-10T19:03:03.313Z",
  },
];

const PersonalNotis = () => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, padding: 15, paddingTop: 10 }}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 10, paddingBottom: 30 }}
      renderItem={({ item }) => {
        const { id, title, content, image, createdAt } = item;
        const [diff] = timeDiff(createdAt);
        return (
          <View style={{ gap: 3 }}>
            <Text style={{ color: COLOR.secondary }}>{diff}</Text>
            <Swipeable
              renderRightActions={(_, __, swipeable) => {
                const handleDelete = () => {
                  console.log("delete", id);
                  swipeable.close();
                };
                return (
                  <View
                    style={{
                      width: 80,
                      justifyContent: "center",
                      paddingLeft: 5,
                    }}
                  >
                    <Button
                      color="error"
                      onPress={handleDelete}
                    >
                      Xóa
                    </Button>
                  </View>
                );
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "#c7e0fc67",
                  padding: 5,
                  // borderWidth: 0.5,
                  // borderColor: COLOR.primaryBackground,
                  overflow: "hidden",
                  borderRadius: 5,
                }}
              >
                <View style={{ width: 50 }}>
                  <Image
                    source={image ?? IMAGE.cropLogo}
                    style={{
                      width: "100%",
                      height: 50,
                      objectFit: "contain",
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: COLOR.secondary2, fontWeight: "500" }}>
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
