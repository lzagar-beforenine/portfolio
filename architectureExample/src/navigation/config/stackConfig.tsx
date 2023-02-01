import React from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';
import LocalText from '../../components/atoms/LocalText/LocalText';

const GENERAL_STACK_OPTIONS = {
	headerTitle: ({ children }) => <LocalText>{children}</LocalText>,
} as StackNavigationOptions;

export default { GENERAL_STACK_OPTIONS };
