import { Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppWrapper from "../../components/AppWrapper";
import DetailInfo from "../../components/profile/DetailInfo";
import { useAppDispatch, useAppSelector } from "../../states";
import { selectProfile, updateProfile } from "../../states/slice/profile";
import type { AuthNavigationProp } from "../../types/navigation";

interface ProfileProps {
  navigation: AuthNavigationProp;
}

const Profile = ({}: ProfileProps) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectProfile);
  return (
    <AppWrapper>
      <View style={styles.container}>
        <DetailInfo />
        <Button
          raised
          disabled={status === "loading"}
          onPress={() => dispatch(updateProfile())}
        >
          Cập nhật
        </Button>
      </View>
    </AppWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
  },
});
