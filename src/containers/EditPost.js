import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Jumbotron, PostForm } from 'components';
import data from 'decorators/data';

const EditPost = ({ params: { id }, firebase, pushState, auth, post }) => {
	if (auth.uid !== post.uid) {
		pushState('/404');
		return null;
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
					onSubmit={values => firebase.set(`posts/${id}`, values, () => pushState(`/posts/${id}`))} />
			</div>
		</div>
	);
};

EditPost.propTypes = {
	firebase: PropTypes.object.isRequired,
	pushState: PropTypes.func.isRequired,
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

export default connect(() => ({}), { pushState: push })(
	data('/auth', { propKey: 'auth' })(
		data(({ params: { id } }) => `posts/${id}`, { propKey: 'post' })(EditPost)
	)
);
