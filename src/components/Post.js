import React, { PropTypes } from 'react';
import { PostBody, PostComments } from 'components';

const Post = ({ post, comments, excerpt }) => (
	<section>
		<PostBody post={post} excerpt={excerpt} />
		<PostComments comments={comments} />
	</section>
);

Post.propTypes = {
	post: PropTypes.object.isRequired,
	comments: PropTypes.array,
	excerpt: PropTypes.bool
};

Post.defaultProps = {
	comments: [],
	excerpt: false
};

export default Post;
