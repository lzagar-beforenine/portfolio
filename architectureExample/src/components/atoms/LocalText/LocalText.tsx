import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import LocalTextStyles from './LocalTextStyles';

interface Props extends TextProps {
	variant?: keyof typeof LocalTextStyles.styles;
}

function LocalText({ children, variant, ...rest }: Props) {
	const { t } = useTranslation();
	if (typeof children === 'string')
		return (
			<Text {...rest} style={[rest.style, variant ? LocalTextStyles.styles[variant] : {}]}>
				{t(children)}
			</Text>
		);

	return <Text {...rest}>{children}</Text>;
}

export default LocalText;
