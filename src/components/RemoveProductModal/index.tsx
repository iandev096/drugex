import { View } from "react-native";
import { Badge, Button, Modal, Portal, Text } from "react-native-paper";
import { Theme } from "../../../theme";
import { Product } from "../../context/app/type";
import useAppTheme from "../../hooks/useAppTheme";
import styles from "./styles";

type Props = {
  visible: boolean;
  product: Product | null;
  onDismiss?: () => void;
  onRemove?: () => void;
};

export default function RemoveProductModal({
  visible,
  product,
  onDismiss,
  onRemove,
}: Props) {
  const theme = useAppTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles(theme).container}
        style={styles(theme).center}
      >
        <View style={styles(theme).center}>
          <Text style={styles(theme).promptText}>
            Do you really want to remove this product?
          </Text>
          <Text style={styles(theme).productName}>"{product?.name}"</Text>
        </View>
        <View style={styles(theme).buttonGroup}>
          <Button
            style={styles(theme).button}
            mode="contained"
            icon="close"
            onPress={onDismiss}
          >
            Cancel
          </Button>
          <Button
            style={styles(theme).button}
            mode="contained"
            icon="trash-can-outline"
            onPress={onRemove}
          >
            Remove
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
