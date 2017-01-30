import React, { PropTypes } from 'react';
// import styles from './styles.scss';

const PostComment = ({ comment }) => (
	<div>
		<header>
			Created By: {comment.user}
		</header>

		{comment.body}
	</div>
);

PostComment.propTypes = {
	comment: PropTypes.array.isRequired
};

export default PostComment;
