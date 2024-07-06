import { Avatar, Icon, Skeleton } from "@rneui/themed";
import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLOR } from "../../constants/color";
import { useAppDispatch } from "../../states";
import { User } from "../../api";
import { patchUserInfo } from "../../states/slice/user";

type UserProps = User;
const UserInfo = ({ userProps }: { userProps?: UserProps }) => {
  const dispatch = useAppDispatch();
  const { gender } = userProps || {};
  const isSkeleton = !userProps;
  const handleSelectUser = () => {
    dispatch(patchUserInfo(userProps));
  };
  return (
    <View>
      {isSkeleton ? (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Skeleton
            circle
            width={50}
            height={50}
            style={{ opacity: 0.3 }}
          />
          <Skeleton
            height={50}
            style={{ borderRadius: 7, opacity: 0.3, flex: 1 }}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
          onPress={handleSelectUser}
        >
          <Avatar
            size={50}
            rounded
            source={{ uri: userProps.avatar ?? undefined }}
          />
          <View style={{ justifyContent: "center", flex: 1 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {userProps.fullName}
              </Text>
              {gender === "MALE" ? (
                <Icon
                  name="male"
                  size={19}
                  color={COLOR.primary}
                />
              ) : gender === "FEMALE" ? (
                <Icon
                  name="female"
                  size={19}
                  color="hotpink"
                />
              ) : null}
            </View>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "baseline" }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                {userProps.phone}
              </Text>
            </View>
          </View>
          <Icon
            name="more-vertical"
            type="feather"
            size={20}
            color={COLOR.secondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserInfo;
