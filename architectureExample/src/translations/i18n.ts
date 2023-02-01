import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';

i18next.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	resources: {
		en: {
			translation: en,
		},
	},

	fallbackLng: 'en',
});

export default i18next;
