import React, { PropTypes } from 'react';
import { PostForm } from 'components';
import data from 'decorators/data';

const CreatePost = ({ firebase, data: auth }) => (
	<PostForm
		onSubmit={values => firebase.push('posts', {
			...values,
			uid: auth.uid,
			datetime: new Date().toISOString()
		})} />
);

CreatePost.propTypes = {
	firebase: PropTypes.object.isRequired,
	data: PropTypes.shape({
		uid: PropTypes.string.isRequired
	}).isRequired
};

export default data('/auth')(CreatePost);
