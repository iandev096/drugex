import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppStackNavProps } from "../../navigation/app/type";

type HomeNavProps = AppStackNavProps<"Home">;

export default function Home() {
  const navigation = useNavigation<HomeNavProps>();
  const navToAddDrugs = () => navigation.navigate("AddDrug");

  return (
    <View style={styles.container}>
      <Pressable onPress={navToAddDrugs}>
        <Text>Go to Add Drugs</Text>
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
