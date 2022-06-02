import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AddDrug() {
  const navigation = useNavigation<any>();
  const navToAddDrugs = () => navigation.navigate("addDrugs");

  return (
    <View style={styles.container}>
      <Pressable onPress={navToAddDrugs}>
        <Text>Go back home</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
