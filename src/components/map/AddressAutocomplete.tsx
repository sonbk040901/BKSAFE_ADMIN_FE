import React, { ComponentProps, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { AutoCompleteResultType, autoComplete } from "../../api/ggmap";
interface FindAddressModalPropsType extends ComponentProps<typeof Modal> {
  placeholder?: string;
  value?: string;
  onChangeText: (v: string) => void;
  onRequestClose?: () => void;
}
const AddressAutocomplete = ({
  placeholder,
  value = "",
  onChangeText,
  onRequestClose,
  ...props
}: FindAddressModalPropsType) => {
  const [searchText, setSearchText] = useState(value);
  const inputRef = useRef<TextInput>(null);
  useFocusEffect(() => {
    const sto = setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(sto);
  });

  return (
    <Modal
      animationType="fade"
      collapsable
      transparent
      statusBarTranslucent
      onRequestClose={() => {
        onRequestClose?.();
      }}
      {...props}
    >
      <View style={styles.container}>
        <Header
          title="Địa chỉ"
          onRequestClose={() => onRequestClose?.()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder={placeholder}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            style={styles.clearIcon}
            onPress={() => setSearchText("")}
          >
            <Icon
              name="cancel"
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <SearchResult
          input={searchText}
          onSelectResult={(v) => {
            setSearchText(v);
            onChangeText(v);
          }}
        />
      </View>
    </Modal>
  );
};
const Header = ({
  title,
  onRequestClose,
}: {
  title: string;
  onRequestClose: () => void;
}) => {
  return (
    <>
      <View
        style={{
          height: 75,
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: 0,
          }}
          onPress={onRequestClose}
        >
          <Icon
            name="arrow-back-outline"
            size={25}
            type="ionicon"
            color="black"
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </View>
    </>
  );
};
export default AddressAutocomplete;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#f2f2f2",
    height: 50,
    borderRadius: 7,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  input: { flex: 1, paddingRight: 10 },
  clearIcon: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
interface SearchResultPropsType {
  input: string;
  onSelectResult?: (v: string) => void;
  debound?: number;
}

const SearchResult = ({
  input,
  onSelectResult,
  debound = 1000,
}: SearchResultPropsType) => {
  const [results, setResults] = useState<AutoCompleteResultType>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (input.length === 0) {
      setResults(undefined);
      return;
    }
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await autoComplete(input);
        setResults(res);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, debound);
    return () => clearTimeout(timeout);
  }, [input, debound]);
  if (loading) return <Loading />;
  if (!results) return <EmptyResult />;
  return (
    <FlatList
      data={results.predictions}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              onSelectResult?.(item.description);
            }}
            style={sr.item}
          >
            <Text style={sr.itemTitle}>
              {item.structured_formatting.main_text}
            </Text>
            <Text style={sr.itemDescription}>{item.description}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};
const sr = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#f2f2f2",
    height: 50,
    borderRadius: 7,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  item: {
    marginVertical: 8,
    marginTop: 17,
    gap: 3,
  },
  itemTitle: { fontSize: 18 },
  itemDescription: { color: "gray" },
});
const EmptyResult = () => {
  return (
    <View
      style={{ height: 300, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ color: "#8080808c", fontSize: 25, fontWeight: "bold" }}>
        Không có kết quả
      </Text>
    </View>
  );
};
const Loading = () => {
  return (
    <View
      style={{ height: 300, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator
        size={45}
        color="gray"
      />
    </View>
  );
};
