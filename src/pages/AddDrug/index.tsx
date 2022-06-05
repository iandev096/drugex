import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import ProductFormScreen from "../../components/screens/ProductForm";
import useActions from "../../contexts/app/hooks/selectors/useActions";
import { AppStackNavProps } from "../../navigation/app/type";

type AddDrugNavProps = AppStackNavProps<"AddDrug">;

export default function AddDrug() {
  const { addProduct } = useActions();
  const navigation = useNavigation<AddDrugNavProps>();

  const handleAddDrug = useCallback(
    (name: string, price: number) => {
      addProduct(name, price);
      navigation.goBack();
    },
    [addProduct]
  );

  return <ProductFormScreen action="Add Drug" onAction={handleAddDrug} />;
}
