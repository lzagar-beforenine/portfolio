import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Edge, SafeAreaProviderProps, SafeAreaView } from 'react-native-safe-area-context';

interface Props extends Omit<SafeAreaProviderProps, 'edges'> {
	bottom?: boolean;
	top?: boolean;
	left?: boolean;
	right?: boolean;
	useScrollView?: boolean;
}

function Layout({ top, left, right, bottom, useScrollView, ...rest }: Props) {
	const edges = React.useMemo(() => {
		const newEdges: Array<Edge> = [];
		if (top) newEdges.push('top');
		if (bottom) newEdges.push('bottom');
		if (left) newEdges.push('left');
		if (right) newEdges.push('right');
		return newEdges;
	}, [top, bottom, left, right]);

	if (useScrollView)
		return (
			<SafeAreaView {...rest} edges={edges}>
				<ScrollView>{rest.children}</ScrollView>
			</SafeAreaView>
		);

	return <SafeAreaView {...rest} edges={edges} />;
}

export default Layout;
