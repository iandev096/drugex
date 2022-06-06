import { StyleSheet } from "react-native";
import { HEIGHT } from "../../../constants/dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 16,
  },
  formGroup: { marginBottom: 40, marginTop: -HEIGHT * 0.2 }
});

export default styles;
