import { Icon, IconProps } from "@rneui/themed";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { COLOR } from "../../constants/color";

interface ItemProps {
  icon?: Partial<IconProps>;
  name: IconProps["name"];
  content: string;
}
const Item = ({ icon, name, content }: ItemProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isChange, setIsChange] = useState(true);
  const inputRef = useRef<TextInput>(null);
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Icon
          name={name}
          size={25}
          type="feather"
          {...icon}
        />
        <View style={{ flex: 1 }}>
          <TextInput
            ref={inputRef}
            numberOfLines={1}
            style={styles.text}
            editable={isChange}
          >
            {content}
          </TextInput>
        </View>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#EBF0FA",
    // borderTopColor: "#EBF0FA",
    borderBottomWidth: 0.75,
    // borderTopWidth: 0.75,
  },
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    gap: 15,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: COLOR.black,
  },
});
