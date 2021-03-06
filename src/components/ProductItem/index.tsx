import React, { useMemo } from "react";
import { View } from "react-native";
import {  IconButton, List } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Price } from "../../contexts/app/type";
import useDarkMode from "../../contexts/theme/hooks/useDarkMode";
import useAppTheme from "../../hooks/useAppTheme";
import { truncateString } from "../../util/string";
import Pill1 from "../icons/Pill1";
import Pill2 from "../icons/Pill2";
import PriceItem from "./PriceItem";
import styles from "./styles";

export type ProductItemProps = {
  name: string;
  prices: Price[];
  expanded: boolean;
  last?: boolean;
  even?: boolean;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ProductItem({
  name,
  expanded,
  prices,
  last,
  even,
  onPress,
  onDelete,
  onEdit,
}: ProductItemProps) {
  const theme = useAppTheme();
  const { darkMode } = useDarkMode();

  const Icon = useMemo(() => (even ? Pill1 : Pill2), [even]);

  return (
    <View style={[styles(theme).productItem, !last && styles(theme).border]}>
      <List.Accordion
        right={() => <></>}
        title={`${truncateString(name)} -  $${
          prices[prices.length - 1]?.price
        }`}
        left={() => (
          <View style={styles(theme).icon}>
            <Icon />
          </View>
        )}
        style={styles(theme).listAccordion}
        expanded={expanded}
        onPress={onPress}
        testID="btn:onPress"
      >
        <List.Item
          titleStyle={styles(theme).pastPrices}
          title={
            prices.length === 1 ? "No Past Price Available" : "Past Price(s)"
          }
          left={() => (
            <View style={styles(theme).custIcon}>
              <MaterialCommunityIcons
                name="clock-outline"
                color={theme.colors.text}
              />
            </View>
          )}
          right={() => <></>}
        />
        {prices
          .map((priceItem) => (
            <PriceItem
              price={priceItem.price}
              date={priceItem.date}
              key={priceItem.id}
            />
          ))
          .reverse()
          .slice(1)}
      </List.Accordion>
      {!expanded && (
        <View style={styles(theme).buttonGroup}>
          <IconButton
            size={22}
            icon="lead-pencil"
            onPress={onEdit}
            testID="btn:onEdit"
          />
          <IconButton
            size={22}
            icon={darkMode ? "trash-can-outline" : "trash-can"}
            onPress={onDelete}
            testID="btn:onDelete"
          />
        </View>
      )}
    </View>
  );
}
