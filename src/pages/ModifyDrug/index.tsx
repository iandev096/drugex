import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import ProductFormScreen from "../../components/screens/ProductForm";
import useActions from "../../contexts/app/hooks/useActions";
import useLatestPrice from "../../contexts/app/hooks/selectors/useLatestPrice";
import useProduct from "../../contexts/app/hooks/selectors/useProduct";
import { AppStackNavProps, AppStackRoute } from "../../navigation/app/type";

type ModifyDrugRoute = AppStackRoute<"ModifyDrug">;
type ModifyDrugNavProps = AppStackNavProps<"ModifyDrug">;

export default function ModifyDrug() {
  const { modifyProduct } = useActions();
  const {
    params: { productId },
  } = useRoute<ModifyDrugRoute>();
  const product = useProduct(productId);
  const latestPrice = useLatestPrice(productId);
  const navigation = useNavigation<ModifyDrugNavProps>();

  const handleModify = useCallback(
    (name: string, price: number) => {
      modifyProduct(productId, name, price);
      navigation.goBack();
    },
    [modifyProduct, productId]
  );

  return (
    <ProductFormScreen
      action="Modify"
      onAction={handleModify}
      initialName={product?.name}
      initialPrice={latestPrice}
    />
  );
}
