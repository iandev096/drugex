import { StyleSheet } from "react-native";
import { Theme } from "../../../theme";
import { HEIGHT, WIDTH } from "../../constants/dimensions";

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      padding: 20,
      width: WIDTH * 0.88,
    },
    center: {
      alignItems: "center",
    },
    buttonGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: HEIGHT * 0.05,
    },
    button: {
      flex: 0.47,
    },
    promptText: {
      textAlign: "center",
      marginBottom: 14,
    },
    productName: {
      fontStyle: "italic",
      color: theme.colors.error,
    },
  });

export default styles;
