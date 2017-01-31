import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Jumbotron, PostForm } from 'components';
import data from 'decorators/data';

const EditPost = ({ params: { id }, firebase, auth, post }) => {
	if (auth.uid !== post.uid) {
		return (
			<div>403: Forbidden</div>
		);
	}

	return (
		<div>
			<Helmet title={`Edit ${post.title}`} />

			<Jumbotron>
				<h1>Edit Post</h1>
			</Jumbotron>

			<div className="container">
				<PostForm
					initialValues={post}
					onSubmit={values => firebase.set(`posts/${id}`, values)} />
			</div>
		</div>
	);
};

EditPost.propTypes = {
	firebase: PropTypes.object.isRequired,
	params: PropTypes.shape({
		id: PropTypes.string.isRequired
	}).isRequired,
	auth: PropTypes.shape({
		uid: PropTypes.string.isRequired
	}).isRequired,
	post: PropTypes.shape({
		uid: PropTypes.string.isRequired
	}).isRequired
};

export default data('/auth', { propKey: 'auth' })(
	data(({ params: { id } }) => `posts/${id}`, { propKey: 'post' })(EditPost)
);
