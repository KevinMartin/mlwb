import React, { PropTypes } from 'react';
import { PostLink } from 'components';
import data from 'decorators/data';

const Post = ({ id, post, data: author, summary }) => (
	<article className="panel">
		<header>
			<PostLink id={id}>
				<h1>{post.title}</h1>
			</PostLink>

			<p>Created By: {author.username}</p>
		</header>

		{ summary
			? <PostLink id={id}>View Full Post</PostLink>
			: <div>{post.content}</div> }
	</article>
);

Post.propTypes = {
	id: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	summary: PropTypes.bool
};

Post.defaultProps = {
	summary: false
};

export default data(({ post }) => `users/${post.uid}`)(Post);
