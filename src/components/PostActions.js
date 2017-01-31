import React, { PropTypes } from 'react';
import { PostLink } from 'components';
import data from 'decorators/data';

const PostActions = ({ id, post, data: auth }) => {
	if (auth.uid !== post.uid) {
		return null;
	}

	return (
		<div className="panel">
			<PostLink id={id} action="edit">Edit Post</PostLink>
			<PostLink id={id} action="delete">Delete Post</PostLink>
		</div>
	);
};

PostActions.propTypes = {
	id: PropTypes.string.isRequired,
	post: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired
};

export default data('/auth', {
	Loading: () => null,
	Empty: () => null
})(PostActions);
