import { formatDistance, formatRelative } from "date-fns";
import React from "react";
import { View } from "react-native";
import { IconButton, List } from "react-native-paper";
import { Price } from "../../contexts/app/type";
import useAppTheme from "../../hooks/useAppTheme";
import styles from "./styles";

export type ProductItemProps = {
  name: string;
  prices: Price[];
  expanded: boolean;
  last?: boolean;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ProductItem({
  name,
  expanded,
  prices,
  last,
  onPress,
  onDelete,
  onEdit,
}: ProductItemProps) {
  const theme = useAppTheme();

  return (
    <View style={[styles(theme).productItem, !last && styles(theme).border]}>
      <List.Accordion
        right={!expanded ? () => <></> : undefined}
        title={`${name} -  $${prices[prices.length - 1]?.price}`}
        left={(props) => <List.Icon {...props} icon="apps" />}
        expanded={expanded}
        onPress={onPress}
        testID='btn:onPress'
      >
        <List.Item
          title={
            prices.length === 1 ? "No Past Price Available" : "Past Price(s)"
          }
          titleStyle={{ fontSize: 12, textTransform: "uppercase" }}
        />
        {prices
          .map((priceItem) => (
            <List.Item
              title={`$${priceItem.price}`}
              description={`${formatRelative(
                new Date(priceItem.date),
                new Date()
              )} - ${formatDistance(new Date(priceItem.date), new Date())} `}
              key={priceItem.id}
              testID='listItem'
            />
          ))
          .reverse()
          .slice(1)}
      </List.Accordion>
      {!expanded && (
        <View style={styles(theme).buttonGroup}>
          <IconButton  icon="lead-pencil" onPress={onEdit} testID='btn:onEdit' />
          <IconButton icon="trash-can" onPress={onDelete} testID='btn:onDelete' />
        </View>
      )}
    </View>
  );
}
