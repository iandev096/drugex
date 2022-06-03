import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { HEIGHT } from "../../../constants/dimensions";
import { isIos } from "../../../constants/platform";
import styles from "./styles";

type Props = {
  onAction?: (name: string, price: number) => any;
  action: string;
  initialName?: string;
  initialPrice?: number;
};

export default function ProductForm({
  action,
  initialName,
  initialPrice,
  onAction,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(
    function handleInit() {
      if (initialName) {
        setName(initialName);
      }
      if (initialPrice) {
        setPrice(initialPrice.toString());
      }
    },
    [initialName, initialPrice]
  );

  console.log(Number(price));

  const staticOnAction = useRef(onAction).current;

  const disabled = useMemo(() => {
    return !(name.trim() && price.trim());
  }, [name, price]);

  const handleAction = useCallback(() => {
    console.log(Number(price));
    if (!disabled && staticOnAction) {
      console.log("calling staticOnAction");
      console.log("price::", price);
      staticOnAction(name, Number(price));
    }
  }, [disabled, staticOnAction, price, name]);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={isIos ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={{ marginBottom: 40, marginTop: -HEIGHT * 0.2 }}>
            <TextInput
              autoCapitalize="words"
              label="Product Name"
              mode="outlined"
              value={name}
              onChangeText={setName}
              style={{ marginBottom: 16 }}
            />
            <TextInput
              label="Price"
              keyboardType="decimal-pad"
              mode="outlined"
              value={price}
              onChangeText={setPrice}
            />
          </View>
          <Button mode="outlined" onPress={handleAction} disabled={disabled}>
            {action}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
