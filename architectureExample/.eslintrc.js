module.exports = {
	root: true,
	extends: '@react-native-community',
	rules: {
		'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
		'import/extensions': 0,
		'import/no-extraneous-dependencies': 0,
		'no-return-await': 'off',
		'no-empty-function': 0,
		radix: 'off',
		'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
		'jsx-a11y/label-has-associated-control': 'off',
		'import/prefer-default-export': 'off',
		'no-shadow': 'off',
		'no-unneeded-ternary': 'off',
		'react/destructuring-assignment': 'off',
		'import/no-mutable-exports': 'off',
		camelcase: 'off',
		'no-return-assign': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/require-default-props': 'off',
		'no-param-reassign': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'jsx-a11y/no-noninteractive-element-interactions': 'off',
		curly: [2, 'multi'],
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
