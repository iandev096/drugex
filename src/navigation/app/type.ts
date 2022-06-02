import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AppStackParamList = {
  Home: undefined;
  AddDrug: undefined;
}


export type AppStackNavProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>['navigation'];