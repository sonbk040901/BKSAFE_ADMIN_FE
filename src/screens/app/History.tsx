import React, { FC } from "react";
import { StyleSheet } from "react-native";
import AppWrapper from "../../components/AppWrapper";
import type { AuthNavigationProp } from "../../types/navigation";

interface HistoryProps {
  navigation: AuthNavigationProp;
}
const History: FC<HistoryProps> = ({}) => {
  return <AppWrapper></AppWrapper>;
};
export default History;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    gap: 20,
  },
});
