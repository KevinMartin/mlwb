import React, { PropTypes } from 'react';
import { PostComment, PostCommentForm } from 'components';

const PostComments = ({ postId, comments }) => (
	<div>
		{Object.keys(comments).map(id => [
			<hr key={`${id}-hr`} />,
			<PostComment key={`${id}-comment`} comment={comments[id]} />
		])}
		<hr />
		<PostCommentForm postId={postId} />
	</div>
);

PostComments.propTypes = {
	comments: PropTypes.object,
	postId: PropTypes.string.isRequired
};

PostComments.defaultProps = {
	comments: {}
};

export default PostComments;
