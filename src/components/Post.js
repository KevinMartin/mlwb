import React, { PropTypes } from 'react';
import { PostBody, PostComments } from 'components';

const Post = ({ id, post, comments, excerpt }) => (
	<section>
		<PostBody id={id} post={post} excerpt={excerpt} />
		<PostComments id={id} comments={comments} />
	</section>
);

Post.propTypes = {
	id: PropTypes.string.isRequired,
	post: PropTypes.object.isRequired,
	comments: PropTypes.array,
	excerpt: PropTypes.bool
};

Post.defaultProps = {
	comments: [],
	excerpt: false
};

export default Post;
