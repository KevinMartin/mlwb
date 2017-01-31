import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Jumbotron, PostLink } from 'components';
import data from 'decorators/data';

const DeletePost = ({ params: { id }, firebase, pushState, auth, post }) => {
	if (auth.uid !== post.uid) {
		pushState('/404');
		return null;
	}

	const handleDelete = () => firebase.remove(`posts/${id}`, () => pushState('/'));

	return (
		<div>
			<Helmet title={`Delete ${post.title}`} />

			<Jumbotron>
				<h1>Edit Post</h1>
			</Jumbotron>

			<div className="container text-center">
				<p>Are you sure you would like to delete this blog post?</p>

				<button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>{' '}
				<PostLink id={id}>Cancel</PostLink>
			</div>
		</div>
	);
};

DeletePost.propTypes = {
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
		data(({ params: { id } }) => `posts/${id}`, { propKey: 'post' })(DeletePost)
	)
);
