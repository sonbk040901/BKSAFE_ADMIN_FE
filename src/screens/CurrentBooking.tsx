import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { AppNavigationProp } from "../types/navigation";
import useCurrentBooking from "../api/hook/useCurrentBooking";

interface CurrentBookingProps {
  navigation: AppNavigationProp;
}

const CurrentBooking = ({  }: CurrentBookingProps) => {
  const { booking } = useCurrentBooking();
  console.log(typeof booking);

  return (
    <View style={styles.container}>
      <Text>CurrentBooking</Text>
    </View>
  );
};

export default CurrentBooking;

const styles = StyleSheet.create({
  container: {},
});
