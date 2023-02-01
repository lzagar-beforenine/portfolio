import React from 'react';
import Layout from '../../components/atoms/Layout/Layout';
import LocalText from '../../components/atoms/LocalText/LocalText';
import { translations } from '../../translations/translationHelper';

function ExampleScreen() {
	return (
		<Layout bottom>
			<LocalText>{translations.exampleScreen.description}</LocalText>
		</Layout>
	);
}

export default ExampleScreen;
