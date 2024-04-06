import React from "react";
import { StyleSheet, View } from "react-native";
import AppWrapper from "../../components/AppWrapper";
import CommonInfo from "../../components/profile/CommonInfo";
import DetailInfo from "../../components/profile/DetailInfo";
import type { AuthNavigationProp } from "../../types/navigation";

interface ProfileProps {
  navigation: AuthNavigationProp;
}

const Profile = ({}: ProfileProps) => {
  return (
    <AppWrapper>
      <View style={styles.container}>
        <CommonInfo />
        <DetailInfo/>
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
