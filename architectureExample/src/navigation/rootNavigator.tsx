import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ExampleContainer from '../containers/ExampleContainer/ExampleContainer';
import { Routes } from './routes/routes';
import { RootStackParamList } from './routes/rootNavigator';
import stackConfig from './config/stackConfig';
import { translations } from '../translations/translationHelper';

const Stack = createStackNavigator<RootStackParamList>();

const ExampleScreenTitle = {
	title: translations.exampleScreen.title,
};

function RootNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={stackConfig.GENERAL_STACK_OPTIONS}>
				<Stack.Screen name={Routes.ExampleScreen} component={ExampleContainer} options={ExampleScreenTitle} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default RootNavigator;
