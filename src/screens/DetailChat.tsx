import { Button, Icon } from "@rneui/themed";
import React, { useEffect, type FC } from "react";
import { Image, Text, TextInput, View } from "react-native";
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
  User,
} from "react-native-gifted-chat";
import { Account, chatApi } from "../api";
import { useFetch } from "../api/hook";
import { COLOR } from "../constants/color";
import { useInitAppContext } from "../hook/useInitApp";
import { emit, subcribe } from "../socket";
import { DetailChatRouteProp, RootNavigationProp } from "../types/navigation";

interface DetailChatProps {
  navigation: RootNavigationProp;
  route: DetailChatRouteProp;
}

const DetailChat: FC<DetailChatProps> = (props) => {
  const { navigation, route } = props;
  const { userId } = route.params;
  const { data: driver } = useInitAppContext();
  const { data, refetch } = useFetch({
    fetchFn: () => chatApi.getChatDetail(userId),
  });
  const user = data?.user;
  const messages = mappingChat(data, driver).reverse();
  useEffect(() => {
    return subcribe("chat/new-chat", refetch);
  }, [refetch]);
  if (!driver || !user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const handleNewChat = (message: string) => {
    emit("chat/new-chat", {
      message,
      to: userId,
    });
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1, width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          paddingTop: 20,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E5E5",
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
        <Image
          src={driver.avatar ?? undefined}
          style={{ width: 50, height: 50, borderRadius: 35, marginRight: 10 }}
        />
        <View>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 20,
              color: COLOR.dark,
            }}
          >
            {user.fullName}
          </Text>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        locale="vi"
        alwaysShowSend
        placeholder="Nhập tin nhắn..."
        showUserAvatar={false}
        showAvatarForEveryMessage={false}
        user={mappingAcc(user)}
        renderSend={(props) => {
          return (
            <Send {...props}>
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  type="material-community"
                  name="send-circle"
                  color={props.text ? COLOR.primary : COLOR.primaryBackground}
                  size={37}
                />
              </View>
            </Send>
          );
        }}
        onSend={(newMessages) => {
          handleNewChat(newMessages[0].text);
        }}
        renderFooter={() => <View style={{ height: 30 }}></View>}
        renderInputToolbar={(props) => {
          return (
            <InputToolbar
              {...props}
              primaryStyle={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#F5F5F5",
                borderRadius: 20,
                padding: 0,
                paddingLeft: 10,
                paddingRight: 5,
                margin: 10,
              }}
            />
          );
        }}
        renderComposer={(props) => {
          const { text, placeholder, onTextChanged } = props;
          return (
            <TextInput
              autoFocus
              placeholder={placeholder}
              value={text}
              style={{ flex: 1 }}
              onChangeText={onTextChanged}
            />
          );
        }}
      />
    </View>
  );
};

export default DetailChat;

const mappingChat = (
  res: Awaited<ReturnType<typeof chatApi.getChatDetail>> | null,
  driver: Account | null,
): IMessage[] => {
  if (!res || !driver) {
    return [];
  }
  const { chats, user } = res;
  return chats.map(
    (chat) =>
      ({
        _id: chat.id,
        text: chat.message,
        createdAt: new Date(chat.createdAt),
        user: mappingAcc(chat.isDriver ? driver : user),
      } as IMessage),
  );
};

const mappingAcc = (acc: Account): User => {
  return {
    _id: acc.id,
    name: acc.fullName,
    avatar: acc.avatar ?? undefined,
  };
};
