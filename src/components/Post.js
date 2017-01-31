import React, { PropTypes } from 'react';
import { PostLink } from 'components';

const Post = ({ id, post, summary }) => (
	<article>
		{ summary
			? <PostLink id={id}>View Full Post</PostLink>
			: <div>{post.content}</div> }
	</article>
);

Post.propTypes = {
	id: PropTypes.string.isRequired,
	post: PropTypes.object.isRequired,
	summary: PropTypes.bool
};

Post.defaultProps = {
	summary: false
};

export default Post;
