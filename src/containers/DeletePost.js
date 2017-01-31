import React, { PropTypes } from 'react';
import { Jumbotron, PostLink } from 'components';
import data from 'decorators/data';

const DeletePost = ({ params: { id }, firebase, auth, post }) => {
	if (auth.uid !== post.uid) {
		return (
			<div>403: Forbidden</div>
		);
	}

	const handleDelete = () => firebase.remove(`posts/${id}`);

	return (
		<div>
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
	data(({ params: { id } }) => `posts/${id}`, { propKey: 'post' })(DeletePost)
);
