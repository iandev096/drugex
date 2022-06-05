import AppCtxProvider from "./src/contexts/app";
import AppThemeProvider from "./src/contexts/theme";
import AppNavigator from "./src/navigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <AppCtxProvider>
      <AppThemeProvider>
        <AppNavigator />
        <StatusBar style="light" />
      </AppThemeProvider>
    </AppCtxProvider>
  );
}
