import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import type { AuthNavigationProp } from "../../types/navigation";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  useFocusEffect(() => {
    // eslint-disable-next-line no-console
    console.log(navigation.getState());
  });
  return (
    <View style={styles.container}>
      <Text>Register</Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {},
});
