import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Animated, { SlideInDown } from "react-native-reanimated";

const SearchModal = () => {
  const [visible, setVisible] = useState(true);
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      collapsable
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.wrapper}
      >
        <Animated.View entering={SlideInDown} style={styles.container}>
          <TextInput placeholder="Tìm kiếm" />
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "rgba(138, 138, 138, 0.154)",
  },
  container: {
    height: 400,
    backgroundColor: "white",
  },
});
