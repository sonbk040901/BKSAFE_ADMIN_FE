import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { Booking } from "../../api";
import { RootNavigationProp } from "../../types/navigation";
import Item from "./Item";

interface ItemsProps {
  data: Booking[];
  loading?: boolean;
  onSelected?: (item: Booking) => void;
  onRequestRefresh: () => void;
  navigation: RootNavigationProp;
}

const Items = (props: ItemsProps) => {
  const { data, onRequestRefresh, loading = true, navigation } = props;
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
        contentContainerStyle={{ gap: 6 }}
        data={data}
        renderItem={({ item }) => (
          <Item
            booking={item}
            onPress={() => {
              navigation.push("HistoryDetail", { bookingId: item.id });
            }}
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
