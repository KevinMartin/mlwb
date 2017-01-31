import React, { PropTypes } from 'react';
import { PostForm } from 'components';
import data from 'decorators/data';

const CreatePost = ({ firebase, data: profile }) => (
	<PostForm
		onSubmit={values => firebase.push('posts', {
			...values,
			username: profile.username,
			datetime: new Date().toISOString()
		})} />
);

CreatePost.propTypes = {
	firebase: PropTypes.object.isRequired,
	data: PropTypes.shape({
		username: PropTypes.string.isRequired
	}).isRequired
};

export default data('/profile')(CreatePost);
