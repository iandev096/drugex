import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddDrug from "../../screens/addDrug";
import Home from "../../screens/home";
import { AppStackParamList } from "./type";

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddDrug" component={AddDrug} />
    </Stack.Navigator>
  );
}
