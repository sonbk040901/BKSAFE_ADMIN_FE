import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { COLOR } from "../../constants/color";

interface TitleProps {
  title: string;
}

const Title = (props: TitleProps) => {
  const { title } = props;
  return <Text style={styles.container}>{title}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  container: {
    fontWeight: "600",
    color: COLOR.secondary,
    marginBottom: 10,
    width: "100%",
    // fontSize: 15,
  },
});
