import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Jumbotron, Post, PostActions, PostComments, PostHeader } from 'components';
import data from 'decorators/data';

const NotFound = () => (
	<div>Could not find this post!</div>
);

const ViewPost = ({ params: { id }, data: post }) => (
	<div>
		<Helmet title={post.title} />

		<Jumbotron image="post">
			<PostHeader id={id} post={post} />
		</Jumbotron>

		<section className="container">
			<PostActions id={id} post={post} />
			<Post id={id} post={post} />
			<PostComments postId={id} comments={post.comments} />
		</section>
	</div>
);

ViewPost.propTypes = {
	data: PropTypes.object.isRequired,
	params: PropTypes.shape({
		id: PropTypes.string.isRequired,
		comments: PropTypes.object
	}).isRequired
};

export default data(({ params: { id } }) => `posts/${id}`, {
	Empty: NotFound
})(ViewPost);
