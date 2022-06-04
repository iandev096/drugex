import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { FlatList, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductItem from "../../components/ProductItem";
import RemoveProductModal from "../../components/RemoveProductModal";
import useActions from "../../context/app/hooks/selectors/useActions";
import usePrices from "../../context/app/hooks/selectors/usePrices";
import useProducts from "../../context/app/hooks/selectors/useProducts";
import { Product } from "../../context/app/type";
import { AppStackNavProps } from "../../navigation/app/type";
import { isLastItem } from "../../util/array";
import styles from "./styles";

type HomeNavProps = AppStackNavProps<"Home">;

export default function Home() {
  const [selected, setSelected] = useState<Product | null>(null);
  const [productToBeDeleted, setProductToBeDeleted] = useState<Product | null>(
    null
  );
  const products = useProducts();
  const prices = usePrices();
  const { removeProduct } = useActions();

  const navigation = useNavigation<HomeNavProps>();

  const handlePress = (product: Product) =>
    setSelected((prev) => {
      if (prev === null) {
        return product;
      }
      return null;
    });

  const navToAddDrugs = useCallback(
    () => navigation.navigate("AddDrug"),
    [navigation]
  );

  const handleEdit = useCallback(
    (productId: number) => navigation.navigate("ModifyDrug", { productId }),
    [navigation]
  );

  const handleDelete = useCallback(
    (product: Product) => setProductToBeDeleted(product),
    [setProductToBeDeleted]
  );

  const handleDismissRemProdModal = useCallback(
    () => setProductToBeDeleted(null),
    [setProductToBeDeleted]
  );

  const handleRemove = useCallback(() => {
    if (!productToBeDeleted) return;
    removeProduct(productToBeDeleted.id);
    handleDismissRemProdModal();
  }, [productToBeDeleted, removeProduct]);

  return (
    <>
      <RemoveProductModal
        visible={!!productToBeDeleted}
        onDismiss={handleDismissRemProdModal}
        onRemove={() => handleRemove()}
        product={productToBeDeleted}
      />
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <FlatList
          data={products}
          renderItem={({ item, index }) => (
            <ProductItem
              key={item.id}
              name={item.name}
              last={isLastItem(index, products)}
              prices={prices[item.id]}
              expanded={selected?.id === item.id}
              onPress={() => handlePress(item)}
              onDelete={() => handleDelete(item)}
              onEdit={() => handleEdit(item.id)}
            />
          )}
        />
        <View style={styles.bottom}>
          <Button onPress={navToAddDrugs} mode="outlined" icon="plus">
            Add Drug
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
}
