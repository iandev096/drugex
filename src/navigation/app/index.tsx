import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "react-native-paper";
import NavClose from "../../components/NavClose";
import useDarkMode from "../../contexts/theme/hooks/useDarkMode";
import useAppTheme from "../../hooks/useAppTheme";
import AddDrug from "../../pages/AddDrug";
import Home from "../../pages/Home";
import ModifyDrug from "../../pages/ModifyDrug";
import { AppStackParamList } from "./type";

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  const { toggle, darkMode } = useDarkMode();
  const {
    colors: { text, background },
  } = useAppTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "Drugex",
          headerRight: () => (
            <IconButton
              color={darkMode ? text : background}
              icon="theme-light-dark"
              onPress={toggle}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          options={({ navigation }) => ({
            title: "Add Drug",
            headerLeft: (props) => (
              <NavClose onPress={() => navigation.goBack()} {...props} />
            ),
          })}
          name="AddDrug"
          component={AddDrug}
        />
        <Stack.Screen
          options={({ navigation }) => ({
            title: "Modify Drug",
            headerLeft: (props) => (
              <NavClose onPress={() => navigation.goBack()} {...props} />
            ),
          })}
          name="ModifyDrug"
          component={ModifyDrug}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
