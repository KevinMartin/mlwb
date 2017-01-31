import React, { PropTypes } from 'react';
import { PostLink } from 'components';
import data from 'decorators/data';

const PostHeader = ({ id, post, data: author }) => (
	<header>
		<PostLink id={id}>
			<h1>{post.title}</h1>
		</PostLink>

		<p className="h6">Posted by {author.username} on {new Date(post.datetime).toLocaleDateString()}</p>
	</header>
);

PostHeader.propTypes = {
	id: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired
};

export default data(({ post }) => `users/${post.uid}`)(PostHeader);
