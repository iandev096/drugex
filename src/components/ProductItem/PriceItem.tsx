import { formatDistance, formatRelative } from "date-fns";
import { View } from "react-native";
import { Caption, List, Text } from "react-native-paper";

type Props = {
  price: number;
  date: string;
}

export default function PriceItem({ price, date }: Props) {

  return (
    <List.Item
      title={`$${price}`}
      right={() => <View>
        <Text>{formatRelative(new Date(date), new Date())}</Text>
        <Caption>{formatDistance(new Date(date), new Date())}</Caption>
      </View>}
      testID='listItem'
    />
  )
}