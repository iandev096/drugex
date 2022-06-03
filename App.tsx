import AppCtxProvider from "./src/context/app";
import AppNavigator from "./src/navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import theme from "./theme";

export default function App() {
  return (
    <AppCtxProvider>
      <PaperProvider theme={theme}>
        <AppNavigator />
        <StatusBar style="light" />
      </PaperProvider>
    </AppCtxProvider>
  );
}
