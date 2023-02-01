import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LocalText from '../atoms/LocalText/LocalText';

interface Props {
	title: string;
	onPress: () => void;
	variant: 'primary' | 'secondary';
}

function LocalButton({ onPress, title, variant }: Props) {
	if (variant === 'primary')
		return (
			<TouchableOpacity onPress={onPress}>
				<LocalText variant="label">{title}</LocalText>
			</TouchableOpacity>
		);
	return (
		<TouchableOpacity onPress={onPress}>
			<LocalText>{title}</LocalText>
		</TouchableOpacity>
	);
}

export default LocalButton;
