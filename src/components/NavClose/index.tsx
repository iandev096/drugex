import { HeaderBackButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { IconButton } from "react-native-paper";
import useDarkMode from "../../contexts/theme/hooks/useDarkMode";
import useAppTheme from "../../hooks/useAppTheme";

type Props = {
  onPress?: () => void;
} & HeaderBackButtonProps;

export default function NavClose({ tintColor, onPress }: Props) {
  const {colors: {text, background}} = useAppTheme();
  const {darkMode} = useDarkMode();
  return <IconButton icon="window-close" color={darkMode ? text : background} onPress={onPress} />;
}
