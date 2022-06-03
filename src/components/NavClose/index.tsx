import { HeaderBackButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { IconButton } from "react-native-paper";

type Props = {
  onPress?: () => void;
} & HeaderBackButtonProps;

export default function NavClose({ tintColor, onPress }: Props) {
  return <IconButton icon="window-close" color={tintColor} onPress={onPress} />;
}
