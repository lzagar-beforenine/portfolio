import en from './locales/en.json';

function transformLanguage(data: object | string, key?: string): object | string {
	if (typeof data === 'object')
		return Object.fromEntries(
			Object.entries(data).map(([ikey, value]) => {
				return [ikey, transformLanguage(value as object | string, key ? `${key}.${ikey}` : ikey)];
			})
		);

	return key || '';
}

export const translations = transformLanguage(en as object | string) as typeof en;
