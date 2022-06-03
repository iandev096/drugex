import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AppStackParamList = {
  Home: undefined;
  AddDrug: undefined;
  ModifyDrug: { productId: number };
};

export type AppStackNavProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>["navigation"];

export type AppStackRoute<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>["route"];
