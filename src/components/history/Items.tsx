import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import Item, { ItemProps } from "./Item";

interface ItemsProps {
  data: ItemProps[];
  loading?: boolean;
  onSelected?: (item: Omit<ItemProps, "onPress">) => void;
  onRequestRefresh: () => void;
}

const Items = (props: ItemsProps) => {
  const { data, onSelected, onRequestRefresh, loading = true } = props;

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRequestRefresh}
          />
        }
        style={{ width: "100%" }}
        data={data}
        renderItem={(data) => (
          <Item
            {...data.item}
            onPress={() => onSelected?.(data.item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
