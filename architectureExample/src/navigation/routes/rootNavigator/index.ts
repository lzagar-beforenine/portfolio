import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Routes } from '../routes';

export type RootStackParamList = {
	[Routes.ExampleScreen]: undefined;
};

export type ExampleScreenRouteProp = RouteProp<RootStackParamList, Routes.ExampleScreen>;
export type ExampleScreenNavigationProp = StackNavigationProp<RootStackParamList, Routes.ExampleScreen>;
