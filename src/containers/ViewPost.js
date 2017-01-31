import React, { PropTypes } from 'react';
import { Post } from 'components';
import data from 'decorators/data';

const NotFound = () => (
	<div>Could not find this post!</div>
);

const ViewPost = ({ params: { id }, data: post }) => (
	<Post id={id} post={post} />
);

ViewPost.propTypes = {
	data: PropTypes.object.isRequired,
	params: PropTypes.shape({
		id: PropTypes.string.isRequired
	}).isRequired
};

export default data(({ params: { id } }) => `posts/${id}`, {
	Empty: NotFound
})(ViewPost);
