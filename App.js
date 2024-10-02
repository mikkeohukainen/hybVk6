import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Button,
} from "react-native";
import { useState } from "react";
import useMyFetch from "./hooks/useMyFetch";

export default function App() {
  const [text, setText] = useState("");
  const { data, loading, error, getData } = useMyFetch();

  const filteredData = data
    ? data.filter((park) =>
        park.name.toLowerCase().startsWith(text.toLowerCase())
      )
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Car Parks</Text>
      <TextInput
        style={styles.field}
        placeholder="Search for a parking space"
        value={text}
        onChangeText={setText}
      />
      <Button title="Refresh" onPress={getData} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>Error while loading data</Text>}

      <ScrollView contentContainerStyle={styles.list}>
        {filteredData.map((park, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.name}>{park.name}</Text>
            <Text style={styles.spaces}>
              Available:{" "}
              {park.spacesAvailable
                ? `${park.spacesAvailable} / ${park.maxCapacity}`
                : "-"}
            </Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginTop: 32,
    marginBottom: 16,
    textAlign: "center",
  },
  field: {
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
  },
  list: {
    paddingTop: 16,
  },
  item: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  spaces: {
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 16,
    textAlign: "center",
  },
});
