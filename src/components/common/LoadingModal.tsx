import { Image } from "@rneui/themed";
import React, { ComponentProps } from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { COLOR } from "../../constants/color";
import { IMAGE } from "../../constants/image";

const LoadingModal = (props: ComponentProps<typeof Modal>) => {
  return (
    <Modal
      visible
      {...props}
    >
      {/* <LinearGradient
        colors={["#8abfff7e", "#ffffff7e", "#ffffff7e", "#429aff7e"]}
        style={styles.container}
      > */}
      <View style={styles.container}>
        <Image
          source={IMAGE.logo}
          style={{
            width: 300,
            height: 250,
          }}
          resizeMode="contain"
        />
        <ActivityIndicator
          color={COLOR.primary}
          size="large"
        />
      </View>
      {/* </LinearGradient> */}
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  logo: { resizeMode: "contain", width: 300, height: 300 },
});
