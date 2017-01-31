import React from 'react';
import { connect } from 'react-redux';
import { firebase, helpers } from 'redux-react-firebase';

const DefaultLoading = () => (
	<div>Loading...</div>
);

const DefaultEmpty = () => (
	<div>Empty...</div>
);

export const { isLoaded, isEmpty, dataToJS, pathToJS } = helpers;

export default (pathOrFn, {
	Loading = DefaultLoading,
	Empty = DefaultEmpty,
	propKey = 'data'
} = {}) => (WrappedComponent) => {
	if (!pathOrFn) {
		return firebase()(WrappedComponent);
	}

	const DataContainer = (props) => {
		if (Loading && !isLoaded(props[propKey])) {
			return <Loading {...props} />;
		} else if (Empty && isEmpty(props[propKey])) {
			return <Empty {...props} />;
		}

		return (
			<WrappedComponent {...props} />
		);
	};

	const path = Array.isArray(pathOrFn) ? pathOrFn[0] : pathOrFn;
	const getPath = typeof path === 'function' ? path : () => path.replace(/^\//, '');
	const query = typeof path === 'function' ? (...args) => [path(...args)] : [pathOrFn];
	const toJS = path[0] === '/' ? pathToJS : dataToJS;

	return firebase(query)(
		connect(({ firebase: fb }, props) => ({
			[propKey]: toJS(fb, getPath(props, fb).split('#')[0])
		}))(DataContainer)
	);
};
