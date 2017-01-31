import React, { PropTypes } from 'react';
import { Post, PostActions, PostComments } from 'components';
import data from 'decorators/data';

const NotFound = () => (
	<div>Could not find this post!</div>
);

const ViewPost = ({ params: { id }, data: post }) => (
	<section>
		<PostActions id={id} post={post} />
		<Post id={id} post={post} />
		<PostComments postId={id} comments={post.comments} />
	</section>
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
