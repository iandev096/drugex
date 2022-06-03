import { StyleSheet } from "react-native";
import { Theme } from "../../../theme";

const styles = (theme: Theme) =>
  StyleSheet.create({
    productItem: { position: "relative" },
    buttonGroup: {
      position: "absolute",
      right: 10,
      bottom: 0,
      top: 0,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    border: {
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
    },
  });

export default styles;
