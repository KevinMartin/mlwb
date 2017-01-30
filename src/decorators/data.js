import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebase, helpers } from 'redux-react-firebase';

const DefaultLoading = () => (
	<div>Loading...</div>
);

const DefaultEmpty = () => (
	<div>Empty...</div>
);

export const { isLoaded, isEmpty, dataToJS, pathToJS } = helpers;

export default (path, {
	Loading = DefaultLoading,
	Empty = DefaultEmpty
} = {}) => (WrappedComponent) => {
	if (typeof path === 'function') {
		return firebase()(connect(path)(WrappedComponent));
	}

	const DataContainer = (props) => {
		if (!isLoaded(props.data)) {
			return <Loading />;
		} else if (isEmpty(props.data)) {
			return <Empty />;
		}

		return (
			<WrappedComponent {...props} />
		);
	};

	DataContainer.propTypes = {
		data: PropTypes.any
	};

	return firebase([path])(
		connect(({ firebase: fb }) => ({
			data: dataToJS(fb, path)
		}))(DataContainer)
	);
};
