import AppCtxProvider from "./src/context/app";
import AppNavigator from "./src/navigation";

export default function App() {
  return (
    <AppCtxProvider>
      <AppNavigator />
    </AppCtxProvider>
  );
}
