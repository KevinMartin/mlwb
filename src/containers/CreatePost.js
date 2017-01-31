import React, { PropTypes } from 'react';
import { Jumbotron, PostForm } from 'components';
import data from 'decorators/data';

const CreatePost = ({ firebase, data: auth }) => (
	<div>
		<Jumbotron>
			<h1>Create Post</h1>
		</Jumbotron>

		<div className="container">
			<PostForm
				onSubmit={values => firebase.push('posts', {
					...values,
					uid: auth.uid,
					datetime: new Date().toISOString()
				})} />
		</div>
	</div>
);

CreatePost.propTypes = {
	firebase: PropTypes.object.isRequired,
	data: PropTypes.shape({
		uid: PropTypes.string.isRequired
	}).isRequired
};

export default data('/auth')(CreatePost);
