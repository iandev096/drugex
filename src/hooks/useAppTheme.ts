import { useTheme } from "react-native-paper";
import { Theme } from "../../theme";

export default function useAppTheme() {
  const theme = useTheme() as Theme;

  return theme;
}
